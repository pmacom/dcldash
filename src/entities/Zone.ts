import { getUserData } from "@decentraland/Identity";
import { Dash_GetSceneData } from "../utils/GetSceneData";
import { Dash_TriggerZone } from '../utils/TriggerZone'

declare const Map: any
declare const Set: any

const sceneMessageBus = new MessageBus()
const zones: typeof Map = new Map()
// const zones: Map<string, Dash_Zone> = new Map()

class ParcelHideAvatar extends Entity {
    constructor(){
        super()
        this.addComponent(new Transform())
        engine.addEntity(this)
    }
}

class ZoneManagerInstance {
    private userId: string | undefined
    private base: Vector2 | undefined
    private parcelHideAvatars: ParcelHideAvatar[] = []
    private zones: typeof Map = new Map()
    // private zones: Map<string, Set<string>> = new Map()
    public currentZone: string = 'primaryZone'
    private parcelSize: Vector3 | undefined

    constructor(){
        this.setupMessages()

        executeTask(async () => {
            const { base, parcels, maxHeight } = await Dash_GetSceneData()
            const userData = await getUserData()
            this.userId = userData!.userId
            this.zones.set('primaryZone', new Set())
            this.parcelSize = new Vector3(16, maxHeight, 16)

            const baseCoords = base.split(',')
            this.base = new Vector2(parseInt(baseCoords[0]), parseInt(baseCoords[1]))
            parcels.forEach((parcel: string, index: number) => {
                const c = parcel.split(',')
                const coords = new Vector2(parseInt(c[0]), parseInt(c[1]))
                const diff = new Vector2(coords.x-this.base!.x, coords.y-this.base!.y)
                const position = new Vector3((diff.x*16)+8, 1,(diff.y*16)+8)
                const scale = this.parcelSize
                const parcelHideAvatar = new ParcelHideAvatar()
                parcelHideAvatar.addComponentOrReplace(new Transform({ position, scale }))
                this.parcelHideAvatars.push(parcelHideAvatar)
            })

            onEnterSceneObservable.add((player) => {
                if(player.userId == this.userId){
                    sceneMessageBus.emit(`dash-zone-enter`, { userId: this.userId, zoneName: 'primaryZone' })
                    this.addUserToZone('primaryZone', player.userId)
                }
            })

            onLeaveSceneObservable.add((player) => {
                if(player.userId == this.userId) {
                    sceneMessageBus.emit(`dash-zone-exit`, { userId: this.userId, zoneName: 'primaryZone' })
                    this.addUserToZone('primaryZone', player.userId)
                }
            })

            onPlayerConnectedObservable.add(({ userId }) => {
                sceneMessageBus.emit(`dash-zone-query`, { userId: this.userId })
            })

            onPlayerDisconnectedObservable.add(({ userId }) => {
                this.removeUserFromAllZones(userId)
            })

            sceneMessageBus.emit(`dash-zone-query`, { userId: this.userId })
        })
    }

    private removeUserFromAllZones(userId: string){
        this.zones.forEach((zone: typeof Set, name: string) => { zone.delete(userId)})
        // this.zones.forEach((zone: Set<string>, name: string) => { zone.delete(userId)})
    }

    public addUserToZone(zoneName: string, userId: string){
        if(userId == this.userId!){
            this.currentZone = zoneName
        }else{
            this.removeUserFromAllZones(userId)
            if(this.zones.has(zoneName)){
                this.zones.get(zoneName)!.add(userId)
            }else{
                this.zones.set(zoneName, new Set([userId]))
            }
        }
        this.updateParcelHideAvatars()
    }

    public getUserIdsForZone(zoneName: string): string[] {
        const userIds: string[] = []
        const ids: typeof Set = this.zones.has(zoneName) ? this.zones.get(zoneName)! : new Set()
        // const ids: Set<string> = this.zones.has(zoneName) ? this.zones.get(zoneName)! : new Set()
        ids!.forEach((userId: string) => userIds.push(userId))
        return [this.userId!, ...userIds]
    }

    private updateParcelHideAvatars(){
        const excludeIds = this.getUserIdsForZone(this.currentZone)
        this.parcelHideAvatars.forEach(parcelHideAvatar => {
            parcelHideAvatar.addComponentOrReplace(
                new AvatarModifierArea({
                    area: { box: this.parcelSize! },
                    modifiers: [AvatarModifiers.HIDE_AVATARS],
                    excludeIds,
                })
            )
        })
    }

    private setupMessages(){
        sceneMessageBus.on(`dash-zone-query`, ({ userId }) => {
            if(userId !== this.userId){
                sceneMessageBus.emit(`dash-zone-enter`, { userId: this.userId, zoneName: this.currentZone })
            }
        })
        sceneMessageBus.on(`dash-zone-enter`, ({ userId, zoneName }) => {
            if(userId !== this.userId){
                this.addUserToZone(zoneName, userId)
            }
        })

        sceneMessageBus.on(`dash-zone-exit`, ({ userId, zoneName }) => {
            if(userId !== this.userId){
                this.addUserToZone('primaryZone', userId)
            }
        })
    }
}

const ZoneManager = new ZoneManagerInstance()


export class Dash_Zone extends Entity {
    private triggerZone: Dash_TriggerZone = new Dash_TriggerZone()
    public inZone: boolean = false
    public userId: string | undefined
    public excludeIds: typeof Set = new Set()
    // public excludeIds: Set<string> = new Set()
    private enabled: boolean = false
    public excludeIdsArray: string[] = []
    public spawnPoint: Vector3 = new Vector3()
    public onEnter: () => void = () => {}
    public onExit: () => void = () => {}

    constructor(
        public zoneName: string,
        private transform: Transform
    ){
        super()
        zones.set(zoneName, this)
        this.addComponent(transform)

        executeTask(async () => {
            let userData = await getUserData()
            this.userId = userData!.userId
            this.setupTriggerZone()
        })
    }

    private setupTriggerZone(){
        if(this.enabled) this.triggerZone.enable()
        this.triggerZone.addComponent(this.transform)
        this.triggerZone.onEnter = () => this._onEnter()
        this.triggerZone.onExit = () => this._onExit()
    }

    private _onEnter(){
        if(this.enabled){
            log('ZONE: ON ENTER')
            ZoneManager.addUserToZone(this.zoneName, this.userId!)
            sceneMessageBus.emit(`dash-zone-enter`, { userId: this.userId, zoneName: this.zoneName })
            this.onEnter()
        }
    }

    private _onExit(){
        if(this.enabled){
            log('ZONE: ON EXIT')
            ZoneManager.addUserToZone('primaryZone', this.userId!)
            sceneMessageBus.emit(`dash-zone-exit`,  { userId: this.userId, zoneName: this.zoneName  })
            this.onExit()
        }
    }

    public enable(){
        if(!this.alive) engine.addEntity(this)
        this.enabled = true
        this.triggerZone.enable()
    }

    public disable(){
        if(this.alive) engine.removeEntity(this)
        this.enabled = false
        this.triggerZone.disable()
    }

    public enableDebug(){
        this.enabled = true
        this.triggerZone.enableDebug()
    }
}

import { Dash_OnUpdateFrame_Instance, Dash_OnUpdateFrame } from '../utils/OnUpdateFrame'
import { Dash_Material } from '../utils/Materials'
import { Dash_UV_Plane_Crop_Image } from '../utils/Uvs'
import { movePlayerTo } from "@decentraland/RestrictedActions"
import { Dash_TriggerZone } from '../utils/TriggerZone'
import { Dash_GetSceneData } from '../utils/GetSceneData'

declare const Set: any

/**
 * Usage - new LandBarrier(baseParcel, parcels)
 *
    const landBarrier = new Dash_LandBarrier(new Vector3(0, 0, -16.1))

    landBarrier.enable()
    landBarrier.disable()
    landBarrier.setMessage("comingsoon")

    // Message Types
    comingsoon
    privateevent
    accountrequired
    nftrequired
    temporarilylocked
    outdated
    undermaintenance
    loadfully
    transparent
 */

const texture = new Texture('https://pmacom.github.io/assets/dcldash/images/landBarrier/barrier-sprite.png', {
    hasAlpha: false,
    samplingMode: 0,
    wrap: 1
})

const material = new Material()
material.albedoTexture = texture
material.emissiveColor = Color3.White()
material.emissiveTexture = texture
material.emissiveIntensity = 5
material.transparencyMode = 2

const BarrierMaterial = material

const sourceWidth = 1024
const sourceHeight = 86

export interface IBarrierImageData {
    [key: string]: {
        sourcePositionTop: number
        sourcePositionLeft: number
        sourceWidth: number
        sourceHeight: number; 
    }
}

const BarrierImageData: IBarrierImageData = {
    comingsoon: {
        sourcePositionTop: 9,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    privateevent: {
        sourcePositionTop: 104,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    accountrequired: {
        sourcePositionTop: 198,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    nftrequired: {
        sourcePositionTop: 293,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    temporarilylocked: {
        sourcePositionTop: 388,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    outdated: {
        sourcePositionTop: 482,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    undermaintenance: {
        sourcePositionTop: 577,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    loadfully: {
        sourcePositionTop: 671,
        sourcePositionLeft: 0,
        sourceWidth,
        sourceHeight,
    },
    transparent: {
        sourcePositionTop: 924,
        sourcePositionLeft: 0,
        sourceWidth: 100,
        sourceHeight: 100,  
    }
}


export class Dash_LandBarrier {
    private base: Vector2 | undefined
    private barrierZones: BarrierZone[] = []
    private parcelStrings: typeof Set = new Set()
    private message: string = "privateevent"
    // private parcelStrings: Set<string> = new Set()

    constructor(public exitLocation: Vector3){
        executeTask(async () => {
            const { base, parcels, maxHeight } = await Dash_GetSceneData()
            const baseCoords = base.split(',')
            this.base = new Vector2(parseInt(baseCoords[0]), parseInt(baseCoords[1]))
            parcels.forEach(parcel => this.parcelStrings.add(parcel))
            parcels.forEach((parcel: string, index: number) => {
                const c = parcel.split(',')
                const coords = new Vector2(parseInt(c[0]), parseInt(c[1]))
                const diff = new Vector2(coords.x-this.base!.x, coords.y-this.base!.y)
                const position = new Vector3((diff.x*16)+8, 1,(diff.y*16)+8)
                const north = !this.parcelStrings.has(`${coords.x-1},${coords.y}`)
                const south = !this.parcelStrings.has(`${coords.x+1},${coords.y}`)
                const east = !this.parcelStrings.has(`${coords.x},${coords.y+1}`)
                const west = !this.parcelStrings.has(`${coords.x},${coords.y-1}`)
                const barrierZone = new BarrierZone(
                    BarrierMaterial,
                    this.getMessage(),
                    maxHeight,
                    this.exitLocation,
                    north,
                    south,
                    east,
                    west,
                )
                barrierZone.addComponentOrReplace(new Transform({ position }))
                this.barrierZones.push(barrierZone)
            })
        })
    }

    getMessage(): string { return this.message }

    setMessage(message: string){
        this.message = message
        this.barrierZones.forEach(barrier => {
            barrier.setMessage(message)
        })
    }

    disable(){
        this.barrierZones.forEach(barrierZone => {
            barrierZone.disable()
            if(barrierZone.alive) engine.removeEntity(barrierZone)
        })
    }

    enable(){
        this.barrierZones.forEach(barrierZone => {
            barrierZone.enable()
            if(!barrierZone.alive) engine.addEntity(barrierZone)
        })
    }
}

class BarrierZone extends Entity {
    private shapes: PlaneShape[] = []
    public animation: Dash_OnUpdateFrame_Instance
    private collider: Entity = new Entity()
    private colliderShape: BoxShape = new BoxShape()
    private triggerZone: Dash_TriggerZone = new Dash_TriggerZone()

    constructor(
        public material: Material,
        private message: string = 'privateevent',
        private maxHeight: number,
        public exitLocation: Vector3,
        showNorth?: boolean,
        showSouth?: boolean,
        showEast?: boolean,
        showWest?: boolean,
    ){
        super()

        this.collider.addComponent(this.colliderShape)
        this.collider.addComponent(Dash_Material.transparent())
        this.collider.addComponent(new Transform({
            scale: new Vector3(16, 8, 16)
        }))
        this.collider.setParent(this)

        this.triggerZone.addComponent(new Transform({
            position: new Vector3(0,7,0),
            scale: new Vector3(16,16,16)
        }))
        this.triggerZone.onEnter = () => {
            const { x, y, z } = this.exitLocation
            movePlayerTo({ x, y, z })
        }
        this.triggerZone.setParent(this)

        this.addComponent(new Transform({
            position: new Vector3(0,0,0),
        }))

        if(showEast){
            const east = new BarrierPlane(new Vector3(0,1,8), 0, this.message)
            east.addComponent(material)
            this.shapes.push(east.shape)
            east.setParent(this)
        }

        if(showWest){
            const west = new BarrierPlane(new Vector3(0,1,-8), 180, this.message)
            west.addComponent(material)
            this.shapes.push(west.shape)
            west.setParent(this)
        }

        if(showSouth){
            const south = new BarrierPlane(new Vector3(8,1,0), 90, this.message)
            south.addComponent(material)
            this.shapes.push(south.shape)
            south.setParent(this)
        }

        if(showNorth){
            const north = new BarrierPlane(new Vector3(-8,1,0), -90, this.message)
            north.addComponent(material)
            this.shapes.push(north.shape)
            north.setParent(this)
        }

        this.animation = Dash_OnUpdateFrame.add((dt: number) => {
            this.shapes.forEach(shape => {
                let zuvs = shape.uvs!.map((uv: number, index: number) => {
                    return index % 2 == 0 ? uv+(dt*.05) : uv
                })
                shape.uvs = zuvs
            })
        })
        this.animation.start()

        engine.addEntity(this)
    }

    setMessage(message: string){
        this.shapes.forEach(shape => {
            if(BarrierImageData[message]){
                const settings = BarrierImageData[message]
                const { sourceHeight, sourceWidth, sourcePositionLeft, sourcePositionTop } = settings
                shape.uvs = Dash_UV_Plane_Crop_Image(
                    1024, 1024,
                    sourceWidth, sourceHeight,
                    sourcePositionLeft, sourcePositionTop
                )
            }
        })
    }

    setExitLocation(exitLocation: Vector3){ this.exitLocation = exitLocation }
    disable(){ this.triggerZone.disable() }
    enable(){ this.triggerZone.enable() }
}

class BarrierPlane extends Entity {
    public shape: PlaneShape = new PlaneShape()

    constructor(position: Vector3, rotation: number = 0, message: string){
        super()
        this.addComponent(this.shape)
        this.shape.withCollisions = false
        this.setMessage(message)
        this.addComponent(new Transform({
            position,
            scale: new Vector3(16,1,1),
            rotation: new Quaternion().setEuler(0,rotation,0)
        }))
    }

    setMessage(message: string){
        if(BarrierImageData[message]){
            const settings = BarrierImageData[message]
            const { sourceHeight, sourceWidth, sourcePositionLeft, sourcePositionTop } = settings
            this.shape.uvs = Dash_UV_Plane_Crop_Image(
                1024, 1024,
                sourceWidth, sourceHeight,
                sourcePositionLeft, sourcePositionTop
            )
        }
    }
}
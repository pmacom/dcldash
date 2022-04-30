import { Dash_OnUpdateFrame_Instance, Dash_OnUpdateFrame } from '../utils/OnUpdateFrame'
import { Dash_Material } from '../utils/Materials'
import { Dash_UV_Plane_Crop_Image } from '../utils/Uvs'

/**
 * Usage - new LandBarrier(baseParcel, parcels)
 *
    
    const landBarrier = new LandBarrier("-49,-100", [
        "-46,-99",
        "-47,-99",
        "-48,-99",
        "-49,-99",
        "-47,-100",
        "-48,-100",
        "-49,-100",
    ])
 */

declare const Set: any

const texture = new Texture('https://pmacom.github.io/assets/dcldash/images/landBarrier/barrier-sprite.png', {
    hasAlpha: true,
    samplingMode: 3,
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

interface IBarrierImageData {
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
    private base: Vector2
    private parcelsCoords: Vector2[]
    private barrierZones: BarrierZone[] = []
    private parcelXs: typeof Set = new Set()
    private parcelYs: typeof Set = new Set()
    private parcelStrings: typeof Set = new Set()

    constructor(baseParcel: string, private parcels: string[]){
        this.base = this.getParcelCoordinates(baseParcel)

        this.parcelsCoords = parcels.map((parcel: string) => this.getParcelCoordinates(parcel, true))
        this.parcelsCoords.forEach((parcel: Vector2, index: number) => {
            if(index == 0){
                this.getNeighboringParcels(parcel)
            }
            const neighbors = this.getNeighboringParcels(parcel)
            const barrierZone = new BarrierZone(
                BarrierMaterial,
                'accountrequired',
                neighbors[0], // north,
                neighbors[1], // south,
                neighbors[2], // east,
                neighbors[3], // west,
            )
            barrierZone.getComponent(Transform).position.set(
                ((parcel.x-1)*16)-8,
                1,
                ((parcel.y)*16)-8
            )
            this.barrierZones.push(barrierZone)
        })
    }

    setMessage(message: string){
        this.barrierZones.forEach(barrier => barrier.setMessage(message))
    }

    getParcelCoordinates(coords: string, offset?: boolean): Vector2 {
        const c = coords.split(',')
        const x = parseInt(c[0])
        const y = parseInt(c[1])
        let parcel = new Vector2()
        if(offset){
            parcel.x = x-this.base.x
            parcel.y = y-this.base.y
            this.parcelXs.add(parcel.x)
            this.parcelYs.add(parcel.y)
            this.parcelStrings.add(`${parcel.x},${parcel.y}`)
        }else{
            parcel.x = x
            parcel.y = y
        }
        return parcel
    }

    getNeighboringParcels(parcel: Vector2): boolean[]{
        const dir = {
            north: !this.parcelStrings.has(`${parcel.x},${parcel.y-1}`),
            south: !this.parcelStrings.has(`${parcel.x},${parcel.y+1}`),
            east: !this.parcelStrings.has(`${parcel.x+1},${parcel.y}`),
            west: !this.parcelStrings.has(`${parcel.x-1},${parcel.y}`),
        }
        return [
            dir.west,
            dir.east,
            dir.south,
            dir.north,
        ]
    }
}

class BarrierZone extends Entity {
    private collider: Entity = new Entity()
    private colliderShape: BoxShape = new BoxShape()
    private shapes: PlaneShape[] = []
    public animation: Dash_OnUpdateFrame_Instance

    constructor(
        public material: Material,
        private message: string = 'privateevent',
        showNorth?: boolean,
        showSouth?: boolean,
        showEast?: boolean,
        showWest?: boolean,
    ){
        super()

        this.collider.addComponent(this.colliderShape)
        this.collider.addComponent(Dash_Material.transparent())
        this.collider.addComponent(new Transform({
            position: new Vector3(0,8,0),
            scale: new Vector3(16,16,16)
        }))
        this.collider.setParent(this)

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

        this.animation = Dash_OnUpdateFrame.add((data, dt) => {
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
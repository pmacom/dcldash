import { Dash_UV_Image } from '../utils/Uvs'
import { Dash_Material } from '../utils/Materials'

const gridTexture = new Texture('https://pmacom.github.io/assets/dcldash/images/textures/grid-white.png', {
    wrap: 1
})
const BlackoutMaterialWhite = new Material()
BlackoutMaterialWhite.albedoColor = Color3.White()
BlackoutMaterialWhite.albedoTexture = gridTexture
BlackoutMaterialWhite.emissiveTexture = gridTexture
BlackoutMaterialWhite.metallic = 1
BlackoutMaterialWhite.specularIntensity = 0
BlackoutMaterialWhite.emissiveColor = Color3.White()

declare const Map: any

export class Dash_GridBoxInstance extends Entity {
    private initialized: boolean = false
    private parent: Entity | undefined | null
    private sides: typeof Map = new Map([
        ['top',     { entity: new GridBoxSide(), shape: new PlaneShape()} ],
        ['bottom',  { entity: new GridBoxSide(), shape: new PlaneShape()} ],
        ['north',   { entity: new GridBoxSide(), shape: new PlaneShape()} ],
        ['south',   { entity: new GridBoxSide(), shape: new PlaneShape()} ],
        ['east',    { entity: new GridBoxSide(), shape: new PlaneShape()} ],
        ['west',    { entity: new GridBoxSide(), shape: new PlaneShape()} ],
    ])

    constructor(){
        super()
        this.initialize()
    }

    initialize(){
        if(!this.initialized){
            engine.addEntity(this)
        }
    }

    useCollider(useCollider: boolean){
        this.sides.forEach((settings: { entity: GridBoxSide, shape: PlaneShape }) => {
            settings.entity.useCollider(useCollider)
        })
    }

    hide(){
        if(this.alive) engine.removeEntity(this)
        this.setParent(null)
    }

    show(){
        if(!this.alive) engine.addEntity(this)
        if(this.parent) this.setParent(this.parent)
    }

    setMaterial(material: Material){
        this.sides.forEach()
        this.sides.forEach((settings: { entity: Entity, shape: PlaneShape }, name: string) => {
            const { entity } = settings
            entity.addComponentOrReplace(material)
        })
    }

    setTransform(transform: Transform){
        this.addComponentOrReplace(transform)
        this.sides.forEach((settings: { entity: Entity, shape: PlaneShape }, name: string) => {
            const { entity, shape } = settings
            log({ shape })
            settings.shape.withCollisions = true
            shape.uvs = Dash_UV_Image()
            entity.addComponentOrReplace(shape)
            entity.addComponentOrReplace(BlackoutMaterialWhite)
            entity.setParent(this)

            let p = new Vector3()
            let r = new Quaternion()

            switch(name){
                case 'top':
                    p.y = .5
                    r.setEuler(90, 0, 0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.x : uv*transform.scale.z
                    })
                    break
                case 'bottom':
                    p.y = -.5
                    r.setEuler(90,0,0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.x : uv*transform.scale.z
                    })
                    break
                case 'north':
                    p.z = .5
                    r.setEuler(0,0,0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.x : uv*transform.scale.y
                    })
                    break
                case 'south':
                    p.z = -.5
                    r.setEuler(0,0,0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.x : uv*transform.scale.y
                    })
                    break
                case 'east':
                    p.x = .5
                    r.setEuler(0,90,0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.z : uv*transform.scale.y
                    })
                    break
                case 'west':
                    p.x = -.5
                    r.setEuler(0,90,0)
                    shape.uvs = shape.uvs.map((uv:number, index: number) => {
                        return index % 2 == 0 ? uv*transform.scale.z : uv*transform.scale.y
                    })
                    break
            }

            entity.addComponentOrReplace(new Transform({
                position: p,
                scale: new Vector3(1,1,1),
                rotation: r,
            }))
        })
    }
}

class GridBoxSide extends Entity {
    private collider: Entity | undefined
    constructor(){
        super()
        this.useCollider(true)
    }

    useCollider(useCollider: boolean){
        log('using the collider')
        if(!this.collider && useCollider){
            this.collider = new Entity()
            this.collider.addComponent(new PlaneShape())
            this.collider.addComponent(Dash_Material.transparent())
            this.collider.setParent(this)
        }else{
            if(this.collider && useCollider){
                this.collider.setParent(this)
            }else{
                if(this.collider?.alive) engine.removeEntity(this.collider)
                this.collider?.setParent(null)
            }
        }
    }
}

export const Dash_GridBox = new Dash_GridBoxInstance()
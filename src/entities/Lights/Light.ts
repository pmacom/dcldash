import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "../../utils/OnUpdateFrame"

const lightTexture = new Texture("https://pmacom.github.io/assets/dcldash/images/textures/light.png")

const DefaultColors: Color3[] = [
    Color3.Blue(),
    Color3.Gray(),
    Color3.Green(),
    Color3.Magenta(),
    Color3.Purple(),
    Color3.Red(),
    Color3.Teal(),
    Color3.White(),
    Color3.Yellow(),
]

export class StageLight extends Entity {
    private shape: PlaneShape = new PlaneShape()
    private material: Material = new Material()
    private flareMaterial: Material = new Material()
    private centerEntity: Entity = new Entity()
    private beamEntity1: Entity = new Entity()
    private beamEntity2: Entity = new Entity()
    private beamEntity3: Entity = new Entity()

    private sunflareWrapper: Entity = new Entity()
    private sunflare: Entity = new Entity()
    private sunflareShape: PlaneShape = new PlaneShape()

    public beamWidth: number = 6
    public beamHeight: number = 10

    public beamColor: Color3 = new Color3(0,.2,1)
    public beamColorTarget: Color3 = new Color3(0,.2,1)

    public beamIntensity: number = 5

    public sunflareSize: number = .6
    public flareColor: Color3 = Color3.Blue()
    public flareIntensity: number = 100

    public target: Transform = new Transform()
    public p: Entity = new Entity()

    public inColorCycle: boolean = true

    private animation: Dash_OnUpdateFrame_Instance

    constructor(){
        super()

        this.setupCenterEntity()
        this.setupBeams([
            this.beamEntity1,
            this.beamEntity2,
            this.beamEntity3
        ])
        this.setupUVs()
        this.setupMaterials()
        this.setupSunflare()
        engine.addEntity(this)

        let u = new Entity()
        u.setParent(this)
        u.addComponent(new SphereShape)
        u.addComponent(new Transform({
            position: new Vector3(0,0,0),
            scale: new Vector3().setAll(.2)
        }))

        this.animation = Dash_OnUpdateFrame.add((dt: number) => this.animate(dt))
        this.animation.start()

        this.enableRandom()
    }

    animate(dt: number){
        log('I should rotate to some sort of thing')
        if(this.target){
            let self = this.getComponent(Transform)
            
            self.lookAt(this.target.position)
        }
    }

    setColor(color: Color3, duration: number = 1){

    }

    setRandomColor(){

    }

    enableRandom(){

    }

    disableRandom(){

    }
    
    setupCenterEntity(){
        this.centerEntity.addComponent(new Transform({
            position: new Vector3(0,0,0),
            rotation: new Quaternion().setEuler(-90,0,0),
        }))
        this.centerEntity.setParent(this)
    }

    setupBeams(entities: Entity[]){
        entities.forEach((entity: Entity, index: number) => {
            log('creating beam', index, 45*index)
            entity.setParent(this.centerEntity)
            entity.addComponent(this.shape)
            entity.addComponent(new Transform({
                position: new Vector3(0,(this.beamHeight/2)*-1,0),
                scale: new Vector3().set(this.beamWidth, this.beamHeight, this.beamWidth),
                rotation: new Quaternion().setEuler(0, 45*index, 0)
            }))
            entity.addComponent(this.material)
        })
    }

    setBeamLength(length: number){
        [this.beamEntity1, this.beamEntity2, this.beamEntity3].forEach(beam => {
            let transform = beam.getComponent(Transform)
            transform.scale.set(this.beamWidth, length, this.beamWidth)
        })
    }

    setupUVs(){
        let w = 701
        let v = Scalar.InverseLerp(0, 1024, w)
        let beamUvs = [ v,0, 0,0, 0,1, v,1 ]
        this.shape.uvs = [...beamUvs, ...beamUvs]

        let flareSize = 310 // deprecated?
        let v2 = Scalar.InverseLerp(0, 1024, 702)
        let flareUvs = [ v2,1, 1,1, 1,.7, v2,.7 ]
        this.sunflareShape.uvs = [...flareUvs, ...flareUvs]
    }

    setupMaterials(){
        this.material.albedoColor = Color3.Black()
        this.material.albedoTexture = lightTexture
        this.material.alphaTexture = lightTexture
        this.material.emissiveColor = Color3.Random() // this.beamColor
        this.material.emissiveTexture = lightTexture
        this.material.emissiveIntensity = this.beamIntensity
        this.material.roughness = 0
        this.material.specularIntensity = 1
        this.material.castShadows = false

        this.flareMaterial.albedoColor = Color3.Black()
        this.flareMaterial.albedoTexture = lightTexture
        this.flareMaterial.alphaTexture = lightTexture
        this.flareMaterial.emissiveColor = this.flareColor
        this.flareMaterial.emissiveTexture = lightTexture
        this.flareMaterial.emissiveIntensity = this.flareIntensity
        this.flareMaterial.roughness = 0
        this.flareMaterial.specularIntensity = 0
        this.flareMaterial.castShadows = false
    }

    setFocusTarget(target: Transform){
        this.target
    }

    setFocusArea(entity: Entity){

    }

    setupSunflare(){
        this.sunflareWrapper.setParent(this)
        this.sunflareWrapper.addComponent(new Transform())
        this.sunflareWrapper.setParent(this)
        this.sunflareWrapper.addComponent(new Billboard())

        this.sunflare.addComponent(this.sunflareShape)
        this.sunflare.addComponent(new Transform({
            position: new Vector3(0, 0, .5),
            scale: new Vector3().setAll(this.sunflareSize)
        }))
        this.sunflare.addComponent(new Billboard(true, true, true))
        this.sunflare.setParent(this.sunflareWrapper)
        this.sunflare.addComponent(this.flareMaterial)
    }
}

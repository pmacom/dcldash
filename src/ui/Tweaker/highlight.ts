import { Dash_UV_Plane_Crop_Image } from "../../index"
import { Dash_Material } from '../../utils/Materials'

const imageWidth = 758
const imageHeight = 516
const cropWidth = 243
const cropHeight = 21
const cropSourceX = 514
const cropSourceY = 494
const uvs = Dash_UV_Plane_Crop_Image(imageWidth, imageHeight, cropWidth, cropHeight, cropSourceX, cropSourceY)

const texture = new Texture('images/dash_admin.png')

const RedMaterial = new Material()
RedMaterial.alphaTexture = texture
RedMaterial.albedoColor = Color3.White()
RedMaterial.emissiveColor = Color3.Red()
RedMaterial.emissiveIntensity = 10

const GreenMaterial = new Material()
GreenMaterial.alphaTexture = texture
GreenMaterial.albedoColor = Color3.White()
GreenMaterial.emissiveColor = Color3.Green()
GreenMaterial.emissiveIntensity = 10

const BlueMaterial = new Material()
BlueMaterial.alphaTexture = texture
BlueMaterial.albedoColor = Color3.White()
BlueMaterial.emissiveColor = Color3.Blue()
BlueMaterial.emissiveIntensity = 80

export class TweakerSelect extends Entity {
    private shape: BoxShape = new BoxShape()
    constructor(){
        super()
        this.addComponent(this.shape)
        const m = Dash_Material.Blue()
        m.emissiveColor = Color3.Blue()
        this.addComponent(m)
        this.addComponent(new Transform({
            scale: new Vector3().setAll(1.1)
        }))

        const boops = new TweakerSelectBoxDir(RedMaterial)
        boops.setParent(this)

        const boops2 = new TweakerSelectBoxDir(GreenMaterial)
        boops2.getComponent(Transform).rotation.setEuler(0,0,90)
        boops2.setParent(this)

        const boops3 = new TweakerSelectBoxDir(BlueMaterial)
        boops3.getComponent(Transform).rotation.setEuler(0,90,0)
        boops3.setParent(this)
    }
}

export class TweakerSelectBoxDir extends Entity {
    private shape: PlaneShape = new PlaneShape()
    private entity: Entity = new Entity()

    private vWide: Entity = new Entity()
    private vTall: Entity = new Entity()

    constructor(material: Material, alt: boolean = false){
        super()
        this.shape.withCollisions = false
        this.shape.uvs = uvs

        const length = 20
        const size = .025
        this.addComponent(this.shape)
        this.addComponent(material)
        this.addComponent(new Transform({
            scale: new Vector3().set(length, size, size),
            rotation: new Quaternion().setEuler(alt ? 90 :0, 0, 0)
        }))

        this.entity.addComponent(this.shape)
        this.entity.addComponent(material)
        this.entity.addComponent(new Transform({
            rotation: new Quaternion().setEuler(90, 0, 0)
        }))
        this.entity.setParent(this)


        // this.vWide.addComponent(this.shape)
        // this.vWide.addComponent(material)
        // this.vWide.addComponent(new Transform({
        //     rotation: new Quaternion().setEuler(90, 0, 0)
        // }))
        // this.vWide.setParent(this)



        // this.vTall.addComponent(this.shape)
        // this.vTall.addComponent(material)
        // this.vTall.addComponent(new Billboard())
        // this.vTall.addComponent(new Transform({
        //     scale: new Vector3(10,10,0),
        //     rotation: new Quaternion().setEuler(90, 0, 0)
        // }))
        // this.vTall.setParent(this)
    }
}
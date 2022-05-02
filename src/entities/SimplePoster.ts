import { Dash_UV_Image } from '../utils/Uvs'

/**
    Usage:

    import { SimplePoster } from "./entities/SimplePoster";
    const sp = new Dash_SimplePoster()
    sp.getComponent(Transform).position = new Vector3(8,1,8)
    sp.setImageUrl('https://pmacom.github.io/assets/theblock/formatted/robotbar.jpg')
    sp.setHyperlink('http://www.google.com')
*/

export class Dash_SimplePoster extends Entity {
    private shape: PlaneShape = new PlaneShape()
    private material: Material = new Material()
    private texture: Texture | undefined
    private hyperlink: string | null = null

    constructor(){
        super()
        this.addComponent(this.shape)
        this.addComponent(this.material)
        this.addComponent(new Transform())
        this.shape.uvs = Dash_UV_Image()
    }

    setHyperlink(src: string){
        this.hyperlink = src
        this.addComponentOrReplace(new OnPointerDown((e) => {
            if(this.hyperlink){
                openExternalURL(this.hyperlink)
            }
        }))
    }

    setImageUrl(src: string){
        this.texture = new Texture(src)
        this.material.albedoTexture = this.texture
        this.material.emissiveColor = Color3.White()
        this.material.emissiveTexture = this.texture
        this.material.emissiveIntensity = 1
        this.addComponentOrReplace(this.material)
    }

    show(){ if(!this.alive) engine.addEntity(this) }
    hide(){ if(this.alive) engine.removeEntity(this) }
}

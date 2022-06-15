
import { Dash_BoxHighlight } from "../entities/BoxHighlight"
import { Dash_CheckWithinVolume } from "./CheckWithinVolume"
import { Dash_Material } from "./Materials"
import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "./OnUpdateFrame"

export class Dash_TriggerZone extends Entity {
    private debug: TriggerDebug | undefined
    private checkCollision: Dash_OnUpdateFrame_Instance | undefined
    public onEnter: () => void = () => {}
    public onExit: () => void = () => {}
    private hasEntered: boolean = false

    constructor(){
        super()
        engine.addEntity(this)
        this.checkCollision = Dash_OnUpdateFrame.add(() => this.check())
    }

    private check(){
        let p = this.getParent()
        let t = new Vector3()
        let s = new Vector3()
        let r = new Quaternion()

        do {
            if(p){
                let localTransform = p.getComponentOrCreate(Transform)
                t.addInPlace(localTransform.position.clone())
                s.addInPlace(localTransform.scale.clone())
                r.eulerAngles.addInPlace(localTransform.eulerAngles)
                p = p.getParent()
            }
        } while (p && p.uuid !== '0')
  
        const transform = this.getComponentOrCreate(Transform)

        this.getParent()
        const withinVolume = Dash_CheckWithinVolume(
            Vector3.Add(t, transform.position),
            Vector3.Add(s, transform.scale),
            new Vector3(
                Camera.instance.feetPosition.x,
                Camera.instance.feetPosition.y,
                Camera.instance.feetPosition.z
            )
        )

        if(withinVolume && !this.hasEntered){
            this.onEnter()
            if(this.debug) this.debug.showHighlight()
            this.hasEntered = true
        }else if(!withinVolume && this.hasEntered){
            this.onExit()
            if(this.debug) this.debug.hideHighlight()
            this.hasEntered = false
        }
    }

    enableDebug(){
        this.debug = new TriggerDebug(this)
        this.debug.show()
    }

    enable(){
        this.hasEntered = false
        this.checkCollision?.start()
    }
    disable(){
        this.hasEntered = false
        this.checkCollision?.stop()
    }
}

class TriggerDebug extends Entity {
    private shape: BoxShape | undefined
    private material: Material | undefined
    private boxHighlight: Dash_BoxHighlight

    constructor(parent: Entity, useBoxHighlight?: boolean){
        super()
        this.setParent(parent)
        this.boxHighlight = new Dash_BoxHighlight(new Vector3(), new Vector3().setAll(1), "top")
        this.boxHighlight.setParent(parent)
        this.boxHighlight.show()
    }

    show(){
        this.shape = new BoxShape()
        this.shape.withCollisions = false
        this.material = Dash_Material.Red()
        this.boxHighlight.setStripeColor(Color3.Red())
        this.addComponentOrReplace(this.shape)
        this.addComponentOrReplace(this.material)
    }

    showHighlight(){
        this.material = Dash_Material.Green()
        this.boxHighlight.setStripeColor(Color3.Green())
        this.addComponentOrReplace(this.material)
    }

    hideHighlight(){
        this.material = Dash_Material.Red()
        this.boxHighlight.setStripeColor(Color3.Red())
        this.addComponentOrReplace(this.material)
    }
}

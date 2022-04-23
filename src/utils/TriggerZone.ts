import { Dash_OnUpdateFrame } from "../index"
import { Dash_CheckWithinVolume } from "../index"
import { Dash_Material } from "../index"
import { Dash_OnUpdateFrame_Instance } from "../index"

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
        this.checkCollision.start()
    }

    private check(){
        const transform = this.getComponentOrCreate(Transform)
        const withinVolume = Dash_CheckWithinVolume(
            transform.position,
            transform.scale,
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

    enable(){this.checkCollision?.start()}
    disable(){ this.checkCollision?.stop()}
}

class TriggerDebug extends Entity {
    private shape: BoxShape | undefined
    private material: Material | undefined

    constructor(parent: Entity){
        super()
        this.setParent(parent)
    }

    show(){
        this.shape = new BoxShape()
        this.shape.withCollisions = false
        this.material = Dash_Material.opaqueRed()
        this.addComponentOrReplace(this.shape)
        this.addComponentOrReplace(this.material)
    }

    showHighlight(){
        this.material = Dash_Material.opaqueGreen()
        this.addComponentOrReplace(this.material)
    }

    hideHighlight(){
        this.material = Dash_Material.opaqueRed()
        this.addComponentOrReplace(this.material)
    }
}

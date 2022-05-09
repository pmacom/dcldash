import { Dash_Material } from "../../utils/Materials"

export class TweakerSelector extends Entity {
    private shape: BoxShape = new BoxShape()
    
    constructor(){
        super("Dash_Tweaker_Selector")
        this.shape.isPointerBlocker = false
        this.shape.withCollisions = false
        this.addComponent(this.shape)
        this.addComponent(new Transform())
        this.addComponent(Dash_Material.Green())
    }
}


import { Dash_BoxHighlight } from "../entities/BoxHighlight"
import { Dash_OnUpdateFrame } from "./OnUpdateFrame"

const playerHeight = 1.5/2
export class Dash_ZoneMaker extends Entity {
  private shape: BoxShape = new BoxShape()
  private material: Material = new Material()
  private minPosition: Vector3 = new Vector3()
  private maxPosition: Vector3 = new Vector3()
  private initialFeetPosition: Vector3 = new Vector3()
  private hasMoved: boolean = false
  private isOn: boolean = false

  private bh: Dash_BoxHighlight
  
  constructor(private startPosition: Vector3){
    super()

    this.bh = new Dash_BoxHighlight(
      new Vector3(),
      new Vector3().setAll(1),
      'top'
    )
    this.bh.setParent(this)

    this.addComponent(this.shape)
    this.addComponent(new Transform({
      position: this.startPosition.clone(),
      scale: new Vector3(1,1,1)
    }))
    this.shape.withCollisions = false

    this.material.albedoColor = new Color4(0,1,1,.1)
    this.addComponent(this.material)

    const onFrame = Dash_OnUpdateFrame.add(() => {
      const currentPosition = Camera.instance.feetPosition

      if(!this.hasMoved && Vector3.Distance(currentPosition, this.initialFeetPosition) > .1){
        this.hasMoved = true
      }

      if(this.hasMoved){
        const { x: camX, y: camY, z: camZ } = currentPosition
        const { x: minX, y: minY, z: minZ } = this.minPosition
        const { x: maxX, y: maxY, z: maxZ } = this.maxPosition

        const x = this.startPosition.x - camX
        const y = this.startPosition.y - camY
        const z = this.startPosition.z - camZ

        if(x < minX) this.minPosition.x = x
        if(y < minY) this.minPosition.y = y
        if(z < minZ) this.minPosition.z = z
        if(x > maxX) this.maxPosition.x = x
        if(y > maxY) this.maxPosition.y = y
        if(z > maxZ) this.maxPosition.z = z

        const minPosition = Vector3.Add(this.minPosition.negate(), this.startPosition)
        const maxPosition = Vector3.Add(this.maxPosition.negate(), this.startPosition)

        const center = Vector3.Center(minPosition, maxPosition)
        this.getComponent(Transform).position = Vector3.Add(center, new Vector3(0,playerHeight,0))

        this.getComponent(Transform).scale = new Vector3(
          (this.maxPosition.x - this.minPosition.x),
          (this.maxPosition.y - this.minPosition.y) + playerHeight*2,
          (this.maxPosition.z - this.minPosition.z),
        )
      }
    })

    this.addComponent(new OnPointerDown(() => {
      if(!this.isOn){
        this.hasMoved = false
        this.initialFeetPosition = Camera.instance.feetPosition.clone()
        onFrame.start()
        this.isOn = true
      }else{
        onFrame.stop()
        const position = this.getComponent(Transform).position
        const scale = this.getComponent(Transform).scale
        log(`Zone Transform: \nposition: new Vector3(${position.x}, ${position.y}, ${position.z}),\nscale: new Vector3(${scale.x}, ${scale.y}, ${scale.z})`)
        this.isOn = false
      }
    }))
  }
}

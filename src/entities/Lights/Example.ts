/*
import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "../../utils/OnUpdateFrame"
import { Dash_Material } from "../../utils/Materials"
import { StageLight } from "./Light"

class LightPositions {
    private speed: number = 4
    private diameter: number = 2
    private animation: Dash_OnUpdateFrame_Instance
    private timer: number = 0
    private entities: Entity[] = []
    public startPositions: Vector3[] = []
    public positions: Transform[] = []
  
    constructor(){
      this.animation = Dash_OnUpdateFrame.add((dt: number) => this.animate(dt))
    }
  
    addPosition(position: Vector3){
      const box = new Entity('ParentBox')
      const shape = new BoxShape()
      box.addComponent(shape)
      box.addComponent(Dash_Material.Black())
      box.addComponent(new Transform({ position }))
      engine.addEntity(box)
      this.entities.push(box)
      this.startPositions.push(position.clone())
    }
  
    animate(dt: number){
      this.timer += (dt*this.speed)
      this.entities.forEach((entity: Entity, index: number) => {
        let x = Math.cos(this.timer)*(this.diameter-1)
        let z = Math.sin(this.timer)*(this.diameter-1)
        let t = entity.getComponent(Transform)
        this.positions[index] = new Transform({
          position: Vector3.Add(new Vector3(x, 1, z), this.startPositions[index])
        })
        t.position = Vector3.Add(new Vector3(x, 1, z), this.startPositions[index])
      })
    }
  
    setSpeed(speed: number){ this.speed = speed}
    setDiameter(diameter: number){ this.diameter = diameter }
    start(){ this.animation.start() }
    stop(){ this.animation.stop() }
  }
  
  const lp = new LightPositions()
  lp.addPosition(new Vector3(8, .5, 8))
  lp.addPosition(new Vector3(3, 1, 3))
  lp.start()
  
  const light1 = new StageLight()
  light1.addComponentOrReplace(new Transform({
    position: new Vector3(8, 5, 8)
  }))
  light1.setFocusTarget(lp.positions[0])
  
  const light2 = new StageLight()
  light2.addComponentOrReplace(new Transform({
    position: new Vector3(4, 5, 4)
  }))
  light2.setFocusTarget(lp.positions[1])
  */
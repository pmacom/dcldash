import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "./OnUpdateFrame"

export const Dash_UV_Curved_Video = (sliceCount: number, sliceIndex: number): number[] => {
    let w = (sliceCount/100)*2
    let sx = (w*sliceIndex)
    let ex = (w*sliceIndex)+w
    let uv = [ sx,1, ex,1, ex,0, sx,0 ]
    return [...uv, ...uv]
}

export const Dash_UV_Curved_Image = (sliceCount: number, sliceIndex: number): number[] => {
    let w = (sliceCount/100)*2
    let sx = (w*sliceIndex)
    let ex = (w*sliceIndex)+w
    let uv = [ sx,0, ex,0, ex,1, sx,1 ]
    return [...uv, ...uv]
}

export const Dash_UV_Video = () => {
    return [ 0,1, 1,1, 1,0, 0,0, 1,1, 0,1, 0,0, 1,0 ]
}

export const Dash_UV_Image = () => {
    return [
      0,1,
      1,1,
      1,0,
      0,0,

      1,0,
      0,0,
      0,1,
      1,1,
  ]
}

export const Dash_UV_Box = () => {
    return [
        // Top
        0,1,
        1,1,
        1,0,
        0,0,
      
        // Bottom
        1,1,
        0,1,
        0,0,
        1,0,
      
        // West
        0,1,
        1,1,
        1,0,
        0,0,
        
        // East
        1,1,
        0,1,
        0,0,
        1,0,
      
        // North
        1,1,
        0,1,
        0,0,
        1,0,
      
        // South
        0,1,
        1,1,
        1,0,
        0,0,
      ]
}

export const Dash_UV_Crop_Video = (
    videoWidth: number,
    videoHeight: number,
    cropWidth: number,
    cropHeight: number,
    cropSourceX: number,
    cropSourceY: number
) => {
    const uv = [
        Scalar.InverseLerp(0, videoWidth, cropSourceX + cropWidth),
        Scalar.InverseLerp(0, videoHeight, cropSourceY + cropHeight),
        Scalar.InverseLerp(0, videoWidth, cropSourceX),
        Scalar.InverseLerp(0, videoHeight, cropSourceY + cropHeight),
        Scalar.InverseLerp(0, videoWidth, cropSourceX),
        Scalar.InverseLerp(0, videoHeight, cropSourceY),
        Scalar.InverseLerp(0, videoWidth, cropSourceX + cropWidth),
        Scalar.InverseLerp(0, videoHeight, cropSourceY),
    ]
    return [...uv, ...uv]
}

export const Dash_UV_Plane_Crop_Image = (
    imageWidth: number,
    imageHeight: number,
    cropWidth: number,
    cropHeight: number,
    cropSourceX: number,
    cropSourceY: number,
    isFlipped?: boolean, // Sometimes I want it to be upside down. I guess.
) : Array<number> => {
    let x = Scalar.InverseLerp(0, imageWidth, cropSourceX)
    let y = Scalar.InverseLerp(0, imageHeight, cropSourceY)
    let w = Scalar.InverseLerp(0, imageWidth, cropWidth)
    let h = Scalar.InverseLerp(0, imageHeight, cropHeight)

    let tr = { x: x,    y: 1-y      }
    let tl = { x: x+w,  y: 1-y      }
    let bl = { x: x+w,  y: 1-y-h    }
    let br = { x: x,    y: 1-y-h    }

    let uv = isFlipped ? [
        tr.x,        tr.y,
        tl.x,        tl.y,
        bl.x,        bl.y,
        br.x,        br.y,
    ]:[
        br.x,        br.y,
        bl.x,        bl.y,
        tl.x,        tl.y,
        tr.x,        tr.y,
    ]

    return [...uv, ...uv]
}

export class Dash_UV_Box_HScroll {
    private animation: Dash_OnUpdateFrame_Instance
    private topbottom: number[]
    private sideuvs: number[]
  
    constructor(
      private boxShape: BoxShape,
      private speed: number = .02
    ){
  
      if(!this.boxShape.uvs) this.boxShape.uvs = Dash_UV_Box()
      this.animation = Dash_OnUpdateFrame.add(this.animate)
      this.topbottom = this.boxShape.uvs.slice(0, 15)
      log(this.topbottom)
      this.sideuvs = []
    }
  
    animate(dt: number) {
      if(this.boxShape.uvs){
        let newValues = this.sideuvs.map((uv: number, index: number) => {
          this.sideuvs[index] = index % 2 == 0 ? uv-this.speed : uv
          return this.sideuvs[index]
        })
        this.boxShape.uvs = [...this.topbottom, ...newValues]
      }
    }
  
    start(){
      this.animation.start()
    }
  
    stop(){
      this.animation.stop()
    }
  
    setSpeed(speed: number){
      this.speed = speed
    }
  }



export class Dash_UV_Plane_Scroll {
  private animation: Dash_OnUpdateFrame_Instance
  private uvs: number[] = []

  constructor(
    private planeShape: PlaneShape,
    private speed: number = .01
  ){

    if(!this.planeShape.uvs) this.uvs = Dash_UV_Image()
    this.planeShape.uvs = this.uvs
    this.animation = Dash_OnUpdateFrame.add((dt: number) => this.animate(dt))
  }

  animate(dt: number) {
    if(this.planeShape.uvs){
      let newValues = this.uvs.map((uv: number, index: number) => {
        this.uvs[index] = index % 2 == 0 ? uv-this.speed : uv
        return this.uvs[index]
      })
      this.planeShape.uvs = [...newValues]
    }
  }

  start(){
    this.animation.start()
  }

  stop(){
    this.animation.stop()
  }

  setSpeed(speed: number){
    this.speed = speed
  }
}
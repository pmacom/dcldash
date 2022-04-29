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
    return [ 1,0, 0,0, 0,1, 1,1, 0,0, 1,0, 1,1, 0,1 ]
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

export const Dash_UV_UI_Crop_Image = (
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
        bl.x,        bl.y,
        br.x,        br.y,
        tr.x,        tr.y,
        tl.x,        tl.y,
    ]:[
        tl.x,        tl.y,
        tr.x,        tr.y,
        br.x,        br.y,
        bl.x,        bl.y,
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
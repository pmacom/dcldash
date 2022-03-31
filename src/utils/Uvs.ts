export const DCLCONNECT_UV_GET_CURVED_VIDEO = (sliceCount: number, sliceIndex: number): number[] => {
    let w = (sliceCount/100)*2
    let sx = (w*sliceIndex)
    let ex = (w*sliceIndex)+w
    let uv = [ sx,1, ex,1, ex,0, sx,0 ]
    return [...uv, ...uv]
}

export const DCLCONNECT_UV_GET_CURVED_IMAGE = (sliceCount: number, sliceIndex: number): number[] => {
    let w = (sliceCount/100)*2
    let sx = (w*sliceIndex)
    let ex = (w*sliceIndex)+w
    let uv = [ sx,0, ex,0, ex,1, sx,1 ]
    return [...uv, ...uv]
}

export const DCLCONNECT_UV_GET_VIDEO = () => {
    const uv = [ 1,0, 0,0, 0,1, 1,1 ]
    return [...uv, ...uv]
}

export const DCLCONNECT_UV_GET_IMAGE = () => {
    const uv = [ 1,0, 0,0, 0,1, 1,1 ]
    return [...uv, ...uv]
}

export const DCLCONNECT_UV_CROP_VIDEO = (width: number, height: number, sourceX: number, sourceY: number) => {
    const uv = [
        Scalar.InverseLerp(0, width, sourceX + width),
        Scalar.InverseLerp(0, height, sourceY + height),
        Scalar.InverseLerp(0, width, sourceX),
        Scalar.InverseLerp(0, height, sourceY + height),
        Scalar.InverseLerp(0, width, sourceX),
        Scalar.InverseLerp(0, height, sourceY),
        Scalar.InverseLerp(0, width, sourceX + width),
        Scalar.InverseLerp(0, height, sourceY),
    ]
    return [...uv, ...uv]
}
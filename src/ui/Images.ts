import { Dash_UI_Image_Setting, Dash_UI_StaticImages } from "./interfaces"

export const Dash_UI_Generate_StaticImages = (
    parent: UIShape,
    texture: Texture,
    settings: Dash_UI_StaticImages,
    onCreate?: (name: string, data: any, image: UIImage) => void,
) : UIImage[] => {
    const images: UIImage[] = []
    Object.keys(settings).forEach((settingName: string) => {
        const setting = settings[settingName]
        const image = Dash_UI_StaticImage(parent, texture, setting)
        images.push(image)
        if(onCreate){ onCreate(settingName, setting.data ? setting.data : {}, image) }
    })
    return images
}

export const Dash_UI_Generate_StaticButtons = (
    parent: UIShape,
    texture: Texture,
    settings: Dash_UI_StaticImages,
    onClick: (data?: any) => void,
) : UIImage[] => {
    const images: UIImage[] = []
    Object.keys(settings).forEach((imageName: string) => {
        const setting = settings[imageName]
        const image = Dash_UI_Generate_StaticButton(parent, texture, setting, onClick)
        images.push(image)
    })
    return images
}

export const Dash_UI_Generate_StaticButton = (
    parent: UIShape,
    texture: Texture,
    setting: Dash_UI_Image_Setting,
    onClick: (data?: any) => void,
): UIImage => {
    const image = Dash_UI_StaticImage(parent, texture, setting)
    image.onClick = new OnPointerDown(() => onClick(setting.data))
    return image
}

export const Dash_UI_StaticImage = (
    parent: UIShape,
    texture: Texture,
    setting: Dash_UI_Image_Setting,
): UIImage => {
    let image = new UIImage(parent, texture)
    const { renderSettings, cropSettings } = setting
    const { vAlign, hAlign } = renderSettings
    image.width = renderSettings.width
    image.height = renderSettings.height
    image.sourceLeft = cropSettings.positionX
    image.sourceTop = cropSettings.positionY
    image.sourceWidth = cropSettings.width
    image.sourceHeight = cropSettings.height
    image.positionX = renderSettings.positionX
    image.positionY = renderSettings.positionY
    image.vAlign = vAlign ? vAlign : 'top'
    image.hAlign = hAlign ? hAlign : "left"
    return image
}

export const Dash_UI_Crop_Image = (
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
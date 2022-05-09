export interface Dash_UI_Image_RenderSettings {
    positionX: number
    positionY: number
    width: number
    height: number
    vAlign?: string
    hAlign?: string
}

export interface Dash_UI_Image_CropSettings {
    positionX: number
    positionY: number
    width: number
    height: number
}

export interface Dash_UI_Image_Setting {
    renderSettings: Dash_UI_Image_RenderSettings
    cropSettings: Dash_UI_Image_CropSettings,
    data?: any,
}

export interface Dash_UI_StaticImages {
    [key: string]: Dash_UI_Image_Setting
}
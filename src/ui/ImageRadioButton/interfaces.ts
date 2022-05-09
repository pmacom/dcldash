import { Dash_UI_Image_CropSettings, Dash_UI_Image_RenderSettings } from "../interfaces"

export interface Dash_UI_ImageRadioButton_Settings {
    renderSettings: Dash_UI_Image_RenderSettings
    on: Dash_UI_Image_CropSettings,
    off: Dash_UI_Image_CropSettings,
}

export interface Dash_UI_ImageRadioButton_Group_Settings {
    [key: string | number]: Dash_UI_ImageRadioButton_Settings
}

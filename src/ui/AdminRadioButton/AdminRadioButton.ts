import { Dash_GlobalCanvas } from "../../utils/GlobalCanvas"
import {
    Dash_UI_AdminRadioButton_Button_Settings,
    Dash_UI_AdminRadioButton_Position_Settings
} from "./interfaces"

export class Dash_UI_AdminRadioButton {
    public image: UIImage

    constructor(
        private texture: Texture,
        private value: number | string,
        private renderSettings: Dash_UI_AdminRadioButton_Position_Settings,
        private onButtonSettings: Dash_UI_AdminRadioButton_Button_Settings,
        private offButtonSettings: Dash_UI_AdminRadioButton_Button_Settings,
        private onChange: (value: number | string) => void,
        private isActive: boolean = false
    ){
        this.image = new UIImage(Dash_GlobalCanvas, this.texture)
        this.image.onClick = new OnPointerDown(() => { this.onChange(this.value) })
        this.image.positionX = renderSettings.positionX
        this.image.positionY = renderSettings.positionY
        this.image.width = renderSettings.width
        this.image.height = renderSettings.height
        this.setValues(this.isActive ? onButtonSettings : offButtonSettings)
    }

    setValues(setting: Dash_UI_AdminRadioButton_Button_Settings){
        // this.image.width = setting.width
        // this.image.height = setting.height
        this.image.sourceLeft = setting.positionX
        this.image.sourceTop = setting.positionY
        this.image.sourceWidth = setting.width
        this.image.sourceHeight = setting.height
        this.image.vAlign = "top"
        this.image.hAlign = "left"
    }

    turnOn(){ this.setValues(this.onButtonSettings) }
    turnOff(){ this.setValues(this.offButtonSettings) }
}
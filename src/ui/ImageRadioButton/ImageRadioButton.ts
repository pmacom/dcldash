import { Dash_UI_Image_CropSettings } from "../interfaces"
import {
    Dash_UI_ImageRadioButton_Settings,
} from "./interfaces"

export class Dash_UI_ImageRadioButton {
    public image: UIImage

    constructor(
        private parent: UIShape,
        private texture: Texture,
        private value: number | string,
        private settings: Dash_UI_ImageRadioButton_Settings,
        private onChange: (value: number | string) => void,
        private isActive: boolean = false
    ){
        this.image = new UIImage(this.parent, this.texture)
        this.image.onClick = new OnPointerDown(() => { this.onChange(this.value) })
        const { on, off } = this.settings
        this.setValues(this.isActive ? on : off)
    }

    setValues(setting: Dash_UI_Image_CropSettings){
        const { width, height, vAlign, hAlign, positionX, positionY } = this.settings.renderSettings
        this.image.width = width
        this.image.height = height
        this.image.sourceLeft = setting.positionX
        this.image.sourceTop = setting.positionY
        this.image.sourceWidth = setting.width
        this.image.sourceHeight = setting.height
        this.image.positionX = positionX
        this.image.positionY = (positionY*-1)
        this.image.vAlign = vAlign ? vAlign : "top"
        this.image.hAlign = hAlign ? hAlign : "left"
    }

    turnOn(){ this.setValues(this.settings.on) }
    turnOff(){ this.setValues(this.settings.off) }
}
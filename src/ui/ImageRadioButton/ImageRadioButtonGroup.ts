import { Dash_UI_ImageRadioButton_Group_Settings } from "./interfaces"
import { Dash_UI_ImageRadioButton } from "./ImageRadioButton"

declare const Map: any

export class Dash_UI_ImageRadioButton_Group {
    private mapping: typeof Map = new Map()
    private value: number | string = "1"

    constructor(
        parent: UIShape,
        texture: Texture,
        settings: Dash_UI_ImageRadioButton_Group_Settings,
        private update: (unitValue: string) => void
    ){
        Object.keys(settings).forEach(key => {
            const setting = settings[key]
            const { on, off, renderSettings } = setting
            const toggle = new Dash_UI_ImageRadioButton(parent, texture, key, setting,
                (value: any) => {
                    this.mapping.forEach((t: Dash_UI_ImageRadioButton, key: string | number) => {
                        if(`${value}` == `${key}`){ t.turnOn() } else { t.turnOff() }
                    })
                    this.update(value)
                },
            )
            if(key == this.value){ toggle.turnOn()}
            this.mapping.set(key, toggle)
        })
    }
    setValue(value: number | string){
        this.value = value
        this.mapping.forEach((t: Dash_UI_ImageRadioButton, key: string | number) => {
            if(`${value}` == `${key}`){ t.turnOn() } else { t.turnOff() }
        })
    }
    hide(){ this.mapping.forEach((uiImage: Dash_UI_ImageRadioButton) => {
        uiImage.image.visible = false
    })}
    show(){ this.mapping.forEach((uiImage: Dash_UI_ImageRadioButton) => {
        uiImage.image.visible = true
    })}
}
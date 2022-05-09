import { Dash_UI_AdminRadioButton } from "./AdminRadioButton"
import { Dash_UI_AdminRadioButton_Group_Settings } from "./interfaces"

declare const Map: any

export class Dash_UI_AdminRadioButton_Group {
    private mapping: typeof Map = new Map()
    private value: number | string = "1"

    constructor(
        texture: Texture,
        settings: Dash_UI_AdminRadioButton_Group_Settings,
        private update: (value: any) => void
    ){
        Object.keys(settings).forEach(key => {
            const setting = settings[key]
            const { on, off, renderSettings } = setting
            const toggle = new Dash_UI_AdminRadioButton(texture, key, renderSettings, on, off,
                (value: number | string) => {
                    this.mapping.forEach((t: Dash_UI_AdminRadioButton, key: string | number) => {
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
        this.mapping.forEach((t: Dash_UI_AdminRadioButton, key: string | number) => {
            if(`${value}` == `${key}`){ t.turnOn() } else { t.turnOff() }
        })
    }
    hide(){ this.mapping.forEach((uiImage: Dash_UI_AdminRadioButton) => {
        uiImage.image.visible = false
    })}
    show(){ this.mapping.forEach((uiImage: Dash_UI_AdminRadioButton) => {
        uiImage.image.visible = true
    })}
}
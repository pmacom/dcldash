
import { isPreviewMode } from "@decentraland/EnvironmentAPI"
import { Dash_Cache_Texture } from "../../cache/texture"
import { Dash_UI_AdminRadioButton_Group } from "../AdminRadioButton/AdminRadioButtonGroup"
import { Dash_Tweaker_Instance } from "../Tweaker/Tweaker"
import { Dash_AdminUI_RadioButtons } from "./imageData"

declare const Map: any

export enum Dash_AdminMenu_Mode {
    NONE,
    TWEAKER,
    ZONE
}

const Dash_AdminTexture = Dash_Cache_Texture.create('https://pmacom.github.io/assets/dcldash/images/ui/dash_admin.png')
let Dash_AdminMenuInstance : Dash_AdminMenu | undefined

export class Dash_AdminMenu {
    private mode: Dash_AdminMenu_Mode = Dash_AdminMenu_Mode.NONE
    private modeSelect: Dash_UI_AdminRadioButton_Group | undefined
    public tweaker: Dash_Tweaker_Instance = new Dash_Tweaker_Instance()

    constructor(){
        executeTask(async () => {
            const previewMode = await isPreviewMode()
            if(previewMode){
                this.modeSelect = new Dash_UI_AdminRadioButton_Group(Dash_AdminTexture, Dash_AdminUI_RadioButtons, (mode: any) => {
                    switch(mode){
                        case 'tweaker':
                            this.mode = this.mode !== Dash_AdminMenu_Mode.TWEAKER ? Dash_AdminMenu_Mode.TWEAKER: Dash_AdminMenu_Mode.NONE
                            break
                        case 'zone':
                            this.mode = this.mode !== Dash_AdminMenu_Mode.ZONE ? Dash_AdminMenu_Mode.ZONE: Dash_AdminMenu_Mode.NONE
                            break
                    }
                    this.updateVisible()
                })
            }
        })
    }

    updateVisible(){
        this.hideAll()
        switch(this.mode){
            case Dash_AdminMenu_Mode.TWEAKER:
                if(this.tweaker) this.tweaker.show()
                break
            case Dash_AdminMenu_Mode.ZONE:  
                break
            default:
                this.modeSelect?.setValue('')
                break
        }
    }

    hideAll(){
       if(this.tweaker) this.tweaker.hide()
    }
}

export const Dash_Tweaker = (entity: Entity | undefined | null) => {
    if(!Dash_AdminMenuInstance){
        Dash_AdminMenuInstance = new Dash_AdminMenu()
        Dash_AdminMenuInstance.tweaker?.setTarget(entity)
    }else{
        Dash_AdminMenuInstance.tweaker?.setTarget(entity)
    }
}
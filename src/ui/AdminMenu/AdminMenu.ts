
import { isPreviewMode } from "@decentraland/EnvironmentAPI"
import { Dash_Cache_Texture } from "../../cache/texture"
import { Dash_UI_AdminRadioButton_Group } from "../AdminRadioButton/AdminRadioButtonGroup"
import { Dash_Tweaker, Dash_Tweaker_Instance } from "../Tweaker/Tweaker"
import { Dash_AdminUI_RadioButtons } from "./imageData"

declare const Map: any

export enum Dash_AdminMenu_Mode {
    NONE,
    TWEAKER,
    ZONE
}

const Dash_AdminTexture = Dash_Cache_Texture.create('https://pmacom.github.io/assets/dcldash/images/ui/dash_admin.png')

export class Dash_AdminMenu_Instance {
    private mode: Dash_AdminMenu_Mode = Dash_AdminMenu_Mode.NONE
    private modeSelect: Dash_UI_AdminRadioButton_Group | undefined
    private tweaker: Dash_Tweaker_Instance | undefined

    constructor(){
        log('Creating an admin menu')
        executeTask(async () => {
            
            const previewMode = await isPreviewMode()
            if(previewMode){
                this.tweaker = Dash_Tweaker
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
        }
    }

    hideAll(){
       if(this.tweaker) this.tweaker.hide()
    }
}

export const Dash_AdminMenu = new Dash_AdminMenu_Instance()
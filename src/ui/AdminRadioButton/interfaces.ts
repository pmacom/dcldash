export interface Dash_UI_AdminRadioButton_Position_Settings {
    positionX: number
    positionY: number
    width: number
    height: number
}

export interface Dash_UI_AdminRadioButton_Button_Settings {
    positionX: number
    positionY: number
    width: number
    height: number
}

export interface Dash_UI_AdminRadioButton_Group_Settings {
    [key: string | number]: {
        renderSettings: Dash_UI_AdminRadioButton_Position_Settings
        on: Dash_UI_AdminRadioButton_Button_Settings,
        off: Dash_UI_AdminRadioButton_Button_Settings,
    }
}

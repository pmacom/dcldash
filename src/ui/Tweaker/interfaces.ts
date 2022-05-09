export interface TweakerRadioImagePositionSettings {
    positionX: number
    positionY: number
}

export interface TweakerRadioImageButtonGroupSettings {
    positionX: number
    positionY: number
    width: number
    height: number
}

export interface TweakerRadioButtonGroupSettings {
    [key: string | number]: {
        position: TweakerRadioImagePositionSettings
        on: TweakerRadioImageButtonGroupSettings,
        off: TweakerRadioImageButtonGroupSettings,
    }
}


export interface ITweakerImageSettings {
    name: string
    xPosition: number
    yPosition: number
    width: number
    height: number
    isSelectedImage?: boolean
    isScrollList?: boolean
    unit?: number
}

export interface ITweakerImageUnitSettings {
    name: string
    xPosition: number
    yPosition: number
    width: number
    height: number
    unit: number
}

export interface ITweakerImageNudgeSettings {
    name: string
    xPosition: number
    yPosition: number
    width: number
    height: number
    type: string
    positive: boolean
}

export interface ITweakerToggleButtons {
    positionTab: {
        on: UIImage,
        off: UIImage
    },
    rotationTab: {
        on: UIImage,
        off: UIImage
    }
}

export interface ITweakerButtonImageSettings {
    image: UIImage
    type: string
    positive: boolean
}

export interface ITweakerDirectionSetting {
    direction: "x" | "y" | "z" | "all"
    positive: boolean
}

export enum TweakerMode {
    POSITION,
    ROTATION
}
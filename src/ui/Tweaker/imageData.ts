import { Dash_UI_ImageRadioButton_Group_Settings } from "../ImageRadioButton/interfaces"
import { Dash_UI_StaticImages } from "../interfaces"

const scale = .68

export const TweakerPositionUnits: Dash_UI_ImageRadioButton_Group_Settings = {
    5: {
        renderSettings: {
            positionX: 0,
            positionY: 43*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 45*scale,
        },
        off: {
            positionX: 80,
            positionY: 43,
            width: 80,
            height: 45,
        },
        on: {
            positionX: 0,
            positionY: 43,
            width: 80,
            height: 45,
        }
    },


    1: {
        renderSettings: {
            positionX: 0,
            positionY: (45+43)*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 40*scale,
        },
        off: {
            positionX: 80,
            positionY: 88,
            width: 80,
            height: 40,
        },
        on: {
            positionX: 0,
            positionY: 88,
            width: 80,
            height: 40,
        }
    },


    .1: {
        renderSettings: {
            positionX: 0,
            positionY: (85+43)*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 41*scale,
        },
        off: {
            positionX: 80,
            positionY: 128,
            width: 80,
            height: 41,
        },
        on: {
            positionX: 0,
            positionY: 128,
            width: 80,
            height: 41,
        }
    },


    .01: {
        renderSettings: {
            positionX: 0,
            positionY: (126+43)*scale,
            width: 80*scale,
            height: 41*scale,
        },
        off: {
            positionX: 80,
            positionY: 169,
            width: 80,
            height: 41,
        },
        on: {
            positionX: 0,
            positionY: 169,
            width: 80,
            height: 41,
        }
    },


    .001: {
        renderSettings: {
            positionX: 0,
            positionY: (167+43)*scale,
            width: 80*scale,
            height: 49*scale,
        },
        off: {
            positionX: 80,
            positionY: 210,
            width: 80,
            height: 49,
        },
        on: {
            positionX: 0,
            positionY: 210,
            width: 80,
            height: 49,
        }
    },
}




export const TweakerRotationUnits: Dash_UI_ImageRadioButton_Group_Settings = {
    90: {
        renderSettings: {
            positionX: 0,
            positionY: 43*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 45*scale,
        },
        off: {
            positionX: 80,
            positionY: 302,
            width: 80,
            height: 43,
        },
        on: {
            positionX: 0,
            positionY: 302,
            width: 80,
            height: 43,
        }
    },


    45: {
        renderSettings: {
            positionX: 0,
            positionY: (45+43)*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 40*scale,
        },
        off: {
            positionX: 80,
            positionY: 345,
            width: 80,
            height: 40, 
        },
        on: {
            positionX: 0,
            positionY: 345,
            width: 80,
            height: 40,
        }
    },


    5: {
        renderSettings: {
            positionX: 0,
            positionY: (85+43)*scale,
            vAlign: "top",
            hAlign: "left",
            width: 80*scale,
            height: 41*scale,
        },
        off: {
            positionX: 80,
            positionY: 385,
            width: 80,
            height: 41,
        },
        on: {
            positionX: 0,
            positionY: 385,
            width: 80,
            height: 41,
        }
    },


    1: {
        renderSettings: {
            positionX: 0,
            positionY: (126+43)*scale,
            width: 80*scale,
            height: 41*scale,
        },
        off: {
            positionX: 80,
            positionY: 426,
            width: 80,
            height: 40,
        },
        on: {
            positionX: 0,
            positionY: 426,
            width: 80,
            height: 40,
        }
    },


    .1: {
        renderSettings: {
            positionX: 0,
            positionY: (167+43)*scale,
            width: 80*scale,
            height: 49*scale,
        },
        off: {
            positionX: 80,
            positionY: 466,
            width: 80,
            height: 49,
        },
        on: {
            positionX: 0,
            positionY: 466,
            width: 80,
            height: 49,
        }
    },
}

const modePanelOffset = 80
export const ModeToggleTabButtons: Dash_UI_ImageRadioButton_Group_Settings = {
    'position': {
        renderSettings: {
            positionX: (288-modePanelOffset)*scale,
            positionY: 0,
            width: 114*scale,
            height: 50*scale,
        },
        on: {
            positionX: 288,
            positionY: 0,
            width: 114,
            height: 50,
        },
        off: {
            positionX: 288,
            positionY: 260,
            width: 114,
            height: 50,
        }
    },
    'rotation': {
        renderSettings: {
            positionX: (402-modePanelOffset)*scale,
            positionY: 0,
            width: 113*scale,
            height: 50*scale,
        },
        on: {
            positionX: 402,
            positionY: 260,
            width: 113,
            height: 50,
        },
        off: {
            positionX: 402,
            positionY: 0,
            width: 113,
            height: 50,
        },
    }
}

export const TweakerStaticImages: Dash_UI_StaticImages = {
    'labelUnit': {
        renderSettings: {
            positionX: 0,
            positionY: 0,
            width: 80*scale,
            height: 43*scale,
        },
        cropSettings: {
            positionX: 80,
            positionY: 0,
            width: 80,
            height: 43,
        },
    },
    'labelScale': {
        renderSettings: {
            positionX: 80*scale,
            positionY: 0,
            width: 125*scale,
            height: 43*scale,
        },
        cropSettings: {
            positionX: 160,
            positionY: 0,
            width: 125,
            height: 43,
        },
    },
    'directionTL': {
        renderSettings: {
            positionX: (288-modePanelOffset)*scale,
            positionY: (50*scale)*-1,
            width: 81*scale,
            height: 64*scale,
        },
        cropSettings: {
            positionX: 288,
            positionY: 50,
            width: 81,
            height: 64,
        },
    },
    'directionTR': {
        renderSettings: {
            positionX: (437-modePanelOffset)*scale,
            positionY: (50*scale)*-1,
            width: 78*scale,
            height: 64*scale,
        },
        cropSettings: {
            positionX: 437,
            positionY: 50,
            width: 78,
            height: 64,
        },
    },
    'directionBL': {
        renderSettings: {
            positionX: (288-modePanelOffset)*scale,
            positionY: (183*scale)*-1,
            width: 81*scale,
            height: 77*scale,
        },
        cropSettings: {
            positionX: 288,
            positionY: 183,
            width: 81,
            height: 77,
        },
    },
    'directionBR': {
        renderSettings: {
            positionX: (437-modePanelOffset)*scale,
            positionY: (183*scale)*-1,
            width: 78*scale,
            height: 77*scale,
        },
        cropSettings: {
            positionX: 437,
            positionY: 183,
            width: 78,
            height: 77,
        },
    },
    'infoPaneTest': {
        renderSettings: {
            positionX: (515-modePanelOffset)*scale,
            positionY: (0*scale)*-1,
            width: 243*scale,
            height: 207*scale,
        },
        cropSettings: {
            positionX: 515,
            positionY: 0,
            width: 243,
            height: 207,
        },
    },
}

export const SelectButtons: Dash_UI_StaticImages = {
    'selectOn': {
        renderSettings: {
            positionX: (570-modePanelOffset)*scale,
            positionY: (207*scale)*-1,
            width: 94*scale,
            height: 55*scale,
        },
        cropSettings: {
            positionX: 608,
            positionY: 438,
            width: 94,
            height: 55,
        },
        data: {
            action: 'setSelectOff'
        }
    },
    'selectOff': {
        renderSettings: {
            positionX: (570-modePanelOffset)*scale,
            positionY: (207*scale)*-1,
            width: 94*scale,
            height: 55*scale,
        },
        cropSettings: {
            positionX: 514,
            positionY: 438,
            width: 94,
            height: 55,
        },
        data: {
            action: 'setSelectOn'
        }
    },
    'deselect': {
        renderSettings: {
            positionX: (570-modePanelOffset)*scale,
            positionY: (207*scale)*-1,
            width: 94*scale,
            height: 55*scale,
        },
        cropSettings: {
            positionX: 570,
            positionY: 207,
            width: 94,
            height: 55,
        },
        data: {
            action: 'deselect'
        }
    },
}

export const TweakerScaleButtonImages: Dash_UI_StaticImages = {
    'scaleXMinus': {
        renderSettings: {
            positionX: (160-modePanelOffset)*scale,
            positionY: (43*scale)*-1,
            width: 64*scale,
            height: 53*scale,
        },
        cropSettings: {
            positionX: 160,
            positionY: 43,
            width: 64,
            height: 53,
        },
        data: {
            direction: 'x',
            negative: true,
        }
    },
    'scaleXPlus': {
        renderSettings: {
            positionX: (224-modePanelOffset)*scale,
            positionY: (43*scale)*-1,
            width: 61*scale,
            height: 53*scale,
        },
        cropSettings: {
            positionX: 224,
            positionY: 43,
            width: 61,
            height: 53,
        },
        data: {
            direction: 'x',
            positive: true,
        }
    },
    'scaleYMinus': {
        renderSettings: {
            positionX: (160-modePanelOffset)*scale,
            positionY: (96*scale)*-1,
            width: 64*scale,
            height: 52*scale,
        },
        cropSettings: {
            positionX: 160,
            positionY: 96,
            width: 64,
            height: 52,
        },
        data: {
            direction: 'y',
            positive: false,
        }
    },
    'scaleYPlus': {
        renderSettings: {
            positionX: (224-modePanelOffset)*scale,
            positionY: (96*scale)*-1,
            width: 61*scale,
            height: 52*scale,
        },
        cropSettings: {
            positionX: 224,
            positionY: 96,
            width: 61,
            height: 52,
        },
        data: {
            direction: 'y',
            positive: true,
        }
    },
    'scaleZMinus': {
        renderSettings: {
            positionX: (160-modePanelOffset)*scale,
            positionY: (148*scale)*-1,
            width: 64*scale,
            height: 53*scale,
        },
        cropSettings: {
            positionX: 160,
            positionY: 148,
            width: 64,
            height: 53,
        },
        data: {
            direction: 'z',
            positive: false,
        }
    },
    'scaleZPlus': {
        renderSettings: {
            positionX: (224-modePanelOffset)*scale,
            positionY: (148*scale)*-1,
            width: 61*scale,
            height: 53*scale,
        },
        cropSettings: {
            positionX: 224,
            positionY: 148,
            width: 61,
            height: 53,
        },
        data: {
            direction: 'z',
            positive: true,
        }
    },
    'scaleAllMinus': {
        renderSettings: {
            positionX: (160-modePanelOffset)*scale,
            positionY: (201*scale)*-1,
            width: 64*scale,
            height: 58*scale,
        },
        cropSettings: {
            positionX: 160,
            positionY: 201,
            width: 64,
            height: 58,
        },
        data: {
            direction: 'all',
            positive: false,
        }
    },
    'scaleAllPlus': {
        renderSettings: {
            positionX: (224-modePanelOffset)*scale,
            positionY: (201*scale)*-1,
            width: 61*scale,
            height: 58*scale,
        },
        cropSettings: {
            positionX: 224,
            positionY: 201,
            width: 61,
            height: 58,
        },
        data: {
            direction: 'all',
            positive: true,
        }
    },
}

export const TweakerPositionButtonImages: Dash_UI_StaticImages = {
    'north': {
        renderSettings: {
            positionX: (369-modePanelOffset)*scale,
            positionY: (50*scale)*-1,
            width: 68*scale,
            height: 64*scale,
        },
        cropSettings: {
            positionX: 369,
            positionY: 50,
            width: 68,
            height: 64,
        },
        data: {
            direction: 'x',
            positive: true,
        }
    },
    'south': {
        renderSettings: {
            positionX: (369-modePanelOffset)*scale,
            positionY: (183*scale)*-1,
            width: 68*scale,
            height: 77*scale,
        },
        cropSettings: {
            positionX: 369,
            positionY: 183,
            width: 68,
            height: 77,
        },
        data: {
            direction: 'x',
            positive: false,
        }
    },
    'east': {
        renderSettings: {
            positionX: (437-modePanelOffset)*scale,
            positionY: (114*scale)*-1,
            width: 78*scale,
            height: 69*scale,
        },
        cropSettings: {
            positionX: 437,
            positionY: 114,
            width: 78,
            height: 69,
        },
        data: {
            direction: 'z',
            positive: true,
        }
    },
    'west': {
        renderSettings: {
            positionX: (288-modePanelOffset)*scale,
            positionY: (114*scale)*-1,
            width: 81*scale,
            height: 69*scale,
        },
        cropSettings: {
            positionX: 288,
            positionY: 114,
            width: 81,
            height: 69,
        },
        data: {
            direction: 'z',
            positive: false,
        }
    },
    'up': {
        renderSettings: {
            positionX: (369-modePanelOffset)*scale,
            positionY: (114*scale)*-1,
            width: 68*scale,
            height: 34*scale,
        },
        cropSettings: {
            positionX: 369,
            positionY: 114,
            width: 68,
            height: 34,
        },
        data: {
            direction: 'y',
            positive: true,
        }
    },
    'down': {
        renderSettings: {
            positionX: (369-modePanelOffset)*scale,
            positionY: (148*scale)*-1,
            width: 68*scale,
            height: 35*scale,
        },
        cropSettings: {
            positionX: 369,
            positionY: 148,
            width: 68,
            height: 35,
        },
        data: {
            direction: 'y',
            positive: false,
        }
    },
}

export const TweakerInfoButtons: Dash_UI_StaticImages = {
    'revert': {
        renderSettings: {
            positionX: (515-modePanelOffset)*scale,
            positionY: (207*scale)*-1,
            width: 55*scale,
            height: 55*scale,
        },
        cropSettings: {
            positionX: 515,
            positionY: 207,
            width: 55,
            height: 55,
        },
        data: {
            action: 'revert'
        }
    },
    'log': {
        renderSettings: {
            positionX: (664-modePanelOffset)*scale,
            positionY: (207*scale)*-1,
            width: 94*scale,
            height: 56*scale,
        },
        cropSettings: {
            positionX: 664,
            positionY: 207,
            width: 94,
            height: 56,
        },
        data: {
            action: 'log'
        }
    }
}
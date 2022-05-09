import { _get } from "../../helpers/helpers"

let startY = 52
let startX = 129
let offsetX = 47
let offset = 20
let fontSize = 9

declare const Map: any

export class Dash_Admin_Tweaker_InfoDetails {
    private detailValues: typeof Map = new Map()
    private nameField: UIText 
    private name: string | undefined

    constructor(parent: UIShape){
        const px = new InfoDetailValue(parent, 'position.x')
        px.text.positionX = startX
        px.text.positionY = startY
        this.detailValues.set('position.x', px)
        const py = new InfoDetailValue(parent, 'position.y')
        py.text.positionX = startX
        py.text.positionY = startY-(offset*1)
        this.detailValues.set('position.y', py)
        const pz = new InfoDetailValue(parent, 'position.z')
        pz.text.positionX = startX
        pz.text.positionY = startY-(offset*2)
        this.detailValues.set('position.z', pz)

        const sx = new InfoDetailValue(parent, 'scale.x')
        sx.text.positionX = startX+(offsetX*1)
        sx.text.positionY = startY
        this.detailValues.set('scale.x', sx)
        const sy = new InfoDetailValue(parent, 'scale.y')
        sy.text.positionX = startX+(offsetX*1)
        sy.text.positionY = startY-(offset*1)
        this.detailValues.set('scale.y', sy)
        const sz = new InfoDetailValue(parent, 'scale.z')
        sz.text.positionX = startX+(offsetX*1)
        sz.text.positionY = startY-(offset*2)
        this.detailValues.set('scale.z', sz)

        const rx = new InfoDetailValue(parent, 'rotation.eulerAngles.x')
        rx.text.positionX = startX+(offsetX*2)
        rx.text.positionY = startY
        this.detailValues.set('rotation.eulerAngles.x', rx)
        const ry = new InfoDetailValue(parent, 'rotation.eulerAngles.y')
        ry.text.positionX = startX+(offsetX*2)
        ry.text.positionY = startY-(offset*1)
        this.detailValues.set('rotation.eulerAngles.y', ry)
        const rz = new InfoDetailValue(parent, 'rotation.eulerAngles.z')
        rz.text.positionX = startX+(offsetX*2)
        rz.text.positionY = startY-(offset*2)
        this.detailValues.set('rotation.eulerAngles.z', rz)


        this.nameField = new UIText(parent)
        this.nameField.fontSize = 15
        this.nameField.fontSize = fontSize
        this.nameField.opacity = 1
        this.nameField.positionX = 108
        this.nameField.positionY = -22
        this.nameField.hTextAlign = "left"
        this.setInfo()
    }

    setInitialValues(path: string, value: number, isRotation: boolean = false){
        if(this.detailValues.has(path)){
            const detailValue = this.detailValues.get(path) as InfoDetailValue
            detailValue.setInitialValue(value, isRotation)
        }
    }

    set(path: string, value: number, isRotation: boolean = false){
        if(this.detailValues.has(path)){
            const detailValue = this.detailValues.get(path) as InfoDetailValue
            detailValue.setValue(value, isRotation)
        }
    }

    clear(){
        this.detailValues.forEach((detailValue: InfoDetailValue) => {
            detailValue.setInitialValue(0)
            this.setInfo()
        })
    }

    setInfo(entity?: Entity){
        if(entity){
            const { uuid, name } = entity
            this.nameField.value = `UUID: ${uuid}\nName: ${name ? name : 'No Name'}`
        }else{
            this.nameField.value = "No Entity Selected"
        }
    }
}

class InfoDetailValue {
    public text: UIText 
    private initialValue: string = '0'

    constructor(parent: UIShape, private path: string){
        this.text = new UIText(parent)
        this.text.fontSize = 10
        this.text.value = ""
        this.text.fontSize = fontSize
        this.text.opacity = .5
    }

    setInitialValue(value: number, isRotation: boolean = false){
        let textValue = formatText(value)
        this.text.value = textValue
        this.initialValue = textValue
        this.text.opacity = .5
    }

    setValue(value: number, isRotation: boolean = false){
        let textValue = formatText(value, isRotation)
        if(textValue !== this.initialValue) this.text.opacity = 1
        this.text.value = textValue
    }
}



const formatText = (value: number, isRotation: boolean = false) => {
    return !!value ? parseFloat(`${value}`).toFixed(isRotation ? 2 : 3) : '0'
}
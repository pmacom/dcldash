
import { Dash_Admin_Tweaker_InfoDetails } from "./infoDetails"
import { TweakerSelector } from "./Selector"

import {
    ModeToggleTabButtons,
    SelectButtons,
    TweakerInfoButtons,
    TweakerPositionButtonImages,
    TweakerPositionUnits,
    TweakerRotationUnits,
    TweakerScaleButtonImages,
    TweakerStaticImages
} from "./imageData"
import {
    ITweakerDirectionSetting,
    TweakerMode,
} from "./interfaces"
import { Dash_UI_ImageRadioButton_Group } from "../ImageRadioButton/ImageRadioButtonGroup"
import { Dash_GlobalCanvas } from "../../utils/GlobalCanvas"
import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "../../utils/OnUpdateFrame"
import { Dash_UI_Generate_StaticButtons, Dash_UI_Generate_StaticImages } from "../Images"
import { Dash_AnimationQueue } from "../../utils/AnimationQueue"
import { Dash_Ease } from "../../utils/Ease"
import { Dash_Cache_Texture } from "../../cache/texture"

const Dash_AdminTexture = Dash_Cache_Texture.create('https://pmacom.github.io/assets/dcldash/images/ui/dash_admin.png')

declare const Map: any
let scale = .68
const offsetX = 202
const offsetY= 20
let physicsCast = PhysicsCast.instance

export class Dash_Tweaker_Instance {
    private container: UIContainerRect = new UIContainerRect(Dash_GlobalCanvas)
    private mode: TweakerMode = TweakerMode.POSITION
    private positionUnitButtons: Dash_UI_ImageRadioButton_Group
    private rotationUnitButtons: Dash_UI_ImageRadioButton_Group
    private modeToggleButtons: Dash_UI_ImageRadioButton_Group
    private staticImages: UIImage[]
    private scaleButtons: UIImage[]
    private infoDetailButtons: UIImage[]
    private directionButtons: UIImage[]
    private selectButtons: UIImage[]
    private infoDetails: Dash_Admin_Tweaker_InfoDetails
    public unitValue: number = 1
    private isAnimating: boolean = false
    private initialPosition: Vector3 = new Vector3()
    private initialScale: Vector3 = new Vector3()
    private initialRotation: Quaternion = new Quaternion()

    private inSelectMode: boolean = false
    private selectionMode: Dash_OnUpdateFrame_Instance
    private selectionEntity: TweakerSelector = new TweakerSelector()
    private selectionTarget: Entity | undefined | null

    constructor(private target?: Entity | undefined | null){
        this.container = new UIContainerRect(Dash_GlobalCanvas)
        this.container.visible = false
        this.container.vAlign = "top"
        this.container.hAlign = "left"
        this.container.width = 500
        this.container.height = 177
        this.container.positionX = offsetX
        this.container.positionY = offsetY

        // engine.addEntity(this.highlight)

        this.positionUnitButtons = new Dash_UI_ImageRadioButton_Group(
            this.container,
            Dash_AdminTexture, 
            TweakerPositionUnits,
            (unitValue: string) => this.setUnit(parseFloat(unitValue))
        )

        this.rotationUnitButtons = new Dash_UI_ImageRadioButton_Group(
            this.container,
            Dash_AdminTexture,
            TweakerRotationUnits,
            (unitValue: any) => this.setUnit(parseFloat(unitValue))
        )
        this.rotationUnitButtons.hide()

        this.modeToggleButtons = new Dash_UI_ImageRadioButton_Group(
            this.container,
            Dash_AdminTexture,
            ModeToggleTabButtons,
            (mode: any) => {
                switch(mode){
                    case 'position':
                        this.setPositionMode()
                        this.positionUnitButtons.setValue(1)
                        this.setUnit(1)
                        break
                    case 'rotation':
                        this.setRotationMode()
                        this.rotationUnitButtons.setValue(45)
                        this.setUnit(45)
                        break
                }
            }
        )
        this.modeToggleButtons.setValue('position')

        this.staticImages = Dash_UI_Generate_StaticImages(
            this.container,
            Dash_AdminTexture,
            TweakerStaticImages
        )

        this.scaleButtons = Dash_UI_Generate_StaticButtons(
            this.container,
            Dash_AdminTexture,
            TweakerScaleButtonImages,
            (data: any) => {
                if(this.mode != TweakerMode.POSITION){
                    this.setPositionMode()
                    this.modeToggleButtons.setValue('position')
                    this.setUnit(1)
                }
                if(!this.isAnimating) this.scale(data)
            }
        )

        this.infoDetailButtons = Dash_UI_Generate_StaticButtons(
            this.container,
            Dash_AdminTexture,
            TweakerInfoButtons,
            (data: any) => {
                const { action } = data
                switch(action){
                    case 'log':
                        this.printLog()
                        break
                    case 'revert':
                        this.revert()
                        break
                }
            }
        )

        this.selectButtons = Dash_UI_Generate_StaticButtons(
            this.container,
            Dash_AdminTexture,
            SelectButtons,
            (data: any) => {
                const { action } = data
                switch(action){
                    case 'setSelectOn':
                        this.inSelectMode = true
                        this.selectionMode.start()
                        this.setSelectButtonState('setSelectOn')
                        break
                    case 'setSelectOff':
                        this.selectModeStop()
                        this.setSelectButtonState('setSelectOff')
                        break
                    case 'deselect':
                        this.inSelectMode = false
                        this.selectionMode.stop()
                        this.setTarget(null)
                        break
                }
            }
        )

        this.directionButtons = Dash_UI_Generate_StaticButtons(
            this.container,
            Dash_AdminTexture,
            TweakerPositionButtonImages,
            (setting: ITweakerDirectionSetting) => {
                switch(this.mode){
                    case TweakerMode.POSITION:
                        if(!this.isAnimating) this.move(setting)
                        break
                    case TweakerMode.ROTATION:
                        if(!this.isAnimating) this.rotate(setting)
                        break
                }
            }
        )

        this.selectionMode = Dash_OnUpdateFrame.add(() => {
            if(!this.target){
                physicsCast.hitFirst(physicsCast.getRayFromCamera(200), (e) => {
                    const { didHit, entity } = e
                    if(didHit && this.inSelectMode){   
                        const { entityId, meshName } = entity
                        const obj = engine.entities[entityId] as Entity
                        if(obj.name !== "Dash_Tweaker_Selector"){
                            const objTransform = obj.getComponentOrCreate(Transform)
                            const objScale = objTransform.scale.clone()
                            const selectionTransform = this.selectionEntity.getComponent(Transform)
                            selectionTransform.scale = objScale.add(new Vector3().setAll(.1))
                            this.selectionTarget = obj
                            this.selectionEntity.setParent(obj)
                        }
                    }
                })
            }else{
                this.selectModeStop()
            }
        })
        this.selectionEntity.addComponent(new OnPointerDown(() => {
            this.setTarget(this.selectionTarget)
            this.selectModeStop()
        },{
            hoverText: "Select Entity",
            distance: 200
        }))

        this.infoDetails = new Dash_Admin_Tweaker_InfoDetails(this.container)
        this.setSelectButtonState("setSelectOff")
    }

    public setTarget(entity: Entity | undefined | null){
        if(entity){
            const { position, scale, rotation } = entity.getComponent(Transform)
            this.infoDetails.setInitialValues(`position.x`, position.x)
            this.infoDetails.setInitialValues(`position.y`, position.y)
            this.infoDetails.setInitialValues(`position.z`, position.z)
            this.infoDetails.setInitialValues(`scale.x`, scale.x)
            this.infoDetails.setInitialValues(`scale.y`, scale.y)
            this.infoDetails.setInitialValues(`scale.z`, scale.z)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.x`, rotation.eulerAngles.x, true)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.y`, rotation.eulerAngles.y, true)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.z`, rotation.eulerAngles.z, true)
            this.infoDetails.setInfo(entity)
            this.initialRotation = rotation.clone()
            this.initialScale = scale.clone()
            this.initialPosition = position.clone()
            this.setSelectButtonState('deselect')
        }else{
            this.setSelectButtonState('setSelectOff')
            this.infoDetails.clear()
        }
        this.target = entity
    }

    setSelectButtonState(state: string){
        this.selectButtons.forEach(btn => {
            btn.opacity = 0
            btn.isPointerBlocker = false
        })
        const selectOn = this.selectButtons[0]
        const selectOff = this.selectButtons[1]
        const deselect = this.selectButtons[2]
        switch(state){
            case 'setSelectOn':
                selectOn.opacity = 1
                selectOn.isPointerBlocker = true
                break
            case 'setSelectOff':
                selectOff.opacity = 1
                selectOff.isPointerBlocker = true
                this.selectModeStop()
                break
            case 'deselect':
                deselect.opacity = 1
                deselect.isPointerBlocker = true
                this.selectModeStop()
                break;
        }
    }

    private selectModeStop(){
        this.inSelectMode = false
        this.selectionEntity.setParent(null)
        if(this.selectionEntity.alive){
            engine.removeEntity(this.selectionEntity)
        }
        this.selectionMode.stop()
    }

    private printLog(){
        if(this.target){
            const transform = this.target.getComponentOrCreate(Transform)
            const { position, scale, rotation } = transform
            const p = [
                this.formatOutput(position.x),
                this.formatOutput(position.y),
                this.formatOutput(position.z),
            ]
            const s = [
                this.formatOutput(scale.x),
                this.formatOutput(scale.y),
                this.formatOutput(scale.z),
            ]
            const r = [
                this.formatOutput(rotation.eulerAngles.x),
                this.formatOutput(rotation.eulerAngles.y),
                this.formatOutput(rotation.eulerAngles.z),
            ]
            log(`\n
            Tweaker Output:
            name: ${this.target.name ? this.target.name : 'No name'}
            uuid: ${this.target.uuid}\n
            Transform({
               position: new Vector3(${p.join(', ')}),
               scale: new Vector3(${s.join(', ')}),
               rotation: new Quaternion().setEuler(${r.join(', ')}),
            })\n`)
        }
    }

    private revert(){
        if(this.target) {
            const position = this.initialPosition.clone()
            const scale = this.initialScale.clone()
            const rotation = this.initialRotation.clone()
            this.infoDetails.setInitialValues(`position.x`, position.x)
            this.infoDetails.setInitialValues(`position.y`, position.y)
            this.infoDetails.setInitialValues(`position.z`, position.z)
            this.infoDetails.setInitialValues(`scale.x`, scale.x)
            this.infoDetails.setInitialValues(`scale.y`, scale.y)
            this.infoDetails.setInitialValues(`scale.z`, scale.z)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.x`, rotation.eulerAngles.x, true)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.y`, rotation.eulerAngles.y, true)
            this.infoDetails.setInitialValues(`rotation.eulerAngles.z`, rotation.eulerAngles.z, true)
            this.target.addComponentOrReplace(new Transform({position, scale, rotation}))
        }
    }

    private formatOutput(value: number){
        return parseFloat(`${value}`).toFixed(3)
    }

    private setPositionMode(){
        this.mode = TweakerMode.POSITION
        this.positionUnitButtons.show()
        this.rotationUnitButtons.hide()
    }

    private setRotationMode(){
        this.mode = TweakerMode.ROTATION
        this.positionUnitButtons.hide()
        this.rotationUnitButtons.show()
    }

    private move(setting: ITweakerDirectionSetting){
        if(this.target){
            const { direction, positive } = setting
            const transform = this.target.getComponent(Transform)
            if(direction !== 'all'){
                const prev = transform.position[direction]
                const next = prev+(positive ? this.unitValue : this.unitValue*-1)
                this.infoDetails.set(`position.${direction}`, next)
                this.isAnimating = true
                Dash_AnimationQueue.add({
                    duration: .2,
                    onFrame: (progress) => {
                        transform.position[direction] = Scalar.Lerp(prev, next, Dash_Ease.easeOutQuart(progress))
                    },
                    onComplete: () => {
                        transform.position[direction] = next
                        this.isAnimating = false
                    }
                })
            }
        }
    }

    private scale(setting: ITweakerDirectionSetting){
        if(this.target){
            const { direction, positive } = setting
            const transform = this.target.getComponent(Transform)
            if(direction != 'all'){
                const prev = transform.scale[direction]
                const next = prev+(positive ? this.unitValue : this.unitValue*-1)
                this.infoDetails.set(`scale.${direction}`, next)
                this.isAnimating = true
                Dash_AnimationQueue.add({
                    duration: .2,
                    onFrame: (progress) => {
                        transform.scale[direction] = Scalar.Lerp(prev, next, Dash_Ease.easeOutQuart(progress))
                    },
                    onComplete: () => {
                        transform.scale[direction] = next
                        this.isAnimating = false
                    }
                })
            }else{
                const { x, y, z } = transform.scale
                let _x = x+(positive ? this.unitValue : this.unitValue*-1)
                let _y = y+(positive ? this.unitValue : this.unitValue*-1)
                let _z = z+(positive ? this.unitValue : this.unitValue*-1)
                this.infoDetails.set(`scale.x`, _x)
                this.infoDetails.set(`scale.y`, _y)
                this.infoDetails.set(`scale.z`, _z)
                this.isAnimating = true
                Dash_AnimationQueue.add({
                    duration: .2,
                    onFrame: (progress) => {
                        transform.scale.set(
                            Scalar.Lerp(x, _x, Dash_Ease.easeOutQuart(progress)),
                            Scalar.Lerp(y, _y, Dash_Ease.easeOutQuart(progress)),
                            Scalar.Lerp(z, _z, Dash_Ease.easeOutQuart(progress)),
                        )
                    },
                    onComplete: () => {
                        transform.scale.x = _x
                        transform.scale.y = _y
                        transform.scale.z = _z
                        this.isAnimating = false
                    }
                })
            }
            
        }
    }

    private rotate(setting: ITweakerDirectionSetting){
        if(this.target){
            const { direction, positive } = setting
            const transform = this.target.getComponent(Transform)
            if(direction !== 'all'){
                const t = transform.rotation.clone()
                const prev = transform.rotation.eulerAngles[direction]
                const { x, y, z } = transform.rotation.eulerAngles
                let next = prev+(positive ? this.unitValue : this.unitValue*-1)
                switch(direction){
                    case 'x':
                        this.isAnimating = true
                        this.infoDetails.set(`rotation.eulerAngles.x`, next, true)
                        this.infoDetails.set(`rotation.eulerAngles.y`, y, true)
                        this.infoDetails.set(`rotation.eulerAngles.z`, z, true)
                        Dash_AnimationQueue.add({
                            duration: .2,
                            onFrame: (progress) => {
                                transform.rotation.setEuler(
                                    Scalar.Lerp(prev, next, Dash_Ease.easeOutQuart(progress)),
                                    y,
                                    z
                                )
                            },
                            onComplete: () => {
                                this.isAnimating = false
                                transform.rotation.setEuler(
                                    next,
                                    y,
                                    z
                                )
                            }
                        })
                        break
                    case 'y':
                        this.isAnimating = true
                        this.infoDetails.set(`rotation.eulerAngles.x`, x, true)
                        this.infoDetails.set(`rotation.eulerAngles.y`, next, true)
                        this.infoDetails.set(`rotation.eulerAngles.z`, z, true)
                        Dash_AnimationQueue.add({
                            duration: .2,
                            onFrame: (progress) => {
                                transform.rotation.setEuler(
                                    x,
                                    Scalar.Lerp(prev, next, Dash_Ease.easeOutQuart(progress)),
                                    z
                                )
                            },
                            onComplete: () => {
                                this.isAnimating = false
                                transform.rotation.setEuler(
                                    x,
                                    next,
                                    z
                                )
                            }
                        })
                        break
                    case 'z':
                        this.isAnimating = true
                        this.infoDetails.set(`rotation.eulerAngles.x`, x, true)
                        this.infoDetails.set(`rotation.eulerAngles.y`, y, true)
                        this.infoDetails.set(`rotation.eulerAngles.z`, next, true)
                        Dash_AnimationQueue.add({
                            duration: .2,
                            onFrame: (progress) => {
                                transform.rotation.setEuler(
                                    x,
                                    y,
                                    Scalar.Lerp(prev, next, Dash_Ease.easeOutQuart(progress))
                                )
                            },
                            onComplete: () => {
                                this.isAnimating = false
                                transform.rotation.setEuler(
                                    x,
                                    y,
                                    next
                                )
                            }
                        })
                        break
                }
            }
        }
    }

    public getTarget(): (Entity | undefined | null ) { return this.target }
    private setUnit(unitValue: number){ this.unitValue = unitValue }
    public hide(){
        this.container.visible = false
    }
    public show(){
        this.container.visible = true
    }
}

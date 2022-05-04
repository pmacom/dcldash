import { Dash_Ease } from "./Ease"
import { DynamicImage } from "./DynamicImage"

export enum DynamicBarOrientation {
    HALIGN_LEFT,
    HALIGN_CENTER,
    HALIGN_RIGHT,
    VALIGN_TOP,
    VALIGN_CENTER,
    VALIGN_BOTTOM,
}

export class DynamicImageBar {
    private fillImage: DynamicImage
    private value: number
    private ease: (n:number) => number = Dash_Ease.easeOutQuint

    private width: number
    private height: number
    private sourceWidth: number
    private sourceHeight: number
    private sourceLeft: number
    private sourceTop: number

    constructor(
        public backgroundImage: UIImage,
        fillImage: UIImage,
        initialValue: number = 0,
        private orientation: DynamicBarOrientation = DynamicBarOrientation.HALIGN_CENTER
    ){
        this.fillImage = new DynamicImage(fillImage)
        this.backgroundImage.opacity = .5

        this.width = new UIValue(fillImage.width).value
        this.height = new UIValue(fillImage.height).value
        this.sourceWidth = new UIValue(fillImage.sourceWidth).value
        this.sourceHeight = new UIValue(fillImage.sourceHeight).value
        this.sourceLeft = new UIValue(fillImage.sourceLeft).value
        this.sourceTop = new UIValue(fillImage.sourceTop).value

        this.value = initialValue
        this.setValue(this.value, 0)
    }

    setEase(ease: (n:number) => number){ this.ease = ease }

    setValue(percent: number, speed: number = 1){
        const targetWidth = this.width * (percent/100)
        const targetHeight = this.height * (percent/100)
        const targetSourceWidth = this.sourceWidth * (percent/100)
        const targetSourceHeight = this.sourceHeight * (percent/100)

        switch(this.orientation){
            case DynamicBarOrientation.HALIGN_CENTER :
                switch(this.fillImage.image.hAlign){
                    case 'left':
                        this.fillImage.moveToX(
                            ((this.width/2)) - ((this.width/2) * Scalar.InverseLerp(0, this.sourceWidth, targetSourceWidth)),
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)/2),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'center':
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)/2),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'right':
                        this.fillImage.moveToX(
                            ((this.width/2)*-1) + ((this.width/2) * Scalar.InverseLerp(0, this.sourceWidth, targetSourceWidth)),
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)/2),
                            speed,
                            this.ease,
                        )
                        break;
                }
                this.fillImage.resizeWidthTo(
                    targetWidth,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceWidthTo(
                    targetSourceWidth,
                    speed,
                    this.ease
                )
                break
            case DynamicBarOrientation.HALIGN_LEFT :
                switch(this.fillImage.image.hAlign){
                    case 'left':
                        break;
                    case 'center':
                        this.fillImage.moveToX(
                            (this.width/2) + ((this.width/2) * Scalar.InverseLerp(0, this.sourceWidth, targetSourceWidth)) - this.width,
                            speed,
                            this.ease
                        )
                        break;
                    case 'right':
                        this.fillImage.moveToX(
                            ((this.width) * Scalar.InverseLerp(0, this.sourceWidth, targetSourceWidth)) - this.width,
                            speed,
                            this.ease
                        )
                        break;
                }
                this.fillImage.resizeWidthTo(
                    targetWidth,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceWidthTo(
                    targetSourceWidth,
                    speed,
                    this.ease
                )
                break
            case DynamicBarOrientation.HALIGN_RIGHT :
                switch(this.fillImage.image.hAlign){
                    case 'left':
                        this.fillImage.moveToX(
                            (this.width) + ((this.width) * Scalar.InverseLerp(this.sourceWidth, 0, targetSourceWidth)) - this.width,
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'center':
                        this.fillImage.moveToX(
                            (this.width) + ((this.width/2) * Scalar.InverseLerp(this.sourceWidth, 0, targetSourceWidth)) - this.width,
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'right':
                        this.fillImage.moveSourceLeftTo(
                            this.sourceLeft + ((this.sourceWidth - targetSourceWidth)),
                            speed,
                            this.ease,
                        )
                        this.fillImage.moveToX(
                            0,
                            speed,
                            this.ease
                        )
                        break;
                }
                this.fillImage.resizeWidthTo(
                    targetWidth,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceWidthTo(
                    targetSourceWidth,
                    speed,
                    this.ease
                )
                break

            case DynamicBarOrientation.VALIGN_CENTER :
                switch(this.fillImage.image.vAlign){
                    case 'top':
                        this.fillImage.moveToY(
                            ((this.height/2) * Scalar.InverseLerp(0, this.sourceHeight, targetSourceHeight)) - this.height/2,
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            this.sourceTop + ((this.sourceHeight- targetSourceHeight)/2),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'center':
                        this.fillImage.moveSourceTopTo(
                            this.sourceTop + ((this.sourceHeight- targetSourceHeight)/2),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'bottom':
                        this.fillImage.moveToY(
                            ((this.height/2) * Scalar.InverseLerp(this.sourceHeight, 0, targetSourceHeight)),
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            this.sourceTop + ((this.sourceHeight- targetSourceHeight)/2),
                            speed,
                            this.ease,
                        )
                        break;
                }
                this.fillImage.resizeHeightTo(
                    targetHeight,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceHeightTo(
                    targetSourceHeight,
                    speed,
                    this.ease
                )
                break
            case DynamicBarOrientation.VALIGN_TOP :
                switch(this.fillImage.image.vAlign){
                    case 'top': 
                        break;
                    case 'center':
                        this.fillImage.moveToY(
                            ((this.height/2)) - ((this.height/2) * Scalar.InverseLerp(0, this.sourceHeight, targetSourceHeight)),
                            speed,
                            this.ease
                        )
                        break;
                    case 'bottom':
                        this.fillImage.moveToY(
                            ((this.height)) - ((this.height) * Scalar.InverseLerp(0, this.sourceHeight, targetSourceHeight)),
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            0, // this.sourceTop + ((this.sourceHeight - targetSourceHeight)/2),
                            speed,
                            this.ease,
                        )
                        break;
                }
                this.fillImage.resizeHeightTo(
                    targetHeight,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceHeightTo(
                    targetSourceHeight,
                    speed,
                    this.ease
                )
                break
            case DynamicBarOrientation.VALIGN_BOTTOM :
                switch(this.fillImage.image.vAlign){
                    case 'top':
                        this.fillImage.moveToY(
                            ((this.height) * Scalar.InverseLerp(this.sourceHeight, 0, targetSourceHeight))*-1,
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            ((this.sourceHeight - targetSourceHeight)),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'center':
                        this.fillImage.moveToY(
                            ((this.height/2) * Scalar.InverseLerp(this.sourceHeight, 0, targetSourceHeight))*-1,
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            ((this.sourceHeight - targetSourceHeight)),
                            speed,
                            this.ease,
                        )
                        break;
                    case 'bottom':
                        this.fillImage.moveToY(
                            Scalar.InverseLerp(0, this.sourceHeight, targetSourceHeight),
                            speed,
                            this.ease
                        )
                        this.fillImage.moveSourceTopTo(
                            ((this.sourceHeight - targetSourceHeight)),
                            speed,
                            this.ease,
                        )
                        break;
                }
                this.fillImage.resizeHeightTo(
                    targetHeight,
                    speed,
                    this.ease
                )
                this.fillImage.resizeSourceHeightTo(
                    targetSourceHeight,
                    speed,
                    this.ease
                )
                break
        }
    }
}

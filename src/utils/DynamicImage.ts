import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "../utils/OnUpdateFrame"

declare const Map: any

interface IDynamicImageSettings {
    from: string | number,
    to: string | number,
    duration: number,
    ease?: (n: number) => number,
    callback?: () => void
}

interface IDynamicImageAction {
    timer: number,
    settings: IDynamicImageSettings,
}

export class DynamicImage {
    private animation: Dash_OnUpdateFrame_Instance
    private tweens: typeof Map = new Map()

    constructor(public image: UIImage){
        this.animation = Dash_OnUpdateFrame.add((data: any, dt: number) => this.update(data, dt))
    }

    fadeIn(
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('opacity', {
            timer: 0,
            settings: {
                from: 0,
                to: 1,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    fadeOut(
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('opacity', {
            timer: 0,
            settings: {
                from: this.image.opacity,
                to: 0,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    fadeTo(
        opacity: number,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('opacity', {
            timer: 0,
            settings: {
                from: this.image.opacity,
                to: opacity,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    moveTo(
        x: number | string,
        y: number | string,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('positionX', {
            timer: 0,
            settings: {
                from: this.image.positionX,
                to: x,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('positionY', {
            timer: 0,
            settings: {
                from: this.image.positionY,
                to: y,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    moveRelativeTo(
        x: number | string,
        y: number | string,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('positionX', {
            timer: 0,
            settings: {
                from: this.image.positionX,
                to: new UIValue(this.image.positionX).value + new UIValue(x).value,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('positionY', {
            timer: 0,
            settings: {
                from: this.image.positionY,
                to: new UIValue(this.image.positionY).value + new UIValue(y).value,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    resizeTo(
        width: number | string,
        height: number | string,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('width', {
            timer: 0,
            settings: {
                from: this.image.width,
                to: width,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('height', {
            timer: 0,
            settings: {
                from: this.image.height,
                to: height,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    moveSourceTo(
        x: number,
        y: number,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('sourceLeft', {
            timer: 0,
            settings: {
                from: this.image.sourceLeft,
                to: x,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('sourceTop', {
            timer: 0,
            settings: {
                from: this.image.sourceTop,
                to: y,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    resizeSourceTo(
        width: number,
        height: number,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('sourceWidth', {
            timer: 0,
            settings: {
                from: this.image.sourceWidth,
                to: width,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('sourceHeight', {
            timer: 0,
            settings: {
                from: this.image.sourceHeight,
                to: height,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }


    scaleIn(
        startScale: number | string,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('width', {
            timer: 0,
            settings: {
                from: new UIValue(this.image.width).value * new UIValue(startScale).value,
                to: this.image.width,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('height', {
            timer: 0,
            settings: {
                from: new UIValue(this.image.height).value * new UIValue(startScale).value,
                to: this.image.height,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('opacity', {
            timer: 0,
            settings: {
                from: 0,
                to: this.image.opacity,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    scaleOut(
        endScale: number | string,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('width', {
            timer: 0,
            settings: {
                from: this.image.width,
                to: new UIValue(this.image.width).value * new UIValue(endScale).value,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('height', {
            timer: 0,
            settings: {
                from: this.image.height,
                to: new UIValue(this.image.height).value * new UIValue(endScale).value,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('opacity', {
            timer: 0,
            settings: {
                from: this.image.opacity,
                to: 0,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    scaleTo(
        size: number,
        duration: number,
        ease?: (n: number) => number,
        callback?: () => void
    ){
        this.tweens.set('width', {
            timer: 0,
            settings: {
                from: this.image.width,
                to: new UIValue(this.image.width).value * size,
                duration,
                ease,
                callback,
            }
        })
        this.tweens.set('height', {
            timer: 0,
            settings: {
                from: this.image.height,
                to: new UIValue(this.image.width).value * size,
                duration,
                ease,
                callback,
            }
        })
        this.animation.start()
    }

    update(data: any, dt: number){
        if(this.tweens.size){
            this.tweens.forEach((tween: IDynamicImageAction, name: string) => {
                const { settings } = tween
                const { duration, callback } = settings

                tween.timer += dt

                if(tween.timer >= duration){
                    if(callback) callback()
                    this.tweens.delete(name)
                }

                let from: UIValue
                let to: UIValue
                let value: number
                let amount: number

                switch(name){
                    case 'opacity':
                    case 'sourceLeft':
                    case 'sourceTop':
                    case 'sourceWidth':
                    case 'sourceHeight':
                        from = new UIValue(settings.from)
                        to = new UIValue(settings.to)
                        if(tween.timer >= duration){ this.image[name] = to.value; break }
                        value = settings.ease ? settings.ease(tween.timer/duration) : tween.timer/duration
                        this.image[name] =  Scalar.Lerp(from.value, to.value, value)
                        break
                    case 'width':
                    case 'height':
                    case 'positionX':
                    case 'positionY':
                        from = new UIValue(settings.from)
                        to = new UIValue(settings.to)
                        if(tween.timer >= duration){ this.image[name] = from.type == 1 || to.type == 1 ? to.value : `${to.value}%`; break }
                        value = settings.ease ? settings.ease(tween.timer/duration) : tween.timer/duration
                        amount = Scalar.Lerp(from.value, to.value, value)
                        this.image[name] = from.type == 1 || to.type == 1 ? amount: `${amount}%`
                        break
                }
                
            })
        }else{
            this.animation.stop()
        }
    }
}
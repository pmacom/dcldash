declare const Map: any

/**
 * Usage
 **
    AnimationQueue.add({
        duration: 1,
        data: { someval: 'foo' },
        onInit: () => { log('Init!')},
        onFrame: (progress, data) => { log({ progress, data })},
        onComplete: () => { log('completed')}
    })
*/

export interface Dash_AnimationQueue_Setting {
    duration: number
    id?: number
    data?: any
    onFrame?: (progress: number, data?: any) => void
    onComplete?: () => void
    timer?: number
}

class AnimationQueue_Controller implements ISystem {
    private system: ISystem
    private nonce: number = 0
    private queue: typeof Map = new Map()
    constructor(){ this.system = this }
    add(setting: Dash_AnimationQueue_Setting): Dash_AnimationQueue_Setting {
        setting.id = this.nonce++
        this.queue.set(setting.id, setting)
        this.enable()
        return setting
    }
    update(dt: number){
        if(!this.queue.size){ this.disable() }
        this.queue.forEach((setting: Dash_AnimationQueue_Setting) => {
            const { id, onFrame, onComplete, duration, data } = setting
            if(!setting.timer) setting.timer = 0
            setting.timer+=dt
            const progress = setting.timer/duration
            if(onFrame){ onFrame(progress, data) }
            if(setting.timer >= duration){
                if(onFrame){ onFrame(100, data) }
                if(onComplete){ onComplete() }
                this.queue.delete(id)
            }
        })
    }
    enable(){ if(!this.system.active) engine.addSystem(this) }
    disable(){ if(this.system.active) engine.removeSystem(this) }
}

export const Dash_AnimationQueue = new AnimationQueue_Controller()
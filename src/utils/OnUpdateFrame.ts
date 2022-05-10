/**
 * Usage
 **
    const data = { foo: 'bar' }
    const trackEntity = (data: any) => { log('do stuff with data') }
    const trackEntityController = OnUpdateFrame.add(trackEntity, data)
    trackEntityController.start()
    Wait(() => { trackEntityController.stop() }, 3)
*/

declare const Map: any

export interface Dash_OnUpdateFrame_Setting {
    id?: number
    data?: any
    onFrame?: (dt: number) => void
}

export interface Dash_OnUpdateFrame_Instance {
    start: () => void
    stop: () => void
}

export class Dash_OnUpdateFrame_Controller implements ISystem {
    private system: ISystem
    private nonce: number = 0
    private queue: typeof Map = new Map()
    constructor(){ this.system = this }
    add(onFrame: (dt: number) => void): Dash_OnUpdateFrame_Instance {
        const setting = { id: this.nonce++, onFrame }
        const start = () => { this.queue.set(setting.id, setting); this.enable()}
        const stop = () => { this.queue.delete(setting.id)}
        return { start, stop }
    }
    update(dt: number){
        if(!this.queue.size){ this.disable() }
        this.queue.forEach((setting: Dash_OnUpdateFrame_Setting) => {
            const { id, onFrame } = setting
            if(onFrame){ onFrame(dt) }
        })
    }
    enable(){ if(!this.system.active) engine.addSystem(this) }
    disable(){ if(this.system.active) engine.removeSystem(this) }
}

export const Dash_OnUpdateFrame = new Dash_OnUpdateFrame_Controller()
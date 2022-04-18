import { Dash_OnUpdateFrame, Dash_OnUpdateFrame_Instance } from "./OnUpdateFrame"

export class Countdown {
    private remaining: number = 0
    private timer: Dash_OnUpdateFrame_Instance
    private seconds: number = 0
    private onCompleteMap: Set<()=>void> = new Set()
    private onUpdateMap: Set<(dt: number)=>void> = new Set()
    private onSecondMap: Set<(seconds: number)=>void> = new Set()

    constructor(){
        this.timer = Dash_OnUpdateFrame.add((data: any, dt: number) => this.onFrame(data, dt))
    }
    setTimer(remaining: number){ this.remaining = this.seconds = remaining }
    onUpdate(func: (remaining: number) => void){ this.onUpdateMap.add(func) }
    onSecond(func: (remaining: number) => void){ this.onSecondMap.add(func) }
    onComplete(func: () => void ){ this.onCompleteMap.add(func) }
    start(){this.timer.start()}
    stop(){this.timer.stop()}
    onFrame(data: any, dt: number){
        if(this.remaining > 0) {
            this.remaining -= dt
            let seconds = Math.floor(this.remaining)
            if(seconds != this.seconds){
                this.seconds = seconds
                this.onSecondMap.forEach((func: (seconds: number)=>void) => func(seconds))
            }
        }
        if(this.seconds <= 0) {
            this.onCompleteMap.forEach((func: ()=> void) => func())
            this.timer.stop()
        }
        this.onUpdateMap.forEach((func: (dt: number) => void) => func(dt))
    }
}
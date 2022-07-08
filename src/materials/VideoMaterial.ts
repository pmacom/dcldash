import { Dash_Cache_VideoTexture, Dash_Countdown, Dash_OnFirstInteract } from "../index"

export class VideoMaterial extends Material {
    public video: VideoMaterialController
  
    constructor(){
      super()
      this.video = new VideoMaterialController(this)
    }
}

const VideoMaterialCountdown: Dash_Countdown = new Dash_Countdown()
  
class VideoMaterialController {
    private vt: VideoTexture | undefined
    private startTime: string | undefined
    private countdown: Dash_Countdown = VideoMaterialCountdown
    private countdownCompleted: boolean = false
    public clipId: string | undefined
  
    private loop: boolean = false
    private emissiveIntensity: number = 1
    private countdownThreshold: number = 10
    public onCountdownStart: (() => void) | undefined
    public onCountdownThreshold: (() => void) | undefined
    public onCountdownSecond: (remaining: number) => void = () => {}
    public onCountdownCompleted: (() => void) | undefined
  
    constructor(private vm: VideoMaterial){}
  
    setUrl(url: string){
      this.vt = Dash_Cache_VideoTexture.create(url)
      this.clipId = this.vt.videoClipId
      this.vt.seekTime(0)
      this.vm.albedoTexture = this.vt
      this.vm.emissiveTexture = this.vt
      this.vm.emissiveColor = Color3.White()
      this.vm.emissiveIntensity = this.emissiveIntensity
      this.vt.loop = this.loop
      if(this.countdown){ this.countdown.stop() }
    }
  
    play(){
      log('Playing!')
      if(this.vt){
        if(!Dash_OnFirstInteract.initialized){
          Dash_OnFirstInteract.add(this.vt.videoClipId, () => {
            this._play()
          })
        }else{
          this._play()
        }
      }
    }

    _play(){
      log('_play', { startTime: this.startTime })
      if(this.startTime){
        this.seekToTime()
      }else{
        if(this.vt) this.vt.playing = true
      }
    }
  
    stop(){
      if(this.vt) this.vt.playing = false
      if(this.countdown) this.countdown.stop()
    }
  
    setLoop(loop: boolean){
      this.loop = loop
      if(this.vt) this.vt.loop = loop
    }
  
    setEmissiveIntensity(emissiveIntensity: number){
      this.emissiveIntensity = emissiveIntensity
      if(this.vm) this.vm.emissiveIntensity = emissiveIntensity
    }
  
    setStartTime(startTime: string){
      this.startTime = startTime
    }
  
    seekToTime(){
      log('seekToTime', { startTime: this.startTime })
      if(this.startTime && this.vt){
        let secondsTillPlay = this.getSecondsTillPlay(this.startTime)
        if(secondsTillPlay < 0){
          log('%$%$%$%$%$ Should be adding countdown to this one')
          this.vt.play()
          this.vt.seekTime(secondsTillPlay * -1)
        }else{
          log('*(*(*(*( Should be adding countdown to this one')
          this._onCountdownReset(secondsTillPlay)
        }
      }
    }

    private _onCountdownReset(secondsTillPlay: number){
      if(this.onCountdownStart) this.onCountdownStart()
      this.countdownCompleted = false
      this.countdown.setTimer(secondsTillPlay)
      this.countdown.onSecond = (remaining: number) => this._onCountdownSecond(remaining)
      this.countdown.onComplete = () => this._onCountdownComplete()
      this.countdown.start()
    }

    private _onCountdownSecond(remaining: number){
      if(this.onCountdownSecond){
        this.onCountdownSecond(remaining)
      }
    }

    private _onCountdownComplete(){
      this.countdownCompleted = true
      if(this.onCountdownCompleted) this.onCountdownCompleted()
      // this.vt?.play()
    }
  
    private getSecondsTillPlay(startDateTime: string): number {
      let now = new Date(new Date().toLocaleString('en')).getTime()
      let event = new Date(startDateTime).getTime()
      return (event - now) / 1000
    }
}

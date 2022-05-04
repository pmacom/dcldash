import { Dash_VideoClip } from "./videoClip"
// @ts-ignore
import _Map from 'es6-map'

// @ts-ignore
import _Set from 'es6-set' 

class Dash_VideoTexture_Instance {
    private videoTextures: _Map<string, VideoTexture> = new _Map()

    create(src: string): VideoTexture {
        if(this.videoTextures.has(src)) return this.videoTextures.get(src)!
        const clip = Dash_VideoClip.create(src)
        const videoTexture = new VideoTexture(clip)
        this.videoTextures.set(src, videoTexture)
        return videoTexture
    }
}

export const Dash_VideoTexture = new Dash_VideoTexture_Instance()

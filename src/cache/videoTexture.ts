import { Dash_Cache_VideoClip } from "./videoClip"

declare const Map: any

class Dash_VideoTexture_Instance {
    private videoTextures: typeof Map = new Map()
    // private videoTextures: Map<string, VideoTexture> = new Map()

    create(src: string): VideoTexture {
        if(this.videoTextures.has(src)) return this.videoTextures.get(src)!
        const clip = Dash_Cache_VideoClip.create(src)
        const videoTexture = new VideoTexture(clip)
        this.videoTextures.set(src, videoTexture)
        return videoTexture
    }
}

export const Dash_Cache_VideoTexture = new Dash_VideoTexture_Instance()

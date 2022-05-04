import 'es6-shim'

class Dash_VideoClip_Instance {
    private clips: Map<string, VideoClip> = new Map()

    create(src: string): VideoClip {
        if(this.clips.has(src)) return this.clips.get(src)!
        const clip = new VideoClip(src)
        this.clips.set(src, clip)
        return clip
    }
}

export const Dash_VideoClip = new Dash_VideoClip_Instance()

declare const Map: any

class Dash_VideoClip_Instance {
    private clips: typeof Map = new Map()
    // private clips: TypeMap<string, VideoClip> = new _Map()

    create(src: string): VideoClip {
        if(this.clips.has(src)) return this.clips.get(src)!
        const clip = new VideoClip(src)
        this.clips.set(src, clip)
        return clip
    }
}

export const Dash_Cache_VideoClip = new Dash_VideoClip_Instance()

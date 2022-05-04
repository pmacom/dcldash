// @ts-ignore
import _Map from 'es6-map'

// @ts-ignore
import _Set from 'es6-set' 

class Dash_VideoClip_Instance {
    private clips: _Map<string, VideoClip> = new _Map()

    create(src: string): VideoClip {
        if(this.clips.has(src)) return this.clips.get(src)!
        const clip = new VideoClip(src)
        this.clips.set(src, clip)
        return clip
    }
}

export const Dash_VideoClip = new Dash_VideoClip_Instance()

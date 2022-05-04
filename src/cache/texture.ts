// @ts-ignore
import _Map from 'es6-map'

// @ts-ignore
import _Set from 'es6-set' 

class Dash_Texture_Instance {
    private textures: _Map<string, Texture> = new _Map()

    create(src: string): Texture {
        if(this.textures.has(src)) return this.textures.get(src)!
        const texture = new Texture(src)
        this.textures.set(src, texture)
        return texture
    }
}

export const Dash_Texture = new Dash_Texture_Instance()

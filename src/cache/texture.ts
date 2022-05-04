import 'es6-shim'

class Dash_Texture_Instance {
    private textures: Map<string, Texture> = new Map()

    create(src: string): Texture {
        if(this.textures.has(src)) return this.textures.get(src)!
        const texture = new Texture(src)
        this.textures.set(src, texture)
        return texture
    }
}

export const Dash_Texture = new Dash_Texture_Instance()

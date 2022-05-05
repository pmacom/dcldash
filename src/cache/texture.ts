declare const Map: any

class Dash_Texture_Instance {
    private textures: typeof Map = new Map()
    // private textures: Map<string, Texture> = new Map()

    create(src: string): Texture {
        if(this.textures.has(src)) return this.textures.get(src)!
        const texture = new Texture(src)
        this.textures.set(src, texture)
        return texture
    }
}

export const Dash_Texture = new Dash_Texture_Instance()

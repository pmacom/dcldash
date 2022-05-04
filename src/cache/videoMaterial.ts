import { Dash_VideoTexture } from "./videoTexture"

// @ts-ignore
import _Map from 'es6-map'

// @ts-ignore
import _Set from 'es6-set' 

class Dash_VideoMaterial_Instance {
    private videoMaterials: _Map<string, Material> = new _Map()

    create(src: string): Material {
        if(this.videoMaterials.has(src)) return this.videoMaterials.get(src)!
        const videoTexture = Dash_VideoTexture.create(src)
        const material = new Material()
        material.albedoTexture = videoTexture
        material.emissiveColor = Color3.White()
        material.emissiveTexture = videoTexture
        this.videoMaterials.set(src, material)
        return material
    }
}

export const Dash_VideoMaterial = new Dash_VideoMaterial_Instance()

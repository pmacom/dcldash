export class Dash_MaterialInstance {
    private _transparent: Material | undefined
    private _Red: Material | undefined
    private _Green: Material | undefined
    private _Blue: Material | undefined
    private _Black: Material | undefined

    public transparent(): Material {
        if(this._transparent) return this._transparent
        this._transparent = new Material()
        this._transparent.albedoColor = new Color4(0,0,0,0)
        this._transparent.castShadows = false
        return this._transparent
    }

    public Red(): Material {
        if(this._Red) return this._Red
        this._Red = new Material()
        this._Red.albedoColor = new Color4(1,0,0,.5)
        return this._Red
    }
    public Green(): Material {
        if(this._Green) return this._Green
        this._Green = new Material()
        this._Green.albedoColor = new Color4(0,1,0,.5)
        return this._Green
    }
    public Blue(): Material {
        if(this._Blue) return this._Blue
        this._Blue = new Material()
        this._Blue.albedoColor = new Color4(0,0,1,.5)
        return this._Blue
    }
    public Black(): Material {
        if(this._Black) return this._Black
        this._Black = new Material()
        this._Black.albedoColor = new Color4(0,0,0,.5)
        return this._Black
    }
}

export const Dash_Material = new Dash_MaterialInstance()
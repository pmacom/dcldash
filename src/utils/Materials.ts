export class Dash_MaterialInstance {
    private _transparent: Material | undefined
    private _opaqueRed: Material | undefined
    private _opaqueGreen: Material | undefined
    private _opaqueBlue: Material | undefined
    private _opaqueBlack: Material | undefined

    public transparent(): Material {
        if(this._transparent) return this._transparent
        this._transparent = new Material()
        this._transparent.albedoColor = new Color4(0,0,0,0)
        return this._transparent
    }

    public opaqueRed(): Material {
        if(this._opaqueRed) return this._opaqueRed
        this._opaqueRed = new Material()
        this._opaqueRed.albedoColor = new Color4(1,0,0,.5)
        return this._opaqueRed
    }
    public opaqueGreen(): Material {
        if(this._opaqueGreen) return this._opaqueGreen
        this._opaqueGreen = new Material()
        this._opaqueGreen.albedoColor = new Color4(0,1,0,.5)
        return this._opaqueGreen
    }
    public opaqueBlue(): Material {
        if(this._opaqueBlue) return this._opaqueBlue
        this._opaqueBlue = new Material()
        this._opaqueBlue.albedoColor = new Color4(0,0,1,.5)
        return this._opaqueBlue
    }
    public opaqueBlack(): Material {
        if(this._opaqueBlack) return this._opaqueBlack
        this._opaqueBlack = new Material()
        this._opaqueBlack.albedoColor = new Color4(0,0,0,.5)
        return this._opaqueBlack
    }
}

export const Dash_Material = new Dash_MaterialInstance()
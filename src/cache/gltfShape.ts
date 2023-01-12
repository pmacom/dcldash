declare const Map: any

class Dash_GLTFShape_Instance {
    private shapes: typeof Map = new Map()

    create(src: string): GLTFShape {
        if(this.shapes.has(src)) return this.shapes.get(src)!
        const shape = new GLTFShape(src)
        this.shapes.set(src, shape)
        return shape
    }
}

export const Dash_Cache_GLTFShape = new Dash_GLTFShape_Instance()

const boxHighlightTexture = new Texture("https://pmacom.github.io/assets/boxHighlight.png")

/**
 * Object with settings for UV PlaneShape animations
 * @public
 */
type IUVSides = {
    /**
     * key is the direction the plane is facing. top | bottom | north | south | east | west
     */
    [key: string]: {
        /**
         * array of uv coordinates
         */
        points: Array<float>
        /**
         * boolean for if this side should animate
         */
        animate?: boolean
        /**
         * boolean for if this side should render the surface texture
         */
        isSurface?: boolean
    }
}

/**
 * an object listing the directions and corresponding uv coordinates
 * @public
 */
type IUVs = {
    /**
     * key is the direction the plane is facing. top | bottom | north | south | east | west
     * value is array of UV coordinates
     */
    [key: string]: Array<float>
}

/**
 * an object that explains the properties of a side of the highlighted cube
 * @public
 */
type ISide = {
    /**
     * PlaneShape of the side of the cube
     */
    shape: PlaneShape
    /**
     * Entity reference for the side of the cube
     */
    entity: Entity
    /**
     * Transform object to place the side of the cube
     */
    transform: Transform
    /**
     * Initial uv settings for the side of the cube
     */
    startUVs: Array<float>
    /**
     * Individual coordinates for each direction the effect is facing
     */
    dir: IUVSides
}

/**
 * Precalculated UV settings for each potential side rotation and effect
 * @public
 */
const uvs: IUVs = {
    1: [ 0.6,0.4,0.9,0.4,0.9,0.1,0.6,0.01,0.6,0.4,0.9,0.4,0.9,0.1,0.6,0.01 ],   // invisible
    2: [ 0,0.5,0.5,0.5,0.5,0,0,0,0,0.5,0.5,0.5,0.5,0,0,0 ],                     // plane
    3: [ 0.5,1,0.5,0.5,0,0.5,0,1,0.5,1,0.5,0.5,0,0.5,0,1 ],                     // rotation 1
    4: [ 0,0.5,0,1,0.5,1,0.5,0.5,0,0.5,0,1,0.5,1,0.5,0.5 ],                     // rotation 2
    5: [ 0,1,0.5,1,0.5,0.5,0,0.5,0,1,0.5,1,0.5,0.5,0,0.5 ],                     // rotation 3
    6: [ 0.5,0.5,0,0.5,0,1,0.5,1,0.5,0.5,0,0.5,0,1,0.5,1 ],                     // rotation 4
}

/**
 * Flag that enables the animation effect
 */
@Component("BoxHighlightAnimation")
class BoxHighlightAnimation {
  constructor(public speed: number = 1) {}
}

/**
 * Helper function for creating the cube by offsetting each side's position and rotation
 * @param pAxis - position axis offset
 * @param rAxis - rotation axis
 * @param negate - should position go in the opposite direction
 * @returns 
 */
const getTransform = (pAxis: string, rAxis: string, negate: boolean = false) : Transform => {
    let p = .5*(negate ? -1 : 1)
    let px = pAxis == 'x' ? p : 0
    let py = pAxis == 'y' ? p : 0
    let pz = pAxis == 'z' ? p : 0
    let rx = rAxis == 'x' ? 90 : 0
    let ry = rAxis == 'y' ? 90 : 0
    let rz = rAxis == 'z' ? 90 : 0
    return new Transform({
        position: new Vector3(px, py, pz),
        scale: new Vector3(1, 1, 1),
        rotation: new Quaternion().setEuler(rx, ry, rz),
    })
}

/**
 * Creates an animated cube to highlight something in DCL
 * it can be rotated to point in a predetermined direction
 * @public
 */
export class Dash_BoxHighlight extends Entity {
    private timer: number = 0
    private duration: number = 3
    private sides: Array<ISide>
    private sideTopEntity: Entity = new Entity()
    private sideTopShape: PlaneShape = new PlaneShape()
    private sideBottomEntity: Entity = new Entity()
    private sideBottomShape: PlaneShape = new PlaneShape()
    private sideNorthEntity: Entity = new Entity()
    private sideNorthShape: PlaneShape = new PlaneShape()
    private sideSouthEntity: Entity = new Entity()
    private sideSouthShape: PlaneShape = new PlaneShape()
    private sideEastEntity: Entity = new Entity()
    private sideEastShape: PlaneShape = new PlaneShape()
    private sideWestEntity: Entity = new Entity()
    private sideWestShape: PlaneShape = new PlaneShape()
    private stripeMaterial = new Material()
    private surfaceMaterial = new Material()

    constructor(
        public position: Vector3,
        public scale: Vector3,
        public dir: string = "top",
        public visible: boolean = true,
        public texture?: Texture,
        public onClick?: OnPointerDown,
    ) {
        super()
        let t = texture ? texture : boxHighlightTexture

        /**
         * Material settings for the stripes animation
         */
        this.stripeMaterial.roughness = 1
        this.stripeMaterial.emissiveColor = new Color3(0,.5,1)
        this.stripeMaterial.albedoTexture = t
        this.stripeMaterial.alphaTexture = t
        this.stripeMaterial.castShadows = false

        /**
         * Material settings for the outline that appears on one side of the cube
         */
        this.surfaceMaterial.roughness = 1
        this.surfaceMaterial.emissiveColor = new Color3(10,0,0)
        this.surfaceMaterial.albedoTexture = t
        this.surfaceMaterial.alphaTexture = t
        this.surfaceMaterial.castShadows = false

        this.sides = [
            {
                shape: this.sideBottomShape,
                entity: this.sideBottomEntity,
                transform: getTransform("y", "x"),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[1] },
                    bottom: { points: uvs[2], isSurface: true },
                    north:  { points: uvs[3], animate: true },
                    south:  { points: uvs[4], animate: true },
                    east:   { points: uvs[5], animate: true },
                    west:   { points: uvs[6], animate: true },
                }
            },
            {
                shape: this.sideTopShape,
                entity: this.sideTopEntity,
                transform: getTransform("y", "x", true),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[2], isSurface: true },
                    bottom: { points: uvs[1] },
                    north:  { points: uvs[3], animate: true },
                    south:  { points: uvs[4], animate: true },
                    east:   { points: uvs[5], animate: true },
                    west:   { points: uvs[6], animate: true },
                }
            },
            {
                shape: this.sideWestShape,
                entity: this.sideWestEntity,
                transform: getTransform("z", ""),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[6], animate: true },
                    bottom: { points: uvs[5], animate: true },
                    north:  { points: uvs[3], animate: true },
                    south:  { points: uvs[4], animate: true },
                    east:   { points: uvs[2], isSurface: true},
                    west:   { points: uvs[1] },
                }
            },
            {
                shape: this.sideEastShape,
                entity: this.sideEastEntity,
                transform: getTransform("z", "", true),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[6], animate: true },
                    bottom: { points: uvs[5], animate: true },
                    north:  { points: uvs[3], animate: true },
                    south:  { points: uvs[4], animate: true },
                    east:   { points: uvs[1], },
                    west:   { points: uvs[2], isSurface: true },
                }
            },
            {
                shape: this.sideNorthShape,
                entity: this.sideNorthEntity,
                transform: getTransform("x", "y"),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[6], animate: true },
                    bottom: { points: uvs[5], animate: true },
                    north:  { points: uvs[1], },
                    south:  { points: uvs[2], isSurface: true },
                    east:   { points: uvs[3], animate: true },
                    west:   { points: uvs[4], animate: true },
                }
            },
            {
                shape: this.sideSouthShape,
                entity: this.sideSouthEntity,
                transform: getTransform("x", "y", true),
                startUVs: uvs[1],
                dir: {
                    top:    { points: uvs[6], animate: true },
                    bottom: { points: uvs[5], animate: true },
                    north:  { points: uvs[2], isSurface: true },
                    south:  { points: uvs[1], },
                    east:   { points: uvs[3], animate: true },
                    west:   { points: uvs[4], animate: true },
                }
            },
        ]

        this.addComponent(new Transform({
            position,
            scale,
        }))

        if(visible){
            this.show()
        }

        this.setSides()
    }

    private setSides() {
        this.sides.forEach(side => {
            let {shape, entity, transform, dir} = side
            let { points, isSurface } = side.dir[this.dir]
            entity.addComponentOrReplace(shape)
            entity.addComponentOrReplace(transform)
            if(!isSurface){
                entity.addComponentOrReplace(this.stripeMaterial)
            }
            entity.addComponentOrReplace(isSurface ? this.surfaceMaterial : this.stripeMaterial)
            shape.withCollisions = false
            if(isSurface && this.onClick){
                entity.addComponent(this.onClick)
            }
            side.startUVs = points
            shape.uvs = side.startUVs
            entity.setParent(this)
        })
    }

    /**
     * Scales the boxHighlight's dimensions
     * @param x - scale on x axis
     * @param y - scale on y axis
     * @param z - scale on z axis
     */
    setScale(x: number, y: number, z: number) {
      this.getComponent(Transform).scale.set(x, y, z)
    }

    /**
     * Repositions the boxHighlight
     * @param x - x position
     * @param y - y position
     * @param z - z position
     */
    setPosition(x: number, y: number, z: number) {
      this.getComponent(Transform).position.set(x, y, z)
    }

    /**
     * Sets the direction this effect should be facing
     * @param dir - string: "top" | "bottom" | "north" | "south" | "east" | "west"
     */
    setDirection(dir: string){
        this.dir = dir
        this.setSides()
    }

    /**
     * Sets a new texture to the boxHighlight entity
     * @param texture - Texture object to apply to the boxHighlight materials
     */
    setTexture(texture: Texture){
        this.stripeMaterial.albedoTexture = texture
        this.stripeMaterial.alphaTexture = texture
        this.surfaceMaterial.albedoTexture = texture
        this.surfaceMaterial.alphaTexture = texture
    }

    /**
     * Sets the color of the stripes that encircle the boxHighlight
     * @param color - Color3 object, set it's rgb values from 0 to 1 for normal, or 1 to 10 for a nice glowing effect
     */
    setStripeColor(color: Color3){
        this.stripeMaterial.emissiveColor = color
    }

    /**
     * Sets the color of the surface that the boxHighlight is targeted to
     * @param color - Color3 object, set it's rgb values from 0 to 1 for normal, or 1 to 10 for a nice glowing effect
     */
    setSurfaceColor(color: Color3){
        this.surfaceMaterial.emissiveColor = color
    }

    /**
     * Shows the boxHighlight
     */
    show(){
        this.addComponent(new BoxHighlightAnimation())
        engine.addEntity(this)
        engine.addSystem(AnimateBoxHighlightsInstance)
    }

    /**
     * Hides the boxHighlight
     */
    hide(){
        this.removeComponent(BoxHighlightAnimation)
        engine.removeEntity(this)
    }

    /**
     * Updates the UV map to make a nice stripe animation effect
     * @param dt - deltatime
     */
    public updateUV(dt: number) {
      this.timer = this.timer >= this.duration ? 0 : this.timer + dt
      this.sides.forEach(side => {
        if(side.shape.uvs && side.dir[this.dir].animate){
           side.shape.uvs = lerpUVs(side.startUVs, this.timer, this.duration)
        }
      })
    }
}

const lerpUVs = (
  uvs: Array<float>,
  timer: number,
  duration: number,
) : Array<number> => {
  let lerpTime = Scalar.Clamp(timer/duration, 0, 1)
  let points = [
    Scalar.Lerp(uvs[0], uvs[0]+.5, lerpTime),
    Scalar.Lerp(uvs[1], uvs[1], lerpTime),
    Scalar.Lerp(uvs[2], uvs[2]+.5, lerpTime),
    Scalar.Lerp(uvs[3], uvs[3], lerpTime),
    Scalar.Lerp(uvs[4], uvs[4]+.5, lerpTime),
    Scalar.Lerp(uvs[5], uvs[5], lerpTime),
    Scalar.Lerp(uvs[6], uvs[6]+.5, lerpTime),
    Scalar.Lerp(uvs[7], uvs[7], lerpTime),
  ]
  return points.concat(points)
}

const BoxHighlights = engine.getComponentGroup(BoxHighlightAnimation)
class AnimateBoxHighlights implements ISystem {
    private system: ISystem = this
    update(dt: number) {
        if(!BoxHighlights.entities.length){
            if(this.system.active) engine.removeSystem(this.system)
        }
        BoxHighlights.entities.forEach(entity => {
            let boxHighlight = entity as Dash_BoxHighlight
            boxHighlight.updateUV(dt)
        })
    }
}
const AnimateBoxHighlightsInstance = new AnimateBoxHighlights()
// engine.addSystem(new AnimateBoxHighlights())

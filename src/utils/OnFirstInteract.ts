declare const Map: any

class Dash_OnFirstInteractInstance {
    public initialized: boolean = false
    private cbs: typeof Map = new Map()

    constructor(){
        onPointerLockedStateChange.add(({ locked }) => {
            if (!this.initialized && locked) {
                this.initialized = true
                this.cbs.forEach((cb: () => void) => cb())
            }
        })
    }

    add(name: string, callback: () => void){
        if(this.initialized){
            callback()
        }else{
            this.cbs.set(name, callback)
        }
    }
}

export const Dash_OnFirstInteract = new Dash_OnFirstInteractInstance()
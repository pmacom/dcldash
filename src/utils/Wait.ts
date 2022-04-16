import { Dash_AnimationQueue } from "./AnimationQueue"

/**
 * Usage
 **
    Wait(() => { log('3 seconds passed') }, 3)
*/

export const Dash_Wait = (func: () => void, duration: number) => Dash_AnimationQueue.add({
    duration,
    onComplete: () => func()
})
export const Dash_SampleArray = (arr: any[]) => {
    const len = arr == null ? 0 : arr.length
    return len ? arr[Math.floor(Math.random() * len)] : undefined
}
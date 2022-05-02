import { getParcel } from "@decentraland/ParcelIdentity"

export const Dash_GetSceneData = async () => {
    const parcelData = await getParcel()
    const base = parcelData.land.sceneJsonData.scene.base
    const parcels = parcelData.land.sceneJsonData.scene.parcels
    const maxHeight = Math.ceil(20 * (Math.log(parcels.length+1) * Math.LOG2E))
    return { base, parcels, maxHeight }
}
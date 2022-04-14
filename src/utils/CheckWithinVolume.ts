const CheckWithinVolume = (
    position: Vector3,
    scale: Vector3,
    targetPosition: Vector3
): boolean => {
    const { x: px, y: py, z: pz } = position
    const { x: sx, y: sy, z: sz } = scale
    const { x: tx, y: ty, z: tz } = targetPosition
    const min = new Vector3(
        px - (sx/2),
        py - (sy/2),
        pz - (sz/2),
    )
    const max = new Vector3(
        px + (sx/2),
        py + (sy/2),
        pz + (sz/2),
    )
    return tx > min.x && tx < max.x
        && ty > min.y && ty < max.y
        && tz > min.z && tz < max.z
}

export const Dash_CheckWithinVolume = CheckWithinVolume

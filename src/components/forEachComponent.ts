


export const ForEachComponent = (componentName:string) => {
    const components = engine.getEntitiesWithComponent(componentName)
    log({ components })
}
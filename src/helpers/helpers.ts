export const _get = (obj: any, path: string, defaultValue: any = undefined) : any => {
    const travel = (regexp: RegExp) =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
    return result === undefined || result === obj ? defaultValue : result
}


export const Dash_Helpers_GetEntitiesWithComponent = (componentName:string): Entity[] => {
  const components = engine.getEntitiesWithComponent(componentName)
  const entities: Entity[] = []
  if(components){
      Object.keys(components).forEach(entry => {
          entities.push(components[entry])
      });
  }
  return entities
}
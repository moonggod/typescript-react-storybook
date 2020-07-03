/**
 * setSmallHump
 * @param name SmallHump
 * @returns smallHump
 */
export const setSmallHump = (name:string) => {
  return name.replace(/^\S/, s => s.toUpperCase())
}

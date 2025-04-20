

export const stringIsNullOrWhiteSpace = (str?:string | null):boolean => {
    return !(str && str.trim().length > 0)
}

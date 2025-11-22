/**
 * Formats a Date object into a string in the format DD/MM/YYYY
 * @param date
 */
export const formatDate = (date: Date): string => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()














    return `${day}/${month}/${year}`
}


/**
 * An unused utility function
 */
export const unusedUtil = (): string => {
    return 'unused'
};

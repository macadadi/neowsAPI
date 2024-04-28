export const RoundOffNumber = (arg: number | null, decimalplaces = 2) => {
    if (!arg) return 0
    const num = parseFloat(arg.toString())
    return Number(num?.toFixed(decimalplaces));
}

export const dateToIOSstring = (date: Date | null) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
}
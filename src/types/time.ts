
const getTime = (time: number | Date) => {
    const d = new Date(time)
    const year = d.getFullYear()
    const mont = d.getMonth() + 1
    const day = d.getDate()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    return year + '-' + mont + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

export {getTime}
export function convertObjectToArray(obj: any = {}) {
    const arr = [];
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i].toString();
        arr.push(obj[key]);
    }

    return arr
}
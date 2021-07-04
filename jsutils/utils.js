// Sorts array of objects (in ascending order) based on key of each object
export function sortArrayOfObjs(array, key) {
    const sortedArray = array.sort((tempObj1, tempObj2) => (tempObj1[key] > tempObj2[key]) ? 1 : -1)
    return sortedArray
}


export function hasPositiveNumber(arrayOfNumbers) {
    for (let number of arrayOfNumbers) {
        if (number > 0) {
            return true
        }
    }
    return false
}


export function hasNegativeNumber(arrayOfNumbers) {
    for (let number of arrayOfNumbers) {
        if (number < 0) {
            return true
        }
    }
    return false
}


export function generateRandomHexCode() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
}


export function generateRandomHexCodes(howMany) {
    let randomHexCodes = []
    for (let i = 1; i <= howMany; i++) {
        randomHexCodes.push(generateRandomHexCode())
    }
    return randomHexCodes
}
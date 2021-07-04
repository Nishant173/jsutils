export function isOdd(number) {
    return (number % 2 === 1)
}


export function isEven(number) {
    return (number % 2 === 0)
}


export function isPrime(number) {
    if (number < 2) {
        throw RangeError("Numbers that are < 2 are neither prime nor composite")
    }
    let numFactors = 0
    for (let i = 1; i < number + 1; i++) {
        if (number % i === 0) {
            numFactors += 1
            if (numFactors > 2) {
                return false
            }
        }
    }
    return true
}


export function isComposite(number) {
    return !isPrime(number)
}


export function power(number, pow) {
    return Math.pow(number, pow)
}


export function round(number, by) {
    const factor = power(10, by)
    return Math.round(number * factor) / factor
}


export function floor(number) {
    return Math.floor(number)
}


export function ceil(number) {
    return Math.ceil(number)
}


export function floorByClosestMultiple(number, by) {
    return floor(number / by) * by
}


export function ceilByClosestMultiple(number, by) {
    return ceil((number + 1) / by) * by
}


export function abs(number) {
    return Math.abs(number)
}


export function min(arrayOfNumbers) {
    return Math.min(...arrayOfNumbers)
}


export function max(arrayOfNumbers) {
    return Math.max(...arrayOfNumbers)
}


export function sum(arrayOfNumbers) {
    let sumOfNumbers = 0
    for (let number of arrayOfNumbers) {
        sumOfNumbers += number
    }
    return sumOfNumbers
}

export function product(arrayOfNumbers) {
    let productOfNumbers = 1
    for (let number of arrayOfNumbers) {
        productOfNumbers *= number
    }
    return productOfNumbers
}


export function mean(arrayOfNumbers) {
    return sum(arrayOfNumbers) / arrayOfNumbers.length
}


export function median(arrayOfNumbers) {
    const arraySorted = arrayOfNumbers.sort()
    let medianValue
    if (isEven(arraySorted.length)) {
        const middleIndex = (arraySorted.length / 2) - 1
        medianValue = mean([
            arraySorted[middleIndex], arraySorted[middleIndex + 1],
        ])
    } else {
        const middleIndex = ceil((arraySorted.length / 2) - 1)
        medianValue = arraySorted[middleIndex]
    }
    return medianValue
}


export function maxOfAbsValues(arrayOfNumbers) {
    let absArrayOfNumbers = arrayOfNumbers.map(abs)
    return max(absArrayOfNumbers)
}


export function minOfAbsValues(arrayOfNumbers) {
    let absArrayOfNumbers = arrayOfNumbers.map(abs)
    return min(absArrayOfNumbers)
}


export function arange(start, stop, step=1) {
    if (step === 0) {
        throw RangeError("Step cannot be 0")
    }
    if (start < stop && step < 0) {
        throw RangeError("When start < stop, step cannot be < 0")
    }
    if (start > stop && step > 0) {
        throw RangeError("When start > stop, step cannot be > 0")
    }

    let arrayOfNumbers = []
    if (start < stop) {
        for (let i = 0; i < stop - start + 1; i+=step) {
            arrayOfNumbers.push(start + i)
        }
    }
    else if (start > stop) {
        for (let i = 0; i < start - stop + 1; i-=step) {
            arrayOfNumbers.push(start - i)
        }
    }
    else {
        arrayOfNumbers.push(start)
    }
    return arrayOfNumbers
}


export function cumulativeSum(arrayOfNumbers) {
    let cumulativeArray = [arrayOfNumbers[0]]
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        cumulativeArray.push(cumulativeArray[i-1] + arrayOfNumbers[i])
    }
    return cumulativeArray
}


export function cumulativeDiff(arrayOfNumbers) {
    let cumulativeArray = [arrayOfNumbers[0]]
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        cumulativeArray.push(cumulativeArray[i-1] - arrayOfNumbers[i])
    }
    return cumulativeArray
}


export function cumulativeProduct(arrayOfNumbers) {
    let cumulativeArray = [arrayOfNumbers[0]]
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        cumulativeArray.push(cumulativeArray[i-1] * arrayOfNumbers[i])
    }
    return cumulativeArray
}


export function cumulativeDivision(arrayOfNumbers) {
    let cumulativeArray = [arrayOfNumbers[0]]
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        cumulativeArray.push(cumulativeArray[i-1] / arrayOfNumbers[i])
    }
    return cumulativeArray
}


export function getUniqueItems(array) {
    let uniqueItems = []
    for (let item of array) {
        if (!uniqueItems.includes(item)) {
            uniqueItems.push(item)
        }
    }
    return uniqueItems
}


// Concatenates all arrays given into one array
export function concatenate(...arrays) {
    let concatenatedArray = []
    for (let array of arrays) {
        concatenatedArray = concatenatedArray.concat(array)
    }
    return concatenatedArray
}


// Returns array of `variable` repeated `numTimes` times
export function repeat(variable, numTimes) {
    let arrayOfVariables = []
    for (let i = 0; i < numTimes; i++) {
        arrayOfVariables.push(variable)
    }
    return arrayOfVariables
}


// Returns index of highest number in array
export function argmax(arrayOfNumbers) {
    let highest = arrayOfNumbers[0]
    let indexOfHighest = 0
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        let tempNumber = arrayOfNumbers[i]
        if (tempNumber > highest) {
            highest = tempNumber
            indexOfHighest = i
        }
    }
    return indexOfHighest
}


// Returns index of lowest number in array
export function argmin(arrayOfNumbers) {
    let lowest = arrayOfNumbers[0]
    let indexOfLowest = 0
    for (let i = 1; i < arrayOfNumbers.length; i++) {
        let tempNumber = arrayOfNumbers[i]
        if (tempNumber < lowest) {
            lowest = tempNumber
            indexOfLowest = i
        }
    }
    return indexOfLowest
}


// Gets array of `numValues` numbers that are linearly spaced between `start` and `stop` (range-inclusive)
export function linspace(start, stop, numValues) {
    if (numValues < 1) {
        throw RangeError("numValues must be >= 1")
    }
    if (start !== stop && numValues < 2) {
        throw RangeError("When start !== stop, numValues must be >= 2")
    }
    if (start === stop) {
        return [start]
    }
    const step = (stop - start) / (numValues - 1)
    let arrayLinspaced = []
    for (let i = 0; i < numValues; i++) {
      arrayLinspaced.push(start + (step * i))
    }
    return arrayLinspaced
}


// Gets array of length `howMany` having linearly spaced values by index
export function linspaceByIndex(array, howMany) {
    if (howMany > array.length) {
        throw RangeError("howMany cannot be > length of array")
    }
    const linspacedIndices = linspace(0, array.length - 1, howMany).map(floor)
    let arrayLinspacedByIndex = []
    for (let i = 0; i < linspacedIndices.length; i++) {
        arrayLinspacedByIndex.push(array[linspacedIndices[i]])
    }
    return arrayLinspacedByIndex
}
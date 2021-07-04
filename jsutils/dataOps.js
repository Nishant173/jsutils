import { KeyError } from './errors'
import {
    concatenate,
    getUniqueItems,
} from './numericalOps'


// Reference: https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
export function valueCounts(array) {
    if (array.length === 0) {
        return {}
    }
    let valueCountsObj = {}
    for (let value of array) {
        if (value in valueCountsObj) {
            valueCountsObj[value] += 1
        }
        else {
            valueCountsObj[value] = 1
        }
    }
    valueCountsObj = Object.entries(valueCountsObj).sort(([,b],[,a]) => a-b).reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    return valueCountsObj
}


export function removeUndefinedValues(array) {
    let arrayNew = []
    for (let value of array) {
        if (value !== undefined) {
            arrayNew.push(value)
        }
    }
    return arrayNew
}


export function removeNullValues(array) {
    let arrayNew = []
    for (let value of array) {
        if (value !== null) {
            arrayNew.push(value)
        }
    }
    return arrayNew
}


export function removeNullAndUndefined(array) {
    let arrayNew = []
    for (let value of array) {
        if (value !== null && value !== undefined) {
            arrayNew.push(value)
        }
    }
    return arrayNew
}


/*
Takes in an array of objects and returns array of values of particular key in each object
Example:
    const data = [
        {name: "BBB", age: 25, language: "English"},
        {name: "CCC", age: 37, language: "German"},
        {name: "DDD", age: 42},
        {name: "AAA", age: 19, language: "Spanish"},
    ]
    getValuesByKey(data, "age") // Returns: [25, 37, 42, 19]
    getValuesByKey(data, "language") // Returns: ["English", "German", undefined, "Spanish"]
*/
export function getValuesByKey(arrayOfObjs, key) {
    let arrayOfValuesByKey = []
    for (let i = 0; i < arrayOfObjs.length; i++) {
        let obj = arrayOfObjs[i]
        if (obj[key] === undefined) {
            arrayOfValuesByKey.push(undefined)
        }
        else {
            arrayOfValuesByKey.push(obj[key])
        }
    }
    return arrayOfValuesByKey
}


/*
Takes in array of objects, and returns an object having keys = specified keys from the
given array of objects, and values = array of elements of the key mentioned
Example:
    const data = [
        {name: "BBB", age: 25, language: "English"},
        {name: "CCC", age: 37, language: "German"},
        {name: "DDD", age: 42},
        {name: "AAA", age: 19, language: "Spanish"},
    ]
    getObjectOfValuesByKeys(data, ["name", "age", "language"])
Returns: {
    name: ["BBB", "CCC", "DDD", "AAA"],
    age: [25, 37, 42, 19],
    language: ["English", "German", undefined, "Spanish"],
}
*/
export function getObjectOfValuesByKeys(arrayOfObjs, keys) {
    let objOfValuesByKey = {}
    for (let i = 0; i < arrayOfObjs.length; i++) {
        let obj = arrayOfObjs[i]
        for (let j = 0; j < keys.length; j++) {
            let key = keys[j]
            let elementToAdd = undefined
            if (obj[key] !== undefined) {
                elementToAdd = obj[key]
            }
            if (i === 0) {
                objOfValuesByKey[key] = [elementToAdd]
            }
            else {
                let currentArray = objOfValuesByKey[key]
                currentArray.push(elementToAdd)
                objOfValuesByKey[key] = currentArray
            }
        }
    }
    return objOfValuesByKey
}


export function getUniqueFields(arrayOfObjects) {
    let allFields = []
    for (let obj of arrayOfObjects) {
        let fieldsInObj = Object.keys(obj)
        allFields = concatenate(allFields, fieldsInObj)
    }
    let uniqueFields = getUniqueItems(allFields)
    return uniqueFields
}


// Adds unique field to an array of objects
export function addUniqueField(arrayOfObjects, uniqueFieldName) {
    const existingFields = getUniqueFields(arrayOfObjects)
    if (existingFields.includes(uniqueFieldName)) {
        throw KeyError("The given unique-field-name already exists in the given array of objects")
    }
    let arrayOfObjectsWithUniqueField = []
    for (let i = 0; i < arrayOfObjects.length; i++) {
        let obj = arrayOfObjects[i]
        obj[uniqueFieldName] = i + 1
        arrayOfObjectsWithUniqueField.push(obj)
    }
    return arrayOfObjectsWithUniqueField
}


function dropField(arrayOfObjects, fieldName) {
    let arrayOfObjsNew = []
    for (let obj of arrayOfObjects) {
        let keysInObj = Object.keys(obj)
        if (keysInObj.includes(fieldName)) {
            delete obj[fieldName]
        }
        arrayOfObjsNew.push(obj)
    }
    return arrayOfObjsNew
}


export function dropFields(arrayOfObjects, fieldNames) {
    for (let fieldName of fieldNames) {
        arrayOfObjects = dropField(arrayOfObjects, fieldName)
    }
    return arrayOfObjects
}


/*
    Eg: apply([ 0, 5.555555555555555, 11.11111111111111, 16.666666666666664, 20 ], round, 3)
    Returns [ 0, 5.556, 11.111, 16.667, 20 ]
*/
export function apply(array, func, ...args) {
    let arrayNew = []
    for (let item of array) {
        arrayNew.push(func(item, ...args))
    }
    return arrayNew
}


// // BUG: Works correctly, but over-writes initial `arrayOfObjects` as well. Need to make a copy of the initial `arrayOfObjects`
// export function fillNullAndUndefined(arrayOfObjects, fieldName, filler) {
//     let arrayOfObjsCopy = arrayOfObjects.slice()
//     let arrayOfObjsNew = []
//     for (let obj of arrayOfObjsCopy) {
//         const initialValue = obj[fieldName]
//         if (initialValue === undefined || initialValue === null) {
//             obj[fieldName] = filler
//         }
//         arrayOfObjsNew.push(obj)
//     }
//     return arrayOfObjsNew
// }
export default {
    fixReadability,
    amoutOfEachMaterial,
    fiveMostOccuringMaterials
}

export function fixReadability(data) {
    return data.map((result, index) => {
        return {
            materiaal: result.materiaalLabel.value,
        }
    })
}

export function amoutOfEachMaterial(readableData) {
    const object = new Object()

    readableData.forEach(dataElement => {
        if (object[dataElement.materiaal] != null) {
            object[dataElement.materiaal] += 1
        } else {
            object[dataElement.materiaal] = 1
        }
    })
    return object
}

export function fiveMostOccuringMaterials(allMaterials) {
    const top5Materials = []

    Object.keys(allMaterials).forEach(key => {
        top5Materials.push({
            materiaal: key.replace(key[0], key[0].toUpperCase()),
            aantal: allMaterials[key]
        })
    })
    return top5Materials.sort((lowest, highest) => highest.aantal - lowest.aantal).splice(0, 5)
}
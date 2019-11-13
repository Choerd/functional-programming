export default {
    fixReadability,
    amoutOfEachMaterial,
    fiveMostOccuringMaterials
}

export function fixReadability(data) {
    return data.map((result, index) => {
        return {
            id: index,
            cho: result.cho.value,
            title: result.title.value,
            materiaal: result.materiaalLabel.value,
            type: result.voorwerpType.value,
            land: result.landLabel.value
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

// function filterByCountry(dataArray, land) {
//     return dataArray.filter((item) => item.land == land)

//     // Landen om als voorbeeld te laten zien: 
//     //  * Indonesia
//     //  * Papua New Guinea
// }
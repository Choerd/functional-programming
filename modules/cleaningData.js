export default {
    fixReadability,
    materialenVoorElkLand,
    top5MaterialenPerLand,
    landenMet5VerschillendeMaterialen,
    totaalAantalMaterialenPerLand,
    arrayToObject
}

export function fixReadability(data) {
    return data.map((result, index) => {
        return {
            id: index,
            materiaal: result.materiaalLabel.value,
            land: result.landLabel.value
        }
    })
}

export function materialenVoorElkLand(readableData) {
    const alleMaterialenArray = []
    const alleLandenArray = [...new Set(readableData.map(voorwerp => voorwerp.land))]
    const alleLandenMetMaterialenArray = []

    alleLandenArray.map(land => {
        let createObject = new Object()
        readableData.filter(voorwerp => {
            if (voorwerp.land.includes(land)) {
                alleMaterialenArray.push(createObject = {
                    land: land,
                    materiaal: voorwerp.materiaal
                })
            }
        })
    })

    alleLandenArray.map(land => {
        let maakNieuwObject = new Object()
        alleMaterialenArray.filter(data => {
            if (data.land === land) {
                if (maakNieuwObject[data.materiaal] != null) {
                    maakNieuwObject[data.materiaal] += 1
                } else {
                    maakNieuwObject[data.materiaal] = 1
                }
            }
        })
        alleLandenMetMaterialenArray.push({
            materiaalObject: maakNieuwObject,
            land: land,
        })
    })
    return alleLandenMetMaterialenArray
}

export function top5MaterialenPerLand(materialenPerLand) {

    var array = []

    materialenPerLand.map(land => {
        var landVoorArray = []
        Object.keys(land.materiaalObject).map(key => {
            var createObject = new Object()
            createObject = {
                materiaal: key,
                aantal: land.materiaalObject[key],
                land: land.land
            }
            landVoorArray.push(createObject)
        })

        landVoorArray.sort(function (a, b) {
            return b.aantal - a.aantal
        })
        array.push(landVoorArray.splice(landVoorArray, 5))
    })
    return array
}

export function landenMet5VerschillendeMaterialen(top5MeesteMaterialenPerLand) {
    return top5MeesteMaterialenPerLand.filter(array => {
        if (array.length == 5) {
            return array
        }
    })
}

function totaalAantalMaterialenPerLand(totaalMaterialenPerLand) {
    var dataArray = []
    totaalMaterialenPerLand.map(land => {
        var createObject = new Object()
        land.forEach(land => {
            createObject = {
                totaal: land.aantal + land.aantal + land.aantal + land.aantal + land.aantal
            }
        });
        land.push(createObject)
        dataArray.push(land)
    });
    return dataArray
}

function arrayToObject(top5MaterialenTop5Landen) {
    top5MaterialenTop5Landen.sort((a, b) => b[5].totaal - a[5].totaal).splice(5, top5MaterialenTop5Landen.length)

    var rawDataArray = []
    top5MaterialenTop5Landen.map(array => {
        array.map(object => {
            var createObject = new Object()
            createObject = {
                land: object.land,
                aantal: object.aantal,
                materiaal: object.materiaal
            }
            rawDataArray.push(createObject)
        })
    })

    var cleanDataArray = []
    rawDataArray.forEach(object => {
        if (object.aantal != undefined) {
            cleanDataArray.push(object)
        }
    })
    return cleanDataArray
}
export default {
    fixReadability,
    materialenVoorElkLand,
    top5MaterialenPerLand,
    landenMet5VerschillendeMaterialen,
    totaalAantalMaterialenPerLand,
    testmij
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

export function materialenVoorElkLand(readableData) {
    const alleMaterialenArray = []
    const alleLandenArray = [...new Set(readableData.map(voorwerp => voorwerp.land))]
    const alleLandenMetMaterialenArray = []

    alleLandenArray.forEach(land => {
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

    alleLandenArray.forEach(land => {
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

export function top5MaterialenPerLand(data) {
    var array = []

    data.map(land => {
        var landVoorArray = []

        Object.keys(land.materiaalObject).forEach(key => {
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

export function landenMet5VerschillendeMaterialen(data) {
    return data.filter(array => {
        if (array.length == 5) {
            return array
        }
    })
}

function totaalAantalMaterialenPerLand(data) {
    var dataArray = []
    data.map(land => {
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

function testmij(data) {
    data.sort((a, b) => b[5].totaal - a[5].totaal).splice(5, data.length)

    var rawDataArray = []
    data.map(top5 => {
        top5.forEach(test => {
            var createObject = new Object()
            createObject = {
                land: test.land,
                aantal: test.aantal,
                materiaal: test.materiaal
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
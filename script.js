import fetchData from './data.js'

fetchData()
    .then(rawData => fixReadability(rawData))
    .then(readableData => amoutOfEachMaterial(readableData))
    .then(allMaterials => fiveMostOccuringMaterials(allMaterials))
    .then(iets => console.log(iets))

function fixReadability(data) {
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

function amoutOfEachMaterial(readableData) {
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

//credits voor bald bitch a.k.a. wessel smit
function fiveMostOccuringMaterials(allMaterials) {
    const top5Materials = []

    Object.keys(allMaterials).forEach(key => {
        top5Materials.push({
            aantal: allMaterials[key],
            materiaal: key.replace(key[0], key[0].toUpperCase())
        })
    })
    return top5Materials.sort((lowest, highest) => highest.aantal - lowest.aantal).splice(0, 5)
}


// var array = []
// arrayWithNumber.forEach(number => {
//     iets.push(number.aantal)
// })
// iets.sort(function (a, b) {
//     return b - a
// })

// return array
// }


// // //versie 1
// function verzinNogEenNaam2(opgeschoondeData) {
//     const emptyArray = []

//     opgeschoondeData.forEach(element => {
//         emptyArray.push(element.materiaal)
//     })
//     const uniqueItems = [...new Set(emptyArray)]

//     console.log(uniqueItems)
// }

//versie 2
// function verzinNogEenNaam2(opgeschoondeData) {
//     return [...new Set(opgeschoondeData.map(result => {
//         return {
//             materiaal: result.materiaal
//         }
//     }))]
// }

//versie 3
// function arrayUniekeMaterialen(opgeschoondeData) {
//     return [...new Set(opgeschoondeData.map(voorwerp => voorwerp.materiaal))]
// }


// Welke types zijn er allemaal? En hoevaak komen deze voor in de array?

// Maak een array met objecten van de types die het vaakst voorkomen (Top 5)

// Een berekening maken waarvan je de lengte van de categorie-array deelt door de lengte van de top 5 arrays

// Deze waardes (procenten) toevoegen aan een nieuwe array die je gaat gebruiken in d3





























































// function filterByCountry(dataArray, land) {
//     return dataArray.filter((item) => item.land == land)

//     // Landen om als voorbeeld te laten zien: 
//     //  * Indonesia
//     //  * Papua New Guinea
// }
import fetchData from './data.js'
import functie from './cleaningData.js'

fetchData()
    .then(rawData => functie.fixReadability(rawData))
    .then(readableData => functie.amoutOfEachMaterial(readableData))
    .then(allMaterials => functie.fiveMostOccuringMaterials(allMaterials))
    .then(iets => console.log(iets))
// Hierin d3 fixen
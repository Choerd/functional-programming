import fetchData from './data.js'
import functie from './cleaningData.js'

fetchData()
    .then(rawData => functie.fixReadability(rawData))
    .then(readableData => functie.amoutOfEachMaterial(readableData))
    .then(allMaterials => functie.fiveMostOccuringMaterials(allMaterials))
    .then(d3data => { // Schrijf hier d3 functie
        console.log("d3data", d3data)

    })
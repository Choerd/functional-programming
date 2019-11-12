const endpoint =
    "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-24/sparql"

const sparql = `
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX gn: <http://www.geonames.org/ontology#> 

SELECT  ?cho
        ?catName
		?title
		?materiaalLabel
		?voorwerpType
		?landLabel
WHERE {
<https://hdl.handle.net/20.500.11840/termmaster2809> skos:narrower ?cat . # keuze maken in categorie

  # variabelen definiëren
  ?cho edm:isRelatedTo ?cat . # ophalen van de link/uri van het voorwerp
  ?cho dct:medium ?materiaal . # ophalen van het materiaal van het voorwerp
  ?cho dc:type ?voorwerpType . # ophalen van het type van het voorwerp
  ?cho dct:spatial ?plaats .

  ?plaats skos:exactMatch/wgs84:lat ?lat . #
  ?plaats skos:exactMatch/wgs84:long ?long .
  ?plaats skos:exactMatch/gn:parentCountry ?land .

  #Weergeven van de URI's in tekst
  ?cho dc:title ?title . # titel van het voorwerp
  ?cat skos:prefLabel ?catName .
  ?land gn:name ?landLabel .
  ?materiaal skos:prefLabel ?materiaalLabel .

} ORDER BY DESC(?cho)
`

fetchData()
    .then(data => fixReadability(data))
    .then(readableData => amoutOfEachMaterial(readableData))
    .then(allMaterials => fiveMostOccuringMaterials(allMaterials))
    .then(iets => console.log(iets))

async function fetchData() {
    const response = await fetch(endpoint + "?query=" + encodeURIComponent(sparql) + "&format=json")
    const data = await response.json()

    return data.results.bindings
}

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

    Object.keys(allMaterials).forEach(function (key) {
        top5Materials.push(data = {
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
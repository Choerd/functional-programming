const endpoint =
    "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-24/sparql";

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
  ?cat skos:prefLabel ?catName .

} ORDER BY DESC(?cho)
`;

async function fetchData() {
    // Ophalen van de data en omzetten naar json
    const response = await fetch(endpoint + "?query=" + encodeURIComponent(sparql) + "&format=json");
    const data = await response.json();
    const opgehaaldeDataArray = data.results.bindings

    // Opgehaalde JSON aanpassen voor een betere leesbaarheid
    const aangepasteDataArray = opgehaaldeDataArray.map(async (result, index) => {
        return {
            id: index, // id geven aan elk object in de array
            cho: result.cho.value,
            title: result.title.value,
            materiaal: result.materiaalLabel.value,
            type: result.voorwerpType.value,
            land: result.landLabel.value
        }
    })
    // Afwachten tot alle data is aangepast  en dan pas opslaan in 'results'
    return await Promise.all(aangepasteDataArray)
}

// Filter-op-land functie
function filterByCountry(dataArray, land) {
    return dataArray.filter((item) => item.land == land)
}

// IFFE
(async () => {
    const data = await fetchData()
    console.log(filterByCountry(data, "Papua New Guinea"));
})()


// async function runQuery(endpoint, sparql) {
//     const response = await fetch(endpoint + "?query=" + encodeURIComponent(sparql) + "&format=json");
//     const data = await response.json();
//     const rawData = data.results.bindings
//     // console.log("Rawdata:", rawData)

//     return rawData
// }

// function test() {
//     const cleanArray = runQuery(endpoint, sparql).then(item => {
//             return item.map((result, index) => {
//                 return {
//                     id: index,
//                     cho: result.cho.value,
//                     title: result.title.value,
//                     materiaal: result.materiaalLabel.value,
//                     type: result.voorwerpType.value,
//                     land: result.landLabel.value
//                 }
//             })
//         })
//         .then(newData => {
//             console.log("Remapped data:", newData)
//         })
// }
// test();

/*
async function filterByCountry(land) {
    const dataArray = await fetchData()

    // dataArray.forEach(element => {
    //     console.log(element.land)
    // });

    // Lange versie
    // const newArray = dataArray.filter((item) => {
    //     return item.land != land
    // })

    // Korte versie
    const arraySameCountry = dataArray.filter((item) => item.land == land)

    console.log("Aantal voorwerp in:", land, arraySameCountry)
}
*/

// filterByCountry("Papua New Guinea")
# Piechart

Voor mijn visualisatie was ik in eerste instantie van plan om een Pie chart te maken. Hiervoor heb ik eerst mijn data opgeschoond en vervolgens deze in d3 ingeladen. Hier bleek het zo te zijn dat ik maar een paar dingen hoefde aan te passen om mijn de visualisatie te genereren aan de hand van mijn data.

<img width="554" alt="Schermafbeelding 2019-11-15 om 09 29 57" src="https://user-images.githubusercontent.com/45365598/68928579-aeeefa80-078a-11ea-9eac-251c70465c27.png">

### Opschonen

```javascript
function fixReadability(data) {
    return data.map((result, index) => {
        return {
            materiaal: result.materiaalLabel.value,
        }
    })
}
```
> Het omschrijven van de originele array zodat ik de objecten erin makkelijker en netter aan kan spreken.

```javascript
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
```
> Ik maak een object aan en maak voor elk materiaal een key. Wanneer hij meerdere keren dezelfde key tegenkomt maakt hij een value met de waarde van 1 en telt hij het aantal keys daarbij op.

```javascript
function fiveMostOccuringMaterials(allMaterials) {
    const top5Materials = []

    Object.keys(allMaterials).forEach(key => {
        top5Materials.push({
            materiaal: key.replace(key[0], key[0].toUpperCase()),
            aantal: allMaterials[key]
        })
    })
    return top5Materials.sort((lowest, highest) => highest.aantal - lowest.aantal).splice(0, 5)
}
```
> In deze functie maak in een lege array aan met als doel om daar de top 5 meest voorkomende materialen in te doen. Vervolgens loop ik door het object heen om de objecten in een array te stoppen zodat ik kan sorteren. Vervolgens splice ik de array na de 5e zodat ik een top 5 overhoud.

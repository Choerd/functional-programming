# Functional-Programming
**De opdracht**    
In deze twee weken heb ik geleerd een visualisatie te maken die wordt geladen aan de hand van data. Deze data komt van het  Nationaal Museum van Wereldculturen. Deze data heb ik eerst opgeschoont door middel van Functional Programming. Vervolgens ga ik deze data gebruiken om de visualisatie te maken door middel van de D3 Library.  

**Wat is Functional Programming?**  
Functional Programming is het opbouwen van code door 'pure functies'* samen te stellen. Aan de hand van deze functies kun je bijvoorbeeld data muteren/opschonen tot een gewenste structuur. Bekende functies die kunnen helpen bij Functional Programming zijn map(), reduce() en filter().

* Pure functies zijn: functies die geen toegang hebben tot het aanpassen van een variabel binnen een functie maar een waarde teruggeven. 

## Concept
De gebruiker kan aan de hand van de visualisatie inzicht krijgen in het soort materiaal van de voorwerpen in een bepaalde categorie. Deze krijgt hij te zien van de verschillende landen binnen deze categorie. Elk land staat voor een kleur. De grootte van de ballen betekent hoe meer materialen er zijn in die categorie. De gebruiker kan ook zelf bollen verslepen om deze naast elkaar te houden en te vergelijken.

![Concept-functional-programming](https://user-images.githubusercontent.com/45365598/68803690-866ae180-0660-11ea-808c-730090275156.png)
Bron: https://bl.ocks.org/HarryStevens/f636199a46fc4b210fbca3b1dc4ef372

## Inhoudsopgave
* [Doelen](#Doelen)
* [Data Transforming Pattern](#Data-Transforming-Pattern)
* [API](#API)
* [Credits](#Credits)
* [Waar ik trots op ben](#Waar-ik-trots-op-ben)

## Doelen
* [x] Data opschonen door middel van Functional Programming
* [x] Basisprincipes leren van ES6
* [x] Gebruik maken van d3 om mijn data om te toveren tot visualisatie
 
## Data Transforming Pattern
Om te leren hoe je data opschoont met functional programming heb ik een oefening gedaan. Deze kun je ook vinden in mijn wiki.
[Oefening data opschonen met functional programming](https://github.com/Choerd/functional-programming/wiki/Data-Transforming-Pattern)
 
## API
Om dit concept uit te kunnen werken met d3 heb ik data nodig die ik ophaal aan de hand van een SPARQL query, deze kun je hieronder vinden. De data die ik ophaal heeft veel verschillende variabelen.
* "Categorie" van het voorwerp
* "Titel" van het voorwerp
* "URI" van het voorwerp
* "Materiaal" van het voorwerp
* "Type" van het voorwerp
* "Geolocatie" van het voorwerp

Deze data heb ik nodig omdat ik alle voorwerpen uit een bepaalde categorie wil gebruiken. De titel van de voorwerpen is niet perse nodig maar gebruik ik meer als controle of de data die ik opschoon klopt. Het materiaal en het type van het voorwerp wil ik gebruiken om te weergeven in mijn data-visualisatie. Tot slot wil ik de geolocatie gebruiken om een filter te kunnen toevoegen aan mijn concept. Hierdoor zou je ook het materiaal en het type van de voorwerpen in een categorie kunnen filteren en op land.

**Welke data heb ik uiteindelijk gebruikt en wat heb ik met de data gedaan die ik niet heb gebruikt?**  
De data die ik uiteindelijk heb gebruikt zijn de **materialen en de geolocatie.** Deze heb ik niet allemaal gebruikt maar ik ben een gedeelte van de data verloren tijdens het opschonen. Omdat een deel van de landen heel weinig data bevatten heb ik ervoor gekozen om een top 5 van te maken van de landen met de meeste voorwerpen/materialen en daarin ook weer een top 5 van de meeste materialen van de voorwerpen. Hierdoor krijg je dus 5 bollen van materialen per land, keer 5 landen. Hierdoor kan je fijner vergelijken dan dat er 60 bollen staan van 30 landen.

<details><summary>Mijn SPARQL query</summary>
	
```
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
  
  ?cho edm:isRelatedTo ?cat .
  ?cho dct:medium ?materiaal .
  ?cho dc:type ?voorwerpType .
  ?cho dct:spatial ?plaats .

  ?plaats skos:exactMatch/wgs84:lat ?lat . 
  ?plaats skos:exactMatch/wgs84:long ?long .
  ?plaats skos:exactMatch/gn:parentCountry ?land .
      
  ?cho dc:title ?title . # titel van het voorwerp
  ?cat skos:prefLabel ?catName .
  ?land gn:name ?landLabel .
  ?materiaal skos:prefLabel ?materiaalLabel .
  ?cat skos:prefLabel ?catName .

} ORDER BY DESC(?cho)
```

</details>

## Credits
Hier kun je vinden wie mij heeft geholpen en waarmee dat is geweest. In de wiki kun je vinden wanneer dat is gebeurt.

* Opstarten van mijn fetch() en .then-chain (**Thijs**)
    * Ik had mijn eigen async fetch met await geschreven maar vond het lastig om hier te zien of hij iets terug gaf. Dit had ik samen met Thijs opgelost met een IFFE. Dit was alleen niet de nette manier dus heeft hij Wessel, Stefan en mij uitgelegt hoe je dit zou kunnen doen met .then wat veel netter is.

* Meegedacht met een opschoon-functie (**Wessel**)
    * Samen met Wessel heb ik een functie geschreven die we allebei nodig hadden voor het opschonen van onze data. Deze functie zorgde ervoor dat we een object met keys en values om hebben gezet naar een array met deze data erin om te kunnen gebruiken in d3. De manier om deze functie te schrijven kwam doordat ik dit eerst had gevraagt aan **Danny**.

## Waar ik trots op ben

```javascript
  const alleLanden = [...new Set(data.map(naam => naam.land))]
 
  const color = d3.scaleOrdinal()
   .domain(alleLanden)
   .range(d3.schemeSet1)
```
> Deze code gebruik ik om een dynamische domain aan te maken voor in mijn d3. Simpel maar netjes/handig

```javascript
export function top5MaterialenPerLand(materialenPerLand) {
    const array = []

    materialenPerLand.map(land => {
        const landVoorArray = []
        Object.keys(land.materiaalObject).forEach(key => {
            let createObject = new Object()
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
```
> In deze functie maak ik van een object van alle materialen binnen een land een nieuw object aan, die ik weer push naar een array. Deze array sorteer ik vervolgens en splice ik deze. Deze array return ik en zo heb ik van elk land die in de categorie voorkomt een top 5 van de materialen.

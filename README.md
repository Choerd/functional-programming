# Functional-Programming
**De Opdracht**    
In deze twee weken heb ik geleerd een visualisatie te maken die wordt geladen aan de hand van data. Deze data komt van het  Nationaal Museum van Wereldculturen. Deze data heb ik eerst opgeschoont door middel van Functional Programming. Vervolgens ga ik deze data gebruiken om de visualisatie te maken door middel van de D3 Library.  

**Wat is Functional Programming?**  
Functional Programming is het opbouwen van code door 'pure functies'* samen te stellen. Aan de hand van deze functies kun je bijvoorbeeld data muteren/opschonen tot een gewenste structuur. Bekende functies die kunnen helpen bij Functional Programming zijn map(), reduce() en filter().

* Pure functies zijn: functies die geen toegang hebben tot het aanpassen van een variabel binnen een functie maar een waarde teruggeven. 

## Inhoudsopgave
* [Doelen](#Doelen)
* [Concept](#Concept)
* [Features](#Features)
* [API](#API)
* [Credits](#Credits)

## Doelen
* [ ] Data opschonen door middel van Functional Programming
* [ ] Basisprincipes leren van ES6
 
## Concept
De gebruiker kan aan de hand van de visualisatie inzicht krijgen in het type en het soort materiaal van de voorwerpen binnen een bepaalde categorie. De categorie kan de gebruiker zelf bepalen door deze te selecteren. Wanneer hij een categorie heeft gevonden kan hij ook nog filteren op een bepaald land om de voorwerpen te kunnen bekijken van bepaalde landen.

![concept_functional-programming](https://user-images.githubusercontent.com/45365598/68464932-c7529880-0211-11ea-9cd3-cca7d83361fb.png)

## Features
## API
Om dit concept uit te kunnen werken met d3 heb ik data nodig die ik ophaal aan de hand van een SPARQL query, deze kun je hieronder vinden. De data die ik ophaal heeft veel verschillende variabelen.
* "Categorie" van het voorwerp
* "Titel" van het voorwerp
* "URI" van het voorwerp
* "Materiaal" van het voorwerp
* "Type" van het voorwerp
* "Geolocatie" van het voorwerp

Deze data heb ik nodig omdat ik alle voorwerpen uit een bepaalde categorie wil gebruiken. De titel van de voorwerpen is niet perse nodig maar gebruik ik meer als controle of de data die ik opschoon klopt. Het materiaal en het type van het voorwerp wil ik gebruiken om te weergeven in mijn data-visualisatie. Tot slot wil ik de geolocatie gebruiken om een filter te kunnen toevoegen aan mijn concept. Hierdoor zou je ook het materiaal en het type van de voorwerpen in een categorie kunnen filteren en op land.

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

<details><summary>Titel</summary>
<p>

```
http://localhost:8080/
```

</p>
</details>

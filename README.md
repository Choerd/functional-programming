# Functional-Programming

## Inhoudsopgave
* [Doelen](#Doelen)
* [Beschrijving](#Beschrijving)
* [Features](#Features)
* [API](#API)
* [Installeren](#Installeren)
* [Credits](#Credits)

## Doelen
* [x] Test
* [ ] Test
 
## Beschrijving


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
  
  # variabelen definiëren
  ?cho edm:isRelatedTo ?cat .
  ?cho dct:medium ?materiaal .
  ?cho dc:type ?voorwerpType .
  ?cho dct:spatial ?plaats .

  ?plaats skos:exactMatch/wgs84:lat ?lat . 
  ?plaats skos:exactMatch/wgs84:long ?long .
  ?plaats skos:exactMatch/gn:parentCountry ?land .
      
  #Weergeven van de URI's in tekst
  ?cho dc:title ?title . # titel van het voorwerp
  ?cat skos:prefLabel ?catName .
  ?land gn:name ?landLabel .
  ?materiaal skos:prefLabel ?materiaalLabel .
  ?cat skos:prefLabel ?catName .

} ORDER BY DESC(?cho)
```

</details

## Installeren
## Credits

<details><summary>Titel</summary>
<p>

```
http://localhost:8080/
```

</p>
</details>

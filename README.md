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
* [API](#API)
* [Credits](#Credits)

## Doelen
* [x] Data opschonen door middel van Functional Programming
* [x] Basisprincipes leren van ES6
* [x] Gebruik maken van d3 om mijn data om te toveren tot visualisatie
 
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
Hier kun je vinden wie mij heeft geholpen en waarmee dat is geweest. In de wiki kun je vinden wanneer dat is gebeurt.

* Opstarten van mijn fetch() en .then-chain (**Thijs**)
    * Ik had mijn eigen async fetch met await geschreven maar vond het lastig om hier te zien of hij iets terug gaf. Dit had ik samen met Thijs opgelost met een IFFE. Dit was alleen niet de nette manier dus heeft hij Wessel, Stefan en mij uitgelegt hoe je dit zou kunnen doen met .then wat veel netter is.

* Meegedacht met een opschoon-functie (**Wessel**)
    * Samen met Wessel heb ik een functie geschreven die we allebei nodig hadden voor het opschonen van onze data. Deze functie zorgde ervoor dat we een object met keys en values om hebben gezet naar een array met deze data erin om te kunnen gebruiken in d3. De manier om deze functie te schrijven kwam doordat ik dit eerst had gevraagt aan **Danny**.


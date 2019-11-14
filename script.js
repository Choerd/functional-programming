import fetchData from './modules/data.js'
import functie from './modules/cleaningData.js'

fetchData()
    .then(rawData => functie.fixReadability(rawData))
    .then(readableData => functie.materialenVoorElkLand(readableData))
    .then(data => functie.top5MaterialenPerLand(data))
    .then(data => functie.landenMet5VerschillendeMaterialen(data))
    .then(data => functie.totaalAantalMaterialenPerLand(data))
    .then(data => functie.testmij(data))
    .then(data => {
        console.log("Gebruikte data in de visualisatie: ", data)

        const allcountries = [...new Set(data.map(visual => visual.land))]
        const width = 600
        const height = 600

        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        const color = d3.scaleOrdinal()
            .domain(allcountries)
            .range(d3.schemeSet1)

        const size = d3.scaleLinear()
            .domain([0, 1500])
            .range([5, 75])

        const mouseover = function (d) {
            console.log("Data van de gehoverde circel: ", d)
        }

        const node = svg.append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", function (d) {
                return size(d.aantal)
            })
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", function (d) {
                return color(d.land)
            })
            .on("mouseover", mouseover)

        const simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2))
            .force("charge", d3.forceManyBody().strength(-10))
            .force("collide", d3.forceCollide().strength(.2).radius(function (d) {
                return (size(d.value) + 3)
            }).iterations(1))

        simulation
            .nodes(data)
            .on("tick", function (d) {
                node
                    .attr("cx", function (d) {
                        return d.x
                    })
                    .attr("cy", function (d) {
                        return d.y
                    })
            })
    })
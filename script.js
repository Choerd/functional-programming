import fetchData from './modules/data.js'
import functie from './modules/cleaningData.js'

fetchData()
    .then(rawData => functie.fixReadability(rawData))
    .then(readableData => functie.materialenVoorElkLand(readableData))
    .then(materialenPerLand => functie.top5MaterialenPerLand(materialenPerLand))
    .then(top5MeesteMaterialenPerLand => functie.landenMet5VerschillendeMaterialen(top5MeesteMaterialenPerLand))
    .then(totaalMaterialenPerLand => functie.totaalAantalMaterialenPerLand(totaalMaterialenPerLand))
    .then(top5MaterialenTop5Landen => functie.arrayToObject(top5MaterialenTop5Landen))
    .then(data => {
        console.log("Gebruikte data in de visualisatie: ", data)

        // Variabelen
        const alleLanden = [...new Set(data.map(naam => naam.land))] // Aanmaken van verschillende categoriën voor bepalen van de kleur
        const dataVisContainer = document.querySelector(".datavis-container")
        const width = dataVisContainer.clientWidth
        const height = dataVisContainer.clientHeight

        const svg = d3.select("#datavis")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

        // Color palette for continents?
        const color = d3.scaleOrdinal()
            .domain(alleLanden) // Alle landen in de array krijgen een eigen kleur
            .range(d3.schemeSet1);

        // Size scale for countries
        const size = d3.scaleLinear()
            .domain([0, 1100])
            .range([10, 75]) // circle will be between 7 and 55 px wide

        // create a tooltip
        const Tooltip = d3.select("#datavis")
            .append("div")
            .attr("class", "tooltip")

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function (d) {
            Tooltip
                .style("opacity", 1)
                .style("position", "absolute")
        }
        const mousemove = function (d) {
            Tooltip
                .html('<span>' + d.land + '</span>' + "<br><b>" + d.aantal + "</b> voorwerpen van <b>" + d.materiaal + "</b>")
                .style("left", (d3.mouse(this)[0] + 20) + "px")
                .style("top", (d3.mouse(this)[1]) + "px")
        }
        const mouseleave = function (d) {
            Tooltip
                .style("opacity", 0)
        }

        // Initialize the circle: all located at the center of the svg area
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
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag() // call specific function when circle is dragged
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))

        // Features of the forces applied to the nodes:
        const simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Het aanmaken van de circels in (dit geval) het midden
            .force("charge", d3.forceManyBody().strength(.1)) // De kracht waarmee de circels tot elkaar worden aangetrokken (> 0 hoe sterker aangetrokken tot elkaar)
            .force("collide", d3.forceCollide().strength(.2).radius(d => (size(d.aantal) + 3)).iterations(1)) //.iterations zorgt ervoor dat dat de circels niet over elkaar heen gaan (> 0) 

        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
        simulation
            .nodes(data)
            .on("tick", function (d) {
                node
                    .attr("cx", function (d) {
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        return d.y;
                    })
            });

        // What happens when a circle is dragged?
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(.03).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            Tooltip
                .style("opacity", 0)
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }
    })
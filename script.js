import fetchData from './modules/data.js'
import functie from './modules/cleaningData.js'

fetchData()
    .then(rawData => functie.fixReadability(rawData))
    .then(readableData => functie.amoutOfEachMaterial(readableData))
    .then(allMaterials => functie.fiveMostOccuringMaterials(allMaterials))
    .then(d3data => {

        var width = 500,
            height = 500,
            margin = 70

        var radius = Math.min(width, height) / 2 - margin

        var svg = d3.select("#visualisatie")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal()
            .domain(d3data)
            .range(["#5C8100", "#8E6C8A", "#BD2D28", "#E6842A", "#137B80"])

        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.value.aantal
            })
        var data_ready = pie(d3.entries(d3data))

        var arc = d3.arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.8)

        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        svg
            .selectAll('allSlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d) {
                return (color(d.data.key))
            })
            .attr("class", "pie")

        svg
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr('class', 'polyline')
            .attr('points', function (d) {
                var posA = arc.centroid(d)
                var posB = outerArc.centroid(d)
                var posC = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                return [posA, posB, posC]
            })

        svg
            .selectAll('allLabels')
            .data(data_ready)
            .enter()
            .append('text')
            .attr('class', 'labels')
            .text(function (d) {
                return d.data.value.materiaal
            })
            .attr('transform', function (d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function (d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                return (midangle < Math.PI ? 'start' : 'end')
            })
    })
    .catch(error => console.log("Not able to fetch or clean data, or not able to build your visualisation" + error))
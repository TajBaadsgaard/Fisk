// Globalt dataarray
let albumData;

// set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 40, left: 20 };
const width = 700;
const height = 500;
//HEY

// Load your music album data from a JSON file
d3.json("albums.json").then(function(data) {
    albumData = data; // Gem data globalt

// append the svg object to the body of the page
const svg = d3.select("#myChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height + 50)
    .append("g")
    .attr("transform", "translate(" + 100 + ",0)");

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 5000])
        .range([0, width]);

    // Add X axis
    svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).ticks(15))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


    // Funktion til at opdatere albumdata og søjler baseret på nøgle og albumnavn
    function updateChart(key) {
        albumData.sort((a, b) => b[key] - a[key]);

        y.domain(albumData.map(d => d.albumName));

        svg.selectAll(".bar")
            .data(albumData, d => d.albumName)
            .transition()
            .duration(5000)
            .attr("y", d => y(d.albumName))
            .attr("width", d => x(d[key]));

        svg.select(".y-axis")
            .transition()
            .duration(5000)
            .call(d3.axisLeft(y));
    }

    // Y akse
    const y = d3.scaleBand()
        .range([0, height])
        .domain(albumData.map(d => d.albumName))
        .padding(0.1);
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Søjler
    svg.selectAll(".bar")
        .data(albumData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => y(d.albumName))
        .attr("width", 0)
        .attr("height", y.bandwidth());
        

    // Lytter til knapperne for sortering
    d3.select("#sortFavorites").on("click", () => {
        updateChart("favorites");
    });

    d3.select("#sortFullPlays").on("click", () => {
        updateChart("fullPlays");
    });
    updateChart("favorites");

                });
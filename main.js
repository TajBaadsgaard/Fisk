// Deklarer en variabel til at gemme albumdata
let albumData;

// Definere marginer og dimensioner for vores svg
const margin = { top: 20, right: 30, bottom: 40, left: 20 };
const width = 700;
const height = 500;

// Indlæs musikalbumdata fra en JSON-fil ved hjælp af D3.js
d3.json("albums.json").then(function(data) {
    // Gem de indlæste data i variablen albumData
    albumData = data;

    // Opret et SVG-element til diagrammet
    const svg = d3.select("#myChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50)
        .append("g")
        .attr("transform", "translate(" + 100 + ",0)");

    // Definér X-skalaen for diagrammet
    const x = d3.scaleLinear()
        .domain([0, 5000])
        .range([0, width]);

    // Tilføj X-aksen til diagrammet
    svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).ticks(15))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Funktion til at opdatere diagrammet baseret på den valgte nøgle
    function updateChart(key) {
        // Sorter albumData baseret på den valgte nøgle i faldende rækkefølge
        albumData.sort(function(a, b) {
            return b[key] - a[key];
        });

        // Opdater Y-skalaens domæne baseret på den sorterede albumData
        y.domain(albumData.map(function(d) {
            return d.albumName;
        }));

        // Opdater søjlerne med overgange
        svg.selectAll(".bar")
            .data(albumData, function(d) {
                return d.albumName;
            })
            .transition()
            .duration(5000)
            .attr("y", function(d) {
                return y(d.albumName);
            })
            .attr("width", function(d) {
                return x(d[key]);
            });

        // Opdater Y-aksen med overgange
        svg.select(".y-axis")
            .transition()
            .duration(5000)
            .call(d3.axisLeft(y));
    }

    // Definér Y-skalaen for diagrammet
    const y = d3.scaleBand()
        .range([0, height])
        .domain(albumData.map(function(d) {
            return d.albumName;
        }))
        .padding(0.1);

    // Tilføj Y-aksen til diagrammet
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Tilføj søjler til diagrammet
    svg.selectAll(".bar")
        .data(albumData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", function(d) {
            return y(d.albumName);
        })
        .attr("width", 0)
        .attr("height", y.bandwidth());

    // Begivenhedslytter for knappen "Sortér Favoritter"
    d3.select("#sortFavorites").on("click", function() {
        updateChart("favorites");
    });

    // Begivenhedslytter for knappen "Sortér Fuld Afspilninger"
    d3.select("#sortFullPlays").on("click", function() {
        updateChart("fullPlays");
    });

    // Initial opdatering af diagrammet med nøglen "favorites"
    updateChart("favorites");
});

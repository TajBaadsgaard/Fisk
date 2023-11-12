// Deklarerer en variabel til at gemme albumdata
let albumData;

// Definerer marginer og dimensioner for vores svg
const margin = { top: 20, right: 30, bottom: 40, left: 20 };
const width = 1000;
const height = 500;

// Indlæser musikalbumdata fra en JSON-fil ved hjælp af D3.js
d3.json("albums.json").then(function(data) {
    // Gemmer de indlæste data i variablen albumData
    albumData = data;

    // Opretter et SVG-element til diagrammet
    const svg = d3.select("#myChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50)
        .append("g")
        .attr("transform", "translate(" + 200 + ",0)")
        .attr("color", "white");

    
    // Definérer X-skalaen for diagrammet
    const x = d3.scaleLinear()
        .domain([0, 3754])
        .range([0, width]);

    // Tilføjer X-aksen til diagrammet
    svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(x).ticks(15))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("class", "x-axis"); //Sådan vi kan style den i CSS

    // En funktion til at opdatere diagrammet baseret på den valgte nøgle
    function updateChart(key) {
        // Sorterer albumData baseret på den valgte nøgle i faldende rækkefølge
        albumData.sort(function(a, b) {
            return b[key] - a[key];
        });

        // Opdaterer Y-skalaens domæne baseret på den sorterede albumData
        y.domain(albumData.map(function(d) {
            return d.albumName;
        }));

        // Opdaterer X-skalaen baseret på den valgte nøgle
        //x.domain([0, d3.max(albumData, function(d) { return d[key]; })]);

        // Opdaterer X-aksen med overgange
        svg.select(".x-axis")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x).ticks(15));


        // Opdaterer søjlerne med overgange
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

        // Opdaterer Y-aksen med overgange
        svg.select(".y-axis")
            .transition()
            .duration(5000)
            .call(d3.axisLeft(y));


    }

    // Definérer Y-skalaen for diagrammet
    const y = d3.scaleBand()
        .range([0, height])
        .domain(albumData.map(function(d) {
            return d.albumName;
        }))
        .padding(0.1);

    // Tilføjer Y-aksen til diagrammet
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Tilføjer søjlerne til diagrammet
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

    // Eventlistener for knappen "Sortér Favoritter"
    d3.select("#sortFavorites").on("click", function() {
        updateChart("favorites");
    });

    // Eventlistener for knappen "Sortér Fuld Afspilninger"
    d3.select("#sortFullPlays").on("click", function() {
        updateChart("fullPlays");
        
    });

    // Opdatering af diagrammet fra første indlæsning
    updateChart("favorites");
});

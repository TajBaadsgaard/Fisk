// Vi definere margin, bredde og højde for grafen
var margin = {top: 20, right: 30, bottom: 40, left: 90};
let width = 700;
let height = 500;

// Vi tilføjer SVG'en til HTML dokumentet.

// append the svg object to the body of the page
var svg = d3.select("#dataVisualisering")
  .append("svg")
    .attr("width", width)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  

// Vi indlæser json data ved hjælp af d3
d3.json("albums.json", function(data) {


  // Vi laver x-axsen
  const x = d3.scaleLinear()
    .domain([0, 2000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-30,0)rotate(-45)")
      .style("text-anchor", "end");


  // Y axis
  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.albumName; }))
    .padding(.2);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(7) ) //Her definere vi hvor bar'en starter på y-aksen
    .attr("y", function(d) { return y(d.albumName); }) //Her vælger vi dataen der kommer ind i y-aksen
    .attr("width", function(d) { return x(d.fullPlays); }) //Her definere vi hvor lang bar'en skal være
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2");

  

    // Nu gør vi vores knapper functionelle
    d3.selectAll("#sortFullPlays, #sortFavorites").on("click", function (e) {

      // Find hvilken knap der blev trykket på
      let id = d3.event.target.id;
      console.log(id);
    
      // Vælg det rigtige datasæt
      let newData = data.fullPlays;
      if (id === "sortFavorites") {
        newData = data.favorites;
      }
    })

})


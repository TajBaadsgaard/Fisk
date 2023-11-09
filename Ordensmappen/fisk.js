    //Hjælpefunktioner som sætter de dynamiske data som skal bruges til at lave scales og akser
    function createScaleX(data) {
      return d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return d[0];
          }),
        ])
        .range([30, w - 30])
        .nice();
    }
  
  
    function createAxisX(yScale) {
      return d3.axisBottom().scale(yScale).ticks(5);
    }
  
  
    function setUp(data) {
      console.log("setUp with dataset: " + data);
      xScale = createScaleX(data);
      xAxis = createAxisX(xScale);
    }










d3.selectAll("#sortFullPlays, sortFavorites").on("click", function (e) {

  // Find hvilken knap der blev trykket på
  let id = e.target.id;
  console.log(id);

  // Vælg det rigtige datasæt
  let newData = dataset1;
  if (id === "data2") {
    newData = dataset2;
  } else if (id === "data3") {
    newData = dataset3;
  }})













const xScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function (d) {
      return d[0];
    }),
  ])
  .range([30, w - 30])
  .nice();

//Skala for y-aksen
const yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function (d) {
      return d[1];
    }),
  ])
  /**
   * Sidste gang gik vi blot ud fra 0,0 i øverste venstre hjørne for y-værdierne også
   * det betød at de blev tegnet oppefra og ned, så vi måtte trække dem fra h
   * for at få dem flyttet ned. Ved at bytte om på rækkefølgen af de to tal i range
   * kan vi få dem til at blive tegnet nedefra og op.
   * Dette skrev vi sidste gang: .range([30, h - 30])
   * Dette skriver vi nu:
   **/
  .range([h - 30, 30])
  .nice();


/*
  // BARCHART----------- Her laver vi grafen
  let maxValue = Math.max(...albumFullplay); //For at sikre at de højeste værdier kan være med i visualiseringn


  var svgWidth = 700, svgHeight = 500, barPadding = 5;
  var barWidth = (svgWidth / albumFullplay.length);


  //Vi definere en SVG
  var svg =  d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);


  //Her skalere vi vores graf (Bruges til data på SVG, og på akserne)
  var xScale = d3.scaleLinear()
      .domain([0,d3.max(albumFullplay)])
      .range([0, svgWidth, 0]);


  var yScale = d3.scaleLinear()
      .domain([0, d3.max(albumFullplay)]) //Vi skalere fra 0 til den højeste værdi i vores datasæt
      .range([svgHeight, 0]); //Det sørger for at det hele bliver inde i SVG'en
*/
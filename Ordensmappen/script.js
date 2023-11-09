        // Globalt dataarray
        let albumData;
        //let albumNameArray = [];
        //let d = [];

        // set the dimensions and margins of the graph
        const margin = { top: 20, right: 30, bottom: 40, left: 20 };
        const width = 700;
        const height = 500;
        const padding = 10;
        const axisPadding = 70;

 
        // loader json-filen data ind
 d3.json("albums.json").then(function(dataset) {
    albumData = dataset;
    //Jeg bruger loopet til at dele data op i flere arrays i stedet for et stort objekt
   /* for (let i = 0; i < dataset.length; i++){
        currentAlbum = dataset[i];

        //Her laver jeg en en array med alle album navne
        let albumName = currentAlbum.albumName;
        let number = currentAlbum.favorites;
        albumNameArray.push(albumName);
        d.push(number);
        console.log(albumName);
        console.log(number);

        
    };*/

    let svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height + 50)
    //.append("g")
    //.attr("transform", "translate(" + 100 + ",0)")
    ;

    // BARCHART----------- Her laver vi grafen
    //let maxValue = Math.max(...albumFullplay); //For at sikre at de højeste værdier kan være med i visualiseringn


    var svgWidth = 700, svgHeight = 500, barPadding = 5;
    var barWidth = (svgWidth / 15);



// x-akse
var xScale = d3.scaleLinear()
        .domain([0,5000])
        .range([0, width]);


    var yScale = d3.scaleLinear()
        .domain([0, 100]) //Vi skalere fra 0 til den højeste værdi i vores datasæt
        .range([height, 0]); //Det sørger for at det hele bliver inde i SVG'en


    //Akser
    var x_axis = d3.axisBottom()
        .scale(xScale);


    var y_axis = d3.axisLeft()
        .scale(yScale);


    svg.append ("g")
        .attr("transform", "translate(50, 10)")
        .call(y_axis);
       
    var xAxisTranslate = height + 10;


    svg.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate +")")
        .call(x_axis);


        var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function(d) {
            return svgHeight- yScale(d)
        })
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
            var translate = [barWidth * i, 0];
            return "translate(" + translate + ")";
        });
        console.log(dataset[0]);
svg
    .selectAll("rect")
    /**
     * Der skal gives en key til hvert datapunkt, så d3 kan genkende dem.
     * Det gør vi ved at give en callback-funktion som returnerer en værdi som er unik for hvert datapunkt.
     * I dette tilfælde er det dato-stemplet, som er unikt for hvert datapunkt.
     * */
    .data(dataset, function (d) {
      return d[3];
    })
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      console.log(d);
      return i * dataset.length;
    })
    .attr("x", function (d, i) {
      return xScale(i) + padding;
    })
    .attr("y", function (d) {
      return yScale(d[1]);
    })
    .attr(
      "width",
      width / dataset.length - 2 * padding - (2 * axisPadding) / dataset.length
    )
    .attr("height", function (d) {
     // console.log("height: " + (yScale(d[1]) - axisPadding));
      //return height - padding - axisPadding - yScale(d[1]);
    })
    .attr("fill", function (d) {
      return "rgb(0, 0, " + (256 - d[1]) + ")";
    });
}

    /*
    albumData = data; // Gem data globalt
    console.log(data.artistName);
    showDataOnScreenFromJSON(data);

    Create an array of objects from the data and pass that to the function in order to display 
    custom info not readily available in the JSON data
  
    let cds = createCDObjects(data);
    console.log(cds);
    showDataOnScreenFromOBJ(cds);
    */
  );
  
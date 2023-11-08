        // Globalt dataarray
        let albumData;
        let albumNameArray = [];

        // set the dimensions and margins of the graph
        const margin = { top: 20, right: 30, bottom: 40, left: 20 };
        const width = 700;
        const height = 500;

 
        // loader json data ind
 d3.json("albums.json").then(function(data) {
    //Jeg bruger loopet til at dele data op i flere arrays i stedet for et stort objekt
    for (let i = 0; i < data.length; i++){
        currentAlbum = data[i];

        //Her laver jeg en en array med alle album navne
        let albumName = currentAlbum.albumName;
        albumNameArray.push(albumName);
        console.log(albumName);
    };
    const svg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height + 50)
    //.append("g")
    //.attr("transform", "translate(" + 100 + ",0)")
    ;

// x-akse
var xScale = d3.scaleLinear()
        .domain([0,5000])
        .range([0, svgWidth, 0]);


    var yScale = d3.scaleLinear()
        .domain([0, 100]) //Vi skalere fra 0 til den højeste værdi i vores datasæt
        .range([svgHeight, 0]); //Det sørger for at det hele bliver inde i SVG'en




    //Akser
    var x_axis = d3.axisBottom()
        .scale(xScale);


    var y_axis = d3.axisLeft()
        .scale(yScale);


    svg.append ("g")
        .attr("transform", "translate(50, 10)")
        .call(y_axis);
       
    var xAxisTranslate = svgHeight - 20;


    svg.append("g")
        .attr("transform", "translate(50, " + xAxisTranslate +")")
        .call(x_axis);


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
  });
  
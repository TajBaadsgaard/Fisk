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
  
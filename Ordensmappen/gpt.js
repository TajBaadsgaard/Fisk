// Global data array
let albumData;

// Define chart dimensions
const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Load data from JSON
d3.json("albums.json")
  .then(function (data) {
    albumData = data;

    let svg = d3.select("#bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define scales and axes
    const xScale = d3.scaleBand()
      .domain(albumData.map(function(d) {
        return d.albumName;
      }))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(albumData), function(d) {
        return d.favorites;
      }])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to the SVG
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    // Create and style the bars
    svg.selectAll("rect")
      .data(albumData)
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return xScale(d.albumName);
      })
      .attr("y", function(d) {
        return yScale(d.favorites);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return height - yScale(d.favorites);
      })
      .attr("fill", "steelblue");
  })
  .catch(function (error) {
    console.error("Error loading data:", error);
  });

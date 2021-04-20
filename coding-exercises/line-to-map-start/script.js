let w = 1200;
let h = 800;
let padding = 90;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("mainland.geojson").then(function(geoData){
  d3.csv("china-pop-2018.csv").then(function(incomingData) {
    //map function, Number function
    incomingData = incomingData.map(function(d,i){
      d.population = Number(d.population);
      return d;
    });

    //take min, max
    let minPop = d3.min(incomingData,function(d,i){
      return d.population
    });
    let maxPop = d3.max(incomingData,function(d,i){
      return d.population
    });

    let colorscale = d3.scaleLinear().domain([minPop, maxPop]).range(["black","red"]);
    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);


    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;
    let projection = d3.geoEqualEarth()
      .translate([w/2,h/2])
      // .center([120,50])
      .fitExtent([[padding,padding], [w-padding,h-padding]], geoData) //fitExtent([arg1], arg2)
    ;


    let pathMaker = d3.geoPath(projection);


    // CREATE SHAPES ON THE PAGE!
    // viz.selectAll(".line").data([incomingData]).enter()
    //   .append("path")
    //     .attr("class", "line")
    //     .attr("d", lineMaker)
    //     .attr("fill", "none")
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 8)
    // ;
    viz.selectAll(".province").data(geoData.features).enter()
      .append("path")
        .attr("class", "province")
        .attr("d", pathMaker)
        .attr("fill", function(d,i){

          //check if province name is in geojson
          let correspondingdatapoint = incomingData.find(function(datapoint){
            console.log(datapoint)
            if (datapoint.province == d.properties.name){
              return true
            }else{
              return false
            }
          })
          if (correspondingdatapoint != undefined) {
            return colorscale(correspondingdatapoint.population);
          }else{
            return "grey"
          }
        })
        .attr("stroke", "green")
        // .attr("stroke-width", 1)
        ;

  });
});

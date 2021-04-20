let w = 4800;
let h = 3200;
let padding = 30;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "darkgrey")
;


// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
  let projection = d3.geoEqualEarth()
    .translate([w/2,h/2])
    .center([120,50])
    .fitExtent([[padding,padding], [w-padding,h-padding]], geoData) //fitExtent([arg1], arg2)
  ;
  d3.csv("ufo.csv").then(function(incomingData) {
    let pathMaker = d3.geoPath(projection);
    viz.selectAll(".country").data(geoData.features).enter()
      .append("path")
        .attr("class", "country")
        .attr("d", pathMaker)
        .attr('stroke','grey')
        .attr('stroke-width',0.2)
        .attr('fill','lavendar')
      ;

  //     let parseDate = d3.timeParse("%d/%m/%Y %H:%M");
  //     incomingData.forEach(function(d){
  //       // console.log(d.datetime.slice(-10,-6))
  //       // d.datetime = parseDate(d.datatime)
  //
  // });


    let minPop = d3.min(incomingData,function(d,i){
      if (d.datetime.slice(-10,-6) != null) {
      return d.datetime.slice(-10,-6)
      }
    });
    let maxPop = d3.max(incomingData,function(d,i){
      if (d.datetime.slice(-10,-6) != null) {
      return d.datetime.slice(-10,-6)
      }
    });

    let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(["red","white"]);
    console.log(maxPop);
    console.log(minPop);


    let mindu = d3.min(incomingData,function(d,i){
      return d.duration
    });
    let maxdu = d3.max(incomingData,function(d,i){
      return d.duration
    });
    let sizeScale = d3.scaleSqrt().domain([mindu, maxdu]).range([0.01,0.05]);
    console.log(maxdu);
    console.log(mindu);

        viz.selectAll("circle")
                .data(incomingData)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                  // return d.longitude;
                  return projection([d.longitude, d.latitude])[0];
                })
                .attr("cy", function(d) {
                  // return d.latitude;
                  return projection([d.longitude, d.latitude])[1];
                })
                .attr('fill', function(d){
                  return colorScale(d.datetime.slice(-10,-6));
                  // console.log(colorScale(d.datetime))
                })
                .attr('r',function(d){
                  return sizeScale(d.duration);
                  // console.log(colorScale(d.datetime))
                })
                .attr('opacity',0.8)
              ;


    ///take min, max

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


    // let pathMaker = d3.geoPath(projection);


    // CREATE SHAPES ON THE PAGE!
    // viz.selectAll(".line").data([incomingData]).enter()
    //   .append("path")
    //     .attr("class", "line")
    //     .attr("d", lineMaker)
    //     .attr("fill", "none")
    //     .attr("stroke", "black")
    //     .attr("stroke-width", 8)
    // ;
    // viz.selectAll(".country").data(geoData.features).enter()
    //   .append("path")
    //     .attr("class", "country")
    //     .attr("d", pathMaker)
    //   ;

  });
});

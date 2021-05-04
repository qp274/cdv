let w = 1400;
let h = 1300;
let padding = 25;
let mid1 = padding+(((h/3)-(padding*2))/2);
let bot1 = (h/3)-padding;
let mid2 = (h/3)+padding+(((h/3)-(padding*2))/2)
let bot2 = ((h/3)*2)-padding;
let mid3 = h-padding-(((h/3)-(padding*2))/2)
let bot3 = h-padding;


let viz = d3.select("#visualization")
    .append("svg")
  // .style("background-color", "lavender")
  .attr("width", w)
  .attr("height", h)
;



// initialise scales
let xScaleYear = d3.scaleTime().range([padding, w-padding]);
let xScaleCountry = d3.scaleBand().range([padding, w-padding]);
let xScaleGenre = d3.scaleBand().range([padding, w-padding]);
//
// let yScale = d3.scaleBand().range([h-padding, padding]);
// let yScaleGender = d3.scaleBand().range([h-padding, padding]);
// let yScaleCountry = d3.scaleBand().range([h-padding, padding]);


d3.tsv("data.tsv").then(function(incomingData){
  let data = formatData(incomingData);
  // console.log(data);

  let countries = [];
  // array methods are useful!
  // comment lines in/out and study the console log to understand what they do
  let reducedData = d3.nest().key(d=>d.country).entries(data) // restructure data to nest by country (method by d3)
                            .sort((a,b)=>b.values.length-a.values.length) // sort by the size of each nest
                            .slice(0,5) // only take the first 5
                            .reduce((acc, d)=>{ // create array with only the elements in "values" (that is the original data points)
                              countries.push(d.key);
                              acc = acc.concat(d.values);
                              return acc
                            }, [])
  ;
  console.log(reducedData);
  console.log(countries);
  let genres = d3.nest().key(d=>d.genre).entries(reducedData).map(d=>d.key);
  console.log(genres);

  let yearExtent = d3.extent(reducedData, d=>d.parsedDate);
  console.log(yearExtent);
  xScaleYear.domain(yearExtent);
  let yearButton = viz.append("rect")
      .attr("class", "yearButton button")
      .attr("x", 0).attr("y", 0).attr("width", w).attr("height", h/3).style("cursor", "pointer")
  ;
  let xAxisGroupYear = viz.append("g").attr("class", "xaxis yearaxis");
  let xAxisYear = d3.axisBottom(xScaleYear);
  xAxisGroupYear.attr("transform", "translate(0,"+(bot1)+")");


  xScaleCountry.domain(countries);
  let countryButton = viz.append("rect")
      .attr("class", "countryButton button")
      .attr("x", 0).attr("y", h/3).attr("width", w).attr("height", h/3).style("cursor", "pointer")
  ;
  let xAxisGroupCountry = viz.append("g").attr("class", "xaxis countryaxis");
  let xAxisCountry = d3.axisBottom(xScaleCountry);
  xAxisGroupCountry.attr("transform", "translate(0,"+(bot2)+")");

  xScaleGenre.domain(genres);
  let genreButton = viz.append("rect")
      .attr("class", "genreButton button")
      .attr("x", 0).attr("y", (h/3)*2).attr("width", w).attr("height", h/3).style("cursor", "pointer")
  ;
  let xAxisGroupGenre = viz.append("g").attr("class", "xaxis genreaxis");
  let xAxisGenre = d3.axisBottom(xScaleGenre);
  xAxisGroupGenre.attr("transform", "translate(0,"+(bot3)+")");

  let graphgroup = viz.append("g").attr("class", "graphgroup")
  let tooltip = viz.append("g").attr("class", "tooltip").attr("transform", "translate(-300,-200)").attr("opacity", 0);

  tooltip.append("rect").attr("x", 0).attr("y", 0).attr("width", 300).attr("height", 80).attr("fill", "black");
  let title = tooltip.append("text").text("title").attr("x", 5).attr("y",20);
  let author = tooltip.append("text").text("author").attr("x", 5).attr("y",40);
  let year = tooltip.append("text").text("year").attr("x", 5).attr("y",60);


  // adapted from https://blocks.lsecities.net/hydrosquall/983d19b42a62fd1651c2942fe6cfcfbe
  // Map the basic node data to d3-friendly format.
  let radius = 2;
  reducedData = reducedData.map(function(node, index) {
    node.color = 'black';
    node.radius = radius;
    node.x = xScaleYear(node.parsedDate);
    node.y = mid1;
    return node
  });


  let force = d3.forceSimulation(reducedData)
    .force('forceX', d3.forceX( d => xScaleYear(d.parsedDate)) )
    .force('forceY', d3.forceY( d => mid1) )
    .force('collide', d3.forceCollide(d => radius*1.5))
    .tick(400) // explain stop
    .on("end", function(){
      reducedData.forEach(node=>{
        node.yearx = node.x;
        node.yeary = node.y;
        node.x = xScaleCountry(node.country) + xScaleCountry.bandwidth()/2;
        node.y = mid2;
      });

      initYearGraph();
      yearButton.on("click", function(){
        showYearGraph();
      })
      xAxisGroupYear.call(xAxisYear);

      calcCountryPos()
    })
  ;

  function calcCountryPos(){

    force = d3.forceSimulation(reducedData)
      .force('forceX', d3.forceX( d => xScaleCountry(d.country) + xScaleCountry.bandwidth()/2 ) )
      .force('forceY', d3.forceY( d => mid2) )
      .force('collide', d3.forceCollide(d => radius*1.5))
      .tick(400) // explain stop
      .on("end", function(){
        reducedData.forEach(node=>{
          node.countryx = node.x;
          node.countryy = node.y;
          node.x = xScaleGenre(node.genre) + xScaleGenre.bandwidth()/2;
          node.y = mid3;
        });

        countryButton.on("click", function(){
          showCountryGraph();
        });
        xAxisGroupCountry.call(xAxisCountry);

        calcGenrePos();

      })
    ;
  }
  function calcGenrePos(){
    force = d3.forceSimulation(reducedData)
      .force('forceX', d3.forceX( d => xScaleGenre(d.genre) + xScaleGenre.bandwidth()/2 ) )
      .force('forceY', d3.forceY( d => mid3 ))
      .force('collide', d3.forceCollide(d => radius*2))
      .tick(400) // explain stop
      .on("end", function(){
        console.log(reducedData);
        reducedData.forEach(node=>{
          node.genrex = node.x;
          node.genrey = node.y;
        });

        genreButton.on("click", function(){
          showGenreGraph();
        });
        xAxisGroupGenre.call(xAxisGenre);
      })
    ;
  }


  function initYearGraph(){
    let theSituation = graphgroup.selectAll(".datagroup").data(reducedData, d=>d.isbn);
    let enterSelection = theSituation.enter().append("g")
        .attr("class", "datagroup")
        .attr("transform", function(d){
          d.currentx = d.yearx;
          d.currenty = d.yeary;
          return "translate("+d.yearx+","+d.yeary+")"
        })
        // .on("click", function(d){
        //
        //   if(d.color=="red"){
        //     d.color = "black";
        //   }else{
        //     d.color = "red";
        //   }
        //   if(d.radius == radius*2){
        //     d.radius = radius;
        //   }else{
        //     d.radius = radius*2;
        //   }
        //   // d3.select(this).select("circle").transition().attr("r", radius*2);
        //   updateColorRadius();
        // })
        // .on("mouseover", function(d){
        //   console.log(d);
        //   title.text(d.title);
        //   author.text(d["auth-first"]+ " " + d["auth-last"]);
        //   year.text( d3.timeFormat("%B, %Y")(d.parsedDate));
        //   tooltip.transition().duration(10).attr("transform", function(){
        //       return "translate("+(d.currentx-150)+","+(d.currenty-100)+")"
        //     });
        //   tooltip.selectAll("text").attr("fill", function(){
        //     if(d.color == "red"){
        //       return "red"
        //     }else{
        //       return "white";
        //     }
        //   })
          // tooltip.transition().delay(20).attr("opacity", 1);

        //   d3.select(this).select(".point").transition().attr("r", radius*2);
        // })
        // .on("mouseout", function(d){
        //   d3.select(this).select(".point").transition().attr("r", d.radius);
        //
        //   tooltip.transition().delay(50).duration(100).attr("opacity", 0);
        //   tooltip.transition().delay(170)
        //     .attr("transform", "tranlate(-300, -200)")
        //   ;
        //
        // })
      // ;
    // this is only for a better hover experience,
    // big circles behind the real ones
  //   enterSelection.append("circle")
  //     .attr("r", d=>d.radius*2)
  //     .attr("fill", "white")
  //     .attr("opacity", 0)
  //   ;
  //   // the real ciurcles need a class so we can modify them
    enterSelection.append("circle")
      .attr("class", "point")
      .attr("r", d=>d.radius)
      .attr("fill", d=>d.color)
    ;
  }
  // function updateColorRadius(){
  //   graphgroup.selectAll(".datagroup").select(".point")
  //       .attr("fill", d=>d.color)
  //       .attr("r", d=>d.radius)
  //   ;
  }
  function showYearGraph() {
    graphgroup.selectAll(".datagroup")
      .transition()
      .duration(500)
      .attr("transform", function(d){
        d.currentx = d.yearx;
        d.currenty = d.yeary;
        return "translate("+d.yearx+","+d.yeary+")"
      })
    ;
  }
  function showCountryGraph() {
    graphgroup.selectAll(".datagroup")
      .transition()
      .duration(500)
      .attr("transform", function(d){
        d.currentx = d.countryx;
        d.currenty = d.countryy;
        return "translate("+d.countryx+","+d.countryy+")"
      })
    ;
  }
  function showGenreGraph() {
    graphgroup.selectAll(".datagroup")
      .transition()
      .duration(500)
      .attr("transform", function(d){
        d.currentx = d.genrex;
        d.currenty = d.genrey;
        return "translate("+d.genrex+","+d.genrey+")"
      })
    ;
  }





})

var parseTime = d3.timeParse("%b,%Y");
function formatData(indata){
  return indata.map((d)=>{
      d.parsedDate = parseTime(d["pubdate mo"] + "," + d["pubdate yr"]);
      return d
  }).filter(d=>d.parsedDate!=null&&!isNaN(d.isbn))
  .reduce((acc,d)=>{
    // each isbn number just once
    if(acc.findIndex(a=>a.isbn==d.isbn)==-1 && d.genre != ""){
      acc.push(d);
    }
    return acc
  }, [])
}

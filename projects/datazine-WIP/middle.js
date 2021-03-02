let w = 1200;
let w2 = 2400;
let h = 800;

let boxw = 216;
let boxh = 300;

// let innerboxw = 230;
// let innerboxh = boxh;
let marginLeftRight = 160;
let marginTopBottom = 40;
let numCol = 6;
let numRow = 2;

let viz = d3.select('#container').append("svg")
    .attr('width', w2)
    .attr('height', h)
;

function gotData(incomingData) {

  numtagcount(incomingData)

  let nestMaker = d3.nest().key(function(d){ return d.day });
  let nestedData = nestMaker.entries(incomingData)
  console.log('nested data',nestedData)

  let boxes = viz.selectAll(".box").data(nestedData).enter()
    .append("g")
      .attr("class", "box")
      .attr("transform", function(d,i){
        let xSpacePerBox = ((w2-2*marginLeftRight) / numCol)
        let xSpacePadding = (xSpacePerBox-boxw)/2;
        let x = marginLeftRight + xSpacePadding +  xSpacePerBox * (i%numCol);

        let ySpacePerBox = ((h-2*marginTopBottom) / numRow)
        let ySpacePadding = (ySpacePerBox - boxh)/2;
        let y = marginTopBottom + ySpacePadding +  ySpacePerBox * Math.floor(i/numCol);



        return "translate("+x+","+y+")"
      })
  ;

  boxes.append("rect")   //d: {key:day i, values: ...}
      .attr("x", function(d, i){
        console.log(d)
        return 0
      })
      .attr("y", 0)
      .attr("width", boxw)
      .attr("height", boxh)
      .attr("opacity", 0)
  ;
  // grey circles
  let backgroundcolumn = 6;
  let backgroundrow = 7;
  boxes.append("g").attr("class", "backgroundCircles").selectAll(".greyCricles").data(d3.range(backgroundcolumn*backgroundrow)).enter()
    .append("circle")
      .attr("r", 16)
      .attr("fill", "grey")
      .attr('opacity', 0.2)
      .attr("cx", function(d, i){
        let xspacePerCircle = boxw/backgroundcolumn
        let x = i%backgroundcolumn * xspacePerCircle + xspacePerCircle/2
        return x
      })
      .attr("cy",  function(d, i){
        let yspacePerCircle = boxh/backgroundrow
        let y = Math.floor(i/backgroundcolumn) * yspacePerCircle + yspacePerCircle/2
        return y
      })

                                                            //d: {key:day i, values: ...}
  let dataPointGroups = boxes.selectAll(".datagroup").data(function(d,i){
    return d.values
    console.log('d.values',d.values)
  }).enter()
    .append("g")
        .attr("class", "datagroup")
  ;



                                                                //d:each event in dayidata
  let multiplerings = dataPointGroups.selectAll('.multiplecircles').data(function(d,i){
    return d3.range(d.noticable)
  }).enter()
    .append('circle')
    .attr('class','miniCircle')
    .attr('r',function(d,i){
            return 24+9*i
          })
    .attr('fill','red')
    .attr('opacity',0.2)

  // let lines = dataPointGroups.selectAll('.tag').data(function(d,i){
  //   return d3.range(1)
  // }).enter()
  //   .append('g')
  //     .attr('class','tag')
  // ;
  //                             5                    10                      15                   20                    25                    30                       35                  40                    45
   arrayx2 = [-120, 30, -40, 70, 60, -40, 130,-50, 50, 30, 80, -50, -90, 100, -65, 40, 50, 40, 20, 110,60, 100, -50, -90, 50, 10, -50, -60, 60,-50, -50, -100,-70, 50, -80, 30, 50, 50, 50, 10, 60, 50, 70, 60, -50, 20,10]
   arrayy2 = [-20, -90, -60, 80, 0, 30, 14,-40, 50, -60, 50, -50, -20, -40, -30, 55, 50, -70, -90, -90,10, -50, -50, -20, 50, 70, -70, -40, 70,50, -50, -10,-20, 50,   -70, -90, 50,50, -50, 70, 10, 50, -150, 10, -50, 70,-80]
   dataPointGroups.append('line')
      .attr('stroke','black')
      .attr('x1',0)
      .attr('y1',0)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr('x2',function(d,i){
        n = d.number-1
        return arrayx2[n]
      })
      .attr('y2',function(d,i){
        n = d.number-1
        return arrayy2[n]
      })
      // .attr('x2',function(d,i){
      //   let x = randomx2()
      //   arrayx2.push(x)
      //   return x
      // })
      // .attr('y2',function(d,i){
      //   let y = randomy2()
      //   arrayy2.push(y)
      //   return y
      // })
      .attr('stroke-width',1)

  console.log("x2:",arrayx2)
  console.log("y2:",arrayy2)

     dataPointGroups.append('text')
        .text(function(d,i){
          return d.number
        })
        .attr('stroke','black')
        .attr('text-anchor', 'start')
        .attr('x',function(d,i){
          n = d.number-1
          return arrayx2[n]
        })
        .attr('y',function(d,i){
          n = d.number-1
          return arrayy2[n]
        })

//center dot
  let datapointcircle = dataPointGroups
      .append('circle')
          .attr('r', 10)
          .attr('fill',typecolor)
          .attr('opacity',1)
  ;

dataPointGroups.attr('transform',function(d,i){
  let xspacePerCircle = boxw/backgroundcolumn
  let yspacePerCircle = boxh/backgroundrow
  x = (d.xaxis)*xspacePerCircle + xspacePerCircle/2
  y = boxh-(d.yaxis)*yspacePerCircle - yspacePerCircle/2;
  return "translate("+x+","+y+")"
})
}

d3.json("data.json").then(gotData);

function numtagcount(incomingData) {
  return d3.range(incomingData.length)
  console.log(incomingData.length)
}

function randomx2() {
  x2 = randomIntFromInterval(-0.5, 0.5)*100+50
  return x2
}

function randomy2(){
  y2 = randomIntFromInterval(-0.5, 0.5)*100+50
  return y2
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function typecolor(d,i) {
  if (d.resist == 'convention') {
    return 'yellow';
  }
  if (d.resist == 'authority') {
    return 'lightgreen';
  }
  if (d.resist == 'control') {
    return 'blue';
  }
}


let keycircle=viz.selectAll('.keycircle').data(d3.range(1)).enter()
  .append('g')
  .attr('class', 'keycircle')
;

let minikeycircle=keycircle.selectAll('.minikeycircle').data(d3.range(4)).enter()
.append('circle')
  .attr('r',function(d,i){
          return 24+12*i
        })
  .attr('class', 'minikeycircle')
  .attr('opacity',0.2)
  .attr("fill", "grey")
  // .attr('cx',1370)
  // .attr('cy',600)
;
keycircle.append('circle')
    .attr('r', 10)
    .attr('fill','lightgreen')
;
keycircle.append('text')
    .text('one OBSERVED small act of rebellion')
    .attr('stroke','black')
    .attr('font-size', '25px')
    .attr('x', 90)
;
keycircle.append('line')
   .attr('stroke','black')
   .attr('x1',0)
   .attr('y1',0)
   .attr('x2',120)
   .attr('y2',40)
;
keycircle.append('text')
    .text('#')
    .attr('font-size',25)
    .attr('x',121)
    .attr('y',41)
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .attr('dy', '.35em')

keycircle.attr('transform', 'translate(1370,630)')
;

let keygrey=viz.selectAll('.keygrey').data(d3.range(1)).enter()
  .append('g')
  .attr('class', 'keygrey')
;
keygrey.append('circle')
      .attr('r',20)
      .attr("fill", "grey")
      .attr('opacity', 0.2)
      .attr('transform', 'translate(1370,520)')
;
keygrey.append('text')
    .text('one EXISTING random act of rebellion')
    .attr('stroke','black')
    .attr('font-size', '25px')
    .attr('transform', 'translate(1420,520)')
;

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
let xSpacePerBox = ((w2-2*marginLeftRight) / numCol)
let xSpacePadding = (xSpacePerBox-boxw)/2;
let ySpacePerBox = ((h-2*marginTopBottom) / numRow)
let ySpacePadding = (ySpacePerBox - boxh)/2;

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
        let xspacePerCircle = boxw/backgroundcolumn //backgroundcolumn =6
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
    .attr('fill', '#F0605B')
    .attr('opacity',0.3)

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


let datapointcircle2 = dataPointGroups
    .append('circle')
        .attr('r', 16)
        .attr('fill',attributecolor)
        .attr('opacity',1)
;
//center dot
let cross = d3.symbol().type(d3.symbolCross).size(260)
dataPointGroups.append('path')
 .attr('fill', typecolor)
 .attr("d", cross)
 .attr('transform','rotate(45)')
;
  // let datapointcircle = dataPointGroups
  //     .append('circle')
  //         .attr('r', 8)
  //         .attr('fill',typecolor)
  //         .attr('opacity',1)
  // ;



dataPointGroups.attr('transform',function(d,i){
  let xspacePerCircle = boxw/backgroundcolumn
  let yspacePerCircle = boxh/backgroundrow
  let x = (d.xaxis)*xspacePerCircle + xspacePerCircle/2
  let y = boxh-(d.yaxis)*yspacePerCircle - yspacePerCircle/2;
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
    return '#18a81a';
  }
  if (d.resist == 'authority') {
    return '#F4442E';
  }
  if (d.resist == 'control') {
    return '#001eff';
  }
}

function attributecolor(d,i) {
  if (d.attribute == 'alternative use of everyday object') {
    return '#F8F272';
  }
  if (d.attribute == 'chairs where they are not supposed to be') {
    return '#FA8279';
  }
  if (d.attribute == 'juxtaposition') {
    return '#beee62ff';
  }
  if (d.attribute == 'invading public space') {
    return '#bdadeaff';
  }
  if (d.attribute == 'dubious consent') {
    return 'lightblue';
  }
  if (d.attribute == 'accidentally political') {
    return '#FFCF9C';
  }
  console.log(d.attribute)
}

//key circle group
let keycircle=viz.selectAll('.keycircle').data(d3.range(1)).enter()
  .append('g')
  .attr('class', 'keycircle')
;

//multiple rings in key circle group
let minikeycircle=keycircle.selectAll('.minikeycircle').data(d3.range(4)).enter()
.append('circle')
  .attr('r',function(d,i){
          return 24+12*i
        })
  .attr('class', 'minikeycircle')
  .attr('opacity',0.2)
  .attr("fill", "grey")
  .attr('transform', 'translate(1850,630)')
  // .attr('cx',1370)
  // .attr('cy',600)
;
keycircle.append('circle')
    .attr('r', 18)
    .attr('fill','#F8F272')
    .attr('transform', 'translate(1850,630)')
;
keycircle.append('line')
   .attr('stroke','red')
   .attr('x1',0)
   .attr('y1',0)
   .attr('x2',-250)
   .attr('y2',-60)
   .attr('transform', 'translate(1850,630)')
;
// attribute circle tag
// keycircle.append('text')
//    .text('attribute')
//    .attr('stroke','red')
//    .attr('x',-2500)
//    .attr('y',-90)
//    .attr("text-anchor", "middle")
//    .attr("dy", ".35em")
//    .attr('dy', '.35em')
//    .attr('transform', 'translate(1850,630)')
// ;

let cross2 = d3.symbol().type(d3.symbolCross).size(600)
keycircle.append('path')
 .attr('fill', '#001eff')
 .attr("d", cross2)
 .attr('transform', 'translate(1600,570) rotate(45)')
;

// keycircle.append('circle')
//     .attr('r', 8)
//     .attr('fill','lightgreen')
//     .attr('transform', 'translate(1850,630)')
let cross1 = d3.symbol().type(d3.symbolCross).size(300)
keycircle.append('path')
 .attr('fill', '#001eff')
 .attr("d", cross1)
 .attr('transform', 'translate(1850,630) rotate(45)')
;

keycircle.append('text')
    .text('one OBSERVED small act of rebellion')
    .attr('stroke','black')
    .attr('font-size', '25px')
    .attr('x', 0)
    .attr('y', -30)
    .attr('transform', 'translate(1850,630)')
;
keycircle.append('line')
   .attr('stroke','black')
   .attr('x1', 50)
   .attr('y1',10)
   .attr('x2',120)
   .attr('y2',40)
   .attr('transform', 'translate(1850,630)')
;
keycircle.append('text')
    .text('# of rings: how noticable each act is')
    .attr('font-size',25)
    .attr('x',121)
    .attr('y',41)
    .attr("text-anchor", "start")
    .attr("dy", ".35em")
    .attr('dy', '.35em')
    .attr('transform', 'translate(1850,630)')

// keycircle.attr('transform', 'translate(1370,630)')
// ;

let y = marginTopBottom + ySpacePadding +  ySpacePerBox * Math.floor(8/numCol)
let x = marginLeftRight + xSpacePadding +  xSpacePerBox * (4%numCol)+150;
let z = xSpacePadding
console.log('z',z)
// function keytranslate() {
//   m=1370+z
//   n=630
//   return  "translate("+m+","+n+")"
// }
//x scale
keycircle.append('line')
    .attr('stroke','grey')
    .attr('stroke-width', '3px')
    .attr('x1',x)
    .attr('y1',y)
    .attr('x2',x)
    .attr('y2',y+boxh)
;
keycircle.append('text')
    .text('0 how serious is the act 5')
    .attr('font-size','20px')
    .attr("text-anchor", "start")
    .attr('transform', 'translate(1760,770)')

keycircle.append('line')
    .attr('stroke','grey')
    .attr('stroke-dasharray','3 3')
    .attr('stroke-width', '2px')
    .attr('x1',x)
    .attr('y1',630)
    .attr('x2',1850)
    .attr('y2',630)
;
// y-scale
keycircle.append('line')
    .attr('stroke','grey')
    .attr('stroke-width', '3px')
    .attr('x1',x)
    .attr('y1',y+boxh)
    .attr('x2',x+boxw)
    .attr('y2',y+boxh)
;
keycircle.append('text')
    .text('0   how serious is the rule  6')
    .attr('font-size','25px')
    .attr("text-anchor", "start")
    .attr('transform', 'translate(1730,730) rotate(-90)')

keycircle.append('line')
    .attr('stroke','grey')
    .attr('stroke-dasharray','3 3')
    .attr('stroke-width', '2px')
    .attr('x1',1850)
    .attr('y1',630)
    .attr('x2',1850)
    .attr('y2',y+boxh)
;


// one single
let keygrey=viz.selectAll('.keygrey').data(d3.range(1)).enter()
  .append('g')
  .attr('class', 'keygrey')
;
keygrey.append('circle')
      .attr('r',20)
      .attr("fill", "grey")
      .attr('opacity', 0.2)
      .attr('transform', 'translate(1850,520)')
;
keygrey.append('text')
    .text('one EXISTING random act of rebellion')
    .attr('stroke','black')
    .attr('font-size', '25px')
    .attr('transform', 'translate(1850,520)')
;


//------------------color key 1 circle x3-----------------------------

let keydata1=[{'type': 'resist authority','color':'#F4442E','ring':0},{'type': 'resist control','color':'#001eff','ring':3}, {'type': 'resist convention','color':'#18a81a','ring':2}];
let x1 = marginLeftRight + xSpacePadding +  xSpacePerBox * (3%numCol);
let colorkey1=viz.selectAll('.colorkey1').data(keydata1).enter()
  .append('g')
  .attr('class', 'colorkey1')
;
colorkey1.append('circle')
 .attr('r', 20)
 .attr('fill','grey')
 .attr('opacity',0.2)
;
 // colorkey1.append('circle')
 //  .attr('r', 8)
 //  .attr('fill',function(d,i){
 //    return d.color
 //  })
 //  .attr('opacity',1)
 // ;
 let cross = d3.symbol().type(d3.symbolCross).size(300)
 colorkey1.append('path')
  .attr('fill',function(d,i){
    return d.color
  })
  .attr("d", cross)
  .attr('transform','rotate(45)')
 ;
 colorkey1.append('text')
  .text(function(d,i){
    return d.type
  })
  .attr('stroke','black')
  .attr('font-size', '25px')
  .attr('x',60)

colorkey1.selectAll('.ck1r').data(function(d,i){
  return d3.range(d.ring)
}).enter()
  .append('circle')
  .attr('class', 'ck1r')
  .attr('r', function(d,i){
    return 20+12*i
  })
  .attr('fill','grey')
  .attr('opacity', 0.2)
;
colorkey1.attr('transform', colorkey1transform)

function colorkey1transform(d,i) {
  m = x1+50
  n = y+i*90+70
  return "translate("+m+","+n+")"
}

//color key group 2----------------------------------------

let keydata2=[{'attribute': 'alternative use of everyday object','color':'#F8F272'},{'attribute': "chairs where they shouldn't be",'color': '#FA8279'}, {'attribute': 'juxtaposition','color':'#beee62ff'},{'attribute': 'invading public space','color':'#bdadeaff'},{'attribute': 'dubious consent','color':'lightblue'},{'attribute': 'accidentally political','color':'#FFCF9C'}];
let colorkey2=viz.selectAll('.colorkey2').data(keydata2).enter()
  .append('g')
  .attr('class', 'colorkey2')
;
colorkey2.append('circle')
 .attr('r', 16)
 .attr('fill',function(d,i){
   return d.color
 })

 .attr('opacity',1)
;
 // colorkey2.append('circle')
 //  .attr('r', 8)
 //  .attr('fill','grey')
 //  .attr('opacity',1)
 // ;

 colorkey2.append('path')
  .attr('fill', 'grey')
  .attr("d", cross)
  .attr('transform','rotate(45)')
 ;

 colorkey2.append('text')
   .text(function(d,i){
     return d.attribute
   })
   .attr('stroke','grey')
   .attr('font-size', '25px')
   .attr('x',34)
;

let x2 = marginLeftRight + xSpacePadding +  xSpacePerBox * (0%numCol);
colorkey2.attr('transform', colorkey2transform)
function colorkey2transform(d,i) {
  // m = x1+16+ 80*(i%2)
  // n = y+ Math.floor(i/2)*40+ 32 + 160
  m = x2-160+ 420*i -8*(i%6)
  n = ySpacePadding
  return "translate("+m+","+n+")"
}

// function attributecolor(d,i) {
//   if (d.attribute == 'alternative use of everyday object') {
//     return 'pink';
//   }
//   if (d.attribute == 'chairs where they are not supposed to be') {
//     return 'lightgreen';
//   }
//   if (d.attribute == 'juxtaposition') {
//     return 'purple';
//   }
//   if (d.attribute == 'invading public space') {
//     return 'lightblue';
//   }
//   if (d.attribute == 'dubious consent') {
//     return 'orange';
//   }
//   if (d.attribute == 'accidentally political') {
//     return 'red';
//   }
//   console.log(d.attribute)
// }

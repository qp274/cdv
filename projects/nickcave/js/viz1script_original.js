let w = 900;
let h = 600;

let boxw = 80;
let boxh = 70;
let marginLeftRight = 200;
let marginTopBottom = 100;
let numCol = 3;
let numRow = 3;
let xSpacePerBox = ((w-2*marginLeftRight) / numCol)
let xSpacePadding = (xSpacePerBox-boxw)/2;
let ySpacePerBox = ((h-2*marginTopBottom) / numRow)
let ySpacePadding = (ySpacePerBox - boxh)/2;


let boxw2 = 80;
let boxh2 = 70;
let marginLeftRight2 = 200;
let marginTopBottom2 = 50;
let numCol2 = 4;
let numRow2 = 3;
let xSpacePerBox2 = ((w-2*marginLeftRight2) / numCol2)
let xSpacePadding2 = (xSpacePerBox2-boxw2)/2;
let ySpacePerBox2 = ((h-2*marginTopBottom2) / numRow2)
let ySpacePadding2 = (ySpacePerBox2 - boxh2)/2;

let dotcolumn = 4;
console.log('viz1script loaded');
let viz = d3.select('.viz1').append("svg")
    .attr('width', w)
    .attr('height', h)
    // .attr('x',0)
    // .attr('y',0)
    .attr('id','svg1')
;
function random(min,max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

function gotData(incomingData) {
  let nestMaker = d3.nest().key(function(d){ return d.song });
  let nestedData = nestMaker.entries(incomingData)
  console.log('nested data',nestedData)

  // let nestMaker2 = d3.nest().key(function(d){ return d.death });
  // let nestedData2 = nestMaker2.entries(incomingData)
  // console.log('nested data2',nestedData2)

  let songgrouping = viz.selectAll('.song').data(nestedData).enter()
    .append('g')
      .attr('class','song')
      .attr('transform', function(d,i){
        // let x = 100 + i%3*50;
        // let y = i%3*100;
        // return "translate("+x+","+y+")"

        let xSpacePerBox = ((w-2*marginLeftRight) / numCol)
        let xSpacePadding = (xSpacePerBox-boxw)/2;
        let x = marginLeftRight + xSpacePadding +  xSpacePerBox * (i%numCol);

        let ySpacePerBox = ((h-2*marginTopBottom) / numRow)
        let ySpacePadding = (ySpacePerBox - boxh)/2;
        let y = marginTopBottom + ySpacePadding +  ySpacePerBox * Math.floor(i/numCol);



        return "translate("+x+","+y+")"

      })
    ;
    songgrouping.on('click', function(d){
      console.log('hover', d.key);
      // d3.select(this).selectAll('.person')
      //     .attr('fill', 'red')
      // ;
    })
  ;


  // let deathgrouping = viz.selectAll('.death').data(nestedData2).enter()
  //   .append('g')
  //     .attr('class','death')
  //     .attr('transform', function(d,i){
  //       // let x = 100 + i%3*50;
  //       // let y = i%3*100;
  //       // return "translate("+x+","+y+")"
  //
  //       let xSpacePerBox2 = ((w-2*marginLeftRight2) / numCol2)
  //       let xSpacePadding2 = (xSpacePerBox2-boxw2)/2;
  //       let x = marginLeftRight2 + xSpacePadding2 +  xSpacePerBox2 * (i%numCol2);
  //
  //       let ySpacePerBox2 = ((h-2*marginTopBottom2) / numRow2)
  //       let ySpacePadding2 = (ySpacePerBox2 - boxh2)/2;
  //       let y = marginTopBottom2 + ySpacePadding2 +  ySpacePerBox2 * Math.floor(i/numCol2);
  //
  //
  //
  //       return "translate("+x+","+y+")"
  //
  //     })
  //   ;
    songgrouping.on('click', function(d){
      console.log('hover', d.key);
      // d3.select(this).selectAll('.person')
      //     .attr('fill', 'red')
      // ;
    })
  ;
  // songgrouping.append('circle')
  //     .attr('cx',function(d,i){
  //       random(100,w)
  //     })
  //     .attr('cy',function(d,i){
  //       random(100,h)
  //     })
  //     .attr('r',5)
  //     .attr('fill','yellow')
  // ;

function assignKeys(d,i) {
  return d.key
}
  let eachdotgroup = songgrouping.selectAll('.dotgroup').data(function(d,i){
      return d.values
    }, assignKeys).enter()
        .append('g')
        .attr('class','dotgroup')
;

  let eachdot = eachdotgroup
  // songgrouping.selectAll('.person').data(function(d,i){
  //     return d.values
  //   })
  //   .enter()
    .append('circle')
    .attr('class','person')
      .attr('cx',function(d,i){
        return i%4*10
      })
      .attr('cy',function(d,i){
        return Math.floor(i/4)*10
      })
      .attr('r',5)
      .attr('fill','yellow')
  ;
  ///////setting initial value for forcegraph///////
  incomingData = incomingData.map(function(d,i){
    d.x = w;
    d.y = h;
    return d
  })

  /////////////////simulation force graph///////////
  let simulation = d3.forceSimulation(incomingData)
    .force('forceX',d3.forceX(0))
    .force('forceY',d3.forceY(0))
    .force('collide',d3.forceCollide(5))
    .on('tick',simulationrun)
  ;
  console.log(incomingData)


  function simulationrun() {
    viz.selectAll('.person')
        .attr('cx', function(d,i){
          return d.x
        })
        .attr('cy', function(d,i){
          return d.y
        })
  }




  enterView({
  	selector: '#intropara2',
  	enter: function(el) {
  		console.log('a special element entered');
      update(incomingData)

  	},
  	exit: function(el) {
      console.log('a special element exited');
      // let viz1=document.getElementById('viz1placeholder');
      // viz1.src = "viz1_1.jpg"
      reverse(incomingData)
  	},
  	progress: function(el, progress) {
      console.log("the special element's progress is:", progress);
  	},
  	offset: 0.5 // enter at middle of viewport
  	// once: true, // trigger just once
  });
}

d3.json("murderballads.json").then(gotData);







///////////////////////////////test test///////////////////////////
// let mycircle = viz.append('circle')
//     .attr('cx',w)
//     .attr('cy',h)
//     .attr('r',4)
//     .attr('fill','red')
// ;

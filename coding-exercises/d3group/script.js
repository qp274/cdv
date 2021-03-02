
let svg1 = d3.select('#day1')
  .append('svg') //viz2 = this svgS
    .attr('x',0)
    .attr('y', 0)
    .attr('id', 'svg1')
    .attr('class', 'svg')
    .attr('width', 160)
    .attr('height', 400)
;

let svg2 = d3.select('#day2')
  .append('svg') //viz2 = this svgS
    .attr('x',180)
    .attr('y', 0)
    .attr('id', 'svg2')
    .attr('class', 'svg')
    .attr('width', 160)
    .attr('height', 400)
;


function split(data, category, title) {
  let newarray = [];
  for (i=0; i< data.length;i++) {
    if (data[i][category] == title)
    newarray.push(data[i]);
    // console.log(data[i][title]);
  }
  return newarray;
}


function gotData(data){   // this function expects to be passed data
  categorizeByDay(data);
  day1point(day1data);
  day2point(day2data);
  // seriousness(data);
}

function randomTranslate(d, i){
  // let x = Math.floor(Math.random() * 121) + 20  ;
  let x = 80;
  // let y = Math.floor(Math.random() * 361) + 20  ;
  let y = 40 + 65*i;
  return "translate(" + x + "," + y + ")";
}



function categorizeByDay(data) {
  day1data = split(data, 'day','day 1');
  console.log('day1', day1data);
  day2data = split(data, 'day','day 2');
    console.log('day2', day2data);
}



function day1point(data) {

  //background circles
  backgroundcircle(svg1);

  //define foreground groups
  let day1group = svg1.selectAll(".day1point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day1point')
  ;
  // multiple circles
  day1group.selectAll(".miniCircle").data(checking).enter()
    .append("circle")
      .attr("class", "miniCircle")
      .attr("r", function(d, i){
        return (i+1) * 12;
      })
      .attr('fill', typecolor)
      .attr('opacity', 0.2)
  ;

//main circle
  day1group.append('circle')
      .attr('r',18)
      .attr('fill', 'green')
      .attr('opacity', 0.4)
  ;

  // day1group.append('line')
  //     .attr('stroke', 'red')
  //     .attr('x1',0)
  //     .attr('y1',0)
  //     .attr('x2',0)
  //     .attr('y2',length)
  //     .attr('stroke-width',5)
  //     .attr('opacity',0.6)
  // ;

//center dot
  day1group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;

  day1group.append('text')
      .text(function(d,i){
        return (i+1)
      })
      .attr("fill", "red")
  ;


  day1group.attr('transform', randomTranslate)


}

function backgroundcircle(svgi) {
  let row = svgi.selectAll('.row').data(d3.range(12))
    .enter()
      .append('g')
      .attr('class', 'row')

  row.selectAll('.rowcircle').data(d3.range(4)).enter()
    .append('circle')
      .attr('class','rowcircle')
      .attr('fill', 'grey')
      .attr('opacity', 0.2)
      .attr('r', 16)
      .attr('cx',function(d,i){
        return i*34+18
      })
      .attr('cy',20)
  row.attr('transform',function(d,i){
    return "translate(" + 0 + "," + i*33 + ")"
  })
}

function day2point(data) {

  //background circles
  backgroundcircle(svg2);

  //define foreground groups
  let day2group = svg2.selectAll(".day2point").data(data)
    .enter()
      .append('g')
      .attr('class', 'day2point')

      //multiple circles
  day2group.selectAll(".miniCircle2").data(checking).enter()
      .append("circle")
        .attr("class", "miniCircle2")
        .attr("r", function(d, i){
            return i * 12 + 12;
            })
        .attr('fill', typecolor)
        .attr('opacity', 0.2)
  ;

    // main circle
  day2group.append('circle')
      .attr('r',18)
      .attr('fill', 'green')
      .attr('opacity', 0.4)


  // day2group.append('line')
  //     .attr('stroke', 'red')
  //     .attr('stroke-width',5)
  //     .attr('opacity',0.6)
  //     .attr('x1',0)
  //     .attr('y1',0)
  //     .attr('x2',0)
  //     .attr('y2',length)

    //center dot
  day2group.append('circle')
      .attr('r',5)
      .attr('fill', typecolor)
  ;


      day2group.append('text')
            .text(function(d,i){
              return (i+1)
            })
            .attr("fill", "red")
      ;

  day2group.attr('transform', randomTranslate)
  // day2group.attr('cx', noticable)
}


function checking(d, i) {
  return d3.range(d.noticable);
}

function typecolor(p) {
  if (p['resist'] == 'convention') {
    return 'yellow';
  }
  if (p['resist'] == 'authority') {
    return 'red';
  }
  if (p['resist'] == 'control') {
    return 'blue';
  }
}

function length(p) {
  return p['noticable']*10 + 12
}

// function multiplecircle(data, group) {
//   for (i=0; i< data.length; i++) {
//     for (j=0; j<= data[i]['seriousness']; j++) {
//       let radius = 15*j
//       console.log(i,j, radius)
//       group.append('circle')
//           .attr('r', radius)
//           .attr('fill', 'green')
//           .attr('opacity', 0.1)
//           .attr('cx', j*2)
//     }
//   }
// }
function background(svgi,d,i) {
  svgi.selectAll(".backgroundcircle").data(d3.range(12)).enter()
      .append('circle')
        .attr('class','backgroundcircle')
        .attr('r',12)
        .attr('fill','lightgrey')
        .attr('opacity',0.1)
        .attr('cx',i/3)

}

function noticable(d,i) {
  console.log('n',i, d.noticable)
}




d3.json("data.json").then(gotData);

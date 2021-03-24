// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");



let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
;

// X SCALE
// we use a band scale
//
// reference: https://github.com/d3/d3-scale#band-scales
// example: https://observablehq.com/@d3/d3-scaleband
//
// this is a useful scale when associating names (not values) with spots
// on the x axis. we don't map a range of values to another range of values,
// but a fixed set of names (the keys of our data points) to
// a range (pixel values along the x axis)
//
// first we need an array with the keys only:
let allNames = data.map(function(d){return d.key});
// check it:
console.log(allNames);
// now we as d3 to give us our custom scale
// we say "hey d3, here is a list of names (keys (the domain)), I want a function that
// returns a number (pixel location on the x axis (the range)) for each of the names.
// oh, and could you make sure that this functions calculates in some
// distance (passingInner) between each of thos points (bands)?"
let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;
// create a visual axis corresponding to the scale.
let xAxis = d3.axisBottom(xScale)
// this is a tricky one.... by default the axis would show the scales domain (the unique keys)
// ...in our case we want emojis to show. This situation hardly comes up,
// that's why I just wrote this one-liner for you:
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
// create a group to hold all the axis elements
let xAxisGroup = viz.append("g").classed("xAxis", true);
// tell d3 to put the axis into place
xAxisGroup.call(xAxis);
// modfy the axis label (the emoojis) size
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
// get rid of the little tick lines
xAxisGroup.selectAll("line").remove();
// bring axis to the correct y position
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")


// Y SCALE
// we will not show a y axis in this graph, but still need a scale
// to make sure our bars have heights that fit the window. It's
// familiar linear scale.
let yMax = d3.max(data, function(d){return d.value});
// I decided not to use the minimum value of the dataset,
// because otherwise the smallest value's bar would always be 0 pixels
// high and therefore invisible.
yDomain = [0, yMax];
// "hey d3 i need a linear scale please. yeah! I want to supply a value
// to it that is between 0 and yMax and want one back that fits between
// my graph's paddings. Cheers!"
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);

// the ACTUAL GRAPH
// before we get to the actual graph, we make a group element into which to
// put all visual graph things:
let graphGroup = viz.append("g").classed("graphGroup", true);
// btw, this:
// .classed("graphGroup", true);
// is almost equivalent to
// .attr("class", "graphGroup");
// but slightly more advanced. you can find a description here:
// https://github.com/d3/d3-selection#selection_classed

//step 6
let elementsForPage = graphGroup.selectAll(".datapoint").data(data);

console.log("D3's assessment of whats needed on the page:", elementsForPage);

//step 7
let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();
// and again, look closely:
console.log("enteringElements", enteringElements);
console.log("exitingElements", exitingElements);


let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);

enteringDataGroups.attr("transform", function(d, i){
  return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
});
// then append rectangles to them and position/size them:
enteringDataGroups
  .append("rect")
    .attr("width", function(){
      // the scaleBand we are using
      // allows us to as how thick each band is:
      return xScale.bandwidth();
    })
    .attr("height", function(d, i){
      // the idea is that we make the bar
      // as high as dictated by the value...
      return yScale(d.value);
    })
    .attr("y", function(d,i){
      // ...and then push the bar up since it
      // is drawn from top to bottom
      return -yScale(d.value);
    })
    .attr("fill", "black")
;
































// binding functions to the buttons on the page
// the functions we use to do the actual work are defined in dataManager.js
function add(){
  addDatapoints(1);
  console.log("new data", data)

  // before we get back to dealing with the bars, we need to update
  // out scales (and axis) to match the new data.
  // scales are function we got custom made by D3.
  // after using them for a bit, we can adjust their inner workings
  // here we adjust the xScale we already defined and used. all
  // we want to change about it is the domain.
  // we get the updated list of keys for our data set that has changed:
  allNames = data.map(function(d){return d.key});
  // and adjust the domain of xScale:
  xScale.domain(allNames);
  // done, the xScale is "fixed" and ready to help us to position elements
  // for our new data
  // as you can see, we only adjust selectively the bits that depend
  // on our data. the same is true for the axis:
  xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

  // y scale...
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  // do you see how the axis adjusts to the new data at this point? you can animate
  // this transition inside the statement where you use ".call(xAxis)"...

   // we adjust this to bring the new axis onto the page
  // we add new code below:
  console.log("new data", data)
  // what we essentially do now is the following:
  // each element on the page is associated with one datapoint
  // of the OLD data array. With our new data, we will now overwrite
  // those associations. let's start by asking D3 to assess what's up:
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  // note, we don't need "let" because the variable elementsForPage already exists
  console.log(elementsForPage);
  // look at this, it's slightly unexpected at first, but fold out
  // the enter, exit and _group ("update") subsections:
  // you will see that enter has.... ONE element! it's the one we
  // just added to the array!!
  // exit has zero elements, no elements is leaving, because we reuse
  // all the elements that are on the page and...
  // ...update them! as is seen in the _group ("update") array where there is 10 elements (the ones that are on the page already)
  // in other words: "10 elements are on the page, we would like to show 11 (amount of points in our data). therefore we reuse the 10 (update them) and add one more (it enters)".
  // WOW
  // so cool :D
  // again, we can now exactly define, how each subgroup should
  // behave



  // in the end, the incoming bar will appear on the right side. for that
  // to look great, let's move over the updating elements first.
  // to recap, we extract the entering elments like so:
  enteringElements = elementsForPage.enter();
  // and the exiting ones like so:
  exitingElements = elementsForPage.exit();
  // note: i don't use "let" because this variables already exists
  // ...after extracting those subgroups, what's left in elementsForPage
  // are the elements that update.
  // let's try it:
  // oh my, it works. You can animate the transition in the same way as you did
  // with the x axis before
  elementsForPage.transition().duration(1000).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });





  // we aren't done with the updating section yet
  // the width needs to adjust, and even the height (as incoming data points MIGHT
  // set a new maximum value and every other bar goes down a little)
  elementsForPage.select("rect")
   .transition()
   // .delay(1000)
   .duration(1000)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
  ;
  // first note, I added a new feature, the .delay() delays the transition
  // second, again, we only update the things that are impacted by the new data situation
  // lastly, we can deal with the elements that enter
  // we already extracted the enteringElements from elementsForPage above
  // what do we want to do with incoming elements?
  // much the same we always do
  // we append a group to the empty placeholder:
  let incomingDataGroups = enteringElements
    .append("g")
      .classed("datapoint", true)
  ;
  // position the groups:
  incomingDataGroups.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });

   incomingDataGroups
    .append("rect")
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", "#F27294")
      .transition()
      .delay(200)
      .duration(2000)
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("fill", "black")
   ;
}
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
  console.log('start removing')
  removeDatapoints(1);
  console.log("remove:new data", data)


  // allNames = data.map(function(d){return d.key});
  // xScale.domain(allNames);
  // xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
  // xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  // xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page
  //
  // // y scale...
  // yMax = d3.max(data, function(d){return d.value});
  // yDomain = [0, yMax+yMax*0.1];
  // yScale.domain(yDomain);

  // do you see how the axis adjusts to the new data at this point? you can animate
  // this transition inside the statement where you use ".call(xAxis)"...

 // we adjust this to bring the new axis onto the page
  // we add new code below:
  console.log("remove: new data", data)

  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  // note, we don't need "let" because the variable elementsForPage already exists
  console.log(elementsForPage);




  // in the end, the incoming bar will appear on the right side. for that
  // to look great, let's move over the updating elements first.
  // to recap, we extract the entering elments like so:
  enteringElements = elementsForPage.enter();
  // and the exiting ones like so:
  exitingElements = elementsForPage.exit();
  // note: i don't use "let" because this variables already exists
  // ...after extracting those subgroups, what's left in elementsForPage
  // are the elements that update.
  // let's try it:
  // oh my, it works. You can animate the transition in the same way as you did
  // with the x axis before
  // elementsForPage.transition().delay(120).duration(2000).attr("transform", function(d, i){
  //   return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  // });
  //
  // elementsForPage.select("rect")
  //  .transition()
  //  .delay(120)
  //  .duration(2000)
  //  .attr("width", function(){
  //     return xScale.bandwidth();
  //  })
  //  .attr("y", function(d,i){
  //    return -yScale(d.value);
  //  })
  //  .attr("height", function(d, i){
  //    return yScale(d.value);
  //  })
  // ;



  // we aren't done with the updating section yet
  // the width needs to adjust, and even the height (as incoming data points MIGHT
  // set a new maximum value and every other bar goes down a little)

  // let outDataGroups = elementsForPage.exit().select('rect');
  exitingElements.transition().duration(1000).remove();
  let outDataGroups = exitingElements.select("rect");

   outDataGroups
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", "lightblue")
      .transition()
      .duration(1000)
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("fill", "black")
      .remove()
   ;


   allNames = data.map(function(d){return d.key});
   xScale.domain(allNames);
   xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
   xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
   xAxisGroup.transition().delay(1000).duration(2000).call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

   // y scale...
   yMax = d3.max(data, function(d){return d.value});
   yDomain = [0, yMax+yMax*0.1];
   yScale.domain(yDomain);

   elementsForPage.transition().delay(1000).duration(2000).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
   });
   //
   elementsForPage.select("rect")
    .transition()
    .delay(1000)
    .duration(2000)
    .attr("width", function(){
       return xScale.bandwidth();
    })
    .attr("y", function(d,i){
      return -yScale(d.value);
    })
    .attr("height", function(d, i){
      return yScale(d.value);
    })
   ;
}
document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd(){
  removeAndAddDatapoints(1,1);

  console.log("remove: new data", data);
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  console.log(elementsForPage);
  enteringElements = elementsForPage.enter();
  exitingElements = elementsForPage.exit();
  exitingElements.transition().duration(1000).remove();
  let outDataGroups = exitingElements.select("rect");

   outDataGroups
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", "lightblue")
      .transition()
      .duration(1000)
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("fill", "black")
      .remove()
   ;


   allNames = data.map(function(d){return d.key});
   xScale.domain(allNames);
   xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
   xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
   xAxisGroup.transition().delay(1000).duration(2000).call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

   // y scale...
   yMax = d3.max(data, function(d){return d.value});
   yDomain = [0, yMax+yMax*0.1];
   yScale.domain(yDomain);

   elementsForPage.transition().delay(1000).duration(2000).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
   });

   let incomingDataGroups = enteringElements
     .append("g")
       .classed("datapoint", true)
   ;
   // position the groups:
   incomingDataGroups.attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
   });

    incomingDataGroups
     .append("rect")
       .attr("y", function(d,i){
         return 0;
       })
       .attr("height", function(d, i){
         return 0;
       })
       .attr("width", function(){
         return xScale.bandwidth();
       })
       .attr("fill", "#F27294")
       .transition()
       .delay(3000)
       .duration(1000)
       .attr("y", function(d,i){
         return -yScale(d.value);
       })
       .attr("height", function(d, i){
         return yScale(d.value);
       })
       .attr("fill", "black")
    ;

   elementsForPage.select("rect")
    .transition()
    .delay(1000)
    .duration(2000)
    .attr("width", function(){
       return xScale.bandwidth();
    })
    .attr("y", function(d,i){
      return -yScale(d.value);
    })
    .attr("height", function(d, i){
      return yScale(d.value);
    })
   ;

}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);

function sortData(){
  sortDatapoints();
  allNames = data.map(function(d){return d.key});
  // and adjust the domain of xScale:
  xScale.domain(allNames);
  // done, the xScale is "fixed" and ready to help us to position elements
  // for our new data
  // as you can see, we only adjust selectively the bits that depend
  // on our data. the same is true for the axis:
  xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

  // y scale...
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  // do you see how the axis adjusts to the new data at this point? you can animate
  // this transition inside the statement where you use ".call(xAxis)"...

   // we adjust this to bring the new axis onto the page
  // we add new code below:
  console.log("new data", data)
  // what we essentially do now is the following:
  // each element on the page is associated with one datapoint
  // of the OLD data array. With our new data, we will now overwrite
  // those associations. let's start by asking D3 to assess what's up:
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  // note, we don't need "let" because the variable elementsForPage already exists
  console.log(elementsForPage);
  // look at this, it's slightly unexpected at first, but fold out
  // the enter, exit and _group ("update") subsections:
  // you will see that enter has.... ONE element! it's the one we
  // just added to the array!!
  // exit has zero elements, no elements is leaving, because we reuse
  // all the elements that are on the page and...
  // ...update them! as is seen in the _group ("update") array where there is 10 elements (the ones that are on the page already)
  // in other words: "10 elements are on the page, we would like to show 11 (amount of points in our data). therefore we reuse the 10 (update them) and add one more (it enters)".
  // WOW
  // so cool :D
  // again, we can now exactly define, how each subgroup should
  // behave



  // in the end, the incoming bar will appear on the right side. for that
  // to look great, let's move over the updating elements first.
  // to recap, we extract the entering elments like so:
  enteringElements = elementsForPage.enter();
  // and the exiting ones like so:
  exitingElements = elementsForPage.exit();
  // note: i don't use "let" because this variables already exists
  // ...after extracting those subgroups, what's left in elementsForPage
  // are the elements that update.
  // let's try it:
  // oh my, it works. You can animate the transition in the same way as you did
  // with the x axis before
  elementsForPage.transition().duration(1000).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });





  // we aren't done with the updating section yet
  // the width needs to adjust, and even the height (as incoming data points MIGHT
  // set a new maximum value and every other bar goes down a little)
  elementsForPage.select("rect")
   .transition()
   // .delay(1000)
   .duration(1000)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
  ;
  // first note, I added a new feature, the .delay() delays the transition
  // second, again, we only update the things that are impacted by the new data situation
  // lastly, we can deal with the elements that enter
  // we already extracted the enteringElements from elementsForPage above
  // what do we want to do with incoming elements?
  // much the same we always do
  // we append a group to the empty placeholder:
  let incomingDataGroups = enteringElements
    .append("g")
      .classed("datapoint", true)
  ;
  // position the groups:
  incomingDataGroups.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });

   incomingDataGroups
    .append("rect")
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", "#F27294")
      .transition()
      .delay(200)
      .duration(2000)
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("fill", "black")
   ;
}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData(){
  shuffleDatapoints();
  allNames = data.map(function(d){return d.key});
  // and adjust the domain of xScale:
  xScale.domain(allNames);
  // done, the xScale is "fixed" and ready to help us to position elements
  // for our new data
  // as you can see, we only adjust selectively the bits that depend
  // on our data. the same is true for the axis:
  xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

  // y scale...
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  // do you see how the axis adjusts to the new data at this point? you can animate
  // this transition inside the statement where you use ".call(xAxis)"...

   // we adjust this to bring the new axis onto the page
  // we add new code below:
  console.log("new data", data)
  // what we essentially do now is the following:
  // each element on the page is associated with one datapoint
  // of the OLD data array. With our new data, we will now overwrite
  // those associations. let's start by asking D3 to assess what's up:
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  // note, we don't need "let" because the variable elementsForPage already exists
  console.log(elementsForPage);
  // look at this, it's slightly unexpected at first, but fold out
  // the enter, exit and _group ("update") subsections:
  // you will see that enter has.... ONE element! it's the one we
  // just added to the array!!
  // exit has zero elements, no elements is leaving, because we reuse
  // all the elements that are on the page and...
  // ...update them! as is seen in the _group ("update") array where there is 10 elements (the ones that are on the page already)
  // in other words: "10 elements are on the page, we would like to show 11 (amount of points in our data). therefore we reuse the 10 (update them) and add one more (it enters)".
  // WOW
  // so cool :D
  // again, we can now exactly define, how each subgroup should
  // behave



  // in the end, the incoming bar will appear on the right side. for that
  // to look great, let's move over the updating elements first.
  // to recap, we extract the entering elments like so:
  enteringElements = elementsForPage.enter();
  // and the exiting ones like so:
  exitingElements = elementsForPage.exit();
  // note: i don't use "let" because this variables already exists
  // ...after extracting those subgroups, what's left in elementsForPage
  // are the elements that update.
  // let's try it:
  // oh my, it works. You can animate the transition in the same way as you did
  // with the x axis before
  elementsForPage.transition().duration(1000).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });





  // we aren't done with the updating section yet
  // the width needs to adjust, and even the height (as incoming data points MIGHT
  // set a new maximum value and every other bar goes down a little)
  elementsForPage.select("rect")
   .transition()
   // .delay(1000)
   .duration(1000)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
  ;
  // first note, I added a new feature, the .delay() delays the transition
  // second, again, we only update the things that are impacted by the new data situation
  // lastly, we can deal with the elements that enter
  // we already extracted the enteringElements from elementsForPage above
  // what do we want to do with incoming elements?
  // much the same we always do
  // we append a group to the empty placeholder:
  let incomingDataGroups = enteringElements
    .append("g")
      .classed("datapoint", true)
  ;
  // position the groups:
  incomingDataGroups.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });

   incomingDataGroups
    .append("rect")
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", "#F27294")
      .transition()
      .delay(200)
      .duration(2000)
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("fill", "black")
   ;
}
document.getElementById("buttonE").addEventListener("click", shuffleData);

function mystery() {
  shuffleDatapoints();
  allNames = data.map(function(d){return d.key});
  // and adjust the domain of xScale:
  xScale.domain(allNames);
  // done, the xScale is "fixed" and ready to help us to position elements
  // for our new data
  // as you can see, we only adjust selectively the bits that depend
  // on our data. the same is true for the axis:
  xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
  xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18);// we adjust this to bring the new axis onto the page

  // y scale...
  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  // do you see how the axis adjusts to the new data at this point? you can animate
  // this transition inside the statement where you use ".call(xAxis)"...

   // we adjust this to bring the new axis onto the page
  // we add new code below:
  console.log("new data", data)
  // what we essentially do now is the following:
  // each element on the page is associated with one datapoint
  // of the OLD data array. With our new data, we will now overwrite
  // those associations. let's start by asking D3 to assess what's up:
  elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
  // note, we don't need "let" because the variable elementsForPage already exists
  console.log(elementsForPage);
  // look at this, it's slightly unexpected at first, but fold out
  // the enter, exit and _group ("update") subsections:
  // you will see that enter has.... ONE element! it's the one we
  // just added to the array!!
  // exit has zero elements, no elements is leaving, because we reuse
  // all the elements that are on the page and...
  // ...update them! as is seen in the _group ("update") array where there is 10 elements (the ones that are on the page already)
  // in other words: "10 elements are on the page, we would like to show 11 (amount of points in our data). therefore we reuse the 10 (update them) and add one more (it enters)".
  // WOW
  // so cool :D
  // again, we can now exactly define, how each subgroup should
  // behave



  // in the end, the incoming bar will appear on the right side. for that
  // to look great, let's move over the updating elements first.
  // to recap, we extract the entering elments like so:
  enteringElements = elementsForPage.enter();
  // and the exiting ones like so:
  exitingElements = elementsForPage.exit();
  // note: i don't use "let" because this variables already exists
  // ...after extracting those subgroups, what's left in elementsForPage
  // are the elements that update.
  // let's try it:
  // oh my, it works. You can animate the transition in the same way as you did
  // with the x axis before
  elementsForPage.transition().duration(1000).attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });





  // we aren't done with the updating section yet
  // the width needs to adjust, and even the height (as incoming data points MIGHT
  // set a new maximum value and every other bar goes down a little)
  elementsForPage.select("rect")
   .attr('fill',function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
    })
   .transition()
   // .delay(1000)
   .duration(1000)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
   .attr('fill', 'black')
  ;

}
document.getElementById("buttonF").addEventListener("click", mystery);

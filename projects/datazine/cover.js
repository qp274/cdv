let w = 1200;
let h = 800;

let viz = d3.select('#container').append("svg")
    .attr('width', w)
    .attr('height', h)
;

viz.append('text')
    .text('rebellion')
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .attr('x',80)
    .attr('y', 270)
    // .attr("text-anchor", "middle")
    .attr('font-size', '60px')


viz.append('text')
    .text('noun.')
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .attr('x', 80)
    .attr('y', 380)
    // .attr("text-anchor", "middle")
    .attr('font-size', '30px')

viz.append('text')
    .text('the action or process of resisting authority, control, or convention.')
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .attr('x',80)
    .attr('y', 450)
    // .attr("text-anchor", "middle")
    .attr('font-size', '40px')

viz.append('circle')
    .attr('r',600)
    .attr('fill','grey')
    .attr('opacity', 0.2)

    viz.append('circle')
        .attr('r',300)
        .attr('fill','grey')
        .attr('opacity', 0.2)

viz.append('circle')
    .attr('r',700)
    .attr('fill','grey')
    .attr('opacity', 0.2)
    .attr('cx',400)
    .attr('cy', 800)

    viz.append('circle')
        .attr('r',400)
        .attr('fill','grey')
        .attr('opacity', 0.2)
        .attr('cx',1100)
        .attr('cy', 900)


viz.append('circle')
    .attr('r',60)
    .attr('fill','grey')
    .attr('opacity', 0.2)
    .attr('cx',1100)
    .attr('cy', 400)

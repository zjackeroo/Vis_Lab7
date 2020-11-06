const margin = {top: 20, right: 20, bottom: 20, left: 20};
const width = 650 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select('.nodegram')
      .append('svg')
      .attr("viewBox", [0,0,width,height])
    //   .attr('width', width + margin.left + margin.right)
    //   .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const circleScale = 

// create axes and axis title containers
svg.append('g')
   .attr('class', 'axis x-axis')
   .attr('transform', `translate(20, ${height})`)
svg.append('g')
   .attr('class', 'axis y-axis')
   .attr("transform", "translate(20, 0)")
svg.append("text")
   .attr('class', 'title')
   .attr('x', margin.left-10)
   .attr('y', -10)
   .attr('alignment-baseline', 'middle')
   .attr('text-anchor', 'middle')
   .attr('font-size', 14);

// (Later) Define update parameters: measure type, sorting direction
let type = document.getElementById('group-by').value
let sort = 1;

// CHART UPDATE FUNCTION -----------------------------------------------------------------------
function update(data, type, sort){
    console.log('current type is:', type)

    if (sort==0) {
        data = data.sort((a,b)=>(b[type] - a[type]));
    } else {
        sort = -sort;
        data = data.sort((a,b)=>(sort*b[type] - sort*a[type]));
    }
    
    console.log('data: ', data)

	// update domains
    xScale.domain(data.map(d=>d.company))
    yScale.domain([0, d3.max(data, d=>(d[type]))])

    // update bars
    const barchart = svg.selectAll('rect')
                        .data(data)
    barchart.enter()
            .append('rect')
            .attr('fill', '#6f4e37')
            .merge(barchart)
            .transition()
            .duration(750)
            .delay(200)
            .attr('width', 65)
            .attr('height', d=>(height-yScale(d[type])))
            .attr('x', (d,i)=>25+(i*xScale.bandwidth()))
            .attr('y', d=>(yScale(d[type])))
    if (type=='stores') {
        barchart.attr('fill', '#6f4e37');
    } else {
        barchart.attr('fill', '#fa8b0d');
    }
        
    // update axes and axis title
    xAxis = d3.axisBottom()
                .scale(xScale);
    yAxis = d3.axisLeft()
                .scale(yScale);
    svg.select('.x-axis')
       .transition()
       .duration(750)
       .delay(400)
       .call(xAxis);
    svg.select('.y-axis')
       .transition()
       .duration(750)
       .delay(600)
       .call(yAxis);
    svg.select('.title')
       .text(`${type}`);
    
    return sort;
}

// CHART UPDATES -------------------------------------------------------------------------------

// Loading data
data = d3.csv('./data/coffee-house-chains.csv', d3.autoType).then(data => {
    update(data, 'stores', 0);
    // (Later) Handling the type change
    document.querySelector('#group-by').addEventListener('change', (e)=>{
        console.log('Selected type is: ', e.target.value);
        update(data, e.target.value, 0);
    });

    // (Later) Handling the sorting direction change
    document.querySelector('#sort').addEventListener('click', (e)=>{
        type = document.querySelector('#group-by').value
        console.log(`sorting by ${type}...`)
        sort = update(data, type, sort)
    });
});

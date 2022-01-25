// Define SVG area dimensions
var svgWidth = 500;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var rtw_svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = rtw_svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// // Initial Parameters
var chosenXAxis = "Total_RTW";

// // function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, chartWidth]);
  
    return xLinearScale;  
  }

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating bars group with a transition to new bars
function renderBars(barsGroup, newXScale, chosenXAxis) {

  barsGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return barsGroup;
}

function renderText(textGroup, newXScale, chosenXAxis) {

  textGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]));

return textGroup;
}

// function used for updating bars group with new tooltip
function updateToolTip(chosenXAxis, barsGroup) {

  var xlabel;

  if (chosenXAxis === "Total_RTW") {
    xlabel = "Total RTW:";
  }
  else {
    xlabel = "MI RTW";
    
  }

  // var ylabel = "RTW Percentage";

  var toolTip = d3.tip()
    .attr("class", "tooltip")
      .html(function(d) {
      return (`${d.Team}<br>${xlabel} ${d[chosenXAxis]}`);        
    });

  barsGroup.call(toolTip);

  barsGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return barsGroup;
}

// Load data from csv
d3.csv("Resources/team_RTW26.csv").then(function(rtwData) {

  // Print the rtwData
  console.log(rtwData);

  // function groupBy(object, property) {
  //   return object.reduce(function (acc, obj) {
  //     var key = obj[property];
  //       if (!acc[key]) {
  //         acc[key] = [];
  //     }
  //     acc[key].push(obj);
  //     return acc;
  //   }, {});
  // }

  // var groupedTeam = groupBy(rtw26, 'Team');
  
  // var groupedEmployer = groupBy(rtw26, 'Employer_Name')

  // console.log(groupedTeam);



  // // Cast the hours value to a number for each piece of tvData
  rtwData.forEach(function(data) {
    data.MI_RTW = +data.MI_RTW;
    data.Phys_RTW = +data.Phys_RTW;
    data.Total_RTW = +data.Total_RTW;
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 3 // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (rtwData.length - 1))) / rtwData.length;

  // Create scale functions  
  var xLinearScale = xScale(rtwData, chosenXAxis);
    
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(rtwData, d => d.Total_RTW)])
    .range([chartHeight, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
  .call(leftAxis);

  // Create code to build the bar chart
  chartGroup.selectAll(".bar")
    .data(rtwData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.Total_RTW * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.Total_RTW * scaleY);
}).catch(function(error) {
  console.log(error);
});

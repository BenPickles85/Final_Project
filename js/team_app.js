// Created function to run on page load, populating drop down and initial charts
function initLoad() {  
    d3.csv("Resources/team_RTW26.csv").then(function(data) {
    console.log(data);

    // Select dropdown and create variable
    var dropdown = d3.select("#selDataset");

    // Create variable of names from dataset
    var metric =  ["Total_RTW", "MI_RTW", "Phys_RTW"]

    // // Populate dropdown menu
    dropdown.selectAll('options')
      .data(metric)
      .enter()
      .append('option')
      .attr('value', data => data)
      .text(data => data);
  
    //   // Store first name in dataset as variable for initial load
      var initial = metric[0];

  // Initiate plot for first metric upon page load
  plots(initial);
  });
};

// Create functions to change data based on selected metric
function optionChanged(selectedMetric) {
  plots(selectedMetric);
};

// Create function to generate bar plot
function plots(metric) {
  // Read in dataset
  d3.csv("Resources/team_RTW26.csv").then(function(data) {

    // Filter for the selected id in dropdown
  var selected = data.filter(data => data.metric == metric);
  console.log(metric)

  // var selectedMetric = metric
  // console.log(result);

//   var selectedID = selected[0];
  // console.log(data);

  // create variable for required data

  rtw_data = []  

  for (i=0; i<data.length; i++){
            rtw_data.push({
                team: data[i].Team,
                value: data[i][metric],                 
            });  

    
    }

console.log(rtw_data)


  
  // Create trace for bar chart
  var trace1 = {
    x: rtw_data.map(row => row.team),
    y: rtw_data.map(row => row.value),  
    // text: top10.map(row => row.label),
    type: "bar",
    // orientation: "h",
    marker: {
      color: 'purple',
    },
  }

  var barLayout = {
    color: "green",
    xaxis: {
      title: "Team"
    },
    yaxis: {
      title: "RTW Percentage"
    },        
    title: {
    //   text:`Top 10 OTU's for individual ID ${team}`,
      font: {
        size: 25,
        color: '#000066'
      }
    }
  }

  // Create the data array for bar chart
  var barData = [trace1];



  // Create plot
  Plotly.newPlot("bar", barData, barLayout);

})
}

// // Run initLoad function on page load
initLoad();


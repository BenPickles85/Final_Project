// // Created function to run on page load, populating drop down and initial charts
// function initLoad() {  
//     d3.csv("Resources/final.csv").then(function(data) {
//     console.log(data);

//     // Select dropdown and create variable
//     var dropdown = d3.select("#selDataset");

//     // Create variable of names from dataset
//     // var injury =  ["Total RTW", "MI RTW", "Physical RTW"]

//     // console.log(metric)

//     // // Populate dropdown menu
//     dropdown.selectAll('options')
//       .data(injury)
//       .enter()
//       .append('option')
//       .attr('value', data => data)
//       .text(data => data);
  
//     //   // Store first name in dataset as variable for initial load
//       var initial = injury[0];

//   // Initiate plot for first metric upon page load
//   plots(initial);
//   });
// };


// function optionChanged(selectedMetric) {
//     plots(selectedMetric);
// };

  d3.csv("Resources/final.csv").then(function(data) {
    
    var trace1 = {
        x: data.map(row => row.ARD),
        y: data.map(row => row.rtw_pct),  
        // text: top10.map(row => row.label),
        type: "bar",        
        // orientation: "h",
        marker: {
          color: 'Light green',
        },
      }
    
      var barLayout = {
        color: "green",
        xaxis: {
          title: "Claim Received Month"
        },
        yaxis: {
          title: "RTW Percentage"
        },        
        title: {
        text:`26 Week Back @ Work`,
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
    
    
    }); 
      



     

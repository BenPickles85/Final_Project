// from data.js
d3.csv("Resources/invoices.csv", function(tableData) {
    // if (err) throw err;
    // console.log(tableData);

var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var form = d3.select("form")

// // Create event handlers for clicking the button or pressing the enter key
button.on("click", renderTable);
form.on("submit", renderTable);

// // Complete the event handler function for the form
function renderTable() {

    tableData.forEach((invoice) => {
            
        // Create table
        var row = tbody.append("tr");
    
        Object.entries(invoice).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            })
    });

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
//  // Obtain input date and assign as variable
    var inputTeam = d3.select("#team");
    var inputAssigned = d3.select("#assigned")
    var inputTask = d3.select("#task")
    var inputCount = d3.select("#count")
    
    
//     // Get the value property of the input element
    var inputTeamValue = inputTeam.property("value");
    var inputAssignedValue = inputAssigned.property("value");
    var inputTaskValue = inputTask.property("value");
    var inputCountValue = inputCount.property("value");


    console.log(inputTeam);
    // console.log(inputAssigned);
    console.log(inputTaskValue);
    // console.log(inputCount);


    var filteredData = tableData.filter((invoice) => {
        
        var matchesTeam = false;
        var matchesAssigned = false;
        var matchesTask = false;
        var matchesCount = false;

        if (inputTeamValue.length == '0' || invoice.Team === inputTeamValue) {
            matchesTeam = true;
        }

        if (inputAssignedValue.length == '0' || invoice.Assigned_To.includes(inputAssignedValue)) {
            matchesAssigned = true;
        }

        if (inputTaskValue.length == '0' || invoice.Task_Type.includes(inputTaskValue)) {
            matchesTask = true;
        }

        if (inputCountValue.length == '0' || invoice.Days_Category.includes(inputCountValue)) {
            matchesCount = true;
        }

        return matchesTeam && matchesAssigned && matchesTask && matchesCount;

    });

//     // Check data is populating
        console.log(filteredData);

//     // Clear anything in the table
        tbody.html("");
    
        filteredData.forEach((invoice) => {
            
            // Create table
            var row = tbody.append("tr");

            Object.entries(invoice).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                })
        });
};


renderTable();
})

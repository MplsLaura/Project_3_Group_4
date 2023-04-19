// Fetch the json and log to console

const url = 'http://127.0.0.1:5000/api/v1.0/AnnualizedWeather'

d3.json(url).then(function(data) {
  console.log(data)


let first = 0
let second = 0
let third = 0
let fourth = 0
let fifth = 0
let sixth = 0

//Create empty list for each variable
let MaxList = []
let MinList = []
let SeasonList = []
let SnowfallList = []

//Loop through each dictionary, recording each value and appending to the lists
for (var j=0;j<data.length;j++) {

  let MaxTemp = data[j].AvgMaxTemp;
  let MinTemp = data[j].AvgMinTemp;
  let Year = data[j].Season;
  let Snowfall = data[j].TotalSnowfall;
  MaxList.push(MaxTemp);
  MinList.push(MinTemp);
  SeasonList.push(Year);
  SnowfallList.push(SnowfallList);

  if (data[j].Season < 1920) {
    first += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1940) {
    second += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1960) {
    third += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 1980) {
    fourth += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 2000) {
    fifth += data[j].DaysWithSnowCover_6
  ;}
  else if (data[j].Season < 2020) {
    sixth += data[j].DaysWithSnowCover_6
  ;}
 

}

var trace1 = {
  x: ['1900-1920', '1920-1940','1940-1960','1960-1980','1980-2000','2000-2020'],
  y: [first, second, third,fourth,fifth,sixth],
  name: '6+ inches Snow',
  type: 'bar'
};

var trace2 = {
  x: ['1900-1920', '1920-1940','1940-1960','1960-1980','1980-2000','2000-2020'],
  y: [1805-first, 1805-second, 1805-third,1805-fourth,1805-fifth,1805-sixth],
  name: '<6 inch Snow',
  type: 'bar'
};

var data2 = [trace1,trace2];

var layout2 = {barmode: 'stack',
    title: 'Snow Base over Time',
    xaxis: {
      title: 'Winter Seasons (Dec-Feb) 1900-2020',
    },
    yaxis: {
      title: 'Proportion of Winter with Snow Cover',
    }};

Plotly.newPlot('bar', data2, layout2);


// Display the default plot
function init() {
  var Temperatures = {
    x: SeasonList,
    y: MaxList,
    type: 'scatter'
  };
  
  var layout = {
    title: 'Average Temperature over Time',
    xaxis: {
      title: 'Season (December to February)',
    },
    yaxis: {
      title: 'Temperature (F)',
    }
  };
  var data = [Temperatures];
  
  Plotly.newPlot('line', data,layout);
}





// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'AvgMaxTemp') {
      data = MaxList;
  }
  else if (dataset == 'AvgMinTemp') {
      data = MinList;
  }

// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("line", "y", [newdata]);
}

init();

});
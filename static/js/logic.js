

// Use this link to get the GeoJSON data.
let link = "http://192.168.1.131:5000/api/v1.0/DailyWeather";
//  let link = "http://127.0.0.1:5000/api/v1.0/DailyWeather";
    crossOrigin: null

d3.json(link).then(function(data) {
    let snowIn = [];
    let snowOut = [];
    // the following from https://www.techiedelight.com/initialize-array-with-range-from-0-to-n-javascript/
    let years = Array.from({length:200}, (item, index) => 1900 + index);
    let foundEnd = Array.from({lenth:200}, (item, index) => false)
    var currYear = -1

    let isWinter = false;
    let daysNoSnow = 0;
    //let dateOptions = { day: 'numeric', month: 'short'}
    let dateOptions = {month: 'numeric'}
    for(let index=data.length-1; index > -1; index--) {
        const dateVal = new Date (data[index]['Date'])
        let foundEnd = 0
        let year = dateVal.getYear();
        let month = dateVal.getMonth() + 1;


        let snowCover = (data[index]['Snow Depth'] > 0);
        if (!snowCover) {
            daysNoSnow++;
        } else {
            daysNoSnow = 0;
        }
        if (daysNoSnow == 1) { 
            snowOut[currYear] = dateVal.toLocaleDateString("en-US", dateOptions);
            console.log ("snow day " + snowOut[currYear])
        }
//        console.log (data[index]['Date'] + " " + daysNoSnow + " " + snowCover);

        if (snowCover && year >= 0 && month > 7 && isWinter == false) {
            isWinter = true;
            daysNoSnow = 0;
            currYear++;
            snowIn[currYear] = dateVal.toLocaleDateString("en-US", dateOptions);
            years[currYear] = (1900 + year);
            console.log ("winter of " + (1900 + currYear) + " starts " + snowIn[currYear]);
        } else if (year >= 0 && month < 8 && isWinter == true && daysNoSnow == 80){
            isWinter = false;
            foundEnd[currYear] = true;
            console.log ("winter of " + (1900 + currYear) + " ends " + snowOut[currYear]);
        }
    }
    console.log (snowIn)
    console.log (snowOut)


    var trace1 = {
        x: years,
        y: snowIn, 
        fillcolor: "rgba(0,100,80,0.2)", 
     //   fill: "tonexty",
        line: {color: "blue"}, 
        name: "First Snow", 

        showlegend: true,
        type: "scatter",
        yaxis: 'y'
      };
      var trace2 = {
        x: years,
        y: snowOut, 
    //    fill: "tonexty", 
        fillcolor: "rgba(0,176,246,0.2)", 
        line: {color: "red"}, 
        name: "Last Snow", 
        showlegend: true, 
        yaxis: 'y2',
        type: "scatter"
      };


      var data = [trace1, trace2];
      var layout = {
        paper_bgcolor: "rgb(255,255,255)", 
        plot_bgcolor: "rgb(229,229,229)", 
        xaxis: {
          gridcolor: "rgb(255,255,255)", 
          range: [1900, (1900 + currYear)], 
          showgrid: true, 
          showline: false, 
          showticklabels: true, 
          tickcolor: "rgb(127,127,127)", 
          ticks: "outside", 
          zeroline: false
        }, 
        yaxis: {
          gridcolor: "rgb(255,255,255)", 
          showgrid: true, 
          showline: false,
          overlaying: 'y2',
          range: [16,9],
          showgrid: true, 
          showline: false, 
          tickformat: '%b',
          tickmode: "array",
          tickvals:[1,2,3,4,5,6,7,8,9,10,11,12],
          ticktext:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
          showticklabels: true, 
          tickangle: 45,
          tickcolor: "rgb(127,127,127)", 
          ticks: "outside",
          zeroline: false
        },
        yaxis2: {
            gridcolor: "rgb(255,255,255)", 
            showgrid: true, 
            showline: false, 
            range:[5,-2],
            side: 'right',
            showticklabels: true, 
            tickmode: "array",
            tickangle: 45,
            tickvals: 1,
            tickcolor: "rgb(127,127,127)", 
            ticks: "outside", 
            zeroline: false
          }

    }
    chartDiv = document.getElementById('layout')
    Plotly.newPlot(chartDiv, data, layout);
  });

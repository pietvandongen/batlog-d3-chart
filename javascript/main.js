var dataFilePath = "/data/batlog.csv";

var chart = d3.select("#chart");

var chartWidth = chart.style("width");

var textColor = "#525763";

var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 50
};

var width = chartWidth.substring(0, chartWidth.length - 2) - margin.left - margin.right;

var height = 400 - margin.top - margin.bottom;

var colorScale = d3.scale.linear()
    .domain([
        0,
        0.2,
        0.4,
        0.45,
        0.5,
        0.6,
        0.65,
        0.7,
        0.725,
        0.775,
        0.825,
        0.85,
        0.875,
        0.9,
        0.925,
        0.95,
        0.96,
        0.98,
        1
    ])
    .range([
        "#a21e1e",
        "#d64351",
        "#e75c4c",
        "#f47a4f",
        "#f99b5f",
        "#fcbb72",
        "#fdd789",
        "#feeba3",
        "#fffbbd",
        "#f4fab2",
        "#e6f49e",
        "#c6e7a2",
        "#a6daa7",
        "#82cba6",
        "#5fb6aa",
        "#4396b6",
        "#4178b4",
        "#565aa5",
        "#5e52a1"
    ]);

var statusPlaceholder = d3.select("#status");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.time.scale()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m-%d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.time.format("%H:%M"));

var line = d3.svg.line()
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.time);
    });

var svg = chart.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

statusPlaceholder.text("Downloading data…");

var dataFile = d3.csv(dataFilePath);

statusPlaceholder.text("Parsing data…");

var parsedData = dataFile.row(function (d) {
    return {
        date: d3.time.format("%Y-%m-%d").parse(d.Date.substring(0, 10)),
        time: d3.time.format("%H:%M:%S").parse(d.Date.substring(11, 19)),
        charge: +d.CurrentCapacity / +d.MaxCapacity
    }
});

statusPlaceholder.text("Plotting chart…");

parsedData.get(function (error, data) {
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));

    y.domain(d3.extent(data, function (d) {
        return d.time;
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("fill", textColor)
        .attr("dx", "-1em")
        .attr("dy", "-0.6em")
        .attr("transform", function (d) {
            return "rotate(-90)"
        });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", textColor);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.date);
        })
        .attr("cy", function (d) {
            return y(d.time);
        })
        .attr("r", function (d) {
            return 1;
        })
        .attr("fill", function (d) {
            return colorScale(d.charge);
        });

    statusPlaceholder.text("Done!");
});
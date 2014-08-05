var dropZone = d3.select("#dropZone");

var statusPlaceholder = d3.select("#userMessage");

var chartWidth = dropZone.style("width");

var width = chartWidth.substring(0, chartWidth.length - 2) - margin.left - margin.right;

var height = 400 - margin.top - margin.bottom;

var svg = dropZone.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

dropZone.on("dragover", function () {
    d3.event.preventDefault();
    dropZone.classed("active", true);
});

dropZone.on("dragenter", function () {
    d3.event.preventDefault();
    dropZone.classed("active", true);
});

dropZone.on("dragleave", function () {
    dropZone.classed("active", false);
});

dropZone.on("drop", function () {
    d3.event.stopPropagation();
    d3.event.preventDefault();

    dropZone.classed("active", false);
    dropZone.classed("parsing", true);
    statusPlaceholder.text("Parsing data, drawing chart…");

    var reader = new FileReader();

    reader.onload = function (event) {
        plotChart(event.target.result);
    };

    reader.readAsText(d3.event.dataTransfer.files[0]);
});

var plotChart = function (data) {
    var parsedData = d3.csv.parse(data, function (d) {
        return {
            date: d3.time.format("%Y-%m-%d").parse(d.Date.substring(0, 10)),
            time: d3.time.format("%H:%M:%S").parse(d.Date.substring(11, 19)),
            charge: d.CurrentCapacity / d.MaxCapacity
        }
    });

    var x = d3.time.scale()
        .domain([
            parsedData[0].date,
            d3.time.day.offset(parsedData[parsedData.length - 1].date, 1)
        ])
        .nice(d3.time.day)
        .range([0, width]);

    var y = d3.time.scale()
        .domain([
            d3.time.format("%H:%M:%S").parse("00:00:00"),
            d3.time.format("%H:%M:%S").parse("23:59:59")
        ])
        .nice(d3.time.hour)
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m-%d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.time.format("%H:%M"));

    var columnWidth = width / (d3.time.days(x.domain()[0], x.domain()[1]).length);

    svg.selectAll("rect")
        .data(parsedData)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.date);
        })
        .attr("y", function (d) {
            return y(d.time);
        })
        .attr("width", columnWidth)
        .attr("height", 1)
        .attr("fill", function (d) {
            return colorScale(d.charge);
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("fill", textColor)
        .attr("dx", "-1em")
        .attr("dy", "-0.6em")
        .attr("transform", "rotate(-90)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", textColor);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("x", width)
        .attr("y", height - 6)
        .text("date");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("time of day");

    statusPlaceholder.remove();
};

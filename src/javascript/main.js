var dropZone = d3.select("#dropZone");
var batteryUsageSection = d3.select("#battery-usage");
var batteryUsageGraph = d3.select("#battery-usage-graph");
var batteryCapacitySection = d3.select("#battery-capacity");
var batteryCapacityGraph = d3.select("#battery-capacity-graph");
var statusPlaceholder = d3.select("#userMessage");

var chartWidth = dropZone.style("width").substring(0, dropZone.style("width").length - 2);
var chartHeight = Math.round(chartWidth / 3);
var width = chartWidth - margin.left - margin.right;
var height = (chartHeight > 250 ? chartHeight : minimalChartHeight) - margin.top - margin.bottom;

var batteryUsageSvg = batteryUsageGraph.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var batteryCapacitySvg = batteryCapacityGraph.append("svg")
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
        parsedData = d3.csv.parse(event.target.result, function (d) {
            return {
                date: d3.time.format("%Y-%m-%d").parse(d.Date.substring(0, 10)),
                time: d3.time.format("%H:%M:%S").parse(d.Date.substring(11, 19)),
                charge: d.CurrentCapacity / d.MaxCapacity,
                capacity: d.MaxCapacity / d.DesignCapacity
            }
        });

        dropZone.classed("parsing", false);
        dropZone.classed("done", true);

        plotBatteryUsageChart(parsedData);
        plotBatteryCapacityChart(parsedData);
    };

    reader.readAsText(d3.event.dataTransfer.files[0]);
});

var plotBatteryUsageChart = function (data) {
    var legend = d3.select("#legend")
        .append("ul")
        .attr("class", "list-inline");

    var legendKeys = legend.selectAll("#legend .key")
        .data(colorScale.range());

    var legendKeyWidthPercentage = 100 / colorScale.domain().length;

    var x = d3.time.scale()
        .domain([
            data[0].date,
            d3.time.day.offset(data[data.length - 1].date, 1)
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

    batteryUsageSvg.selectAll("rect")
        .data(data)
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

    batteryUsageSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("fill", textColor)
        .attr("dx", "-1em")
        .attr("dy", "-0.6em")
        .attr("transform", "rotate(-90)");

    batteryUsageSvg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", textColor);

    batteryUsageSvg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("x", width)
        .attr("y", height - 6)
        .text("date");

    batteryUsageSvg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("time of day");

    legendKeys.enter().append("li")
        .attr("class", "key")
        .style("border-top-color", String)
        .style("width", legendKeyWidthPercentage + "%")
        .text(function(d, i) {
            return percentageFormat(colorScale.domain()[i]);
        });

    batteryUsageSection.classed("active", true);
};

var plotBatteryCapacityChart = function (data) {
    var x = d3.time.scale()
        .domain([
            data[0].date,
            d3.time.day.offset(data[data.length - 1].date, 1)
        ])
        .nice(d3.time.day)
        .range([0, width]);

    var y = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
            return d.capacity;
        }))
        .nice()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m-%d"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(percentageFormat);

    var columnWidth = width / (d3.time.days(x.domain()[0], x.domain()[1]).length);

    batteryCapacitySvg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.date);
        })
        .attr("y", function (d) {
            return y(d.capacity);
        })
        .attr("width", columnWidth)
        .attr("height", 1)
        .attr("fill", "#28b");

    batteryCapacitySvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("fill", textColor)
        .attr("dx", "-1em")
        .attr("dy", "-0.6em")
        .attr("transform", "rotate(-90)");

    batteryCapacitySvg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .attr("fill", textColor);

    batteryCapacitySvg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("x", width)
        .attr("y", height - 6)
        .text("date");

    batteryCapacitySvg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("fill", textColor)
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("capacity");

    batteryCapacitySection.classed("active", true);
};

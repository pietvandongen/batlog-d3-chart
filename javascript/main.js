var dataFilePath = "data/example.csv";

console.clear();

var data = d3.csv(dataFilePath, function (d) {
    return {
        Date: d3.time.format("%Y-%m-%d %H:%M:%S").parse(d.Date),
        MaxCapacity: +d.MaxCapacity,
        CurrentCapacity: +d.CurrentCapacity,
        Charge: +d.CurrentCapacity / +d.MaxCapacity
    };
});

console.log(data[0]);
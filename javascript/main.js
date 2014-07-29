var dataFilePath = "/data/example.csv";

console.clear();

var data = d3.csv(
    dataFilePath,
    function (row) {
        return {
            Date: d3.time.format("%Y-%m-%d %H:%M:%S").parse(row.Date),
            MaxCapacity: +row.MaxCapacity,
            CurrentCapacity: +row.CurrentCapacity,
            Charge: +row.CurrentCapacity / +row.MaxCapacity
        }
    },
    function (error, rows) {
        console.log(rows);
    }
);
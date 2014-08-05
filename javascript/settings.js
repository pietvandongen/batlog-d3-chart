var textColor = "#525763";

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

var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
};

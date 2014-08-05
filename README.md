# batlog2-d3-chart

Visualize [batlog][1] data using the [D3.js][2] library.

## Demo

Skip to [the demo page][5] for a demonstration of this project. The result should look something like this:

![example graph](http://pietvandongen.github.io/batlog-d3-chart/images/example.png)

## Requirements

- A [batlog CSV file][4] (alternatively, you can convert a batlog `dat` file using the [batlog2csv][3] script).
- A modern browser that supports drag & drop and SVG.

## Usage

Load the `index.html` page (or use the [demo page][5]) and drop the batlog CSV file into the designated area. A graph of your data will be drawn.

Depending on the size of your log file, system configuration and browser, this can take a while.

## License

Apache License, Version 2.0, see `LICENSE.md`.

[1]: https://github.com/jradavenport/batlog
[2]: http://d3js.org/
[3]: https://github.com/pietvandongen/batlog2csv
[4]: https://github.com/pietvandongen/batlog-python
[5]: http://pietvandongen.github.io/batlog-d3-chart/
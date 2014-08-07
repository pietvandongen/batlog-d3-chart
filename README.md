# batlog2-d3-chart

Visualize [batlog][1] data using the [d3.js][2] library.

## Demo

Skip to [the demo page][5] for a demonstration of this project. You can use your own data file, or [example][6] [data][7]. 

The result should look something like this:

![example graph](http://pietvandongen.github.io/batlog-d3-chart/images/example.png)

## Requirements

- A [batlog CSV file][4] (alternatively, you can convert a batlog `dat` file using the [batlog2csv][3] script).
- A modern browser that supports drag & drop and SVG.

## Usage

Load the `index.html` page (or use the [demo page][5]) and drop the batlog CSV file into the designated area. A graph of your data will be drawn.

Depending on the size of your log file, system configuration and browser, this can take a while.

## Building yourself

### Node.js

In order to build this project's CSS and JavaScript files, you'll need to have [node.js][8] installed on your machine. 

### Dependencies

Once you've installed node.js, browse to the project's root directory and run the following command to install all dependencies:

```bash
npm install
``

### Grunt

Now you're ready to build! This project uses [Grunt][9] to run all its tasks. There are a few tasks defined in the [``GruntFile.js``](GruntFile.js) task definition file, but there is an [alias task][7] available called ``default`` that runs all necessary tasks in the correct order (from the project's root directory again):

```bash
grunt default
```

This will compile and minify all files and put the results in the ``build`` directory.

## License

Apache License, Version 2.0, see `LICENSE.md`.

[1]: https://github.com/jradavenport/batlog
[2]: http://d3js.org/
[3]: https://github.com/pietvandongen/batlog2csv
[4]: https://github.com/pietvandongen/batlog-python
[5]: http://pietvandongen.github.io/batlog-d3-chart/
[6]: https://raw.githubusercontent.com/pietvandongen/batlog-d3-chart/gh-pages/example-data/example.csv
[7]: https://raw.githubusercontent.com/pietvandongen/batlog-d3-chart/gh-pages/example-data/example-large.csv
[8]: http://nodejs.org/
[9]: http://gruntjs.com/
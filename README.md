## Javascript charts library

This library allow to easily draw charts using javascript and Canvas or SVG.

### Types of charts

Chart bars
![egT00](https://raw.github.com/optimisme/javascript-charts/master/captures/egT00.png)

    // ChartBars
    var chart = new ChartBars();
    chart.loadExample();
    this.gapSection = 0;
    chart.paint('graph00SVG');

Chart bars adder
![egT01](https://raw.github.com/optimisme/javascript-charts/master/captures/egT01.png)

    // ChartBarsAdder
    var chart = new ChartBarsAdder();
    chart.data.columnName = ['2007','2008','2009','2010'];
    chart.data.rowName = ['Sells','Purchases','Gifts'];
    chart.data.table = [[23,26,20,32],[6,3,15,14],[12,15,20,18]];
    chart.gapSection = 1.25;
    chart.labels.position = 'middle'; 
    chart.labels.style = 'rgb(256,256,256)';
    chart.paint('graph01SVG');

Chart lines
![egT02](https://raw.github.com/optimisme/javascript-charts/master/captures/egT02.png)

    // ChartLines
    var chart = new ChartLines();
    chart.data.columnName = ['2007','2008','2009','2010'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20,32],[6,-4,15,14]];
    chart.width = 8;
    chart.symbol = 'circle'; // none, circle, square 
    chart.showLine = true;
    chart.labels.position = 'over';
    chart.labels.style = 'rgb(256,256,256)';
    chart.paint('graph02SVG');

Chart lines compact drawing (side by side)
![egT03](https://raw.github.com/optimisme/javascript-charts/master/captures/egT03.png)

    // ChartLines
    var chart = new ChartLines();
    chart.data.columnName = ['2007','2008','2009','2010'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20,32],[6,-4,15,14]];
    chart.width = 8;
    chart.symbol = 'circle'; // none, circle, square 
    chart.showLine = true;
    chart.labels.position = 'over';
    chart.labels.style = 'rgb(256,256,256)';
    chart.xAxis.showStepsFirst=true;
    chart.xAxis.sideBySide = false;
    chart.paint('graph03SVG');

Chart areas
![egT04](https://raw.github.com/optimisme/javascript-charts/master/captures/egT04.png)

    // ChartAreas
    var chart = new ChartAreas();
    chart.data.columnName = ['2007','2008','2009','2010'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20,32],[6,-4,15,14]];
    chart.yAxis.min = -5;
    chart.paint('graph04SVG');

Chart circle
![egT05](https://raw.github.com/optimisme/javascript-charts/master/captures/egT05.png)

    // ChartCircle: if more than one column is provided the computed value is the sum of all columns
    var chart = new ChartCircle();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,10],[4,23]];
    chart.format = 'number'; // 'percentage' or 'number'
    chart.rotation = 45; // #number, 180=half circle
    chart.labels.position = 'top';
    chart.paint('graph05SVG');

Chart circle exploded
![egT06](https://raw.github.com/optimisme/javascript-charts/master/captures/egT06.png)

    // ChartCircle
    var chart = new ChartCircle();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23],[4]];
    chart.legend.show = false;
    chart.legendOnLabel = true;
    chart.labels.position = 1.5; // #number, 1=circle radius
    chart.labels.decimals = 2;
    chart.format = 'percentage'; // 'percentage' or 'number'
    chart.explode = 0.02; //  #number, for example 0.02;
    chart.rotation = 0; // #number, 180=half circle
    chart.paint('graph06SVG');

### Usage examples



## Javascript charts library

This library allows to easily draw charts using javascript, the resulting charts are
drawn optionally on Canvas or SVG.

### Usage

Clone the project with:

git clone https://github.com/optimisme/javascript-charts.git

And open 'chart-examples.html' or 'chart-types.html' with the internet browser.

### Types of charts

#### Chart bars

![egT00](https://raw.github.com/optimisme/javascript-charts/master/captures/egT00.png)

    // ChartBars
    var chart = new ChartBars();
    chart.loadExample();
    this.gapSection = 0;
    chart.paint('graph00SVG');

#### Chart bars adder

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

#### Chart lines

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

#### Chart lines compact drawing (side by side)

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

#### Chart areas

![egT04](https://raw.github.com/optimisme/javascript-charts/master/captures/egT04.png)

    // ChartAreas
    var chart = new ChartAreas();
    chart.data.columnName = ['2007','2008','2009','2010'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20,32],[6,-4,15,14]];
    chart.yAxis.min = -5;
    chart.paint('graph04SVG');

#### Chart circle

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

#### Chart circle exploded

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

#### Simple example

![eg00](https://raw.github.com/optimisme/javascript-charts/master/captures/eg00.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.paint('graph00SVG'); // 'graph00SVG' is the id of the SVG object
    chart.paint('graph00'); // 'graph00' is the id of the canvas object
    // Only one object is necessary, this is just an example of both objects

#### Change background

![eg01](https://raw.github.com/optimisme/javascript-charts/master/captures/eg01.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.draw.background = 'rgb(200,200,200)';
    chart.paint('graph01SVG');

#### Swap columns and rows

![eg02](https://raw.github.com/optimisme/javascript-charts/master/captures/eg02.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.data.vertical =  true;
    chart.paint('graph02SVG');

#### Modify frame size

![eg03](https://raw.github.com/optimisme/javascript-charts/master/captures/eg03.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.draw.x = 50;
    chart.draw.y = -200; // Negative value means relative to top
    chart.draw.width =  -50; // Negative value means relative to right
    chart.draw.height =  -50;
    chart.legend.width = -75;
    chart.paint('graph03SVG');

![eg03b](https://raw.github.com/optimisme/javascript-charts/master/captures/eg03b.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.draw.x = 50;
    chart.draw.y = 50; 
    chart.draw.width = 325; 
    chart.draw.height =  200;
    chart.paint('graph03bSVG');

#### Modify chart title

![eg04](https://raw.github.com/optimisme/javascript-charts/master/captures/eg04.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.title.show = true;
    chart.title.text = "New chart title";
    chart.title.font = 'Bold 18px Arial';
    chart.title.style = 'rgb(60,108,157)';
    chart.paint('graph04SVG');

#### Modify chart data

![eg05](https://raw.github.com/optimisme/javascript-charts/master/captures/eg05.png)

    var chart = new ChartBars();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20],[12,15,14]];
    chart.paint('graph05SVG');

#### Modify chart legend

![eg06](https://raw.github.com/optimisme/javascript-charts/master/captures/eg06.png)

    var chart = new ChartBars();
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23],[12]];
    chart.gapBars = 0.2;
    chart.draw.y = 75;
    chart.draw.width = -50;
    chart.xAxis.showLabels = false;
    chart.yAxis.min = 0; 
    chart.legend.x = 50;
    chart.legend.y = 35;
    chart.legend.width =  -50; // Negative means the canvas width less that value
    chart.legend.show = true;
    chart.legend.gap = 35;
    chart.legend.font = '14px Arial';
    chart.legend.style = 'rgb(60,108,157)';
    chart.paint('graph06SVG');

![eg07](https://raw.github.com/optimisme/javascript-charts/master/captures/eg07.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.legend.show = false;
    chart.draw.width = -50; // Negative means the drawing canvas width-50
    chart.paint('graph07SVG');

![eg07b](https://raw.github.com/optimisme/javascript-charts/master/captures/eg07b.png)

    var chart = new ChartBars();
    chart.colors = 'blue';
    chart.draw.x = 50;
    chart.draw.y = -200; // Negative value means relative to top
    chart.draw.width =  -50; // Negative value means relative to right
    chart.draw.height =  -50;
    chart.gapBars = 0.2;
    chart.xAxis.showLabels = false;
    chart.data.rowName = ['A','YES','TOP','B','HOUSE GARDEN GRASS','FLOWERS.','WATER'];
    chart.data.table = [[8],[7],[6],[5],[4],[3],[2]];
    chart.legend.x= 75;
    chart.legend.y= 75;
    chart.legend.width = -75;
    chart.legend.direction = "down";
    chart.paint('graph07bSVG');

#### Modify colors

![eg08](https://raw.github.com/optimisme/javascript-charts/master/captures/eg08.png)

    // Using a predefined palette
    var chart = new ChartCircle();
    chart.data.rowName = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];
    chart.data.table = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10],[10]];
    chart.colors = 'bright'; // 'bright','corrugated','fun','portfolio','silk','watermark','blue','brown','green','gray'
    chart.legend.gap = 12;
    chart.paint('graph08SVG');

![eg09](https://raw.github.com/optimisme/javascript-charts/master/captures/eg09.png)

    // Using a colors array
    var chart = new ChartBars();
    chart.loadExample();
    chart.colors = ['rgb(150,0,0)','#00aa00'];
    chart.paint('graph09SVG');

#### Modify labels

![eg10](https://raw.github.com/optimisme/javascript-charts/master/captures/eg10.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.labels.show = true;
    chart.labels.position = 'top'; 
    // 'top', 'over', 'middle', 'bottom'
    chart.labels.font = '14px Arial';
    chart.labels.style = 'data';
    chart.paint('graph10SVG');

![eg11](https://raw.github.com/optimisme/javascript-charts/master/captures/eg11.png)

    var chart = new ChartBars();
    chart.loadExample();
    chart.labels.show = true;
    chart.labels.position = 'bottom'; 
    chart.labels.font = '10px Arial';
    chart.labels.style = 'rgb(256,256,256)'; 
    chart.labels.decimals = 1;
    // 'data' or color value
    chart.paint('graph11SVG');

#### Modify chart axis

![eg12a](https://raw.github.com/optimisme/javascript-charts/master/captures/eg12a.png)

    // X axis:
    var chart = new ChartBars();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20],[4,15,14]];
    chart.xAxis.showAxis = true;
    chart.xAxis.showLabels = true;
    chart.xAxis.showSteps = true;
    chart.xAxis.showStepsFirst = true;
    chart.xAxis.font = '12px Arial';
    chart.xAxis.style = 'rgb(183,47,45)';
    chart.xAxis.rotation = -35; // #number lower than 0, for example -45
    chart.xAxis.axisStyle = 'rgb(183,47,45)';
    chart.xAxis.axisWidth = 3;
    chart.xAxis.stepStyle = 'rgb(200,200,0)';
    chart.xAxis.stepWidth = 2;
    chart.yAxis.min = 0;
    chart.paint('graph12aSVG');

![eg12b](https://raw.github.com/optimisme/javascript-charts/master/captures/eg12b.png)

    // Y axis:
    var chart = new ChartBars();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20],[4,15,14]];
    chart.yAxis.showAxis = true;
    chart.yAxis.showLabels = true;
    chart.yAxis.showSteps = true;
    chart.yAxis.font = '16px Arial';        
    chart.yAxis.style = 'rgb(183,47,45)';
    chart.yAxis.rotation = 20; // #number lower than 0, for example -45
    chart.yAxis.axisStyle = 'rgb(183,47,45)';
    chart.yAxis.stepStyle = 'rgb(253,77,75)';
    chart.yAxis.axisWidth = 3;
    chart.yAxis.stepWidth = 2;
    chart.yAxis.showStepZero = false;
    chart.yAxis.showStepZeroLabel = false;
    chart.yAxis.min = 0; // auto, or #number
    chart.yAxis.max = 30; // auto, or #number
    chart.yAxis.steps = 10; // auto, or #number >2
    chart.yAxis.format = 'number'; // number, percentage
    chart.yAxis.decimals = 2; // #number of decimals at vertical axis
    chart.paint('graph12bSVG');

![eg12c](https://raw.github.com/optimisme/javascript-charts/master/captures/eg12c.png)

    // Y axis, 'zero' line:
    var chart = new ChartBars();
    chart.data.columnName = ['2007','2008','2009'];
    chart.data.rowName = ['Sells','Purchases'];
    chart.data.table = [[23,26,20],[-4,15,14]];
    chart.xAxis.showAxis = false;
    chart.xAxis.rotation = 35;
    chart.yAxis.showAxis = false;
    chart.yAxis.showLabels = false;
    chart.yAxis.showStepZero = true;
    chart.yAxis.showStepZeroLabel = true;
    chart.yAxis.stepZeroStyle = 'rgb(200,0,0)';
    chart.yAxis.stepZeroWidth = 2;
    chart.legend.x=-125;
    chart.legend.y=80;
    chart.paint('graph12cSVG');

#### Interaction

![egInt](https://raw.github.com/optimisme/javascript-charts/master/captures/egInt.png)

    // ChartBars
    var chart = new ChartLines();
    chart.loadExample();
    chart.symbol = 'square';
    chart.width = 10;
    chart.labels.position = 'over';
    chart.labels.style = 'rgb(256,256,256)';
    chart.action.actionClick = "actionClickFunction";
    chart.action.actionMove = "actionMoveFunction";
    chart.action.actionOver = "actionOverFunction";
    chart.action.actionOut = "actionOutFunction";
    chart.paint('graphIntSVG');

    actionClickFunction = function(event,position,type) { 
        alert("Calls the defined function\nwith the table position as a parameter,\n\nRow: "+position[0]+"\nColumn: "+position[1]); 
    }
    actionMoveFunction = function(event,position,type) {
        var obj = document.getElementById('graphIntLabel');
        obj.style.left = document.body.scrollLeft+event.clientX+15+"px";
        obj.style.top = document.body.scrollTop+event.clientY+15+"px";

        var row = position[0];
        var col=position[1];
        var text= "Row: "+row;
        if(position.length==2) text += " Column: "+col+" @"+chart.data.getField(row,col);
        if (type=='legend') text = "Legend: "+chart.data.getRowName(row);
        obj.innerHTML=text;
    }
    actionOverFunction = function(event,position,type) {
        var obj = document.getElementById('graphIntLabel'); obj.style.visibility = 'visible';
    }
    actionOutFunction = function(event,position,type) {
        var obj = document.getElementById('graphIntLabel'); obj.style.visibility = 'hidden';
    }
























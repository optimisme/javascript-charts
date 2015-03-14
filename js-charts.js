/*
<OWNER> : Albert Palacios
<YEAR> : 2012

In the original BSD license, both occurrences of the phrase "COPYRIGHT HOLDERS AND CONTRIBUTORS" in the disclaimer read "REGENTS AND CONTRIBUTORS".

Here is the license template:

Copyright (c) 2012, Albert Palacios
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*

    Chart                  - base chart object
    -------------------------------------------------------
    ChartAction            - base object for interactive actions
    -------------------------------------------------------
    ChartTitle             - title object
    -------------------------------------------------------
    ChartData              - data object (table and names)
    -------------------------------------------------------
    ChartLegend            - legend configuration
    -------------------------------------------------------
    ChartLabels            - labels configuration
    -------------------------------------------------------
    ChartAxis              - basic axis parameters
    -------------------------------------------------------
    ChartAxisRang          - axis rang of values (y)       > Extends from 'ChartAxis'
    -------------------------------------------------------
    ChartAxisSections      - axis for sections (x)         > Extends from 'ChartAxis'
    -------------------------------------------------------
    ChartDrawTools         - utilities to draw the chart
    -------------------------------------------------------
    ChartDrawToolsWithRangAndSection - utilities to draw 'WithAxes'  > Extends from 'ChartDrawTools'
    -------------------------------------------------------
    ChartWithRangAndSection          - base for 'WithAxes' charts    > Extends from 'Chart'
    -------------------------------------------------------
    ChartBars              - base for 'Bars' charts        > Extends from 'ChartWithRangAndSection' > Extends from 'Chart'
    -------------------------------------------------------
    ChartBarsAdder         - base for 'BarsAdder' charts   > Extends from 'ChartWithRangAndSection' > Extends from 'Chart'
    -------------------------------------------------------
    ChartLines             - base for 'ChartLines' charts  > Extends from 'ChartWithRangAndSection' > Extends from 'Chart'
    -------------------------------------------------------
    ChartAreas             - base for 'ChartAreas' charts  > Extends from 'ChartWithRangAndSection' > Extends from 'Chart'
    -------------------------------------------------------
    ChartCircle            - base for 'ChartCircle' charts > Extends from 'Chart'
    -----------------------------------------------------------
*/

var svgNS = "http://www.w3.org/2000/svg";

Chart = function() {

    this.title = new ChartTitle();
    this.data = new ChartData();
    this.legend = new ChartLegend();
    this.labels = new ChartLabels();
    this.colors = 'spectrum'; 
        // text : 'spectrum','bright','corrugated','fun','portfolio','silk','watermark','blue','brown','grey','green'
        // or array of colors, example: ['rgb(0,0,0)','rgb(100,100,100)'] 
    this.action = new ChartAction();
}

Chart.prototype.loadExample = function() {

    this.draw.background = 'rgb(256,256,256)';
    this.draw.x = 50;
    this.draw.y = 50;
    this.draw.width = -155;
    this.draw.height = -50;
    this.legend.x = -145;
    this.legend.y = 50;
    this.legend.width = 0;
    this.legend.direction = "up";
    this.legend.show = true;
    this.legend.gap = 20;
    this.legend.showColors = true;
    this.title = new ChartTitle();
    this.data.columnName = new Array(4);
    for (x=0; x<4; x++) this.data.columnName[x] = "Column "+x;
    this.data.rowName = new Array(2);
    for (x=0; x<2; x++) this.data.rowName[x] = "Row name "+x;
    this.data.table = [[17,26,56,93],[55,43,70,58]];
    this.yAxis.min = 0;
}

Chart.prototype.getColorsArray = function(baseColors) {

    var colorsLength = baseColors.length;
    var colorsArray=new Array(colorsLength*3);
    
    for (y=0;y<(baseColors.length);y++) colorsArray[y] = 'rgb('+baseColors[y][0]+','+baseColors[y][1]+','+baseColors[y][2]+')';
    for (y=(baseColors.length);y<(baseColors.length*3);y++) {

        var step = parseInt(y/(baseColors.length));
        var brightness= 1 + 0.28*step;
        var saturationChange=1 - 0.32*step;

        var rr=parseInt(baseColors[y%colorsLength][0]*brightness);
        var rg=parseInt(baseColors[y%colorsLength][1]*brightness);
        var rb=parseInt(baseColors[y%colorsLength][2]*brightness);
        
        var saturation=Math.sqrt(rr*rr*0.299+rg*rg*0.587+rb*rb*0.114);
        
        rr=parseInt(saturation+(rr-saturation)*saturationChange);
        rg=parseInt(saturation+(rg-saturation)*saturationChange);
        rb=parseInt(saturation+(rb-saturation)*saturationChange); 
        
        colorsArray[y] = 'rgb('+rr+','+rg+','+rb+')';
    }
    return colorsArray;
}

Chart.prototype.getColor = function(r) {

    var colorsArray = new Array();
    if (typeof this.colors === 'string') {
    
        var baseColors = [[48,86,145],[97,150,62],[228,163,41],[183,47,45],[108,60,145]];  // 'spectrum'
        switch (this.colors) {
            case 'bright':        baseColors = [[57,156,222],[107,168,28],[225,215,0],[220,136,32],[211,90,65],[134,92,191]]; break;
            case 'corrugated':    baseColors = [[81,97,115],[47,58,61],[64,95,72],[92,75,75],[124,84,57],[116,133,126]]; break;
            case 'fun':            baseColors = [[60,121,188],[86,145,0],[230,120,0],[218,65,47],[168,34,103],[139,63,160]]; break;
            case 'portfolio':    baseColors = [[59,81,127],[67,95,65],[121,91,50],[127,65,64],[127,65,112]]; break;
            case 'silk':        baseColors = [[54,65,96],[87,106,156],[127,133,69],[140,116,83],[169,129,127],[177,82,69]]; break;
            case 'watermark':    baseColors = [[93,90,96],[89,100,117],[111,111,81],[150,126,55],[152,108,103],[115,91,112]]; break;
            case 'blue':        baseColors = [[44,93,163],[116,144,197],[175,203,230],[67,106,166],[153,191,231],[46,76,114]]; break;
            case 'brown':        baseColors = [[128,83,46],[170,142,111],[214,202,164],[110,87,67],[199,184,133]]; break;
            case 'green':        baseColors = [[24,93,34],[93,141,77],[174,204,145],[58,101,58],[149,184,111],[54,100,37]]; break;
            case 'gray':        baseColors = []; break;
            default:
                break;
        }
        this.colors = this.getColorsArray(baseColors);
    }

    if (this.colors.length > r) return this.colors[r];
    else {
        var value = parseInt(255/(this.data.getRowsLength()-(this.colors.length-2)))*(r-(this.colors.length-2)); 
        return color = 'rgb('+value+','+value+','+value+')'; 
    }
}

ChartAction = function() {

    this.actionClick = null;
    this.actionMove = null;
    this.actionOver = null;
    this.actionOut = null;
    this.dataPosition = [-1,-1];
    this.type = '';
}

ChartTitle = function() {

    this.show = true;
    this.text = 'Chart';
    this.font = 'Bold 14px Arial';
    this.style = 'rgb(0,0,0)';
}

ChartData = function() {

    this.columnName = new Array();
    this.rowName = new Array();
    this.table = new Array();
    this.vertical = false; // if true, swaped columns&rows
}

ChartData.prototype.getColumnName = function(r) {

    if(!this.vertical)
        if (this.columnName.length > r) return this.columnName[r];
        else return "Col "+r;
    else
        if (this.rowName.length > r) return this.rowName[r];
        else return "Row "+r;
}

ChartData.prototype.getRowName = function(r) {

    if(!this.vertical)
        if (this.rowName.length > r) return this.rowName[r];
        else return "Row "+r;
    else
        if (this.columnName.length > r) return this.columnName[r];
        else return "Col "+r;
}

ChartData.prototype.getColumnsLength = function() {

    if (!this.vertical)
        return this.table[0].length;
    else 
        return this.table.length;
}

ChartData.prototype.getRowsLength = function() {

    if (!this.vertical)
        return this.table.length;
    else 
        return this.table[0].length;
}

ChartData.prototype.getField = function(row,column) {

    if (!this.vertical)
        return this.table[row][column];
    else 
        return this.table[column][row];
}

ChartLegend = function() {

    this.show = true;
    this.x = -145;
    this.y = 50;
    this.width = 0;
    this.direction = "up"; // 'up' or 'down'
    this.gap = 20;
    this.font = '12px Arial';
    this.style = 'rgb(0,0,0)';
    this.showColors = true;
}

ChartLabels = function() {

    this.show = true;
    this.position = 'top'; // top, over, middle, bottom. Or "#number"
    this.font = '12px Arial';
  this.style = 'rgb(0,0,0)'; // 'data' or color value
  this.rotation = 0; // only for ChartLines with values 0 (default) or -90
    this.decimals = 0;
}

ChartAxis = function() {

    this.showAxis = true;
    this.showLabels = true;
    this.showSteps = true;
    
    this.font = '12px Arial';
    this.style = 'rgb(0,0,0)';
    this.rotation = 0; // #number < 0, for example -45
    this.axisStyle = 'rgb(0,0,0)';
    this.stepStyle = 'rgb(200,200,200)';
    this.axisWidth = 2;
    this.stepWidth = 1;
}

ChartAxisRang = function() {

    ChartAxis.call(this);
    
    this.showStepZero = false;
    this.showStepZeroLabel = false;

    this.min = 'auto'; // auto, or #number
    this.max = 'auto'; // auto, or #number
    this.steps = 'auto'; // auto, or #number >2
    this.format = 'number'; // number, percentage
    this.decimals = 1; // #number of decimals at vertical axis
    
    this.stepZeroStyle = 'rgb(100,100,100)';
    this.stepZeroWidth = 1;
}

ChartAxisRang.prototype = new ChartAxis();
ChartAxisRang.prototype.constructor = ChartAxisRang;

ChartAxisRang.prototype.getMax = function(chart,global) {

    if (this.max!='auto') return this.max;

    if (global) {
    // Get maximum value
    
        var value = chart.data.table[0][0];;
        for (x=0; x<chart.data.table.length; x++) 
            for (y=0; y<chart.data.table[x].length; y++) 
                if (chart.data.table[x][y]>value) value=chart.data.table[x][y];
        
        return value;
        
    } else {
    // Get maximum sum of columns (or rows if vertical)
    
        var value = chart.data.table[0][0];
        for (x=0; x<chart.data.getColumnsLength(); x++) {
            var add = 0;
            for (y=0; y<chart.data.getRowsLength(); y++) {
                add = add + Math.abs(chart.data.getField(y,x));
            }
            if (value < add) value = add;
        }
        return value;
    }
}

ChartAxisRang.prototype.getMin = function(chart) {

    if (this.min!='auto') return this.min;

    // Get minimum value
    var value = chart.data.table[0][0];;
    for (x=0; x<chart.data.table.length; x++) 
        for (y=0; y<chart.data.table[x].length; y++) 
            if (chart.data.table[x][y]<value) value=chart.data.table[x][y];
                
    return value;
}

ChartAxisRang.prototype.getSteps = function() {

    if (this.steps=='auto') return 4;
    else return this.steps;
}

ChartAxisSections = function() {

    ChartAxis.call(this);
    this.sideBySide = true;
    
    this.showStepsFirst = false;
}

ChartAxisSections.prototype = new ChartAxis();
ChartAxisSections.prototype.constructor = ChartAxisSections;

ChartDrawTools = function() {

    this.background = null; // null or color: rgb('256','256,'256')
    this.x = 50;
    this.y = 50;
    this.width = -155; // negative means from the 'right' edge
    this.height = -50; // negative means from the 'bottom' edge

    this.obj = null;
    this.objType = "";
    this.ctx = null;
    this.canvasW = 0;
    this.canvasH = 0;
    this.graphX0 = 0;
    this.graphY0 = 0;
    this.graphX1 = 0;
    this.graphY1 = 0;
}

ChartDrawTools.prototype.getContext = function(canvas) {
console.log(document.getElementById(canvas));
    this.obj = document.getElementById(canvas);
    this.objType = ""+document.getElementById(canvas).constructor;
    
    if (this.objType.indexOf("SVG")>=0) {
    
        this.objType = "SVG";
        this.canvasW = parseInt(window.getComputedStyle(this.obj).width,10);
        this.canvasH = parseInt(window.getComputedStyle(this.obj).height,10);
    }
    
    if (this.objType.indexOf("Canvas")>=0) {
    
        this.objType = "Canvas";
        this.ctx = this.obj.getContext('2d');
        this.canvasW = this.obj.width;
        this.canvasH = this.obj.height;
    }
}

ChartDrawTools.prototype.getPositions = function(chart) {

    this.graphX0 = (this.x >= 0) ? this.x : this.canvasW+this.x;
    this.graphY0 = (this.y >= 0) ? this.canvasH-this.y : -this.y;
    this.graphX1 = (this.width >= 0) ? this.x+this.width : this.canvasW+this.width;
    this.graphY1 = (this.height >= 0) ? this.canvasH-this.y-this.height : -this.height;    
}

ChartDrawTools.prototype.paintBackground = function() {

    if (this.background!=null) {
    
        this.drawRect(0,0,this.canvasW,this.canvasH,this.background,null,null);
        
    } else {
    
        this.drawClear();
    }
}

ChartDrawTools.prototype.paintTitle = function(chart) {

    if (chart.title.show) {

        this.drawText(chart.title.text,this.graphX0+((this.graphX1-this.graphX0)/2),this.graphY1/2,chart.title.style,chart.title.font,'center','middle',0);
    }
}

ChartDrawTools.prototype.paintLegend = function(chart,action) {

    var direction = 1;
    if (chart.legend.direction=="down") direction = -1;

    if (chart.legend.show) {

        // Set original position
        var xLegend = (chart.legend.x >= 0) ? chart.legend.x : chart.draw.canvasW+chart.legend.x;
        var yLegend = (chart.legend.y >= 0) ? chart.draw.canvasH-chart.legend.y : -chart.legend.y;
        var xOrigin = xLegend;
        var xEnd = (chart.legend.width >= 0) ? chart.legend.x + chart.legend.width : chart.draw.canvasW+chart.legend.width; 
        var legendWidth = xEnd - xOrigin;

        // Get text sizes
        var texts = new Array();
        var textSizes = new Array();
        var textColors = new Array();
        for(r=0; r<chart.data.getRowsLength(); r++) {
        
            var actualRow = r;
        
            var text = chart.data.getRowName(actualRow);
            var textWidth = this.drawTextWidth(text,chart.legend.style,chart.legend.font);
            
            texts.push(text);
            textSizes.push(textWidth+chart.legend.gap+15);
            textColors.push(chart.getColor(actualRow));
        }
        
        var columnsMaxWidth = null;
        var lineWidth = 0;
        var columns = texts.length;
        var columnsFit = false;
        while (!columnsFit) {
        
            // Get maximum columns length
            columnsMaxWidth = new Array();
            var columnCounter = 0;
            for (x=0;x<texts.length;x++) {
            
                var value = textSizes[x];
                if (x<columns) columnsMaxWidth.push(value);
                else {
                
                    if (columnsMaxWidth[columnCounter] < value) columnsMaxWidth[columnCounter] = value;
                }
                columnCounter++;
                if (columnCounter>=columns) columnCounter=0;
            }
            
            // Get legend width with that number of columns
            lineWidth = 0;
            for (x=0;x<columns;x++) {
            
                lineWidth += columnsMaxWidth[x];
            }
            lineWidth -= chart.legend.gap;
            if ((lineWidth < legendWidth) || (columns<2)) columnsFit = true;
            else columns--;
        }
        
        // Get spacing between columns to center "empty" lateral space
        var columnsSpacing = 0;
        if (lineWidth < legendWidth) {
        
            columnsSpacing = (legendWidth - lineWidth) / (columns+1);
        }

        // Get column drawing positions
        var columnPosition = columnsSpacing;
        var columnsX = new Array();
        for (x=0;x<columns;x++) {
        
            columnsX.push((xOrigin + columnPosition));
            columnPosition += columnsMaxWidth[x] + columnsSpacing;
        }

        // Draw
        var columnCounter = 0;
        for (x=0;x<texts.length;x++) {
        
            if (action!=null) {
                action.type = 'legend';
                action.dataPosition = x;
            }
        
            xLegend = columnsX[columnCounter];

            this.drawRect(xLegend,yLegend-5,10,10,textColors[x],null,null,action);                        
            this.drawText(texts[x],xLegend+15,yLegend,chart.legend.style,chart.legend.font,'start','middle',0,action);
        
            columnCounter++;
            if (columnCounter==columns) {
            
                columnCounter=0;
                yLegend -= direction*chart.legend.gap;
            }
        }
    }
}

ChartDrawTools.prototype.paintAxisX = function(chart) {

    // TODO: Adapt this to accept 'AxisX' rangs if necessary

    for (t=0; t<chart.data.getColumnsLength(); t++) {

        var xPosition=this.graphX0+this.sectionDist*t+this.sectionHalf;

        if (chart.xAxis.showLabels) {

            var align='center';
            if (chart.xAxis.sideBySide) {
            
                if (t==0) align='left';
                if (t==(chart.data.getColumnsLength()-1)) align='right';
            }                
            var baseLine='top';
            var fill=chart.xAxis.style;
            var font=chart.xAxis.font;
            var yPosition=this.graphY0+5;
            if (chart.xAxis.rotation!=0) {
                baseLine='middle';
                if (chart.xAxis.rotation<0) align='right';
                else align='left';
            }
            
            this.drawText(chart.data.getColumnName(t),xPosition,yPosition,fill,font,align,baseLine,chart.xAxis.rotation);
        }
        
        if ((chart.xAxis.showSteps && t!=0) || (chart.xAxis.showSteps && t==0 && chart.xAxis.showStepsFirst)) {
            
            this.drawLine(xPosition,this.graphY1,xPosition,this.graphY0,chart.xAxis.stepStyle,chart.xAxis.stepWidth);
        }
    }

    if (chart.xAxis.showAxis) {
    
        this.drawLine(this.graphX0,this.graphY0,this.graphX1,this.graphY0,chart.xAxis.axisStyle,chart.xAxis.axisWidth);
    }
}

ChartDrawTools.prototype.paintAxisY = function(chart,global) {

    // TODO: Adapt this to accept 'AxisY' sections if necessary
    
    yAxisValue = chart.yAxis.getMax(chart,global) - chart.yAxis.getMin(chart);
    distLimits = parseInt((chart.draw.graphY1-chart.draw.graphY0)/chart.yAxis.getSteps());

    for (l=0; l<=chart.yAxis.getSteps(); l++) {
        
        var limitValue = chart.yAxis.getMin(chart) + ((yAxisValue/chart.yAxis.getSteps())*l);
        
        var xPosition=chart.draw.graphX0-5;
        var yPosition=chart.draw.graphY0+distLimits*l;
        
        if (chart.yAxis.showLabels) {

            var align='end';        
            var baseLine='middle';
            var fill=chart.yAxis.style;
            var font=chart.yAxis.font;

            this.drawText(limitValue.toFixed(chart.yAxis.decimals),xPosition,yPosition,fill,font,align,baseLine,chart.yAxis.rotation);
        }        

        if (chart.yAxis.showSteps) {
            
            this.drawLine(chart.draw.graphX0,chart.draw.graphY0+distLimits*l,chart.draw.graphX1,chart.draw.graphY0+distLimits*l,chart.yAxis.stepStyle,chart.yAxis.stepWidth);
        }
    }
    
    if (chart.yAxis.showStepZero && chart.draw.graphY0 >= (chart.draw.yRelationZero+chart.draw.graphY0) && chart.draw.graphY1 <= (chart.draw.yRelationZero+chart.draw.graphY0)) {
        
        if (chart.yAxis.showStepZeroLabel) {
        
            var xPosition=chart.draw.graphX0-5;
            var yPosition=chart.draw.graphY0+chart.draw.yRelationZero;
            
            var align='end';        
            var baseLine='middle';
            var fill=chart.yAxis.style;
            var font=chart.yAxis.font;

            this.drawText(0,xPosition,yPosition,fill,font,align,baseLine,chart.yAxis.rotation);
        }
        
        this.drawLine(chart.draw.graphX0,chart.draw.graphY0+chart.draw.yRelationZero,chart.draw.graphX1,chart.draw.graphY0+chart.draw.yRelationZero,chart.yAxis.stepZeroStyle,chart.yAxis.stepZeroWidth);
    }
    
    if (chart.yAxis.showAxis) {
        
        this.drawLine(chart.draw.graphX0,chart.draw.graphY0,chart.draw.graphX0,chart.draw.graphY1,chart.yAxis.axisStyle,chart.yAxis.axisWidth);
    }
}

ChartDrawTools.prototype.paintLabelValue = function(value,chart,color,xCenter,yPosition,align,baseLine,rotation,action) {
    
    var fill = color;
    if (chart.labels.style!='data') fill = chart.labels.style;
    var font = chart.labels.font;
    this.drawText(value.toFixed(chart.labels.decimals),xCenter,yPosition,fill,font,align,baseLine,rotation,action);
}

ChartDrawTools.prototype.paintLabelText = function(startText,value,endText,chart,color,xCenter,yPosition,align,baseLine,rotation,action) {

    var fill = color;
    if (chart.labels.style!='data') fill = chart.labels.style;
    var font = chart.labels.font;
    this.drawText(startText+""+value.toFixed(chart.labels.decimals)+""+endText,xCenter,yPosition,fill,font,align,baseLine,rotation,action);
}

ChartDrawTools.prototype.setAction = function(obj,action) {

    if (action==null) return;

    if(action.actionClick!=null) {
        
        obj.style.cursor = "pointer";
        var clickCall = new String(action.actionClick+"(e,["+action.dataPosition+"],'"+action.type+"');");
        obj.addEventListener("click",function (e) { var f = new Function("e",clickCall); f(e); },false);
    }
    if(action.actionMove!=null) {
        
        var moveCall = new String(action.actionMove+"(e,["+action.dataPosition+"],'"+action.type+"');");
        obj.addEventListener("mousemove",function (e) { var f = new Function("e",moveCall); f(e); },false);
    }
    if(action.actionOver!=null) {
        
        var overCall = new String(action.actionOver+"(e,["+action.dataPosition+"],'"+action.type+"');");
        obj.addEventListener("mouseover",function (e) { var f = new Function("e",overCall); f(e); },false);
    }
    if(action.actionOut!=null) {
        
        var outCall = new String(action.actionOut+"(e,["+action.dataPosition+"],'"+action.type+"');");
        obj.addEventListener("mouseout",function (e) { var f = new Function("e",outCall); f(e); },false);
    }
}

ChartDrawTools.prototype.drawArc = function(cx,cy,r,start,end,fill,strokeStyle,strokeWidth,action) {

    var arcStartX = cx + r * Math.cos(start);
    var arcStartY = cy + r * Math.sin(start);
    var arcEndX = cx + r * Math.cos(end);
    var arcEndY = cy + r * Math.sin(end);

    if (this.objType == "SVG") {

        svg = this.obj;

        var obj = document.createElementNS(svgNS, "path");
        if (fill!=null) obj.style.fill = fill;
        if (strokeStyle!=null) obj.style.stroke = strokeStyle;
        if (strokeWidth!=null) obj.style.strokeWidth = strokeWidth;    

        var largeFlag = "0";
        var swipeFlag = "1";
        var angleDiff = end-start;
        if (angleDiff > Math.PI) largeFlag = "1"; // ClockWise (if not, apply swipeFlag)
        if (angleDiff >= 2*Math.PI) {
            // If it is a full circle, use 'circle' instead of 'path'
            this.drawCircle(cx,cy,r,fill,strokeStyle,strokeWidth,action);
            return; 
        }

        obj.setAttribute( "d", "M"+cx+","+cy+" L"+arcStartX+","+arcStartY+" A"+r+","+r+" 0 "+largeFlag+","+swipeFlag+" "+arcEndX+","+arcEndY+" L"+cx+","+cy+"" );
        obj.setAttribute( "r", r+"px" );
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
    
        if (fill!=null) {
        
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(cx,cy,r,start,end);
            ctx.lineTo(cx,cy);
            ctx.fill();
        }
        
        if (strokeStyle!=null) {

            ctx.strokeStyle = strokeStyle;
            if (strokeWidth!=null) ctx.lineWidth = strokeWidth;
            ctx.beginPath();
            ctx.moveTo(cx,cy);
            ctx.lineTo(arcStartX,arcStartY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx,cy);
            ctx.arc(cx,cy,r,start,end);
            ctx.lineTo(cx,cy);
            ctx.stroke();
        }
    }
}

ChartDrawTools.prototype.drawCircle = function(cx,cy,r,fill,strokeStyle,strokeWidth,action) {

    if (this.objType == "SVG") {

        svg = this.obj;

        if (r<0) { r = -r; }

        var obj = document.createElementNS(svgNS, "circle");
        if (fill!=null) obj.style.fill = fill;
        if (strokeStyle!=null) obj.style.stroke = strokeStyle;
        if (strokeWidth!=null) obj.style.strokeWidth = strokeWidth;        
        obj.setAttribute( "cx", cx+"px" );
        obj.setAttribute( "cy", cy+"px" );
        obj.setAttribute( "r", r+"px" );
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
    
        if (fill!=null) {
        
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(cx,cy,r,0,2*Math.PI);
            ctx.fill();
        }
        
        if (strokeStyle!=null) {

            ctx.strokeStyle = strokeStyle;
            if (strokeWidth!=null) ctx.lineWidth = strokeWidth;
            ctx.beginPath();
            ctx.arc(cx,cy,r,0,2*Math.PI);
            ctx.stroke();
        }
    }
}

ChartDrawTools.prototype.drawClear = function() {

    if (this.objType == "SVG"){
    
        svg = this.obj;
        
        while (svg.firstChild) svg.removeChild(this.obj.firstChild);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
    
        ctx.clearRect(0,0,this.canvasW,this.canvasH);
    }
}

ChartDrawTools.prototype.drawLine = function(x1,y1,x2,y2,strokeStyle,strokeWidth,action) {

    if (this.objType == "SVG") {

        svg = this.obj;

        var obj = document.createElementNS(svgNS, "line");
        if (strokeStyle!=null) obj.style.stroke = strokeStyle;
        if (strokeWidth!=null) obj.style.strokeWidth = strokeWidth;        
        obj.setAttribute( "x1", x1+"px" );
        obj.setAttribute( "y1", y1+"px" );
        obj.setAttribute( "x2", x2+"px" );
        obj.setAttribute( "y2", y2+"px" );
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;

        ctx.beginPath();
        if (strokeStyle!=null) ctx.strokeStyle = strokeStyle;
        if (strokeWidth!=null) ctx.lineWidth = strokeWidth;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }
}

ChartDrawTools.prototype.drawPath = function(path,fill,strokeStyle,strokeWidth,close,action) {

    if (this.objType == "SVG") {

        svg = this.obj;

        svgPath = "M"+path[0][0]+","+path[0][1];
        for (t=1; t<path.length; t++) svgPath += " L"+path[t][0]+","+path[t][1];
        if (close) svgPath += " L"+path[0][0]+","+path[0][1];

        var obj = document.createElementNS(svgNS, "path");
        if (fill!=null) obj.style.fill = fill;
        else obj.style.fill = 'none';
        if (strokeStyle!=null) obj.style.stroke = strokeStyle;
        if (strokeWidth!=null) obj.style.strokeWidth = strokeWidth;        
        obj.setAttribute( "d", svgPath );
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
        
        if (fill!=null) ctx.fillStyle = fill;
        if (strokeStyle!=null) ctx.strokeStyle = strokeStyle;
        if (strokeWidth!=null) ctx.lineWidth = strokeWidth;
        
        for (t=0; t<path.length; t++) {
        
            if (t==0) {
            
                ctx.beginPath();
                ctx.moveTo(path[t][0],path[t][1]);
                
            } else if (t==path.length-1) {
            
                ctx.lineTo(path[t][0],path[t][1]);
                if (close) ctx.lineTo(path[0][0],path[0][1]);
                
                if (fill!=null) ctx.fill();
                if (strokeStyle!=null) ctx.stroke();
            
            } else ctx.lineTo(path[t][0],path[t][1]);
        }
    }
}

ChartDrawTools.prototype.drawRect = function(x,y,width,height,fill,strokeStyle,strokeWidth,action) {

    if (this.objType == "SVG") {

        svg = this.obj;

        if (width<0) { x = x+width; width = -width; }
        if (height<0) { y = y+height; height = -height; }

        var obj = document.createElementNS(svgNS, "rect");
        if (fill!=null) obj.style.fill = fill;
        if (strokeStyle!=null) obj.style.stroke = strokeStyle;
        if (strokeWidth!=null) obj.style.strokeWidth = strokeWidth;        
        obj.setAttribute( "x", x+"px" );
        obj.setAttribute( "y", y+"px" );
        obj.setAttribute( "width", width+"px" );
        obj.setAttribute( "height", height+"px" );
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
    
        if (fill!=null) {
        
            ctx.fillStyle = fill;
            ctx.fillRect(x,y,width,height);
        }
        
        if (strokeStyle!=null) {

            if (strokeStyle!=null) ctx.strokeStyle = strokeStyle;
            if (strokeWidth!=null) ctx.lineWidth = strokeWidth;
            ctx.strokeRect(x,y,width,height);
        }
    }
}

ChartDrawTools.prototype.drawText = function(text,x,y,fill,font,align,baseLine,angle,action) {


    if (this.objType == "SVG"){
    
        svg = this.obj;

        var obj = document.createElementNS(svgNS, "text");
        if (fill!=null) obj.style.fill = fill;
        if (font!=null) obj.style.font = font;
        
        var fontSize = parseInt(obj.style.fontSize,10);
    
        switch (align) {
        
            case "start":
            case "left":
                obj.style.textAnchor = "start";
                break;
            case "right":
            case "end":
                obj.style.textAnchor = "end";
                break;
            case "center":
                obj.style.textAnchor = "middle";
                break;
        }
        
        switch (baseLine) {
        
            case "top":
                obj.style.dominantBaseline = "text-before-edge";
                break;
            case "middle":
            case "alphabetic":
                obj.style.dominantBaseline = baseLine;
                break;
            case "bottom":
                obj.style.dominantBaseline = "middle";
                y = (y-(fontSize>>1));
                break;
        }
        
        if (angle!=null) obj.setAttribute ("transform", "translate("+(x)+","+(y)+") rotate("+angle+") translate("+(-x)+","+(-y)+")");
        obj.setAttribute( "x", x+"px" );
        obj.setAttribute( "y", y+"px" );

        var txt = document.createTextNode(text);
        obj.appendChild(txt);
        
        this.setAction(obj,action);
        svg.appendChild(obj);
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;

        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-x,-y);

        if (align!=null) ctx.textAlign = align;
        if (baseLine!=null) ctx.textBaseline = baseLine;
        if (fill!=null) ctx.fillStyle = fill;
        if (font!=null) ctx.font = font;
        ctx.fillText(text,x,y); 
        ctx.restore();
    }
}

ChartDrawTools.prototype.drawTextWidth = function(text,fill,font) {

    if (this.objType == "SVG") {
    
        svg = this.obj;

        var obj = document.createElementNS(svgNS, "text");
        if (fill!=null) obj.style.fill = fill;
        if (font!=null) obj.style.font = font;
        obj.style.visibility = 'hidden';
        
        var txt = document.createTextNode(text);
        obj.appendChild(txt);
        
        svg.appendChild(obj);
        var width = obj.getComputedTextLength();
        svg.removeChild(obj);
        
        return width;
    }

    if (this.objType == "Canvas") {
    
        ctx = this.ctx;
        ctx.save();
        if (fill!=null) ctx.fillStyle = fill;
        if (font!=null) ctx.font = font;
        var metrics = ctx.measureText(text);
        ctx.restore();
        
        return metrics.width;
    }
}

ChartDrawToolsWithRangAndSection = function() {

    ChartDrawTools.call(this);

    // Added drawing vars for 'WithAxes' charts
    this.yHeight = 0;
    this.yRelation = 0;
    this.yRelationZero = 0;
    this.sectionDist = 0;
    this.sectionHalf = 0;
}

ChartDrawToolsWithRangAndSection.prototype = new ChartDrawTools();
ChartDrawToolsWithRangAndSection.prototype.constructor = ChartDrawToolsWithRangAndSection;

ChartWithRangAndSection = function() {

    Chart.call(this);
    
    this.draw = new ChartDrawToolsWithRangAndSection();
    
    this.xAxis = new ChartAxisSections();
    this.yAxis = new ChartAxisRang();
}

ChartWithRangAndSection.prototype = new Chart();
ChartWithRangAndSection.prototype.constructor = ChartWithRangAndSection;

ChartWithRangAndSection.prototype.getWithAxesPositions = function(data,sideBySide,global) {

    var yMax = this.yAxis.getMax(this,global);
    var yMin = this.yAxis.getMin(this);

    this.draw.yHeight = this.draw.graphY0-this.draw.graphY1;
    this.draw.yRelation = -(this.draw.yHeight/(yMax-yMin));
    this.draw.yRelationZero = -(this.draw.yRelation*yMin);

    this.draw.sectionDist = 0;
    this.draw.sectionHalf = 0;
    if (!sideBySide) {
        this.draw.sectionDist = (this.draw.graphX1-this.draw.graphX0)/(this.data.getColumnsLength());
        this.draw.sectionHalf = this.draw.sectionDist/2;

    } else this.draw.sectionDist = (this.draw.graphX1-this.draw.graphX0)/(this.data.getColumnsLength()-1);
}

ChartBars = function() {

    ChartWithRangAndSection.call(this);
    
    this.xAxis.sideBySide = false;
    this.xAxis.showSteps = false;
    
    this.gapSection = 0.25;
    this.gapBars = 0;
}

ChartBars.prototype = new ChartWithRangAndSection();
ChartBars.prototype.constructor = ChartBars;

ChartBars.prototype.paint = function(canvas) {

    this.draw.getContext(canvas);
    this.draw.getPositions(this);
    this.getWithAxesPositions(this.data,this.xAxis.sideBySide,true); 
    this.draw.paintBackground();
    this.draw.paintTitle(this);
    this.draw.paintAxisY(this,true);
    this.draw.paintAxisX(this,true);
    this.draw.paintLegend(this,this.action);

    for(r=0; r<this.data.getRowsLength(); r++) {
    
        for (t=0; t<this.data.getColumnsLength(); t++) {
                
            // Draw chart
            var gapSet = this.draw.sectionDist*this.gapSection*0.5;
            var wData = ((this.draw.sectionDist-gapSet)/this.data.getRowsLength());
            var hData = this.draw.yRelation*(this.data.getField(r,t));
            var xData = this.draw.graphX0+this.draw.sectionDist*t+gapSet/2+wData*r;
            var xCenter = xData+wData/2;
            var yPosition = this.draw.graphY0+this.draw.yRelationZero;
            if (this.draw.yRelationZero>0) {
                yPosition = this.draw.graphY0;
                hData = hData + this.draw.yRelationZero;
            }
            var gapBarWidth = wData*0.25*this.gapBars;
            
            this.action.type = 'position';
            this.action.dataPosition = [r,t];
            this.draw.drawRect(xData+gapBarWidth,yPosition,wData-gapBarWidth*2,hData,this.getColor(r),null,null,this.action);

            // Draw label
            if (this.labels.show) {

                    var align='center';
                    var baseLine='middle';
                    switch (this.labels.position) {
                    case 'top':
                        yPosition = (hData<0) ? yPosition + hData : yPosition;
                        baseLine='bottom';
                        break;
                    case 'over':
                        yPosition = (hData<0) ? yPosition+hData+5 : yPosition + 5;
                        baseLine='top';
                        break;
                    case 'middle':
                        yPosition = yPosition+hData/2;
                        baseLine='middle';
                        break;
                    case 'bottom':
                        yPosition = (hData<0) ? yPosition-5 : yPosition +hData - 5;
                        baseLine='bottom';
                        break;
                    default:
                        if (typeof this.labels.position==='number') {
                            yPosition = yPosition + hData + this.labels.position;
                        }
                        break;
                }
                this.draw.paintLabelValue(this.data.getField(r,t),this,this.getColor(r),xCenter,yPosition,align,baseLine,0,this.action);
            }
        }
    }    
}

ChartBarsAdder = function() {

    ChartWithRangAndSection.call(this);
    
    this.xAxis.sideBySide = false;
    this.xAxis.showSteps = false;
    
    this.gapSection = 0.25;
}

ChartBarsAdder.prototype = new ChartWithRangAndSection();
ChartBarsAdder.prototype.constructor = ChartBarsAdder;

ChartBarsAdder.prototype.paint = function(canvas) {

    this.draw.getContext(canvas);
    this.draw.getPositions(this);
    this.getWithAxesPositions(this.data,this.xAxis.sideBySide,false);
    this.draw.paintBackground();
    this.draw.paintTitle(this);
    this.draw.paintAxisY(this,false);
    this.draw.paintAxisX(this,false);
    this.draw.paintLegend(this,this.action);

    var labelsPositions = new Array();
    for (t=0; t<this.data.getColumnsLength(); t++) {

        labelsPositions[t] = new Array();

        var hPrevious = 0;
        for(r=0; r<this.data.getRowsLength(); r++) {
            
            // Draw chart            
            var gapSet = this.draw.sectionDist*this.gapSection*0.5;
            var wData = this.draw.sectionDist-gapSet;
            var hData = this.draw.yRelation*(this.data.getField(r,t));
            var xData = this.draw.graphX0+this.draw.sectionDist*t+gapSet/2;
            var xCenter = xData+wData/2;
            var yStart = hPrevious+this.draw.graphY0+hData;
            var yPosition = this.draw.graphY0+this.draw.yRelationZero+hPrevious;
            if (this.draw.yRelationZero>0 && r==0) { // if (yPosition>this.draw.yRelationZero)
                yPosition = this.draw.graphY0 + hPrevious;
                hData = hData + this.draw.yRelationZero;
            }
            if (this.draw.yRelationZero>0 && r!=0) { // if (yPosition>this.draw.yRelationZero)
                yPosition = this.draw.graphY0 + hPrevious;
                //hData = hData + this.draw.yRelationZero;
            }
            
            this.action.type = 'position';
            this.action.dataPosition = [r,t];
            this.draw.drawRect(xData,yPosition,wData,hData,this.getColor(r),null,null,this.action);

            labelsPositions[t][r] = new Array(yPosition,hData,xCenter);

            hPrevious = hPrevious + hData;
        }
    }

    for (t=0; t<this.data.getColumnsLength(); t++) {

        for(r=0; r<this.data.getRowsLength(); r++) {

            yPosition = labelsPositions[t][r][0];
            hData = labelsPositions[t][r][1];
            xCenter = labelsPositions[t][r][2];

            // Draw label
            if (this.labels.show) {

                    var align='center';
                    var baseLine='middle';
                    switch (this.labels.position) {
                    case 'top':
                        yPosition = (hData<0) ? yPosition + hData : yPosition;
                        baseLine='bottom';
                        break;
                    case 'over':
                        yPosition = (hData<0) ? yPosition+hData+5 : yPosition + 5;
                        baseLine='top';
                        break;
                    case 'middle':
                        yPosition = yPosition+hData/2;
                        baseLine='middle';
                        break;
                    case 'bottom':
                        yPosition = (hData<0) ? yPosition-5 : yPosition +hData - 5;
                        baseLine='bottom';
                        break;
                    default:
                        if (typeof this.labels.position==='number') {
                            yPosition = yPosition + hData + this.labels.position;
                        }
                        break;
                }
                
                this.draw.paintLabelValue(this.data.getField(r,t),this,this.getColor(r),xCenter,yPosition,align,baseLine,0,this.action);
                
                hPrevious = hPrevious + hData;
            }
        }
    }
}

ChartLines = function() {

    ChartWithRangAndSection.call(this);
    
    this.xAxis.showSteps = true;
    
    this.width = 5;
    this.symbol = 'none'; // none, circle, square 
    this.showLine = true;
}

ChartLines.prototype = new ChartWithRangAndSection();
ChartLines.prototype.constructor = ChartLines;

ChartLines.prototype.paint = function(canvas) {

    this.draw.getContext(canvas);
    this.draw.getPositions(this);
    this.getWithAxesPositions(this.data,this.xAxis.sideBySide,true); 
    this.draw.paintBackground();
    this.draw.paintTitle(this);
    this.draw.paintAxisY(this,true);
    this.draw.paintAxisX(this,true);
    this.draw.paintLegend(this,this.action);

    for(r=0; r<this.data.getRowsLength(); r++) {
            
        var path = new Array();
        var fillStyle = this.getColor(r);
        var strokeStyle = fillStyle;
        var strokeWidth = this.width;
    
        // Get path, and labels
        for (t=0; t<this.data.getColumnsLength(); t++) {
                
            // Draw chart
            var hData = this.draw.yRelation*(this.data.getField(r,t))+this.draw.yRelationZero;
            var xCenter = this.draw.graphX0+this.draw.sectionDist*t;
            if (!this.xAxis.sideBySide) xCenter+=this.draw.sectionHalf;
            var yPosition = this.draw.graphY0+hData;
                    
            path[t] = [xCenter,yPosition];
        }
        
        // Draw path
        this.action.type = 'row';
        this.action.dataPosition = [r];
        if (this.showLine) this.draw.drawPath(path,null,strokeStyle,strokeWidth,false,this.action);
        
        // Draw labels and connection symbols
        if (this.labels.show) {
        
            for (t=0; t<this.data.getColumnsLength(); t++) {
                
                // Connection symbol
                this.action.type = 'position';
                this.action.dataPosition = [r,t];
                switch (this.symbol) {
                    case 'circle':
                        this.draw.drawCircle(path[t][0],path[t][1],this.width,fillStyle,strokeStyle,strokeWidth,this.action);
                        break;
                    case 'square':
                        this.draw.drawRect(path[t][0]-this.width,path[t][1]-this.width,this.width*2,this.width*2,fillStyle,null,null,this.action);
                        break;
                        default:
                        break;
                }
                
                // Label
                var hData = this.draw.yRelation*(this.data.getField(r,t))+this.draw.yRelationZero;
                var xCenter = this.draw.graphX0+this.draw.sectionDist*t+this.draw.sectionHalf;            
                if (t==0) xCenter+=2;
                else if (t==this.data.getColumnsLength()-1) xCenter-=2;
                var yPosition = this.draw.graphY0+hData;
    
                var align = 'center';
                var yLabelDisplace = 3;
                if (t==0) align='left';
                else if (t==this.data.getColumnsLength()-1) align='right';
            
                var baseLine = 'middle';
                switch (this.labels.position) {
                
                    case 'top':
                        yLabel = this.yPosition-this.width-yLabelDisplace;
                        baseLine='bottom';
                        break;
                    case 'over':
                        if (t==0) xCenter -= 2;
                        else if (t==this.data.getColumnsLength()-1) xCenter+=2;
                        baseLine='middle';
                        align='center';
                        break;
                    case 'middle':
                        baseLine='middle';
                        break;
                    case 'bottom':
                        yLabel = this.yPosition+this.width+yLabelDisplace;
                        baseLine='top';
                        break;
                    default:
                        if (typeof this.labels.position==='number') {
                            yPosition = this.yPosition-this.width-this.labels.position;
                        }
                        break;
                }
                
        var rotation = 0;
              if (this.labels.rotation==-90) {
                      baseLine='middle';
                      align='left';
            rotation = -90;
            yPosition = yPosition - this.width;
              }
            
                this.action.type = 'position';
                this.action.dataPosition = [r,t];
                this.draw.paintLabelValue(this.data.getField(r,t),this,this.getColor(r),xCenter,yPosition,align,baseLine,rotation,this.action);
            }
        }
    }    
}

ChartAreas = function() {

    ChartWithRangAndSection.call(this);
    
    this.xAxis.showSteps = true;    
}

ChartAreas.prototype = new ChartWithRangAndSection();
ChartAreas.prototype.constructor = ChartAreas;

ChartAreas.prototype.paint = function(canvas) {

    this.draw.getContext(canvas);
    this.draw.getPositions(this);
    this.getWithAxesPositions(this.data,this.xAxis.sideBySide,true);
    this.draw.paintBackground();
    this.draw.paintTitle(this);
    this.draw.paintAxisY(this,true);
    this.draw.paintAxisX(this,true);
    this.draw.paintLegend(this,this.action);

    for(r=0; r<this.data.getRowsLength(); r++) {
    
        var path = new Array();
        var fillStyle = this.getColor(r);
        var strokeStyle = fillStyle;
    
        var path = new Array();
        for (t=0; t<this.data.getColumnsLength(); t++) {
                
            // Draw chart
            var hData = this.draw.yRelation*(this.data.getField(r,t))+this.draw.yRelationZero;
            var xCenter = this.draw.graphX0+this.draw.sectionDist*t;
            if (!this.xAxis.sideBySide) xCenter+=this.draw.sectionHalf;
            var yPosition = this.draw.graphY0+hData;

            path[t] = [xCenter,yPosition];
        }
        
        // Draw path
        path[t] = [xCenter,this.draw.graphY0];
        path[t+1] = [path[0][0],this.draw.graphY0];

        this.action.type = 'row';
        this.action.dataPosition = [r];
        this.draw.drawPath(path,fillStyle,strokeStyle,0,true,this.action);
        
        // Draw labels
        if (this.labels.show) {
        
            for (t=0; t<this.data.getColumnsLength(); t++) {
                
                var hData = this.draw.yRelation*(this.data.getField(r,t))+this.draw.yRelationZero;
                var xCenter = this.draw.graphX0+this.draw.sectionDist*t+this.draw.sectionHalf;            
                if (t==0) xCenter+=2;
                else if (t==this.data.getColumnsLength()-1) xCenter-=2;
                var yPosition = this.draw.graphY0+hData;
    
                var align='center';
                var yLabelDisplace = 3;
                if (t==0) align='left';
                else if (t==this.data.getColumnsLength()-1) align='right';

                var baseLine = 'middle';            
                switch (this.labels.position) {
                    case 'top':
                        yLabel = this.yPosition-this.width-yLabelDisplace;
                        baseLine='bottom';
                        break;
                    case 'over':
                        if (t==0) xCenter -= 2;
                        else if (t==this.data.getColumnsLength()-1) xCenter+=2;
                        baseLine='middle';
                        align='center';
                        break;
                    case 'middle':
                        baseLine='middle';
                        break;
                    case 'bottom':
                        yLabel = this.yPosition+this.width+yLabelDisplace;
                        baseLine='top';
                        break;
                    default:
                        if (typeof this.labels.position==='number') {
                            yPosition = this.yPosition-this.width-this.labels.position;
                        }
                        break;
                }
                
                this.action.type = 'position';
                this.action.dataPosition = [r,t];
                this.draw.paintLabelValue(this.data.getField(r,t),this,this.getColor(r),xCenter,yPosition,align,baseLine,0,this.action);
            }
        }
    }    
}

ChartCircle = function() {

    Chart.call(this);
    
    this.draw = new ChartDrawTools();
    
    this.legendOnLabel = false;
    this.labels.position = 0.8; // #number, 1=circle radius
    this.format = 'percentage'; // 'percentage' or 'number'
    this.explode = 0; //  #number, for example 0.02;
    this.rotation = 0; // #number, 180=half circle
}

ChartCircle.prototype = new ChartWithRangAndSection();
ChartCircle.prototype.constructor = ChartCircle;

ChartCircle.prototype.paint = function(canvas) {

    this.draw.getContext(canvas);
    this.draw.getPositions(this);
    this.draw.paintBackground();
    this.draw.paintTitle(this);
    this.draw.paintLegend(this,this.action);

    var labelsPositions = new Array(this.data.getRowsLength());

    for(r=0; r<this.data.getRowsLength(); r++) {
        
        var wArea = this.draw.graphX1-this.draw.graphX0;
        var hArea = this.draw.graphY1-this.draw.graphY0;
        var xCircle = this.draw.graphX0 + wArea/2;
        var yCircle = this.draw.graphY0 + hArea/2;
                
        var rCircle = -(hArea/2);
        if (wArea < hArea) rCircle = wArea/2;
        rCircle += 10;
                
        var addedValue = 0;
        for (t=0; t<r; t++) 
            for (x=0; x<this.data.getColumnsLength(); x++) 
                addedValue += this.data.getField(t,x);
        var regionValue = 0;
        for (x=0; x<this.data.getColumnsLength(); x++) 
            regionValue += this.data.getField(r,x);
        var totalValue = 0;
        for (t=0; t<this.data.getRowsLength(); t++) 
            for (x=0; x<this.data.getColumnsLength(); x++) 
                totalValue += this.data.getField(t,x);

        var circle = 2*Math.PI;
        var startRelation = addedValue * circle / totalValue;
        var regionRelation = regionValue * circle / totalValue;
        var endRelation = (addedValue + regionValue) * circle / totalValue;                

        var percentage = (regionValue*100/totalValue);

        var rotation = this.rotation * circle / 360;
        var start = startRelation+rotation;
        var end = endRelation+rotation;

        if (this.explode>0) {
        
            xCircle = xCircle + xCircle * this.explode * Math.cos(start+(regionRelation/2));
            yCircle = yCircle + yCircle * this.explode * Math.sin(start+(regionRelation/2));
        }
        this.action.type = 'row';
        this.action.dataPosition = [r];
        this.draw.drawArc(xCircle,yCircle,rCircle,start,end,this.getColor(r),this.getColor(r),null,this.action);
        
        // Save label positions and data
        var labelsPosition = 0.8;
        if (typeof this.labels.position==='number') labelsPosition = this.labels.position;
        else {
        
            switch (this.labels.position) {
                    case 'top':
                        labelsPosition = 1.15;
                        break;
                    case 'over':
                        labelsPosition = 0.35;
                        break;
                    case 'middle':
                        labelsPosition = 0.5; 
                        break;
                    case 'bottom':
                        labelsPosition = 0.8;
                        break;
                    default:
                        if (typeof this.labels.position==='number') {
                            yPosition = number;
                        }
                        break;
                }
        }
        var xLabel = xCircle + (rCircle*labelsPosition) * Math.cos(start+(regionRelation/2));
        var yLabel = yCircle + (rCircle*labelsPosition) * Math.sin(start+(regionRelation/2));
        
        labelsPositions[r] = [xLabel,yLabel,regionValue,percentage];
    }

    // Draw label
    if (this.labels.show) {
    
        for(r=0; r<this.data.getRowsLength(); r++) {
                
            var xLabel = labelsPositions[r][0];
            var yLabel = labelsPositions[r][1];
            var regionValue = labelsPositions[r][2];
            var percentage = labelsPositions[r][3];

            var align='center';
            var baseLine='middle';

            var startText="";
            var endText="";
            var value=0;
            if (this.legendOnLabel) startText = this.data.getRowName(r)+" : ";
    
            if (this.format=='number') {
            
                value = regionValue;
            }
            if (this.format=='percentage') {
            
                endText = "%";
                value = percentage;
            }

            this.action.type = 'row';
            this.action.dataPosition = [r];
            this.draw.paintLabelText(startText,value,endText,this,this.getColor(r),xLabel,yLabel,align,baseLine,0,this.action);
        }
    }    
}

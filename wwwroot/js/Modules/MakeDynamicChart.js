

var types = {
    bar: 0,
    pie: 1,
    donut: 2,
    dragdrop: 3,
    clynder: 4,
    curvy: 5,
    curvedline: 6,
    clusteredbar: 7,
    hbar: 8,
    line: 10,
    clusteredbarchart: 9
}

const exportMenu = [{
    "label": "...",
    "menu": [{
        "label": "Image",
        "menu": [
            { "type": "svg", "label": "Save" },
        ]
    }, {
        "label": "Data",
        "menu": [
            
            { "type": "csv", "label": "CSV" },
            { "type": "xlsx", "label": "XLSX" }
            
        ]
    }]
}];

export function makeDatesChart(data, divId, cat, val, subcat, subval, subListKey, ctitle, onDateChange) {
    /**
  * ---------------------------------------
  * This demo was created using amCharts 4.
  *
  * For more information visit:
  * https://www.amcharts.com/
  *
  * Documentation is available at:
  * https://www.amcharts.com/docs/v4/
  * ---------------------------------------
  */

    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);
    /**
     * Source data
     */


    /**
     * Chart container
     */

    // Create chart instance
    var chart = am4core.create(divId, am4core.Container);
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);
    chart.layout = "horizontal";
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = ctitle;

    chart.exporting.menu.items = exportMenu;


    /**
     * Column chart
     */

    // Create chart instance
    var columnChart = chart.createChild(am4charts.XYChart);

    // Create axes
    var categoryAxis = columnChart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.labels.template.fontSize = 20
    categoryAxis.dataFields.category = subcat;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    var valueAxis = columnChart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 20;

    // Create series
    var columnSeries = columnChart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.valueX = subval;
    columnSeries.dataFields.categoryY = subcat;
    columnSeries.columns.template.strokeWidth = 0;
    columnSeries.columns.template.tooltipText = "{value}";



    var valueLabel = columnSeries.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{value}";
    valueLabel.label.fontSize = 20;
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.hideOversized = false;
    valueLabel.label.truncate = false;
    valueLabel.label.dx = 10;
    columnChart.cursor = new am4charts.XYCursor();
    columnChart.cursor.behavior = "zoomX";
    var scrollbar = new am4charts.XYChartScrollbar();

    columnChart.scrollbarX = scrollbar;

    /**
     * Pie chart
     */

    // Create chart instance
    var pieChart = chart.createChild(am4charts.PieChart);
    pieChart.data = data;
    pieChart.innerRadius = am4core.percent(50);
    var title = pieChart.titles.create();
    title.text = ctitle;
    title.fontSize = 25;
    pieChart.legend = new am4charts.Legend();
    pieChart.legend.maxHeight = 600;
    pieChart.legend.maxWidth = 300;
    pieChart.legend.scrollable = true;
    pieChart.legend.position = "bottom"; pieChart.legend.labels.template.text = "{name} : ({value})";
    // Add and configure Series
    var pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = val;
    pieSeries.dataFields.category = cat;

    pieSeries.labels.template.disabled = true;

    // Set up labels
    //var label1 = pieChart.seriesContainer.createChild(am4core.Label);
    //label1.text = "";
    //label1.horizontalCenter = "middle";
    //label1.fontSize = 35;
    //label1.fontWeight = 600;
    //label1.dy = -30;
    //
    //
    //var label3 = pieChart.seriesContainer.createChild(am4core.Label);
    //label3.text = "";
    //label3.horizontalCenter = "middle";
    //label3.fontSize = 20;
    //label3.dy = 40;
    //
    //
    //var label2 = pieChart.seriesContainer.createChild(am4core.Label);
    //label2.text = "";
    //label2.horizontalCenter = "middle";
    //label2.fontSize = 20;
    //label2.dy = 20;

    // Auto-select first slice on load
    pieChart.events.on("ready", function (ev) {
        pieSeries.slices.getIndex(0).isActive = true;
    });

    // Set up toggling events
    pieSeries.slices.template.events.on("toggled", function (ev) {
        if (ev.target.isActive) {

            // Untoggle other slices
            pieSeries.slices.each(function (slice) {
                if (slice != ev.target) {
                    slice.isActive = false;
                }
            });

            // Update column chart
            columnSeries.appeared = false;
            columnChart.data = ev.target.dataItem.dataContext[subListKey];
            columnSeries.fill = ev.target.fill;
            columnSeries.reinit();
            onDateChange(ev.target.dataItem.dataContext);
            // Update labels
            //label1.text = pieChart.numberFormatter.format(ev.target.dataItem.values.value.percent, "#.'%'");
            //label1.fill = ev.target.fill;
            //label3.text = ev.target.dataItem.dataContext[val];
            //label3.fill = ev.target.fill;
            //console.log(ev.target.dataItem);
            //label2.text = ev.target.dataItem.dataContext[cat];
        }
    });


}
function callCurvyChart(data, curvtitle, divId, chartValue, chartCategory) {
    am4charts.
        am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart3D);
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = curvtitle;

    chart.exporting.menu.items = exportMenu;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

    categoryAxis.renderer.labels.template.fontSize = 20;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.renderer.minGridDistance = 40;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 20
    var series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = chartCategory;
    series.dataFields.valueY = chartValue;
    series.tooltipText = "{valueY.value}";
    series.columns.template.strokeOpacity = 0;

    series.columns.template.fillOpacity = 0.75;

    var hoverState = series.columns.template.states.create("hover");
    hoverState.properties.fillOpacity = 1;
    hoverState.properties.tension = 0.5;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";

    // Add distinctive colors for each column using adapter
    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    chart.scrollbarX = new am4core.Scrollbar();

    
    //chart.exporting.menu = new am4core.ExportMenu();
}

function callClyChart(data, clytitle, divId, chartValue, chartCategory) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart3D);
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = clytitle;

    chart.exporting.menu.items = exportMenu;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.labels.template.fontSize = 20;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.baseGrid.disabled = true;
    categoryAxis.renderer.labels.template.dy = 20;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 20
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.minWidth = 0;

    var series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.categoryX = chartCategory;
    series.dataFields.valueY = chartValue;
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 1;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    series.columns.template.adapter.add("stroke", function (stroke, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.XYCursor();

    var title = chart.titles.create();
    title.text = clytitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    //chart.exporting.menu = new am4core.ExportMenu();
}

function callPieChart(data, pietitle, divId, chartValue, chartCategory) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.PieChart);
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = pietitle;

    chart.exporting.menu.items = exportMenu;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = chartValue;
    pieSeries.dataFields.category = chartCategory;
    // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.maxHeight = 600;
    chart.legend.maxWidth = 300;
    chart.legend.scrollable = true;
    chart.legend.position = "bottom"; chart.legend.labels.template.text = "{name} : ({value})";

    var title = chart.titles.create();
    title.text = pietitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    /*chart.exporting.menu = new am4core.ExportMenu();*/
}
function callHBar(data, hbartitle, divId, chartValue, chartCategory) {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(divId, am4charts.XYChart);
    am4core.addLicense("ch-custom-attribution");

    // Add data
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = hbartitle;

    chart.exporting.menu.items = exportMenu;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.labels.template.fontSize = 20;
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.renderer.grid.template.location = 0;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 20;
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = chartValue;
    series.dataFields.categoryY = chartCategory;
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 1000;
    series.sequencedInterpolationDelay = 100;
    series.columns.template.strokeOpacity = 0;
    series.tooltip.fontSize = 17;



    var valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{value}";
    valueLabel.label.fontSize = 20;
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.hideOversized = false;
    valueLabel.label.truncate = false;
    valueLabel.label.dx = 10;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomX";
    var scrollbar = new am4charts.XYChartScrollbar();

    chart.scrollbarX = scrollbar;

    // Set cell size in pixels
    //var cellSize = 30;
    //chart.events.on("datavalidated", function (ev) {
    //    // Get objects of interest
    //    var chart = ev.target;
    //    var categoryAxis = chart.yAxes.getIndex(0);
    //    // Calculate how we need to adjust chart height
    //    var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
    //    // get current chart height
    //    var targetHeight = chart.pixelHeight + adjustHeight;
    //    // Set it on chart's container
    //    chart.svgContainer.htmlElement.style.height = targetHeight + "px";
    //});
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //set values on the bar without hover
    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "right";
    labelBullet.label.dx = -5;
    labelBullet.label.text = "{valueX}";
    var valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{value}";
    valueLabel.label.fontSize = 20;
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.dx = 10;
    valueLabel.locationX = 1;
    var title = chart.titles.create();
    title.text = hbartitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    //// Add scrollbar
    var scrollbar = new am4charts.XYChartScrollbar();

    chart.scrollbarY = scrollbar;


    chart.events.on("ready", function () {
        categoryAxis.zoomToIndexes([...data].length - 5, [...data].length);
    });

}
function callBarChart(data, bartitle, divId, chartValue, chartCategory, dontRototate, columnsColorFunc) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart);
    chart.data = data;

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = bartitle;

    chart.exporting.menu.items = exportMenu;


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

    categoryAxis.renderer.labels.template.fontSize = 20;
    categoryAxis.dataFields.category = chartCategory;


    categoryAxis.renderer.labels.template.dy = -5;
    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 20;
    var series = chart.series.push(new am4charts.ColumnSeries());

    series.columns.template.fill = am4core.color("#104547");

    if (columnsColorFunc) {
        series.columns.template.adapter.add("fill", (fill, target) => columnsColorFunc(fill, target)
        );

    } else {
        series.columns.template.adapter.add("fill", (fill, target) => {
            return chart.colors.getIndex(target.dataItem.index);
        });
    }

    series.dataFields.valueY = chartValue;
    series.dataFields.categoryX = chartCategory;
    chart.maskBullets = false;
    chart.paddingTop = 25;
    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.adapter.add("y", function (y) {
        return -15;
    });
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomX";
    var scrollbar = new am4charts.XYChartScrollbar();

    chart.scrollbarX = scrollbar;


    var title = chart.titles.create();
    title.text = bartitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    //chart.exporting.menu = new am4core.ExportMenu();
}

function callDragDropChart(data, dragtitle, divId, chartValue, chartCategory) {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 4.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var dumm = {
        disabled: true,
        color: am4core.color("#dadada"),
        opacity: 0.3,
        strokeDasharray: "4,4",
    };

    dumm[chartCategory] = "Dummy";
    dumm[chartValue] = 1000;

    data = [dumm, ...data];

    // cointainer to hold both charts
    var container = am4core.create(divId, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";

    container.events.on("maxsizechanged", function () {
        chart1.zIndex = 0;
        separatorLine.zIndex = 1;
        dragText.zIndex = 2;
        chart2.zIndex = 3;
    });

    var chart1 = container.createChild(am4charts.PieChart);
    chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    chart1.data = data;
    chart1.radius = am4core.percent(70);
    chart1.innerRadius = am4core.percent(40);
    chart1.zIndex = 1;

    var series1 = chart1.series.push(new am4charts.PieSeries());
    series1.dataFields.value = chartCategory;
    series1.dataFields.category = chartValue;
    series1.colors.step = 2;

    var sliceTemplate1 = series1.slices.template;
    sliceTemplate1.cornerRadius = 5;
    sliceTemplate1.draggable = true;
    sliceTemplate1.inert = true;
    sliceTemplate1.propertyFields.fill = "color";
    sliceTemplate1.propertyFields.fillOpacity = "opacity";
    sliceTemplate1.propertyFields.stroke = "color";
    sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
    sliceTemplate1.strokeWidth = 1;
    sliceTemplate1.strokeOpacity = 1;

    var zIndex = 5;

    sliceTemplate1.events.on("down", function (event) {
        event.target.toFront();
        // also put chart to front
        var series = event.target.dataItem.component;
        series.chart.zIndex = zIndex++;
    });
    series1.labels.template.disabled = true;
    series1.ticks.template.disabled = true;
    //series1.labels.template.propertyFields.disabled = "disabled";
    //series1.ticks.template.propertyFields.disabled = "disabled";

    sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

    sliceTemplate1.events.on("dragstop", function (event) {
        handleDragStop(event);
    });

    // separator line and text
    var separatorLine = container.createChild(am4core.Line);
    separatorLine.x1 = 0;
    separatorLine.y2 = 300;
    separatorLine.strokeWidth = 3;
    separatorLine.stroke = am4core.color("#dadada");
    separatorLine.valign = "middle";
    separatorLine.strokeDasharray = "5,5";

    var dragText = container.createChild(am4core.Label);
    dragText.text = "Drag slices over the line";
    dragText.rotation = 90;
    dragText.valign = "middle";
    dragText.align = "center";
    dragText.paddingBottom = 5;

    var chartTitle = container.createChild(am4core.Label);
    chartTitle.text = dragtitle;
    chartTitle.valign = "top";
    chartTitle.align = "center";
    chartTitle.fontSize = 25;
    title.marginBottom = 30;

    // second chart
    var chart2 = container.createChild(am4charts.PieChart);
    chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    chart2.radius = am4core.percent(70);
    chart2.data = data;
    chart2.innerRadius = am4core.percent(40);
    chart2.zIndex = 1;

    var series2 = chart2.series.push(new am4charts.PieSeries());
    series2.dataFields.value = chartCategory;
    series2.dataFields.category = chartValue;
    series2.colors.step = 2;

    var sliceTemplate2 = series2.slices.template;
    sliceTemplate2.copyFrom(sliceTemplate1);
    series2.labels.template.disabled = true;
    series2.ticks.template.disabled = true;
    //series2.labels.template.propertyFields.disabled = "disabled";
    //series2.ticks.template.propertyFields.disabled = "disabled";

    function handleDragStop(event) {
        var targetSlice = event.target;
        var dataItem1;
        var dataItem2;
        var slice1;
        var slice2;

        if (series1.slices.indexOf(targetSlice) != -1) {
            slice1 = targetSlice;
            slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
        } else if (series2.slices.indexOf(targetSlice) != -1) {
            slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
            slice2 = targetSlice;
        }

        dataItem1 = slice1.dataItem;
        dataItem2 = slice2.dataItem;

        var series1Center = am4core.utils.spritePointToSvg(
            { x: 0, y: 0 },
            series1.slicesContainer
        );
        var series2Center = am4core.utils.spritePointToSvg(
            { x: 0, y: 0 },
            series2.slicesContainer
        );

        var series1CenterConverted = am4core.utils.svgPointToSprite(
            series1Center,
            series2.slicesContainer
        );
        var series2CenterConverted = am4core.utils.svgPointToSprite(
            series2Center,
            series1.slicesContainer
        );

        // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
        var targetSlicePoint = am4core.utils.spritePointToSvg(
            { x: targetSlice.tooltipX, y: targetSlice.tooltipY },
            targetSlice
        );

        if (targetSlice == slice1) {
            if (targetSlicePoint.x > container.pixelWidth / 2) {
                var value = dataItem1.value;

                dataItem1.hide();

                var animation = slice1.animate(
                    [
                        { property: "x", to: series2CenterConverted.x },
                        { property: "y", to: series2CenterConverted.y },
                    ],
                    400
                );
                animation.events.on("animationprogress", function (event) {
                    slice1.hideTooltip();
                });

                slice2.x = 0;
                slice2.y = 0;

                dataItem2.show();
            } else {
                slice1.animate(
                    [
                        { property: "x", to: 0 },
                        { property: "y", to: 0 },
                    ],
                    400
                );
            }
        }
        if (targetSlice == slice2) {
            if (targetSlicePoint.x < container.pixelWidth / 2) {
                var value = dataItem2.value;

                dataItem2.hide();

                var animation = slice2.animate(
                    [
                        { property: "x", to: series1CenterConverted.x },
                        { property: "y", to: series1CenterConverted.y },
                    ],
                    400
                );
                animation.events.on("animationprogress", function (event) {
                    slice2.hideTooltip();
                });

                slice1.x = 0;
                slice1.y = 0;
                dataItem1.show();
            } else {
                slice2.animate(
                    [
                        { property: "x", to: 0 },
                        { property: "y", to: 0 },
                    ],
                    400
                );
            }
        }

        toggleDummySlice(series1);
        toggleDummySlice(series2);

        series1.hideTooltip();
        series2.hideTooltip();
    }

    function toggleDummySlice(series) {
        var show = true;
        for (var i = 1; i < series.dataItems.length; i++) {
            var dataItem = series.dataItems.getIndex(i);
            if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                show = false;
            }
        }

        var dummySlice = series.dataItems.getIndex(0);
        if (show) {
            dummySlice.show();
        } else {
            dummySlice.hide();
        }
    }

    series2.events.on("datavalidated", function () {
        var dummyDataItem = series2.dataItems.getIndex(0);
        dummyDataItem.show(0);
        dummyDataItem.slice.draggable = false;
        dummyDataItem.slice.tooltipText = undefined;

        for (var i = 1; i < series2.dataItems.length; i++) {
            series2.dataItems.getIndex(i).hide(0);
        }
    });

    series1.events.on("datavalidated", function () {
        var dummyDataItem = series1.dataItems.getIndex(0);
        dummyDataItem.hide(0);
        dummyDataItem.slice.draggable = false;
        dummyDataItem.slice.tooltipText = undefined;
    });
}

function callLineChart(data, lineTitle, divId, chartValue, chartCategory) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");



    // Create chart instance
    var chart = am4core.create(divId, am4charts.XYChart);

    // Add data
    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.baseInterval = {
        "timeUnit": "month",
        "count": 1
    }
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = name;
        series.name = name;
        series.tooltipText = "{dateX.formatDate('yyyy-MM')}: [b]{valueY}[/]";
        series.strokeWidth = 2;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;

        bullet.tooltip = new am4core.Tooltip();
        bullet.tooltipText = "{dateX.formatDate('yyyy-MM')}: [b]{valueY}[/]";
        bullet.showTooltipOn = "always";

    }

    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = lineTitle;

    chart.exporting.menu.items = exportMenu;

    createSeries(chartValue, chartCategory);
    chart.legend = new am4charts.Legend();
    //chart.cursor = new am4charts.XYCursor();

    //chart.scrollbarX = new am4core.Scrollbar();
    //chart.scrollbarY = new am4core.Scrollbar();

    var title = chart.titles.create();
    title.text = lineTitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    // Zoom events
    valueAxis.events.on("startchanged", valueAxisZoomed);
    valueAxis.events.on("endchanged", valueAxisZoomed);

    function valueAxisZoomed(ev) {
        var start = ev.target.minZoomed;
        var end = ev.target.maxZoomed;

    }

    dateAxis.events.on("startchanged", dateAxisChanged);
    dateAxis.events.on("endchanged", dateAxisChanged);
    function dateAxisChanged(ev) {
        var start = new Date(ev.target.minZoomed);
        var end = new Date(ev.target.maxZoomed);
    }
    chart.exporting.events.on("exportstarted", function (ev) {
        //chart.series.bullets.showTooltipOn = "always";
        chart.series.template.bulletsContainer
        console.log(chart.series);
    });

}


function callDonutChart(data, donuttitle, divId, chartValue, chartCategory) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.PieChart);
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = donuttitle;

    chart.exporting.menu.items = exportMenu;

    var pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.value = chartValue;
    pieSeries.dataFields.category = chartCategory; // Disable ticks and labels
    // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    chart.innerRadius = am4core.percent(40);


    chart.legend = new am4charts.Legend();
    chart.legend.maxHeight = 600;
    chart.legend.maxWidth = 300;
    chart.legend.scrollable = true;
    chart.legend.position = "bottom"; chart.legend.labels.template.text = "{name} : ({value})";

    pieSeries.colors.list = [
        am4core.color("#2799DB"),
        am4core.color("#D61C4E"),
        am4core.color("#FEB139"),
        am4core.color("#3CCF4E"),
        am4core.color("#7A4069"),
        am4core.color("#F9F871"),
        am4core.color("#FFE1C6"),
        am4core.color("#D6FFE0"),
        am4core.color("#E1E3FF"),
        am4core.color("#3EF6FF"),
        am4core.color("#EE6123"),
        am4core.color("#00916E"),
    ];
    var title = chart.titles.create();
    title.text = donuttitle;
    title.fontSize = 25;
    title.marginBottom = 30;
}

function callClusterd(data, clusterdtitle, chartId,) {


    am4core.useTheme(am4themes_animated);
    // Themes end



    var chart = am4core.create(chartId, am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.filePrefix = chartId;

    chart.exporting.menu.items = exportMenu;

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.renderer.labels.template.fontSize = 20;
    xAxis.dataFields.category = 'cat';
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.labels.template.rotation = 90;


    var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.renderer.labels.template.fontSize = 20
    // Make the labels vertical
    yAxis.min = 0;

    function createSeries(value, name) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'cat'
        series.name = name
        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        //var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        //labelBullet.label.text = "{valueY}";
        //labelBullet.adapter.add("y", function (y) {
        //    return -15;
        //});

        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#000000')
        bullet.adapter.add("y", function (y) {
            return 15;
        });

        return series;
    }

    chart.data = data;
    if (data[0]) {
        Object.keys(data[0]).forEach(item => {
            if (item != "cat")
                createSeries(item, item);
        })
    }
    /*createSeries('first', 'The First');
    createSeries('second', 'The Second');
    createSeries('third', 'The Third');*/

    function arrangeColumns() {

        var series = chart.series.getIndex(0);

        var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                var middle = chart.series.length / 2;

                var newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                var visibleCount = newIndex;
                var newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;

                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }
    var title = chart.titles.create();
    title.text = clusterdtitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomX";
    var scrollbar = new am4charts.XYChartScrollbar();

    chart.scrollbarX = scrollbar;


}
function callClusteredBarChart(data, hbartitle, divId, chartXValue, chartCategory) {

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(divId, am4charts.XYChart);
    am4core.addLicense("ch-custom-attribution");

    // Add data
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = [{
        "label": "...",
        "menu": [
            { "type": "svg", "label": "Save" },
        ]
    }];
    chart.legend = new am4charts.Legend();

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = chartCategory;
    //categoryAxis.numberFormatter.numberFormat = "#";
    // categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    categoryAxis.renderer.labels.template.fontSize = 20;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.renderer.opposite = true;
    valueAxis.renderer.labels.template.fontSize = 20;
    console.log(data);
    function createSeries(field) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = chartCategory;
        series.name = field;
        series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{valueY}";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dy = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

        //var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        //categoryLabel.label.text = "{name}";
        //categoryLabel.label.horizontalCenter = "right";
        //categoryLabel.label.dy = -10;
        ////categoryLabel.label.fill = am4core.color("#fff");
        //categoryLabel.label.hideOversized = false;
        //categoryLabel.label.truncate = false;
    }
    var keys = [];
    data.forEach(x => {
        keys = [...keys, ...Object.keys(x)];
    });

    var ukeys = Array.from(new Set(keys)).filter(x => x != chartCategory);
    ukeys.forEach(k => {
        createSeries(k);
    })



    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";


    var title = chart.titles.create();
    title.text = hbartitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    //// Add scrollbar
    var scrollbar = new am4charts.XYChartScrollbar();

    chart.scrollbarX = scrollbar;

}
export function makedynamicChart(
    chartType,
    data,
    title,
    divId,
    chartValue,
    chartCategory,
    dontRotateCat,
    columnsColorFunc
) {
    var chart = document.getElementById(divId);
    chart.style.height = "600px";
    switch (chartType) {
        case types.pie:
            callPieChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.bar:
            callBarChart(data, title, divId, chartValue, chartCategory, dontRotateCat, columnsColorFunc);
            break;
        case types.hbar:
            callHBar(data, title, divId, chartValue, chartCategory);
            break;
        case types.dragdrop:
            callDragDropChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.curvy:
            callCurvyChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.clynder:
            callClyChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.donut:
            callDonutChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.clusteredbar:
            chart.style.height = "800px";
            callClusterd(data, title, divId);
            break;
        case types.line:
            chart.style.height = "800px";
            callLineChart(data, title, divId, chartValue, chartCategory);
            break;
        case types.clusteredbarchart:
            callClusteredBarChart(data, title, divId, chartValue, chartCategory);
            break;
        default:
            console.log("eror");
            break;
    }
}

function makeRotateButton(chart) {
    let buttonContainer = chart.chartContainer.createChild(am4core.Container);
    let button = buttonContainer.createChild(am4core.Button);
    button.label.text = "Rotate Chart";
    button.align = "left";
    button.marginBottom = 15;
    button.events.on("hit", () => {

        this.toggleLoading();
        if (this.isHorizontal) {
            this.isHorizontal = false;
            this.makeBar()
        } else {
            this.isHorizontal = true;
            this.makeHBar();
        }
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);
    });
}
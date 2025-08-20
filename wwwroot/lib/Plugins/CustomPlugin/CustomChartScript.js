


var pieChartTitle = "";

function makeChart(chartName, dataUrl, divId, chartTitle, chartValue, chartCategory) {
    console.log(chartTitle);
    switch (chartName) {

        case "Pie":
            callPieChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "3dPie":
            call3DPieChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "Bar":
            callBarChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "PieDragDrop":
            callDragDropChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "PieDragDropLegend":
            callDragDropChartWL(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "Curvy":
            callCurvyChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "Clynder":
            callClyChart(dataUrl, divId, chartTitle, chartValue, chartCategory);
            break;
        case "CurvedLine":
            callLineChart(dataUrl, divId, chartTitle, chartCategory);
            break;
        default:
            console.log("eror");
            break;
    }
}

function callCurvyChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart3D);
    chart.dataSource.url = dataUrl;


    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.renderer.minGridDistance = 40;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    var series = chart.series.push(new am4charts.CurvedColumnSeries());
    series.dataFields.categoryX = chartCategory;
    series.dataFields.valueY = chartValue;
    series.tooltipText = "{valueY.value}"
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
    chart.exporting.menu = new am4core.ExportMenu();

    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

}

function callClyChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {

    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart3D);
    chart.dataSource.url = dataUrl;

    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.baseGrid.disabled = true;
    categoryAxis.renderer.labels.template.dy = 20;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
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
    chart.exporting.menu = new am4core.ExportMenu();

}

function callPieChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {
    console.log("dataUrl", dataUrl);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.PieChart);
    chart.dataSource.url = dataUrl;

    


    chart.dataSource.events.on("done", function (ev) {
        $("#" + divId).show(1000);
    });
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = chartValue;
    pieSeries.dataFields.category = chartCategory; // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;



    // Disable tooltips
    pieSeries.slices.template.tooltipText = "";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "buttom";
    chart.legend.maxHeight = 150;
    chart.legend.scrollable = true;

    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    /*chart.exporting.menu = new am4core.ExportMenu();*/
}

function callBarChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {

    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.XYChart);
    chart.dataSource.url = dataUrl;
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = chartCategory;
    categoryAxis.title.text = chartCategory;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = chartValue;
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = chartValue;
    series.dataFields.categoryX = chartCategory;
    chart.exporting.menu = new am4core.ExportMenu();
    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

}

function callDragDropChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {



    var data = [{
        Name: "Dummy",
        "disabled": true,
        Count: 1000,
        "color": am4core.color("#dadada"),
        "opacity": 0.3,
        "strokeDasharray": "4,4"
    }];

    var fetchedData;
    var chartData;
    let url = dataUrl;
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            fetchedData = out;
            chartData = data.concat(fetchedData);

            //to cleare logo
            am4core.addLicense("ch-custom-attribution");
            am4core.useTheme(am4themes_animated);
            var container = am4core.create(divId, am4core.Container);
            container.width = am4core.percent(100);
            container.height = am4core.percent(100);
            container.layout = "horizontal";
            container.events.on("maxsizechanged", function () {
                chart1.zIndex = 0;
                separatorLine.zIndex = 1;
                chart2.zIndex = 3;
            })
            var axisTitle = container.createChild(am4core.Label);
            axisTitle.text = chartTitle;
            axisTitle.fontWeight = 600;
            axisTitle.align = "center";
            //axisTitle.paddingLeft = 10;
            //declare chart 1
            var chart1 = container.createChild(am4charts.PieChart);
            chart1.hiddenState.properties.opacity = 0;
            chart1.radius = am4core.percent(70);
            chart1.innerRadius = am4core.percent(40);
            chart1.data = chartData;
            chart1.zIndex = 1;


            var series1 = chart1.series.push(new am4charts.PieSeries());
            series1.dataFields.value = chartValue;
            series1.dataFields.category = chartCategory;
            series1.labels.template.propertyFields.disabled = "disabled";
            series1.ticks.template.propertyFields.disabled = "disabled";
            series1.colors.step = 2;
            var zIndex = 5;

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
            sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;
            sliceTemplate1.events.on("down", function (event) {
                event.target.toFront();
                // also put chart to front
                var series = event.target.dataItem.component;
                series.chart.zIndex = zIndex++;
            })
            sliceTemplate1.events.on("dragstop", function (event) {
                handleDragStop(event);
            })

            // separator line and text
            var separatorLine = container.createChild(am4core.Line);
            separatorLine.x1 = 0;
            separatorLine.y2 = 300;
            separatorLine.strokeWidth = 3;
            separatorLine.stroke = am4core.color("#dadada");
            separatorLine.valign = "middle";
            separatorLine.strokeDasharray = "5,5";
            /*var title = chart1.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/

            //declare chart 2
            var chart2 = container.createChild(am4charts.PieChart);
            chart2.hiddenState.properties.opacity = 0;
            chart2.hiddenState.properties.opacity = 0;
            chart2.radius = am4core.percent(70);
            chart2.innerRadius = am4core.percent(40);
            chart2.data = chartData;
            chart2.zIndex = 1;


            var series2 = chart2.series.push(new am4charts.PieSeries());
            series2.dataFields.value = chartValue;
            series2.dataFields.category = chartCategory;
            series2.labels.template.propertyFields.disabled = "disabled";
            series2.ticks.template.propertyFields.disabled = "disabled";
            series2.colors.step = 2;

            var sliceTemplate2 = series2.slices.template;
            sliceTemplate2.copyFrom(sliceTemplate1);
            /*var title = chart2.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/
            function handleDragStop(event) {
                var targetSlice = event.target;
                var dataItem1;
                var dataItem2;
                var slice1;
                var slice2;

                if (series1.slices.indexOf(targetSlice) != -1) {
                    slice1 = targetSlice;
                    slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
                }
                else if (series2.slices.indexOf(targetSlice) != -1) {
                    slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                    slice2 = targetSlice;
                }


                dataItem1 = slice1.dataItem;
                dataItem2 = slice2.dataItem;

                var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
                var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

                var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
                var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

                // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
                var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

                if (targetSlice == slice1) {
                    if (targetSlicePoint.x > container.pixelWidth / 2) {
                        var value = dataItem1.value;

                        dataItem1.hide();

                        var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice1.hideTooltip();
                        })

                        slice2.x = 0;
                        slice2.y = 0;

                        dataItem2.show();
                    }
                    else {
                        slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                    }
                }
                if (targetSlice == slice2) {
                    if (targetSlicePoint.x < container.pixelWidth / 2) {

                        var value = dataItem2.value;

                        dataItem2.hide();

                        var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice2.hideTooltip();
                        })

                        slice1.x = 0;
                        slice1.y = 0;
                        dataItem1.show();
                    }
                    else {
                        slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
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
                }
                else {
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
            })

            series1.events.on("datavalidated", function () {
                var dummyDataItem = series1.dataItems.getIndex(0);
                dummyDataItem.hide(0);
                dummyDataItem.slice.draggable = false;
                dummyDataItem.slice.tooltipText = undefined;
            })




        }).catch(err => { throw err });

}

function callLineChart(dataUrl, divId, chartTitle, categoryName) {
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");

    var container = am4core.create(divId, am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";
    var chart = container.createChild(am4charts.XYChart);
    var title = container.createChild(am4core.Label);
    var year = dataUrl.split('=');
    if (categoryName == "Qtr") {
        title.text = "Profits Of Year " + year[1];
    } else if (categoryName == "Year") {
        title.text = "Yearly Profits";
    } else {
        title.text = chartTitle;
    }
    title.rotation = 90;


    // Create chart instance



    title.rotation = 90;
    title.fontSize = 40;
    title.valign = "middle";
    title.align = "center";
    title.paddingBottom = 5;

    $.ajax({
        type: "GET",
        url: dataUrl,
        data: {
        },
        success: function (data) {
            chart.data = data;


            Object.entries(chart.data[0]).forEach(([key, value], index) => {
                if (index != 0) {
                    createSeries(key, key);
                }
                // "a 5", "b 7", "c 9"
            });
        },

    });



    // Create axes
    //start
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 100;
    categoryAxis.align = "left";
    //end


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());



    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = categoryName;
        series.name = name;
        series.tooltipText = "" + name + ": [b]{valueY}[/]";
        series.strokeWidth = 3;
        series.segments.template.interactionsEnabled = true;
        series.tooltip.label.orientation = "vertical";

        if (categoryName == "Year") {
            series.tooltip.label.interactionsEnabled = true;

            series.tooltip.events.on('hit', function () {
                OnSerisLineClicked(name);

            });
            series.segments.template.events.on(
                "hit",
                ev => {
                    OnSerisLineClicked(name);
                },
                this
            );
        } else {
        }
        // Create hover state
        let hs = series.segments.template.states.create("hover");
        hs.properties.strokeWidth = 10;



        series.smoothing = "monotoneX";

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;

        return series;
    }



    chart.legend = new am4charts.Legend();

    chart.legend.useDefaultMarker = true;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    chart.cursor = new am4charts.XYCursor();
}

function callDragDropChartWL(dataUrl, divId, chartTitle, chartValue, chartCategory) {



    var data = [{
        Name: "Dummy",
        "disabled": true,
        Count: 1000,
        "color": am4core.color("#dadada"),
        "opacity": 0.3,
        "strokeDasharray": "4,4"
    }];

    var fetchedData;
    var chartData;
    let url = dataUrl;
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            fetchedData = out;
            chartData = data.concat(fetchedData);

            //to cleare logo
            am4core.addLicense("ch-custom-attribution");
            am4core.useTheme(am4themes_animated);
            var container = am4core.create(divId, am4core.Container);
            container.width = am4core.percent(100);
            container.height = am4core.percent(100);
            container.layout = "horizontal";
            container.events.on("maxsizechanged", function () {
                chart1.zIndex = 0;
                separatorLine.zIndex = 1;
                chart2.zIndex = 3;
            })
            var axisTitle = container.createChild(am4core.Label);
            axisTitle.text = chartTitle;
            axisTitle.fontWeight = 800;
            axisTitle.align = "center";
            //axisTitle.paddingLeft = 10;
            //declare chart 1
            var chart1 = container.createChild(am4charts.PieChart3D);
            chart1.hiddenState.properties.opacity = 0;
            chart1.radius = am4core.percent(70);
            chart1.innerRadius = am4core.percent(40);
            chart1.data = chartData;
            chart1.zIndex = 1;


            chart1.legend = new am4charts.Legend();
            chart1.legend.position = "buttom";
            chart1.legend.maxHeight = 150;
            chart1.legend.scrollable = true;

            var series1 = chart1.series.push(new am4charts.PieSeries3D());
            series1.dataFields.value = chartValue;
            series1.dataFields.category = chartCategory;
            //series1.labels.template.propertyFields.disabled = "disabled";
            series1.labels.template.disabled = true;
            series1.ticks.template.propertyFields.disabled = "disabled";
            series1.colors.step = 2;
            var zIndex = 5;

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
            sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;
            sliceTemplate1.events.on("down", function (event) {
                event.target.toFront();
                // also put chart to front
                var series = event.target.dataItem.component;
                series.chart.zIndex = zIndex++;
            })
            sliceTemplate1.events.on("dragstop", function (event) {
                handleDragStop(event);
            })

            // separator line and text
            var separatorLine = container.createChild(am4core.Line);
            separatorLine.x1 = 0;
            separatorLine.y2 = 300;
            separatorLine.strokeWidth = 3;
            separatorLine.stroke = am4core.color("#dadada");
            separatorLine.valign = "middle";
            separatorLine.strokeDasharray = "5,5";
            /*var title = chart1.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/

            //declare chart 2
            var chart2 = container.createChild(am4charts.PieChart3D);
            chart2.hiddenState.properties.opacity = 0;
            chart2.hiddenState.properties.opacity = 0;
            chart2.radius = am4core.percent(70);
            chart2.innerRadius = am4core.percent(40);
            chart2.data = chartData;
            chart2.zIndex = 1;


            /*chart2.legend = new am4charts.Legend();
            chart2.legend.position = "buttom";*/


            var series2 = chart2.series.push(new am4charts.PieSeries3D());
            series2.dataFields.value = chartValue;
            series2.dataFields.category = chartCategory;
            series2.labels.template.propertyFields.disabled = "disabled";
            //series2.labels.template.disabled = true;

            series2.ticks.template.propertyFields.disabled = "disabled";
            series2.colors.step = 2;

            var sliceTemplate2 = series2.slices.template;
            sliceTemplate2.copyFrom(sliceTemplate1);
            /*var title = chart2.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/
            function handleDragStop(event) {
                var targetSlice = event.target;
                var dataItem1;
                var dataItem2;
                var slice1;
                var slice2;

                if (series1.slices.indexOf(targetSlice) != -1) {
                    slice1 = targetSlice;
                    slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
                }
                else if (series2.slices.indexOf(targetSlice) != -1) {
                    slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                    slice2 = targetSlice;
                }


                dataItem1 = slice1.dataItem;
                dataItem2 = slice2.dataItem;

                var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
                var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

                var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
                var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

                // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
                var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

                if (targetSlice == slice1) {
                    if (targetSlicePoint.x > container.pixelWidth / 2) {
                        var value = dataItem1.value;

                        dataItem1.hide();

                        var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice1.hideTooltip();
                        })

                        slice2.x = 0;
                        slice2.y = 0;

                        dataItem2.show();
                    }
                    else {
                        slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                    }
                }
                if (targetSlice == slice2) {
                    if (targetSlicePoint.x < container.pixelWidth / 2) {

                        var value = dataItem2.value;

                        dataItem2.hide();

                        var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice2.hideTooltip();
                        })

                        slice1.x = 0;
                        slice1.y = 0;
                        dataItem1.show();
                    }
                    else {
                        slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
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
                }
                else {
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
            })

            series1.events.on("datavalidated", function () {
                var dummyDataItem = series1.dataItems.getIndex(0);
                dummyDataItem.hide(0);
                dummyDataItem.slice.draggable = false;
                dummyDataItem.slice.tooltipText = undefined;
            })




        }).catch(err => { throw err });

}

function call3DPieChart(dataUrl, divId, chartTitle, chartValue, chartCategory) {
    console.log("dataUrl", dataUrl);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.PieChart);
    chart.dataSource.url = dataUrl;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40)



    chart.dataSource.events.on("done", function (ev) {
        $("#" + divId).show(1000);
    });
    var pieSeries = chart.series.push(new am4charts.Pie3DSeries());
    pieSeries.dataFields.value = chartValue;
    pieSeries.dataFields.category = chartCategory; // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;



    // Disable tooltips
    pieSeries.slices.template.tooltipText = "";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "buttom";
    chart.legend.maxHeight = 150;
    chart.legend.scrollable = true;

    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    /*chart.exporting.menu = new am4core.ExportMenu();*/
}


function MakeBoxPlotAMCHARt() {
    am4core.ready(function () {



        var myOutLaierData = [];
        $.ajax({
            type: "GET",
            url: "/Test/testGetOutlaiers",
            data: {
            },
            success: function (data) {


                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                var chart = am4core.create("chartdiv", am4charts.XYChart);
                chart.paddingRight = 20;
                chart.dataSource.url = "/Test/test1";
                chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";




                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = "Segment";
                categoryAxis.renderer.minGridDistance = 60;
                categoryAxis.renderer.grid.template.disabled = true;
                categoryAxis.renderer.baseGrid.disabled = true;
                categoryAxis.renderer.labels.template.dy = 20;



                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;

                var series = chart.series.push(new am4charts.CandlestickSeries());
                series.dataFields.categoryX = "Segment";
                series.dataFields.valueY = "Percentile75";
                series.dataFields.openValueY = "Percentile25";
                series.dataFields.lowValueY = "LowerOutlierLimit";
                series.dataFields.highValueY = "UpperOutlierLimit";
                series.simplifiedProcessing = true;
                series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}\nMediana:{Percentile50}";
                series.riseFromOpenState = undefined;
                series.dropFromOpenState = undefined;

                chart.cursor = new am4charts.XYCursor();

                var medianaSeries = chart.series.push(new am4charts.StepLineSeries());
                medianaSeries.noRisers = true;
                medianaSeries.startLocation = 0.1;
                medianaSeries.endLocation = 0.9;
                medianaSeries.dataFields.valueY = "Percentile50";
                medianaSeries.dataFields.categoryX = "Segment";
                medianaSeries.strokeWidth = 2;
                medianaSeries.stroke = am4core.color("#fff");


                var topSeries = chart.series.push(new am4charts.StepLineSeries());
                topSeries.noRisers = true;
                topSeries.startLocation = 0.2;
                topSeries.endLocation = 0.8;
                topSeries.dataFields.valueY = "UpperOutlierLimit";
                topSeries.dataFields.categoryX = "Segment";
                topSeries.stroke = chart.colors.getIndex(0);
                topSeries.strokeWidth = 2;

                var MeanSeries = chart.series.push(new am4charts.StepLineSeries());
                MeanSeries.noRisers = true;
                MeanSeries.startLocation = 0.1;
                MeanSeries.endLocation = 0.9;
                MeanSeries.dataFields.valueY = "MeanTotalAmount";
                MeanSeries.dataFields.categoryX = "Segment";
                MeanSeries.strokeDasharray = "3,3";
                MeanSeries.strokeWidth = 2;
                MeanSeries.stroke = am4core.color("#fff");

                var bottomSeries = chart.series.push(new am4charts.StepLineSeries());
                bottomSeries.noRisers = true;
                bottomSeries.startLocation = 0.2;
                bottomSeries.endLocation = 0.8;
                bottomSeries.dataFields.valueY = "LowerOutlierLimit";
                bottomSeries.dataFields.categoryX = "Segment";
                bottomSeries.stroke = chart.colors.getIndex(0);
                bottomSeries.strokeWidth = 2;



                myOutLaierData = data;
                var outliersSeries = chart.series.push(new am4charts.LineSeries());
                outliersSeries.strokeOpacity = 0;
                outliersSeries.data = myOutLaierData;
                //console.log("out: ", JSON.stringify(data));
                outliersSeries.dataFields.categoryX = "Segment";
                outliersSeries.dataFields.valueY = "outliers";
                var bullet = outliersSeries.bullets.push(new am4charts.CircleBullet());
                outliersSeries.tooltipText = "{valueY.value}";
                outliersSeries.fill = am4core.color("#000");
                //outliersSeries.fill = chart.colors.getIndex(0);
                console.log("am out: ", JSON.stringify(outliersSeries.data));


                chart.scrollbarX = new am4core.Scrollbar();




            },

        });

        //console.log("am out: ", JSON.stringify(outliersSeries.data));








    }); // end am4core.ready()
}

function callDragDropChartWithAction(dataUrl, divId, chartTitle, chartValue, chartCategory,actionOnDhit) {



    var data = [{
        Name: "Dummy",
        "disabled": true,
        Count: 1000,
        "color": am4core.color("#dadada"),
        "opacity": 0.3,
        "strokeDasharray": "4,4"
    }];

    var fetchedData;
    var chartData;
    let url = dataUrl;
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            fetchedData = out;
            chartData = data.concat(fetchedData);

            //to cleare logo
            am4core.addLicense("ch-custom-attribution");
            am4core.useTheme(am4themes_animated);
            var container = am4core.create(divId, am4core.Container);
            container.width = am4core.percent(100);
            container.height = am4core.percent(100);
            container.layout = "horizontal";
            container.events.on("maxsizechanged", function () {
                chart1.zIndex = 0;
                separatorLine.zIndex = 1;
                chart2.zIndex = 3;
            })
            var axisTitle = container.createChild(am4core.Label);
            axisTitle.text = chartTitle;
            axisTitle.fontWeight = 800;
            axisTitle.align = "center";
            //axisTitle.paddingLeft = 10;
            //declare chart 1
            var chart1 = container.createChild(am4charts.PieChart);
            chart1.hiddenState.properties.opacity = 0;
            chart1.radius = am4core.percent(70);
            chart1.innerRadius = am4core.percent(40);
            chart1.data = chartData;
            chart1.zIndex = 1;


            chart1.legend = new am4charts.Legend();
            chart1.legend.position = "buttom";
            chart1.legend.maxHeight = 150;
            chart1.legend.scrollable = true;

            var series1 = chart1.series.push(new am4charts.PieSeries());
            series1.dataFields.value = chartValue;
            series1.dataFields.category = chartCategory;
            //series1.labels.template.propertyFields.disabled = "disabled";
            series1.labels.template.disabled = true;
            series1.ticks.template.propertyFields.disabled = "disabled";
            series1.colors.step = 2;
            var zIndex = 5;

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
            sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;
            sliceTemplate1.events.on("down", function (event) {
                event.target.toFront();
                // also put chart to front
                var series = event.target.dataItem.component;
                series.chart.zIndex = zIndex++;
            })
            sliceTemplate1.events.on("dragstop", function (event) {
                handleDragStop(event);
            })

            // separator line and text
            var separatorLine = container.createChild(am4core.Line);
            separatorLine.x1 = 0;
            separatorLine.y2 = 300;
            separatorLine.strokeWidth = 3;
            separatorLine.stroke = am4core.color("#dadada");
            separatorLine.valign = "middle";
            separatorLine.strokeDasharray = "5,5";
            /*var title = chart1.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/

            //declare chart 2
            var chart2 = container.createChild(am4charts.PieChart);
            chart2.hiddenState.properties.opacity = 0;
            chart2.hiddenState.properties.opacity = 0;
            chart2.radius = am4core.percent(70);
            chart2.innerRadius = am4core.percent(40);
            chart2.data = chartData;
            chart2.zIndex = 1;


            /*chart2.legend = new am4charts.Legend();
            chart2.legend.position = "buttom";*/


            var series2 = chart2.series.push(new am4charts.PieSeries());
            series2.dataFields.value = chartValue;
            series2.dataFields.category = chartCategory;
            series2.labels.template.propertyFields.disabled = "disabled";
            //series2.labels.template.disabled = true;

            series2.ticks.template.propertyFields.disabled = "disabled";
            series2.colors.step = 2;

            var sliceTemplate2 = series2.slices.template;
            sliceTemplate2.copyFrom(sliceTemplate1);
            /*var title = chart2.titles.create();
            title.text = chartTitle;
            title.fontSize = 25;
            title.marginBottom = 30;*/
            function handleDragStop(event) {
                var targetSlice = event.target;
                var dataItem1;
                var dataItem2;
                var slice1;
                var slice2;

                if (series1.slices.indexOf(targetSlice) != -1) {
                    slice1 = targetSlice;
                    slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
                }
                else if (series2.slices.indexOf(targetSlice) != -1) {
                    slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                    slice2 = targetSlice;
                }


                dataItem1 = slice1.dataItem;
                dataItem2 = slice2.dataItem;

                var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
                var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

                var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
                var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

                // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
                var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

                if (targetSlice == slice1) {
                    if (targetSlicePoint.x > container.pixelWidth / 2) {
                        var value = dataItem1.value;

                        dataItem1.hide();

                        var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice1.hideTooltip();
                        })

                        slice2.x = 0;
                        slice2.y = 0;

                        dataItem2.show();
                    }
                    else {
                        slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                    }
                }
                if (targetSlice == slice2) {
                    if (targetSlicePoint.x < container.pixelWidth / 2) {

                        var value = dataItem2.value;

                        dataItem2.hide();

                        var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                        animation.events.on("animationprogress", function (event) {
                            slice2.hideTooltip();
                        })

                        slice1.x = 0;
                        slice1.y = 0;
                        dataItem1.show();
                    }
                    else {
                        slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
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
                }
                else {
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
            })

            series1.events.on("datavalidated", function () {
                var dummyDataItem = series1.dataItems.getIndex(0);
                dummyDataItem.hide(0);
                dummyDataItem.slice.draggable = false;
                dummyDataItem.slice.tooltipText = undefined;
            })

            series1.slices.template.events.on("doublehit", actionOnDhit);
            series2.slices.template.events.on("doublehit", actionOnDhit);



        }).catch(err => { throw err });

}





/**
* @param {string} chartId - grid id 
* @param {string} url - url to get data 
* @param {string} chartTitle - chart title
* @param {object} seriesList - array object to fill series [{value:'seriesValueColumn',name:'seriesName'},
*                                                           {value:'seriesValueColumn',name:'seriesName'},
*                                                           ]
*
*/
function clusterdBarChart(chartId, url, chartTitle, seriesList) {
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end



        var chart = am4core.create(chartId, am4charts.XYChart)
        chart.colors.step = 2;

        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        chart.legend.paddingBottom = 20
        chart.legend.labels.template.maxWidth = 95

        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        xAxis.dataFields.category = 'category'
        xAxis.renderer.cellStartLocation = 0.1
        xAxis.renderer.cellEndLocation = 0.9
        xAxis.renderer.grid.template.location = 0;

        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;

        function createSeries(value, name) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = value
            series.dataFields.categoryX = 'category'
            series.name = name

            series.events.on("hidden", arrangeColumns);
            series.events.on("shown", arrangeColumns);

            var bullet = series.bullets.push(new am4charts.LabelBullet())
            bullet.interactionsEnabled = false
            bullet.dy = 30;
            bullet.label.text = '{valueY}'
            bullet.label.fill = am4core.color('#ffffff')

            return series;
        }

        chart.dataSource.url = url;
        seriesList.forEach(item => {
            createSeries(item['value'], item['name']);
        })
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
        title.text = chartTitle;
        title.fontSize = 25;
        title.marginBottom = 30;

    }); // end am4core.ready()
}

/**
* @param {string} chartId - grid id 
* @param {string} url - url to get data 
* @param {string} chartTitle - chart title
* @param {object} seriesList - array object to fill series [{value:'seriesValueColumn',name:'seriesName'},
*                                                           {value:'seriesValueColumn',name:'seriesName'},
*                                                           ]
*
*/
function stackedChart(chartId, url, chartTitle, seriesList,catColumn) {
    /*am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end


        // Create chart instance


        var chart = am4core.create(chartId, am4charts.XYChart);
        chart.colors.step = 2;
        chart.marginRight = 400;

        

        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = catColumn;
        xAxis.renderer.cellStartLocation = 0.1;
        xAxis.renderer.cellEndLocation = 0.9;
        xAxis.renderer.grid.template.location = 0;
        // Setting up label rotation
        xAxis.renderer.labels.template.rotation = 90;

        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;

        function createSeries(value, name) {

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = value;
            series.dataFields.categoryX = catColumn;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.stacked = true;


            *//*var series = chart.series.push(new am4charts.ColumnSeries())
            series.dataFields.valueY = value
            series.dataFields.categoryX = 'category'
            series.stacked = true;
            series.name = name

            series.events.on("hidden", arrangeColumns);
            series.events.on("shown", arrangeColumns);

            var bullet = series.bullets.push(new am4charts.LabelBullet())
            //bullet.interactionsEnabled = false
            bullet.dy = 30;
            bullet.label.text = '{valueY}'
            bullet.label.fill = am4core.color('#ffffff')*//*

            return series;
        }

        chart.dataSource.url = url;
        seriesList.forEach(item => {
            createSeries(item['value'], item['name']);
        })
        *//*createSeries('first', 'The First');
        createSeries('second', 'The Second');
        createSeries('third', 'The Third');*//*

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
        title.text = chartTitle;
        title.fontSize = 25;
        title.marginBottom = 30;

    }); // end am4core.ready()*/

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(chartId, am4charts.XYChart);

    chart.marginRight = 400;

    // Add data
    /*chart.data = [{
        "country": "Lithuania",
        "research": 501.9,
        "marketing": 250,
        "sales": 199
    }, {
        "country": "Czech Republic",
        "research": 301.9,
        "marketing": 222,
        "sales": 251
    }, {
        "country": "Ireland",
        "research": 201.1,
        "marketing": 170,
        "sales": 199
    }, {
        "country": "Germany",
        "research": 165.8,
        "marketing": 122,
        "sales": 90
    }, {
        "country": "Australia",
        "research": 139.9,
        "marketing": 99,
        "sales": 252
    }, {
        "country": "Austria",
        "research": 128.3,
        "marketing": 85,
        "sales": 84
    }, {
        "country": "UK",
        "research": 99,
        "marketing": 93,
        "sales": 142
    }, {
        "country": "Belgium",
        "research": 60,
        "marketing": 50,
        "sales": 55
    }, {
        "country": "The Netherlands",
        "research": 50,
        "marketing": 42,
        "sales": 25
    }];*/

    //console.log('chart', chart);

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = catColumn;
    //categoryAxis.title.text = "Local country offices";
    //categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.rotation = 90;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Expenditure (M)";

    function createSeries(value, name) {

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = value;
        series.dataFields.categoryX = catColumn;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = true;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    chart.dataSource.url = url;


    // Create series
    chart.dataSource.url = url;
    seriesList.forEach(item => {
        createSeries(item['value'], item['name']);
    })
   
    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

}


function makePieChartWithAction(dataUrl, divId, chartTitle, chartValue, chartCategory,actionWhenDhit) {
    console.log("dataUrl", dataUrl);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create(divId, am4charts.PieChart);
    chart.dataSource.url = dataUrl;




    chart.dataSource.events.on("done", function (ev) {
        $("#" + divId).show(1000);
    });
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = chartValue;
    pieSeries.dataFields.category = chartCategory; // Disable ticks and labels
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    pieSeries.slices.template.events.on("doublehit", actionWhenDhit);


    // Disable tooltips
    pieSeries.slices.template.tooltipText = "";

    chart.legend = new am4charts.Legend();
    chart.legend.position = "buttom";
    chart.legend.maxHeight = 150;
    chart.legend.scrollable = true;

    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    
    /*chart.exporting.menu = new am4core.ExportMenu();*/
}

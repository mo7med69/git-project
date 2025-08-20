
// import * as core from "../../../lib/Plugins/amcharts_4.10.18/amcharts4/core.js"
// import * as charts from "../../../lib/Plugins/amcharts_4.10.18/amcharts4/charts.js";
// import * as matrial from "../../../lib/Plugins/amcharts_4.10.18/amcharts4/themes/material.js";
// import * as animated from "../../../lib/Plugins/amcharts_4.10.18/amcharts4/themes/animated.js";
import { URLS } from "../../URLConsts.js"

import { parametersConfig } from "../../QueryBuilderConfiguration/QuerybuilderParametersSettings.js"
import { mapParamtersToFilters, multiSelectOperation } from "../../QueryBuilderConfiguration/QuerybuilderConfiguration.js"

let chartTypes = {};

fetch("/CustomReport/GetChartsTypes/").then(x => x.json()).then(types => {
    types.forEach(t => {
        chartTypes[t.value] = t.text
    });
    console.log(types);
})

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);
am4core.addLicense("ch-custom-attribution");



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


class BaseCatValChart extends HTMLElement {
    chartDiv = document.createElement("div");
    loadingDiv = document.createElement("div");
    chart = undefined;
    data = [];
    dataUrl = "";
    chartTitle = "";
    chartCategory = "";
    chartValue = "";
    filterBuilder = undefined;
    filtersApplyBtn = undefined;
    constructor() {
        super();

    }
    connectedCallback() {
        this.classList.add("d-flex", "justify-content-center", "align-items-center")
        this.loadingDiv.classList.add("spinner-grow", "text-primary");
        this.chartDiv.style.height = '100%';
        this.chartDiv.style.width = '100%';
        this.appendChild(this.loadingDiv);
        this.appendChild(this.chartDiv);

        if (this.dataset.filterbuilderid) {
            this.filterBuilder = document.getElementById(this.dataset.filterbuilderid);
            this.filtersApplyBtn = document.getElementById(this.filterBuilder.dataset.applybtn);
            var rep = parametersConfig.find(x => x.reportName == this.filterBuilder.dataset.params);
            var customOps = [];
            var multifields = rep.parameters.filter(x => x.isMulti);
            multifields.forEach(p => {
                var vals = [];
                if (p.values.url) {
                    $.ajax({
                        url: p.values.url,
                        type: "GET",
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            vals = data;
                        }
                    });
                }
                else
                    vals = p.values.static;

                customOps.push(multiSelectOperation(p.paraName, vals));
            })


            this.filterBuilder.customOperations = customOps;
            var filters = mapParamtersToFilters(rep.parameters);
            this.filterBuilder.fields = filters;
            if (rep.defaultFilter) {
                this.filterBuilder.value = rep.defaultFilter;
            }

            this.filtersApplyBtn.addEventListener('click', async () => {
                var flatted = this.filterBuilder.value.flat();
                var val = flatted.filter(x => x !== "or" && x !== "and").map(x => {
                    var val = x[2];
                    return {
                        Field: x[0],
                        Operator: x[1],
                        Value: val
                    }

                });
                await this.readData(val);
            });
        }


        this.chartDiv.hidden = true;
        //this.chartDiv.id = this.id + "-BarChart";
        this.dataUrl = URLS[this.dataset.dataurlkey];
        this.chartTitle = this.dataset.title;
        this.chartCategory = this.dataset.category;
        this.chartValue = this.dataset.value;

    }


    async readData(body) {
        this.toggleLoading();
        var method = "GET";
        if (body) {
            method = "POST";
        }

        try {
            var data = await (await fetch(this.dataUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                ...(body && { body: JSON.stringify(body) })
            })).json();
            console.log(this.chartValue, this.chartCategory, data);

            this.data = data;
            this.chart.data = this.data;
            this.chart.validateData();
        } catch (e) {
            console.error(e);
            toastObj.icon = 'error';
            toastObj.text = "failed to load data for the chart";
            toastObj.heading = "Chart Status";
            $.toast(toastObj);
        } finally {
            this.toggleLoading();
        }
    }


    setdata(data) {

        this.toggleLoading();
        this.data = data;
        this.chart.data = this.data;
        this.chart.validateData();
        this.toggleLoading();
        console.log(this.chart.data)

    }

    toggleLoading() {
        this.loadingDiv.hidden = !this.loadingDiv.hidden
        this.chartDiv.hidden = !this.chartDiv.hidden;

    }

    makeTitle() {
        var title = this.chart.titles.create();
        title.text = this.chartTitle;
        title.fontSize = 25;
        title.marginBottom = 30;
    }
    makeExportMenu(){
        this.chart.exporting.menu = new am4core.ExportMenu();
        this.chart.exporting.menu.items = exportMenu;
        this.chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
    }
}

class PieChart extends BaseCatValChart {

    connectedCallback() {

        super.connectedCallback();
        this.chartDiv.id = this.id + "-PieChart";
        this.chart = am4core.create(this.id + "-PieChart", am4charts.PieChart);
        this.chart.data = this.data;
        var pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = this.chartValue;
        pieSeries.dataFields.category = this.chartCategory;
        // Disable ticks and labels
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        this.chart.legend = new am4charts.Legend();
        this.chart.legend.maxHeight = 600;
        this.chart.legend.maxWidth = 300;
        this.chart.legend.scrollable = true;
        this.chart.legend.position = "bottom";
        this.chart.legend.labels.template.text = "{name} : ({value})";

        var title = this.chart.titles.create();
        title.text = this.chartTitle;
        title.fontSize = 25;
        title.marginBottom = 30;
        this.makeExportMenu();
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);
    }
}

class BarChart extends BaseCatValChart {

    isHorizontal = false;

    connectedCallback() {

        super.connectedCallback();
        this.chartDiv.id = this.id + "-BarChart";

        if (!Object.keys(this.dataset).includes("horizontal"))
            this.makeBar();
        else
            this.makeHBar();
        this.chart.exporting.menu = new am4core.ExportMenu();
        this.chart.exporting.menu.items = exportMenu;


        //if (columnsColorFunc) {
        //    series.columns.template.adapter.add("fill", (fill, target) => columnsColorFunc(fill, target)
        //    );

        //} else {
        //    series.columns.template.adapter.add("fill", (fill, target) => {
        //        return this.chart.colors.getIndex(target.dataItem.index);
        //    });
        //}








        setTimeout(() => {
            this.toggleLoading();
        }, 3000);


        //var pieSeries = this.chart.series.push(new am4charts.PieSeries());
        //pieSeries.dataFields.value = this.chartValue;
        //pieSeries.dataFields.category = this.chartCategory;
        //// Disable ticks and labels
        //pieSeries.labels.template.disabled = true;
        //pieSeries.ticks.template.disabled = true;

        //this.chart.legend = new am4charts.Legend();
        //this.chart.legend.maxHeight = 600;
        //this.chart.legend.maxWidth = 300;
        //this.chart.legend.scrollable = true;
        //this.chart.legend.position = "bottom";
        //this.chart.legend.labels.template.text = "{name} : ({value})";

        //var title = this.chart.titles.create();
        //title.text = this.chartTitle;
        //title.fontSize = 25;
        //title.marginBottom = 30;
        //setTimeout(() => {
        //    this.toggleLoading();
        //}, 3000);
    }
    makeRotateButton() {
        let buttonContainer = this.chart.chartContainer.createChild(am4core.Container);
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
    makeBar() {

        this.chart = am4core.create(this.chartDiv, am4charts.XYChart);
        this.chart.data = this.data;
        var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());

        categoryAxis.renderer.labels.template.fontSize = 20;
        categoryAxis.dataFields.category = this.chartCategory;


        categoryAxis.renderer.labels.template.dy = -5;
        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });
        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fontSize = 20;
        var series = this.chart.series.push(new am4charts.ColumnSeries());
        series.columns.template.fill = am4core.color("#104547");
        series.dataFields.valueY = this.chartValue;
        series.dataFields.categoryX = this.chartCategory;
        series.columns.template.adapter.add("fill", (fill, target) => {
            return this.chart.colors.getIndex(target.dataItem.index);
        });
        this.chart.maskBullets = false;
        this.chart.paddingTop = 25;
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.adapter.add("y", function (y) {
            return -15;
        });
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = "zoomX";
        var scrollbar = new am4charts.XYChartScrollbar();

        this.chart.scrollbarX = scrollbar;

        this.makeRotateButton();
        this.makeTitle();
    }
    makeHBar() {
        this.chart = am4core.create(this.chartDiv, am4charts.XYChart);
        this.chart.data = this.data;
        var categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.labels.template.fontSize = 20;
        categoryAxis.dataFields.category = this.chartCategory;
        categoryAxis.renderer.grid.template.location = 0;

        var valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fontSize = 20;
        var series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = this.chartValue;
        series.dataFields.categoryY = this.chartCategory;
        series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
        series.sequencedInterpolation = true;
        series.defaultState.transitionDuration = 1000;
        series.sequencedInterpolationDelay = 100;
        series.columns.template.strokeOpacity = 0;
        series.tooltip.fontSize = 17;

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
        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = "zoomY";

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
        var title = this.chart.titles.create();
        title.text = this.title;
        title.fontSize = 25;
        title.marginBottom = 30;
        //// Add scrollbar
        var scrollbar = new am4charts.XYChartScrollbar();
        this.chart.scrollbarY = scrollbar;
        this.chart.events.on("ready", () => {
            categoryAxis.zoomToIndexes(this.data.length - 5, this.data.length);
        });
        this.makeRotateButton();
        this.makeTitle();
    }
}

class DragDropChart extends BaseCatValChart {
    connectedCallback() {

        super.connectedCallback();

        var dumm = {
            disabled: true,
            color: am4core.color("#dadada"),
            opacity: 0.3,
            strokeDasharray: "4,4",
        };

        dumm[this.chartCategory] = "Dummy";
        dumm[this.chartValue] = 1000;

        this.data = [dumm, ...this.data];

        // cointainer to hold both charts
        var container = am4core.create(this.chartDiv, am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";



        var chart1 = container.createChild(am4charts.PieChart);
        chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart1.data = this.data;
        chart1.radius = am4core.percent(70);
        chart1.innerRadius = am4core.percent(40);
        chart1.zIndex = 1;

        var series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = this.chartCategory;
        series1.dataFields.category = this.chartValue;
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
        chartTitle.text = this.title;
        chartTitle.valign = "top";
        chartTitle.align = "center";
        chartTitle.fontSize = 25;
        chartTitle.marginBottom = 30;

        // second chart
        var chart2 = container.createChild(am4charts.PieChart);
        chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart2.radius = am4core.percent(70);
        chart2.data = this.data;
        chart2.innerRadius = am4core.percent(40);
        chart2.zIndex = 1;

        var series2 = chart2.series.push(new am4charts.PieSeries());
        series2.dataFields.value = this.chartValue;
        series2.dataFields.category = this.chartCategory;
        series2.colors.step = 2;

        var sliceTemplate2 = series2.slices.template;
        sliceTemplate2.copyFrom(sliceTemplate1);
        series2.labels.template.disabled = true;
        series2.ticks.template.disabled = true;
        //series2.labels.template.propertyFields.disabled = "disabled";
        //series2.ticks.template.propertyFields.disabled = "disabled";
        container.events.on("maxsizechanged", function () {
            chart1.zIndex = 0;
            separatorLine.zIndex = 1;
            dragText.zIndex = 2;
            chart2.zIndex = 3;
        });
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
}

class CurvedColumnChart extends BaseCatValChart {
    connectedCallback() {

        super.connectedCallback();


        this.chart = am4core.create(this.chartDiv, am4charts.XYChart3D);
        this.chart.data = this.data;
        this.chart.exporting.menu = new am4core.ExportMenu();
        this.chart.exporting.menu.items = exportMenu;

        var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());

        categoryAxis.renderer.labels.template.fontSize = 20;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = this.chartCategory;
        categoryAxis.renderer.minGridDistance = 40;

        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fontSize = 20
        var series = this.chart.series.push(new am4charts.CurvedColumnSeries());
        series.dataFields.categoryX = this.chartCategory;
        series.dataFields.valueY = this.chartValue;
        series.tooltipText = "{valueY.value}";
        series.columns.template.strokeOpacity = 0;

        series.columns.template.fillOpacity = 0.75;

        var hoverState = series.columns.template.states.create("hover");
        hoverState.properties.fillOpacity = 1;
        hoverState.properties.tension = 0.5;

        this.chart.cursor = new am4charts.XYCursor();
        this.chart.cursor.behavior = "panX";

        // Add distinctive colors for each column using adapter
        series.columns.template.adapter.add("fill", (fill, target) => {
            return this.chart.colors.getIndex(target.dataItem.index);
        });

        this.chart.scrollbarX = new am4core.Scrollbar();
        this.makeTitle();
        this.makeExportMenu();
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);

        
        //chart.exporting.menu = new am4core.ExportMenu();
    }

}

class CylnderChart extends BaseCatValChart {
    connectedCallback() {

        super.connectedCallback();

        this.chart = am4core.create(this.chartDiv, am4charts.XYChart3D);
        this.chart.data = this.data;
        this.chart.exporting.menu = new am4core.ExportMenu();
        this.chart.exporting.menu.items = exportMenu;

        var categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.labels.template.fontSize = 20;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = this.chartCategory;
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.baseGrid.disabled = true;
        categoryAxis.renderer.labels.template.dy = 20;

        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.labels.template.fontSize = 20
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.renderer.minWidth = 0;

        var series = this.chart.series.push(new am4charts.ConeSeries());
        series.dataFields.categoryX = this.chartCategory;
        series.dataFields.valueY = this.chartValue;
        series.columns.template.tooltipText = "{valueY.value}";
        series.columns.template.tooltipY = 0;
        series.columns.template.strokeOpacity = 1;
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", (fill, target) => {
            return this.chart.colors.getIndex(target.dataItem.index);
        });

        series.columns.template.adapter.add("stroke", (stroke, target) => {
            return this.chart.colors.getIndex(target.dataItem.index);
        });

        chart.cursor = new am4charts.XYCursor();
        this.makeTitle();
        this.makeExportMenu();
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);
        //chart.exporting.menu = new am4core.ExportMenu();
    }
}

class ClusteredColumnChart extends BaseCatValChart {
    xAxis = {}
    connectedCallback() {
        super.connectedCallback();
        this.chartDiv.hidden = false
         this.chart = am4core.create(this.chartDiv, am4charts.XYChart)
        this.chart.colors.step = 2;
        this.xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
        this.xAxis.renderer.labels.template.fontSize = 20;
        this.xAxis.dataFields.category = this.chartCategory;
        this.xAxis.renderer.cellStartLocation = 0.1;
        this.xAxis.renderer.cellEndLocation = 0.9;
        this.xAxis.renderer.grid.template.location = 0;
        this.xAxis.renderer.labels.template.rotation = 90;
        var yAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.renderer.labels.template.fontSize = 20
        // Make the labels vertical
        yAxis.min = 0;
    
        this.chart.data = this.data;
        this.chart.legend = new am4charts.Legend();
    /*createSeries('first', 'The First');
    createSeries('second', 'The Second');
    createSeries('third', 'The Third');*/
    
    var title = this.chart.titles.create();
    title.text = this.chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;
    this.chart.cursor = new am4charts.XYCursor();
    this.chart.cursor.behavior = "zoomX";
    var scrollbar = new am4charts.XYChartScrollbar();
        this.chart.scrollbarX = scrollbar;
        //this.chart.legend = new am4charts.Legend();
    }
    

    createSeries(value, name) {
         var series = this.chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = this.chartCategory
        series.name = name
        console.log(this.chart.series)

   /*     series.events.on("hidden", () =>{
            console.log(this.chart)
            var series = this.chart.series.getIndex(0);
            var w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
            if (series.dataItems.length > 1) {
                var x0 = this.xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = this.xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / this.chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                    var middle = this.chart.series.length / 2;
                    var newIndex = 0;
                    this.chart.series.each(function (series) {
                        if (!series.isHidden && !series.isHiding) {
                            series.dummyData = newIndex;
                            newIndex++;
                        }
                        else {
                            series.dummyData = this.chart.series.indexOf(series);
                        }
                    })
                    var visibleCount = newIndex;
                    var newMiddle = visibleCount / 2;
                    this.chart.series.each(function (series) {
                        var trueIndex = this.chart.series.indexOf(series);
                        var newIndex = series.dummyData;
                        var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                        series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                        series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    })
                }
            }
        });
        series.events.on("shown", () => {
            console.log(this.chart)
            var series = this.chart.series.getIndex(0);
            var w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
            if (series.dataItems.length > 1) {
                var x0 = this.xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = this.xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / this.chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                    var middle = this.chart.series.length / 2;
                    var newIndex = 0;
                    this.chart.series.each(function (series) {
                        if (!series.isHidden && !series.isHiding) {
                            series.dummyData = newIndex;
                            newIndex++;
                        }
                        else {
                            series.dummyData = this.chart.series.indexOf(series);
                        }
                    })
                    var visibleCount = newIndex;
                    var newMiddle = visibleCount / 2;
                    this.chart.series.each(function (series) {
                        var trueIndex = this.chart.series.indexOf(series);
                        var newIndex = series.dummyData;
                        var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                        series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                        series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    })
                }
            }
        });*/
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
    setdata(data) {
       //this.chart.series = [];
        super.setdata(data);
        
        if (this.data[0]) {
            while (this.chart.series.length) {
                this.chart.series.removeIndex(0).dispose();
            }
           Object.keys(this.data[0]).forEach(item => {
               if (item != this.chartCategory)
                   this.createSeries(item, item);
           })
        }
        console.log(this.chart)
        console.log(this.chart.series)

       
       

    }
}

class DonutChart extends BaseCatValChart{
    dHitEvent = undefined;
    connectedCallback() {
        super.connectedCallback();
        this.chart = am4core.create(this.chartDiv, am4charts.PieChart3D);
        this.chart.data = this.data;
        this.chart.innerRadius = am4core.percent(40);
        var pieSeries = this.chart.series.push(new am4charts.PieSeries3D());
        pieSeries.dataFields.value = this.chartValue;
        pieSeries.dataFields.category = this.chartCategory; // Disable ticks and labels
        // Disable ticks and labels
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.colors.step = 2;


        this.chart.innerRadius = am4core.percent(40);
        this.chart.legend = new am4charts.Legend();
        this.chart.legend.maxHeight = 600;
        this.chart.legend.maxWidth = 300;
        this.chart.legend.scrollable = true;
        this.chart.legend.position = "bottom"; 
        this.chart.legend.labels.template.text = "{name} : ({value})";
        this.makeTitle();
        this.makeExportMenu();
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);
    }


    set onSeriesDbClick(callBack) {
        let series = this.chart.series.getIndex(0);
        if (this.dHitEvent)
            this.dHitEvent.dispose();
        this.dHitEvent = series.slices.template.events.on("doublehit", (ev) => callBack(ev));
    }
}

class LineChart extends BaseCatValChart {
    connectedCallback() {
         super.connectedCallback();
        // Create chart instance
         this.chart = am4core.create(this.chartDiv, am4charts.XYChart);

        // Add data
        this.chart.data = this.data;

        // Create axes
        var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 40;
        dateAxis.baseInterval = {
            "timeUnit": "month",
            "count": 1
        }
        var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        const createSeries =  (field, name)=> {
            var series = this.chart.series.push(new am4charts.LineSeries());
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

      

        createSeries(this.chartValue, this.chartCategory);
        this.chart.legend = new am4charts.Legend();
   
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
    
        this.makeTitle();
        this.makeExportMenu();
        setTimeout(() => {
            this.toggleLoading();
        }, 3000);
    }
}
//class
class PieWithBarChart extends  HTMLElement
{
    chartDiv = document.createElement("div");
    donutChart = undefined;
    barChart = undefined;
    chart = undefined;
    chartTitle = "";
    barCategory ="";
    barValue ="";
    donutCategory ="";
    donutValue ="";
    data = [];
    barDataKey = "";
    exportValueName = "value";
    onseriesChanged = () => {};
    constructor() {
        super();
        this.appendChild(this.chartDiv)
    }
    connectedCallback(){

        try {
            this.chartDiv.classList.add("h-100", "w-100")
            this.chartDiv.style.height="600PX"
            this.chartTitle = this.dataset.title;
            this.donutCategory = this.dataset.donutcategory ?? "";
            this.donutValue = this.dataset.donutvalue ?? "";

            this.barCategory = this.dataset.barcategory ?? "";
            this.barValue = this.dataset.barvalue ?? "";

            this.barDataKey = this.dataset.bardatakey ?? "";
            this.exportValueName = this.dataset.exportvaluename ?? "Value";


            this.chart = am4core.create(this.chartDiv, am4core.Container);
            this.chart.width = am4core.percent(100);
            this.chart.height = am4core.percent(100);
            this.chart.layout = "horizontal";

            /*this.chart.exporting.menu = new am4core.ExportMenu();
            this.chart.exporting.menu.items = exportMenu;*/

            /**
             * Column chart
             */

            // Create chart instance
            this.barChart = this.chart.createChild(am4charts.XYChart);

            // Create axes
            let categoryAxis = this.barChart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.labels.template.fontSize = 20
            categoryAxis.dataFields.category = this.barCategory;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.inversed = true;

            let valueAxis =   this.barChart .xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.labels.template.fontSize = 20;

            // Create series
            let columnSeries =   this.barChart.series.push(new am4charts.ColumnSeries());
            columnSeries.dataFields.valueX = this.barValue;
            columnSeries.dataFields.categoryY = this.barCategory;
            columnSeries.columns.template.strokeWidth = 0;
            columnSeries.columns.template.tooltipText = "{value}";
            columnSeries.fill = "#5CC0DE" ;


            let valueLabel = columnSeries.bullets.push(new am4charts.LabelBullet());
            valueLabel.label.text = "{value}";
            valueLabel.label.fontSize = 20;
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.hideOversized = false;
            valueLabel.label.truncate = false;
            valueLabel.label.dx = 10;
            this.barChart .cursor = new am4charts.XYCursor();
            this.barChart .cursor.behavior = "zoomX";
            let scrollbar = new am4charts.XYChartScrollbar();
            this.barChart.scrollbarX = scrollbar;







            this.donutChart = this.chart.createChild(am4charts.PieChart);
            this.donutChart.data = this.data;
            this.donutChart.innerRadius = am4core.percent(50);
            let title =   this.donutChart.titles.create();
            title.text = this.chartTitle;
            title.fontSize = 25;
            this.donutChart.legend = new am4charts.Legend();
            this.donutChart.legend.maxHeight = 600;
            this.donutChart.legend.maxWidth = 300;
            this.donutChart.legend.scrollable = true;
            this.donutChart.legend.position = "bottom";
            this.donutChart.legend.labels.template.text = "{name} : ({value})";
            // Add and configure Series
            let pieSeries = this.donutChart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = this.donutValue;
            pieSeries.dataFields.category = this.donutCategory;
            pieSeries.labels.template.disabled = true;


            this.donutChart.events.on("datavalidated",  (ev) => {
                if (this.data.length > 0) {
                    console.log(pieSeries.slices);
                    pieSeries.slices.getIndex(0).isActive = true;

                }
                    
            });
            
            pieSeries.slices.template.events.on("toggled", (ev) => {
                console.log(ev.target.isActive);
                if (ev.target.isActive) {

                    // Untoggle other slices
                    pieSeries.slices.each(function (slice) {
                        if (slice !== ev.target) {
                            slice.isActive = false;
                        }
                    });

                    // Update column chart
                    columnSeries.appeared = false;
                    console.log(ev.target.dataItem.dataContext[this.barDataKey]);
                    this.barChart.data = ev.target.dataItem.dataContext[this.barDataKey];
                    columnSeries.fill = ev.target.fill;
                    columnSeries.reinit();
                    this.onseriesChanged(ev.target.dataItem.dataContext);

                }
            });
           
            //this.makeExportMenu();
            this.makeExportMenu(this.donutChart);
            //this.makeExportMenu(this.barChart);
       
        }
        catch (e) {
            console.error(  e)
        }

    }

    setData(data){
        console.log(data);
        this.data = data;
        this.donutChart.data = data;
    }
    makeExportMenu(chart) {
        var exportDataColumnHeader = this.exportValueName
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.items = exportMenu;
        chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";

        const monthOrder = {
            "Jan": 1,
            "Feb": 2,
            "Mar": 3,
            "Apr": 4,
            "May": 5,
            "Jun": 6,
            "Jul": 7,
            "Aug": 8,
            "Sep": 9,
            "Oct": 10,
            "Nov": 11,
            "Dec": 12
        };
        chart.exporting.adapter.add("data", function (data) {
            var flatRecordsArray = chart.data.flatMap(function (obj) {
                console.log(obj)
                return obj.monthData.map(function (monthData) {
                    var reternObj = {};
                    reternObj["Year"] = obj.year;
                    reternObj["Month"] = monthData.month;
                    reternObj[exportDataColumnHeader] = Number(monthData.value);

                    return reternObj/*{
                        year: obj.year,
                        month: monthData.month,
                        value: Number(monthData.value)
                    }*/;
                });
            });
            flatRecordsArray.sort(function (a, b) {
                // First, compare the years
                if (a.year !== b.year) {
                    return  b.year - a.year;;
                } else {
                    // If the years are the same, compare the months using the custom monthOrder map
                    return monthOrder[b.month]-monthOrder[a.month] ;
                }
            });
            data.data = [];
            data.data = flatRecordsArray;
            return data;
        });
    }
    set onSeriesChanged(callback){
        this.onseriesChanged = callback;
    }

}

customElements.define("m-pie-chart"                     , PieChart);
customElements.define("m-bar-chart"                         , BarChart);
customElements.define("m-drag-drop-chart"                       , DragDropChart);
customElements.define("m-curved-column-chart"                               , CurvedColumnChart);
customElements.define("m-clynder-chart"                                     , CylnderChart);
customElements.define("m-clustered-chart"                                           , ClusteredColumnChart);
customElements.define("m-donut-chart"                           , DonutChart);
customElements.define("m-line-chart"                            ,    LineChart);
customElements.define("m-piewithbar-chart"                          , PieWithBarChart);




export function getChartType(chartType) {
    let type = chartTypes[chartType];
    console.log(type,chartType);
    switch (type) {
        case 'bar':
            return "m-bar-chart";
        case 'pie':
            return "m-pie-chart";
        case 'donut':
            return "m-donut-chart";
        case 'dragdrop':
            return "m-drag-drop-chart";
        case 'clynder':
            return "m-clynder-chart";
        case 'curvy':
            return "m-curved-column-chart" ;
        case 'curvedline':
            // Assuming 'curvedline' refers to a line chart
            return "m-line-chart";
        case 'clusteredbarchart':
            // Assuming 'curvedline' refers to a line chart
            return "m-clustered-chart";
        default:
            return "Invalid chart type";
    }
}

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
   
   



   /**
    * Pie chart
    */

   // Create chart instance
 

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


   // Set up toggling events
   


}

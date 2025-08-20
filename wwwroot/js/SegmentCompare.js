var selectedMonthKey = "";
var selectedSegmentType = "";
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
makeSpinner("/SegmentationCharts/MonthKeys", "month-key-spinner", "monthKey", (e) => onChangeMonthKey(e));
function onChangeMonthKey(e) {
    selectedMonthKey = e.target.value;

    makeSpinner("/SegmentationCharts/SegTypesPerKey?monthkey=" + selectedMonthKey, "segment-type", "segmentType", (e) => onChangeSegmentType(e));
    DrawOnMonthCharts();
}
function onChangeSegmentType(e) {
    selectedSegmentType = e.target.value;
    //makeSpinner("/SegmentationCharts/Segs?monthkey=" + selectedMonthKey + "&Type=" + selectedSegmentType);
    PrepDataDrawChart(selectedSegmentType);
    DrawCharts(selectedSegmentType);
}



function makeSpinner(url, divId, spinnerDefaultValue,onOptChange) {
    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
            var queueList = data;

            var select = document.getElementById(divId);
            select.innerHTML = "";
            var fopt = document.createElement('option');
            fopt.value = spinnerDefaultValue;
            fopt.innerHTML = spinnerDefaultValue;
            select.onchange = onOptChange;
            select.appendChild(fopt);
            queueList.forEach(q => {
                var opt = document.createElement('option');
                opt.value = q;
                opt.innerHTML = q;
                select.appendChild(opt);
            })
        },

    });
}
function PrepDataDrawChart(SegmentType) {

    //start get the current selected monthKey & current Type
    var monthkey = document.getElementById('month-key-spinner').value;
    var Type = SegmentType;
    //End

    //display elments
  

    //start getting all segments data from api according to the current selected
    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/GetAllSegmentData?monthKey=" + monthkey + "&Type=" + Type,
        data: {
        },
        success: function (data) {
            am4core.useTheme(am4themes_animated);
            am4core.addLicense("ch-custom-attribution");
            var chart = am4core.create("SegmentsComparisonChart", am4charts.XYChart3D);
            var title = chart.titles.create();
            title.text = "Segments Comparison Chart";
            title.fontSize = 25;
            title.marginBottom = 30;
            chart.data = data;
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.menu.items = exportMenu;
            chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
            chart.exporting.filePrefix = title.text + "_" + formatDate(new Date())

            chart.padding(30, 30, 10, 30);
            chart.legend = new am4charts.Legend();
            chart.colors.step = 2;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "SegmentSorted";
            categoryAxis.renderer.minGridDistance = 10;
            categoryAxis.renderer.grid.template.location = 1;
            categoryAxis.interactionsEnabled = false;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.grid.template.strokeOpacity = 0.05;
            valueAxis.renderer.minGridDistance = 15;
            valueAxis.interactionsEnabled = true;
            valueAxis.min = 5;
            valueAxis.renderer.minWidth = 35;
            valueAxis.renderer.labels.template.fontSize = 17;
      

            createSeries();
            function createSeries() {

                Object.entries(data[0]).filter(checkForType).forEach((s) => {
                    console.log(s[0], s[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2'))
                    var series = chart.series.push(new am4charts.ColumnSeries3D());
                    series.columns.template.width = am4core.percent(80);
                    series.columns.template.tooltipText = "{name}: {valueY.value}";
                    series.name = s[0].replace(/([a-z0-9])([A-Z])/g, '$1 $2');
                    series.dataFields.categoryX = "SegmentSorted";
                    series.dataFields.valueY = s[0];
                    series.stacked = true;
                    series.tooltip.fontSize = 17;
                    if (!s[0].startsWith("Tot")) {
                        series.hidden = true;
                    }
                });
                function checkForType(prop) {
                    return (prop[0].startsWith("Tot") || prop[0].startsWith("Min") || prop[0].startsWith("Max") || prop[0].startsWith("Avg")) && (prop[0].endsWith('CAmt') || prop[0].endsWith('DAmt'));
                }



            }





            chart.scrollbarX = new am4core.Scrollbar();
            chart.legend.fontSize = 17;

            // chart.legend.itemContainers.template.togglable = false;
        },

    });
    //end



}
function DrawCharts(SegmentType) {
    //start get the current selected monthKey & current Type
    var monthkey = document.getElementById('month-key-spinner').value;
    var Type = SegmentType;
    //End

    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/GetAllSegmentCustCount?monthKey=" + monthkey + "&Type=" + Type,
        data: {
        },
        success: function (data) {
            //display elments
        

            am4core.useTheme(am4themes_animated);
            am4core.addLicense("ch-custom-attribution");
            var chart = am4core.create("SegmentsCustCountChart", am4charts.PieChart3D);
            var title = chart.titles.create();
            title.text = "Number of Customers Per Segment";
            title.fontSize = 25;
            title.marginBottom = 30;
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.menu.items = exportMenu;
            chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
            chart.exporting.filePrefix = title.text + "_" + formatDate(new Date())
            chart.legend = new am4charts.Legend();
            chart.legend.maxHeight = 600;
            chart.legend.maxWidth = 300;
            chart.legend.scrollable = true;
            chart.legend.position = "bottom";
            chart.legend.labels.template.text = "( {name} , {SegmentDescription} ) : ({value})";

            chart.data = data;
            chart.innerRadius = am4core.percent(40);
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "NumberOfCustomers";
            series.dataFields.category = "SegmentSorted";
            // Disable ticks and labels
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.labels.template.fontSize = 17;
            chart.legend.fontSize = 17;
            series.tooltip.fontSize = 17;
            //series.stroke = am4core.color("#000000");//red
            //series.slices.template.stroke = am4core.color("#000000"); // red outline
            //series.slices.template.fill = am4core.color("#00ff00"); // green fill

            series.slices.template.events.on("doublehit", function (ev) {
                window.open("/SegmentationCharts/SingleSegmentReport?monthkey=" + selectedMonthKey + "&SegType=" + Type + "&SegID=" + ev.target.dataItem.category)
            });
       
        },

    });

    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/GetAllSegmentAlertsCount?monthKey=" + monthkey + "&Type=" + Type,
        data: {
        },
        success: function (data) {
            //display elments
            

            am4core.useTheme(am4themes_animated);
            am4core.addLicense("ch-custom-attribution");
            var chart = am4core.create("SegmentsAlertCountChart", am4charts.PieChart3D);
            var title = chart.titles.create();
            title.text = "Number of Alerts Per Segment";
            title.fontSize = 25;
            title.marginBottom = 30;
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.menu.items = exportMenu;
            chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
            chart.exporting.filePrefix = title.text + "_" + formatDate(new Date())
            chart.legend = new am4charts.Legend();
            chart.legend.maxHeight = 600;
            chart.legend.maxWidth = 300;
            chart.legend.scrollable = true;
            chart.legend.position = "bottom";
            chart.legend.labels.template.text = "({name} , {SegmentDescription} ): ({value})";

            chart.data = data;
            chart.innerRadius = am4core.percent(40);
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "NumberOfAlerts";
            series.dataFields.category = "SegmentSorted";
            series.labels.template.fontSize = 17;
            chart.legend.fontSize = 17;
            // Disable ticks and labels
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            series.slices.template.events.on("doublehit", function (ev) {
                window.open("/SegmentationCharts/SingleSegmentReport?monthkey=" + selectedMonthKey + "&SegType=" + Type + "&SegID=" + ev.target.dataItem.category)
            });

         
        },

    });


}
function DrawOnMonthCharts() {
    var monthkey = document.getElementById('month-key-spinner').value;
    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/GetCustCountPerType?monthKey=" + monthkey,
        data: {
        },
        success: function (data) {
            //display elments
           

            am4core.useTheme(am4themes_animated);
            am4core.addLicense("ch-custom-attribution");
            var chart = am4core.create("CustCountPerTypeChart", am4charts.PieChart3D);
            var title = chart.titles.create();
            title.text = "Number of Customers Per Type";
            title.fontSize = 25;
            title.marginBottom = 30;
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.menu.items = exportMenu;
            chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
            chart.exporting.filePrefix = title.text + "_" + formatDate(new Date())
            chart.legend = new am4charts.Legend();
            chart.legend.maxHeight = 600;
            chart.legend.maxWidth = 300;
            chart.legend.scrollable = true;
            chart.legend.position = "bottom";
            chart.legend.labels.template.text = "{name} : ({value})";
            chart.data = data;
            chart.innerRadius = am4core.percent(40);
            var series = chart.series.push(new am4charts.PieSeries3D());
            series.dataFields.value = "NumberOfCustomers";
            series.dataFields.category = "PartyTypeDesc";
            series.labels.template.fontSize = 17;
            chart.legend.fontSize = 17;
            series.tooltip.fontSize = 17;
            // Disable ticks and labels
            series.labels.template.disabled = true;
            series.ticks.template.disabled = true;
            



            var label = chart.chartContainer.createChild(am4core.Label);
            label.text = "You can double click any type slice to display other charts";
            label.align = "center";
            //chart.legend.itemContainers.template.events.on("hit", function (ev) {
            //    console.log("clicked on ");
            //});


            series.slices.template.events.on("doublehit", function (ev) {
                

                makeSpinner("/SegmentationCharts/Segs?monthkey=" + selectedMonthKey + "&Type=" + ev.target.dataItem.category);
                PrepDataDrawChart(ev.target.dataItem.category);
                DrawCharts(ev.target.dataItem.category);

                // window.open("/SegmentationCharts/SingleSegmentReport?monthkey=" + selectedMonthKey + "&SegType=" + ev.target.dataItem.category )
            });


        },

    });
}
function formatDate(date) {
    // Get hours, minutes, and seconds
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    // Get day, month, and year
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    let year = date.getFullYear();

    // Combine into desired format
    return `${hours}${minutes}${seconds}_${day}${month}${year}`;
}


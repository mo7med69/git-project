/*import * as core from "../lib/Plugins/amcharts_4.10.18/amcharts4/core.js"
import * as charts from "../lib/Plugins/amcharts_4.10.18/amcharts4/charts.js";
import * as matrial from "../lib/Plugins/amcharts_4.10.18/amcharts4/themes/material.js";
import * as animated from "../lib/Plugins/amcharts_4.10.18/amcharts4/themes/animated.js";
*/
var tabsDisplayNames = [
    { name: "Atmcash", displayName: "ATM Cash" },
    { name: "Cheque", displayName: "Cheque" },
    { name: "Loan", displayName: "Loan" },
    { name: "Mobilemoney", displayName: "Mobile Money" },
    { name: "Moneyremittance", displayName: "Money Remittance" },
    { name: "Swift", displayName: "SWIFT" },
    { name: "Pesalink", displayName: "Pesa Link" },
    { name: "Overthecountercashdeposit", displayName: "Counter Deposit" },
    { name: "Eft", displayName: "EFT" },
    { name: "Internalaccounttransfer", displayName: "Inter Account Trans" }
]
//var exportHeaderMap = [];

var selectedMonthKey = "";
var selectedSegmentType = "";
var selectedSegmentId = "";
var monthkey = "";
var segment_id = "";
var segType = "";
var selectedFeature = "";
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

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("month-key-spinner").addEventListener('change', (event) => {
        onChangeMonthKey(event)
    });
    document.getElementById("segment-type").addEventListener('change', (event) => {
        onChangeSegmentType(event)
    });
    document.getElementById("segment-id").addEventListener('change', (event) => {
        onChangeSegmentId(event)
    });
})

function onChangeMonthKey(e) {
    selectedMonthKey = e.target.value;
    console.log(selectedMonthKey)
    makeSpinner("/SegmentationCharts/SegTypesPerKey?monthkey=" + selectedMonthKey, "segment-type", "segmentType");

}

function onChangeSegmentType(e) {
    selectedSegmentType = e.target.value;
    makeSpinnerSegmentId("/SegmentationCharts/Segs?monthkey=" + selectedMonthKey + "&Type=" + selectedSegmentType, "segment-id", "segmentId");

}


function onChangeSegmentId(e) {
    selectedSegmentId = e.target.value;


    document.getElementById("segment-content").style.display = "block";



    $("#chartdiv").show()
    $("#chartCountdiv").show()
    $("#IndustrySegmentChart").show()
    setTimeout(function () {

        renderTabsCounter();
        /*   draw_Stacked_Col_Chart();
           draw_Stacked_Col_Chart_Count();
           RenderDataForCharts();*/
    }, 1500);

}
makeSpinner("/SegmentationCharts/MonthKeys", "month-key-spinner", "monthKey");


let segData = {};

function draw_Stacked_Col_Chart(data) {

    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_material);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create("chartdiv", am4charts.XYChart3D);
    var title = chart.titles.create();
    title.text = "Transaction Type Amounts Comparison";
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
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 35;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.interactionsEnabled = true;
    categoryAxis.renderer.labels.template.fontSize = 17;
    categoryAxis.renderer.labels.template.fontSize = 17;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.05;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.interactionsEnabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.minWidth = 30;
    valueAxis.renderer.labels.template.fontSize = 17;

    var series1 = chart.series.push(new am4charts.ColumnSeries3D());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {valueY.value}";
    series1.name = "Total Credit Amount";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "T_A_C";
    series1.tooltip.fontSize = 17;
    //series1.stacked = true;

    var series5 = chart.series.push(new am4charts.ColumnSeries3D());
    series5.columns.template.width = am4core.percent(80);
    series5.columns.template.tooltipText = "{name}: {valueY.value}";
    series5.name = "Total Debit Amount";
    series5.dataFields.categoryX = "category";
    series5.dataFields.valueY = "T_A_D";
    series5.tooltip.fontSize = 17;
    //series5.stacked = true;

    var series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText = "{name}: {valueY.value}";
    series2.name = "Lowest Credit Amount";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "L_A_C";
    series2.tooltip.fontSize = 17;
    // series2.stacked = true;

    var series6 = chart.series.push(new am4charts.ColumnSeries3D());
    series6.columns.template.width = am4core.percent(80);
    series6.columns.template.tooltipText = "{name}: {valueY.value}";
    series6.name = "Lowest Debit Amount";
    series6.dataFields.categoryX = "category";
    series6.dataFields.valueY = "L_A_D";
    series6.tooltip.fontSize = 17;
    // series6.stacked = true;

    var series3 = chart.series.push(new am4charts.ColumnSeries3D());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText = "{name}: {valueY.value}";
    series3.name = "Highest Credit Amount";
    series3.dataFields.categoryX = "category";
    series3.dataFields.valueY = "M_A_C";
    series3.tooltip.fontSize = 17;
    //series3.stacked = true;

    var series7 = chart.series.push(new am4charts.ColumnSeries3D());
    series7.columns.template.width = am4core.percent(80);
    series7.columns.template.tooltipText = "{name}: {valueY.value}";
    series7.name = "Highest Debit Amount";
    series7.dataFields.categoryX = "category";
    series7.dataFields.valueY = "M_A_D";
    series7.tooltip.fontSize = 17;
    //series7.stacked = true;

    var series4 = chart.series.push(new am4charts.ColumnSeries3D());
    series4.columns.template.width = am4core.percent(80);
    series4.columns.template.tooltipText = "{name}: {valueY.value}";
    series4.name = "Average Credit Amount";
    series4.dataFields.categoryX = "category";
    series4.dataFields.valueY = "A_A_C";
    series4.tooltip.fontSize = 17;
    //series4.stacked = true;

    var series8 = chart.series.push(new am4charts.ColumnSeries3D());
    series8.columns.template.width = am4core.percent(80);
    series8.columns.template.tooltipText = "{name}: {valueY.value}";
    series8.name = "Average Debit Amount";
    series8.dataFields.categoryX = "category";
    series8.dataFields.valueY = "A_A_D";
    series8.tooltip.fontSize = 17;
    // series8.stacked = true;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend.fontSize = 17;

    const exportHeaderMap = {};
    exportHeaderMap["category"] = "Type";

    chart.series.each(function (series) {
        if (series.dataFields.valueY) {
            exportHeaderMap[series.dataFields.valueY] = series.name;
        }
    });

    chart.exporting.adapter.add("data", function (data, target, key) {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            const originalKeys = Object.keys(data.data[0]);
            const newKeys = originalKeys.map(k => exportHeaderMap[k] || k);

            // Map each row to the new keys
            var updatedData = data.data.map(row => {
                const newRow = {};
                originalKeys.forEach((oldKey, index) => {
                    const newKey = newKeys[index];
                    newRow[newKey] = row[oldKey];
                });
                return newRow;
            });
            var fullUpdateddata = {};
            fullUpdateddata.data = updatedData;
            return fullUpdateddata;
        }
        return data;
    });

};

function draw_Stacked_Col_Chart_Count(data) {

    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create("chartCountdiv", am4charts.XYChart3D);
    var title = chart.titles.create();
    title.text = "Transaction Type Counts Comparison";
    title.fontSize = 25;
    title.marginBottom = 30;
    chart.data = data;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = exportMenu;
    chart.exporting.menu.items[0].icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
    chart.exporting.filePrefix = ( "Transaction Type Counts Comparison") + "_" + formatDate(new Date())

    chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    chart.colors.step = 2;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.interactionsEnabled = false;
    categoryAxis.renderer.labels.template.fontSize = 17;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.05;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.interactionsEnabled = false;
    valueAxis.min = 0;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.labels.template.fontSize = 17;

    var series1 = chart.series.push(new am4charts.ColumnSeries3D());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {valueY.value}";
    series1.name = "Total Credit Count";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "T_C_C";
    series1.tooltip.fontSize = 17;
    //series1.stacked = true;

    var series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText = "{name}: {valueY.value}";
    series2.name = "Total Debit Count";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "T_D_C";
    series2.tooltip.fontSize = 17;
    // series2.stacked = true;

    chart.scrollbarX = new am4core.Scrollbar();

    chart.legend.fontSize = 17;


    const exportHeaderMap = {};
    exportHeaderMap["category"] = "Type";

    chart.series.each(function (series) {
        if (series.dataFields.valueY) {
            exportHeaderMap[series.dataFields.valueY] = series.name;
        }
    });

    chart.exporting.adapter.add("data", function (data, target, key) {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            const originalKeys = Object.keys(data.data[0]);
            const newKeys = originalKeys.map(k => exportHeaderMap[k] || k);

            // Map each row to the new keys
            var updatedData = data.data.map(row => {
                const newRow = {};
                originalKeys.forEach((oldKey, index) => {
                    const newKey = newKeys[index];
                    newRow[newKey] = row[oldKey];
                });
                return newRow;
            });
            var fullUpdateddata = {};
            fullUpdateddata.data = updatedData;
            return fullUpdateddata;
        }
        return data;
    });



};






async function renderTabsCounter() {
    segType = selectedSegmentType;
    monthkey = selectedMonthKey;
    segment_id = selectedSegmentId;
    try {
        var res = await fetch("/SegmentationCharts/DataForTabs?monthKey=" + monthkey + "&segment=" + segment_id);
        var industryData = await (await fetch("/SegmentationCharts/ArtIndustrySegments?monthKey=" + monthkey + "&segment=" + segment_id + "&type=" + segType)).json()

        segData = await res.json();
        var tabButtonsContainer = document.getElementById("TabsButtonsContainer");
        tabButtonsContainer.innerHTML = "";
        segData.Types.forEach((type) => {
            AddTab(type.name);
        });
        var loaders = document.getElementsByClassName("spinner-grow");
        console.log(segData);
        [...loaders].forEach(l => {
            l.hidden = true
        });
        var dataForChart = segData.Types.map(x => {
            let obj = {};
            obj.category = x.name;
            obj.T_A_D = x.debit.Amt.Tot;
            obj.L_A_D = x.debit.Amt.Min;
            obj.M_A_D = x.debit.Amt.Max;
            obj.A_A_D = x.debit.Amt.Avg;
            //obj.T_D_C = x.debit.Cnt.Tot;
            obj.T_A_C = x.credit.Amt.Tot;
            obj.L_A_C = x.credit.Amt.Min;
            obj.M_A_C = x.credit.Amt.Max;
            obj.A_A_C = x.credit.Amt.Avg;


            return obj;
        })

        var countChartData = segData.Types.map(x => {
            let obj = {};
            obj.category = x.name;
            obj.T_C_C = x.credit.Cnt.Tot;
            obj.T_D_C = x.debit.Cnt.Tot;

            return obj;
        });

        draw_Stacked_Col_Chart(dataForChart);
        draw_Stacked_Col_Chart_Count(countChartData);
        RenderDataForCharts(industryData);
        var debitData = segData.Types[0].debit;
        var creditData = segData.Types[0].credit;//.find(x => x.name == "Wire")

        var aggs = [...document.querySelectorAll("p.aggText")]


        // debit
        aggs.find(x => x.id == "D-total").innerText = debitData.Amt.Tot;
        aggs.find(x => x.id == "D-min").innerText = debitData.Amt.Min;
        aggs.find(x => x.id == "D-max").innerText = debitData.Amt.Max;
        aggs.find(x => x.id == "D-avg").innerText = debitData.Amt.Avg;
        aggs.find(x => x.id == "D-Tcount").innerText = debitData.Cnt.Tot;

        // credit
        aggs.find(x => x.id == "C-total").innerText = creditData.Amt.Tot;
        aggs.find(x => x.id == "C-min").innerText = creditData.Amt.Min;
        aggs.find(x => x.id == "C-max").innerText = creditData.Amt.Max;
        aggs.find(x => x.id == "C-avg").innerText = creditData.Amt.Avg;
        aggs.find(x => x.id == "C-Tcount").innerText = creditData.Cnt.Tot;

        

        var buttons = document.querySelectorAll("button[role='tab']");

        buttons.forEach(b => {
            b.addEventListener('click', function(e) {
                // Remove active from all nav-items and nav-links
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                //document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('show', 'active'));

                // Add active to clicked nav-link and its parent nav-item
                this.classList.add('active');
                //this.closest('.nav-item').classList.add('active');
                //const tab = e.currentTarget.parentElement;
                //tab.classList.add('active');

                var type = e.target.parentElement.dataset.aggcat;
                var debitData = segData.Types.find(x => x.name == type).debit;
                var creditData = segData.Types.find(x => x.name == type).credit;
                // debit
                aggs.find(x => x.id == "D-total").innerText = debitData.Amt.Tot ?? 0;
                aggs.find(x => x.id == "D-min").innerText = debitData.Amt.Min ?? 0;
                aggs.find(x => x.id == "D-max").innerText = debitData.Amt.Max ?? 0;
                aggs.find(x => x.id == "D-avg").innerText = debitData.Amt.Avg ?? 0;
                aggs.find(x => x.id == "D-Tcount").innerText = debitData.Cnt.Tot ?? 0;

                // credit
                aggs.find(x => x.id == "C-total").innerText = creditData.Amt.Tot ?? 0;
                aggs.find(x => x.id == "C-min").innerText = creditData.Amt.Min ?? 0;
                aggs.find(x => x.id == "C-max").innerText = creditData.Amt.Max ?? 0;
                aggs.find(x => x.id == "C-avg").innerText = creditData.Amt.Avg ?? 0;
                aggs.find(x => x.id == "C-Tcount").innerText = creditData.Cnt.Tot ?? 0;
            })
        })
        console.log(buttons)

    } catch (err) {
        console.error(err)
    }




}

function AddTab(tabName) {

    var match = tabsDisplayNames.find(t => t.name === tabName);
    var tabDisplayName= match ? match.displayName : tabName;
    var tabButtonsContainer = document.getElementById("TabsButtonsContainer");
    var temp = `<li class="nav-item" role="presentation">
                    <button class="nav-link ${tabButtonsContainer.innerHTML=="" ? "active":""}" data-bs-toggle="tab" data-aggCat="${tabName}" role="tab" data-bs-target="#${tabName}">
                        ${tabDisplayName}
                        <span class="ripple-surface"></span>
                    </button>
                </li>`;
    tabButtonsContainer.innerHTML += temp;
}
function RenderDataForCharts(data) {
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_material);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create("IndustrySegmentChart", am4charts.XYChart3D);
    var title = chart.titles.create();
    if (segType.toUpperCase() == "INDIVIDUAL".toUpperCase()) {
        title.text = " Occupation Statistics";
    }
    else {
        title.text = " Industry Statistics";
    }

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
    categoryAxis.dataFields.category = "IndustryDesc";
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.grid.template.location = 1;
    categoryAxis.interactionsEnabled = false;
    categoryAxis.renderer.labels.template.rotation = -45;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.fontSize = 17;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.05;
    valueAxis.renderer.minGridDistance = 15;
    valueAxis.interactionsEnabled = true;
    valueAxis.min = 5;
    valueAxis.renderer.minWidth = 35;
    valueAxis.renderer.labels.template.fontSize = 17;

    var series1 = chart.series.push(new am4charts.ColumnSeries3D());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText = "{name}: {valueY.value}";
    series1.name = "Total Amount";
    series1.dataFields.categoryX = "IndustryDesc";
    series1.dataFields.valueY = "TotalAmount";
    series1.tooltip.fontSize = 17;

    var series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText = "{name}: {valueY.value}";
    series2.name = "Total Credit Amount";
    series2.dataFields.categoryX = "IndustryDesc";
    series2.dataFields.valueY = "TotalCreditAmount";
    series2.tooltip.fontSize = 17;

    var series3 = chart.series.push(new am4charts.ColumnSeries3D());
    series3.columns.template.width = am4core.percent(80);
    series3.columns.template.tooltipText = "{name}: {valueY.value}";
    series3.name = "Total Debit Amount";
    series3.dataFields.categoryX = "IndustryDesc";
    series3.dataFields.valueY = "TotalDebitAmount";
    series3.tooltip.fontSize = 17;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.legend.fontSize = 17;

    // Hook to change headers in exported file
    //chart.exporting.adapter.add("data", function (data, target, key) {
    //    if (Array.isArray(data) && data.length > 0) {
    //        const originalKeys = Object.keys(data[0]);
    //        const newKeys = originalKeys.map(k => exportHeaderMap[k] || k);

    //        // Map each row to the new keys
    //        const updatedData = data.map(row => {
    //            const newRow = {};
    //            originalKeys.forEach((oldKey, index) => {
    //                const newKey = newKeys[index];
    //                newRow[newKey] = row[oldKey];
    //            });
    //            return newRow;
    //        });

    //        return updatedData;
    //    }
    //    return data;
    //});
    const exportHeaderMap = {
        MonthKey: "Month Key",
        PartyTypeDesc: "Party Type",
        IndustryDesc: "Industry",
        SegmentSorted: "Segment",
        NumberOfCustomers: "Customers Count",
        TotalAmount: "Total Amount",
        TotalCreditAmount: "Credit Amount",
        TotalDebitAmount: "Debit Amount"
    };
    chart.exporting.adapter.add("data", function (data, target, key) {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            const originalKeys = Object.keys(data.data[0]);
            const newKeys = originalKeys.map(k => exportHeaderMap[k] || k);

            // Map each row to the new keys
            var updatedData = data.data.map(row => {
                const newRow = {};
                originalKeys.forEach((oldKey, index) => {
                    const newKey = newKeys[index];
                    newRow[newKey] = row[oldKey];
                });
                return newRow;
            });
            var fullUpdateddata = {};
            fullUpdateddata.data = updatedData;
            return fullUpdateddata;
        }
        return data;
    });


}
//renderTabsCounter().then(x => console.log("done"));




function makeSpinner(url, divId, spinnerDefaultValue) {
    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
           var  queueList = data;
            var select = document.getElementById(divId);
            select.innerHTML = "";
            var fopt = document.createElement('option');
            fopt.value = spinnerDefaultValue;
            fopt.innerHTML = spinnerDefaultValue;
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
function makeSpinnerSegmentId(url, divId, spinnerDefaultValue) {
    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
            var queueList = data;
            console.log(data);
            var select = document.getElementById(divId);
            select.innerHTML = "";
            var fopt = document.createElement('option');
            fopt.value = spinnerDefaultValue;
            fopt.innerHTML = spinnerDefaultValue;
            select.appendChild(fopt);
            queueList.forEach(q => {
                var opt = document.createElement('option');
                opt.value = q.SegmentSorted;
                if (q.SegmentDescription == null) {
                    q.SegmentDescription = "-";
                }
                opt.innerHTML = q.SegmentSorted + " , " + q.SegmentDescription;
                select.appendChild(opt);
            })
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

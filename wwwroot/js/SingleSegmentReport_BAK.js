var allTypesNames = [];
var typesLength = 0;

function draw_Stacked_Col_Chart() {

    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create("chartdiv", am4charts.XYChart3D);
    var title = chart.titles.create();
    title.text = "Transaction Type Amounts Comparison";
    title.fontSize = 25;
    title.marginBottom = 30;
    chart.data = ChartData;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = [{
        "label": "...",
        "menu": [
            { "type": "svg", "label": "Save" },
        ]
    }];
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
};

function draw_Stacked_Col_Chart_Count() {

    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    var chart = am4core.create("chartCountdiv", am4charts.XYChart3D);
    var title = chart.titles.create();
    title.text = "Transaction Type Counts Comparison";
    title.fontSize = 25;
    title.marginBottom = 30;
    chart.data = ChartDataCount;
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.items = [{
        "label": "...",
        "menu": [
            { "type": "svg", "label": "Save" },
        ]
    }];
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


};

var ChartData = [];
var ChartDataCount = [];
var allTypesNames = [];
function callCounters() {
    // DOM Element's
    const counters = document.querySelectorAll('.counter');

    for (let n of counters) {
        const updateCount = () => {
            const target = + n.getAttribute('data-target');
            const count = + n.innerText;
            const speed = 650;
            const inc = target / speed;
            if (count < target) {
                n.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                n.innerText = target;
            }
        }
        updateCount();
    };
};

function openTab(evt, TabName) {
    //commented by Ehab Azab 23-07-2023
    //callCounters();

    allTypesNames.forEach((i) => {
        document.getElementById(`${i}TabParent`).style.display = "none";
        document.getElementById(`${i}`).className = document.getElementById(`${i}`).className.replace(" active", "");
    });
    document.getElementById(`${TabName}TabParent`).style.display = "block";
    evt.currentTarget.className += " active";

    //commented by Ehab Azab 23--7-2023
    /*
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(TabName).style.display = "block";
        evt.currentTarget.className += " active";
    */
    //renderTabsCounter();


};

function renderTabsCounter() {


    var ActiveTab = document.querySelectorAll('.tablinks .active');
    //console.log($('.tablinks .active')['context']['activeElement']['id']);

   

    console.log("/SegmentationCharts/DataForTabs?monthKey=" + monthkey + "&segment=" + segment_id);
    function calcSum(array) {
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total;
    }

    function calcMean(array) {
        var arraySum = calcSum(array);
        return arraySum / array.length;
    }

    function calcMedian(array) {
        array = array.sort();
        if (array.length % 2 === 0) { // array with even number elements
            return (array[array.length / 2] + array[(array.length / 2) - 1]) / 2;
        }
        else {
            return array[(array.length - 1) / 2]; // array with odd number elements
        }
    }
    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/DataForTabs?monthKey=" + monthkey + "&segment=" + segment_id,
        data: {
        },
        success: function (data) {

            //replace null with 0 
            console.log("seg data", data);
            /*data[.forEach(function (myObj) {
                for (let prop in myObj) {
                    myObj[prop] = myObj[prop] === null ? 0 : myObj[prop];
                }
            });*/
            document.getElementById("TabsButtonsContainer").innerHTML = "";
            document.getElementById("tabContentContainer").innerHTML = "";
            ChartData = [];
            ChartDataCount = [];

            typesLength = data["Types"].length;
            data["Types"].forEach((obj) => {
                allTypesNames.push(obj["name"]);
                createTap(obj);
            });
            document.getElementById("TabsID").style.display = "block";


        }
    });

}
function createTap(typeObj) {

    var buttonOfTabString = `<button class="tablinks col-sm-1 container-fluid" style="color:#013459; text-align: center; font-weight: 600; width: ${100 / typesLength}%;" id="${typeObj["name"]}" onclick="openTab(event, '${typeObj["name"]}')">${typeObj["name"]}</button>`;
    const TabsButtonsContainerDiv = document.getElementById("TabsButtonsContainer");
    TabsButtonsContainerDiv.innerHTML += buttonOfTabString;

    var tabsDivString = `
        <div id="${typeObj["name"]}TabParent" class="tabcontent"style=";display:none;">
            <section class="counters text-center" style="font-size:16px;" id="${typeObj["name"]}TabContainer">
                
            <div class="" id="${typeObj["name"]}Tab"></div>
            </section>
        </div>
    `;
    const tabsDiv = document.getElementById("tabContentContainer");
    tabsDiv.innerHTML += tabsDivString;
    var debitFlag = false;
    var Type_Data = {
        "category": `${typeObj["name"]}`
    }
    var Type_Data_Count = {
        "category": `${typeObj["name"]}`
    }
    const tabDiv = document.getElementById(`${typeObj["name"]}Tab`);
    if (Object.entries(typeObj["debit"]["Cnt"]).length !== 0) {
        Type_Data["T_A_D"] = typeObj["debit"]["Amt"]["Tot"];
        Type_Data["L_A_D"] = typeObj["debit"]["Amt"]["Min"];
        Type_Data["M_A_D"] = typeObj["debit"]["Amt"]["Max"];
        Type_Data["A_A_D"] = typeObj["debit"]["Amt"]["Avg"];
        Type_Data_Count["T_D_C"] = typeObj["debit"]["Cnt"]["Tot"];
        debitFlag = true;
        var debitDivString = `
            <h4 style="color: #013459; text-align: left; font-weight: 600; font-style: italic "> Debit: </h4>
            <div class="row">
                <div class='col-md-1'>
                    <h4>Total</h4>
                    <div class='counter' id="Tot_${typeObj["name"]}_D_Amt">${typeObj["debit"]["Amt"]["Tot"]}</div>
                </div>
                <div class='col-md-3'>
                    <h4>Lowest Amount</h4>
                    <div class='counter' id="Min_${typeObj["name"]}_D_Amt">${typeObj["debit"]["Amt"]["Min"]}</div>
                </div>
                <div class="col-md-3">
                    <h4>Average Amount</h4>
                    <div class="counter" id="Avg_${typeObj["name"]}_D_Amt">${typeObj["debit"]["Amt"]["Avg"]}</div>
                </div>
                <div class="col-md-3">
                    <h4>Highest Amount</h4>
                    <div class="counter" id="Max_${typeObj["name"]}_D_Amt">${typeObj["debit"]["Amt"]["Max"]}</div>
                </div>
                <div class="col-md-1">
                    <h4>Count</h4>
                    <div class="counter" id="Tot_${typeObj["name"]}_D_Cnt">${typeObj["debit"]["Cnt"]["Tot"]}</div>
                </div>
            </div>
         `;
        tabDiv.innerHTML += debitDivString;
    }
    if (Object.entries(typeObj["credit"]["Cnt"]).length !== 0) {
        Type_Data["T_A_C"] = typeObj["credit"]["Amt"]["Tot"];
        Type_Data["L_A_C"] = typeObj["credit"]["Amt"]["Min"];
        Type_Data["M_A_C"] = typeObj["credit"]["Amt"]["Max"];
        Type_Data["A_A_C"] = typeObj["credit"]["Amt"]["Avg"];
        Type_Data_Count["T_C_C"] = typeObj["credit"]["Cnt"]["Tot"];
        if (debitFlag) {
            var hrElementString = `<hr style="border:3px ;border-top: 3px solid #013459 ">`;
            tabDiv.innerHTML += hrElementString;
        }
        var creditDivString = `
            <h4 style="color: #013459; text-align: left; font-weight: 600; font-style: italic "> Credit: </h4>
            <div class="row">
               <div class='col-md-1'>
                    <h4>Total</h4>
                    <div class='counter' id="Tot_${typeObj["name"]}_C_Amt">${typeObj["credit"]["Amt"]["Tot"]}</div>
                </div>
                <div class='col-md-3'>
                    <h4>Lowest Amount</h4>
                    <div class='counter' id="Min_${typeObj["name"]}_C_Amt">${typeObj["credit"]["Amt"]["Min"]}</div>
                </div>
                <div class="col-md-3">
                    <h4>Average Amount</h4>
                    <div class="counter" id="Avg_${typeObj["name"]}_C_Amt">${typeObj["credit"]["Amt"]["Avg"]}</div>
                </div>
                <div class="col-md-3">
                    <h4>Highest Amount</h4>
                    <div class="counter" id="Max_${typeObj["name"]}_C_Amt">${typeObj["credit"]["Amt"]["Max"]}</div>
                </div>
                <div class="col-md-1">
                    <h4>Count</h4>
                    <div class="counter" id="Tot_${typeObj["name"]}_C_Cnt">${typeObj["credit"]["Cnt"]["Tot"]}</div>
                </div>
            </div>`;
        tabDiv.innerHTML += creditDivString;
    }
    console.log(ChartData);
    ChartData.push(Type_Data);
    ChartDataCount.push(Type_Data_Count);
}
function RenderDataForCharts() {
    //var monthkey = '@ViewBag.monthkey';
    //var segment_id = '@ViewBag.SegID';
    //var segType = '@ViewBag.SegType';
    console.log(segType);
    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/ArtIndustrySegments?monthKey=" + monthkey + "&segment=" + segment_id + "&type=" + segType,
        data: {
        },
        success: function (data) {

            am4core.useTheme(am4themes_animated);
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
            chart.exporting.menu.items = [{
                "label": "...",
                "menu": [
                    { "type": "svg", "label": "Save" },
                ]
            }];
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

        }
    });
}
setTimeout(function () {
    document.getElementById("TabsID").style.display = "block";
    renderTabsCounter();

    setTimeout(function () {
        $("#chartdiv").show()
        $("#chartCountdiv").show()
        $("#IndustrySegmentChart").show()
        draw_Stacked_Col_Chart();
        draw_Stacked_Col_Chart_Count();
        RenderDataForCharts();
    }, 1500);

}, 500);
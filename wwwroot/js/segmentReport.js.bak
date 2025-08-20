//commented by ehab azab 23-07-2023
//const { Tab } = require("../../../../../../../node_modules/@mui/material/index");

var ChartData = [];
var ChartDataCount = [];
var allTypesNames = [];
var typesLength = 0;
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

    var monthkey = document.getElementById('month-key-spinner').value;
    var segment_id = document.getElementById('segment-id').value;

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
            console.log("seg data",data);
            /*data[.forEach(function (myObj) {
                for (let prop in myObj) {
                    myObj[prop] = myObj[prop] === null ? 0 : myObj[prop];
                }
            });*/
            document.getElementById("TabsButtonsContainer").innerHTML="";
            document.getElementById("tabContentContainer").innerHTML = "";
            ChartData = [];
            ChartDataCount = [];
            
            typesLength = data["Types"].length;
            data["Types"].forEach((obj) => {
                allTypesNames.push(obj["name"]);
                createTap(obj);
            });
            

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
    ChartData.push(Type_Data);
    ChartDataCount.push(Type_Data_Count);
}
function RenderDataForCharts() {
    var monthkey = document.getElementById('month-key-spinner').value;
    var segment_id = document.getElementById('segment-id').value;

    var type = document.getElementById('segment-type').value;
    console.log(type);
    $.ajax({
        type: "GET",
        url: "/SegmentationCharts/ArtIndustrySegments?monthKey=" + monthkey + "&segment=" + segment_id + "&type=" + type,
        data: {
        },
        success: function (data) {
            am4core.useTheme(am4themes_animated);
            am4core.addLicense("ch-custom-attribution");
            var chart = am4core.create("IndustrySegmentChart", am4charts.XYChart3D);
            var title = chart.titles.create();
            if (type.toUpperCase() == "INDIVIDUAL".toUpperCase()) {
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
    function create3dSeries(v) {
        var firstChar = v.split("_")[0];
        var secondChar = v.split("_")[1];
        var thirdChar = v.split("_")[2];
        var seriesName = "";
        if (firstChar==="T") {
            seriesName += "Total ";
        } else if (firstChar === "L") {
            seriesName += "Lowest ";
        } else if (firstChar === "M") {
            seriesName += "Highest ";
        } else if (firstChar === "A") {
            seriesName += "Average ";
        }

        if (thirdChar === "C") {
            seriesName += "Credit ";
        } else if (thirdChar === "D") {
            seriesName += "Debit ";
        } 
        seriesName += "Amount";

        var series = chart.series.push(new am4charts.ColumnSeries3D());
        series.columns.template.width = am4core.percent(80);
        series.columns.template.tooltipText = "{name}: {valueY.value}";
        series.name = seriesName;
        series.dataFields.categoryX = "category";
        series.dataFields.valueY = v;
        series.tooltip.fontSize = 17;
    }
    Object.entries(ChartData[0]).forEach((x) => {
        if (x[0] !=="category") {
            create3dSeries(x[0]);
        }
    });

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

var selectedMonthKey = "";
var selectedSegmentType = "";
var selectedSegmentId = "";
var selectedFeature = "";
makeSpinner("/SegmentationCharts/MonthKeys", "month-key-spinner", "monthKey");

function onChangeMonthKey(e) {
    selectedMonthKey = e.value;
    makeSpinner("/SegmentationCharts/SegTypesPerKey?monthkey=" + selectedMonthKey, "segment-type", "segmentType");

}

function onChangeSegmentType(e) {
    selectedSegmentType = e.value;
    makeSpinnerSegmentId("/SegmentationCharts/Segs?monthkey=" + selectedMonthKey + "&Type=" + selectedSegmentType, "segment-id", "segmentId");

}

function onChangeSegmentId(e) {
    selectedSegmentId = e.value;
   document.getElementById("TabsID").style.display = "block";
    
    renderTabsCounter();
    
    $("#chartdiv").show()
    $("#chartCountdiv").show()
    $("#IndustrySegmentChart").show()
    setTimeout(function () {
        draw_Stacked_Col_Chart();
        draw_Stacked_Col_Chart_Count();
        RenderDataForCharts();
    }, 1500);

}

function fillCards(url, divId) {
    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
            var responseData = data;
            var mydiv = document.getElementById(divId);
            mydiv.innerHTML = "";

            for (const [key, value] of Object.entries(responseData)) {
                var mylist = "";
                for (const [key2, value2] of Object.entries(responseData[key])) {
                    //console.log(`${key2}: ${value2}`);
                    mylist += `<li><p class="card-text"><b>${key2} : </b> ${value2}</p> </li>`;
                }
                if (mylist) {
                    mydiv.innerHTML += `
                                                        <div class="card col-md-4">
                                                            <div class="container">
                                                                <h4><b>Segment ${key} </b></h4>
                                                                <div>
                                                                    <ul>
                                                                        ${mylist}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>`;


                } else {
                    mydiv.innerHTML += `
                                                        <div class="card col-md-4">
                                                            <div class="container">
                                                                <h4><b>Segment ${key} </b></h4>
                                                                <div>
                                                                    ${value}
                                                                    <ul hidden>
                                                                        <li><li/><li><li/><li><li/><li><li/><li><li/><li><li/>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>`;
                }

            }

        },
    });
}
function makeSpinner(url, divId, spinnerDefaultValue) {
    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
            queueList = data;
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
            queueList = data;
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
$(window).resize(function () {
    kendo.resize($("div.k-chart[data-role='chart']"));
});

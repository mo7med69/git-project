var TableSelect = document.getElementById("TableName");
var ColumnsSelect = document.getElementById("ColumnNames");
var ChartColumnSelect = document.getElementById("chartColumn");
var ChartColumnTypeSelect = document.getElementById("chartType");
var addChartBtn = document.getElementById("addChart");
var chartTitle = document.getElementById("chartTitle");
var chartCardsDiv = document.getElementById("addedCharts");
var openAddChartBtn = document.getElementById("openAddChart");
var dltBtns = document.getElementsByClassName("chart-delete");
var addedCharts = [];
var form = document.getElementById("CustomReportForm");
var errosDiv = document.getElementById("errors");
var ShcemaSelect = document.getElementById("Shcema");

ShcemaSelect.onchange = (e) => {
    var value = parseInt(e.target.value);
    if (value != -1) {
        Fetch(`/CustomReport/GetDbObjects/${value}`, null, "GET").then(d => {
            TableSelect.innerHTML = "";
            var opt = document.createElement("option");
            opt.innerText = "Select a Table";
            opt.value = "";
            opt.selected = true;
            TableSelect.appendChild(opt);
            d.forEach(elm => {
                var opt = document.createElement("option");
                opt.innerText = elm.vieW_NAME.toString().split(".")[1];
                opt.dataset.type = elm.type;
                opt.value = elm.vieW_NAME;
                TableSelect.appendChild(opt);
            })

            $('#TableName').selectpicker('refresh');
        });
    }

}




TableSelect.onchange = async (e) => {
    var selected = e.target.options[e.target.selectedIndex];
    var type = selected.dataset.type;
    var view = selected.value;
    var schemaVal = parseInt(ShcemaSelect.value);
    var columns = await Fetch(`/CustomReport/GetObjectColumnNames/${schemaVal}/${view}/${type}`, null, "GET");

    ColumnsSelect.innerHTML = "";
    ChartColumnSelect.innerHTML = "";
    var opt = document.createElement("option");
    opt.innerText = "Select some columns";
    opt.value = "";
    opt.selected = true;
    var opt2 = opt.cloneNode(true);
    opt2.innerText = "Select a column";
    ColumnsSelect.appendChild(opt);
    ChartColumnSelect.appendChild(opt2);
    columns.forEach(elm => {
        var opt = document.createElement("option");
        opt.innerText = elm.name;
        opt.value = elm.name;
        opt.dataset.isnullable = elm.isNullable;
        opt.dataset.type = elm.sqlDataType;
        var opt2 = opt.cloneNode(true);
        ColumnsSelect.appendChild(opt);
        ChartColumnSelect.appendChild(opt2);
    })

    $('#ColumnNames').selectpicker('refresh');
    $('#chartColumn').selectpicker('refresh');

}

function deleteCard(event) {
    var id = event.dataset.id;
    var cardToDlt = document.getElementById(id);
    addedCharts = addedCharts.filter(c => c.id != id);
    chartCardsDiv.removeChild(cardToDlt);

}

addChartBtn.onclick = (e) => {

    var selectedChartType = ChartColumnTypeSelect.options[ChartColumnTypeSelect.selectedIndex].value;
    var selectedChartTypeString = ChartColumnTypeSelect.options[ChartColumnTypeSelect.selectedIndex].innerText;
    var selectedChartColumn = ChartColumnSelect.options[ChartColumnSelect.selectedIndex].value;
    var addedChartTitle = chartTitle.value;
    var errors = [];



    if (!addedChartTitle || addedChartTitle.length == 0) {
        errors.push("you must type a chart title");
    }

    if (!selectedChartColumn || selectedChartColumn.length == 0) {
        errors.push("you must select a column for the chart");
    }

    if (!selectedChartType) {
        errors.push("you must select a type for the chart");
    }

    if (errors && errors.length > 0) {
        var oldErrs = errosDiv.getElementsByClassName("err");
        [...oldErrs].forEach(errDiv => {
            errosDiv.removeChild(errDiv);
        })
        errors.forEach(err => {
            var errorDiv = document.createElement("div");
            errorDiv.className = "err";
            errorDiv.innerHTML = `<i class="glyphicon glyphicon-remove-sign"></i> ${err}`
            errosDiv.appendChild(errorDiv);
        });
        errosDiv.hidden = false;
        return;
    }


    if (!errors || errors.length == 0)
        if (!errosDiv.hidden)
            errosDiv.hidden = true;


    var cardId = GUID();
    var chartInfo = {
        id: cardId,
        title: addedChartTitle,
        type: parseInt(selectedChartType),
        column: selectedChartColumn
    };
    addedCharts.push(chartInfo);


    var card = document.createElement("div");
    card.id = cardId
    card.className = "card mb-3 row col-md-4";
    card.style = "max-width: 540px; max-hieght:540px;"
    card.innerHTML = `<div class="row no-gutters">
  
    <div class="col-md-12">
      <div class="card-body">
        <h5 class="card-title">${addedChartTitle}</h5>
        <p class="card-text">Chart Type  :  ${selectedChartTypeString}</p>
        <p class="card-text">Column : ${selectedChartColumn}</p>
        <p class="card-text"><small class="text-muted">Added at ${new Date().toLocaleString()}</small></p>
        <button onclick="deleteCard(this)" type="button" data-id="${cardId}" class="btn btn-danger chart-delete">Delete chart</button>
      </div>
       
        
        
    </div>
  </div>`;


    chartCardsDiv.appendChild(card);


    ChartColumnTypeSelect.options[ChartColumnTypeSelect.selectedIndex].selected = false;
    ChartColumnSelect.options[ChartColumnSelect.selectedIndex].selected = false;
    chartTitle.value = "";
    $('#chartType').selectpicker('refresh');
    $('#chartColumn').selectpicker('refresh');

}


function hideErrors() {
    errosDiv.hidden = true;
}

form.onsubmit = async (e) => {
    e.preventDefault();





    var errors = [];
    var table = TableSelect.options[TableSelect.selectedIndex].value;
    var tableType = TableSelect.options[TableSelect.selectedIndex].dataset.type;
    var columns = [...ColumnsSelect.options].filter(x => x.selected && x.value != "").map(x => ({
        Name: x.value,
        SqlDataType: x.dataset.type ,
        IsNullable: x.dataset.isnullable,
    }));
    var reportTitle = document.getElementById("title").value;
    var reportDesc = document.getElementById("desc").value;

    if (!table || table == undefined || table == "" || table.length == 0) {
        errors.push("you must select a table");
    }

    if (!columns || columns.length == 0) {
        errors.push("you must select at least one column");
    }

    if (!reportTitle || reportTitle.length == 0) {
        errors.push("you type a title for this report");
    }

    if (errors && errors.length > 0) {
        var oldErrs = errosDiv.getElementsByClassName("err");
        [...oldErrs].forEach(errDiv => {
            errosDiv.removeChild(errDiv);
        })
        errors.forEach(err => {
            var errorDiv = document.createElement("div");
            errorDiv.className = "err";
            errorDiv.innerHTML = `<i class="glyphicon glyphicon-remove-sign"></i> ${err}`
            errosDiv.appendChild(errorDiv);
        });
        errosDiv.hidden = false;
        return;
    }


    if (!errors || errors.length == 0)
        if (!errosDiv.hidden)
            errosDiv.hidden = true;

    var charts = addedCharts.map(x => ({

        Title: x.title,
        Type: x.type,
        Column: x.column

    }));


    var model = {
        Table: table,
        ObjectType: tableType,
        Columns: columns,
        Charts: charts,
        Description: reportDesc,
        Title: reportTitle,
        Schema: parseInt(ShcemaSelect.value)
    }

    var d = await Fetch("/MyReports/SaveReport/", model, "POST").then(x => {
        window.location = "/MyReports";
    }).catch(e => console.error(e));





}






function GUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    ).toString();
}





async function Fetch(url, body, mthod) {
    var req = {
        method: mthod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    }

    if (body) {
        var r = {
            ...req,
            body: JSON.stringify(body)
        };
        var res = await fetch(url, r);
    }
    else {
        var res = await fetch(url, req);
    }
    try {
        const data = await res.json();
        return data;
    }catch (e ){
        return;
    }
   
}
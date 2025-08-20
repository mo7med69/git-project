function makegridWithFixedDataWithPaging(dataUrl,PageCountUrl,columnObj) {

    var pageNum = 1;
    var totalPages = 0;
    PresentData();
    function getCoundAndManageCounts() {
        pageNum = 1;
        $('#pageNumber').empty();

        $("#pageNumber").text(pageNum);
        $.getJSON("/Alerting/getTotalCount?", function (data) {
            console.log(data);
            $('#totalCount').text("Total Count : ( " + data + " ) Rows");

            totalPages = Math.ceil(data / 600);
            // alert(totalPages);
            $('#nxt').prop('disabled', true);
            $('#bck').prop('disabled', true);
            console.log(totalPages);
            if (totalPages > pageNum) {
                $('#nxt').prop('disabled', false);
            }
        });

    }
    function PresentData() {
        getCoundAndManageCounts();
        $('#grid').empty();
        callKendo();
    }
    $('#nxt').click(function () {
        //var grid = $("#grid").data("kendoGrid");
        //grid.Clear();
        $('#grid').empty();
        pageNum += 1;
        $('#bck').prop('disabled', false);
        if (pageNum == totalPages) {
            $('#nxt').prop('disabled', true);

        }

        $('#pageNumber').empty();
        $("#pageNumber").text(pageNum);
        callKendo();
    });
    $('#bck').click(function () {
        if (pageNum == 1) {
            $('#grid').empty();
            $('#pageNumber').empty();
            $("#pageNumber").text(pageNum);
            callKendo();
        }
        else {
            $('#grid').empty();
            pageNum -= 1;
            $('#bck').prop('disabled', false);
            if (pageNum == 1) {
                $('#bck').prop('disabled', true);
            }
            $('#pageNumber').empty();
            $("#pageNumber").text(pageNum);

            callKendo();
        }
        $('#nxt').prop('disabled', false);
    });
    function callKendo() {

        columnObj = [
            { column: "d", datatype: "", title: "tirle" },
            { column: "d", datatype: "", title: "tirle" },
            { column: "d", datatype: "", title: "tirle" },
            { column: "d", datatype: "", title: "tirle" },
            ]

        console.log("url", `/Alerting/GetData?${queryUrl}page=${pageNum}`);
        console.log("url1", "/Alerting/GetData?" + queryUrl + "page=" + pageNum);

        $("#grid").kendoGrid({
            dataSource: {
                type: "api",
                transport: {
                    read: "/Alerting/GetData?" + queryUrl + "page=" + pageNum
                },
                schema: {
                    model: {
                        fields: {
                            AlertedEntityName: { type: "string" },
                            AlertedEntityNumber: { type: "string" },
                            AlertsCnt: { type: "number" },
                            EmployeeInd: { type: "string" },
                            MoneyLaunderingScore: { type: "number" },
                            RiskScoreCode: { type: "string" }
                        }
                    }
                },
                pageSize: 17,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },
            height: 590,
            filterable: true,
            pageable: {
                numeric: false,
                previousNext: false
            },
            sortable: { mode: "single", allowUnsort: true },
            scrollable: { virtual: true },
            reorderable: true,
            // pageable: true,
            resizable: true,
            selectable: "single",

            columns: [
                { field: "AlertedEntityName", title: "Alerted Entity Name", stickable: true },
                { field: "AlertedEntityNumber", width: 250, title: "Alerted Entity Number", stickable: true },
                { field: "AlertsCnt", title: "Alerts Count", stickable: true },
                { field: "EmployeeInd", title: "Employee ?", stickable: true },
                { field: "MoneyLaunderingScore", title: "Money Laundering Score", stickable: true },
                { field: "RiskScoreCode", title: "Risk Score Code", stickable: true }

            ]
            
        });

};

}
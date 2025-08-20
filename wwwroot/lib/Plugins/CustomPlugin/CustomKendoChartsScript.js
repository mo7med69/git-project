

function createBoxPlotChart(divId, url, categoryField, lowerField, q1Field, medianField, q3Field, upperField, outliersField, meanField, nameOfChart) {
    $(document).ready(createBoxPlotChartBuilder(divId, url, categoryField, lowerField, q1Field, medianField, q3Field, upperField, outliersField, meanField, nameOfChart));
    $(document).bind("kendo:skinChange", createBoxPlotChartBuilder(divId, url, categoryField, lowerField, q1Field, medianField, q3Field, upperField, outliersField, meanField, nameOfChart));
}
function createBoxPlotChartBuilder(divId,url, categoryField, lowerField, q1Field, medianField, q3Field, upperField, outliersField, meanField,nameOfChart) {
    $(`#${divId}`).kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: url,
                    dataType: "json"
                }
            },
            sort: {
                field: categoryField,
                dir: "asc"
            }
        },
        title: {
            text: nameOfChart
        },
        legend: {
            position: "bottom"
        },
        series: [{
            type: "boxPlot",
            lowerField: lowerField,
            q1Field: q1Field ,
            medianField: medianField,
            q3Field: q3Field,
            upperField: upperField,
            outliersField: outliersField,
            meanField: meanField,
            categoryField: categoryField
        }],
        tooltip: {
            visible: true,
           
        },
        pannable: {
            lock: "y"
        },
        zoomable: {
            mousewheel: {
                lock: "y"
            },
            selection: {
                lock: "y"
            }
        }
        
    });
}


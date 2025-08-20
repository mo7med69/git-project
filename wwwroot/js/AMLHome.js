
//})
fetch("/Home/GetAmlChartsData").then(x => x.json()).then(
    x => {
        var statusData = x.statuses;

        console.log(statusData);
        var dateChart = document.getElementById("alertsDateChart");
        var statusChart = document.getElementById("alert-status");
        dateChart.setData(x.dates);
        dateChart.onSeriesChanged = (e) => {
            console.log(statusData.filter(x => x.year == e.year));
            statusChart.setdata(statusData.filter(x => x.year == e.year));
        }
    }
);
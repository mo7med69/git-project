console.log("T7T Elbatannia")
var dateData = [];
var typeData = [];
var statusData = [];
getData().then(x => {






    var dateChart = document.getElementById("dateChart");
    var typeChart = document.getElementById("type");
    var statusChart = document.getElementById("status");
    dateChart.setData(dateData);
    dateChart.onSeriesChanged = (e) => {

        typeChart.setdata(typeData.filter(x => x.year == e.year));
        statusChart.setdata(statusData.filter(x => x.year == e.year));
    }
})


async function getData() {
    var data = await (await fetch("/home/getchartsdata")).json();
    dateData = data.dates;
    typeData = data.types;
    statusData = data.status;
}









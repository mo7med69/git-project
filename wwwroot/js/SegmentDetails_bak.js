import { URLS } from "./URLConsts.js"
loadMonthKies().then(x => console.log('done'));
document.getElementById('MonthKey').onchange = async (e) => await onChangeMonthKey(e);
document.getElementById('PartyTypeDesc').onchange = async (e) => await onChangeSegmentType(e);
document.getElementById('Segment').onchange = async (e) => await onChangeSegment(e);
async function loadMonthKies() {
    var monthKeySelect = document.getElementById('MonthKey');
    await makeDropDown("/AllSegmentsOutliersNew/GetMonthKies", monthKeySelect);

}
async function makeDropDown(url, dropdown) {
    var items = await (await fetch(url)).json();
    dropdown.innerHTML = "";
    var fopt = document.createElement('option');
    fopt.value = '';
    fopt.innerHTML = '-- Not Selected --';
    dropdown.appendChild(fopt);
    items.forEach(q => {
        var opt = document.createElement('option');
        opt.value = q;
        opt.innerHTML = q;
        dropdown.appendChild(opt);
    })
}

async function onChangeMonthKey(e) {
    console.log(e);
    var selectedMonthKey = e.target.value;
    var partyDescDropDown = document.getElementById('PartyTypeDesc');
    await makeDropDown(`/AllSegmentsOutliersNew/SegTypesPerKey/${selectedMonthKey}`, partyDescDropDown);

}
async function onChangeSegmentType(e) {
    var selectedMonthKey = document.getElementById('MonthKey').value;
    var selectedType = e.target.value;
    var partyDescDropDown = document.getElementById('Segment');
    await makeDropDown(`/AllSegmentsOutliersNew/Segment/${selectedMonthKey}/${selectedType}`, partyDescDropDown);

}
async function onChangeSegment(e) {
    var selectedMonthKey = document.getElementById('MonthKey').value;
    var selectedSegmentType = document.getElementById('PartyTypeDesc').value;
    var selectedSegment = e.target.value;
    var baseUrl = URLS.AllSegmentsOutliersNew.split("?")[0];
    console.log(URLS.AllSegmentsOutliersNew);
    URLS.AllSegmentsOutliersNew = baseUrl + `?MonthKey=${selectedMonthKey}&PartyTypeDesc=${selectedSegmentType}&Segment=${selectedSegment}`
    console.log(URLS.AllSegmentsOutliersNew);

    $("#grid").data("kendoGrid").dataSource.read();
}
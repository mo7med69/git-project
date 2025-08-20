const TaskPeriod = {
    0: "Never",
    1: "Minutely",
    2: "Hourly",
    3: "Daily",
    4: "Weekly",
    5: "Monthly",
    6: "Quarterly",
    7: "Yearly",
}

const DayOfWeek = {

}
export const Templates = {

    TaskPeriodTemplate: (dataItem) => {
        return TaskPeriod[dataItem.Period]
    },

    hyperlink: (dataItem , column) => {
        return `<a class="custom-link">${dataItem[column]}</a>`
    },
    mixedArabicAndEnglish: (dataItem, column) => {
        return `<div style='direction: rtl;'>${dataItem[column] ? dataItem[column]:""}</div>`
    }
    ,
    activeSwitch: (dt) => {
        let active = dt.Active ? "true" : "false"


        return `<art-switch data-checked="${active}""></art-switch>`
    },
    TaskMails: (dataItem, column) => {

        //return `<style>table {  border-spacing: 0;  width: 45%;  border: 1px solid #ddd;}th, td {  text-align: left;  padding: 5px;  border: 1px solid #ddd;}.row {  display: flex;  margin-right: 0px !important;  margin-left: 0px !important;}.column {  flex: 50%;  padding: 5px;}</style><div class="row"><div class="column col-6"><label ><strong>New Configuration</strong></label><table >  <tr>    <th>Param Name</th>    <th>Check/Uncheck</th>    <th>Value</th>  </tr><tr><td>Sensitivity</td><td>Checked</td><td>95</td></tr><tr><td>First Name Sensitivity</td><td>Checked</td><td>40</td></tr><tr><td>Middle Name Sensitivity</td><td>Checked</td><td>30</td></tr><tr><td>Last Name Sensitivity</td><td>Checked</td><td>30</td></tr></table></div><div class="column col-6"><label ><strong>Old Configuration</strong></label><table >  <tr>    <th>Param Name</th>    <th>Check/Uncheck</th>    <th>Value</th>  </tr><tr><td>Sensitivity</td><td>Checked</td><td>75</td></tr><tr><td>First Name Sensitivity</td><td>Checked</td><td>40</td></tr><tr><td>Middle Name Sensitivity</td><td>Checked</td><td>30</td></tr><tr><td>Last Name Sensitivity</td><td>Checked</td><td>30</td></tr></table></div></div>`;


        var Mails = JSON.parse(dataItem.MailsSerialized);
        console.log(Mails);
        var template = Mails.map(x => `<span class="badge text-bg-primary mb-1 ">${x}</span>`).join("");
        console.log(template);
        return `<div class="d-flex justify-content-around flex-wrap align-content-between">
                                            ${template}        
                   </div>`;
    },
    actionDetailTable: (dataItem, column) => {
        return dataItem.ActionDetail;
    },
    Aml_Analysis_prediction: (dataItem, column) => {
        if (dataItem.Prediction < 0.39 && dataItem.Prediction >= 0) { return "<span class='glyphicon glyphicon-alert' style='color: dodgerblue'></span>" + "  " + kendo.format('{0:p}', dataItem.Prediction); }
        if (dataItem.Prediction < 0.699 && dataItem.Prediction >= 0.4) { return "<span class='glyphicon glyphicon-alert' style='color: darkorange'></span>" + " " + kendo.format('{0:p}', dataItem.Prediction); }
        if (dataItem.Prediction > 0.699) { return "<span class='glyphicon glyphicon-alert' style='color: red'></span>" + " " + kendo.format('{0:p}', dataItem.Prediction); }
    },
}
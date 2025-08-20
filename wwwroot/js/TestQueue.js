var login = "sasinst";
var password = "P@ssw0rd";

var res = fetch("https://sas-aml.datagearbi.local/SASComplianceSolutionsMid/rest/queues", {
    headers: new Headers({
        "Authorization": `Basic ${login}:${password}`,
        cors: "no-cors"
    }),

}).then(x => x.json()).then(x => console.log(x));
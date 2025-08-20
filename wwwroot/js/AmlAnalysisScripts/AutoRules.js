import { mapParamtersToFilters } from "../QueryBuilderConfiguration/QuerybuilderConfiguration.js"
let querybuilder = document.querySelector("#querybuilder");
let submitBtn = document.getElementById(querybuilder.dataset.applybtn);
let fields = [];
let actionSelect = document.getElementById("action");
let queueS = document.getElementById("queues");
let userS = document.getElementById("users");
let grid = document.getElementById("autorules");

let activeSwitches = grid.getElementsByTagName("art-switch");


fetch("/AutoRules/GetQueryBuilderParams").then(x => x.json()).then(d => {
    fields = d;
    querybuilder.fields = mapParamtersToFilters(d);
});



actionSelect.onchange = async () => {
    let actionValue = actionSelect.value;//.value;

    if (actionValue == "route") {
        try {
            let res = await fetch("/Aml_Analysis/GetQueues", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            let queues = await res.json();
            let qOpts = queues.map(q => {
                let opt = document.createElement("option");
                opt.value = q.value;
                opt.innerText = q.text;
                return opt
            });
            let allOpt = document.createElement("option");
            allOpt.value = "all";
            queueS.update([allOpt, ...qOpts]);
            await update_users("all");
            async function update_users(queue) {
                res = await fetch("/Aml_Analysis/GetQeueUsers/" + queue, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                });
                let users = await res.json();

                let quOpts = users.map(q => {
                    let opt = document.createElement("option");
                    opt.value = q.value;
                    opt.innerText = q.text;
                    return opt
                });
                userS.update([document.createElement("option"), ...quOpts]);

            }


            queueS.onchange = async (e) => {
                let queue = queueS.value;//.value;
                await update_users(queue);
            }
            $('#queueUserCollapse').collapse("show");
        }
        catch (e) {

        }
    }


    if (actionValue == "close")
        $('#queueUserCollapse').collapse("hide");



}



submitBtn.onclick = async () => {
    let Sql = parseFiltersToSQL(querybuilder.value);
    let ReadableOutPut = sqlWhereToHumanReadable(Sql);
    let Action = actionSelect.value;//.value;

    let request = {
        Sql,
        ReadableOutPut,
        Action,
        ...(Action == "route" && { RouteToUser: queueS.value + "--" + userS.value }),//.value   .value
        TableName: "ART_AML_ANALYSIS_VIEW_TB"
    }
    try {
        let res = await fetch("/AutoRules/AddRule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(request)
        });
        if (res.ok) {
            $(grid.gridDiv).data('kendoGrid').dataSource.read();
            $(grid.gridDiv).data('kendoGrid').refresh();
        } else {
            toastObj.text = "somthing wrong happend please try again later";
            toastObj.icon = "error";
            toastObj.heading = "Create Rule Status";
            $.toast(toastObj);
        }

    }
    catch (e) {
        toastObj.text = "somthing wrong happend please try again later";
        toastObj.icon = "error";
        toastObj.heading = "Create Rule Status";
        $.toast(toastObj);
    }
}


let ops = {
    "contains": "LIKE",
    "=": "=",
    "<>": "<>",
    "isblank": "IS NULL",
    "isnotblank": "IS NOT NULL",
    "is_empty": "= ''",
    "is_not_empty": "<> ''",
    "startswith": "LIKE",
    "not_begins_with": "NOT LIKE",
    "notcontains": "NOT LIKE",
    "endswith": "LIKE",
    "not_ends_with": "NOT LIKE",
    "in": "IN",
    "not_in": "NOT IN",
    ">=": ">=",
    ">": ">",
    "<=": "<=",
    "<": "<",
};

function parseFiltersToSQL(filters) {
    // Helper function to process each condition into SQL, with value type handling
    function processCondition(condition) {
        let [field, operator, value] = condition;
        value = value ?? "";
        let formattedValue = value;
        let fieldType = fields.find(x => x.paraName == field)?.type
        // Determine the value type and format accordingly
        if (fieldType === 'number') {
            // Numbers are used directly
            formattedValue = value;
        } else if (fieldType === 'date') {
            // Format Date objects to 'YYYY-MM-DD' (consider using a proper date formatting library for more complex needs)
            formattedValue = `'${value.toISOString().split('T')[0]}'`;
        } else if (fieldType === 'string') {
            // For strings, escape single quotes and enclose in single quotes
            value = value.replace(/'/g, "''");
            switch (operator) {
                case "contains":
                case "notcontains":
                    formattedValue = `'%${value}%'`;
                    break;
                case "startswith":
                case "not_begins_with":
                    formattedValue = `'${value}%'`;
                    break;
                case "endswith":
                    formattedValue = `'%${value}'`;
                    break;
                case "not_ends_with":
                    formattedValue = `'%${value}'`;
                    break;
                default:
                    formattedValue = `'${value}'`;
            }
        }

        // Special handling for SQL operators like IN and NOT IN
        if (operator === "in" || operator === "not_in") {
            if (Array.isArray(value)) {
                // Format array values, assuming they are strings or numbers
                const formattedArrayValues = value.map(v => typeof v === 'number' ? v : `'${v.replace(/'/g, "''")}'`).join(',');
                formattedValue = `(${formattedArrayValues})`;
            }
        }

        const sqlOperator = ops[operator] || operator;
        return `${field} ${sqlOperator} ${formattedValue}`;
    }

    // Recursive function to process the filters array
    function processFilters(filters) {
        const parts = [];

        for (let i = 0; i < filters.length; i++) {
            const element = filters[i];

            if (Array.isArray(element)) {
                if (Array.isArray(element[0])) {
                    parts.push(`(${processFilters(element)})`);
                } else {
                    parts.push(processCondition(element));
                }
            } else if (typeof element === 'string') {
                parts.push(element.toUpperCase());
            }
        }

        return parts.join(' ');
    }

    return processFilters(filters);
}

function generateSql(filters) {
    // Helper function to process each condition into SQL
    function processCondition(condition) {
        const [field, operator, value] = condition;
        // Handle special characters and SQL injection prevention measures here if necessary
        // For simplicity, assuming values are safe and numeric (for this example)
        return `${field} ${operator} ${value}`;
    }

    // Recursive function to process the filters array
    function processFilters(filters) {
        const parts = [];

        for (let i = 0; i < filters.length; i++) {
            const element = filters[i];

            if (Array.isArray(element)) {
                // Check if the first element of the array is also an array (indicating a nested condition)
                if (Array.isArray(element[0])) {
                    parts.push(`(${processFilters(element)})`);
                } else {
                    parts.push(processCondition(element));
                }
            } else if (typeof element === 'string') {
                // Logical operator
                parts.push(element.toUpperCase()); // Convert "and" / "or" to uppercase
            }
        }

        return parts.join(' ');
    }

    // Start processing
    return processFilters(filters);
}


function sqlWhereToHumanReadable(whereClause) {
    const operators = {
        '=': 'is equal to',
        '!=': 'is not equal to',
        '<': 'is less than',
        '>': 'is greater than',
        '<=': 'is less than or equal to',
        '>=': 'is greater than or equal to',
        'LIKE': 'matches',
        'AND': 'and',
        'OR': 'or'
    };

    // Split the WHERE clause into parts based on spaces, considering that strings could contain spaces
    // This simplistic approach does not handle all cases (e.g., strings with operators in them)
    const parts = whereClause.split(/\s+(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/);

    let humanReadable = '';
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (operators[part]) {
            humanReadable += ` ${operators[part]} `;
        } else if (part.startsWith("'") || part.startsWith('"')) {
            // Remove leading and trailing quotes from strings
            humanReadable += part.slice(1, -1);
        } else {
            humanReadable += part;
        }
    }

    return humanReadable.trim();
}

document.addEventListener('change', function (e) {
    if (e.target && e.target.parentElement.matches('art-switch')) {
        onSwitchChanges(e.target);
    }
});


async function onSwitchChanges(e) {
    let row = e.closest("tr");
    let gridObj = $(grid.gridDiv).data('kendoGrid');
    let dt = gridObj.dataItem(row);

    if (dt.Active === e.checked)
        return;

    else {
        try {
            kendo.ui.progress($(grid.gridDiv), true);
            let res = await fetch(`/AutoRules/Activate/${dt.Id}?active=${e.checked}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!res.ok) {
                toastObj.text = "somthing wrong happend please try again later";
                toastObj.icon = "error";
                toastObj.heading = "Create Rule Status";
                $.toast(toastObj);
            }
            else {
                $(grid.gridDiv).data('kendoGrid').dataSource.read();
            }
            kendo.ui.progress($(grid.gridDiv), false);
        }
        catch (e) {
            toastObj.text = "somthing wrong happend please try again later";
            toastObj.icon = "error";
            toastObj.heading = "Create Rule Status";
            $.toast(toastObj);
            kendo.ui.progress($(grid.gridDiv), false);
        }
    }
}



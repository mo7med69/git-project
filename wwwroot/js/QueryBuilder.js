
const autoRolesPropsValidation = {
    "Prediction": {
        min: 0,
        max: 1,
        step: 0.01 // optional, controls increments
    }
}


var action = document.getElementById("action");
fetch("/AutoRules/GetQueryBuilderParams").
    then(x => x.json())
    .then(x => {
        var qd = [...x].map(item => ({
            id: item.paraName,
            field: item.paraName,
            type: item.type == "number" ? "integer" : item.type,
            label: item.paraDisplayName,
            value_separator: ",",
            validation: autoRolesPropsValidation[item.paraName]
        }));;
        $("#query").queryBuilder({
            filters: qd,
        });
    })


action.onchange = async (e) => {
    var container = document.getElementById("qeuryContainer");
    if (e.target.value == "Route") {
        var div = document.createElement("div");
        div.style.padding = "1%";
        div.classList = "row";
        div.id = "queueuser"
        var queueselect = document.createElement("select");
        queueselect.id = "queueSelect";
        queueselect.classList = "col-xs-6 col-md-6 col-sm-6 text-info selectpicker";
        queueselect.setAttribute("data-live-search", true);
        var queues = await (await fetch("/AML_ANALYSIS/GetQueues", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })).json();
        var opt = document.createElement("option");
        opt.value = "";
        opt.innerText = "Select A Queue";
        queueselect.append(opt);
        queues.forEach(x => {
            var opt = document.createElement("option");
            opt.value = x.value;
            opt.innerText = x.text;
            queueselect.append(opt);
        });
        var userselect = document.createElement("select");
        userselect.id = "userSelect";
        userselect.classList = "col-xs-6 col-md-6 col-sm-6 text-info selectpicker";
        userselect.setAttribute("data-live-search", true);
        var users = await (await fetch("/AML_ANALYSIS/GetQeueUsers/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            /*body: JSON.stringify("")*/
        })).json();
        var opt = document.createElement("option");
        opt.value = "";
        opt.innerText = "Select A User";
        userselect.append(opt);
        users.forEach(x => {
            var opt = document.createElement("option");
            opt.value = x.value;
            opt.innerText = x.text;
            userselect.append(opt);
        });
        div.appendChild(queueselect);
        div.appendChild(userselect);
        container.parentNode.insertBefore(div, container.nextSibling);
        $('#queueSelect').selectpicker('refresh');
        $('#userSelect').selectpicker('refresh');


        queueselect.onchange = async (ev) => {
            console.log(ev.target.value);
            var queueUsers = await (await fetch("/AML_ANALYSIS/GetQeueUsers/" + ev.target.value, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                /*body: JSON.stringify(ev.target.value)*/
            })).json();

            userselect.innerHTML = "";
            var opt = document.createElement("option");
            opt.value = "";
            opt.innerText = "Select An User";
            userselect.append(opt);
            queueUsers.forEach(x => {
                var opt = document.createElement("option");
                opt.value = x.value;
                opt.innerText = x.text;
                userselect.append(opt);
            });

            $('#userSelect').selectpicker('refresh');
        }

    }
    else {
        var queueUser = document.getElementById("queueuser");
        if (queueUser)
            container.parentNode.removeChild(queueUser);
    }

}
document.getElementById("sql").onclick = async () => {

    var toastObj = {
        text: "", // Text that is to be shown in the toast
        heading: '', // Optional heading to be shown on the toast
        icon: '', // Type of toast icon
        showHideTransition: 'slide', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
    };
    var para = {};
    console.log(action.value);

    if (action.value == 'Route') {
        var queueSelect = document.getElementById("queueSelect");
        var users = document.getElementById("userSelect");

        if ((!queueSelect.value || queueSelect.value == "") && (!users.value || users.value == "")) {
            toastObj.icon = 'error';
            toastObj.text = "You must select user, queue or both";
            toastObj.heading = "Add Rule Status";
            $.toast(toastObj);
            return;
        }
        para.RouteToUser = queueSelect.value + "--" + users.value
    }
    var sql = $("#query").queryBuilder('getSQL');
    var rules = $('#query').queryBuilder('getRules');
    para = {
        ReadableOutPut: getReadableRules(rules),
        TableName: "ART_AML_ANALYSIS_VIEW_TB",
        Sql: sql.sql,
        Action: action.value/*parseInt().toString()*/,
        ...para
    };

    var res = await fetch("/AutoRules/AddRule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(para)
    });

    var resText = await res.json();
    toastObj.text = resText;
    toastObj.heading = "Add Rule Status";

    if (res.ok) {

        toastObj.icon = 'success';
        $('#query').queryBuilder('reset');
        $("#grid").data("kendoGrid").dataSource.read();
    }
    else {

        toastObj.icon = 'error';

    }
    $.toast(toastObj);
}


function getReadableRules(obj) {
    if (obj != null) {
        if (obj.hasOwnProperty("value")) {
            if (Object.prototype.toString.call(obj.value) !== '[object Array]') {

                return obj.id + " " + obj.operator + " " + obj.value
            }
        }
        if (obj.hasOwnProperty("rules") && obj.rules != null) {
            var str = "( ";
            for (var i = 0; i < obj.rules.length; i++) {
                if (i == (obj.rules.length - 1)) {
                    str += getReadableRules(obj.rules[i])
                } else {
                    str += getReadableRules(obj.rules[i]) + " " + obj.condition + " ";

                }
            }
            return str + " )";
        }
    }
}
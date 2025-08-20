import { Filters, GoToDeatailsUrls } from "./Modules/ExternalFilters.js"
//import { makedynamicChart } from "./Modules/MakeDynamicChart.js"
import  {getChartType} from "./Components/Charts/Charts.js"
import { URLS as Urls } from "./URLConsts.js"
import { Spinner } from "../lib/spin.js/spin.js"

const charts = document.getElementById("charts");
var exRules = [];
class ExternalFilter extends HTMLElement {
    f = [];
    filterRulesObject = [];
    constructor() {
        super();
        var spinnerstyle = document.createElement("link");
        spinnerstyle.rel = "stylesheet";
        spinnerstyle.href = "../lib/spin.js/spin.css"
        var key = this.dataset.key.toString();
        var filters = Filters[key].filters;
        var rules = Filters[key].rules;
        exRules = rules;
        this.style = `display:flex;
                    justify-content:center;
                    align-items:center;
                    padding:1%`;
        this.className = "row";
        var filtercontrol = document.createElement("div");

        var btn = document.createElement("button");
        btn.innerText = "apply";
        filtercontrol.classList.add("col-xs-8", "col-md-8", "col-sm-8");
        btn.classList.add("col-xs-2", "col-md-2", "col-sm-2", "btn", "btn-primary");
        filtercontrol.id = "filters";
        $(filtercontrol).queryBuilder({
            filters: [...filters],
            rules: [...rules],
            lang: {
                add_rule: 'Add filter'
            },
            conditions: ["AND"],
            allow_groups: false,
            operators: ['equal', 'in']
        });



        $(filtercontrol).on('afterCreateRuleFilters.queryBuilder', (e, rule) => {
            this.filterRulesObject.push({ id: rule.id });
            this.hiddenFiltersRules();
        });
        $(filtercontrol).on('beforeDeleteRule.queryBuilder', (e, rule) => {
            this.filterRulesObject = this.filterRulesObject.filter(x => x.id != rule.id);             // remove element in filterRulesObject
            if (rule.filter) {
                this.showFilterRule(rule.filter.field);
            }
        });
        $(filtercontrol).on('afterUpdateRuleValue.queryBuilder', (e, rule) => {
            var ruleinput = rule.$el[0].querySelector('.rule-value-container').querySelector(`[name = '${rule.id}_value_0']`);


            if (!ruleinput.value) {
                var index = this.filterRulesObject.findIndex(x => x.id == rule.id);
                var prevRule = this.filterRulesObject[index];
                this.filterRulesObject[index] = { field: rule.filter.field, id: rule.id };
                this.showFilterRule(prevRule.field);
                this.hiddenFiltersRules();
            }
        });




        btn.onclick = () => {
            
            var rules = $(filtercontrol).queryBuilder('getRules');
            var isValidFilters = true;
            if (rules == null || rules.rules == null) {
                isValidFilters = false;
                toastObj.icon = 'error';
                toastObj.text = `please add report filters`;
                toastObj.heading = "Apply Filter Status";
                $.toast(toastObj);
            }
            filters.forEach((f) => {
                if (rules && rules.rules) {
                    var IsRuleExist = rules.rules.some(item => item.id === f.id);
                    if (!IsRuleExist) {
                        isValidFilters = false;
                        toastObj.icon = 'error';
                        toastObj.text = `please add ${f.label} filter`;
                        toastObj.heading = "Apply Filter Status";
                        $.toast(toastObj);
                    }
                }
                
            })
            if (isValidFilters) {
                console.log(rules);
                var g = [...rules.rules].reduce((group, product) => {
                    const { id } = product;
                    group[id] = !group[id] ? [] : group[id];
                    group[id].push(product);
                    return group;
                }, {});
                var arr = [];
                for (var prop in g) {
                    arr.push(g[prop]);
                }
                if (arr.some(x => x.length > 1)) {
                    console.log("error");
                } else {
                    exRules = Array.prototype.concat.apply([], arr);
                    exRules = [...exRules].map(x => {
                        if (Array.isArray(x.value)) {
                            x.value = [...x.value].join(",");
                        }
                        return x;
                    });
                    if (document.getElementById("grid")) {
                        $("#grid").data("kendoGrid").dataSource.read();
                        $("#grid").data("kendoGrid").dataSource.view();
                    } else if (document.getElementById("charts")) {
                        var url = this.dataset.chartsurl;
                        var chartsurl = Urls[url];
                        callDefinedCharts(chartsurl);
                    }
                }
            }
            
        }
        this.appendChild(spinnerstyle);
        this.appendChild(filtercontrol);
        this.appendChild(btn);
        //this.appendChild(goToDetailsBtn);
        this.f = this.getAppliedFiltersNames();
        //this.appendChild(goToDetailsBtn);
        var rules = $(filtercontrol).queryBuilder('getRules');
        var g = [...rules.rules].reduce((group, product) => {
            const { id } = product;
            group[id] = !group[id] ? [] : group[id];
            group[id].push(product);
            return group;
        }, {});
        var arr = [];
        for (var prop in g) {
            arr.push(g[prop]);
        }
        if (arr.some(x => x.length > 1)) {
            console.log("error");
        } else {
            exRules = Array.prototype.concat.apply([], arr);
            exRules = [...exRules].map(x => {
                if (Array.isArray(x.value)) {
                    x.value = [...x.value].join(",");
                }
                return x;
            });


            if (document.getElementById("charts") && !document.getElementById("grid")) {
                var url = this.dataset.chartsurl;
                var chartsurl = Urls[url];
                callDefinedCharts(chartsurl);
            }

        }
    }
    connectedCallback() { // this function is called when DOM is Created 
        this.initialFiltersRule();
        this.hiddenFiltersRules();
    }
    getAppliedFiltersNames() {
        var filtercontrol = document.getElementById('filters');
        var rules = $(filtercontrol).queryBuilder('getRules');

        if (rules) {
            var g = [...rules.rules].reduce((group, product) => {
                const { id } = product;
                group[id] = !group[id] ? [] : group[id];
                group[id].push(product);
                return group;
            }, {});
            var arr = [];
            for (var prop in g) {
                arr.push(g[prop]);
            }
            var flattened = arr.reduce((acc, val) => acc.concat(val), []);
            var f = flattened.map(x => x.id);
            return f;

            //$(filtercontrol).queryBuilder('removeFilter', f, true);
            //$(filtercontrol).queryBuilder('setRules', rules);
            //$(filtercontrol).queryBuilder('ChangeFilters',newFilters);

        }
        return [];
    }
    initialFiltersRule() {
        var rules = this.getAppliedFiltersNames();
        var selects = this.getElementsByTagName(`select`);

        [...rules].forEach((x) => {
            var index;
            [...selects].forEach(y => {
                if (x == y.value)
                    index = y.name.replace("filters_rule_", "").replace("_filter", "");
            });


            this.filterRulesObject.push({ field: x, id: `filters_rule_${index}` });
        }
        );
    }
    showFilterRule(field) { // Show All Filter in  field rule
        [...this.filterRulesObject].forEach(x => {

            var opts = $(`#${x.id}`).find(`option[value=${field}]`);
            [...opts].forEach(opt => {
                $(opt).show();
            });
        });
    }
    hiddenFiltersRules() { // hidden duplicate filters in rules
        console.log(this.filterRulesObject);
        var rulesField = [...this.filterRulesObject].map(x => x.field);
        [...this.filterRulesObject].forEach(x => {
            var arrRulesField = [...rulesField].filter(t => t != x.field);
            [...arrRulesField].forEach(t => {
                var opts = $(`#${x.id}`).find(`option[value=${t}]`);
                [...opts].forEach(opt => {
                    $(opt).hide();
                })
            });
        });
    }
}

function callDefinedCharts(url) {
    var spinner = new Spinner().spin(charts);
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ req: null, procFilters: exRules }),
    }).then(x => x.json()).then(data => {
        [...data].forEach(c => {

            let chart = document.getElementById(c.ChartId);
            
            if(chart)
            {
                chart.setdata(c.Data);
                $(".spinner").remove();
                return;
            }
            
            let type = getChartType(c.Type);
            chart = document.createElement(type);
            chart.dataset.value = c.Val;
            chart.dataset.title = c.Title;
            chart.dataset.category = c.Cat;
            chart.id = c.ChartId;
            chart.style.height = "700px"
            chart.classList.add("col-sm-12", "col-md-12", "col-xs-12");
            charts.appendChild(chart);
            

        });
        $(".spinner").remove();
    })
}
customElements.define("filters-control", ExternalFilter);
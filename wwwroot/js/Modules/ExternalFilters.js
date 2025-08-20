var dateSetting = {
    plugin: 'datepicker',
    plugin_config: {
        format: 'yyyy-mm-dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true
    }
};

function multiSelectSetting(url) {
    var vals = [];


    $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            vals = data;
        }
    });


    console.log(vals);


    return {
        multiple: true,
        input: 'select',
        validation: false,
        operators: ['in'],
        values: vals,
        value_separator: ",",
        plugin: 'selectpicker',
        plugin_config: {
            actionsBox: true,
            liveSearch: true,
            width: 'auto',
            selectedTextFormat: 'count',
            liveSearchStyle: 'contains',
        },
    }
}
function currentDate() {
    var d = new Date();
    return d.toISOString().slice(0, 10);
}


function yesterday() {
    var d = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
}
export const Filters = {
    UserPerformanceSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    SystemPerformanceSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    CRPSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    UserPerformancePerActionUser: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    UserPerformPerAction: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },

            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    UserPerformancePerUserAndAction: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    ArtAccountsOpenedClosedWithin6Months: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    AlertAgeSummery: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        },
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    //AML
    AlertSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    CasesSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    CustomersSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    RiskClassSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },

    //GoAml
    GOAMLReportsSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },

    //DGAML
    DGAMLAlertSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    DGAMLCustomersSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    DGAMLExternalCustomerSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
    DGAMLCasesSummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },

    //FATCA
    FATCASummary: {
        filters: [],
        get filters() {
            return [
                { id: "startdate", field: "startdate", label: "Start Date", operators: ['equal'], type: "date", ...dateSetting },
                { id: "enddate", field: "enddate", label: "End Date", operators: ['equal'], type: "date", ...dateSetting },
            ]
        }
        ,
        rules: [

            { id: "startdate", field: "startdate", label: "Start Date", type: "date", operator: "equal", value: yesterday() },
            { id: "enddate", field: "enddate", label: "End Date", type: "date", operator: "equal", value: currentDate() },

        ]
    },
}


export const GoToDeatailsUrls = {

    SystemPerformanceSummary: {
        filtersOrder: ["startdate",
            "enddate",
            "case_id",
            "case_type",
            "case_status",
        ],
        url: "/SystemPerformance/Index/?"
    },
    SanctionAllCasesSummary: {
        filtersOrder: ["startdate",
            "enddate",
            "case_id",
            "case_type",
            "case_status",
        ],
        url: "/SanctionAllCasesDetails/Index/?"
    },
    UserPerformanceSummary: {
        filtersOrder: ["startdate",
            "enddate",
            "case_id",
            "case_type",
            "case_status",
            "prev_status_user",
            "create_user",
            "prev_status",
            "create_user_category",
            "lock_user_category",
            "prev_status_user_category"
        ],
        url: "/UserPerformance/Index/?"
    },
    UserPerfAvgPrevUser: {
        filtersOrder: ["startdate",
            "enddate",
            "case_id",
            "case_type",
            "case_status",
            "prev_status_user",
            "create_user",
            "prev_status",
            "create_user_category",
            "lock_user_category",
            "prev_status_user_category"
        ],
        url: "/UserPerformance/Index/?"
    },
    UserPerfAvgPrevStatusUser: {
        filtersOrder: ["startdate",
            "enddate",
            "case_id",
            "case_type",
            "case_status",
            "prev_status_user",
            "create_user",
            "prev_status",
            "create_user_category",
            "lock_user_category",
            "prev_status_user_category"
        ],
        url: "/UserPerformance/Index/?"
    },

    SanctionManualSearchSummary: {
        filtersOrder: [
            "startdate",
            "enddate",
            "searchUser",
            "searchMatch",
            "sourceType"
        ],
        url: "/SanctionManualSearchDetails/Index/?"
    },
    PartyListUpdateSummary: {
        filtersOrder: [
            "startdate",
            "enddate",
            "party_name",
            "party_number",
            "party_type",
            "party_status",
            "action_status"
        ],
        url: "/VaPartyListUpdateDetails/Index/?"
    },
    SanctionListUpdateSummary: {
        filtersOrder: [
            "startdate",
            "enddate",
            "entity_name",
            "entity_watch_list_number",
            "type",
            "watch_list_name"
        ],
        url: "/VaSanctionListUpdateDetails/Index/?"
    }
}



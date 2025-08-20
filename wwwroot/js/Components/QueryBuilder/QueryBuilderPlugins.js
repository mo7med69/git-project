export const dateSetting = {
    plugin: 'datepicker',
    plugin_config: {
        format: 'yyyy-mm-dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true
    }
};
export const multiSetting = {
    multiple: true,
    input: 'select',
    validation: false,
    //operators: ['in'],
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
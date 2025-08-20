export const multiSelectOperation = (fieldName, values) => {
    return {



        label: 'In',
        name: `in-${fieldName}`,

        editorTemplate: function (fieldType, value, fieldData) {
            const editor1 = document.createElement('smart-multi-combo-input');

            editor1.dataSource = values.map(x => ({ value: x, label: x }));
            editor1.selectAll = true;
            editor1.dropDownWidth = 500;
            editor1.separator = ',';
            editor1.selectedValues = value.split(",");

            const container = document.createElement('div');


            container.className = 'container';

            container.appendChild(editor1);

            return container;
        },
        valueTemplate: function (editor, value) {
            return value;
        },
        handleValue: function (editor) {
            const editors = editor.getElementsByTagName('smart-multi-combo-input');
            return editors[0].value;
        }

    }// Additional properties and methods as needed
};




export function mapParamtersToFilters(paramters) {

    var filters = [...paramters].map(p => {
        var field = { label: p.paraDisplayName, dataField: p.paraName, dataType: p.type }

        if (p.isMulti) {
            field.filterOperations = ['in-' + p.paraName]
        }
        return field;
    });

    return filters;
}
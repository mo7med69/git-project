let chartTypes = {};

fetch("/CustomReport/GetChartsTypes/").then(x => x.json()).then(types => {
    types.forEach(t => {
        chartTypes[t.value] = t.text
    });
    console.log(types);
})

export function getChartType(chartType) {
    let type = chartTypes[chartType];
    console.log(type, chartType);
    switch (type) {
        case 'bar':
            return "m-bar-chart";
        case 'pie':
            return "m-pie-chart";
        case 'donut':
            return "m-donut-chart";
        case 'dragdrop':
            return "m-drag-drop-chart";
        case 'clynder':
            return "m-clynder-chart";
        case 'curvy':
            return "m-curved-column-chart";
        case 'curvedline':
            // Assuming 'curvedline' refers to a line chart
            return "m-line-chart";
        default:
            return "Invalid chart type";
    }
}

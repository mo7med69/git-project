

function createCategoryLineChart(chartDiv, url,categoryName) {
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    var chart = am4core.create(chartDiv, am4charts.XYChart);


    $.ajax({
        type: "GET",
        url: url,
        data: {
        },
        success: function (data) {
            chart.data = data;
            console.log("qdata", JSON.stringify(data));

            Object.entries(chart.data[0]).forEach(([key, value], index) => {
                if (index != 0) {
                    createSeries(key, key);
                    console.log(`${key} ${value} -  ${index}`);
                }
                // "a 5", "b 7", "c 9"
            });
        },
                   
         });
    
    // Add data
    /*if (categoryName == "Qtr") {
        chart.data = [{
        "Qtr": "Q1",
        "L1": 1000,
        "L2": 162,
        "L3": 0
    }, {
        "Qtr": "Q2",
        "L1": 669,
        "L2": 162,
        "L3": 841
    }, {
        "Qtr": "Q3",
        "L1": 1200,
        "L2": 162,
        "L3": 19
    }, {
        "Qtr": "Q4",
        "L1": 120,
        "L2": 867,
        "L3": 199

        }];
    } else {
        chart.data = [{
            "Year": "2000",
            "L1": 1000,
            "L2": 162,
            "L3": 0
        }, {
            "Year": "2001",
            "L1": 669,
            "L2": 162,
            "L3": 841
        }, {
            "Year": "2002",
            "L1": 1200,
            "L2": 162,
            "L3": 19
        }, {
            "Year": "2003",
            "L1": 120,
            "L2": 867,
            "L3": 199

        }, {
            "Year": "2004",
            "L1": 1000,
            "L2": 162,
            "L3": 0
        }, {
            "Year": "2005",
            "L1": 669,
            "L2": 162,
            "L3": 841
        }, {
            "Year": "2006",
            "L1": 1200,
            "L2": 162,
            "L3": 19
        }, {
            "Year": "2007",
            "L1": 120,
            "L2": 867,
            "L3": 199

        }, {
            "Year": "2008",
            "L1": 1000,
            "L2": 162,
            "L3": 0
        }, {
            "Year": "2009",
            "L1": 669,
            "L2": 162,
            "L3": 841
        }, {
            "Year": "2010",
            "L1": 1200,
            "L2": 162,
            "L3": 19
        }, {
            "Year": "2011",
            "L1": 120,
            "L2": 867,
            "L3": 199

        }, {
            "Year": "2012",
            "L1": 1000,
            "L2": 162,
            "L3": 0
        }, {
            "Year": "2013",
            "L1": 669,
            "L2": 162,
            "L3": 841
        }, {
            "Year": "2014",
            "L1": 1200,
            "L2": 162,
            "L3": 19
        }, {
            "Year": "2015",
            "L1": 120,
            "L2": 867,
            "L3": 199

        }];
    }*/

    

    chart.dataSource.url = url;
    console.log("outUrl",url);
    // Create axes
    //start
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryName;
    categoryAxis.renderer.minGridDistance = 100;
    categoryAxis.align = "left";
    //end


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    console.log(JSON.stringify(chart.data));

    // Create series
    function createSeries(field, name) {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = categoryName;
        series.name = name;
        series.tooltipText = "" + name + ": [b]{valueY}[/]";
        series.strokeWidth = 2;

        series.smoothing = "monotoneX";

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;

        return series;
    }

    

    chart.legend = new am4charts.Legend();

    chart.legend.useDefaultMarker = true;
    var marker = chart.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    chart.cursor = new am4charts.XYCursor();
}
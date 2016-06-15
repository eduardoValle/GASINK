angular.module('sensorTemperatura', []);
angular.module('sensorTemperatura').controller('controle', function ($scope) {

    $('#container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Concentração de gases por c³'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{// visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
        },
        yAxis: {
            title: {
                text: 'Gás por cm³'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
                name: 'Nível de gás',
                data: [3, 4, 3, 5, 4, 10, 12]
            }]
    });
});
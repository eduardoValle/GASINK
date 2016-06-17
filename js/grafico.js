angular.module('sensorTemperatura', []);
angular.module('sensorTemperatura').controller('controle', function ($scope, $http) {

    var chart;

    function requestData(){
        $http.get("/grafico").success(function (data, status) {
            var ponto = data;
            console.log(ponto);

            var series = chart.series[0],
                    shift = series.data.length > 20; // shift if the series is 
            // longer than 20

            // add the point
            chart.series[0].addPoint(ponto, true, shift);
            setTimeout(requestData, 1000);
            
        }).error(function (data, status) {
            console.log(data);
        });
    }
    


    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'areaspline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Concentração de gases por cm³'
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
                name: 'Nível de Gás',
                data: [3, 4, 3, 5, 4, 10, 12]
            }]
    });

    console.log(chart.series);
});
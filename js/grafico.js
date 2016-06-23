angular.module('sensorTemperatura', []);
angular.module('sensorTemperatura').controller('controle', function ($scope, $http) {

    // Define o valor mpinimo para iniciar a abertura da porta e acionamento do cooler. 
    $scope.sensibilidade = 15;
    
    // Essa variavel recebera a mpedia do calculo dos dados recebidos pelo gráfico, e a partir de seu valor que será acionado o portão e o cooler.
    $scope.mediaCalculada = 0;

    /**************
      * PORTÃO *
    **************/
    $scope.statusPortao = 0; // 0 = Fechado 1 = Aberto

    $scope.interagirPortao = function () {
        if (!$scope.statusPortao === 0) {
            abrirPortao();
            $scope.statusPortao = 1;
        } else {
            fecharPortao();
            $scope.statusPortao = 0;
        }
    };

    function abrirPortao() {
        if ($scope.statusPortao === 0) {
            $http.get("/abrirPortao").success(function (data, status) {

                $scope.statusPortao = 1;
                console.log("O Portão foi aberto!!");

            }).error(function (data, status) {
                console.log(console.log("Problemas ao abrir Portão: ") + data);
            });
        }
    }

    function fecharPortao() {
        if ($scope.statusPortao === 1) {
            $http.get("/fecharPortao").success(function (data, status) {

                $scope.statusPortao = 0;
                console.log("O Portão foi fechado!!");

            }).error(function (data, status) {
                console.log(console.log("Problemas ao fechar Portão: ") + data);
            });
        }
    }


    /*************
      * COOLER *
    **************/
    $scope.statusCooler = 0; // 0 = Desligado 1 = Ligado
    $scope.nomeBotaoCooler = ($scope.statusCooler ? "Desligar Cooler" : "Ligar Cooler");

    $scope.interagirCooler = function () {
        if (!$scope.statusCooler) {

            ligarCooler();
        } else {
            desligarCooler();
        }
    };

    function ligarCooler() {
        if ($scope.statusCooler === 0) {
            $http.get("/ligarCooler").success(function (data, status) {

                $scope.statusCooler = 1;
                console.log("Cooler ligado!!");

            }).error(function (data, status) {
                console.log(console.log("Problemas ao ligar cooler: ") + data);
            });
        }
    }

    function desligarCooler() {
        if ($scope.statusCooler === 1) {
            $http.get("/desligarCooler").success(function (data, status) {

                $scope.statusCooler = 0;
                console.log("Cooler desligado!!");

            }).error(function (data, status) {
                console.log(console.log("Problemas ao desligar cooler: ") + data);
            });
        }
    }


    /***********************
      * GRÁFICO E SENSOR *
    ************************/
    var chart;

    function requestData() {
        $http.get("/grafico").success(function (data, status) {
            var ponto = data;
            var series = chart.series[0],
                    shift = series.data.length > 20; // shift if the series is longer than 20

            $scope.mediaCalculada = ponto[1];

            // add the point
            chart.series[0].addPoint(ponto, true, shift);
            setTimeout(requestData, 1000);

        }).error(function (data, status) {
            console.log(data);
        });

        if ($scope.mediaCalculada > $scope.sensibilidade) {
            ligarCooler();
            abrirPortao();
        }
    /*    
        else{
            desligarCooler();
            fecharPortao();
        }
    */    
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

    function pegarMedia(array) {
        media = 0;
        for (i = 0; i < array.length; i++) {
            media += array[i];
        }
        return media / array.length;
    } 
});
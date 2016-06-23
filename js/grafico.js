angular.module('sensorTemperatura', []);
angular.module('sensorTemperatura').controller('controle', function ($scope, $http) {

    /** Portão **/
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


    /** Cooler **/
    $scope.statusCooler = 0; // 0 = Desligado 1 = Ligado
    $scope.nomeBotaoCooler = ($scope.statusCooler ? "Desligar Cooler" : "Ligar Cooler");
    //console.log($scope.nomeBotaoCooler);

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


    /** GRAFICO / SENSOR **/
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

        if ($scope.mediaCalculada > 15) {
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
    
    
    $scope.teste = [
        {
            img: '/layout/img/serv/1.jpg',
            descricao: "Autodesk® 123D® Circuits : O 123D Circuits é um software que permite aos utilizadores simularem a construção de circuitos com placas de ensaio e plataformas de código aberto Arduino. Os utilizadores podem fazer as suas experiências e depois optar por imprimir os circuitos criados para uma impressora 3D a partir da app que a ferramenta já traz."
        },
        {
            img: "/layout/img/serv/2.jpg",
            descricao: "Arduino: é uma plataforma de prototipagem eletrônica de hardware livre e de placa única, projetada com um microcontrolador Atmel AVR com suporte de entrada/saída embutido, uma linguagem de programação padrão, a qual tem origem em Wiring, e é essencialmente C/C++."
        },
        {
            img: "/layout/img/serv/3.jpg",
            descricao: "JavaScript: JavaScript é uma linguagem de programação interpretada. Foi originalmente implementada como parte dos navegadores web para que scripts pudessem ser executados do lado do cliente e interagissem com o usuário sem a necessidade deste script passar pelo servidor, controlando o navegador, realizando comunicação assíncrona e alterando o conteúdo do documento exibido."
        },
        {
            img: "/layout/img/serv/4.jpg",
            descricao: "NodeJS: Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis. Node.js usa um modelo de I/O direcionada a evento não bloqueante que o torna leve e eficiente, ideal para aplicações em tempo real com troca intensa de dados através de dispositivos distribuídos."
        },
        {
            img: "/layout/img/serv/5.jpg",
            descricao: "Express: Express é um framework para Node.js inspirado no Sinatra. Ele é minimalista, flexível e contém um robusto conjunto de recursos para desenvolver aplicações web, como um sistema de Views intuitivo (MVC), um robusto sistema de roteamento, um executável para geração de aplicações e muito mais."
        },
        {
            img: "/layout/img/serv/6.jpg",
            descricao: "Bootstrap: Agradável, intuítivo, e poderoso framework front-end para criar facilmente de forma ágil projetos web responsivos e mobile-first. Bootstrap é o mais popular framework HTML, CSS, e JS para desenvolvimento de projetos responsivo e focado para dispositivos móveis na web."
        },
        {
            img: "/layout/img/serv/7.jpg",
            descricao: "Angular: AngularJS é o mais novo lançamento do time de desenvolvedores do Google. Diferentemente de outros frameworks JavaScript, ele adota uma abordagem mais ligada à sintaxe HTML, funcionando como uma espécie de extensão da linguagem."
        },
        {
            img: "/layout/img/serv/8.jpg",
            descricao: "Highcharts: Highcharts é uma biblioteca de gráficos escritos em JavaScript puro, oferecendo uma maneira fácil de adicionar mapas interativos ao seu site ou aplicação web. Highcharts atualmente suporta gráficos de linhas, spline, área, coluna, barra, torta e de dispersão."
        },
        {
            img: "/layout/img/serv/9.jpg",
            descricao: "GitHub: GitHub é um Serviço de Web Hosting Compartilhado para projetos que usam o controle de versionamento Git. É escrito em Ruby on Rails pelos desenvolvedores da Logical Awesome (Chris Wanstrath, PJ Hyett e Tom Preston - Wernder). O GitHub possui planos comerciais e gratuitos para projetos de código aberto.	"
        }
    ];
    
    
    
});
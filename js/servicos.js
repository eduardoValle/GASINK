angular.module('sensorTemperatura').controller('servicosController', function ($scope) {

    $scope.servicos = [
        {
            img: '/layout/img/serv/1.jpg',
            descricao: "Autodesk® 123D® Circuits : O 123D Circuits é um software que permite aos utilizadores simularem a construção de circuitos com placas de ensaio e plataformas de código aberto Arduino. Os utilizadores podem fazer as suas experiências e depois optar por imprimir os circuitos criados para uma impressora 3D a partir da app que a ferramenta já traz.",
            link: "https://123d.circuits.io/"
        },
        {
            img: "/layout/img/serv/2.jpg",
            descricao: "Arduino: é uma plataforma de prototipagem eletrônica de hardware livre e de placa única, projetada com um microcontrolador Atmel AVR com suporte de entrada/saída embutido, uma linguagem de programação padrão, a qual tem origem em Wiring, e é essencialmente C/C++.",
            link: "https://www.arduino.cc/"
        },
        {
            img: "/layout/img/serv/3.jpg",
            descricao: "JavaScript: JavaScript é uma linguagem de programação interpretada. Foi originalmente implementada como parte dos navegadores web para que scripts pudessem ser executados do lado do cliente e interagissem com o usuário sem a necessidade deste script passar pelo servidor, controlando o navegador, realizando comunicação assíncrona e alterando o conteúdo do documento exibido.",
            link: "https://www.javascript.com/"
        },
        {
            img: "/layout/img/serv/4.jpg",
            descricao: "NodeJS: Node.js é uma plataforma construída sobre o motor JavaScript do Google Chrome para facilmente construir aplicações de rede rápidas e escaláveis. Node.js usa um modelo de I/O direcionada a evento não bloqueante que o torna leve e eficiente, ideal para aplicações em tempo real com troca intensa de dados através de dispositivos distribuídos.",
            link: "https://nodejs.org"
        },
        {
            img: "/layout/img/serv/5.jpg",
            descricao: "Express: Express é um framework para Node.js inspirado no Sinatra. Ele é minimalista, flexível e contém um robusto conjunto de recursos para desenvolver aplicações web, como um sistema de Views intuitivo (MVC), um robusto sistema de roteamento, um executável para geração de aplicações e muito mais.",
            link: "http://expressjs.com/"
        },
        {
            img: "/layout/img/serv/6.jpg",
            descricao: "Bootstrap: Agradável, intuítivo, e poderoso framework front-end para criar facilmente de forma ágil projetos web responsivos e mobile-first. Bootstrap é o mais popular framework HTML, CSS, e JS para desenvolvimento de projetos responsivo e focado para dispositivos móveis na web.",
            link: "http://getbootstrap.com/"
        },
        {
            img: "/layout/img/serv/7.jpg",
            descricao: "Angular: AngularJS é o mais novo lançamento do time de desenvolvedores do Google. Diferentemente de outros frameworks JavaScript, ele adota uma abordagem mais ligada à sintaxe HTML, funcionando como uma espécie de extensão da linguagem.",
            link: "https://angularjs.org/"
        },
        {
            img: "/layout/img/serv/8.jpg",
            descricao: "Highcharts: Highcharts é uma biblioteca de gráficos escritos em JavaScript puro, oferecendo uma maneira fácil de adicionar mapas interativos ao seu site ou aplicação web. Highcharts atualmente suporta gráficos de linhas, spline, área, coluna, barra, torta e de dispersão.",
            link: "http://www.highcharts.com/"
        },
        {
            img: "/layout/img/serv/9.jpg",
            descricao: "GitHub: GitHub é um Serviço de Web Hosting Compartilhado para projetos que usam o controle de versionamento Git. É escrito em Ruby on Rails pelos desenvolvedores da Logical Awesome (Chris Wanstrath, PJ Hyett e Tom Preston - Wernder). O GitHub possui planos comerciais e gratuitos para projetos de código aberto.",
            link: "https://github.com/eduardoValle/GASINK"
        }
    ];
});
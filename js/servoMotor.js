var five = require("johnny-five");
var board = new five.Board();


board.on("ready", function () {

    var servo = new five.Servo(9);
    servo.sweep({
        range: [45, 135]
    });

    servo.sweep({
        range: [45, 135],
        interval: 1000,
    });

    servo.sweep({
        range: [45, 135],
        interval: 1000,
        step: 10
    });
    
    console.log("Motor funcionando!! =]");
});


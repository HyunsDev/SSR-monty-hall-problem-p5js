let speed = 600
let options = {
    start: false,
    size: $("#canvas").outerWidth(),
}

$("#speed").click(() => {
    switch (speed) {
        case 600:
            $("#speed").text("중간")
            speed=120
            break
        case 120:
            $("#speed").text("느리게")
            speed=4
            break
        case 4:
            $("#speed").text("빠르게")
            speed=600
            break
    }
})

$("#start-change").click(() => {
    $("#start-change").addClass("selected")
    $("#start-no-change").removeClass("selected")
    start(true)
})
$("#start-no-change").click(() => {
    $("#start-change").removeClass("selected")
    $("#start-no-change").addClass("selected")
    start(false)
})

let canvas = new p5(sketch, "canvas");


// 시작 함수
function start(change) {
    options = {
        start: true,
        change: change,
        trials: $("#trials").val(),
        size: $("#canvas").outerWidth()
    }

    result = {
        count: 0,
        win_rate: 0,
        lose_rate: 0
    }

    canvas.remove()
    canvas = new p5(sketch, "canvas");
    
}
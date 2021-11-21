let result = {
    count: 0,
    win_rate: 0,
    lose_rate: 0
}

let reward = 0
let answer = 0
let showNum, changeNum, rects, imgCar, imgGoat

let sketch = function (p) {
    p.preload = function () {
        imgCar = p.loadImage("./assets/car.png")
        imgGoat = p.loadImage("./assets/Goat.png")
        rects = [options.size/2-50-110, options.size/2-50, options.size/2-50+110]
    }

    p.setup = function () {
        p.createCanvas(options.size, options.size);
        p.background("#F2F3F8");
        p.textAlign(p.CENTER, p.CENTER);
        p.frameRate(speed)
        p.strokeWeight(0)
        p.textSize(12);
    }

    p.draw = function () {
        p.background("#F2F3F8");
        p.strokeWeight(0)
        p.fill("#D5DBE5")

        if (!options.start) {
            p.noLoop()
            return
        }

        p.rect(rects[0], 40, 100, options.size-120)
        p.rect(rects[1], 40, 100, options.size-120)
        p.rect(rects[2], 40, 100, options.size-120)

        switch (p.frameCount % 4) {
            case 0: // 참가자의 선택
                result.count++

                // 시작 난수
                reward = Math.floor(Math.random() * 3);
                answer = Math.floor(Math.random() * 3);
                p.strokeWeight(4)
                p.rect(rects[answer], 40, 100, options.size-120)

                p.fill(0)
                p.strokeWeight(0)
                p.text(`[1/4]`, options.size / 3 - 24, options.size - 54);
                p.text(`참가자의 선택`, options.size*2 / 3 - 12, options.size - 54);
                break

            case 1: // 참가자의 답과 보상이 아닌 문을 열기
                showNum = Math.floor(Math.random() * 3);
                while (reward == showNum || answer == showNum) {
                    showNum = Math.floor(Math.random() * 3);
                }

                p.fill(0)
                p.strokeWeight(0)
                p.text(`[2/4]`, options.size / 3 - 24, options.size - 54);
                p.text(`정답이 아닌 문 열기`, options.size*2 / 3 - 12, options.size - 54);
                p.image(imgGoat, rects[showNum], options.size-230)

                break

            case 2: // 염소를 바꿀 지 선택
                p.image(imgGoat, rects[showNum], options.size-230)

                if (options.change) {
                    changeNum = Math.floor(Math.random() * 3);
                    while (showNum == changeNum || answer == changeNum) {
                        changeNum = Math.floor(Math.random() * 3);
                    }
                    answer = changeNum
                }

                p.fill(0)
                p.strokeWeight(0)
                p.text(`[3/4]`, options.size / 3 - 24, options.size - 54);
                p.text(`선택 변경`, options.size*2 / 3 - 12, options.size - 54);
                break

            case 3: // 답 공개
                p.image(imgGoat, rects[showNum], options.size-230)

                if (reward === answer) {
                    p.fill("#B9CBEF")
                    p.rect(rects[answer], 40, 100, options.size-120)
                    p.image(imgCar, rects[answer], options.size-230)
                    p.image(imgGoat, rects[3-answer-showNum], options.size-230)
                    result.win_rate++
                } else {
                    p.image(imgCar, rects[reward], options.size-230)
                    p.image(imgGoat, rects[answer], options.size-230)
                    result.lose_rate++
                }

                p.fill(0)
                p.strokeWeight(0)
                p.text(`[4/4]`, options.size / 3 - 24, options.size - 54);
                p.text(`답 공개`, options.size*2 / 3 - 12, options.size - 54);
                break
        }


        // 플레이어의 선택
        p.strokeWeight(4)
        p.stroke("#6C9DFE")
        p.noFill()
        p.rect(rects[answer], 40, 100, options.size-120)

        // 결과 텍스트
        p.fill(0)
        p.strokeWeight(0)
        p.text(`성공 횟수 : ${result.win_rate}`, options.size / 2 - 100, options.size - 30); // 성공 횟수
        p.text(`${Math.round((result.win_rate / result.count) * 100)}%`, options.size / 2, options.size - 30); // 승률
        p.text(`실패 횟수 : ${result.lose_rate}`, options.size / 2 + 100, options.size - 30); // 실패 횟수

        // 실험 종료
        if (p.frameCount >= options.trials * 4 - 1) {
            $("#start-change").removeClass("selected")
            $("#start-no-change").removeClass("selected")
            p.noLoop()
        }
    }

};
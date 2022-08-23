import { Hill } from "./hill.js";
import { SheepController } from "./sheep-controller.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    // 화면크기 가져오기
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.hills = [
      new Hill("#fd6bea", 0.2, 12),
      new Hill("#ff59c2", 0.5, 8),
      new Hill("#ff4674", 1.4, 6),
    ];

    this.sheepController = new SheepController();

    // resize 크기 재기
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // request 애니매이션을 시작해줌
    requestAnimationFrame(this.animate.bind(this));
  }

  //   가변적인 브라우저를 위해 스크린사이즈를 가져오는 함수를 먼저정의
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // canvas 를 더블사이즈로해서 retina display 사용가능하게함
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    // 언덕을 resize event 걸어줌
    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    // 양을 resize event 걸어줌
    this.sheepController.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    // 캔버스 이전의 모션 clearRect로 지워줌
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      // 마지막언덕의 좌표에 양을 추가할거니 hill class 에서 return 값으로 받은 언덕의 좌표를
      // sheepcontroller 에다가 너어줌
      dots = this.hills[i].draw(this.ctx);
    }

    // 양을 animation 추가
    // t => fps를 위한 t 스템프를 넘겨줌
    // 관련 참조 https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.sheepController.draw(this.ctx, t, dots);
  }
}

window.onload = () => {
  new App();
};

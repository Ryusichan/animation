import { Hill } from "./hill.js";

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

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    // 캔버스 이전의 모션 clearRect로 지워줌
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }
  }
}

window.onload = () => {
  new App();
};

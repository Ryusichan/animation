export class Sun {
  constructor() {
    this.radius = 200;

    // 구해진 원의 크기를 바탕으로 좌표를 구함
    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getCirclePoint(this.radius, i * this.gap);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }

    // 프레임을 만들어줌
    this.fps = 30;
    this.fpsTime = 1000 / this.fps;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 140;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    //   fps 에 맞춰서 updatepoint를 실행
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    ctx.fillStyle = "#ffb200";
    ctx.beginPath();
    // 원을 그리지 않고
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.fill();

    // update된 좌표의 값을 선으로 연결하여 움직이는 원을 표현
    let pos = this.pos[0];
    ctx.moveTo(pos.x + this.x, pos.y + this.y);
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }
    ctx.fill();
  }

  updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.ranInt(5),
        y: pos.y + this.ranInt(5),
      };
    }
  }

  //   랜덤값으로 지글지글 움직이는 표현을 함
  ranInt(max) {
    return Math.random() * max;
  }

  //   sun의 좌표를 가져오려면 지름의 비율에서 sign, cosign함수를 사용해서 가져올수있음
  // 거기 반지름을 더하면 좌표가 나옴
  getCirclePoint(radius, t) {
    const theta = Math.PI * 2 * t;

    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
    };
  }
}

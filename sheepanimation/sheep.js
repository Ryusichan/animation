export class Sheep {
  // 양이 끝쪽에서 등장해야하니 stateWidth 를 받아옴
  constructor(img, stageWidth) {
    this.img = img;

    // frame 정의
    this.totalFrame = 8;
    this.curFrame = 0;

    // 양그림 1장의 크기와 높이
    this.imgWidth = 360;
    this.imgHeight = 360;

    // 그려질양의 크기는 retina display 감안하여 절반사이즈
    this.sheepWidth = 180;
    this.sheepHeight = 150;

    this.sheepWidthHalf = this.sheepWidth / 2;
    this.x = stageWidth + this.sheepWidth;
    this.y = 0;

    // 속도를 랜덤으로 정의
    this.speed = Math.random() * 2 + 1;

    // animate 에서 그려진 24fps
    this.fps = 24;
    // 실제로 보여질 fps시간때
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    this.curFrame += 1;
    // 현재frame이 totalframe보다 커지면 안되니 reset 정의
    if (this.curFrame == this.totalFrame) {
      this.curFrame = 0;
    }
    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    this.x = 650;
    this.y = 550;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = "#fff";
    // image를 넣을때 drawImage()를 사용
    // 참조 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.sheepWidthHalf,
      -this.sheepHeight + 20,
      // 양의 크기만큼 넓이와 높이를 구해줌
      this.sheepWidth,
      this.sheepHeight
    );
    // 저장했던 canvas 를 복귀시켜줌
    ctx.restore();
  }
}

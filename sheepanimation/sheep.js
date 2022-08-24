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
    // requestanimation 에서 넘겨받은 t 를 시간으로 정의
    if (!this.time) {
      this.time = t;
    }

    const now = t - this.time;

    // 시간을 내가정한 fps 와 비교하는 코드를 만듬 그러면
    // fps 프레임에 비교해서 시간에 도달했을때면 프레임이 증가되게
    if (now > this.fpsTime) {
      this.time = t;
      // 긴양의 이미지에서 해당프레임에 맞는이미지를 가져옴
      this.curFrame += 1;
      //현재 프레임이 토탈프레임보다 커지면안되니 리셋시켜줌
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }

    this.animate(ctx, dots);
  }

  animate(ctx, dots) {
    // 양의 포지션을 하단의 점으로 위치하게만듬
    // 양의 x 포지션을 stage 넓이에 양의넓이를 더한만큼을 초기값으로 지정하고
    // 속도를 빼줌
    this.x -= this.speed;
    // getY에서 구한 값을 너어줌
    const closest = this.getY(this.x, dots);
    this.y = closest.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    // 가져온값만큼 캔버스를 회전시킴
    ctx.rotate(closest.rotation);
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

  // 어떤 곡선이 x 값에 해당하는지 확인하는 함수를 만듬
  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (x >= dots[i].x1 && x <= dots[i].x3) {
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: 0,
      rotation: 0,
    };
  }

  // 곡선의 비율 t를 200개의 촘촘한 비율로 곡선을 나누고 x 값과 가장 근사한 좌표의 값을 가져옴
  getY2(x, dot) {
    const total = 200;
    let pt = this.getPointOnQuad(
      dot.x1,
      dot.y1,
      dot.x2,
      dot.y2,
      dot.x3,
      dot.y3,
      0
    );
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getPointOnQuad(
        dot.x1,
        dot.y1,
        dot.x2,
        dot.y2,
        dot.x3,
        dot.y3,
        t
      );

      if (x >= prevX && x <= pt.x) {
        return pt;
      }
      prevX = pt.x;
    }
    return pt;
  }

  // 높이를 비율에따른 좌표찾기
  // 참조 https://en.wikipedia.org/wiki/B%C3%A9zier_curve
  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    // atan2함수를 이용한 각도계산
    const tx = this.quadTangent(x1, x2, x3, t);
    const ty = this.quadTangent(y1, y2, y3, t);
    // 수직의 각도를 구하는방법이니 수평으로 변환하려면 90도를 더해줌
    // atan2의 리턴값이 (in radians)라서 일반적으로 쓰는 90도를 라디안으로 변환해서 더해줌
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI) / 180;
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
      rotation: rotation,
    };
  }

  // 곡선위의 좌표에 수직으로된 기울기를 찾는방법

  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}

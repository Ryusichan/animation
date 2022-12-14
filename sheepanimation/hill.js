export class Hill {
  // 색상, 속도, 언덕경사도 설정
  constructor(color, speed, total) {
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    // 토탈갯수보다 좀더 넓게 스테이지를 표현해서 넘치게 표현
    // 화면밖에서부터 자연스럽게 걸어오는 인물 그리기
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for (let i = 0; i < this.total; i++) {
      this.points[i] = {
        x: i * this.gap,
        y: this.getY(),
      };
    }
  }

  // 실제로 언덕을 캔버스에 그리는 함수
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    // 양의 위치를 파악하기위한 배열
    let dots = [];
    //   언덕에 움직임을 추가
    cur.x += this.speed;
    //   화면이 일정영역이상 사라지면 배열에서 빼줘서 배열을 관리함
    if (cur.x > -this.gap) {
      this.points.unshift({
        x: -(this.gap * 2),
        y: this.getY(),
      });
    } else if (cur.x > this.stageWidth + this.gap) {
      this.points.splice(-1);
    }

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      //   언덕이 움직이는것처럼보이게
      cur.x += this.speed;

      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      // dot에다가 양의 위치를 넘겨줌
      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }
    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    return dots;
  }

  // 언덕의 Y값을 랜덤으로 주는 함수
  getY() {
    // 스테이지 높이를 8로나누어 화면안으로 들어오게 표현
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + Math.random() * max;
  }
}

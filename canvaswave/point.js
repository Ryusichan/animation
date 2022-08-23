export class Point {
  // wave 를 만들때는 위아래로 움직이는 좌표값을 정하고 그포인트들을 각각연결하는 방법으로
  // 만든다
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    // 얼만큼 움직일 것인가
    this.max = Math.random() * 100 + 150;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}

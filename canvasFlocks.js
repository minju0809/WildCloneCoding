const canvas = document.querySelector(".canvasFlocks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flocks = [];

class Flocks {
  constructor() {
    this.position = [
      canvas.width / 2 + (canvas.width / 4) * (Math.random() * 2 - 1),
      canvas.height / 2 + (canvas.height / 4) * (Math.random() * 2 - 1),
    ];
    this.velocity = [Math.random() - 0.5, Math.random() - 0.5];
    this.acceleration = [0, 0];
    this.maxSpeed = 2;
    this.minSpeed = 1;
    this.maxForce = 0.25;
    this.perceptionRadius = 50;
  }
  flock(flocks) {
    this.acceleration = [0, 0];
    // 1. Alignment (가지런함)
    const alignment = this.align(flocks);
    if (alignment) {
      this.acceleration[0] += alignment[0];
      this.acceleration[1] += alignment[1];
    }
    // 2. Cohesion (결합)
    const cohesion = this.cohesion(flocks);
    if (cohesion) {
      this.acceleration[0] += cohesion[0];
      this.acceleration[1] += cohesion[1];
    }
    // 3. Separation (분리)
    const separation = this.separation(flocks);
    if (separation) {
      this.acceleration[0] += separation[0];
      this.acceleration[1] += separation[1];
    }
  }
  align(flocks) {
    let steering = [0, 0];
    let count = 0;

    flocks.forEach((flock) => {
      const dist = Math.sqrt(
        (this.position[0] - flock.position[0]) *
          (this.position[0] - flock.position[0]) +
          (this.position[1] - flock.position[1]) *
            (this.position[1] - flock.position[1])
      );
      if (flock !== this && dist < 200) {
        steering[0] += flock.velocity[0];
        steering[1] += flock.velocity[1];
        count++;
      }
    });
    if (count > 0) {
      steering[0] /= count;
      steering[1] /= count;
      this.magnitude(steering);

      steering[0] -= this.velocity[0];
      steering[1] -= this.velocity[1];
      this.limit(steering);

      return steering;
    }
  }

  cohesion(flocks) {
    let steering = [0, 0];
    let count = 0;

    flocks.forEach((flock) => {
      const dist = Math.sqrt(
        (this.position[0] - flock.position[0]) *
          (this.position[0] - flock.position[0]) +
          (this.position[1] - flock.position[1]) *
            (this.position[1] - flock.position[1])
      );
      if (flock !== this && dist < 200) {
        steering[0] += flock.position[0];
        steering[1] += flock.position[1];
        count++;
      }
    });
    if (count > 0) {
      steering[0] /= count;
      steering[1] /= count;

      steering[0] -= this.position[0];
      steering[1] -= this.position[1];
      this.magnitude(steering);

      steering[0] -= this.velocity[0];
      steering[1] -= this.velocity[1];
      this.limit(steering);

      return steering;
    }
  }

  separation(flocks) {
    let steering = [0, 0];
    let count = 0;

    flocks.forEach((flock) => {
      const dist = Math.sqrt(
        (this.position[0] - flock.position[0]) *
          (this.position[0] - flock.position[0]) +
          (this.position[1] - flock.position[1]) *
            (this.position[1] - flock.position[1])
      );
      if (flock !== this && dist < this.perceptionRadius) {
        let diff = [0, 0];
        diff[0] += this.position[0] - flock.position[0];
        diff[1] += this.position[1] - flock.position[1];

        steering[0] += diff[0] / 3;
        steering[1] += diff[1] / 3;
        count++;
      }
    });
    if (count > 0) {
      steering[0] /= count;
      steering[1] /= count;
      this.magnitude(steering);

      steering[0] -= this.velocity[0];
      steering[1] -= this.velocity[1];
      this.limit(steering);

      return steering;
    }
  }

  magnitude(vec) {
    const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    if (length > this.maxSpeed) {
      vec[0] = (vec[0] / length) * this.maxSpeed;
      vec[1] = (vec[1] / length) * this.maxSpeed;
    }
    if (length < this.minSpeed) {
      vec[0] = (vec[0] / length) * this.minSpeed;
      vec[1] = (vec[1] / length) * this.minSpeed;
    }
  }
  limit(vec) {
    const length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    if (length > this.maxForce) {
      vec[0] = (vec[0] / length) * this.maxForce;
      vec[1] = (vec[1] / length) * this.maxForce;
    }
  }

  checkEdge() {
    if (this.position[0] > canvas.width) this.position[0] = 0;
    else if (this.position[0] < 0) this.position[0] = canvas.width;

    if (this.position[1] > canvas.height) this.position[1] = 0;
    else if (this.position[1] < 0) this.position[1] = canvas.height;
  }
  update() {
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];

    this.velocity[0] += this.acceleration[0];
    this.velocity[1] += this.acceleration[1];

    ctx.beginPath();
    ctx.arc(this.position[0], this.position[1], 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) {
  const flock = new Flocks();
  flocks.push(flock);
}

(function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flocks.length > 0 &&
    flocks.forEach((flock) => {
      flock.checkEdge();
      flock.flock(flocks);
      flock.update();
    });
})();

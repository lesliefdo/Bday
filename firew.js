const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.radius = 3;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.sparks = [];
    }

    explode() {
        for (let i = 0; i < 40; i++) {
            this.sparks.push(new Spark(this.x, this.y, this.color));
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        if (this.y > this.targetY) {
            this.y -= 5;
        } else {
            this.explode();
            this.alpha -= 0.02;
        }
    }
}

class Spark {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.gravity = 0.05;
        this.alpha = 1;
        this.color = color;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= 0.02;
    }
}

const fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.update();
        firework.draw();

        for (let j = firework.sparks.length - 1; j >= 0; j--) {
            const spark = firework.sparks[j];
            spark.update();
            spark.draw();

            if (spark.alpha <= 0) {
                firework.sparks.splice(j, 1);
            }
        }

        if (firework.alpha <= 0 && firework.sparks.length === 0) {
            fireworks.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();

import { type, wait } from './typical.js';

const elem = document.getElementById('app');
const appBackground = document.querySelector('.appBackground');
const appBackgroundDefault = document.querySelector('.appBackground-default')
const introComponent = document.querySelector('.introComponent')
const gif = document.querySelector('.gif')
const introText = document.querySelector('.intro-text');
const loadingComponent = document.querySelector('.loadingComponent');
const content = document.querySelector('.content')
const text = document.querySelector('.text')
const textAnimate = () => text.style.animation = 'Textpulse 2.5s infinite';
const img = new Image();
img.src = "./images/flake.png";
const music = new Audio("./ChristmasSongsLofi1.mp3");
music.volume = 1;
function fullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function one(el, type, callback) {
    function handler(event) {
        el.removeEventListener(type, handler);
        callback(event);
    }
    el.addEventListener(type, handler);
}

const mesg6 = "Merry Christmas 💖💖💖"

function main() {
    // fullScreen()
    introComponent.style.display = 'none'
    appBackgroundDefault.style.opacity = 0
    loadingComponent.style.display = 'flex'
    loadingComponent.classList.add('hide')
    loadingComponent.onanimationend = async function () {
        loadingComponent.style.display = 'none';
        appBackground.style.opacity = 1;
        content.style.display = 'block';
        canvas.addEventListener("mousemove", function (e) {
            mX = e.clientX
            mY = e.clientY
        });
        await type(text, 120, "We Need Some Music Right??", 140 , "But I'll Choose this Year!! 💖");
        await wait(0).then(() => music.play());
        await type(text, 140, "Also Without Snow It's No Fun" , 140 , ".... So Here You go...");
        await wait(500).then(() => RenderSnows());
        await type(text, 200, "Now You are having fun in snow and I havn't even seen it yet.😕😏");
        await type(text, 180, "I wish i could be with you to celebrate Christmas.😕😕");
        await type(text, 140, "But I'll Wait for that Christmas Too 💖❤️");
        await type(text, 140, "This Time I am sending you wishes.😍 and ", 160, "I Promise! I'll bring gifts and cards and Christmas Tree next Year😍")
        await type(text, 130, "Mini Santa's and Brownies Too.😋💖")
        await type(text, 180, "This Year I'm sending you warm bear hugs🫂, loving kisses😘😘 and" , 160, "and earnest wishes❤️💖 for the wonderful occasion of Christmas❄️☃️");
        await type(text, 240, "May you have a splendid Christmas filled with lights, songs and cheer.❤️💖");
        await type(text, 150, "Lots of Love From Your Santa 💖💖💖")
        await type(text, mesg6);
        await wait(250).then(() => textAnimate())
        
        
    }
}
window.onload = () => {
    wait(250).then(() => {
        type(introText, 118, 'Hey Tript 💖', 200, 'Abhishek Will be Your Secret Santa This Year💖', 200 ,'Hope You Enjoy This Gift... 💖') 
        .then(() => {
            one(gif, 'click', () => { main() })
            gif.style.cssText = "width: 48px;cursor: pointer"
            navigator.vibrate(1888)
        })
    }) 
}


let flakes = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 99,
    mX = -100,
    mY = -100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function RenderSnows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flakeCount; i++) {
        let flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 99,
            x2 = flake.x,
            y2 = flake.y;

        let dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y))

        if (dist < minDist) {
            let force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;

        } else {
            flake.velX *= .98;
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
        }
        flake.y += flake.velY;
        flake.x += flake.velX;
        // nếu bông tuyết ra khỏi màn hình thì đưa chúng trở về nơi bắt đầu !.
        if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
        }
        if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
        }
        ctx.drawImage(img, flake.x, flake.y, flake.size, flake.size);
    }
    requestAnimationFrame(RenderSnows);
};

function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 10) + 3;
    flake.speed = Math.random() + 0.8;
    flake.velY = flake.speed;
    flake.velX = 0;
}

function init() {
    for (let i = 0; i < flakeCount; i++) {
        let speed = Math.random() + 0.8
        flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height / 1.5),
            size: (Math.random() * 10) + 3,
            stepSize: (Math.random()) / 50,
            step: 0,
        });
    }

};


window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
init();

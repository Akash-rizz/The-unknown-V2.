// THE UNKNOWN // MULTIVERSE
// Shared JavaScript for every page.

const $ = (s) => document.querySelector(s);

// ---------- clock ----------
const clock = $("#clock");

function tick(){
  if(clock) {
    clock.textContent = new Date().toLocaleTimeString([], {
      hour12:false
    });
  }
}

tick();
setInterval(tick,1000);


// ---------- mobile navigation ----------
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
  nav.classList.toggle("open");
});


// ---------- page transitions ----------
document.querySelectorAll("a.page-link").forEach(link => {

  link.addEventListener("click", (e) => {

    const href = link.getAttribute("href");

    if(!href || href.startsWith("#")) return;

    e.preventDefault();

    const transition = $("#transition");

    if(transition){

      transition.style.animation = "none";
      transition.style.transform = "translateY(0)";

      requestAnimationFrame(() => {

        transition.style.transition =
          "transform .55s cubic-bezier(.77,0,.18,1)";

        transition.style.transform =
          "translateY(-100%)";

      });

      setTimeout(() => {
        location.href = href;
      },430);

    } else {

      location.href = href;

    }

  });

});


// ---------- interactive starfield ----------
const canvas = $("#stars");

if(canvas){

  const ctx = canvas.getContext("2d");

  let w = 0;
  let h = 0;
  let dots = [];

  const count =
    Math.min(150, Math.floor(innerWidth / 5));


  function resize(){

    w = canvas.width =
      innerWidth * devicePixelRatio;

    h = canvas.height =
      innerHeight * devicePixelRatio;

    canvas.style.width =
      innerWidth + "px";

    canvas.style.height =
      innerHeight + "px";

    ctx.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );

  }

  resize();

  addEventListener("resize",resize);


  for(let i = 0; i < count; i++){

    dots.push({

      x: Math.random() * innerWidth,

      y: Math.random() * innerHeight,

      r: Math.random() * 1.4 + .2,

      a: Math.random() * .65 + .15,

      s: Math.random() * .18 + .03

    });

  }


  let px = 0;
  let py = 0;


  addEventListener("pointermove",(e)=>{

    px =
      (e.clientX / innerWidth - .5) * 8;

    py =
      (e.clientY / innerHeight - .5) * 5;

  });


  function draw(){

    ctx.clearRect(
      0,
      0,
      innerWidth,
      innerHeight
    );


    for(const d of dots){

      d.y += d.s;

      if(d.y > innerHeight + 5){
        d.y = -5;
      }


      const x =
        d.x + px * (d.y / innerHeight);

      const y =
        d.y + py * (d.x / innerWidth);


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        d.r,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(190,215,255,${d.a})`;

      ctx.fill();

    }


    requestAnimationFrame(draw);

  }

  draw();

}


// ---------- experiment lab ----------
const gravity = $("#gravity");
const dial = $("#gravityDial");
const status = $("#labStatus");
const orbit = $("#orbitDot");


gravity?.addEventListener("input",()=>{

  const value =
    Number(gravity.value);


  if(dial){

    dial.textContent =
      value.toFixed(1) + "×";

  }


  if(status){

    status.textContent =
      value < .8
        ? "LOW"
        : value > 1.7
        ? "HIGH"
        : "STABLE";

  }


  if(orbit){

    orbit.style.animationDuration =
      Math.max(.7,4 / value) + "s";

  }

});

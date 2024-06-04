document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("#main").style.visibility = "hidden";
    document.querySelector("#mloader").style.visibility = "visible";
  } else {
    document.querySelector("#mloader").style.display = "none";
    document.querySelector("#main").style.visibility = "visible";
  }
};

function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

init();

document.addEventListener("mousemove", function (dets) {
  document.querySelector(
    "#cursor"
  ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)`;
});

var bigcircle = document.querySelectorAll(".bigcircle");
var cursor = document.querySelector("#cursor");
var cursimg = document.querySelector("#cursor img");

bigcircle.forEach(function (e) {
  e.addEventListener("mouseenter", function () {
    cursor.style.backgroundColor = "black";
    cursimg.style.display = "block";

    cursor.style.width = "4vw";
    cursor.style.height = "4vw";
    cursor.style.left = "-2vw";
    cursor.style.top = "-2vw";
  });

  e.addEventListener("mouseleave", function () {
    cursor.style.backgroundColor = "#9ac0ca";
    cursimg.style.display = "none";

    cursor.style.width = "1vw";

    cursor.style.height = "1vw";
    cursor.style.left = "-.5vw";
    cursor.style.top = "-.5vw";
  });
});

var tl = gsap.timeline();
tl.to("#loader .lob ", {
  display: "block",
  stagger: 0.3,
})
  .to("#loader", {
    y: "-100%",
    // delay:1,
    durataion: 2,
  })

  .from(
    "#page1 #span1",
    {
      y: "50%",
      duration: 2,
    },
    "-=1"
  )
  .from(
    "#page1 #span2",
    {
      y: "60%",
      duration: 2,
    },
    "-=1.7"
  )
  .from(
    "#page1 h2",
    {
      y: 30,
      opacity: 0,
    },
    "-=1"
  );

gsap.from("#page2 #vid", {
  width: "30vw",
  height: "20vh",
  scrollTrigger: {
    trigger: "#vid",
    scroller: "#main",
    start: "top 100%",
    end: "top 20%",
    scrub: true,
    // pin:true,
  },
});
gsap.from("#page3 .line h1", {
  y: 200,
  delay: 0.2,

  scrollTrigger: {
    trigger: "#page3 .line h1",
    scroller: "#main",
    // scrub:true,
    // markers:true,
    start: "top 90%",
    end: "top 60%",
    durataion: 2,
  },
});
gsap.from("#page3 .line span", {
  y: 200,
  scrollTrigger: {
    trigger: "#page3 .line span",
    scroller: "#main",
    // scrub:true,
    // markers:true,
    start: "top 90%",
    end: "top 60%",
    durataion: 2,
  },
});

gsap.to("#page5 h1", {
  x: "-100%",
  // delay:2,
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    end: "top -200%",
    scrub: true,
    // markers:true,
    pin: true,
  },
});

gsap.from("#page7 h1", {
  y: 70,
  scrollTrigger: {
    trigger: " #page7 h1",
    scroller: "#main",
    start: "top 80%",
    end: "top 50%",
    scrub: true,
  },
});

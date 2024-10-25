window.addEventListener("DOMContentLoaded", function() {
    let docWidth = document.body.clientWidth;
    const wrap = document.querySelector("#wrap");

    const images = document.querySelectorAll("#wrap .block");
    let slidesWidth = wrap.clientWidth;
    let currentOffset = 0;
    let targetOffset = 0;
    let isAnimating = false;

    window.addEventListener("resize", function(){
        docWidth = document.body.clientWidth;
        slidesWidth = wrap.clientWidth;
    });

    document.addEventListener("mousemove", function(e){
        let mouseX = e.pageX;
        targetOffset = -1 * ((mouseX / docWidth) * slidesWidth - mouseX / 2);

        if(!isAnimating){
            requestAnimationFrame(updateOffset);
        }
    });

    function updateOffset(){
        isAnimating = true;
        currentOffset = lerp(currentOffset, targetOffset, 0.075);
        if(Math.abs(currentOffset - targetOffset) < 0.5){
            currentOffset = targetOffset;
            isAnimating = false;
        }

        for(let i = 0; i < images.length; i++){
            images[i].style.webkitTransform = "translate3d(" + currentOffset + "px, 0, 0)";
            images[i].style.transform = "translate3d(" + currentOffset + "px, 0, 0)";
        }

        if(isAnimating){
            requestAnimationFrame(updateOffset);
        }
    }

    function lerp(a, b, t){
        return (1 - t) * a + t * b; 
    }
});

const tl = gsap.timeline({ paused: true });
let path = document.querySelector(".path");

function showCards(){
    revealCards();

    const showBtn = document.getElementById("toggleOverlay");
    showBtn.onclick = function(e){
        tl.reversed(!tl.reversed());
    };

    const closeBtn = document.getElementById("closeBtn");
    closeBtn.onclick = function(e){
        tl.reversed(!tl.reversed());
    };
}

showCards();

function revealCards(){
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 Z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 Z";

    tl.to(".features", 0.1, {
        opacity: 1,
        ease: "power2.inOut"
    });

    tl.to(path, 0.8, { attr: { d: start }, ease: Power3.easeIn })
      .to(path, 0.4, { attr: { d: end }, ease: Power3.easeOut });

    tl.from(".block", 1, {
        clipPath: "inset(0 100% 0 0)",
        ease: Power4.easeOut,
        stagger: {
            amount: 0.25
        }
    });

    tl.from(".product img", 1, {
        scale: 3,
        ease: Power4.easeOut, 
        stagger: {
            amount: 0.25
        }
    }, "-=1.5");

    tl.from("#closeBtn", 1, {
        opacity: 0,
        right: "-25%",
        ease: "power2.inOut"
    }, "-=1").reverse();
}


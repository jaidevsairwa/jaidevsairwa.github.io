// import '../styles/modern-normalize.css'
import '../styles/style.css'
import '../styles/skillstyle.css'
import '../styles/projectstyle.css'
import '../styles/contactstyle.css'

// ------------- cursor -------------- 
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
});

requestAnimationFrame(function loop() {
    const easting = 8;
    cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
    cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

    cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
    requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
    item.addEventListener("mouseover", (e) => {
        // if (item.dataset.cursor === "pointer") {
        //     cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .6)";
        //     cursorBorder.style.setProperty("--size", "30px");
        // }
        if (item.dataset.cursor === "pointer") {
            cursorBorder.style.backgroundColor = "white";
            cursorBorder.style.mixBlendMode = "difference";
            cursorBorder.style.setProperty("--size", "80px");
        }
    });
    item.addEventListener("mouseout", (e) => {
        cursorBorder.style.backgroundColor = "unset";
        cursorBorder.style.mixBlendMode = "unset";
        cursorBorder.style.setProperty("--size", "50px");
    });
});

// --------------------nav-bar-------------
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navBar = document.getElementsByClassName('nav-side')[0]
const head = document.getElementById('header')
toggleButton.addEventListener('click',()=>{
    head.classList.toggle('active')
    navBar.classList.toggle('active')
})
// ------------------hacker----------------
async function backtoname() {
    const hack = document.querySelector("h5")
    await sleep(1000)
    hack.innerText = "Jay Sairwa"
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h5").onmouseover = event => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return event.target.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if (iteration >= event.target.dataset.value.length) {
            clearInterval(interval);
            backtoname();
        }

        iteration += 1 / 3;
    }, 35);
}

// -------------Namaste_...-------
async function init() {
    const node = document.querySelector("#type-text")

    await sleep(1000)
    node.innerText = '|'

    while (true) {
        await node.type('नमस्ते')
        await sleep(2000)
        await node.delete('नमस्ते')
        await node.type('Namaste')
        await sleep(2000)
        await node.delete('Namaste')
    }
}


const sleep = time => new Promise(resolve => setTimeout(resolve, time))

class TypeAsync extends HTMLSpanElement {
    get typeInterval() {
        const randomMs = 100 * Math.random()
        return randomMs < 50 ? 10 : randomMs
    }

    async type(text) {
        for (let character of text) {
            this.innerText += character
            await sleep(this.typeInterval)
        }
    }

    async delete(text) {
        for (let character of text) {
            this.innerText = this.innerText.slice(0, this.innerText.length - 1)
            await sleep(this.typeInterval)
        }
    }
}

customElements.define('type-async', TypeAsync, { extends: 'span' })


init()


document.getElementById("cards").onmousemove = e => {
    for (const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };
}
//-------------------------card-scroll-------------------------

// const observer = new IntersectionObserver((entries)=>{
//     entries.forEach((entry) =>{
//         if (entry.isIntersecting){
//             entry.target.classList.add('card-border');
//         }
//         else{
//             entry.target.classList.remove('card-border');
//         }
//     });
// });

// const hiddenElements = document.querySelectorAll('.container');
// hiddenElements.forEach((el) => observer.observe(el));

$(function () {

    let cards = gsap.utils.toArray(".stackCard");

    let stickDistance = 0;

    let firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: "center center"
    });

    let lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center"
    });

    cards.forEach((card, index) => {

        var scale = 1 - (cards.length - index) * 0.025;
        let scaleDown = gsap.to(card, { scale: scale, 'transform-origin': '"50% ' + (lastCardST.start + stickDistance) + '"' });

        ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: () => lastCardST.start + stickDistance,
            pin: true,
            markers: false,
            pinSpacing: false,
            ease: "none",
            animation: scaleDown,
            toggleActions: "restart none none reverse"
        });
    });

});



// ---------------------project images slider -----------------


var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 100,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
      autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
    }
});
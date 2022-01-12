"use strict"
export { hamburgerNav }

// hamburger menu opener 
function hamburgerNav() {
    console.log("jaa");
    let cbOpen = document.querySelector('#mobileicon');
    if (cbOpen.checked == false)//ha zarva van
    {
        document.querySelector("header").classList.remove("nav-open");
        document.querySelector(".ham-menu-line").classList.remove("line-rot");
        document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");
        // document.querySelector(".ham-cont").style.left = "20px";
    }

    else {
        document.querySelector("header").classList.add("nav-open");
        document.querySelector(".ham-menu-line").classList.add("line-rot");
        document.querySelector(".ham-menu-linea").classList.add("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.add("lineb-rot");
        // document.querySelector(".ham-cont").style.left = "240px";
    }
}
document.querySelector('.ham-cont').addEventListener('click', hamburgerNav)
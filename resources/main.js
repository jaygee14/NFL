const hamburger = document.getElementsByClassName('hamburger')[0];
const smallNav = document.getElementsByClassName('hamburger_nav')[0];
const header = document.querySelector('header');

let windowWidth = window.innerWidth;



// hamburger.onmouseover = function showNav() {
//     smallNav.style.display = 'flex'
// };

// hamburger.onmouseout = function hideNav() {
//     smallNav.style.display = 'none'
// }

hamburger.onmouseover = function showNav() {
    smallNav.style.display = 'flex'
}


header.onmouseover = function changeColor() {
    smallNav.style.display = 'none';
}
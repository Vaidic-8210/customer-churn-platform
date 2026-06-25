/* =====================================================
   common.js
===================================================== */

/* -------------------------
   SVG Icons
-------------------------- */

const ICONS = {

logo: `
<svg width="18" height="18" viewBox="0 0 24 24"
fill="none" stroke="currentColor" stroke-width="2">
<path d="M3 3v18h18"/>
<path d="M5 15l5-5 4 4 5-7"/>
</svg>
`,

menu: `
<svg width="20" height="20"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<line x1="3" y1="6" x2="21" y2="6"/>
<line x1="3" y1="12" x2="21" y2="12"/>
<line x1="3" y1="18" x2="21" y2="18"/>
</svg>
`,

bell: `
<svg width="18" height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
<path d="M10 21a2 2 0 0 0 4 0"/>
</svg>
`,

chart: `
<svg width="18" height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<rect x="5" y="10" width="3" height="8"/>
<rect x="11" y="6" width="3" height="12"/>
<rect x="17" y="3" width="3" height="15"/>
</svg>
`,

alert: `
<svg width="18" height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
<line x1="12" y1="9" x2="12" y2="13"/>
<line x1="12" y1="17" x2="12.01" y2="17"/>
</svg>
`,

shield: `
<svg width="18" height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
</svg>
`,

gauge: `
<svg width="18" height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="2">
<path d="M12 14l4-4"/>
<path d="M3.34 19a10 10 0 1 1 17.32 0"/>
</svg>
`

};


/* -------------------------
   Navigation
-------------------------- */

const NAV_LINKS = [

{
label:"Dashboard",
href:"index.html",
key:"dashboard"
},

{
label:"New Prediction",
href:"new-prediction.html",
key:"new"
},

{
label:"History",
href:"history.html",
key:"history"
},

{
label:"Analytics",
href:"analytics.html",
key:"analytics"
}

];


/* -------------------------
   Navbar
-------------------------- */

function buildNavbar(active=""){

const nav=document.getElementById("navbar");

if(!nav)return;

nav.innerHTML=`

<nav class="navbar">

<a href="index.html"
class="navbar__brand">

<span class="brand-mark">

${ICONS.logo}

</span>

Customer Churn

</a>


<button
class="icon-btn nav-toggle"
onclick="toggleMobileMenu()">

${ICONS.menu}

</button>


<div class="navbar__menu">

${NAV_LINKS.map(link=>`

<a
href="${link.href}"

class="navbar__link
${active===link.key?"active":""}">

${link.label}

</a>

`).join("")}

</div>


<div class="navbar__right">

<button class="icon-btn">

${ICONS.bell}

</button>

<div class="avatar">

AI

</div>

</div>

</nav>

`;

}


/* -------------------------
   Mobile Menu
-------------------------- */

function toggleMobileMenu(){

const menu=
document.querySelector(
".navbar__menu"
);

if(menu){

menu.classList.toggle(
"open"
);

}

}


/* -------------------------
   INITIALS FIX
-------------------------- */

function initials(name){

if(!name)
return "NA";

return name
.trim()
.split(" ")
.map(word=>word[0])
.slice(0,2)
.join("")
.toUpperCase();

}


/* -------------------------
   Badge
-------------------------- */

function categoryClass(type){

if(type==="High Risk")
return "badge--high";

if(type==="Medium Risk")
return "badge--medium";

return "badge--low";

}


/* -------------------------
   Score
-------------------------- */

function scoreColor(score){

score=Number(score);

if(score>=70)
return "#ef4444";

if(score>=40)
return "#f59e0b";

return "#22c55e";

}


function scoreBar(score){

score=Number(score);

return `

<div style="display:flex;align-items:center;gap:8px">

<div
style="
width:100px;
height:8px;
background:#e2e8f0;
border-radius:10px;
overflow:hidden">

<div
style="
height:100%;
width:${score}%;
background:${scoreColor(score)};
">

</div>

</div>

<span>

${score}%

</span>

</div>

`;

}


/* -------------------------
   Date
-------------------------- */

function formatDate(date){

if(!date)
return "-";

return new Date(date)
.toLocaleDateString(
"en-IN",
{
day:"2-digit",
month:"short",
year:"numeric"
}
);

}


/* -------------------------
   Storage
-------------------------- */

function getSavedPrediction(){

try{

return JSON.parse(
localStorage.getItem(
"savedPrediction"
)
);

}

catch{

return null;

}

}


function savePrediction(data){

localStorage.setItem(

"savedPrediction",

JSON.stringify(data)

);

}


function getResult(){

try{

return JSON.parse(

sessionStorage.getItem(
"churnResult"
)

);

}

catch{

return null;

}

}


/* -------------------------
   Init
-------------------------- */

document.addEventListener(

"DOMContentLoaded",

()=>{

console.log(
"Frontend Ready"
);

}

);
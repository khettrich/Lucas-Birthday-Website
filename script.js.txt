const API="https://script.google.com/macros/s/AKfycbxXOKNGR54nKh5HABzLVs5nTNgsR5-CLWsdPYudsK0w4z4xXL98SOMgquZsp3qaNSfJ/exec"

const partyDate=new Date("July 12 2026 14:00")

function updateCountdown(){

const now=new Date()

const diff=partyDate-now

const days=Math.floor(diff/(1000*60*60*24))

const hours=Math.floor((diff/(1000*60*60))%24)

document.getElementById("countdown").innerHTML=
`🧁 ${days} days ${hours} hours until cake!`

}

setInterval(updateCountdown,1000)



/* create cave crystals */

for(let i=0;i<25;i++){

const c=document.createElement("div")

c.className="caveCrystal"

c.style.left=Math.random()*100+"%"

c.style.top=Math.random()*100+"%"

document.body.appendChild(c)

}



/* floating crystals */

function spawnCrystal(){

const crystal=document.createElement("div")

crystal.className="crystal"

crystal.style.left=Math.random()*100+"%"

crystal.style.animationDuration=6+Math.random()*6+"s"

crystal.style.background=
"hsl("+Math.random()*360+",80%,70%)"

document.getElementById("crystalBackground").appendChild(crystal)

crystal.onclick=()=>{

popSound()

crystal.remove()

}

setTimeout(()=>crystal.remove(),12000)

}

setInterval(spawnCrystal,800)



function popSound(){

const audio=new Audio(
"https://actions.google.com/sounds/v1/cartoon/pop.ogg"
)

audio.play()

}



/* RSVP */

document.getElementById("rsvpForm").addEventListener("submit",async(e)=>{

e.preventDefault()

const data={

parent:parent.value,
child:child.value,
kids:kids.value,
adults:adults.value,
diet:diet.value,
message:message.value

}

await fetch(API+"?action=rsvp",{

method:"POST",

body:JSON.stringify(data)

})

launchConfetti()

loadCounts()

})



async function loadCounts(){

const res=await fetch(API+"?action=counts")

const data=await res.json()

kidsCount.innerText=data.kids

adultsCount.innerText=data.adults

}

loadCounts()



function launchConfetti(){

for(let i=0;i<80;i++){

const gem=document.createElement("div")

gem.style.position="absolute"

gem.style.left="50%"

gem.style.top="40%"

gem.style.width="12px"

gem.style.height="12px"

gem.style.background=
"hsl("+Math.random()*360+",80%,60%)"

gem.style.transform="rotate(45deg)"

gem.style.transition="1.5s"

document.body.appendChild(gem)

setTimeout(()=>{

gem.style.left=(50+Math.random()*40-20)+"%"

gem.style.top=(40+Math.random()*40)+"%"

gem.style.opacity=0

},10)

setTimeout(()=>gem.remove(),1500)

}

}



function openMap(){

window.open("https://maps.google.com?q=123+Adventure+Lane")

}



/* photo upload */

async function uploadPhoto(){

const file=document.getElementById("photoUpload").files[0]

const reader=new FileReader()

reader.onload=async function(){

await fetch(API+"?action=upload",{

method:"POST",

body:reader.result

})

alert("Photo uploaded!")

}

reader.readAsDataURL(file)

}
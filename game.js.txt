let score=0

function startGame(){

score=0

document.getElementById("score").innerText=score

setInterval(spawnGameCrystal,800)

}

function spawnGameCrystal(){

const crystal=document.createElement("div")

crystal.className="gameCrystal"

crystal.style.left=Math.random()*90+"%"

document.getElementById("gameArea").appendChild(crystal)

crystal.onclick=()=>{

score++

document.getElementById("score").innerText=score

crystal.remove()

}

setTimeout(()=>crystal.remove(),4000)

}
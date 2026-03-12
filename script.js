// Config
const API = "https://script.google.com/macros/s/AKfycbxXOKNGR54nKh5HABzLVs5nTNgsR5-CLWsdPYudsK0w4z4xXL98SOMgquZsp3qaNSfJ/exec";
const BALLOON_IMAGES = ["balloon-red.png","balloon-yellow.png"];
const BALLOON_CONTAINER = document.getElementById("balloons-container");

// Countdown
const COUNTDOWN_DATE = new Date("April 18, 2026 14:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = COUNTDOWN_DATE - now;
  if(diff < 0) {
    document.getElementById("countdown").innerText = "Party is happening now!";
    return;
  }
  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds = Math.floor((diff%(1000*60))/1000);
  document.getElementById("countdown").innerText = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown,1000);
updateCountdown();

// Floating Balloons
function createBalloon(){
  const balloon = document.createElement("img");
  balloon.src = BALLOON_IMAGES[Math.floor(Math.random()*BALLOON_IMAGES.length)];
  balloon.className = "floating-balloon";
  balloon.style.left = Math.random()*90 + "vw";
  balloon.style.animationDuration = 5 + Math.random()*5 + "s";
  BALLOON_CONTAINER.appendChild(balloon);
  setTimeout(()=>BALLOON_CONTAINER.removeChild(balloon),10000);
}
setInterval(createBalloon,500);

// RSVP Form
document.getElementById("rsvp-form").addEventListener("submit", function(e){
  e.preventDefault();
  const data = {
    parent: document.getElementById("parent").value,
    child: document.getElementById("child").value,
    kids: document.getElementById("kids").value,
    adults: document.getElementById("adults").value,
    diet: document.getElementById("diet").value,
    message: document.getElementById("message").value
  };
  fetch(API+"?action=rsvp",{
    method:"POST",
    body: JSON.stringify(data)
  }).then(res=>{
    // Show confirmation
    const conf = document.getElementById("confirmation");
    conf.innerText = "Thanks! Your RSVP has been received 🎉";
    conf.style.display = "block";
    setTimeout(()=>conf.style.display="none",5000);
    // Clear form
    document.getElementById("rsvp-form").reset();
    updateRSVPCounter();
    // Burst balloons
    for(let i=0;i<10;i++){ createBalloon(); }
  });
});

// Live RSVPs
function updateRSVPCounter(){
  fetch(API+"?action=counts")
    .then(res=>res.json())
    .then(data=>{
      document.getElementById("kids-count").innerText = data.kids;
      document.getElementById("adults-count").innerText = data.adults;
    });
}
setInterval(updateRSVPCounter,5000);
updateRSVPCounter();

// Photo Upload
document.getElementById("upload-button").addEventListener("click", function(){
  const file = document.getElementById("photo-file").files[0];
  if(!file) return alert("Select a file first!");
  const reader = new FileReader();
  reader.onload = function(e){
    fetch(API+"?action=upload",{
      method:"POST",
      body: e.target.result
    }).then(res=>res.text()).then(txt=>{
      alert("Photo uploaded!");
      const img = document.createElement("img");
      img.src = e.target.result;
      document.getElementById("photo-gallery").appendChild(img);
    });
  };
  reader.readAsDataURL(file);
});
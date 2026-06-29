
var images = [
    "images/image1.jpeg",
    "images/image2.jpeg",
    "images/image3.jpeg",
    "images/image4.jpeg",
    "images/image5.jpeg",
    "images/image6.jpeg",
    "images/image7.jpeg",
    "images/image8.jpeg"
];

var firstCard = null
var secondCard = null
var canFlip = true
var matches = 0
var moves = 0
var seconds = 0
var timeRunning = false
var timeInterval;

function startGame(){
    var gameboard = document.getElementById("gameboard")
    gameboard.innerHTML = ""

    var cardImages = images.concat(images);

    cardImages.sort(function (){
        return Math.random() - 0.5
    })

    for(let i=0; i<cardImages.length; i++){
        var card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `<div class="card-front">❤️</div>
                          <div class="card-back"><img src="${cardImages[i]}" alt=""></div>`
        card.onclick = flipcard
        card.dataset.image = cardImages[i]
        gameboard.appendChild(card)
    }

    var firstCard = null
    var secondCard = null
    var canFlip = true
    var matches = 0
    var moves = 0
    var seconds = 0
    var timeRunning = false


    UpdateStats()

    clearInterval(timeInterval)

}
function flipcard(){
    if(!canFlip) return

    if(this.classList.contains("flipped")) return
    if(this.classList.contains("matched")) return

    if(!timeRunning){
        startTimer()
    }
    this.classList.add("flipped")

    if(firstCard == null){
        firstCard = this
    }
    else{
        secondCard = this
        canFlip = false
        moves++
        UpdateStats()
        checkMatch()
    }
}
function checkMatch(){
    var match = firstCard.dataset.image == secondCard.dataset.image

    if(match == true){
        setTimeout( ()=>{
            firstCard.classList.add("matched")
            secondCard.classList.add("matched")
            matches++
            UpdateStats()
            resetCards()

            if(matches == images.length){
                endgame()
            }

        },500)
    }
    else{
        setTimeout(()=>{
            firstCard.classList.remove("flipped")
            secondCard.classList.remove("flipped")
            resetCards()
        },1000)
    }
}

function resetCards(){
    firstCard = null
    secondCard = null
    canFlip = true
}
function startTimer(){
    timeRunning = true
    timeInterval = setInterval(() => {
        seconds++
        UpdateStats() 
    }, 1000);

}
function UpdateStats(){
    document.getElementById("moves").textContent = moves
    document.getElementById("matches").textContent = matches + `/${images.length}`;

    var min = Math.floor(seconds/60)
    var sec = seconds%60
    if(sec<10) sec = "0"+sec
    document.getElementById("timer").textContent = min + ":" + sec
}

function endgame(){
    clearInterval(timeInterval)
    document.getElementById("finalMoves").textContent = moves
    document.getElementById("finalTime").textContent = document.getElementById("timer").textContent
    document.getElementById("winmodal").classList.add("show")

}
function newGame(){
    document.getElementById("winmodal").classList.remove("show")
    moves = 0
    seconds = 0
    matches = 0
    timeRunning = false
    clearInterval(timeInterval)
    startGame()

}
startGame()


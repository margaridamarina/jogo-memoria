const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
  { name: "activism", image: "img/activism.png" },
  { name: "auction", image: "img/auction.png" },
  { name: "bicycle", image: "img/bicycle.png" },
  { name: "books", image: "img/books.png" },
  { name: "cart", image: "img/cart.png" },
  { name: "circular-economy", image: "img/circular-economy.png" },
  { name: "cow", image: "img/cow.png" },
  { name: "fruit", image: "img/fruit.png" },
  { name: "gas-station", image: "img/gas-station.png" },
  { name: "green-chemistry", image: "img/green-chemistry.png" },
  { name: "green-economy", image: "img/green-economy.png" },
  { name: "pizza", image: "img/pizza.png" },
  { name: "plant", image: "img/plant.png" },
  { name: "recycle", image: "img/recycle.png" },
  { name: "rules", image: "img/rules.png" },
  { name: "sewing-machine", image: "img/sewing-machine.png" },
  { name: "solar-house", image: "img/solar-house.png" },
  { name: "sustainable", image: "img/sustainable.png" },
];

let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Tempo: </span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Movimentos: </span>${movesCount}`;
};

const generateRandom = (size = 6) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 6) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  const matchedImages = {
    "activism": "img/13.png",
    "auction": "img/8.png",
    "bicycle": "img/10.png",
    "books": "img/17.png",
    "cart": "img/4.png",
    "circular-economy": "img/18.png",
    "cow": "img/2.png",
    "fruit": "img/7.png",
    "gas-station": "img/1.png",
    "green-chemistry": "img/15.png",
    "green-economy": "img/16.png",
    "pizza": "img/3.png",
    "plant": "img/11.png",
    "recycle": "img/9.png",
    "rules": "img/14.png",
    "sewing-machine": "img/5.png",
    "solar-house": "img/6.png",
    "sustainable": "img/12.png",
  };

  const removeExistingImage = () => {
    const existingImage = document.getElementById('image-wrapper');
    if (existingImage) {
        existingImage.remove();
    }
  };
  
  const addImageForMatch = (cardValue) => {
    removeExistingImage();
    const newImage = document.createElement("img");
    newImage.src = matchedImages[cardValue];
    newImage.classList.add('image-wrapper'); 
    const container = document.querySelector('.container'); 
  
    const existingImage = document.getElementById('image-wrapper');
    if (existingImage) {
      existingImage.src = matchedImages[cardValue];
    } else {
      const newImage = document.createElement("img");
      newImage.src = matchedImages[cardValue]; 
      newImage.classList.add('image-wrapper'); 
      newImage.id = 'image-wrapper'; 
      const container = document.querySelector('.container'); 
      container.appendChild(newImage); 
    }
  };


  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            addImageForMatch(firstCardValue);
            if (winCount == Math.floor(cardValues.length / 2)) {
              addImageForMatch(firstCardValue);
              result.innerHTML = `<h2>Você venceu!</h2>
              <h4>Movimentos: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timeGenerator, 1000);
  moves.innerHTML = `<span>Movimentos: </span> ${movesCount}`;
  initializer();
});

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
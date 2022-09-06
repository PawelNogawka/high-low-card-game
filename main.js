const message = document.querySelector(".message");
const score = document.querySelector(".score");
const buttons = document.querySelectorAll("button");
const gameplay = document.querySelector(".gameplay");
let curCardValue = 0;
let scoreValue = 0;
let deck = [];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const suits = ["hearts", "diams", "clubs", "spades"];

buttons.forEach((btn) => {
  btn.addEventListener("click", playGame);
});

function playGame(e) {
  let btnWord = e.target.innerText;
  let myCard = getCard();

  if (btnWord == "Start") {
    scoreValue = 0;
    score.innerHTML = scoreValue;
    message.textContent = "Higher or Lower?";
    gameplay.innerHTML = "";
    makeCard(myCard);
    toggleButtons();
    return;
  }

  if (curCardValue == myCard.value) {
    message.textContent = "Draw!";
  } else {
    if (
      (btnWord === "Higher" && myCard.value > curCardValue) ||
      (btnWord === "Lower" && myCard.value < curCardValue)
    ) {
      message.textContent = "It's correct! Whta's next?";
      scoreValue++
      score.innerHTML = scoreValue
    } else {
      message.textContent = "Wrong! Game over!";
      toggleButtons();
    }
    makeCard(myCard);
  }
}

function toggleButtons() {
  buttons[0].classList.toggle("hideButton");
  buttons[1].classList.toggle("hideButton");
  buttons[2].classList.toggle("hideButton");
}

function makeCard(card) {
  let currCards = document.querySelectorAll(".card");

  let div = document.createElement("div");
  div.classList.add("card");

  div.style.left = currCards.length * 25 + "px";

  let html1 = card.rank + "<br>&" + card.suit + ";";
  let html2 = card.rank + "&" + card.suit + ";";

  curCardValue = card.value;

  let span1 = document.createElement("span");
  span1.innerHTML = html2;
  span1.classList.add("tiny");

  let span2 = document.createElement("span");
  span2.innerHTML = html1;
  span2.classList.add("big");

  if (card.suit == "diams" || card.suit == "hearts") {
    div.classList.add("red");
  }

  div.appendChild(span1);
  div.appendChild(span2);

  gameplay.appendChild(div);
}

function getCard() {
  if (deck.length == 0) {
    makeDeck();
    return getCard();
  } else {
    let ran = Math.floor(Math.random() * deck.length);
    let card = deck.splice(ran, 1)[0];
    return card;
  }
}

function makeDeck() {
  deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = {};
      card.suit = suits[i];
      card.rank = ranks[j];
      card.value = j + 1;
      deck.push(card);
    }
  }
}

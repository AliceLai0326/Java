const images = [
    "pngimg.com - minecraft_PNG1.png", "pngimg.com - minecraft_PNG2.png", 
    "pngimg.com - minecraft_PNG3.png", "pngimg.com - minecraft_PNG4.png",
    "pngimg.com - minecraft_PNG5.png", "pngimg.com - minecraft_PNG6.png",
    "pngimg.com - minecraft_PNG7.png", "pngimg.com - minecraft_PNG8.png"

];

const gameBoard = document.querySelector(".game-board");
const restartBtn = document.querySelector("#restartBtn");
let firstCard, secondCard, lockBoard;


// **初始化遊戲**
function startGame() {
    gameBoard.innerHTML = "";  // 清空遊戲區域
    let cardsArray = [...images, ...images]; // **確保每張圖片有兩張**
    cardsArray.sort(() => 0.5 - Math.random()); // **洗牌**

    // **創建卡片**
    cardsArray.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = `images/${image}`;
        card.appendChild(img);
        gameBoard.appendChild(card);

        // **點擊事件**
        card.addEventListener("click", () => {
            if (lockBoard || card === firstCard) return;
            
            card.classList.add("flipped");

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                if (firstCard.querySelector("img").src === secondCard.querySelector("img").src) {
                    firstCard.classList.add("matched");
                    secondCard.classList.add("matched");
                    resetBoard();
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("flipped");
                        secondCard.classList.remove("flipped");
                        resetBoard();
                    }, 1000);
                }
            }
        });
    });

    resetBoard(); // **確保變數歸零**
}

// **重置變數**
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// **重新開始按鈕**
restartBtn.addEventListener("click", startGame);

// **開始遊戲**
startGame();

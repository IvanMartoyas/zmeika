const holst = document.getElementById("holst"); // мой канвас (доске)
const ctx = holst.getContext("2d");// указываю что формат игры 2D
// console.log("ctx ",ctx)



const ground = new Image(); // Создание объекта
ground.src = "https://itproger.com/img/news/1562688808.png"; // Указываем нужное изображение

const foodImg = new Image(); // Создание объекта
foodImg.src = "https://itproger.com/img/news/1562688805.png"; // Указываем нужное изображение

let box = 32; // размер ячейки на доске
let score = 0;





let food = { // обьект еды содержит в себе кординаты её положения по x и y 
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];// это змея, в массиве каждая ячейка будет одной еденицей дленны змейки 
snake[0] = { // в начале игры змейка будет размером с одну клетку и находиться по центру экрана
	x: 9 * box,
	y: 10 * box
};


// обрабодчик событий нажатия кнопок начало
document.addEventListener("keydown", direction);

let dir; // направление куда будет двигаться змейка

function direction(event) {
	if(event.keyCode == 37 && dir != "right") 
	// чтобы я не мог нажать в право когда я уже держу клавешу чтобы
	// двигаться в лево по условию дописываю dir != "right"
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

// проверяет ест ли змейка саму себя
function eatTeal (head, arr) { 
	for ( let i = 0; i < arr.length; i++) {

		// если голова наехала на хвостъ то останавливаю цикл 
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

// обрабодчик событий нажатия кнопок конец


function drawGame () { // отрисовка
	ctx.drawImage(ground, 0, 0);// фон
	ctx.drawImage(foodImg, food.x, food.y );// еда

	// по сути кординаты задаются голове, а далее цикл дописывает каждому элементу массива (тела змеи) свои кординаты x и y 
    for( let i = 0; i< snake.length; i++ ) {// змея отрисовка
        ctx.fillStyle = i == 0 ? "green":"red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    // счёт в игре
    ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);


	let snakeX = snake[0].x;// хранит кординату змейки по Х
	let snakeY = snake[0].y;// хранит кординату змейки по У

	// поедание еды
	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food =  {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else {
		snake.pop();// удаляем змейку со старой позиции
	}


	// обрабодка выхода змейки за граници поля
	// box это одна клетка всего их 17
	if(snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
		clearInterval(game);
	}


	if(dir == "left" ) snakeX -= box;
	if(dir == "right" ) snakeX += box;
	if(dir == "up" ) snakeY -= box;
	if(dir == "down" ) snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	// первый параметр голова змеи, второй 
	eatTeal(newHead, snake)

	snake.unshift(newHead); // отрисовываем змейку в новой позиции

}

// рендр игры
let game = setInterval(drawGame, 150); // Вызов функции из вне
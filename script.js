// 1 = alive (dark), 0 = dead (white). This is the heart.
const pattern = [
	[0, 1, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[1, 0, 0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0, 1, 0],
	[0, 0, 1, 0, 1, 0, 0],
	[0, 0, 0, 1, 0, 0, 0],
];

const GENERATIONS = 31;
const NUMBER = 44;
const PASSCODE = 4;
const CARD_PASSWORD = "ravenasiachua";
const SECRET_WORD = "gratitude";

const LIB = {
	hex: "the longest comment in the source code. (dont include the <!-- and -->, just the text in between)",
	wall: 1,
	shelf: 3,
	volume: 21,
	page: 45,
};

function drawBoard(target) {
	for (const row of pattern) {
		for (const cell of row) {
			const div = document.createElement("div");
			div.className = cell ? "cell on" : "cell";
			target.appendChild(div);
		}
	}
}

drawBoard(document.getElementById("board"));
drawBoard(document.getElementById("coverArt"));
document.getElementById("genText").textContent = GENERATIONS;

const card = document.getElementById("card");
const stage = document.querySelector(".stage");
const inside = document.getElementById("inside");
const toggleBtn = document.getElementById("toggleBtn");
const secretTrigger = document.getElementById("secretTrigger");
const musicVideo = document.getElementById("musicVideo");
const hintNote = document.getElementById("hintNote");
let passwordGateOpened = false;

function setOpen(isOpen) {
	const puzzlesRevealed = stage.classList.contains("has-puzzles");
	card.classList.toggle("open", isOpen);
	stage.classList.toggle("is-open", isOpen);
	inside.inert = !isOpen;
	toggleBtn.textContent = isOpen ? "Close" : "Open";
	toggleBtn.setAttribute("aria-expanded", String(isOpen));
	musicVideo.classList.toggle("hidden", !isOpen || passwordGateOpened);
	hintNote.classList.toggle("hidden", !isOpen || passwordGateOpened);
	secretTrigger.classList.toggle("hidden", isOpen || passwordGateOpened);
}

toggleBtn.addEventListener("click", function () {
	setOpen(!card.classList.contains("open"));
});

secretTrigger.addEventListener("click", function () {
	passwordGateOpened = true;
	stage.classList.add("has-password-gate");
	document.getElementById("passwordGate").classList.remove("hidden");
	musicVideo.classList.add("hidden");
	setOpen(true);
	document.getElementById("passwordInput").focus();
});

function checkCardPassword() {
	const passwordInput = document.getElementById("passwordInput");
	const passwordMessage = document.getElementById("passwordMessage");

	if (passwordInput.value.trim() === CARD_PASSWORD) {
		stage.classList.add("has-puzzles");
		document.getElementById("passwordGate").classList.add("hidden");
		document.getElementById("puzzle").classList.remove("hidden");
		card.classList.add("wide");
		passwordMessage.textContent = "";
	} else {
		passwordMessage.textContent = "Incorrect password. Please try again.";
		passwordMessage.className = "msg bad";
		passwordInput.select();
	}
}

document.getElementById("passwordBtn").addEventListener("click", checkCardPassword);
document.getElementById("passwordInput").addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		checkCardPassword();
	}
});

document.getElementById("checkBtn").addEventListener("click", function () {
	const guess = Number(document.getElementById("answer").value);
	const msg = document.getElementById("msg1");

	if (guess === NUMBER) {
		msg.textContent = "Correct! Tell Player 2 your number.";
		msg.className = "msg ok";
		document.getElementById("p1").classList.add("hidden");
		document.getElementById("p2").classList.remove("hidden");
	} else {
		msg.textContent = "Not quite. try again.";
		msg.className = "msg bad";
	}
});

document.getElementById("mapBtn").addEventListener("click", function () {
	const typed = Number(document.getElementById("num2").value);
	const msg = document.getElementById("msg3");

	if (typed === PASSCODE) {
		msg.textContent = "Correct! The Library challenge is unlocked.";
		msg.className = "msg ok";
		document.getElementById("aHex").textContent = LIB.hex;
		document.getElementById("aWall").textContent = LIB.wall;
		document.getElementById("aShelf").textContent = LIB.shelf;
		document.getElementById("aVolume").textContent = LIB.volume;
		document.getElementById("aPage").textContent = LIB.page;
		document.getElementById("p2").classList.add("hidden");
		document.getElementById("p3").classList.remove("hidden");
	} else {
		msg.textContent = "That number is not correct. Try again.";
		msg.className = "msg bad";
	}
});

document.getElementById("unlockBtn").addEventListener("click", function () {
	const typed = document.getElementById("word").value.trim().toLowerCase();
	const msg = document.getElementById("msg2");

	if (typed === SECRET_WORD) {
		document.getElementById("puzzle").classList.add("hidden");
		document.getElementById("message").classList.remove("hidden");
	} else {
		msg.textContent = "That is not the word. Check the Library page again.";
		msg.className = "msg bad";
	}
});

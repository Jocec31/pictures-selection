//-----------------------------------
// VARIABLES
//-----------------------------------
// variables des cards
let imgBAse = document.querySelector(".img");
const firstCard = document.getElementById("picture");
const allCards = document.querySelectorAll(".card");
const destroy = document.getElementById("destroy");
const allDivs = [];
// variables utiles pour l'info du choix définitif validé
const selection = [];
let currentPicture;
// paragraphe d'info
const p = document.querySelector("p");
// bouton pour recharger
const buttonReload = document.querySelector("button");
// index pour le random des photos
let indexPhoto = 1;

// apparition de la première image
imgBAse.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
currentPicture = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
// EVENTS

// sélection de toutes les cartes y compris destroy dans un tableau
for (let i = 0; i < allCards.length; i++) {
	allDivs.push(allCards[i]);
}
allDivs.push(destroy);
console.log(allDivs);

//-----------------------------------
// AJOUT DES EVENTS LISTENERS
//-----------------------------------
for (const emptyDiv of allDivs) {
	emptyDiv.addEventListener("dragover", dragOver);
	emptyDiv.addEventListener("dragenter", dragEnter);
	emptyDiv.addEventListener("drop", dragDrop);
}
buttonReload.addEventListener("click", () => {
	location.reload();
});

//-----------------------------------
// FONCTIONS
//-----------------------------------

// fonction pour générer une nouvelle image après avoir déplacé celle en cours
function newPicture() {
	let newImgBase = document.createElement("div");
	newImgBase.setAttribute("class", "img");
	newImgBase.setAttribute("draggable", true);
	indexPhoto++;
	newImgBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
	currentPicture = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
	firstCard.appendChild(newImgBase);
	imgBAse = newImgBase;
}
function dragOver(e) {
	e.preventDefault();
}
function dragEnter(e) {
	e.preventDefault();
}
// fonction pour le déposer de l'image
function dragDrop() {
	// empêcher de déplacer la première image à son emplacement initial
	if (this.id === "picture") {
		return;
	}
	// gestion du destroy
	if (this.id === "destroy") {
		imgBAse.remove();
		newPicture();
		destroy.style.transform = "scale(0)";
		setTimeout(() => {
			destroy.style.transform = "scale(1)";
		}, 500);
		return;
	}

	// verrouillage des images pour éviter qu'elles puissent être redéplacées
	this.removeEventListener("drop", dragDrop);
	this.removeEventListener("dragenter", dragEnter);
	this.removeEventListener("dropover", dragOver);

	// gestion du drop
	this.appendChild(imgBAse);
	// enlever la propriété draggable une fois l'élément posé
	console.log(this.childNodes[0]);
	this.childNodes[0].setAttribute("draggable", false);
	// apparition d'une nouvelle image à déplacer
	newPicture();
	selection.push(currentPicture);
	if (selection.length === 3) {
		p.style.display = "flex";
		p.style.zIndex = 50;
	}
}

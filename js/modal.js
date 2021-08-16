const modalCard = document.getElementById("modal-card");
const modalImageOne = document.getElementById("modal-image1");
const modalImageTwo = document.getElementById("modal-image2");

const modalCardButton = document.getElementById("modal-card-button");
const modalImageOneButton = document.getElementById("modal-image1-button");
const modalImageTwoButton = document.getElementById("modal-image2-button");

modalCardButton.addEventListener("click", () => modalCard.querySelector("img").focus());
modalImageOneButton.addEventListener("click", () => modalImageOne.querySelector("img").focus());
modalImageTwoButton.addEventListener("click", () => modalImageTwo.querySelector("img").focus());

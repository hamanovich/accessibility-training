const modalCard = document.getElementById("modal-card");
const modalImageOne = document.getElementById("modal-image1");
const modalImageTwo = document.getElementById("modal-image2");

const modalCardButton = document.getElementById("modal-card-button");
const modalImageOneButton = document.getElementById("modal-image1-button");
const modalImageOneClickable = document.getElementById(
  "modal-image1-clickable"
);
const modalImageTwoButton = document.getElementById("modal-image2-button");
const modalImageTwoClickable = document.getElementById(
  "modal-image2-clickable"
);

function openModal(modal) {
  modal.classList.add("is-active");
  modal.querySelector("img").focus();
}

function handleSpace(modal) {
  return ({ code }) => {
    if (code === "Space") openModal(modal);
  };
}

modalCardButton.addEventListener("click", () => openModal(modalCard));
modalImageOneButton.addEventListener("click", () => openModal(modalImageOne));
modalImageOneClickable.addEventListener("click", () =>
  openModal(modalImageOne)
);
modalImageTwoButton.addEventListener("click", () => openModal(modalImageTwo));
modalImageTwoClickable.addEventListener("click", () =>
  openModal(modalImageTwo)
);

modalImageOneClickable.addEventListener('keydown', handleSpace(modalImageOne));
modalImageTwoClickable.addEventListener('keydown', handleSpace(modalImageTwo));

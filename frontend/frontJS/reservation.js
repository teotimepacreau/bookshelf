// PSEUDO CODE : au clic sur le bouton "réserver", je veux que le bouton devienne grisé et que s'ajoute dans le panier le livre en question

const reservation = async () => {
  // NOTIF
  const redNotif = document.getElementById("red-card-notif");
  const allBtnReserver = document.querySelectorAll(".btn-reserver");
  allBtnReserver.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.disabled = true;
      redNotif.style.display = "block";

      const titleContainer = btn.parentElement.previousElementSibling
      const bookTitle = titleContainer.querySelector('.book-title').innerText
      const imgSrc = btn.closest('.book-card').querySelector('.book-cover').getAttribute('src')
      const livreReserve = document.createElement('div')
      livreReserve.classList.add('container-livre-reserve')
      livreReserve.innerHTML =
      `
      <img class="img-livre-reserve" src="${imgSrc}"></img>
      <h2>${bookTitle}</h2>
      <div class="flexer-date-retour">
        <label for="date-retour">Sélectionner une date de retour :</label>
        <input type="date" name="date-de-retour" id="date-retour" required></input>
      </div>
      `
      dialog.append(livreReserve)
    });
  });

  // RESERVATION MODAL
  const btnMesReservations = document.getElementById("btn-mes-reservations");
  const dialog = document.getElementById("reservation-dialog");

  async function openReservationDialog() {
    btnMesReservations.addEventListener("click", () => {
      dialog.showModal();
    });
    let cancelBtn = dialog.querySelector("#cancel-reservation-dialog");
    return cancelBtn;
  }
  openReservationDialog();

  async function closeReservationDialog() {
    let cancelBtn = await openReservationDialog();
    cancelBtn.addEventListener("click", () => {
      dialog.close();
    });
  }
  closeReservationDialog();
};

export default reservation;

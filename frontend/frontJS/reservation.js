// PSEUDO CODE : au clic sur le bouton "réserver", je veux que le bouton devienne grisé et que s'ajoute dans le panier le livre en question

const reservation = async () => {
  // NOTIF
  const redNotif = document.getElementById("red-card-notif");
  const allBtnReserver = document.querySelectorAll(".btn-reserver");
  allBtnReserver.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.disabled = true;
      redNotif.style.display = "block";

      const titleContainer = btn.parentElement.previousElementSibling;
      const bookTitle = titleContainer.querySelector(".book-title").innerText;
      const imgSrc = btn
        .closest(".book-card")
        .querySelector(".book-cover")
        .getAttribute("src");
      const livreReserve = document.createElement("div");
      livreReserve.classList.add("container-livre-reserve");
      let containerForResaBooks = document.getElementById(
        "container-for-resa-books"
      );
      livreReserve.innerHTML = `
      <img class="img-livre-reserve" src="${imgSrc}"></img>
      <h2>${bookTitle}</h2>
      <div class="flexer-date-retour">
        <label for="date-retour">Sélectionner une date de retour :</label>
        <input type="date" name="date-de-retour" id="date-retour" required></input>
      </div>
      `;
      containerForResaBooks.append(livreReserve);
    });
  });

  // RESERVATION MODALE
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

  async function postReservationData() {
    const submitBtn = dialog.querySelector("#btn-valider-resa");
    submitBtn.addEventListener("click", async () => {
      // PSEUDO CODE : je récupère tous les titres et toutes les dates donc je me retouve avec un array, je souhaite mettre chaque groupe dans l'array dans un objet séparé
      const titles = dialog.getElementsByTagName('h2');
      console.log(titles)
      const dates = dialog.querySelectorAll("#date-retour");
      console.log(dates)
      const arrayOfReservationData = []
      let itemData = {}
      for(let item of titles){
        itemData = {title: item.innerText}
        arrayOfReservationData.push(itemData)
      }
      for (let item of dates){
        arrayOfReservationData.forEach((element)=>{
          element.date = item.value
        })
      }

      console.log(arrayOfReservationData)
      try {
        let response = await fetch("http://localhost:3000/reservation", {
          method: "POST",
          credentials: "include", // OBLIGATOIRE POUR PERMETTRE DINCLURE LES COOKIES A LA REQUETE, SI ABSENT LES COOKIES NE SERONT PAS ENVOYES
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arrayOfReservationData),
        });
      } catch (error) {
        console.error(error);
      }
    });
  }
  postReservationData()
};

export default reservation;

const login = async () => {
  const btn = document.querySelector("#btn-connexion");

  const dialog = document.querySelector("#connexion-dialog");

  btn.addEventListener("click", () => {
    const btnCoordinates = btn.getBoundingClientRect();
    dialog.style.top = `${btnCoordinates.bottom}px`;
    dialog.show();
  });

  const cancelBtn = dialog.querySelector("#cancel-connexion-dialog");
  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  // obligé de déclarer ici à l'extérieur de l'eventListener la response car le return response dans la fonction en dessous met juste fin à l'eventListener, il ne passe pas la variable au global scope
  let response;

  const submitBtn = dialog.querySelector("#connexion-submit");
  submitBtn.addEventListener("click", async () => {
    const username = dialog.querySelector("#connexion-username").value.trim();
    const password = dialog.querySelector("#connexion-password").value.trim();
    const data = {
      username,
      password,
    };
    try {
      response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include", // OBLIGATOIRE POUR PERMETTRE DINCLURE LES COOKIES A LA REQUETE, SI ABSENT LES COOKIES NE SERONT PAS ENVOYES
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const loginReceived = response.json();
      loginReceived.then((loginReceivedJSObject) => {
        if (loginReceivedJSObject.user) {
          //CONNECTED NOTIF
          const notifConnecté = document.createElement("div");
          notifConnecté.id = "connected-flexer";
          notifConnecté.innerHTML = `
          <div id="connected-first-line">
            <i class="ph ph-check-circle"></i>
            <span>Connecté !</span>
          </div>
          <button id="logout-btn">Logout<i class="ph ph-sign-out"></i></button>
          `;
          notifConnecté.classList.add("notif", "connected");
          notifConnecté.setAttribute("role", "alert");
          const container = document.querySelector("#homepage-container");
          container.appendChild(notifConnecté);

          // ADD BOOK FIELD
          const aside = document.querySelector("aside");
          const addingBooksContainer = document.createElement("div");
          addingBooksContainer.id = "addings-books-container";
          aside.appendChild(addingBooksContainer);
          const addBookBtn = document.createElement("button");
          addBookBtn.innerHTML = `
          Ajouter un livre
          <i class="ph-bold ph-plus-square"></i>
          `;
          addBookBtn.id = "btn-add-book";
          addingBooksContainer.append(addBookBtn);
          addBookBtn.addEventListener("click", () => {
            const addingBooksFields = document.createElement("div");
            addingBooksFields.id = "addings-books-container";
            // ADD BOOK FORM
            addingBooksFields.innerHTML = `
              <form id="add-book-form">
                <div id="flexer-adding-books-fields">
                  <label for="titre-livre">Titre</label>
                  <input type="text" name="titre" id="titre-livre" autocomplete="on">
                  <label for="auteur-livre">Auteur</label>
                  <input type="text" name="auteur" id="auteur-livre" autocomplete="on">
                  <label for="image-livre">Ajouter l'image de couverture</label>
                  <input type="file" name="image" id="image-livre" accept="image/png, image/jpeg, image/jpg">
                  <div id="add-book-flexer">
                    <button id="cancel-add-book">Annuler</button>
                    <button id="add-book" type="submit">Ajouter le livre</button>
                  </div>
                </div>
              </form>
              `;
            addingBooksContainer.append(addingBooksFields);

            // SENDING FORM DATA
            const addBookForm = document.querySelector("#add-book-form");
            console.log(addBookForm);
            addBookForm.addEventListener("submit", async (e) => {
              e.preventDefault();
              const book = {
                bookTitle: addBookForm
                  .querySelector("#titre-livre")
                  .value.trim(),
                bookAuthor: addBookForm
                  .querySelector("#auteur-livre")
                  .value.trim(),
                bookCoverImg: addBookForm.querySelector("#image-livre").files[0]//nécessaire pour ne pas transférer fakepath mais le file grâce à fileAPI
              };
              try {
                await fetch("http://localhost:3000/addbook", {
                  method: "POST",
                  credentials: "include", // OBLIGATOIRE CAR SI COOKIE ABSENT ALORS LE USER NEST PAS AUTHENTIFIE
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(book),
                });
              } catch (error) {
                console.error(error);
              }
            });
          });
          // LOGOUT
          const logoutBtn = document.querySelector("#logout-btn");
          logoutBtn.addEventListener("click", async () => {
            try {
              let logoutResponse = await fetch("http://localhost:3000/logout");
              console.log(logoutResponse);
              if (logoutResponse.status === 200) {
                logoutBtn.parentElement.style.display = "none";
                addBookBtn.style.display = "none";
                addingBooksContainer.style.display = "none";
              } else {
                console.error("logout not achieved");
              }
            } catch (error) {
              console.error(error);
            }
          });
        } else {
          const notifConnexionImpossible = document.createElement("div");
          notifConnexionImpossible.innerHTML = `
          <i class="ph ph-seal-warning"></i>
          <span>Connexion invalide</span>
          `;
          notifConnexionImpossible.classList.add("notif", "non-connected");
          notifConnexionImpossible.setAttribute("role", "alert");
          const container = document.querySelector("#homepage-container");
          container.appendChild(notifConnexionImpossible);
          setTimeout(() => {
            container.removeChild(notifConnexionImpossible);
          }, 5000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
};

export default login;

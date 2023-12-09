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
  let response

  const submitBtn = dialog.querySelector("#connexion-submit")
  submitBtn.addEventListener("click", async ()=> {
    const username = dialog.querySelector('#connexion-username').value.trim()
    const password = dialog.querySelector('#connexion-password').value.trim()
    const data = {
      username,
      password
    }
    try{
        response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          credentials: "include", // OBLIGATOIRE POUR PERMETTRE DINCLURE LES COOKIES A LA REQUETE, SI ABSENT LES COOKIES NE SERONT PAS ENVOYES
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      const result = response.json()
      result.then(resultOk=>{
        console.log(resultOk)
        if(resultOk.auth === true){
          //send visual notif confirmation
          const notifConnecté = document.createElement('div')
          notifConnecté.id = "connected-flexer"
          notifConnecté.innerHTML = `
          <div id="connected-first-line">
            <i class="ph ph-check-circle"></i>
            <span>Connecté !</span>
          </div>
          <button id="logout-btn">Logout<i class="ph ph-sign-out"></i></button>
          `
          notifConnecté.classList.add('notif', 'connected')
          notifConnecté.setAttribute("role", "alert")
          const container = document.querySelector('#homepage-container')
          container.appendChild(notifConnecté)

          const logoutBtn = document.querySelector('#logout-btn')
          logoutBtn.addEventListener('click', async ()=> {
          await fetch('http://localhost:3000/logout')
          })
        }else{
          const notifConnexionImpossible = document.createElement('div')
          notifConnexionImpossible.innerHTML = `
          <i class="ph ph-seal-warning"></i>
          <span>Connexion invalide</span>
          `
          notifConnexionImpossible.classList.add('notif', 'non-connected')
          notifConnexionImpossible.setAttribute("role", "alert")
          const container = document.querySelector('#homepage-container')
          container.appendChild(notifConnexionImpossible)
          setTimeout(()=>{
              container.removeChild(notifConnexionImpossible)
          }, 5000)
        }
      })
    }catch(error){
      console.error(error)
    }
  })
};

export default login;

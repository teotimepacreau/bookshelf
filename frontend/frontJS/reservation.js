// PSEUDO CODE : au clic sur le bouton "réserver", je veux que le bouton devienne grisé et que s'ajoute dans le panier le livre en question

const reservation = async () => {
    const redNotif = document.getElementById('red-card-notif')
    const allBtnReserver = document.querySelectorAll('.btn-reserver')
    allBtnReserver.forEach((btn)=>{
        btn.addEventListener('click', (e)=> {
            console.log('btn cliqué')
            btn.disabled = true
            redNotif.style.display = "block"
        })
    })
}

export default reservation
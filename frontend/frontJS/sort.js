// PSEUDO CODE : au clic sur l'option je récupère la valeur de l'option. EN fonction de la valeur de l'option j'exécute un ordre.

const sorter = ()=>{
    const allBooks = Array.from(document.querySelectorAll('.book-card'))//Array.from car sort ne fonctionne pas sur une NodeList
    console.log(allBooks)

    const sorter = document.querySelector('select[name="sort-by"]')
    sorter.addEventListener('change', (e)=> {
        console.log(e.target.value)
        const value = e.target.value
        switch(value){
            case 'Titre de A à Z':
                console.log('case1')
                const AZArray = allBooks.toSorted((a,b)=>{
                    const titleA = a.querySelector('.book-title').innerText
                    const titleB = b.querySelector('.book-title').innerText
                    return titleA.localeCompare(titleB)
                })
                console.log(AZArray)
                
                break
            case "Titre de Z à A":
                console.log('case2')
                break
            case "Note croissante":
                break
            case "Note décroissante":
                break
        }
    })
}

export default sorter
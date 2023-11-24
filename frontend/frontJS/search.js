console.log('hello')

const searchInput = document.querySelector('#search-input')
console.log(searchInput)

searchInput.addEventListener('change', (e)=>{
    const searchedByTheUser = searchInput.value
    console.log(searchedByTheUser)
})
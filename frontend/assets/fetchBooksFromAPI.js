export default async function fetchBooks () {
    try {
        const response = await fetch('http://localhost:3000/data')
        if(response.ok) {
            const books = await response.json()
            const { sanitarizedRows, bookcovers } = books
            return { sanitarizedRows, bookcovers }
        }else{
            console.error('client side error')
        }
    }catch(error){
        console.error('server side error')
    }
}
fetchBooks()
(async ()=> {
    try {
        const response = await fetch('http://localhost:3000/data')
        if(response.ok) {
            const books = await response.json()
            console.log(books)
        }else{
            console.error('client side error')
        }
    }catch(error){
        console.error('server side error')
    }
})()
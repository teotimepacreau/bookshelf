const filterBtn = document.querySelector('#filter-button')

console.log(filterBtn)

const filtersContainer = document.querySelector('#all-filters')
console.log(filtersContainer)

filterBtn.addEventListener('click', (e)=>{
    console.log('filter-btn clicked')
    filtersContainer.classList.add("filters-visible")

    const chevron = 
    filterBtn.querySelector('i')
    console.log(chevron)
    chevron.style.transform = "rotate(180deg)"
})


const allStarCheckboxes = document.querySelectorAll('.star-checkboxes')
console.log(allStarCheckboxes)

allStarCheckboxes.forEach((item)=> {
    item.addEventListener('click', (e)=>{
        const itemCheckbox = 
        item.querySelector('input')
        if(itemCheckbox.checked === true){
            itemCheckbox.checked = false
        }else{
            itemCheckbox.checked = true
        }
        
    })
})
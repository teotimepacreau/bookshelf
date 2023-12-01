// FILTER ANIMATION

const filterBtn = document.querySelector('#filter-button')

const filtersContainer = document.querySelector('#all-filters')

filterBtn.addEventListener('click', (e)=>{
    filtersContainer.classList.toggle("filters-visible")

    const chevron = 
    filterBtn.querySelector('i')
    chevron.classList.toggle("dropdown-icon")
})

// ACTIVATE CHECKBOX IF CLICK ON DIV
const allStarCheckboxes = document.querySelectorAll('.star-checkboxes')

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
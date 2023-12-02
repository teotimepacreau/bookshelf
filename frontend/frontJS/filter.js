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
const allStarCheckboxes = document.querySelectorAll('.star-checkboxes');

allStarCheckboxes.forEach((item) => {
    const itemCheckbox = item.querySelector('input');

    item.addEventListener('click', (e) => {
        if (!e.target.matches('input')) {//je vérifie que le clic n'est pas sur la checkbox mais bien sur le container pour être sûr de ne pas empêcher la fonctionnalité native de la checkbox
            itemCheckbox.checked = !itemCheckbox.checked;//quand cliqué met l'attribute checked en l'inverse de son état précédent
        }
    });
// ACTIVATE CHECKBOX FOR KEYBOARD USERS

    item.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            itemCheckbox.checked = !itemCheckbox.checked;
        }
    });
});

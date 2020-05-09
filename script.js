var newListForm = null;
var newListInput = null;


document.addEventListener("DOMContentLoaded", function() {
     newListForm = document.querySelector('[data-new-list-form]')
     newListInput = document.querySelector('[data-new-list-input]')
     console.log(newListForm)

})

console.log(newListForm)

let lists = [ 
{
    id: 1 ,
    name: 'name' 
}, {
    id:2,
    name: 'todo'
}]

newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.nodeValue
    if(listName == null || listName === '')return
    const list = create(listName)
    newListInput.value = null
    lists.push(list)
    render()
})

function createList(name){
   return {id: Date.now().toString(), name : name , tasks:[] }
}

document.addEventListener("DOMContentLoaded", function render(){
    clearElement()
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add("list-name")
        listElement.innerText = list.name
        document.querySelector('[data-lists]').append(listElement)
    })
}
)

function clearElement() {

}





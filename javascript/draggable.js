const list_items = document.querySelectorAll('.list-item')
const lists = document.querySelectorAll('.list')
const button = document.querySelector('#check')
const clock = document.querySelector('#clock')
const weather = document.querySelector('#item2')
const todo_list = document.querySelector('#item3')
const qa_bar = document.querySelector('#qaBar')
const timer = document.querySelector('#timer')

var list_1 = lists[0]; //actual list 1
var list_2 = lists[1]; //actual list 2
var list_3 = lists[2]; //actual list 3

var virtual_list1;
var virtual_list2;
var virtual_list3;

// Creating a local storage "list_One" for first time users
if(localStorage.getItem('list_One') === null){
        virtual_list1=['qaBar']
        localStorage.setItem('list_One', JSON.stringify(virtual_list1))
    }else{
        virtual_list1 = JSON.parse(localStorage.getItem('list_One'))
        
}

// Creating a local storage "list_Two" for first time users
if(localStorage.getItem('list_Two') === null){
    virtual_list2=['clock', 'item2' , 'item3']
    localStorage.setItem('list_Two', JSON.stringify(virtual_list2))
}else{
    virtual_list2 = JSON.parse(localStorage.getItem('list_Two'))
  
}

// Creating a local storage "list_Three" for first time users
if(localStorage.getItem('list_Three') === null){
    virtual_list3=['timer']
    localStorage.setItem('list_Three', JSON.stringify(virtual_list3))
}else{
    virtual_list3 = JSON.parse(localStorage.getItem('list_Three'))
 
}



//When application starts go through the local storage append the items in 'list-One' to the actual list_1
if(virtual_list1.length > 0){
    for( let i = 0; i < virtual_list1.length ; i++){
        switch(virtual_list1[i]){
            case "clock":
                list_1.append(clock)
                break;
            case "item2":
                list_1.append(item2)
                break;
            case "item3":
                list_1.append(item3)
                break;
            case "qaBar":
                list_1.append(qaBar)
                break;
            case "timer":
                list_1.append(timer)
                break;

        }
    }
}

//When application starts go through the local storage append the items in 'list-Two' to the actual list_2
if(virtual_list2.length > 0){
    for( let i = 0; i < virtual_list2.length ; i++){
        switch(virtual_list2[i]){
            case "clock":
                list_2.append(clock)
                break;
            case "item2":
                list_2.append(item2)
                break;
            case "item3":
                list_2.append(item3)
                break;
            case "qaBar":
                list_2.append(qaBar)
                break;
            case "timer":
                list_2.append(timer)
                break;
        }
    }
}

//When application starts go through the local storage append the items in 'list-Three' to the actual list_3
if(virtual_list3.length > 0){
    for( let i = 0; i < virtual_list3.length ; i++){
        switch(virtual_list3[i]){
            case "clock":
                list_3.append(clock)
                break;
            case "item2":
                list_3.append(item2)
                break;
            case "item3":
                list_3.append(item3)
                break;
            case "qaBar":
                list_1.append(qaBar)
                break;
            case "timer":
                list_3.append(timer)
                break;

        }
    }
}






let draggedItem = null; // item being dragged during customization


//edit button
button.addEventListener('change' , function(){

    if(button.checked){
    for(let i = 0; i < list_items.length; i++){
        const item = list_items[i]
       
        item.addEventListener('dragstart', function(){
            if(button.checked){
                draggedItem = this;
                setTimeout(function(){
                    item.style.display = 'none';
                },0)
               
                var listid = item.parentElement.id
                var itemid = this.id
                removeLocalList(itemid , listid)  // if item is dragged we remove it from the local storage
            }
        })
    
        item.addEventListener('dragend', function(){
            if(button.checked){
                setTimeout(function(){
                    draggedItem.style.display = 'block';
                },0)
              
                var listid = item.parentElement.id
                var itemid = this.id
                saveLocalList(itemid, listid)  // if item is dropped we save it into to the local storage
                
            }
        })
    }
    
        for(let j = 0; j<lists.length; j++){
            const list = lists[j];
    
            list.addEventListener('dragover', function(e){
                if(button.checked){
                
                e.preventDefault();
                }
            })

            list.addEventListener('dragenter', function(e){
                if(button.checked){
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0.2)'}  // sets background when an item is dragged over the list
            });
    
            list.addEventListener('dragleave', function(e){
                if(button.checked){
                e.preventDefault();
                leavinglist = this.id
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0)';  // change background back to the orginal when an item leaves the list
            }
            });
    
            list.addEventListener('drop', function(e){
                if(button.checked){
                this.append(draggedItem)
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0)';  // sets background when an item is dragged over when an item is dropped in the list
                }
            })
        }
        
    
}
})



//saves the item into the local storage
function saveLocalList(item_id , list_id){

    //depending on which list it is added to we add it to our virtual list and set it to the local storage
    switch(list_id){
        case 'list-1':
            
            virtual_list1.push(item_id)
            virtual_list1 = removeDuplicates(virtual_list1)
            localStorage.setItem('list_One', JSON.stringify(virtual_list1))
        
            break;

        case 'list-2':
            
            virtual_list2.push(item_id)
            virtual_list2 = removeDuplicates(virtual_list2)
            localStorage.setItem('list_Two', JSON.stringify(virtual_list2))
           
            break;

        case 'list-3':

            virtual_list3.push(item_id)
            virtual_list3 = removeDuplicates(virtual_list3)
            localStorage.setItem('list_Three', JSON.stringify(virtual_list3))
            
            break;

        default:
            break;

    }

}

 //depending on which list it is removing from to we remove it from our virtual list and set it to the local storage
function removeLocalList(item_id , list_id){
   
    switch(list_id){

        case 'list-1':
            if(virtual_list1.indexOf(item_id)>= 0){
            virtual_list1.splice(virtual_list1.indexOf(item_id), 1)
            }
           
            localStorage.setItem('list_One', JSON.stringify(virtual_list1))
            break;


        case 'list-2':
            if(virtual_list2.indexOf(item_id)>= 0){
            virtual_list2.splice(virtual_list2.indexOf(item_id), 1)
            }
            
            localStorage.setItem('list_Two', JSON.stringify(virtual_list2))
            break;


        case 'list-3':
            if(virtual_list3.indexOf(item_id) >= 0){
            virtual_list3.splice(virtual_list3.indexOf(item_id), 1)
            }

            localStorage.setItem('list_Three', JSON.stringify(virtual_list3))
            break;


    }
}


//remove duplicates from the arrays
function removeDuplicates(array){
    return array.filter((a, b) => array.indexOf(a) === b)
}




const list_items = document.querySelectorAll('.list-item')
const lists = document.querySelectorAll('.list')
const button = document.querySelector('#check')
const clock = document.querySelector('#clock')
const weather = document.querySelector('#item2')
const todo_list = document.querySelector('#item3')


var list_1 = lists[0]; //actual list 1
var list_2 = lists[1]; //actual list 2
var list_3 = lists[2]; //actual list 3

var virtual_list1;
var virtual_list2;
var virtual_list3;




if(localStorage.getItem('list_One') === null){
        virtual_list1=[]
        localStorage.setItem('list_One', JSON.stringify(virtual_list1))
    }else{
        virtual_list1 = JSON.parse(localStorage.getItem('list_One'))
        
}

if(localStorage.getItem('list_Two') === null){
    virtual_list2=['clock', 'item2' , 'item3']
    localStorage.setItem('list_Two', JSON.stringify(virtual_list2))
}else{
    virtual_list2 = JSON.parse(localStorage.getItem('list_Two'))
  
}

if(localStorage.getItem('list_Three') === null){
    virtual_list3=[]
    localStorage.setItem('list_Three', JSON.stringify(virtual_list3))
}else{
    virtual_list3 = JSON.parse(localStorage.getItem('list_Three'))
 
}

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

        }
    }
}

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

        }
    }
}

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

        }
    }
}






let draggedItem = null;


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
                removeLocalList(itemid , listid)
            }
        })
    
        item.addEventListener('dragend', function(){
            if(button.checked){
                setTimeout(function(){
                    draggedItem.style.display = 'block';
                },0)
              
                var listid = item.parentElement.id
                var itemid = this.id
                saveLocalList(itemid, listid)
                
            }
        })
    }
    
        for(let j = 0; j<lists.length; j++){
            const list = lists[j];

            var leavinglist; 
    
            list.addEventListener('dragover', function(e){
                if(button.checked){
                
                e.preventDefault();
                }
            })

            list.addEventListener('dragenter', function(e){
                if(button.checked){
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0.2)'}
            });
    
            list.addEventListener('dragleave', function(e){
                if(button.checked){
                e.preventDefault();
                leavinglist = this.id
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0)';
            }
            });
    
            list.addEventListener('drop', function(e){
                if(button.checked){
                this.append(draggedItem)
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0)';
                }
            })
        }
        
    
}
})


function saveLocalList(item_id , list_id){

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

function removeDuplicates(array){
    return array.filter((a, b) => array.indexOf(a) === b)
}


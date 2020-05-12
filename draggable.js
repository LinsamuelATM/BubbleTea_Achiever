

const list_items = document.querySelectorAll('.list-item')
const lists = document.querySelectorAll('.list')
const button = document.querySelector('#check')

console.log(button)

let draggedItem = null;


button.addEventListener('change' , function(){
    console.log("change")

    if(button.checked){
    for(let i = 0; i < list_items.length; i++){
        const item = list_items[i]
       
        item.addEventListener('dragstart', function(){
            if(button.checked){
                draggedItem = this;
                console.log(draggedItem)
                setTimeout(function(){
                    item.style.display = 'none';
                },0)
            }
        })
    
        item.addEventListener('dragend', function(){
            if(button.checked){
                setTimeout(function(){
                    console.log(draggedItem)
                    draggedItem.style.display = 'block';
                },0)
            }
        })
    
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
                this.style.backgroundColor = 'rgba(0, 0 , 0 , 0.2)'}
            });
    
            list.addEventListener('dragleave', function(e){
                if(button.checked){
                e.preventDefault();
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
}
})
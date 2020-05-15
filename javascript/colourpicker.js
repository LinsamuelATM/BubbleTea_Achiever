const red = document.querySelector("#red")
const orange = document.querySelector("#orange")
const yellow = document.querySelector("#yellow")
const green = document.querySelector("#green")
const blue = document.querySelector("#blue")

var current_colour; 



current_colour = JSON.parse(localStorage.getItem('background_colour'))

document.body.style.background = current_colour;

red.addEventListener('click', function(){
    document.body.style.background = 'linear-gradient(120deg, rgb(243, 203, 198), rgb(192, 58, 46))'
    red_gradient = 'linear-gradient(120deg, rgb(243, 203, 198), rgb(192, 58, 46))';
    saveColour(red_gradient)
})

orange.addEventListener('click', function(){
    document.body.style.background = 'linear-gradient(120deg, rgb(238, 217, 193), rgb(195, 130, 46))'
    orange_gradient = 'linear-gradient(120deg, rgb(238, 217, 193), rgb(195, 130, 46))'
    saveColour(orange_gradient)
})

yellow.addEventListener('click', function(){
    document.body.style.background = 'linear-gradient(120deg, rgb(238, 231, 193), rgb(195, 180, 46))'
    yellow_gradient = 'linear-gradient(120deg, rgb(238, 231, 193), rgb(195, 180, 46))'
    saveColour(yellow_gradient)
})

green.addEventListener('click', function(){
    document.body.style.background = 'linear-gradient(120deg, rgb(211, 238, 193), rgb(67, 139, 25)'
    green_gradient = 'linear-gradient(120deg, rgb(211, 238, 193), rgb(67, 139, 25)'
    saveColour(green_gradient)
})

blue.addEventListener('click', function(){
    document.body.style.background = 'linear-gradient(120deg, rgb(223, 237, 241), rgb(24, 124, 185))'
    blue_gradient = 'linear-gradient(120deg, rgb(223, 237, 241), rgb(24, 124, 185))';
    saveColour(blue_gradient)
})

function saveColour(colour_picked){
    localStorage.setItem('background_colour', JSON.stringify(colour_picked));

}

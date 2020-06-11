const displays = document.querySelectorAll('.note-display');
const display_container = document.querySelector('.display-container')
const transitionDuration = 1500;
const event_name = document.querySelector('#event_input')
const day = document.querySelector('#day_input')
const month = document.querySelector('#month_input')
const year= document.querySelector('#year_input')
const colour = document.querySelector('#colour_input')
const count_down_button = document.querySelector('#count_down_create')

const open = document.querySelector(".open-button")
const formbutton = document.querySelector('#myForm')

var days_left;
var total_days;
var diffTime;
var days_completed;


open.addEventListener('click', function(){
    if(formbutton.style.display == "block"){
        formbutton.style.display = "none"
    }else{
        formbutton.style.display = "block"
    }
})


count_down_button.addEventListener('click', create_timer)

/*

// simple set up of today's date and the first day of the year
const date = new Date();
const first_Day = new Date('1/1/' + date.getFullYear())  // first day of the year
const current_year = date.getFullYear(); // today's year
const today_month = date.getMonth()+1;  // today's month
const today_date = date.getDate();  // today's day



const today = new Date(today_month + '/' + today_date + '/' + current_year)
diffTime = Math.abs(today - first_Day);
days_completed = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
days_left_Newyears = 365 - Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
total_days = 365;


//New years countdown
strokeTransition(displays[0], days_completed , total_days)
increaseNumber(displays[0], days_left_Newyears , 'int');

// console.log(displays[0])



//Christmas countdown
const christmas = new Date('12/25/2020')
const total_days_christmas = Math.ceil(Math.abs(christmas - first_Day)/(1000 * 60 * 60 * 24)) ;
days_left_christmas = total_days_christmas - Math.ceil(diffTime / (1000 * 60 * 60 * 24))


strokeTransition(displays[1], days_completed , total_days_christmas)
increaseNumber(displays[1], days_left_christmas, 'int');
*/

load_timers()


function load_timers(event){
  const date = new Date();
  const first_Day = new Date('1/1/' + date.getFullYear()) 
  const New_years = new Date('12/31/' + date.getFullYear()) 
  const Christmas = new Date('12/25/' + date.getFullYear()) 
  var timer_name =['New years' , 'Christmas'] ;
  var timer_day_created =[ first_Day , first_Day ];
  var timer_end_date =[ New_years , Christmas];

  if(localStorage.getItem('timer_name') === null){
    console.log('timer_name created')
    localStorage.setItem('timer_name', JSON.stringify(timer_name))
  }else{
    timer_name = JSON.parse(localStorage.getItem('timer_name'))
    console.log(timer_name[0])
  }

  if(localStorage.getItem('timer_day_created') === null){
    console.log('timer_day created')
    localStorage.setItem('timer_day_created', JSON.stringify(timer_day_created ))
  }else{
    timer_day_created = JSON.parse(localStorage.getItem('timer_day_created'))
    console.log(timer_day_created[1])
  }

  if(localStorage.getItem('timer_end_date') === null){
    console.log('timer_end created')
    localStorage.setItem('timer_end_date', JSON.stringify(timer_end_date ))
  }else{
    timer_end_date   = JSON.parse(localStorage.getItem('timer_end_date'))
    console.log(timer_end_date[1])
  }



  for(let i = 0 ; i < timer_name.length ; i ++){
      display_timer(timer_name[i] , timer_day_created[i] , timer_end_date[i])
  }
}



function display_timer(event_name , timer_day_created, timer_end_date){

    created_day = new Date(timer_day_created)
    end_date = new Date(timer_end_date)


    const date = new Date();
    const current_year = date.getFullYear(); // today's year
    const today_month = date.getMonth()+1;  // today's month
    const today_date = date.getDate();  // today's day

    const today = new Date(today_month + '/' + today_date + '/' + current_year)
    var days_completed = parseInt((today- created_day) / (1000 * 60 * 60 * 24), 10); 
    

    

    diffTime_daystillenddate = Math.abs(end_date - today)
    daystillend_date = Math.ceil(diffTime_daystillenddate / (1000 * 60 * 60 * 24)); 




    const diffTime_total_days = Math.abs(end_date - created_day);
    const total_days = Math.ceil(diffTime_total_days / (1000 * 60 * 60 * 24)); 

     //create list item
     const note_display = document.createElement('li');
     note_display.classList.add("note-display")
 
 
     //create circle
     const circle = document.createElement('div')
     circle.classList.add("circle")
 
 
     //create cricle svg
     const circle_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
 
     circle_svg.setAttribute( "width" , "200")
     circle_svg.setAttribute("height" , "200")
     circle_svg.classList.add("circle__svg")
 
 
     //create circle path
     const circle_path = document.createElementNS("http://www.w3.org/2000/svg", "circle");
     circle_path.classList.add("circle__progress")
     circle_path.classList.add("circle__progress--path")
 
     circle_path.setAttribute("cx" , "100")
     circle_path.setAttribute("cy" , "100")
     circle_path.setAttribute("r" , "75")
    
 
     //create cirle fill
     const circle_fill= document.createElementNS("http://www.w3.org/2000/svg", "circle");
     circle_fill.classList.add("circle__progress")
     circle_fill.classList.add("circle__progress--fill")
 
     circle_fill.setAttribute("cx" , "100")
     circle_fill.setAttribute("cy" , "100")
     circle_fill.setAttribute("r" , "75")
 
 
     circle_svg.appendChild(circle_path)
     circle_svg.appendChild(circle_fill)
     circle.appendChild(circle_svg)
 
 
     //create percent ( days inside the circle )
     const percent = document.createElement('div')
     percent.classList.add("percent")
 
     
     const percent_int = document.createElement('span')
     percent_int.classList.add("percent__int")
 
     const percent_dec = document.createElement('span')
     percent_dec.classList.add("percent__dec")
     percent_dec.innerText = 'days'
 
 
     percent.appendChild(percent_int)
     percent.appendChild(percent_dec)
     circle.appendChild(percent)
 
     //create label
     const label = document.createElement('span')
     label.classList.add('label')
     label.innerText = event_name;
 
     note_display.appendChild(circle)
     note_display.appendChild(label)
 
     display_container.append(note_display);

     console.log('days completed:' + days_completed)
     console.log('daystillend_date' + daystillend_date)
 
     strokeTransition(note_display ,days_completed, total_days)
     increaseNumber(note_display, daystillend_date, 'int');

}




function create_timer(event){

    event.preventDefault()

    var timer_name =[] ;
    var timer_day_created =[];
    var timer_end_date =[];

    
    var event_entered = event_name.value;
    var day_entered = day.value;
    var month_entered = month.value;
    var year_entered = year.value;

    const date = new Date();
    const current_year = date.getFullYear(); // today's year
    const today_month = date.getMonth()+1;  // today's month
    const today_date = date.getDate();  // today's day



    const entered = new Date(month_entered+ '/' + day_entered + '/' + year_entered );
    const current= new Date(today_month+ '/' + today_date+ '/' + current_year);

      localStorage.getItem('timer_name' , JSON.stringify(timer_name))
      timer_name = JSON.parse(localStorage.getItem('timer_name'))
      timer_name.push(event_entered)
      localStorage.setItem('timer_name' , JSON.stringify(timer_name))
    

      localStorage.getItem('timer_day_created' , JSON.stringify(timer_day_created))
      timer_day_created = JSON.parse(localStorage.getItem('timer_day_created'))
      timer_day_created.push(current)
      localStorage.setItem('timer_day_created' , JSON.stringify(timer_day_created))
  

      localStorage.getItem('timer_end_date',  JSON.stringify(timer_end_date))
      timer_end_date  = JSON.parse(localStorage.getItem('timer_end_date'))
      timer_end_date.push(entered)    
      localStorage.setItem('timer_end_date',  JSON.stringify(timer_end_date))
  
    const diffTime = Math.abs(current - entered);
    const total_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 



    //create list item
    const note_display = document.createElement('li');
    note_display.classList.add("note-display")


    //create circle
    const circle = document.createElement('div')
    circle.classList.add("circle")


    //create cricle svg
    const circle_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    circle_svg.setAttribute( "width" , "200")
    circle_svg.setAttribute("height" , "200")
    circle_svg.classList.add("circle__svg")


    //create circle path
    const circle_path = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_path.classList.add("circle__progress")
    circle_path.classList.add("circle__progress--path")

    circle_path.setAttribute("cx" , "100")
    circle_path.setAttribute("cy" , "100")
    circle_path.setAttribute("r" , "75")
   

    //create cirle fill
    const circle_fill= document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle_fill.classList.add("circle__progress")
    circle_fill.classList.add("circle__progress--fill")

    circle_fill.setAttribute("cx" , "100")
    circle_fill.setAttribute("cy" , "100")
    circle_fill.setAttribute("r" , "75")


    circle_svg.appendChild(circle_path)
    circle_svg.appendChild(circle_fill)
    circle.appendChild(circle_svg)


    //create percent ( days inside the circle )
    const percent = document.createElement('div')
    percent.classList.add("percent")

    
    const percent_int = document.createElement('span')
    percent_int.classList.add("percent__int")

    const percent_dec = document.createElement('span')
    percent_dec.classList.add("percent__dec")
    percent_dec.innerText = 'days'


    percent.appendChild(percent_int)
    percent.appendChild(percent_dec)
    circle.appendChild(percent)

    //create label
    const label = document.createElement('span')
    label.classList.add('label')
    label.innerText = event_entered;

    note_display.appendChild(circle)
    note_display.appendChild(label)

    console.log(displays)
    display_container.append(note_display);

    strokeTransition(note_display , 0 , total_days)
    increaseNumber(note_display, total_days,'int');



    //everything resets
    formbutton.style.display = "none";
    event_name.value = '';
    day.value = '';
    month.value = '';
    year.value = '';


}

/*

displays.forEach(display => {

  strokeTransition(display, 9 , 15);

  increaseNumber(display, , 'int');

});

*/




function strokeTransition(display , note, length){

    let progress = display.querySelector('.circle__progress--fill');
    //let radius = progress.r.baseVal.value;
    let circumference = 2 * Math.PI * 75;
    let offset = circumference * (length - note) / length;
  
    progress.style.setProperty('--transitionDuration', `${transitionDuration}ms`);
    progress.style.setProperty('--initialStroke', circumference);
  
    setTimeout(() => progress.style.strokeDashoffset = offset, 100);



}

function increaseNumber(display, number, className) {
  let element = display.querySelector(`.percent__${className}`),
      decPoint = className === 'int' ? '.' : '',
      interval = transitionDuration / number,
      counter = 0;

  let increaseInterval = setInterval(() => {
  if (counter === number) { window.clearInterval(increaseInterval); }

    element.textContent = counter + decPoint;
    counter++;
  }, interval);
}

//saving the timer in the local storage once added to the list 
function saveLocalTimer(event_name){
  //Check --- Do I already have thing in there?
  let timer_list;
  if(localStorage.getItem('todos') === null){
    timer_list=[]
  }else{
    timer_list = JSON.parse(localStorage.getItem('timer_list'))
  }
  timer_list.push(event_name);
  localStorage.setItem('timer_list', JSON.stringify(timer_list));
}

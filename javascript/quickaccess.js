// QUICK ACCESS

const max_qas = 10; // maximum number of qas
var current = 0; // current number of qas

// localStorage.clear();

// selector
const qaList = document.querySelector('.qa-list');
const qaButton = document.querySelector('.qa-button');
const qaInput = document.querySelector('.qa-input');
const qaAddInput = document.querySelector('.qa-input-button');
const qas = document.querySelectorAll('.qa-item');

// event listeners
document.addEventListener('DOMContentLoaded', getQAs);
qaButton.addEventListener('click', showAddQA);
qaAddInput.addEventListener('click', addQA);
qaList.addEventListener('click', deleteQA);

function addQA(event) {
    console.log('adding QA');
    if (current >= max_qas) {
        console.log('reached max number of quick access links (10)');
        return;
    }
    event.preventDefault();

    // validate quick access input url (to work with href)
    var regex = /https?:\/\/.+/;
    if (!(regex.test(qaInput.value))) {
      alert("Please enter url starting with http or https");
      return;
    }
    // create qa div
    const qaDiv = document.createElement("div");
    qaDiv.classList.add("qa");

    // create quick access
    const newQA = document.createElement("a");
    newQA.type = "button";
    newQA.href = qaInput.value;

    // set image of quick access button
    var faviconURL = 'https://s2.googleusercontent.com/s2/favicons?domain_url='+qaInput.value;
    faviconURL = 'url(' + faviconURL + ')';
    newQA.style.backgroundImage = faviconURL;

    newQA.classList.add('qa-item');
    qaDiv.appendChild(newQA);

    // save qa to local storage
    saveLocalQAs(qaInput.value);

    // qa delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn")
    qaDiv.appendChild(deleteButton);

    // append to list of qas
    qaList.appendChild(qaDiv);

    // increment count of 
    current++;

    // reset default value of input
    qaInput.value = 'http://';
}

// if button for adding QA is clicked, show form to enter URL of new QA
function showAddQA() {
    var qaForm = document.querySelector(".qa-form");
    // if form is not showing, show it
    // if form is showing, collapse it
    if (qaForm.style.visibility === "collapse") {
        qaForm.style.visibility = "visible";
        document.querySelector(".qa-input").focus();
        document.querySelector(".qa-input").value="http://";
        console.log("now visible");
    } else {
        qaForm.style.visibility = "collapse";
        console.log("now collapsed");
    }
}

function deleteQA(e) {
    console.log(e.target);
    const item = e.target;
    // delete
    if (item.classList[0]  === "trash-btn") {
        const qa = item.parentElement;
        qa.classList.add("fall");
        removeLocalQA(qa);
        qa.addEventListener('transitionend', function() {
            qa.remove();
        });
    }
}

function saveLocalQAs(qa) {
    // check for local qa
    let qas;
    if (localStorage.getItem("qas") === null) {
        qas = [];
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
    }
    qas.push(qa);
    console.log(qa);
    localStorage.setItem("qas", JSON.stringify(qas));
}

function getQAs() {
    let qas;
    // check for qas
    if (localStorage.getItem("qas") === null) {
        qas = [];
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
    }

    qas.forEach(function(qa, index) {
        if (index >= max_qas) {
            console.log("max number of qas loaded");
            return;
        }
        // create qa div
        const qaDiv = document.createElement("div");
        qaDiv.classList.add("qa");

        // create quick access
        const newQA = document.createElement("a");
        newQA.type = "button";
        newQA.href = qa;

        // set image of quick access button
        var faviconURL = 'https://s2.googleusercontent.com/s2/favicons?domain_url='+qa;
        faviconURL = 'url(' + faviconURL + ')';
        newQA.style.backgroundImage = faviconURL;

        newQA.classList.add('qa-item');
        qaDiv.appendChild(newQA);

        // qa delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash-btn")
        qaDiv.appendChild(deleteButton);

        // append to list of qas
        qaList.appendChild(qaDiv);
    })
}

function removeLocalQA(qa) {
    let qas;

    // get list of qas from storage
    if (localStorage.getItem("qas") === null) {
        qas = [];
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
    }

    // find and remove qa from list of qas
    const qaHref = qa.children[0].href; // href to find in list of qas
    for (i = 0; i<qas.length; i++) {
        var storedQA = qas[i];
        // if found, remove from list
        if (storedQA+'\/' === qaHref) {
            qas.splice(i, 1);
            break;
        }
    }

    // set storage
    localStorage.setItem("qas", JSON.stringify(qas));
}

// QUICK ACCESS
const max_qas = 10; // maximum number of qas
var current = 0; // current number of qas
// selector
const qaList = document.querySelector('.qa-list');
const qaButton = document.querySelector('.qa-button');
const qaTitle = document.querySelector('.qa-title');
const qaHref = document.querySelector('.qa-href');
const qaAddInput = document.querySelector('.qa-add-button');

// event listeners
document.addEventListener('DOMContentLoaded', getQAs);
qaButton.addEventListener('click', showAddQA);
qaAddInput.addEventListener('click', addQA);
qaList.addEventListener('click', deleteQA);

function getQAs() {
    let qas;
    let titles;
    let classes;
    // check for qas
    if (localStorage.getItem("qas") === null || localStorage.getItem("titles") === null) {
        qas = ["https://www.amazon.com/", "https://www.google.com/", "https://www.facebook.com/", "https://www.github.com/", "https://www.gmail.com/", "https://www.reddit.com/", "https://www.youtube.com/", "https://www.linkedin.com/"];
        titles = ["Amazon", "Google", "FaceBook", "Github", "Gmail", "Reddit", "YouTube", "LinkedIn"];
        classes = ["st-icon-amazon", "st-icon-google", "st-icon-facebook-alt", "st-icon-github", "st-icon-gmail", "st-icon-reddit", "st-icon-youtube", "st-icon-linkedin"];
        localStorage.setItem("qas", JSON.stringify(qas));
        localStorage.setItem("titles", JSON.stringify(titles));
        localStorage.setItem("classes", JSON.stringify(classes));
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
        titles = JSON.parse(localStorage.getItem("titles"));
        classes = JSON.parse(localStorage.getItem("classes"));
    }
    qas.forEach(function(qa, index) {
        if (index >= max_qas) {
            console.log("max number of qas loaded");
            current = max_qas;
        } else {
            // create qa div
            const qaDiv = document.createElement("div");
            qaDiv.classList.add("qa");
            // create qa & add qa to qa div
            const newQA = document.createElement("a");
            newQA.title = titles[index];
            newQA.className = classes[index];
            newQA.href = qa;
            qaDiv.appendChild(newQA);
            // qa delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.classList.add("trash-btn")
            qaDiv.appendChild(deleteButton);
            // append qa div to list of qas
            qaList.appendChild(qaDiv);
            current = index;
        }
    })
}

function addQA(event) {
    console.log('adding QA');
    if (current >= max_qas) {
        console.log('Max number of quick access links reached (10). Current QA not added.');
s    } else {
        event.preventDefault();

        // validate quick access input url (to work with href)
        var regex = /https?:\/\/.+/;
        if (!(regex.test(qaHref.value))) {
        alert("Please enter url starting with http or https");
        return;
        }
        // create qa div
        const qaDiv = document.createElement("div");
        qaDiv.classList.add("qa");

        const className = "st-icon-more";

        // set quick access name
        // const QAName = document.createElement("a");
        // QAName.className = "overlayed-title";
        // QAName.innerHTML = className;
        // qaDiv.appendChild(QAName);

        // create quick access
        const newQA = document.createElement("a");
        newQA.title = qaTitle.value;
        console.log(qaTitle.value);
        newQA.className = className;
        newQA.href = qaHref.value;
        qaDiv.appendChild(newQA);


        // save qa to local storage
        saveLocalQAs(qaHref.value, qaTitle.value, className);

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
        qaHref.value = 'https://';
    }
}

// if button for adding QA is clicked, show form to enter URL of new QA
function showAddQA() {
    var qaForm = document.querySelector(".qa-form");
    // if form is not showing, show it
    // if form is showing, collapse it
    if (qaForm.style.display === "none") {
        qaForm.style.display = "inline-flex";
        document.querySelector(".qa-title").focus();
        document.querySelector(".qa-href").value="https://";
        console.log("now showing");
    } else {
        qaForm.style.display = "none";
        console.log("now hidden");
    }
}

function deleteQA(e) {
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

function saveLocalQAs(url, title, className) {
    // check for local qa
    let qas;
    let titles;
    let classes;
    if (localStorage.getItem("qas") === null) {
        qas = [];
        titles = [];
        classes = [];
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
        titles = JSON.parse(localStorage.getItem("titles"));
        classes = JSON.parse(localStorage.getItem("classes"));
    }
    qas.push(url);
    titles.push(title);
    classes.push(className);
    localStorage.setItem("qas", JSON.stringify(qas));
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("classes", JSON.stringify(classes));
}

function removeLocalQA(qaUrl) {
    let qas;
    let titles;
    let classes;
    // get list of qas from storage
    if (localStorage.getItem("qas") === null) {
        qas = [];
        titles = [];
        classes = [];
    } else {
        qas = JSON.parse(localStorage.getItem("qas"));
        titles = JSON.parse(localStorage.getItem("titles"));
        classes = JSON.parse(localStorage.getItem("classes"));
    }

    // find and remove qa from stored urls, titles, and classes
    const qaHref = qaUrl.children[0].href; // href to find in list of qas
    for (i = 0; i<qas.length; i++) {
        var storedQA = qas[i];
        // if found, remove from list
        if (storedQA+'\/' === qaHref || storedQA === qaHref) {
            qas.splice(i, 1);
            titles.splice(i, 1);
            classes.splice(i, 1);
            break;
        }
    }

    // set storage
    localStorage.setItem("qas", JSON.stringify(qas));
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("classes", JSON.stringify(classes));
}
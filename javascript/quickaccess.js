// QUICK ACCESS
localStorage.clear();
const qa_max = 8; // maximum number of qas
let qa_count = 0; // current number of qas

// selector
const qaList = document.querySelector('.qa-list');
const qaTitle = document.querySelector('.qa-title');
const qaHref = document.querySelector('.qa-href');
const qaAddInput = document.querySelector('.qa-add-btn');
let qaButton = document.querySelector('.qa-button');
var editSelection = document.getElementById('check');


// event listeners
document.addEventListener('DOMContentLoaded', getQAs);
qaList.addEventListener('click', changeQA);
editSelection.addEventListener('click', editQAs);

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
        if (index >= qa_max) {
            console.log("max number of qas loaded");
            qa_count = qa_max;
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
            qa_count = index;
        }
    })
    console.log(qa_count);
    if (qa_count < qa_max-1) {
        qaButton = document.createElement("button");
        qaButton.classList.add("qa-button");
        qaButton.type = "submit";
        qaButton.innerHTML = '<i class="fa fa-plus"></i>';
        qaList.appendChild(qaButton);
        qaButton.addEventListener('click', showAddQA);
        let remaining = qa_max-1-qa_count;
        console.log("Can add "+ remaining.toString() + " quick access shortcut(s).");
    } else {
        console.log("Cannot add more shortcuts: max number of qa showing.");
    }
}

function addQA(event) {
    console.log('adding QA');
    if (event.target.index === -1) {
        return;
    }
    if (qa_count >= qa_max) {
        console.log('Max number of quick access links reached ('+qa_max+'). qa_count QA not added.');
    } else {
        event.preventDefault();

        // validate quick access input url (to work with href)
        const regex = /https?:\/\/.+/;
        if (!(regex.test(qaHref.value))) {
        alert("Please enter url starting with http or https");
        // return;
        }
        // create qa div
        const qaDiv = document.createElement("div");
        qaDiv.style="display: none;"
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
        console.log(qa_count);
        qa_count++;
        // window.location.reload(false);

        console.log(qa_count);

        // reset default value of input
        qaTitle.value = '';
        qaHref.value = 'https://';
    }
}

// if button for adding QA is clicked, show form to enter URL of new QA
function showAddQA() {
    let qaForm = document.querySelector(".qa-form");
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

function changeQA(e) {
    const item = e.target;
    console.log(item);
    // delete
    if (item.classList[0]  === "trash-btn") {
        const qa = item.parentElement;
        qa.classList.add("fall");
        removeLocalQA(qa);
        qa.addEventListener('transitionend', function() {
            qa.remove();
        });
    }
    // edit
    if (item.classList[0]  === "edit-btn") {
        const qa = item.parentElement;
        // qa.classList.add("fall");
        console.log("editing");
        editQA(qa);
    }
    // // submit new QA
    // // if (item.classLsit[Z])
    // qaAddInput.addEventListener('click', addQA);
    // // submit edited QA
    // qaAddInput.addEventListener('click', editQA);
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

function removeLocalQA(qa) {
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
    const qaHref = qa.children[0].href; // href to find in list of qas
    for (i = 0; i<qas.length; i++) {
        let storedQA = qas[i];
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
    window.location.reload(false);
}

function editQAs(event) {
    console.log('edit buttons clicked')
    event.preventDefault();
    if (editSelection.checked="") {
        let buttons = document.getElementsByClassName('trash-btn');
        let length = buttons.length;
        for (i = 0; i<length; i++) {
            var button = buttons.item(0);
            button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            button.classList.replace("trash-btn", "edit-btn");
        }
    } else if (editSelection.checked="checked") {
        let buttons = document.getElementsByClassName('edit-btn');
        let length = buttons.length;
        for (i = 0; i<length; i++) {
            var button = buttons.item(0);
            button.innerHTML = '<i class="fas fa-trash"></i>';
            button.classList.replace("edit-btn", "trash-btn");
        }
    }
}

function editQA(qa) {

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

    // find and show qa from stored urls, titles, and classes
    const qaHref = qa.children[0].href; // href to find in list of qas
    for (i = 0; i<qas.length; i++) {
        let storedQA = qas[i];
        // if found, show
        if (storedQA+'\/' === qaHref || storedQA === qaHref) {
            let qaForm = document.querySelector(".qa-form");
            qaForm.style.display = "inline-flex";

            let title = document.querySelector(".qa-title");
            let href = document.querySelector(".qa-href");
            title.focus();
            title.value = titles[i];
            href.value = qas[i];

            console.log("now showing");
            // qaAddInput.classList.add("qa-edit-btn");
            qaAddInput.addEventListener('click', editLocalQA);
            qaAddInput.index = i;
            console.log("qaAddInput.index: "+qaAddInput.index);
            break;
        }
    }
}

function editLocalQA(e) {
    console.log(e.target);
    // console.log("edited");
    // const index = e.index;
    // let qas;
    // let titles;
    // let classes;
    // // get list of qas from storage
    // if (localStorage.getItem("qas") === null) {
    //     qas = [];
    //     titles = [];
    //     classes = [];
    // } else {
    //     qas = JSON.parse(localStorage.getItem("qas"));
    //     titles = JSON.parse(localStorage.getItem("titles"));
    //     classes = JSON.parse(localStorage.getItem("classes"));
    // }

    // qas[index] = qaHref.value;
    // console.log(qaTitle.value);
    // titles[index] = qaTitle.value
    // classes[index] = "st-icon-more";

    // // set storage
    // localStorage.setItem("qas", JSON.stringify(qas));
    // localStorage.setItem("titles", JSON.stringify(titles));
    // localStorage.setItem("classes", JSON.stringify(classes));
    // // window.location.reload(false);
}
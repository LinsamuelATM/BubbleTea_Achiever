// QUICK ACCESS
const qa_max = 8; // maximum number of qas
let qa_count = 0; // current number of qas

// selector
const qaList = document.querySelector('.qa-list');
const qaTitle = document.querySelector('.qa-title');
const qaHref = document.querySelector('.qa-href');
const qaSubmit = document.getElementById('qa-submit');
let qaButton = document.querySelector('.qa-button');
var editSelection = document.getElementById('check');

// event listeners
document.addEventListener('DOMContentLoaded', getQAs);
qaList.addEventListener('click', changeQA);
qaSubmit.addEventListener('click', addQA);
editSelection.addEventListener('change', editQAs)

// set/load QAs to/from local storage and webpage
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
        console.log("Cannot add more shortcuts: max number of qa showing "+ (qa_count+1));
    }
}

// add QA
function addQA(event) {
    // check if this is an edit of an existing qa
    if (qaSubmit.classList.contains("qa-edit-btn")) {
        return;
    }

    console.log('adding QA');
    if (event.target.index === -1) {
        return;
    }

    // check if the max amount of qas have already been added, if not, add new QA
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

        const className = getIcon(qaHref.value);

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
        qa_count++;
        window.location.reload(false);

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
        document.querySelector(".qa-title").value="";
        document.querySelector(".qa-title").focus();
        document.querySelector(".qa-href").value="https://";
        console.log("qa-form now showing");
    } else {
        qaForm.style.display = "none";
        console.log("qa-form now hidden");
    }
}

// if edit button is checked/unchecked, change icons
function changeQA(e) {
    let item = e.target;
    // clicking on button's icon === clicking on button
    // if icon is clicked on, change target item to button
    if (item.classList[0] === "fas") {
        console.log("clicked on icon (changing to actual button)");
        item = item.parentElement;
    }
    // delete
    if (item.classList[0]  === "trash-btn") {
        console.log("trying to delete")
        const qa = item.parentElement;
        qa.classList.add("fall");
        removeLocalQA(qa);
        qa.addEventListener('transitionend', function() {
            qa.remove();
        });
    }
    // edit
    if (item.classList[0]  === "edit-btn") {
        console.log("trying to edit")
        const qa = item.parentElement;
        // qa.classList.add("fall");
        console.log("editing");
        retrieveLocalQA(qa);
        qaSubmit.classList.replace("qa-edit-btn", "qa-add-btn");
    }
}

// save new QA to local storage
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
    // push and store attributes of new QA
    qas.push(url);
    titles.push(title);
    classes.push(className);
    localStorage.setItem("qas", JSON.stringify(qas));
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("classes", JSON.stringify(classes));
}

// delete/remove QA details from local storage
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

// if user wants to edit, change icons to edit icon
// if user does not want to edit, change icons back to trash icon
function editQAs(event) {
    event.preventDefault();
    if (editSelection.editing==="false" || editSelection.editing===undefined) {
        // if user wants to edit
        console.log("trash -> edit")
        let buttons = document.getElementsByClassName('trash-btn');
        let length = buttons.length;
        for (i = 0; i<length; i++) {
            var button = buttons.item(0);
            button.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            button.classList.replace("trash-btn", "edit-btn");
        }
        editSelection.editing="true";
    } else if (editSelection.editing==="true") {
        // user does not want to edit
        console.log("trash <- edit")
        let qaForm = document.querySelector(".qa-form");
        qaForm.style.display = "none";
        let buttons = document.getElementsByClassName('edit-btn');
        let length = buttons.length;
        for (i = 0; i<length; i++) {
            var button = buttons.item(0);
            button.innerHTML = '<i class="fas fa-trash"></i>';
            button.classList.replace("edit-btn", "trash-btn");
        }
        editSelection.editing="false";
    }
}

// retrieve details/attributes of selected QA & load to form
// add event listener for saving edited QA
function retrieveLocalQA(qa) {
    // retrieve from local storage
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
        // if found, load to qa editing form and stop searching (break from loop)
        if (storedQA+'\/' === qaHref || storedQA === qaHref) {

            // load and show attributes of selected QA to qa-form
            let qaForm = document.querySelector(".qa-form");
            qaForm.style.display = "inline-flex";
            let title = document.querySelector(".qa-title");
            let href = document.querySelector(".qa-href");
            title.focus();
            title.value = titles[i];
            href.value = qas[i];

            // change class of submit button on form to reflect that
            // it is now an edit form (not an add form)
            if (qaSubmit.classList.contains("qa-add-btn")) {
                console.log("does not contain qa-edit-btn");
                qaSubmit.classList.replace("qa-add-btn", "qa-edit-btn");
            }
            // save index of selected QA for use when saving edited QA
            qaSubmit.index = i;
            // when form is submitted, save edited QA
            qaSubmit.addEventListener('click', saveEditedQA);
            break;
        }
    }
}

// save edited QA to local storage
function saveEditedQA(e) {
    event.preventDefault();
    const index = qaSubmit.index;
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
    // change QA attributes at index in storage
    qas[index] = qaHref.value;
    titles[index] = qaTitle.value;
    classes[index] = getIcon(qaHref.value);
    
    // set storage
    localStorage.setItem("qas", JSON.stringify(qas));
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("classes", JSON.stringify(classes));
    window.location.reload(false);
}

// try to match icon of url/title
// if no match is found, return generic icon
function getIcon(url) {
    switch (true) {
        case url.includes("amazon"):
            return "st-icon-amazon"
        case url.includes("google"):
            return "st-icon-google"
        case url.includes("facebook"):
            return "st-icon-facebook-alt"
        case url.includes("github"):
            return "st-icon-github"
        case url.includes("gmail"):
            return "st-icon-gmail"
        case url.includes("reddit"):
            return "st-icon-reddit"
        case url.includes("youtube"):
            return "st-icon-youtube"
        case url.includes("linkedin"):
            return "st-icon-linkedin"
        case url.includes("flickr"):
            return "st-icon-flickr"
        case url.includes("instagram"):
            return "st-icon-instagram"
        case url.includes("deviantart"):
            return "st-icon-deviantart"
        case url.incldues("pinterest"):
            return "st-icon-pinterest"
        case url.includes("yahoo"):
            return "st-icon-yahoo"
        case url.includes("yelp"):
            return "st-icon-yelp"
        case url.includes("imdb"):
            return "st-icon-imdb"
        default: 
            console.log("no matching icon, setting generic icon");
            return "st-icon-more";
    }
}
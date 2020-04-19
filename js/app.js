//If user add a note add it to the local storage.
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.style.backgroundColor = 'green';
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');

    //Restrict blank note..
    if (addTitle.value == "") {
        alert('Please Type Note Title blank note Title not allowed.')
        return;
    }
    if (addTxt.value == "") {
        alert('Please write Note blank note can\'t be added')
        return;
    }

    //Add notes in local storage.
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";

    //Add notes title in local storage.
    let notesTitle = localStorage.getItem('notesTitle');
    if (notesTitle == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(notesTitle);
    }
    titleObj.push(addTitle.value);
    localStorage.setItem('notesTitle', JSON.stringify(titleObj));
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

//Function to show elements from local storage.
function showNotes() {
    //Fetch notes from local storage.
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    };

    //Fetch Notes title from local storage.
    let notesTitle = localStorage.getItem('notesTitle');
    if (notesTitle == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(notesTitle);
    };


    let html = "";
    notesObj.forEach(function (element, index) {
        let today = new Date().toLocaleDateString()      
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                        <h5 class="card-title">${index+1}-${titleObj[index]}</h5>
                        <h6 class="card-title">Note Create Date:${today}</h6>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"
                         style="background-color:#9c4949">Delete Note</button>
                </div>
        </div>`;
    });
    
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
        notesElm.style.color = 'black';
    }
    else {
        notesElm.innerHTML = `<h4>Nothing to Show! Use "Add a Note" section above to add Notes</h4>`;
        notesElm.style.color = 'green';
    }
};

//Function for delete note from webpage.
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    };
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    
    
    let notesTitle = localStorage.getItem('notesTitle');
    if (notesTitle == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(notesTitle);
    };
    titleObj.splice(index, 1);
    localStorage.setItem('notesTitle', JSON.stringify(titleObj));
    // localStorage.removeItem('Name2');
    showNotes();
};

//Search notes based on text in search box.
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    showNotes();
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    let cardLength = noteCards.length;
    let i = 1;
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        cardTxt = cardTxt.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else if(i == cardLength){
            let notesElm = document.getElementById('notes');
            notesElm.innerHTML = `<h4>Oops! Nothing to Show For this Search Criteria!.</h4>`;
            notesElm.style.color = 'green';
        }        
        else {
            element.style.display = "none";            
            i += 1;
        };


        // console.log(cardTxt);
    })
});






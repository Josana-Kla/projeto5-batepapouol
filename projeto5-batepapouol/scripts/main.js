let userName = prompt("Seu lindo nome:");
let writeAMessage = document.querySelector('.message').value;


function returningAllFunctions() {
    gettingAllMessages();
    returningAllParticipants();
    postANewMessage();
}

returningAllFunctions();

//--------------------------------------------------------------------------------------------//

//Conecting with axios - GET
function gettingAllMessages() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(catchDates);
}

let answers = [];

function catchDates(answerDates) {
    console.log(answerDates.data);
    answers = answerDates.data;
    renderDatas();
}


let chat = document.querySelector('main');

function renderDatas() {
    chat.innerHTML = '';

    publicMessage();
    privateMessage();
}

function publicMessage() {
    for(let i = 0; i < answers.length; i++) {
        if(answers[i].type === "message") {
            chat.innerHTML += `
                <div class="chat-line white-chat ">
                    <span>
                        <i>(${answers[i].time})</i>
                        <strong>${answers[i].from}</strong> para <strong>${answers[i].to}</strong>: ${answers[i].text}
                    </span>
                </div>
            `
        }
    }
}

function privateMessage() {
    for(let i = 0; i < answers.length; i++) {
        if(answers[i].type === "private_message") {
            chat.innerHTML += `
                <div class="chat-line red-chat ">
                    <span>
                        <i>(${answers[i].time})</i> 
                        <strong>${answers[i].from}</strong> reservadamente para <strong>${answers[i].to}</strong>: ${answers[i].text}
                    </span>
                </div>
            `
        }
    }
}

//--------------------------------------------------------------------------------------------//

// GET names of who entered in the room

function returningAllParticipants() {
    let promiseGetParticipantNames = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseGetParticipantNames.then(catchNameParticipant);
}

let namesWhoEnter = [];

function catchNameParticipant(nameParticipant) {
    console.log(nameParticipant.data);
    namesWhoEnter = nameParticipant.data;
    renderNames();
}

function renderNames() {
    chat.innerHTML = '';
    for(let i = 0; i < namesWhoEnter.length; i++) {
        chat.innerHTML += `
            <div class="chat-line grey-chat">
                <span>
                    <i>(HORA)</i>
                    <strong>${namesWhoEnter[i].name}</strong> entra na sala...
                </span>
            </div>
        `
    }
}

//--------------------------------------------------------------------------------------------//

//POST with axios 
function postANewMessage() {
    let promisePost = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisePost.then(renderPosts);
}

function renderPosts() {
    iEnteredInTheRoom();
    postAMessage();
}

function iEnteredInTheRoom() {
    chat.innerHTML = '';
    chat.innerHTML += `
        <div class="chat-line grey-chat">
            <span>
                <i>(HORA)</i>
                <strong>${userName}</strong> entra na sala...
            </span>
        </div>
    `
}


function postAMessage() {
  const newMessage = {
    from: `${userName}`,
    to: "Todos",
    text: `${writeAMessage}`,
    type: "message" // ou "private_message" para o bônus   
  }
  console.log(newMessage);
}

// let answersParticipants;   //fazer o POST disso

// function statusEnterInTheRoom() {
//     const newChat = document.querySelector('main');

//     for(let i = 0; i < nameWhoEnter.length; i++) {
//         if(answers[i].type === "status") {
//             newChat.innerHTML += `
//                 <div class="chat-line grey-chat">
//                     <span>
//                             <i>(${answers[i].time})</i>
//                         <strong>${answersParticipants[i].name}</strong> entra na sala...
//                     </span>
//                 </div>
//             `
//         }

//     }
// }



//--------------------------------------------------------------------------------------------//

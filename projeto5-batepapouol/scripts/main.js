let userName = prompt("Seu lindo nome:"); 
let namesWhoEnter = [];
// let nameRepeat;
let answers = [];
let chat = document.querySelector('main');
let newMessage;
let writeAMessage = document.querySelector('.message').value;

// function lookRepeatName() {
//     for(let i = 0; i < namesWhoEnter.length; i++) {
//     if(userName === namesWhoEnter[i]) {
//         nameRepeat = namesWhoEnter[i];
//         return true;
//     } else {
//         return false;
//     }
// }};


function returningAllFunctions() {
    nameUser();
    gettingAllMessages();
    // returningAllParticipants();
    // userStatus();
    postANewMessage();
}

returningAllFunctions();

//--------------------------------------------------------------------------------------------//

function nameUser() {
    modelName = {
        name: userName
    }

    const promiseUserName = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", modelName);

    if(userName === "undefined") {
        alert("Escreva o seu nome!");
        window.location.reload();
    }
    //  else if (lookRepeatName === true) {
    //     alert(`Esse ${nameRepeat} já existe, tente novamente!`);
    //     window.location.reload();
    // }

    promiseUserName.then(nameOk);
    promiseUserName.catch(nameError);
}

function nameOk() {
    gettingAllMessages();
    setInterval(gettingAllMessages,5000);
}

function nameError() {
    console.log("Saiu da sala");
}


//--------------------------------------------------------------------------------------------//

//Conecting with axios - GET
function gettingAllMessages() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(catchDates);
    promise.catch(getMessageError);
}


function catchDates(answerDates) {
    console.log(answerDates.data);
    answers = answerDates.data;
    messagesTypes();
    setInterval(messagesTypes, 3000);
}

function messagesTypes() {
    for(let i = 0; i < answers.length; i++) {
        if(answers[i].type === "status") {
            chat.innerHTML += `
                <div class="chat-line grey-chat">
                    <span>
                        <i>(${answers[i].time})</i>
                        <strong>${answers[i].name}</strong> entra na sala...
                    </span>
                </div>
            ` 
        } else if(answers[i].type === "message") {
            chat.innerHTML += `
                <div class="chat-line white-chat ">
                    <span>
                        <i>(${answers[i].time})</i>
                        <strong>${answers[i].from}</strong> para <strong>${answers[i].to}</strong>: ${answers[i].text}
                    </span>
                </div>
            `
        } else if(answers[i].type === "private_message" && answers[i].to === userName) {
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

    const catchAllMessages = document.querySelectorAll(".chat-line");
    const catchLastMessage = catchAllMessages[catchAllMessages.length-1];
    catchLastMessage.scrollIntoView();
}

function getMessageError() {
    alert("Algo deu errado!");
    window.location.reload();
}

//--------------------------------------------------------------------------------------------//

// GET names of who entered in the room - Bônus

function returningAllParticipants() {
    let promiseGetParticipantNames = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promiseGetParticipantNames.then(catchNameParticipant);
}


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


//POST with axios - check status
function userStatus() {
    let promiseCheckStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status');
    promiseCheckStatus.then(checkStatusEnterInTheRoom);
    promiseCheckStatus.catch(userStatusError);
}

function checkStatusEnterInTheRoom() {
    console.log("Conectado");
}

function userStatusError() {
    alert("Sua conexão caiu, atualize a página novamente!");
}



//POST with axios - user entering in the room and send message

function postANewMessage() {
    newMessage = {
        from: `${userName}`,
        to: "Todos",
        text: `${writeAMessage}`,
        type: "message" // ou "private_message" para o bônus   
    }

    let myMessage;

    if(newMessage.type === "message") {
        myMessage.innerHTML += `
            <div class="chat-line white-chat ">
                <span>
                    <i>(17:03:10)</i>
                    <strong>${newMessage.from}</strong> para <strong>${newMessage.to}</strong>: ${newMessage.text}
                </span>
            </div>
        `
    }

    console.log(myMessage);

    let promisePost = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage);

    promisePost.then(postANewMessageSuccess);
    promisePost.catch(postANewMessageError);
}

function postANewMessageSuccess() {
    console.log("STATUS 200 - OK")
}

function postANewMessageError() {
    console.log("STATUS 400");
}


//--------------------------------------------------------------------------------------------//

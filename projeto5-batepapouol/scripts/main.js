//prompt("Seu lindo nome:");

let answers = [];

//Conecting with axios
let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
promise.then(catchDates);

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
                        <strong>${answers[i].from}</strong> para <strong>${answers[i].to}</strong>:
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
                        <strong>${answers[i].from}</strong> reservadamente para <strong>${answers[i].to}</strong>: 
                    </span>
                </div>
            `
        }
    }
}



// let answersParticipants;   fazer o POST disso

// function statusEnterInTheRoom() {
//     const newChat = document.querySelector('main');

//     if(answers[i].type === "status") {
//         newChat.innerHTML += `
//             <div class="chat-line grey-chat">
//                 <span>
//                     <i>(${answers[i].time})</i>
//                     <strong>${answersParticipants[i].name}</strong> entra na sala...
//                 </span>
//             </div>
//         `
//     }
// }
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask() {
    if(inputBox.value === ''){
        alert("You Have To Write Something, GoofyBall")
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = ""; 
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
function goToPage() {
    window.location.href = 'second.html';
}
showTask();


/*second page*/

// Function to send the message and get a response from OpenAI API
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return; // Prevent sending empty messages

    // Display user's message in the chat box
    appendMessage(userInput, 'user');

    // Call OpenAI API to get a response
    const response = await callOpenAIAPI(userInput);

    // Display AI's response in the chat box
    appendMessage(response, 'assistant');

    // Clear the input field
    document.getElementById('user-input').value = '';
}

// Function to append a message to the chat box
function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat
}

// Function to call OpenAI API
async function callOpenAIAPI(message) {
    const apiKey = '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';
    const assistantID = 'asst_YrPEdZRn8I1klNTGGk4CnHQD'; // Your assistant's ID
    const response = await fetch(`https://api.openai.com/v1/assistants/${asst_YrPEdZRn8I1klNTGGk4CnHQD}/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            input: { text: message }, // The user's message as input
            max_tokens: 150 // Limit on the number of tokens in the response
        })
    });

    const data = await response.json();
    return data.completion.text.trim(); // Return the AI's response
}

// Function to go back to the To-Do List page
function goBack() {
    window.location.href = 'index.html'; // Redirect to the To-Do List page
}

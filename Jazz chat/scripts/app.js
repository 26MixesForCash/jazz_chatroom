// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(error => console.log(error));
});

// update username
newNameForm.addEventListener('submit', event => {
    event.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    // show then hide update message
    updateMessage.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = ``, 3000);
});

// update the room
rooms.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(event.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// check local storage for username
const username = localStorage.username 
               ? localStorage.username 
               : 'Anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('music', username);



// get chats and render
chatroom.getChats(data => chatUI.render(data));
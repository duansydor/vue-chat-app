
<template>
  <div class="chat-container">
    <h2>Chat Room</h2>
    <div class="messages">
      <div>
        Este é um projeto criado com o objetivo de treinar algumas habilidades exigidas em uma vaga de front-end:
        <ul>
          <li>Websockets, Vuex, Vue Router</li>
        </ul>
      </div>
      <div v-for="message in messages" :key="message.id" :class="{'sent': isMessageFromCurrentUser(message), 'received': !isMessageFromCurrentUser(message)}">
        {{ message.text }}
      </div>
    </div>
  <div class="chat-input-container">
      <input v-model="newMessage" @keyup.enter="send" placeholder="Type a message...">
      <button @click="send">Send</button>
   </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newMessage: ""
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    currentUserID() {
      return this.$store.state.userID;
    }
  },
  methods: {
    isMessageFromCurrentUser(message) {
      return message.user === this.currentUserID;
    },
    send() {
  if (!this.newMessage.trim()) return; // Evitar enviar mensagens vazias

  // Adicionar a mensagem ao estado imediatamente como enviada
  //this.$store.commit('addMessage', { text: this.newMessage, type: 'sent' });

  // Enviar a mensagem para o servidor
  this.$store.dispatch('sendMessage', this.newMessage);

  // Limpar o campo de entrada
  this.newMessage = '';
},
  },
  created() {
    this.$store.dispatch('initializeWebSocket');
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
h2{
  text-align: center;
}
.messages{
  position: relative;
  overflow: auto;
  scrollbar-color: purple;
  right: 10px;
  padding-left: 25px;
  padding-right: 10px;
}
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: purple; 
  border-radius: 10px;
}
/* Chat room container */
.chat-container {
  position: fixed;
  background-color: rgba(128, 0, 128, 0.267);
  display: flex;
  flex-direction: column;
  min-height: 500px;
  max-height: 500px;
  width: auto;
  left: 10%;
  right: 10%;
  top:10%;
  margin: auto;
  border-radius: 10px;
}

/* Styling for sent and received messages */
.sent, .received {
  padding: 8px;
  border-radius: 8px;
  max-width: 60%;
  margin-bottom: 10px;
  word-break: break-word; /* Ensure long texts don't overflow */
}

.sent {
  background-color: #9B59B6; /* Purple shade for sent messages */
  color: white;
  margin-left: auto; /* Align right */
}

.received {
  background-color: #ECECEC; /* Light grey for received messages */
  color: black;
}

/* Fixed message input container */
.chat-input-container {
  margin-top: auto;
  width: 100%;
  height: fit-content;
  background-color: #8E44AD; /* Darker purple */
  padding: 10px 20px; /* Padding around input box and button */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between; /* Separate input and button */
}

input, button {
  border: none;
  padding: 10px;
  border-radius: 5px;
}

input {
  flex-grow: 1; /* Allow input to grow and fill space */
  margin-right: 10px; /* Space between input and button */
}

button {
  background-color: #9B59B6; /* Lighter purple, matching sent messages */
  color: white;
  cursor: pointer; /* Change cursor on hover */
}

button:hover {
  opacity: 0.9;
}
</style>


<template>
  <div>
    <h2>Chat Room</h2>

    <div v-for="message in messages" :key="message.id" :class="{'sent': isMessageFromCurrentUser(message), 'received': !isMessageFromCurrentUser(message)}">
      {{ message.text }}
    </div>
    <input v-model="newMessage" @keyup.enter="send" placeholder="Type a message...">
    <button @click="send">Send</button>
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
.sent {
  text-align: right;
  background-color: #DCF8C6; /* Light green background */
  padding: 8px;
  border-radius: 8px;
  margin: 4px;
  max-width: 60%;
  margin-left: auto; /* Push to the right */
}

.received {
  text-align: left;
  background-color: #ECECEC; /* Light grey background */
  padding: 8px;
  border-radius: 8px;
  margin: 4px;
  max-width: 60%;
}
</style>

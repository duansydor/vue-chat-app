import { createStore } from 'vuex';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
export default createStore({
    state: {
        messages: [],
        userID: uuidv4(),
        socket: null,
    },
    mutations: {
        addMessage(state, newMessage) {
            // Verifica se a mensagem já existe baseado no UUID
            state.messages.push(newMessage);
        },
        setSocket(state, socket) {
            state.socket = socket;
        },
    },
    actions: {
        initializeWebSocket({ commit }) {
            const socket = io("http://localhost:3000");

            socket.on("connect", () => {
                console.log("connected to websocket server");
            });

            socket.on("message", (msg) => {
                commit('addMessage', msg);
            });

            commit('setSocket', socket);
        },
        sendMessage({ state }, messageText) {
            const message = {
                id: uuidv4(), // Gera um UUID para a mensagem
                user: state.userID,
                text: messageText,
            };
            state.socket.emit("message", message);


            // Opcionalmente, adicione a mensagem ao estado aqui, se for necessário
            // Se o servidor retransmitir a mensagem ao cliente, isso pode não ser necessário
            //commit('addMessage', message);
        },
    },
});
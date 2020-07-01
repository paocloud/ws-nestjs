const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msgToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        }
    },
    created() {
        this.socketOptions = {
            transportOptions: {
              polling: {
                extraHeaders: {
                  Authorization: 'Bearer 1234', //'Bearer h93t4293t49jt34j9rferek...'
                }
              }
            }
         };
         this.socket = io.connect('http://localhost:4000/', this.socketOptions);
        //this.socket = io('http://localhost:4000')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})
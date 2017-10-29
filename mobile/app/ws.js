export class WS {
    permClosed = false
    isConnected = false
    socket = null
    partial = ''
    reconnectionTries = 0

    constructor(url, onMessage) {
        this.url = url
        this.onMessage = onMessage
        this.connect()
    }

    send = (data) => {
        let _msg = {
            message: data
        };
        let msg = JSON.stringify(_msg);
        this.socket.send(msg)
    }

    try_send = (data) => {
        if (this.isConnected) {
            this.send(data)
        } else {
            setTimeout(() => {
                this.try_send(data)
            }, 300)
        }
    }

    close = () => {
        this.socket.close()
        this.isConnected = false
        this.permClosed = true
        this.partial = ''
        this.reconnectionTries = 0
        console.debug('Socket closed')
    }

    connect = () => {
        this.reconnectionTries += 1
        if (this.socket !== null) {
            this.socket.close()
        }
        this.socket = new WebSocket(this.url)
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onclose = this.onclose
    }

    onopen = (event) => {
        this.isConnected = true
        this.reconnectionTries = 0
    }

    onmessage = (event) => {
        try {
            let data = JSON.parse(this.partial + event.data)
            this.partial = ''
            this.onMessage(data)
        } catch (err) {
            this.partial += event.data
        }
    }

    onclose = () => {
        this.socket = null
        this.isConnected = false
        if (!this.permClosed) {
            this.reconnect()
        }
    }

    reconnect = () => {
        let timeout = Math.pow(2, this.reconnectionTries) / 2
        setTimeout(this.connect, timeout)
    }

}
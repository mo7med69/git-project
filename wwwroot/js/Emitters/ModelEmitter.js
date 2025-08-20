// Create an event emitter object
const eventEmitter = {
    events: {},
    on(event, callback) {
        console.log(event, callback);
        if (!this.events[event]) {

            this.events[event] = [];
        }
        this.events[event].push(callback);
        console.log(this.events);

    },
    emit(event, data) {
        console.log(this.events, data);
        if (this.events[event]) {
            console.log(this.events[event], data);

            this.events[event].forEach(callback => callback(data));
        }
    },
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
};




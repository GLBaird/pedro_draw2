
export const Events = {
    clearCanvas: 'clear_canvas',
    loadFile: 'load_file',
    saveFile: 'save_file'
};

class AppEvents {
    static shared() {
        if (!this.__instance) {
            this.__instance = new AppEvents();
        }

        return this.__instance;
    }

    /** @private */
    constructor() {
        this._listeners = {};
    }

    addEventListener(type, listener) {
        const listeners = this._listeners[type] || [];
        listeners.push(listener);
        this._listeners[type] = listeners;
    }

    removeEventListener(type, listener) {
        const listeners = this._listeners[type] || [];
        const index = listeners.indexOf(listeners.filter(stored => stored === listener).pop());
        if (index >= 0) listeners.splice(index, 1);
    }

    dispatchEvent(event) {
        const listeners = this._listeners[event.type] || [];
        listeners.forEach(listener => listener(event));
    }
}

export default AppEvents;

class CounterController {
    counter = 0;
    counterLimit = 0;
    isCounting = false;
    updateMessageId = null;

    startCounter(counterLimit) {
        if(!this.isCounting){
            this.counter = 0;
            this.counterLimit = counterLimit;
            this.isCounting = true;
        }
    }

    progressCounter() {
        if(this.isCounting) {
            this.counter += 1;
            console.log(this.counter);
            if(this.counter == this.counterLimit) {
                this.endCounter();
            }
        }
    }

    endCounter() {
        this.isCounting = false;
    }
    
    setUpdateMessageId(updateMessageId) {
        this.updateMessageId = updateMessageId;
    }
    getUpdateMessageId() {
        return this.updateMessageId;
    }

    getCounter() {
        return this.counter;
    }

    getIsCounting() {
        return this.isCounting;
    }
}

module.exports = CounterController;
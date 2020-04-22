class Identity {
    constructor() {
        this.accountId = this.calculatIdentity();
    }

    calculatIdentity(){
        return Math.floor(Math.random()*90000000) + 10000000;
    }
}

module.exports = Identity;
const Identity = require('./index');
const AccountTable = require('../table');

class IdentityEngine {
    constructor() {
        this.accountId = null;
    }

    start() {
        this.newIdentity();
    }

    newIdentity(){
        const accountId = new Identity();

        // this will create an infinite loop if all the IDs are taken, consider breaking the loop if there are 40,320 accounts.
        AccountTable.getAccountId(accountId)
            .then(({ accountNumber }) => {
                console.log(accountNumber);
                if (accountNumber === 'valid') {
                    this.accountId = accountId;
                } else {
                    this.newIdentity();
                }
            })
            .catch(error => console.error(error));
    }
}

module.exports = IdentityEngine;
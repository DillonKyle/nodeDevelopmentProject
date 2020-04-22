const uuid = require('uuid/v4');
const { hash } = require('./hasher');
const AccountTable = require('./table');

const SEPARATOR = '|';

class Session {
    constructor({ username }) {
        this.username = username;
        this.id = uuid();
    }

    toString() {
        const {username, id } = this;
        return Session.sessionString({ username, id });
    }

    static parse(sessionString) {
        const sessionData = sessionString.split(SEPARATOR);

        return {
            username: sessionData[0],
            id: sessionData[1],
            sessionId: sessionData[2]
        };
    }

    static verify(sessionString) {
        const {username, id, sessionHash } = Session.parse(sessionString);
        const accountData = Session.accountData({ username, id });

        return hash(accountData) === sessionHash;
    }

    static accountData({ username, id }) {
        return `${username}${SEPARATOR}${id}`;
    }

    static sessionString({ username, id }) {
        const accountData = Session.accountData({ username, id });

        return `${accountData}${SEPARATOR}${hash(accountData)}`;
    }
}

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if(sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId});

            setSessionCookie({ sessionString, res });

            resolve({ message: 'session restored' });
        } else {
            session = new Session({ username });
            sessionString = session.toString();
            AccountTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
            .then(() => {
                setSessionCookie({ sessionString, res });

                resolve({ message: 'session created' });
            })
            .catch(error => reject(error));
        }
    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,
        httpOnly: true
    });
}

module.exports = { 
    setSession: setSession,
    Session: Session
};
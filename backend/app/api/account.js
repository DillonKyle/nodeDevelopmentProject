const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/hasher');
const IdentityEngine = require('../account/accountId/engine');
const { Session }= require('../account/session');
const { setSession } = require('../account/session');

const router = new Router();
const engine = new IdentityEngine();

// This post will Hash UserName and Password and generate a random 8 digit account number
router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    engine.start();

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    //this call is known to have a delayed start as the engine starts up, it should not cause an issue when the login page is implemented
    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        const accountId = engine.accountId.accountId;
        console.log('Account ID:', accountId);
        if (!account) {
            return AccountTable.storeAccount({ accountId, usernameHash, passwordHash, currentDate })
        } else {
            const error = new Error('this username is unavailable');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(() => res.json({ message: 'success!'}))
    .catch(error => next(error));

});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
            if (account && account.passwordHash === hash(password)) {
                const { sessionId } = account;
                return setSession({ username, res, sessionId})
            } else {
                const error = new Error('Invalid username and password');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(({ message }) => res.json({ message }))
        .catch(error => next(error));
})

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    }).then(() => {
        res.clearCookie('sessionString');

        res.json({ message: 'Successful logout'});
    }).catch(error => next(error));
});

module.exports = router;
const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/hasher');
const IdentityEngine = require('../account/accountId/engine');
const Session= require('../account/session');
const { authenticatedAccount, setSession } = require('./helper');

const router = new Router();
const engine = new IdentityEngine();

// This post will Hash UserName and Password and generate a random 8 digit account number
router.post('/signup', (req, res, next) => {
    const { usernameNew, passwordNew, passwordConfNew, email } = req.body;
    const usernameHash = hash(usernameNew);
    const passwordHash = hash(passwordNew);

    engine.start();

    function promiseTimeout (time) {
        return new Promise(function(resolve,reject){
          setTimeout(function(){resolve(time);},time);
        });
      };

    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    //this call is known to have a delayed start as the engine starts up, it should not cause an issue when the login page is implemented
    AccountTable.getAccount({ usernameHash })
    .then(function() {
        return promiseTimeout(750)
    })
    .then(({ account }) => {
        const accountId = engine.accountId.accountId;
        console.log('Account ID:', accountId);
        if (!account || passwordNew === passwordConfNew) {
            return AccountTable.storeAccount({ accountId, usernameHash, passwordHash, currentDate, email })
        } else if (passwordNew != passwordConfNew) {
            const error = new Error('passwords do not match')
            error.statusCode = 409;
            throw error;
        } else {
            const error = new Error('this username is unavailable');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(() => res.json({ message: 'Account Created!'}))
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

router.get('/authenticated', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
     .then(({ authenticated }) => res.json({ authenticated }))
     .catch(error => next(error));
 });

router.get('/info', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account, username }) => {
            res.json({ info: {accountId: account.accountId, username } });
        })
        .catch(error => next(error));
});
 
module.exports = router;
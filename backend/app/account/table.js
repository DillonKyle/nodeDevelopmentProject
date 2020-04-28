const pool = require('../../databasePool');

class AccountTable {

    static storeAccount({ accountId, usernameHash, passwordHash, currentDate }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO accounts("accountId", "usernameHash", "passwordHash", "dateCreated")
                VALUES($1, $2, $3, $4)`,
                [accountId, usernameHash, passwordHash, currentDate],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            );
        });
    }

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, "passwordHash", "sessionId", "accountId" FROM accounts
                WHERE "usernameHash" = $1`,
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ account: response.rows[0] });
                }
            );
        });
    }

    static getAccountId({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, "usernameHash", "passwordHash" FROM accounts
                WHERE "accountId" =$1`,
                [accountId],
                (error, response) => {
                    if (error) return reject(error);

                    if (response.rows[0]) {
                        resolve({ accountNumber: 'invalid' });
                    } else {
                        resolve({ accountNumber: 'valid' });
                    }
                }
            );
        });
    }

    static updateSessionId({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'UPDATE accounts SET "sessionId" = $1 WHERE "usernameHash" = $2',
                [ sessionId, usernameHash ],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        })
    }
}

module.exports = AccountTable;
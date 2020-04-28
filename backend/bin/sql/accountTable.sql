CREATE TABLE accounts(
    id  SERIAL PRIMARY KEY,
    "usernameHash" CHARACTER(64),
    "passwordHash" CHARACTER(64) NOT NULL,
    "accountId" CHARACTER(8),
    "email" CHARACTER(150),
    "sessionId" CHARACTER(36),
    "dateCreated" TIMESTAMP NOT NULL
);
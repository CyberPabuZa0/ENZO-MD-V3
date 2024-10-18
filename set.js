const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1sOXh3WFJvYTFTd2NBeVZydU9VWVoreDZRRGxKVWlobnp6Y0loNDZsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFQ0ZVhTY2c3ZWdSa0pPNzM1Tjl4NnQzbDZHb2tLdElsTXRQWFZlbTF4cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRkEzUEEvVVQxcmVhSjJ0b0k0R1htdlB0NzNOS0ZWYnJVWDJoc1Y5azBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoQ2NNVEpCcXFHSUs4K3FHUytSTGQ5VUtvZFVDdHIzZjBBcFJiRnZXcjBrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZEaU1FMm9CQ05kdEpzYXliWUkzZXlySzdTWWVxVkRWdExtUEtRd1BHbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhGWlIxdXFwN29RS20xMmU1MzdXMVJKY1JOTStFVFhKbnh6TFFySU1XMkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUR5TkRpays1eGVySm0rcndFSDQ5ZDYwUmJwdDN6R0syME5oUWhlMHkzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3lDN3pzZFB5QlRuUFVtY1Zyc3pVZ01TYlJkdllHaVRuTmRHVFh6Vkhsaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZseVV5SGpuaUpPanZaRkdGSkpoUDd0K2tlVXIvQzVHbVhmVmZmOWZrbi9LcGR1NjZBdDBPRkVzOGVIYlNRRDRidHE0STltT1JVWG1HM0s5VFp6RWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ4LCJhZHZTZWNyZXRLZXkiOiJmS1NwYnlxSTAzRkFkVWRnYVJNbU1JTndqZi9yQjZnaDFDMjFjUGxUeFVNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzY0NDcwMzEwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVFQjg3RjQxQUM2QjBFNzFDOTgzMEY3RUE0NzdERDkzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjkyNjAxMTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjNyRUpEYnNoUWNXVnJaazRUZHN5YWciLCJwaG9uZUlkIjoiOGVmODY5ZDctZTRjZS00MDE1LWE0ZjctMjY3OTgzMjYyYzhjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx6Q3FWNU5tWVdrMFJ2WWtoUmNTWllsdjZEST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqd01SOXE5L1pTVmJVMjFtbUNkMVg4U0hGUDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRjMyS1JMQjQiLCJtZSI6eyJpZCI6Ijk0NzY0NDcwMzEwOjEyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ii4uLi4uLi4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0kvZDJWQVF3ZFRKdUFZWUJDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5pWEtvaldxb1ludTQxUlIvMTh0YTB6YjV3cWdJVnVVOXRRWUpHckx5d2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImlsVDdTakNEZUZaR1hNRXh1RmdmOUF1VDJseUtWNkt1V3A0QnYrUU9Gb1pwTEd3RTNJdmRiYUxqK1d2cnVlS0x6R0Y4alJmNGZza2Vna1ZpOVAvSEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0NmlJQUlPWVVpbTU4alRoVjZvdWZ3cFg4S3ZkaHBhVmE5bkVNajJwWWFwWi9aTEVuNk1maisyQnJwUmNJbFpzczBYUDZjQ0p0WlZ2WlVDMXl1S01qZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzY0NDcwMzEwOjEyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRZbHlxSTFxcUdKN3VOVVVmOWZMV3RNMitjS29DRmJsUGJVR0NScXk4c0gifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkyNjAxMTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3ZWIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

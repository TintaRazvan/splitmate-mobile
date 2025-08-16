import * as SQLite from 'expo-sqlite';

// Deschidem baza de date (sau o creăm dacă nu există)
const db = SQLite.openDatabase('splitmate.db');

// Funcție pentru a crea tabelele necesare
export const initDB = () => {
  db.transaction(tx => {
    // Tabel pentru prieteni
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS friends (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );`
    );

    // Tabel pentru grupuri
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );`
    );

    // Tabel pentru cheltuieli (bills)
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS bills (
        id INTEGER PRIMARY KEY NOT NULL,
        group_id INTEGER,
        friend_id INTEGER,
        amount REAL NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        FOREIGN KEY(group_id) REFERENCES groups(id),
        FOREIGN KEY(friend_id) REFERENCES friends(id)
      );`
    );

    console.log("Database initialized!");
  });
};

// Funcție pentru a adăuga un bill
export const addBill = (groupId, friendId, amount, description) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO bills (group_id, friend_id, amount, description, date) VALUES (?, ?, ?, ?, ?)',
      [groupId, friendId, amount, description, new Date().toISOString()],
      (_, result) => {
        console.log("Bill added:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting bill", error);
      }
    );
  });
};

// Funcție pentru a obține toate bill-urile
export const getBills = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM bills ORDER BY date DESC',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (_, error) => {
        console.error("Error fetching bills", error);
      }
    );
  });
};

// Exportăm baza de date pentru alte operații
export default db;

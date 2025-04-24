import Surreal from 'surrealdb';

const db = new Surreal();
await db.connect("wss://singingbowl-06b5segoa5q4bf8n4aipu73708.aws-euw1.surreal.cloud", {
	namespace: "app",
	database: "main",

    auth: {
        username: 'root',
        password: 'root'
    }
});

export default db;
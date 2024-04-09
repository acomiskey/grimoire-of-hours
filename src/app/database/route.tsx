const db = require("better-sqlite3")('src/app/database/grimoire.db');

export async function GET() {
    const result = db.prepare("SELECT * FROM books").get();
    return Response.json(JSON.stringify(result));
}
const db = require("better-sqlite3")('src/app/database/grimoire.db');

db.prepare(`CREATE TABLE IF NOT EXISTS principles (
    name STRING PRIMARY KEY
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS aspects (
    name STRING PRIMARY KEY
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS wisdoms (
    name STRING PRIMARY KEY
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS skills (
    name STRING PRIMARY KEY,
    level NUMBER DEFAULT 1,
    language BOOLEAN DEFAULT 0,
    chandlery BOOLEAN DEFAULT 0,
    primary STRING,
    secondary STRING,
    FOREIGN KEY(primary) REFERENCES principles(name),
    FOREIGN KEY(secondary) REFERENCES principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS elements (
    name STRING PRIMARY KEY,
    level NUMBER DEFAULT 1,
    quantity NUMBER DEFAULT 1
    primary STRING,
    secondary STRING,
    tertiary STRING,
    FOREIGN KEY (primary) REFERENCES principles(name),
    FOREIGN KEY (secondary) REFERENCES princples(name),
    FOREIGN KEY (tertiary) REFERENCES principles (name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS books (
    title STRING PRIMARY KEY,
    author STRING,
    principle STRING,
    level NUMBER,
    solved BOOLEAN DEFAULT 0,
    language STRING,
    description STRING,
    opening STRING,
    closing STRING,
    period STRING,
    skill STRING,
    memory STRING,
    location STRING,
    FOREIGN KEY(memory) REFERENCES memories(name),
    FOREIGN KEY(principle) REFERENCE principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS memories (
    name STRING PRIMARY KEY,
    persistent BOOLEAN DEFAULT 0,
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS memory_principles (
    memory_name STRING,
    principle STRING
    FOREIGN KEY (memory_name) REFERENCES memories(name),
    FOREIGN KEY (principle) REFERENCES principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS memory_wisdoms (
    memory_name STRING,
    wisdom_name STRING,
    FOREIGN KEY (memory_name) REFERENCES memories(name),
    FOREIGN KEY (wisdom_name) REFERENCES wisdoms(name)
)`)

db.prepare(`CREATE TABLE IF NOT EXISTS components (
    name STRING PRIMARY KEY,
    stock NUMBER DEFAULT 0
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS component_principles (
    component_name STRING,
    principle STRING,
    FOREIGN KEY (component_name) REFERENCES components(name),
    FOREIGN KEY (principle) REFERENCES principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS components_aspects (
    component_name STRING,
    aspect_name STRING,
    FOREIGN KEY (component_name) REFERENCES components(name),
    FOREIGN KEY (aspect_name) REFERENCES aspects(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS workstations (
    name STRING PRIMARY KEY,
    location STRING
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS workstation_principles (
    workstation_name STRING,
    principle_name STRING,
    FOREIGN KEY (workstation_name) REFERENCES workstations(name),
    FOREIGN KEY (principle_name) REFERENCES principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS workstation_aspects (
    workstation_name STRING,
    aspect_name STRING,
    slot_name STRING,
    FOREIGN KEY (workstation_name) REFERENCES workstations(name),
    FOREIGN KEY (aspect_name) REFERENCES aspects(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS workstation_wisdoms (
    workstation_name STRING,
    wisdom_name STRING,
    FOREIGN KEY (workstation_name) REFERENCES workstations(name),
    FOREIGN KEY (wisdom_name) REFERENCES wisdoms(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS recipes (
    id NUMBER PRIMARY KEY,
    product STRING,
    principle STRING,
    level NUMBER,
    required_aspect STRING,
    required_component STRING,
    FOREIGN KEY (product) REFERENCES components(name),
    FOREIGN KEY (principle) REFERENCES principles(name)
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS recipe_skills (
    recipe_id NUMBER,
    skill_name STRING,
    FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    FOREIGN KEY (skill_name) REFERENCES skills(name)
)`).run();

export async function GET() {
    const result = db.prepare("SELECT * FROM books").get();
    return Response.json(JSON.stringify(result));
}
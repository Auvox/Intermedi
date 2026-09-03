import db from "../database/database.mjs";

export function cadastrar(data) {
  const { nomeFarmacia, cnesFarmacia, telFarmacia } = data;



  const stmt = db.prepare(/*sql*/ `
    INSERT OR IGNORE INTO "tbFarmacia" 
        ("nomeFarmacia", "cnesFarmacia", "telFarmacia")
    VALUES 
        (?, ?, ?)
    `);

 
  const result = stmt.run(
    nomeFarmacia,
    cnesFarmacia,
    telFarmacia
  );

  return {
    result
  };
}

export function consultar() {
  return
}
// stak
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){


    //Create is Table
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT

        );
    `)

/* ========================================================= */
    //Insert 
  /*   const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
   `

   const values = [

    "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    "Curso de Programação",
    "Estudo",
    "Ele é como árvoreJr 17.8 plantada junto a    corrente de águas, que, no devido tempo, dá o seu fruto, e cuja folhagem não murcha; e tudo quanto ele faz será bem-sucedido.",
    "https://www.rocketseat.com.br"
   ]

    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })
 */
/* ==========================================================*/
    //Delete
/*     db.run(`DELETE FROM ideas WHERE id = ?`,[1], function(err){
        if (err) return console.log(err)

        console.log("Registro Deletado com Sucesso!", this)
    }) */

/* ========================================================= */
 /*    // Select
    db.all(`SELECT * FROM ideas`,function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    }) */



})

module.exports = db 
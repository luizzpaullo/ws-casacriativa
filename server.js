//Install npm, express, nodemom para criar o servidor
const express = require("express")
const server = express()

const db = require("./db")




//config arquivos estayicos (css,scripts e imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// config nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//criar a rota
//ROTA PAGINA INDEX
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            return res.send("ATENÇÃO: Erro de Conexão com o Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
        //return res.sendFile(__dirname + "/index.html")
        return res.render("index.html", { ideas: lastIdeas })
    })
})

//ROTA PAG IDEIAS
server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("ATENÇÃO: Erro de Conexão com o Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas })

    })


})

//ROTA EM POST
server.post("/", function (req, res) {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
   `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("ATENÇÃO: Erro de Conexão com o Banco de Dados!")
        }

        return res.redirect("/ideias")
    })


})

//config servidor na porta 3000
server.listen(3000)


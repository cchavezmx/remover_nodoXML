require('dotenv').config()
const express = require("express")
const app = express()
const path = require('path')
const PORT = process.env.PORT
const fetch = require('node-fetch-commonjs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// setear una carpeta
app.use(express.static(path.join(__dirname, '/public')))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(() => console.log("Hola mundo"))
app.get("/", function(req, res){
  res.render('index')
})

const URL = process.env.CONTADOR_URL
const insertContador = async (agent, contador) => {
  
  const insert = new Promise((resolve) => {
    resolve(
      fetch(URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agent: agent, contador: contador })
      })
    )
  })

  const response = await insert
  .then(res => res)
  return response

}


app.post("/insertCount", async({ body }, res) => {  
  try {
    const response = await insertContador(body.agent, body.contador)
    if (response) return res.status(200).json({ message: 'Done' })
  } catch (error) {
    
  }
})

// para crear un nuevo directorio?
// app.use(express.static(path.join(__dirname,'public')))

// segunda parte de la explicacion
// app.get('/', (req, res) => {
//   res.render('')
// })
// definir rutas fuera del directorio
// app.use(require('./views'))

app.listen(PORT, () => console.log(`Lisent on port ${PORT}`) )
const express = require("express")
const app = express()
const path = require('path')
const PORT = 3001

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

// para crear un nuevo directorio?
// app.use(express.static(path.join(__dirname,'public')))

// segunda parte de la explicacion
// app.get('/', (req, res) => {
//   res.render('')
// })
// definir rutas fuera del directorio
// app.use(require('./views'))

app.listen(PORT, () => console.log(`Lisent on port ${PORT}`) )
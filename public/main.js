const h1 = document.querySelector('h1')
const btn = document.querySelector('button')
const input = document.querySelector('input')
const error = document.querySelector("#error")

let userAgent
addEventListener('load', () => {
  userAgent = window.navigator.userAgent  
})

const removeNode = async (file) => {
  
  const reader = new FileReader()
  reader.readAsText(file)

  reader.onload = () => {    
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(reader.result, "text/xml")

    let xmlString = new XMLSerializer().serializeToString(xmlDoc)
    xmlString = xmlString.replace(/<tfd:TimbreFiscalDigital.*?>/g, '')
    xmlString = xmlString.replace(/<\/tfd:TimbreFiscalDigital>/g, '')
      
      // download xmlString to xml file
      const blob = new Blob([xmlString], { type: 'text/xml' })
      const url = URL.createObjectURL(blob)

      // se crea un element link 
      const a = document.createElement('a')
      a.href = url
      a.download = `${file.name}__SIN_NODO.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
  
  }
}


/**
 * 
 * @param {string} file 
 */

const ocrImage = async (file) => {

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {

      console.log('ocrImage')
      await Tesseract.recognize(
        reader.result,
        'eng',
        { logger: m => console.log(m) }
      )
        .then(({ data: { text } }) => {
          console.log(text)
          
        })

    }

  
}

// buton de accion 
btn.addEventListener('click', async () => {   

  if (error.innerHTML !== ''){
    error.innerHTML = ''
  }
  // input multiple files map
  const files = Array.from(input.files)
  
  files.forEach( async(file) => {   
      console.log(file)  

      if (file.type.startsWith('image')) {
        console.log('es una imagen')
        ocrImage(file)
        
      } else if (file.type === 'text/xml') {
        await Promise.all(files.map(file => removeNode(file)))

      } else {         
          error.innerHTML = `<p>${file.name} no es un archivo valido, solo se permiten PDF y XML</p>`
      }
  })

  fetch("/insertCount", {
    body: JSON.stringify({ agent: userAgent, contador: file.files.length }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => res)

})
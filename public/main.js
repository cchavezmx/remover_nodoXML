
const h1 = document.querySelector('h1')
const btn = document.querySelector('button')
const input = document.querySelector('input')


btn.addEventListener('click', async () => {    
  // input multiple files map
  const files = Array.from(input.files)
  await Promise.all(files.map(file => removeNode(file)))

})


input.addEventListener('change', () => {
  // get data array from input
  console.log(JSON.stringify(input.files))
})

const removeNode = async (file) => {
  // parse xml remove tfd:TimbreFiscalDigital and return file xml 
  // get data array from input
  const reader = new FileReader()
  reader.readAsText(file)

  reader.onload = () => {
    console.log(reader.result)
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(reader.result, "text/xml")

    let xmlString = new XMLSerializer().serializeToString(xmlDoc)
    xmlString = xmlString.replace(/<tfd:TimbreFiscalDigital.*?>/g, '')
      
      // download xmlString to xml file
      const blob = new Blob([xmlString], { type: 'text/xml' })
      const url = URL.createObjectURL(blob)

      // se crea un element link 
      const a = document.createElement('a')
      a.href = url
      a.download = `${input.files[0].name}__SIN_NODO.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
  
  }
}
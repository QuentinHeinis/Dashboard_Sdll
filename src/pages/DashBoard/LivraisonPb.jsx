import React, {useEffect, useState} from 'react'
import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';
import { DocumentDuplicateIcon, ExclamationIcon } from '@heroicons/react/outline';


const LivraisonPb = () => {
    const [ocr, setOcr] = useState('');
    const [Warning, setWarning] = useState('');
      let flip = true
      let temp = ''
      const copie = ( ) =>{
          let quantity = []
          let ean = []
          let texteCopie = ''
        ocr.split('').map((char)=>{
            if(char === ' ' || char === `\n`){
                console.log(temp)
                if(flip){
                    quantity.push(temp)
                }else{
                    ean.push(temp)
                }
                temp = ''
                
                flip = !flip
            }else{
                temp += char
            }
        })
        for (let i = 0; i < quantity.length; i++) {
            texteCopie += ean[i] + '\n' + 'Qte\n' + quantity[i] + '\n'
            // console.log(ean[i] + '\n' + 'Qte \n' + quantity[i] + '\n')
        }
        console.log(texteCopie)
        navigator.clipboard.writeText(texteCopie)
        alert(texteCopie)
      }
const getOcr = (image) =>{
    Tesseract.recognize(
        image,
        'eng',
        {  }
      ).then(({ data: { text } }) => {
        setOcr(text)
        setWarning('Vérifie le premier et dernier code EAN')
      })
}

useEffect(()=>{
let imageForm = document.getElementById('imageForm')
imageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    setOcr('Recognizing...')
    let image = URL.createObjectURL(e.target[0].files[0]);
    getOcr(image)
})
}, [])

return(
<>
<form id='imageForm' className='flex flex-col items-center border-2 border-main-rose min-w-fit w-1/3 mx-auto py-4 px-2 rounded-md mt-4'>
    <input id='imageInput' type="file" accept="image/png, image/jpeg" required/>
    <button>Lancer scan</button>
</form>
<div className='border-2 border-main-rose rounded-md w-4/5 md:w-1/2 px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
    {Warning.length>1 ? (<p className='flex mx-auto text-2xl items-center'>{Warning} <ExclamationIcon className='h-10 fill-orange-500'/></p>) : (<p>{Warning}</p>)}
    <div className='flex w-full items-center justify-evenly'>
        <h1>Invent01</h1>
        <DocumentDuplicateIcon onClick={copie}className="hover:cursor-pointer h-6"/>
    </div>
    <div>{ocr.split('\n').map(item=>(<p>{item}</p>))}</div>
</div>
</>
)
}

export default LivraisonPb

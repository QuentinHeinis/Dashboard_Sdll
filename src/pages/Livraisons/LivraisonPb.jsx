import React, {useEffect, useState} from 'react'
import { createWorker } from 'tesseract.js';
import image from '../../images/full.png'
import Tesseract from 'tesseract.js';
import { DocumentDuplicateIcon, ExclamationIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';


const LivraisonPb = () => {
    const [ocr, setOcr] = useState('');
    const [Warning, setWarning] = useState('');
    const [importEanList, setImportEanList] = useState([]);
    const [importQuantityList, setImportQuantityList] = useState([]);
      let flip = true
      let temp = ''
      const copie = ( ) =>{
        let texteCopie = ''
        for (let i = 0; i < importEanList.length; i++) {
            texteCopie += importEanList[i] + '\n' + 'Qte\n' + importQuantityList[i] + '\n'
        }
        console.log(texteCopie)
        navigator.clipboard.writeText(texteCopie)
        alert(texteCopie)
    }
let tempOcr = ""
const getOcr = async(image) =>{
    await Tesseract.recognize(
        image,
        'eng',
        {  }
      ).then(async ({ data: { text } }) => {
        tempOcr = text
        setWarning('Vérifie le premier et dernier code EAN')
        // console.log(tempOcr)
        setTimeout(1000)
      })
}
const [isAsk, setIsAsk] = useState(true);
const ask = () =>{
    setIsAsk(!isAsk)
}
let quantity = []
let ean = []

useEffect(()=>{
let imageForm = document.getElementById('imageForm')
imageForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    setOcr('Recognizing...')
    let image = URL.createObjectURL(e.target[0].files[0]);
    await getOcr(image)
    tempOcr.split('').map((char)=>{
        if(char.length>0){
            if(char === ' ' || char === `\n`){
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
        }
        setImportQuantityList([...quantity])
        setImportEanList([...ean])
    })

     quantity = []
     ean = []

})
}, [])

return(
<>
<h1 className='text-4xl text-center my-10 font-bold text-gray-700'>Livraison Petit Bateau ( image )</h1>

<div className="w-4/5 mx-auto">
    <form id='imageForm' className='flex flex-col items-center border-2 border-main-rose w-full mx-auto py-4 gap-2 px-2 rounded-md mt-4'>
        <label name="input" className='w-full relative  flex flex-col justify-center items-center gap-2  border-4 border-dashed cursor-pointer rounded-lg h-40 hover:bg-gray-200 hover:border-red-300'>
            <input id='imageInput' name='input' type="file" accept="image/png, image/jpeg" className='absolute top-0 left-0 bottom-0 cursor-pointer w-full ' required/>
            <p>Clique ou drag and drop le fichier</p>
            <p className='flex items-center gap-2'><ExclamationIcon className='fill-orange-300 h-6'/> Fichier image uniquement <ExclamationIcon className='fill-orange-300 h-6'/> </p>
        </label>
        <button className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50'>Lancer scan</button>
    </form>
    <div className='border-2 border-main-rose rounded-md w-full px-2  h-96  py-4 mt-3 mx-auto flex flex-col gap-2' >
        {Warning.length>1 ? (<p className='flex mx-auto text-2xl items-center'>{Warning} <ExclamationIcon className='h-10 fill-orange-500'/></p>) : (<p>{Warning}</p>)}
        <div className='flex w-full items-center justify-evenly'>
            <h1>Invent01</h1>
            <div>total code ean : {importEanList.length}</div>
            <DocumentDuplicateIcon onClick={copie}className="hover:cursor-pointer h-6"/>
        </div>
        <div className="flex gap-5 h-full overflow-y-auto">
            <div className='h-full'>{importEanList.map(item=>(<p>{item}</p>))}</div>
            <div>{importQuantityList.map(item=>(<p>{item}</p>))}</div>
        </div>
    </div>
</div>
    <div>
        {isAsk ? 
        (<div className='p-2 bg-main-rose flex h-fit w-fit rounded-full fixed bottom-10 right-10 hover:cursor-pointer' onClick={ask}>
            <QuestionMarkCircleIcon className='h-14 stroke-white'/>
        </div>)
        :
        (<div  className="fixed top-0 bottom-0 left-0 right-0 bg-slate-500 bg-opacity-75 z-50 flex items-center justify-center">
            <div className='absolute top-0 bottom-0 left-0 right-0' onClick={ask}></div>
            <div className='w-4/5 h-1/2 bg-white rounded-md relative py-10 px-5 flex gap-1 md:w-1/2'>
                <XIcon className='h-8 border-2 border-slate-400 rounded-full absolute top-1 right-1 hover:cursor-pointer' onClick={ask}/>
                <p className='overflow-auto'>
                    Assure toi que le scan comporte a gauche la quantité, a droite le code EAN, pour être sur que le scan lise bien les chiffres de la première et dernière ligne, assure toi qu'il y ai suffisamment de blanc au dessus de ces dites lignes. (cf. image de droite) <br/>
                    Une fois le scan terminer, fait une rapide vérification des codes EAN.<br/>
                    Le bouton pour copier le texte te le formate de la manière suivante : <br/>
                    xxxxxxxxxxxxx<br/>
                    Qte<br/>
                    x<br/>
                    xxxxxxxxxxxxx<br/>
                    Qte<br/>
                    x<br/>
                    <br/>
                    Il ne te reste qu'à créer un fichier txt, mettre I et le nom du magasin avant de copier le texte
                </p>
                <img src={image} alt="" />
            </div>
        </div>)}
    </div>
</>
)
}

export default LivraisonPb

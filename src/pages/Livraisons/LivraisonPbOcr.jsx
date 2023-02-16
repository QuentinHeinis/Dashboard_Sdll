import React, {useEffect, useState} from 'react'
import image from '../../images/txt.JPG'
import grille from '../../data/grilleMR.csv'
import { DocumentDuplicateIcon, ExclamationIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';


const LivraisonPbOcr = () => {
    const [importRefList, setImportRefList] = useState([]);
    const [importQuantityList, setImportQuantityList] = useState([]);
    const [Warning, setWarning] = useState('');
    let importRef = []
    let importEan = []
    let importQuantity = []
    const copie = ( ) =>{
        let texteCopie = ''
        for (let i = 0; i < importRefList.length; i++) {
            texteCopie += importRefList[i] + '\n' + 'Qte\n' + importQuantityList[i] + '\n'
        }
        console.log(texteCopie)
        navigator.clipboard.writeText(texteCopie)
        alert(texteCopie)
    }


const [isAsk, setIsAsk] = useState(true);
const ask = () =>{
  setIsAsk(!isAsk)
}

useEffect(()=>{
let imageForm = document.getElementById('imageForm')
imageForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  let file = URL.createObjectURL(e.target[0].files[0]);
  fetch(file)
  .then(response => response.text())
  .then((data) => {
      data = data.split('')
      let cleanData = []
      data.forEach(char=>{
          if(char == '0' || char == 1|| char == 2|| char == 3|| char == 4|| char == 5|| char == 6|| char == 7|| char == 8|| char == 9|| char == "\n"){
              cleanData.push(char)
            }
        })
        // console.log(cleanData)
      cleanData.join('').split('\n').forEach((item)=>{
            if(item === ""){
            }else{
                let ean = item.split('').reverse().slice(0, 13).reverse().join('')
                let q = item.split('').reverse().slice(13, item.length+1).reverse().join('')
                importRef.push(ean)
                importQuantity.push(q)
            }
      })
      setImportQuantityList([...importQuantity])
      setImportRefList([...importRef])
      importQuantity = []
      importRef = []
      importEan = []
      
  })
})
}, [])

return(
<>
<h1 className='text-4xl text-center my-10 font-bold text-gray-700'>Livraison Petit Bateau ( .txt )</h1>

<div className='w-4/5 mx-auto'>
<form id='imageForm' className='flex flex-col relative items-center border-2 border-main-rose w-full mx-auto py-4 gap-2 px-2 rounded-md mt-4'>
                <label name="text" className='w-full relative  flex flex-col justify-center items-center gap-2 border-4 border-dashed cursor-pointer rounded-lg h-40 hover:bg-gray-200 hover:border-red-300'>
                <input id='imageInput' type="file" name='text' accept=".txt" className='absolute top-0 left-0 bottom-0 cursor-pointer w-full '  required/>
                <p>Clique ou drag and drop le fichier</p>
                <p className='flex items-center gap-2'><ExclamationIcon className='fill-orange-300 h-6'/> Fichier .txt uniquement <ExclamationIcon className='fill-orange-300 h-6'/> </p>
                </label>
                <button className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50 w-fit'>Lancer traitement</button>
            </form>
    <div className="flex gap-5">
        <div className='border-2 border-main-rose rounded-md w-full h-96  px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
            {Warning.length>1 ? (<p className='flex mx-auto text-2xl items-center'>{Warning} <ExclamationIcon className='h-10 fill-orange-500'/></p>) : (<p>{Warning}</p>)}
            <div className='flex w-full items-center justify-evenly'>
                <h1>Invent01</h1>
                <div>total code ean : {importRefList.length}</div>
                <DocumentDuplicateIcon onClick={copie}className="hover:cursor-pointer h-6"/>
            </div>
            {/* <div>{ocr.split('\n').map(item=>(<p>{item}</p>))}</div> */}
            <div className="flex gap-5 h-full  overflow-y-auto">
            <div>{importRefList.map(item=>(<p>{item}</p>))}</div>
            <div>{importQuantityList.map(item=>(<p>{item}</p>))}</div>
            </div>
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
            <div className='w-4/5 h-1/2 bg-white rounded-md relative py-10 px-5 flex gap-1 md:w-1/2 overflow-y-scroll'>
                <XIcon className='h-8 border-2 border-slate-400 rounded-full absolute top-1 right-1 hover:cursor-pointer' onClick={ask}/>
                <p className='overflow-auto min-w-[200px]'>
                    Scanne le BL de Petit Bateau avec le cache fait pour. fait un ocr avec l'application de scan de l'imprimante en changeant le ppp a 600. Vérifie qu'il n'y ai pas d'erreur dans les codes et prix ( retour a la ligne involontaire, faute )
                    <br/>
                    Le bouton pour copier le texte te le formate de la manière suivante : 
                    <br/>
                    xxxxxxxxxxxxx<br/>
                    Qte<br/>
                    x<br/>
                    xxxxxxxxxxxxx<br/>
                    Qte<br/>
                    x<br/>
                    <br/>
                    Il ne te reste qu'à créer un fichier txt, mettre I et le nom du magasin avant de copier le texte
                </p>
            </div>
        </div>)}
    </div>
</>
)
}

export default LivraisonPbOcr

import React, {useEffect, useState} from 'react'
import image from '../../images/txt.JPG'
import grille from '../../data/grilleMR.csv'
import { DocumentDuplicateIcon, ExclamationIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/outline';


const LivraisonMR = () => {
    const [ocr, setOcr] = useState('');
    const [importRefList, setImportRefList] = useState([]);
    const [importEanList, setImportEanList] = useState([]);
    const [importQuantityList, setImportQuantityList] = useState([]);
    const [importErrorList, setImportErrorList] = useState([]);
    const [Warning, setWarning] = useState('');
    let flip = true
    let listeEan = []
    let listeRef = []
    let importRef = []
    let importEan = []
    let importQuantity = []
    let importError = []
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

  fetch(grille, {
      method: 'get',
      headers: {
          'content-type': 'text/csv;charset=UTF-8',
      }
  })
  .then(response=>response.text())
  .then(response => {
      response = response.split('\n')
      // console.log(response)
      response.forEach(line=>{
          // console.log(line)
          let flip = true
          line.split(';').forEach(item=> {
              if(flip){
                  listeRef.push(item)
              }else{
                  let cleanItem = item.split('\r')[0]
                  listeEan.push(cleanItem)
              }
              flip=!flip
          })
      })
      // console.log(listeEan, listeRef)
  })

const getGrilleMr =() =>{
}

const [isAsk, setIsAsk] = useState(true);
const ask = () =>{
  setIsAsk(!isAsk)
}

useEffect(()=>{
let imageForm = document.getElementById('imageForm')
imageForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  setOcr('Recognizing...')
  let file = URL.createObjectURL(e.target[0].files[0]);
  fetch(file)
  .then(response => response.text())
  .then((data) => {
      data = data.split('')
      let cleanData = []
      data.forEach(char=>{
          if(char == '0' || char == 1|| char == 2|| char == 3|| char == 4|| char == 5|| char == 6|| char == 7|| char == 8|| char == 9|| char == "\n" || char == ','){
              cleanData.push(char)
          }
      })

      setOcr(cleanData.join(''))
      cleanData.join('').split('\n').forEach((item)=>{
        if(item === ""){
        }else{
            if(listeRef.findIndex(ref=> ref === item.substring(0,6)) > 0 ){
                importRef.push(item.substring(0,6))
                importEan.push(listeEan[listeRef.findIndex(ref=> ref === item.substring(0,6))])
                importQuantity.push(item.substring(6).split(',')[0])
            }else{
                importError.push(item.substring(0,6))
            }
        }
      })
      setImportQuantityList([...importQuantity])
      setImportRefList([...importRef])
      setImportEanList([...importEan])
      setImportErrorList([...importError])
      importQuantity = []
      importRef = []
      importEan = []
      importError = []
      
  })
})
}, [])

return(
    <>
        <h1 className='text-4xl text-center my-10 font-bold text-gray-700'>Livraison Moulin Roty</h1>
        <div className="w-4/5 mx-auto">
 
            <form id='imageForm' className='flex flex-col relative items-center border-2 border-main-rose w-full mx-auto py-4 gap-2 px-2 rounded-md mt-4'>
                <label name="text" className='w-full relative  flex flex-col justify-center items-center gap-2  border-4 border-dashed cursor-pointer rounded-lg h-40 hover:bg-gray-200 hover:border-red-300'>
                <input id='imageInput' type="file" name='text' accept=".txt" className='absolute top-0 left-0 bottom-0 cursor-pointer w-full '  required/>
                <p>Clique ou drag and drop le fichier</p>
                <p className='flex items-center gap-2'><ExclamationIcon className='fill-orange-300 h-6'/> Fichier .txt uniquement <ExclamationIcon className='fill-orange-300 h-6'/> </p>
                </label>
                <button className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50 w-fit'>Lancer traitement</button>
            </form>
            <div className="flex gap-5 w-full">
                <div className='border-2 border-main-rose rounded-md h-96 w-2/3 px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
                    {Warning.length > 1 ? (<p className='flex mx-auto text-2xl items-center'>{Warning} <ExclamationIcon className='h-10 fill-orange-500' /></p>) : (<p>{Warning}</p>)}
                    <div className='flex w-full items-center justify-evenly'>
                        <h1>Invent01</h1>
                        <div>total code ean : {importEanList.length}</div>
                        <DocumentDuplicateIcon onClick={copie} className="hover:cursor-pointer h-6" />
                    </div>
                    {/* <div>{ocr.split('\n').map(item=>(<p>{item}</p>))}</div> */}
                    <div className="flex gap-5   overflow-y-auto">
                        <div>{importRefList.map(item => (<p>{item}</p>))}</div>
                        <div>{importQuantityList.map(item => (<p>{item}</p>))}</div>
                        <div>{importEanList.map(item => (<p>{item}</p>))}</div>
                    </div>
                </div>
                <div className='border-2 border-main-rose rounded-md w-1/3 px-2 py-4 mt-3 mx-auto flex flex-col gap-2' >
                    {Warning.length > 1 ? (<p className='flex mx-auto text-2xl items-center'>{Warning} <ExclamationIcon className='h-10 fill-orange-500' /></p>) : (<p>{Warning}</p>)}
                    <div className='flex w-full items-center justify-evenly'>
                        <h1>Ean non trouvé pour les refs :</h1>
                    </div>
                    <div className='flex gap-5'>
                        <div>{importErrorList.map(item => (<p>{item}</p>))}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {isAsk ?
                (<div className='p-2 bg-main-rose flex h-fit w-fit rounded-full fixed bottom-10 right-10 hover:cursor-pointer' onClick={ask}>
                    <QuestionMarkCircleIcon className='h-14 stroke-white' />
                </div>)
                :
                (<div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-500 bg-opacity-75 z-50 flex items-center justify-center">
                    <div className='absolute top-0 bottom-0 left-0 right-0' onClick={ask}></div>
                    <div className='w-4/5 h-1/2 bg-white rounded-md relative py-10 px-5 flex gap-1 md:w-1/2 overflow-y-scroll'>
                        <XIcon className='h-8 border-2 border-slate-400 rounded-full absolute top-1 right-1 hover:cursor-pointer' onClick={ask} />
                        <p className='overflow-auto min-w-[200px]'>
                            Scanne le BL de Moulin roty avec le cache fait pour. fait un ocr avec l'application de scan. le resultat txt doit ressembler au fichier ci joint. Vérifie qu'il n'y ai pas d'erreur dans les codes et prix ( retour a la ligne involontaire, faute )
                            <br />
                            Le bouton pour copier le texte te le formate de la manière suivante :
                            <br />
                            xxxxxxxxxxxxx<br />
                            Qte<br />
                            x<br />
                            xxxxxxxxxxxxx<br />
                            Qte<br />
                            x<br />
                            <br />
                            Il ne te reste qu'à créer un fichier txt, mettre I et le nom du magasin avant de copier le texte
                        </p>
                        <img src={image} alt="" />
                    </div>
                </div>)}
        </div>
    </>
)
}

export default LivraisonMR

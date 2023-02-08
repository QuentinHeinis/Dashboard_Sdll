import React, {useEffect, useState} from 'react'
import { DocumentDuplicateIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import codeX from '../../images/barcodex.webp';
import useCookies from 'react-cookie/cjs/useCookies';


const EAN = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['invent01']);

  if(!cookies.invent01){
    setCookie("invent01", '', {
      path: "/"
    })
    console.log(cookies.invent01)
  }
  useEffect(()=>{
    let taille_valide = []
    let ean_valide = []
    let amount_valide = []
    let ean_non_valide = []
    let amount_non_valide = []
    let taille_non_valide = []
    let result_invent01 = document.getElementById('result_invent01')
    let result_anomalie = document.getElementById('result_anomalie')
    let csv_form = document.getElementById('csv_form')
      let array_all_csv_data = []
      csv_form.addEventListener('submit', (e)=>{
        function isEmpty(str) {
          return (!str || 0 === str.length);
        }
        e.preventDefault()
        let csv_files = e.target[0].files

        if (isEmpty(e.target[1].value)) {
          alert("Veuillez choisir un magasin")
        }else {
        for (var i = 0; i < csv_files.length; i++) {
          var reader = new FileReader();
          reader.onload = function (e){
            var rows = e.target.result.split("/\r?\n|\r/");
            let testou = rows[0].split("\r")
            array_all_csv_data.push(testou)

          }
          let test = reader.readAsText(csv_files[i]);
        }
        for (var i = 0; i < array_all_csv_data.length; i++) {
          let lignes_array = array_all_csv_data[i]
          for (var u = 1; u < lignes_array.length - 1; u++) {
            let data_splitter = lignes_array[u].split(";")
            if (data_splitter[1].length == "13") {
              ean_valide.push(data_splitter[1])
              taille_valide.push(data_splitter[2])
              amount_valide.push(data_splitter[3])
            }else {
              ean_non_valide.push(data_splitter[1])
              amount_non_valide.push(data_splitter[3])
              taille_non_valide.push(data_splitter[2])
            }
          }
        }

          result_invent01.innerHTML = ""
          for (var i = 0; i < ean_valide.length; i++) {
            result_invent01.innerHTML += ean_valide[i] + '' +'&nbsp;&nbsp;&nbsp;&nbsp;'+ taille_valide[i] + '</br></br>'
          }

          let add = ''
          result_invent01.innerHTML.split('&nbsp;').join(' ').split('<br><br>').forEach((ean)=>{
            ean.split(' ').forEach((trueean)=>{
              if(trueean.length > 10){
                add += trueean + '\n' + 'Qte' + '\n' +1 + '\n'
              }
            })
          })
          setCookie("invent01", cookies.invent01 + add , {
            path: "/"
          })
          add = ''
          for (var i = 0; i < ean_non_valide.length; i++) {
            result_anomalie.innerHTML += ean_non_valide[i] + '</br>' + "Taille: " + taille_non_valide[i] + "</br>"  + "Qte" + '</br>' + amount_non_valide[i] + '</br>'
          }
        }
      })
  },[])
    
const copie = () =>{

  if(cookies.invent01){
    navigator.clipboard.writeText(cookies.invent01)
    alert('vous avez copiez event01')
  }
}

  //fonction reset du formulaire et des champs textes
const reset = () => window.location.reload(true)
  return (
<>
<div className="title_flexer">
  <h1>Livraison Chaussures avec BarreCode-X APP</h1>
  <div className="enc_barrecodex">
    <img src={codeX}/>
  </div>
</div>

<div className="flexer_container">

  <form id="csv_form" className='relative mt-3 border-2 border-main-rose' >

      <label >Ajouter fichier csv</label>
      <input id="csv_files" type="file" accept='.csv' name="csv_files" multiple required></input>
      <input type="submit" name="csv_submit" value="Uploader (2 clicks)" className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50'></input>
      <RefreshIcon className='h-10 absolute top-2 right-2 hover:cursor-pointer' onClick={()=>{reset()}}/>
    </form>
    </div>
    <div className="flexer_container flex-wrap">
    <div className="result_box w-2/5 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit">
      <div className="flex items-center justify-between ">
        <h1>Liste EAN</h1>
      </div>
      <div id="result_invent01" className='h-full overflow-auto'></div>
    </div>
    <div className="result_box w-1/5 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit">
      <div className="flex items-center justify-between">
        <h1>Anomalie retiré du fichier</h1>
      </div>
      <div id="result_anomalie" className='h-full overflow-auto'></div>
    </div>
    <div className="w-3/5 border-2 border-main-rose rounded-md h-96 py-4 gap-1 px-2 flex flex-col mb-5">
      <div className='flex w-3/5 justify-evenly mx-auto'>
        <h2>Fichier Invent01</h2>
        <DocumentDuplicateIcon onClick={copie} className="hover:cursor-pointer h-6"/>
        <TrashIcon onClick={()=>{
            setCookie("invent01", '' , {
              path: "/"
            })
            console.log(cookies.invent01)
            window.location.reload(true)
        }}  className="hover:cursor-pointer h-6"/>
      </div>
      {cookies.invent01 && <h1>{cookies.invent01}</h1>}
    </div>
  </div>
</>
  )
}


export default EAN

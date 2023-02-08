import React, {useEffect, useState} from 'react'
import { DocumentDuplicateIcon, RefreshIcon } from '@heroicons/react/outline'
import codeX from '../../images/barcodex.webp';

const EAN = () => {

  let ean_valide = []
  let amount_valide = []
  let ean_non_valide = []
  let amount_non_valide = []
  let taille_valide = []
  let taille_non_valide = []
  let data_splitter = []
  let array_all_csv_data = []
  useEffect(()=>{
    let result_invent01 = document.getElementById('result_invent01')
    let result_anomalie = document.getElementById('result_anomalie')
    let csv_form = document.getElementById('csv_form')
      csv_form.addEventListener('submit', (e)=>{
        e.preventDefault()
        let csv_files = e.target[0].files
        console.log(csv_files.target)

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
            data_splitter = lignes_array[u].split(";")
            if (data_splitter[1].length == "13") {
              ean_valide.push(data_splitter[1])
              taille_valide.push(data_splitter[2])
            }else {
              ean_non_valide.push(data_splitter[1])
              amount_non_valide.push(data_splitter[3])
              taille_non_valide.push(data_splitter[2])
            }
          }
        }
          for (var i = 0; i < ean_valide.length; i++) {
            result_invent01.innerHTML += ean_valide[i] + '' +'&nbsp;&nbsp;&nbsp;&nbsp;'+ taille_valide[i] + '</br></br>'
          }

          for (var i = 0; i < ean_non_valide.length; i++) {
            result_anomalie.innerHTML += ean_non_valide[i] + '</br>' + "Taille: " + taille_non_valide[i] + "</br>"  + "Qte" + '</br>' + amount_non_valide[i] + '</br>'
          }
        }
      )
  },[])


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
    <div className="result_box w-1/3 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit">
      <div className="flex items-center justify-between ">
        <h1>Liste EAN</h1>
      </div>
      <div id="result_invent01" className='h-full overflow-auto'></div>
    </div>
    <div className="result_box w-1/3 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit">
      <div className="flex items-center justify-between">
        <h1>Anomalie retiré du fichier</h1>
      </div>
      <div id="result_anomalie" className='h-full overflow-auto'></div>
    </div>
  </div>
</>
  )
}

export default EAN

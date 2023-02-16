import React, { useEffect, useState } from 'react'
import { DocumentDuplicateIcon, RefreshIcon } from '@heroicons/react/outline'
import codeX from '../../images/barcodex.webp';


const Inventaire = () => {
  let copieResult = ''
  let copieAno = ''

  useEffect(() => {
    let ean_valide = []
    let amount_valide = []
    let ean_non_valide = []
    let amount_non_valide = []
    let taille_non_valide = []
    let result_invent01 = document.getElementById('result_invent01')
    let result_anomalie = document.getElementById('result_anomalie')
    let csv_form = document.getElementById('csv_form')
    let array_all_csv_data = []
    csv_form.addEventListener('submit', (e) => {
      function isEmpty(str) {
        return (!str || 0 === str.length);
      }
      e.preventDefault()
      let csv_files = e.target[0].files

      if (isEmpty(e.target[1].value)) {
        alert("Veuillez choisir un magasin")
      } else {
        for (var i = 0; i < csv_files.length; i++) {
          var reader = new FileReader();
          reader.onload = function (e) {
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
              amount_valide.push(data_splitter[3])
            } else {
              ean_non_valide.push(data_splitter[1])
              amount_non_valide.push(data_splitter[3])
              taille_non_valide.push(data_splitter[2])
            }
          }
        }

        result_invent01.innerHTML = "I" + "</br>" + e.target[1].value + "</br>"
        for (var i = 0; i < ean_valide.length; i++) {
          result_invent01.innerHTML += ean_valide[i] + '</br>' + "Qte" + '</br>' + amount_valide[i] + '</br>'
        }

        for (var i = 0; i < ean_non_valide.length; i++) {
          result_anomalie.innerHTML += ean_non_valide[i] + '</br>' + "Taille: " + taille_non_valide[i] + "</br>" + "Qte" + '</br>' + amount_non_valide[i] + '</br>'
        }
      }
    })
  }, [])

  //fonction copier de l'invent01
  const copie = () => {

    let result = document.getElementById('result_invent01').innerHTML.split('<br>').join('\n')
    if (result) {
      navigator.clipboard.writeText(result)
      alert('vous avez copiez event01')
    }
  }

  // fonction copier des anomalies
  const copieAnomalie = () => {
    let result = document.getElementById('result_anomalie').innerHTML.split('<br>').join('\n')
    if (result) {
      navigator.clipboard.writeText(result)
      alert('vous avez copiez les anomalies')
    }
  }

  //fonction reset du formulaire et des champs textes

  const reset = () => window.location.reload(true)
  return (
    <>
      <h1 className='text-4xl text-center flex items-center justify-center gap-2 my-10 font-bold text-gray-700'>Inventaire Effectuer avec BarreCode-X APP
        <div className="enc_barrecodex">
          <img src={codeX} />
        </div>
      </h1>
      <div className="flex flex-col items-center w-4/5 mx-auto">
        <form id="csv_form" className='relative mt-3 border-2 border-main-rose w-full flex items-center rounded-md' >

          <label >Ajouter fichier csv</label>
          <input id="csv_files" type="file" accept='.csv' name="csv_files" multiple required></input>
          <label className="mag" >Magasin</label>
          <select id="csv_mag" name="csv_mag" required>
            <option value="" hidden>Choisir</option>
            <option value="v">V</option>
            <option value="va">VA</option>
            <option value="a">A</option>
            <option value="g">G</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="s">KA</option>
          </select>
          <input type="submit" name="csv_submit" value="Lancer traitement (2 clicks)" className='bg-slate-500 px-4 py-2 rounded-lg text-slate-50'></input>
          <RefreshIcon className='h-10 absolute top-2 right-2 hover:cursor-pointer' onClick={reset} />
        </form>
      <div className="flex gap-5 w-full mt-3">
        <div className="result_box w-2/3 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit rounded-md">
          <div className="flex items-center justify-between ">
            <h1>Fichier Invent01</h1>
            <DocumentDuplicateIcon onClick={copie} className="hover:cursor-pointer h-6" />
          </div>
          <div id="result_invent01" className='h-full overflow-auto'></div>
        </div>
        <div className="result_box w-1/3 h-96 px-2 py-4 flex flex-col gap-4 border-2 border-main-rose min-w-fit rounded-md">
          <div className="flex items-center justify-between">
            <h1>Anomalie retiré du fichier</h1>
            <DocumentDuplicateIcon onClick={() => { copieAnomalie() }} className="hover:cursor-pointer h-6" />
          </div>
          <div id="result_anomalie" className='h-full overflow-auto'></div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Inventaire

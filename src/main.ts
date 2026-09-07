import './style.css'
import type { attitudes, Newattitudes } from './attitude';
import 'bootstrap/dist/css/bootstrap.css';
const API_URL = "https://retoolapi.dev/jceOWJ/data"

document.addEventListener('DOMContentLoaded', ()=>{

  //document.getElementById("ujHangulatokForm")?.addEventListener("submit", ujHangulat);
})

// async function ujHangulat(e: SubmitEvent) {
//   e.preventDefault();
//   const hangulatForm = document.getElementById("ujHangulatokForm") as HTMLFormElement;

//   const response = await fetch(API_URL,{
//     method: "POST",
//     body: JSON.stringify(ujHangulat),
//     headers:{
//       'Content-type': 'application/json'
//     }
//   })
//   if(!response.ok){
//     throw new Error("Invalid response")
//   }
//   hangulatForm.reset()
//   loadHangulat()

// }

// async function loadHangulat() {
//   const response = await fetch(API_URL)
//   if(!response.ok){
//     throw new Error("Invalid response")
//   }
//   const hangulat = await response.json() as attitudes[]

//   const content = document.getElementById("content")
//   content!.textContent = "";
//   for(const h of hangulat){
//     const tr = document.getElementById("tr")

//     const tdMood = document.getElementById("td")
//     tdMood.textContent = h.mood
//     tr?.appendChild(tdMood)
//   }

// }


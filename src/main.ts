import './style.css'
import type { attitudes, Newattitudes } from './attitude';
import 'bootstrap/dist/css/bootstrap.css';
const API_URL = "https://retoolapi.dev/jceOWJ/data"

document.addEventListener('DOMContentLoaded', ()=>{

  document.getElementById("ujHangulatokForm")?.addEventListener("submit", ujHangulat);

  document.getElementById("crudForm")?.addEventListener("submit", ujCrudHangulat);

  if (document.getElementById("content")) {
    loadHangulat();
  }

  if (document.getElementById("statistics")) {
    loadStatistics();
  }

});

async function ujHangulat(e: SubmitEvent) {

  e.preventDefault();

  const hangulatForm = document.getElementById("ujHangulatokForm") as HTMLFormElement;
  const data = new FormData(hangulatForm);

  const mood = data.get("mood")!.toString();
  const desc = data.get("desc")!.toString();

  if (mood.trim() === "" || desc.trim() === "") {
    alert("Nincs minden mező kitöltve");
    return;
  }

  const newHangulat: Newattitudes = {
    mood: mood,
    desc: desc,
    date: new Date().toString()
  };

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newHangulat),
    headers: {
      "Content-type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Invalid response");
  }

  hangulatForm.reset();

  const message = document.getElementById("message");

  if (message) {
    message.textContent = "A bejegyzés sikeresen mentve!";
  }
}

async function ujCrudHangulat(e: SubmitEvent) {

  e.preventDefault();

  const form = document.getElementById("crudForm") as HTMLFormElement;
  const data = new FormData(form);

  const mood = data.get("mood")!.toString();
  const desc = data.get("desc")!.toString();
  const date = data.get("date")!.toString();

  if (mood.trim() === "" || desc.trim() === "" || date.trim() === "") {
    alert("Nincs minden mező kitöltve");
    return;
  }

  const newHangulat: Newattitudes = {
    mood: mood,
    desc: desc,
    date: new Date(date).toString()
  };

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newHangulat),
    headers: {
      "Content-type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Invalid response");
  }

  form.reset();

  loadHangulat();
}


async function loadHangulat() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Invalid response");
  }

  const hangulat = await response.json() as attitudes[];

  const content = document.getElementById("content");

  content!.textContent = "";

  for (const h of hangulat) {

    const tr = document.createElement("tr");

    const tdMood = document.createElement("td");
    tdMood.textContent = h.mood;
    tr.appendChild(tdMood);

    const tdDesc = document.createElement("td");
    tdDesc.textContent = h.desc;
    tr.appendChild(tdDesc);

    const tdDate = document.createElement("td");
    tdDate.textContent = h.date;
    tr.appendChild(tdDate);

    const tdActions = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Módosítás";
    editButton.classList.add("btn", "btn-warning");

    editButton.addEventListener("click", async () => {

      const newMood = prompt("Hangulat:", h.mood);

      if (newMood == null) {
        return;
      }

      const newDesc = prompt("Leírás:", h.desc);

      if (newDesc == null) {
        return;
      }

      const newDate = prompt("Dátum és időpont:", h.date);

      if (newDate == null) {
        return;
      }

      const modifiedHangulat: Newattitudes = {
        mood: newMood,
        desc: newDesc,
        date: newDate
      };

      const response = await fetch(`${API_URL}/${h.id}`, {
        method: "PUT",
        body: JSON.stringify(modifiedHangulat),
        headers: {
          "Content-type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Invalid response");
      }

      loadHangulat();

    });

    tdActions.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Törlés";
    deleteButton.classList.add("btn", "btn-danger", "ms-2");

    deleteButton.addEventListener("click", async () => {

      const confirmed = confirm(
        "Biztosan törölni szeretnéd ezt a bejegyzést?"
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(`${API_URL}/${h.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Invalid response");
      }

      loadHangulat();

    });

    tdActions.appendChild(deleteButton);

    tr.appendChild(tdActions);

    content?.appendChild(tr);
  }
}


async function loadStatistics() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Invalid response");
  }

  const hangulatok = await response.json() as attitudes[];

  const statistics = document.getElementById("statistics");

  statistics!.textContent = "";

  const moods = ["😀", "😐", "😢", "😴", "😡"];

  for (const mood of moods) {

    let count = 0;

    for (const h of hangulatok) {
      if (h.mood == mood) {
        count++;
      }
    }

    const tr = document.createElement("tr");

    const tdMood = document.createElement("td");
    tdMood.textContent = mood;
    tr.appendChild(tdMood);

    const tdCount = document.createElement("td");
    tdCount.textContent = count.toString();
    tr.appendChild(tdCount);

    statistics?.appendChild(tr);
  }
}
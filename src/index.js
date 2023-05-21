let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
//========================================= my code =================================================
function fetchtoys(){
  fetch("http://localhost:3000/toys")
  .then(res =>res.json())
  .then(data =>{
    data.forEach(el => {
//=============================================== rendering cards to dom ========================================================
      const newCard = document.createElement("div")
      newCard.className = "card"
      const toyCollection = document.getElementById("toy-collection");
      toyCollection.append(newCard)
      const h2 = document.createElement("h2")
      const img = document.createElement("img")
      const p = document.createElement("p")
      const button = document.createElement("button")
      h2.textContent = el.name
      newCard.append(h2)
      img.src = el.image
      img.className = "toy-avatar"
      newCard.append(img)
      p.textContent = `${el.likes} likes`
      newCard.append(p)
      button.className = "like-btn"
      button.textContent = "Like ❤️"
      newCard.append(button)
//====================================================== increasing likes ============================================================
          button.addEventListener("click", (e)=>{
            p.textContent = `${el.likes++ } likes`
            console.log(el.id)
            fetch(`http://localhost:3000/toys/${el.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "likes": el.likes
              })
            })

          })
    })

  })
}
fetchtoys()





// function addToy(){
  //   fetch("http://localhost:3000/toys", configObj)
  // }

  const forM = document.querySelector(".add-toy-form");
  forM.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newName = document.getElementById("new-name").value
    const newImage = document.getElementById("new-image").value
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newName,
        "image": newImage,
        "likes": 0
      })
    }
    console.log(configObj)
    console.log(e.target)
    fetch("http://localhost:3000/toys", configObj)
    .then(res=> res.json())
    .then(data => {
      const newCard = document.createElement("div")
      newCard.className = "card"
      const toyCollection = document.getElementById("toy-collection");
      toyCollection.append(newCard)
      const h2 = document.createElement("h2")
      const img = document.createElement("img")
      const p = document.createElement("p")
      const button = document.createElement("button")
      h2.textContent = data.name
      newCard.append(h2)
      img.src = data.image
      img.className = "toy-avatar"
      newCard.append(img)
      p.textContent = `${data.likes} likes`
      newCard.append(p)
      button.className = "like-btn"
      button.textContent = "Like ❤️"
      newCard.append(button)
    })
})
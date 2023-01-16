let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", addToyToDom)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
  
});



function addToyToDom(event) {
  event.preventDefault()
  const [name, image] = event.target
  fetch("http://localhost:3000/toys", {
    method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          image: image.value,
          likes: 0
        })
    })
    .then(res => res.json())
    .then(data => showToy(data))
    event.target.reset()
  }

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    const toys = data
    toys.map(toy => showToy(toy))
        
      })
    
  }


function showToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")
  const h2 = document.createElement("h2")
  h2.textContent = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = document.createElement("p")
  p.textContent = `${toy.likes} likes`
  const p2 = document.createElement("p2")
  p2.textContent = `Toy number ${toy.id}`
  const button = document.createElement("button")
  button.textContent = "Like"
  button.classList.add("like-btn")
  button.id = toy.id
  button.addEventListener("click", (event) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
      body: JSON.stringify({
        likes: toy.likes += 1
        })
    })
    .then(res => res.json())
    .then(data => {
      event.target.parentNode.children[2].textContent = data.likes
    })
  })
  div.append(h2, img, p, p2, button)
  toyCollection.append(div)

}


    
  




{/* <div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div> */}
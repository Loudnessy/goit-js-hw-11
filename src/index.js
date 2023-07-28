"use strict";
import axios from 'axios';
import Notiflix from 'notiflix';
const form = document.querySelector(".search-form")
const div = document.querySelector(".gallery")
const button = document.querySelector(".load-more")
let page = 1
let total
let totalPages
form.addEventListener("submit", onSubmit)
button.addEventListener("click", onClick)
let searchValue
function onSubmit (evt) {
    evt.preventDefault()
    page = 1
    searchValue = evt.currentTarget.firstElementChild.value
    getImages(searchValue)
    button.setAttribute("hidden", true)
}


async function getImages (search) {
    try {
       const response = await axios.get(`https://pixabay.com/api/?key=32382565-670e6ec0ac9c08ef1d2f74129&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
       const data = response.data.hits
total = response.data.totalHits
totalPages = total / 40
       if (data.length === 0) {
        throw new Error()
       }

       if (page < totalPages) {
        button.removeAttribute("hidden")
       }
       
       
const markup = await data.map(image => 
    `
<div class="photo-card">
  <img src="${image.largeImageURL}" alt="${search}" width="400" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
         ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
        ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
        ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
        ${image.downloads}
    </p>
  </div>
</div>
`
)
.join('')
div.innerHTML = markup
    }
catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}
}


async function onClick (evt) {
  try {
    page += 1
    console.log(page);
    console.log(totalPages);
    const response = await axios.get(`https://pixabay.com/api/?key=32382565-670e6ec0ac9c08ef1d2f74129&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    const data = response.data.hits
    if (data.length === 0) {
     throw new Error()
    }
    if (page >= totalPages) {
      button.setAttribute("hidden", true)
    }
const markup = await data.map(image => 
 `
<div class="photo-card">
<img src="${image.largeImageURL}" alt="${searchValue}" width="400" loading="lazy" />
<div class="info">
 <p class="info-item">
   <b>Likes</b>
      ${image.likes}
 </p>
 <p class="info-item">
   <b>Views</b>
     ${image.views}
 </p>
 <p class="info-item">
   <b>Comments</b>
     ${image.comments}
 </p>
 <p class="info-item">
   <b>Downloads</b>
     ${image.downloads}
 </p>
</div>
</div>
`
)
.join('')
div.insertAdjacentHTML("beforeend", markup);
 }
catch (error) {
 console.log(error);
 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}
}








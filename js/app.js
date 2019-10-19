const marsRoverURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=manifests/curiosity&camera=fhaz&api_key=Y3sSPR5EfJcFKjbtkefk7cJWe0KsW1hM7GLec37M' ;
const photoList = document.querySelector('#photos-container');
const btn = document.querySelector('button');


async function getJSON(url){
    try{
      const response = await fetch(url);
      return await response.json()
    } catch(error) {
        throw error;
    }
}

function generateHTML(data){
    data.photos.map(photo => {
    const section = document.createElement('section');
    photoList.appendChild(section);
    section.innerHTML = `
      <img src=${photo.img_src}>
      <ul>   
       <li> Rover Name: ${photo.rover.name} </li>
       <li> Rover status: ${photo.rover.status} </li>
       <li> Photo ID: ${photo.id} </li>
       <li> Camera name: ${photo.camera.full_name} </li>
       <li> Landing date: ${photo.rover.landing_date} </li>
       <li> Launch date: ${photo.rover.launch_date} </li>
       <li> Total photos taken: ${photo.rover.total_photos} </li>
      </ul>
    `;
  })
}


btn.addEventListener('click', (event) => {
  event.target.textContent = 'Loading...'

  getJSON(marsRoverURL)
    .then(generateHTML)
    .catch( err => {
        photoList.innerHTML = '<h3> Something went wrong! </h3>';
        console.error(err) 
    })
    .finally(() => event.target.remove());
});


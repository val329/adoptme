const IMAGE_URL = `https://api.thecatapi.com/v1/images/search?has_breeds=1`;
const FAV_URL = `https://api.thecatapi.com/v1/favourites`;

require('dotenv').config();
const API_KEY = process.env.cat_api_key

fetchImage()
    .then((data) => {
        let imagesData = data;
        imagesData.map(function(imageData) {
    
            let image = document.createElement('img');
            let petname = document.createElement('span');
            let breed = document.createElement('span');
            let facts = document.createElement('span');
    
            image.src = `${imageData.url}`;
            breed.textContent = imageData.breeds[0].name;
            facts.textContent = imageData.breeds[0].description;
            
            if (imageData.categories != null) {
                petname.textContent = `${imageData.categories[0].name.charAt(0).toUpperCase() + imageData.categories[0].name.slice(1)}`;
            } else {
                petname.textContent = `Oops, I don't have a name yet`;
            }
            
            document.querySelector('.imageContainer').appendChild(image);
            document.querySelector('#petname').appendChild(petname);
            document.querySelector('#breed').appendChild(breed);
            document.querySelector('#facts').appendChild(facts);

            //Add on click event listener for button
            const btn_petname = document.getElementById('btn_petname');
            btn_petname.addEventListener('click', function () {
                document.getElementById('petname').hidden = false;
            })

            const btn_fav = document.getElementById('btn_fav');
            //Add on click listener for petname button
            btn_fav.addEventListener('click', function () {
                addFav(imageData.id)
            })
        })
})


.catch(function(error) {
    console.log(error);
});

// Fetch cat data from the API, returns json with one record
async function fetchImage() {
    const resp = await fetch(IMAGE_URL, {
        headers: {
            "Content-Type": "application/json",
            'x-api-key': API_KEY,
        },
    });
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }
    return await resp.json();
}

// Add the current record to favorites
async function addFav(imageId) {
    var rawBody = JSON.stringify({
        "image_id": imageId,
        "sub_id": "user-123"
    });

    const newfav = await fetch(
        FAV_URL, {
        method: 'POST',
        headers: {
            'content-type': "application/json",
            'x-api-key': API_KEY,
        },
        body: rawBody
    });
    if (!newfav.ok) {
        throw new Error(newfav.statusText);
    }
    return await newfav.json();
}

const IMAGE_URL = `https://api.thecatapi.com/v1/images/search?has_breeds=1`;
const FAV_URL = `https://api.thecatapi.com/v1/favourites`;
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

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

async function addFav(imageId) {
    const rawBody = JSON.stringify({
        "image_id": imageId,
        "sub_id": "user-123"
    });

    const newfav = await fetch(FAV_URL, {
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

// initialize the app
fetchImage()
    .then((imagesData) => {

        //the returned data contains an array with one pet record
        const imageData = imagesData[0];

        //handling the pet image and updating the DOM
        const image = document.createElement('img');
        image.src = imageData.url;
        document.querySelector('.imageContainer').appendChild(image);

        //handling the pet name and description text and updating the DOM
        document.querySelector('#breed').textContent = imageData.breeds[0].name;
        document.querySelector('#facts').textContent = imageData.breeds[0].description;

        // check if the pet has a name, if not, display a no-name message, update the DOM
        const petnameSpan = document.querySelector('#petname');

        if (imageData.categories != null) {
            const name = imageData.categories[0].name;
            petnameSpan.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            petnameSpan.textContent = `Oops, I don't have a name yet`;
        }

        //display the pet name when the button is clicked
        document.getElementById('btn_petname').addEventListener('click', () => {
            petnameSpan.hidden = false;
        });
        //add the pet to favorites when the button is clicked
        document.getElementById('btn_fav').addEventListener('click', async () => {
            try {
                await addFav(imageData.id);
                alert("Added to favorites!");
            } catch (err) {
                console.error("Fav failed", err);
            }
        });
    })
    .catch(console.error);


    
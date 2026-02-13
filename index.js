const URL = `https://api.thecatapi.com/v1/images/search`;
const API_KEY = "DEMO-API-KEY";

fetch(URL, {
    headers: {
        "Content-Type": "application/json",
        'x-api-key': API_KEY,
    },
})

.then((response) => {
    return response.json();
})

.then((data) => {
    let imagesData = data;
    imagesData.map(function(imageData) {

        let image = document.createElement('img');
        let petname = document.createElement('span');

        image.src = `${imageData.url}`;
        
        if (imageData.categories != null) {
            petname.textContent = `${imageData.categories[0].name.charAt(0).toUpperCase() + imageData.categories[0].name.slice(1)}`;
        } else {
            petname.textContent = `Oops, I don't have a name yet`;
        }
        
        document.querySelector('.imageContainer').appendChild(image);
        document.querySelector('#petname').appendChild(petname);

        //Add on click event listener for button
        const btn_petname = document.getElementById('btn_petname');
        btn_petname.addEventListener('click', function () {
            document.getElementById('petname').hidden = false;
        })
    })
})


.catch(function(error) {
    console.log(error);
});

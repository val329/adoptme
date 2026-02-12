const URL = `https://api.thecatapi.com/v1/images/search?limit=1`;
const API_KEY = "DEMO-API-KEY";

fetch(URL,{headers: {
    'x-api-key': API_KEY
    }})

    .then((response) => {
        return response.json();
    })

    .then((data) => {
        let imagesData = data;
        imagesData.map(function(imageData) {

            let image = document.createElement('img');
            //use the url from the image object
            image.src = `${imageData.url}`;
            image.width = `${imageData.width}`;
            image.height = `${imageData.height}`;


            
            // show_image(image.src,image.width,image.height);  
            document.querySelector('.imageContainer').appendChild(image);  
            document.querySelector('.breed').textContent = imageData.breeds[0].name;

        })

    })


    .catch(function(error) {
        console.log(error);
    });

    
// function show_image(src, width, height) {
//     // Create a new image element
//     let img = document.createElement("img");

//     // Set the source, width, height attributes
//     img.src = src;
//     img.width = width;
//     img.height = height;

//     // Append the image element to the image container
//     // document.body.appendChild(img);
//     document.querySelector('.imageContainer').appendChild(img);
//     // document.getElementById("imageContainer").appendChild(img);
// };

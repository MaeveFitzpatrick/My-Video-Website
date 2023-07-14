//where elements are stored
var container = document.getElementById('main-content');
var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

function fadeOut(ev){
    var counter = 1;
    const divElement = ev.currentTarget;  
    var timer = setInterval(function(){
        divElement.style.opacity = 1;
        while(counter > 0){
            divElement.style.opacity = counter;
            counter-= 0.05;
        }  
        if(counter < 0){
            clearInterval(timer);
        }
        console.log(counter);
    }, 2);
}



function buildCardDOMAPI(data) {
    var cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', "photo-card");
    var imgTag = document.createElement('img');
    imgTag.src = data.thumbnailUrl;
    imgTag.alt = "a photo";
    var titleTag = document.createElement('p');
    titleTag.textContent = data.title;
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(titleTag);
    cardDiv.addEventListener('click', fadeOut);
    return cardDiv;
}
function buildCardHTML(data){
    return `<div class="photo-card">
    //link to img
    <img src="${data.thumbnailUrl}" alt="a photo">
    //title of img
    <p>${data.title}</p>
    </div>`;
}

//when asynchronous event completes
fetch(url)
    //then run function
    .then(function(resp) {
        //turn json string into javascript object
        return resp.json();
    })
    //data = array
    .then(function(data){
        var cards = data.map(function(photo){
            return (buildCardDOMAPI(photo));
    }); 
        container.append(...cards);
        
})
    















// var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
// // fetch(url, {
// //     method: "POST",
// //     body: JSON.stringify({
// //         name: id,
// //         listOfItems: [
// //             {},{},{}
// //         ],
// //         price: 99.99
// //     }),
// //     headers: {
// //         "Content-Type": "application/json"
// //     }
// // })

// function buildCard(photoInfo) {
//     return `<div class="photo-card">
//     <img src="${photoInfo.thumbnailUrl}" alt="">
//     <p>${photoInfo.title}</p>
// </div>`;
// }


// fetch(url)
//     .then((resp) => {
//         return data.json();
//     })
//     .then((data) => {
//         var htmlString = '';
//         data.forEach(function(value){
//            htmlString += buildCard(value);
//         });
//          container.innerHTML = htmlString;
//          [...document.getElementsByClassName("photo-card")].forEach((div)
//          => {
//             div.addEventListener("click", function (ev) {
//                 const currentDiv = ev.currentTarget;
//                 setInterval(function() {
//                    console.log(currentDiv);
//                 }
//             }, 500);
//          });
//     })
//     .catch(err => console.log(err));

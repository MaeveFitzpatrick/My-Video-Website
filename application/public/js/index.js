var container = document.getElementById('main');


var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
// fetch(url, {
//     method: "POST",
//     body: JSON.stringify({
//         name: id,
//         listOfItems: [
//             {},{},{}
//         ],
//         price: 99.99
//     }),
//     headers: {
//         "Content-Type": "application/json"
//     }
// })

function buildCard(photoInfo) {
    return `<div class="photo-card">
    <img src="${photoInfo.thumbnailUrl}" alt="">
    <p>${photoInfo.title}</p>
</div>`;
}


fetch(url)
    .then((resp) => {
        return data.json();
    })
    .then((data) => {
        var htmlString = '';
        data.forEach(function(value){
           htmlString += buildCard(value);
        });
         container.innerHTML = htmlString;
         [...document.getElementsByClassName("photo-card")].forEach((div)
         => {
            div.addEventListener("click", function (ev) {
                const currentDiv = ev.currentTarget;
                setInterval(function() {
                   console.log(currentDiv);
                }
            }, 500);
         });
    })
    .catch(err => console.log(err));

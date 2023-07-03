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

var data = fetch(url);
console.log(data);
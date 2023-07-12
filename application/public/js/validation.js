// //variable that gives all elements named body
// var bodies = document.getElementsByTagName('body');

console.log('HELLO');


document.getElementById('username').addEventListener('input', function(ev){
    var userInput = ev.target;
    var username = userInput.value;
    if(username.length < 3){
        console.log('invalid username');
    } else {
        console.log('valid username');
    }
})
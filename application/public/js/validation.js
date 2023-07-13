const usernameV = document.querySelector('#username');
const emailV = document.querySelector('#email');
const passwordV = document.querySelector('#password');
const conPasswordV = document.querySelector('#confirm-password');

const registrationForm = document.querySelector('#registration-form');

// registrationForm.addEventListener('submit', function (event) {
//     event.preventDefault();

// });

//prevents empty input
const required = value => value === '' ? false : true;


const minimumInputLength = (length, min) => length < min ? false : true;


// const validEmail = (email) => {

// }

const containsSpecialChars = (password) => {
    const result = new RegExp("(?=.*[!@#$%^&*])");
    return result.test(password);
}

const containsUppercase = (password) => {
    const result = new RegExp("(?=.*[A-Z])");
    return result.test(password);
}
const containsNumber = (password) => {
    const result = new RegExp("(?=.*[0-9])");
    return result.test(password);
}

const displayError = (input, message) => {
    const registrationForm = input.parentElement;
    registrationForm.classList.remove('success');
    registrationForm.classList.add('error');
    const error = registrationForm.querySelector('small');
    error.textContent = message;
}

const displaySuccess = (input, message) => {
    const registrationForm = input.parentElement;
    registrationForm.classList.remove('error');
    registrationForm.classList.add('success');
    const error = registrationForm.querySelector('small');
    error.textContent = '';
}


const checkUsername = () => {
    var valid = false;
    const min = 3;
    const username = usernameV.value;

    if(!minimumInputLength(username.length, min)) {
        displayError(usernameV, "Username must be at least 3 characters." );
    } else {
        displaySuccess(usernameV);
        valid = true;
    }
    return valid;
};

// const checkEmail = () => {
//     var valid = false;
//     const email = emailV.value();
//     if(!requ
// }

const checkPassword = () => {
    let valid = false;
    const min = 8;
    const password = passwordV.value;
    if(!minimumInputLength(password.length, min) ){
        displayError(passwordV, "Password must be at least 8 characters.");
    } else if (!containsUppercase(password)) {
            displayError(passwordV, "Password must contain at least 1 uppercase letter. ");
    } else if (!containsNumber(password)) {
        displayError(passwordV, "Password must contain at least 1 number.");
    } else if (!containsSpecialChars(password)) {
        displayError(passwordV, "Password must contain at least 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ");
    } else {
        displaySuccess(passwordV);
        valid = true;
    }

    return valid;
};


const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = conPasswordV.value;
    if(confirmPassword != passwordV.value){
        displayError(conPasswordV, "Passwords must match.");
    } else {
        displaySuccess(conPasswordV);
        valid = true;
    }
    return valid;
};

registrationForm.addEventListener('submit', function(e){
    e.preventDefault();
    var isUsernameValid
    // var isEmailValid
    var isPasswordValid
    var isConfirmPasswordValid
    var isFormValid = isUsernameValid && isPasswordValid && isConfirmPasswordValid;

    if(isFormValid){

    }
});


registrationForm.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        // case 'email':
        //     checkEmail();
        //     break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
});








































// //variable that gives all elements named body
// var bodies = document.getElementsByTagName('body');

// console.log('HELLO');

// document.forms["registration-form"].addEventListener("submit", ()=> {
//     document.forms["registration-form"].reportValidity();
// },
// false,
// )



// document.getElementById('User Name').addEventListener('input', function(ev){ 
    
//     var userInput = ev.target;
//     var username = userInput.value;
    
//     var firstLetter = username.charAt(0);
//     var onlyLetters = /[A-Za-z]/;
//     if(firstLetter != onlyLetters){
//         userInput.classList.add('invalid-input');
        
//     } else {
//         userInput.classList.add('valid-input');
//     }

//     if(username.length < 3){
//         alert("EMPTY");

//         // userInput.classList.add('invalid-input');
//     } else {
//         userInput.classList.add('valid-input');
//     }
// })

// document.getElementsByTagName('username-requirements').addEventListener('focus', function(ev){

// })

// // document.getElementById('registration-form').addEventListener('submit', function(ev){\
// //     ev.preventDefault();

// //     if(dataisgood){
// //         ev.target.submit();
// //     } else {
// //         return
// //     }
// // })




// function validate(){
//     var usernameValidation = document.getElementById('User Name').value;
//     var emailValidation = document.getElementById('Email').value;
//     var passwordValidation = document.getElementById('Password').value;
//     var conpasswordValidation = document.getElementById('Confirm Password').value;

//     if(usernameValidation > 5){
//         document.getElementById("username-requirements").innerHTML = "Not enough."
//         return false
//     }



// }
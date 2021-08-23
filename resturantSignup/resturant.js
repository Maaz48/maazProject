console.log(firebase)

let email = document.getElementById("email")
let password = document.getElementById("password")
let resturantName = document.getElementById("resturantName")
let Country = document.getElementById("Country")
let city = document.getElementById("city")
let signUpBtn = document.getElementById("signUp-btn")


var db = firebase.firestore();

let signup = (event) => {
    console.log('event :', event)
    event.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)

        .then(function () {
            const user = firebase.auth().currentUser.uid;
            return db.collection("userdata").doc(user).set({
                resturantName: resturantName.value,
                Country: Country.value,
                city: city.value
            })

                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        })
        .then((userCredential) => {
            // Signed in 
            // var user = userCredential.user;
            swal({
                title: "You are succesfully login!",
                // text: "Your form has been submitted",
                icon: "success",
                button: "go to Dashboard!",
            }).then(function () {
                location.href = "../dashboardResturant/dashboard.html"
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swal(`${errorMessage}`, "You clicked the button!", "error");
            // ..
        });


}

signUpBtn.addEventListener('click', signup)


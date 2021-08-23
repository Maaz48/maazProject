// console.log(firebase)

// let email = document.getElementById("email")
// let password = document.getElementById("password")
// let signinBtn = document.getElementById("signinBtn")

// var db = firebase.firestore();

// let signin = (event) => {
//   event.preventDefault();
//   console.log('event :', event)

//   firebase.auth().signInWithEmailAndPassword(email.value, password.value)


//     .then((userCredential) => {
//       // Signed in 
//       // var user = userCredential.user;
//       swal({
//         title: "You are succesfully login!",
//         // text: "Your form has been submitted",
//         icon: "success",
//         button: "go to Dashboard!",
//       }).then(function () {
//         location.href = "../dashboardResturant/dashboard.html"
//       });
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       swal(`${errorMessage}`, "You clicked the button!", "error");
//       // ..
//     });


// }

// signinBtn.addEventListener('click', signin())


let signin = (event) => {
  event.preventDefault();


  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  let emaila = document.getElementById("email")
  let passworda = document.getElementById("password")







  firebase.auth().signInWithEmailAndPassword(email, password)
    // .then((docRef) => {
    //   console.log("Document written with ID: ", docRef.id);
    //   localStorage.setItem("getUserId", docRef.id)
    // })
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      if (user) {
        swal({
          title: "You have successfuly login!",
          // text: "Your form has been submitted",
          icon: "success",
          button: "Go to dashboard!",
        }).then(function () {
          location.href = "../dashboardResturant/dashboard.html"
        });
      }

      // ...
    })

    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal(`${errorMessage}`, "You clicked the button!", "error");
    });

}


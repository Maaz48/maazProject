var db = firebase.firestore();
var resturantName = document.getElementById("resturantName")
var btn2 = document.getElementById("btn2")
var btn1 = document.getElementById("btn1")
var navbar = document.getElementById("navbar")
var navbarrow = document.getElementById("row")
var orders = document.getElementById("orders")
// =======================get resturANT NAME=======================
function getresturantName() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            console.log(uid)

            // const user = firebase.auth().currentUser.uid;
            docRef = db.collection("customerDATA").doc(uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    resturantName.innerText = "WELCOME " + doc.data().resturantName.toUpperCase();
                    btn2.style.display = "none"
                    btn1.style.display = "none"
                    var btnlog = document.createElement("btn")
                    btnlog.classList.add("btn", "btn-outline-secondary", "mx-4")
                    btnlog.innerText = "SIGNOUT"
                    var dashboard = document.createElement("a")
                    orders.classList.add("btn", "btn-outline-secondary")
                    orders.innerText = "Orders"
                    navbarrow.appendChild(btnlog)
                    // navbarrow.appendChild(dashboard)

                    // =============open MODAL================
                    // onclick = "document.getElementById('id01').style.display='block'" href = "#"
                    // role = "button"
                    // dashboard.setAttribute('role', 'button')
                    // dashboard.setAttribute('href', '#')
                    // dashboard.onclick = "document.getElementById('id01').style.display='block'";






                    // consle.log(doc.data().fname);
                    btnlog.addEventListener('click', () => {
                        firebase.auth().signOut().then(() => {
                            // Sign-out successful.
                            location.href = "./user.html"
                            console.log('logout')
                        }).catch((error) => {
                            // An error happened.
                        });
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            // ...
        } else {
            // User is signed out
            // ...
        }

    });

}

getresturantName()









// am.addEventListener('click', function () {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/firebase.User
//             var uid = user.uid;
//             swal({
//                 title: "Are you sure you want to signOut?",
//                 text: "don't worry your data has save",
//                 icon: "info",
//                 buttons: true,
//                 dangerMode: false,
//             })
//                 .then((willDelete) => {
//                     if (willDelete) {
//                         firebase.auth().signOut()
//                             .then((e) => {
//                                 location.href = "../resturantSignin/resturantSignin.html"
//                                 // Sign-out successful.
//                             })
//                             .catch((error) => {
//                                 // An error happened.
//                             });
//                         swal("Sigging Out", {
//                             icon: "success",
//                         });


//                     } else {
//                         swal("Your imaginary file is safe!");
//                     }
//                 });
//             // ...
//         } else {
//             // User is signed out
//             // ...
//         }
//     });
// })




// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         var uid = user.uid;
//         var logoutBtn = document.createElement("btn")
//         var userName = document.createElement("h5");


//         navbarrow.appendChild(logoutBtn)
//         navbarrow.appendChild(userName)

//         logoutBtn.innerText = "SIGNOUT"

//         logoutBtn.classList.add("btn", "btn-outline-secondary")

//         logoutBtn.addEventListener('click', function () {
//             firebase.auth().signOut().then(() => {
//                 // Sign-out successful.
//                 location.href = "./user.html"

//             }).catch((error) => {
//                 // An error happened.
//             })

//         })

//         window.addEventListener("load", function () {

//             db.collection(uid).get().then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                     console.log(`${doc.id} => ${doc.data()}`);
//                 });
//             });
//         })
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
// });
















// ===============create card for food items================


var getCard = document.getElementById("getCard")
function cards() {

    // firebase.auth().onAuthStateChanged((ZQ3P9t2qsvQ4B9yZWw0qhF1fuNr2) => {
    //     if (ZQ3P9t2qsvQ4B9yZWw0qhF1fuNr2) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // var uid = user.uid;



    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // userId = user.uid;
    db.collection("ZQ3P9t2qsvQ4B9yZWw0qhF1fuNr2").get()
        .then((querySnapshot) => {
            // console.log("Document written with ID: ", docRef.id);
            querySnapshot.forEach((doc) => {

                console.log("maaz")
                const maindiv = document.createElement("div")
                const img = document.createElement("img");
                const innerdiv = document.createElement("div")
                const itemName = document.createElement("h4")
                const spana=document.createElement("span")
                const delievery = document.createElement("p")
                const prices = document.createElement("h5")
                const orderNow = document.createElement("a")
                const categerory = document.createElement("p")


                maindiv.setAttribute('data-id', doc.id)


                getCard.appendChild(maindiv)
                maindiv.appendChild(img)
                maindiv.appendChild(innerdiv)
                innerdiv.appendChild(itemName);
                innerdiv.appendChild(prices);
                innerdiv.appendChild(categerory);
                innerdiv.appendChild(orderNow);
                innerdiv.appendChild(delievery);

                maindiv.classList.add("card", "col-md-3", "col-sm-6", "my-3", "mr-5")
                img.classList.add("card-img-top", "image")
                innerdiv.classList.add("card-body", "text-center")
                itemName.classList.add("card-title")
                delievery.classList.add("card-text")
                prices.classList.add("card-text")
                orderNow.classList.add("btn", "btn-outline-secondary", "my-1")
                categerory.classList.add("card-text")


                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data().inputTodo);
                // createElements(doc)
                itemName.innerHTML = "ITEM NAME: " + doc.data().ItemNameValue;
                img.setAttribute("src", doc.data().URL)
                delievery.innerHTML = "DELIEVERY: " + doc.data().deliveryValue
                prices.innerHTML = "PRICES: " + doc.data().priceValue
                orderNow.innerText = "Order Now"
                categerory.innerHTML = "CATEGEORY: " + doc.data().CategoryValue

                console.log(doc.data().deliveryValue)



                // ==========order food============

                orderNow.addEventListener('click', (e) => {

                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            // User is signed in, see docs for a list of available properties
                            // https://firebase.google.com/docs/reference/js/firebase.User
                            var uid = user.uid;
                            // let ide = e.target.parentElement.parentElement.getAttribute('data-id')
                            // let ide = e.target.previousSibling.previousSibling.previousSibling
                            let ide = e.target.previousSibling.previousSibling.previousSibling
                            console.log(ide)


                            // ide.innerHTML;

                            // db.collection(uid).doc(ide).get().then((querySnapshot) => {
                            //     querySnapshot.forEach((doc) => {
                            //         console.log(`${doc.id} => ${doc.data()}`);
                            //         console.log("name :" + doc.data())
                            //     });
                            // });

                            // var id=document.getAttribute("ide");
                            // console.log(id)
                            // ...
                        } else {
                            // User is signed out
                            // ...
                        }
                    });
                })

            });
        });


}
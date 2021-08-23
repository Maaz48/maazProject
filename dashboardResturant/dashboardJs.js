let resturantName = document.getElementById("resturantName");
let logout = document.getElementById("logout")
let addFood = document.getElementById("addFood")
var ItemName = document.getElementById("Item-Name")
var price = document.getElementById("price")
var Category = document.getElementById("Category")
var delivery = document.getElementById("delivery")
var modalBtn = document.getElementById("modalBtn");
var closemodal = document.getElementById("closemodal");
var foodimage = document.getElementById("foodimage")
var getCard = document.getElementById("getCard")
var db = firebase.firestore();

window.addEventListener('load', () => {
    getresturantName()
})


// =======================get resturANT NAME=======================
function getresturantName() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            console.log(uid)

            // const user = firebase.auth().currentUser.uid;
            docRef = db.collection("userdata").doc(uid);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    resturantName.innerText = doc.data().resturantName.toUpperCase();
                    // console.log(doc.data().fname);
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
// =======================USER SIGNOUT=======================


logout.addEventListener('click', function () {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("user")
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            swal({
                title: "Are you sure you want to signOut?",
                text: "don't worry your data has save",
                icon: "info",
                buttons: true,
                dangerMode: false,
            })
                .then((willDelete) => {
                    console.log("logout...??")
                    if (willDelete) {
                        firebase.auth().signOut()
                            .then((e) => {
                                console.log("signout...")
                                location.href = "../resturantSignin/resturantSignin.html"
                                // Sign-out successful.
                            })
                            .catch((error) => {
                                // An error happened.
                            });
                        swal("Sigging Out", {
                            icon: "success",
                        });


                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
})


// ========================open modal=====================
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addFood");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// =========================add food items=======================
// var ItemName = docu
// addFood.addEventListener('click', function () {
// })



// ===============add food items================

var storageRef = firebase.storage().ref();
modalBtn.addEventListener("click", function () {
    document.getElementById("getCard").innerHTML = "";
    let ItemNameValue = ItemName.value;
    let priceValue = price.value;
    let CategoryValue = Category.options[Category.selectedIndex].text;
    let deliveryValue = delivery.options[delivery.selectedIndex].text;
    let imageKey = foodimage.files[0];
    // let imagesRef = storage.ref().child('images/' + imageKey.name);
    // let uploadTask = imagesRef.put(imageKey);
    var mountainImagesRef = storageRef.child('images/' + imageKey.name);

    console.log(ItemNameValue)
    console.log(priceValue)
    console.log(CategoryValue)
    console.log(deliveryValue)
    console.log(imageKey)
    // console.log(imagesRef)
    function foodItems() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;


                mountainImagesRef.put(imageKey).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                })
                    .then(() => {
                        // Create a reference to the file we want to download
                        var starsRef = storageRef.child('images/' + imageKey.name);

                        // Get the download URL
                        starsRef.getDownloadURL()
                            .then((url) => {
                                console.log("imageurl", url)
                                db.collection(uid).add({
                                    ItemNameValue,
                                    priceValue,
                                    CategoryValue,
                                    deliveryValue,
                                    URL: url
                                })
                                    .then((docRef) => {
                                        console.log("Document written with ID: ", docRef.id);
                                    })
                                    .catch((error) => {
                                        console.error("Error adding document: ", error);
                                    });
                                // Insert url into an <img> tag to "download"
                            })
                            .catch((error) => {
                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                switch (error.code) {
                                    case 'storage/object-not-found':
                                        // File doesn't exist
                                        break;
                                    case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;
                                    case 'storage/canceled':
                                        // User canceled the upload
                                        break;

                                    // ...

                                    case 'storage/unknown':
                                        // Unknown error occurred, inspect the server response
                                        break;
                                }
                            });
                    })

                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }


    setTimeout(() => {


        foodItems()
        cards()
        myModal.style.display = "none"

    })


})



// ===============create card for food items================
function cards() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("maaz")
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            userId = user.uid;
            db.collection(userId).get()
                .then((querySnapshot) => {
                    console.log("Document written with ID: ", docRef.id);
                    querySnapshot.forEach((doc) => {

                        console.log(doc.data().URL)
                        const maindiv = document.createElement("div")
                        const img = document.createElement("img");
                        const innerdiv = document.createElement("div")
                        const itemName = document.createElement("h4")
                        const delievery = document.createElement("p")
                        const prices = document.createElement("h5")
                        const categerory = document.createElement("p")




                        img.setAttribute("src", doc.data().URL)

                        getCard.appendChild(maindiv)
                        maindiv.appendChild(img)
                        maindiv.appendChild(innerdiv)
                        innerdiv.appendChild(itemName);
                        innerdiv.appendChild(prices);
                        innerdiv.appendChild(categerory);
                        innerdiv.appendChild(delievery);

                        maindiv.classList.add("card", "col-md-4", "col-sm-6", "my-3", "mx-.2")
                        img.classList.add("card-img-top", "image")
                        innerdiv.classList.add("card-body", "text-center")
                        itemName.classList.add("card-title")
                        delievery.classList.add("card-text")
                        prices.classList.add("card-text")
                        categerory.classList.add("card-text")


                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.data().inputTodo);
                        // createElements(doc)
                        itemName.innerHTML = "ITEM NAME: " + doc.data().ItemNameValue;
                        delievery.innerHTML = "DELIEVERY: " + doc.data().deliveryValue
                        prices.innerHTML = "PRICES:" + doc.data().priceValue
                        categerory.innerHTML = "CATEGEORY:" + doc.data().CategoryValue

                        console.log(doc.data().deliveryValue)
                    });
                });



            // ...
        } else {
            // User is signed out
            // ...
        }
    });

}



// ====================navbar modal=====================


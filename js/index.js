
function signupButton(event) {
     event.preventDefault();

     const spinItem = document.querySelector(".spin2");
     spinItem.style.display = "inline-block";

     const getName = document.getElementById("firstName").value;
     const getEmail = document.getElementById("email").value;
     const getPhone = document.getElementById("phoneNumber").value;
     const getPass = document.getElementById("password").value;
     const confirmPass = document.getElementById("ConfirmPassword").value;

     if (getName === "" || getEmail === "" || getPhone === "" || getPass === "" || confirmPass === "") {
          swal.fire({
               icon: 'info',
               text: 'All filds are Required',
               confirmButtonColor:'#f58634'
          })
          spinItem.style.display = 'none';

     }

     if (getPhone.length != 11) {
        Swal.fire({
            icon: 'warning',
            title: 'Phone number must be 11 digits',
            confirmButtonColor: '#F58634'
        })
    }

     if (confirmPass !== getPass) {
             Swal.fire({
            icon: 'warning',
            title: 'Passwords must be the same',
            confirmButtonColor: '#F58634'
        })
          spinItem.style.display = 'none';

        }

     else {
        // convert to form data
     //    const signData = new FormData();
         const signData = {
            name: getName,
            email: getEmail,
            phoneNumber: getPhone,
            password: getPass,
            confirmPassword: confirmPass
        }
     //    signData.append("name", getName);
     //    signData.append("email", getEmail);
     //    signData.append("phoneNumber", getPhone);
     //    signData.append("password", getPass);
        // request method
        const signMethod = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signData)
        }
        // endpoint
        const url = 'http://localhost:3001/amazon/document/api/register';
        // callimg the api
        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
           
            if (result._id) {
                localStorage.setItem('customerid', result._id);
                Swal.fire({
                    icon: 'success',
                    text: `Registeration Sucessful`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.href = 'login.html'
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: result.message || 'Registration Failed',
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: `Something Went wrong, Try Again`,
                confirmButtonColor: "#2D85DE"
            })
            spinItem.style.display = "none";
        });
    }

}


function loginButton(event) {
     event.preventDefault()
     const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";

     const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;

    if(getEmail === "" || getPassword === "") {
          Swal.fire({
          icon: 'info',
          text: 'All fields are required!',
          confirmButtonColor: "#00A859"
        })
        spinItem.style.display = "none";
     //    return;
    }

     else {
        // convert to form data
     //    const signData = new FormData();
         const signData = {
            email: getEmail,
            password: getPassword
        }
     //    signData.append("name", getName);
     //    signData.append("email", getEmail);
     //    signData.append("phoneNumber", getPhone);
     //    signData.append("password", getPass);
        // request method
        const signMethod = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signData)
        }
        // endpoint
        const url = 'http://localhost:3001/amazon/document/api/login';
        // callimg the api
        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
           
           console.log(result)
            if (result.success || result.token ) {
                localStorage.setItem("key", result.token)
                localStorage.setItem("customerloginid", result._id)
                const currentId = localStorage.getItem('customerloginid')
                const previousId = localStorage.getItem('customerid')

                if( previousId !== currentId) {
                    Swal.fire({
                    icon: 'info',
                    text: `Youre Logging In With a Different Account`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    
                }, 1000)
                }

                Swal.fire({
                    icon: 'success',
                    text: `Login Sucessful`,
                    confirmButtonColor: "#2D85DE"
                })
                setTimeout(() => {
                    location.href = "checkout.html";
                }, 3000)
                localStorage.setItem("customerid", currentId );
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: result.message || 'Registration Failed',
                    confirmButtonColor: "#2D85DE"
                })
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'info',
                text: `Something Went wrong, Try Again`,
                confirmButtonColor: "#2D85DE"
            })
            spinItem.style.display = "none";
        });
    }
}






function showProducts(event) {
     location.href = "product-page.html"
}

function proceedLogin(event) {
     location.href = "login.html"
}



     


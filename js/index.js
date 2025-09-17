
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


// function showProducts() {

    const productRow = document.getElementById("productsRow");

    async function showProducts(event) {
  if (event) event.preventDefault();

  const token = localStorage.getItem("key");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products", {
      method: "GET",
      headers
    });

    const result = await response.json();
    console.log(result);

    if (!result || result.length === 0) {
      productRow.innerHTML = `<p class="text-center">No Records Found</p>`;
      return;
    }

    // Clear before adding
    productRow.innerHTML = "";

    result.forEach(item => {
      const card = `
        <div class="col-md-3 mb-3">
          <div class="card h-100 shadow border-0">
            <img src="${item.image}" style="height: 200px;" class="card-img-top object-fit-cover" alt="${item.name}">
            <div class="card-body mt-3">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="card-title fs-5">${item.name}</h5>
                <a class="text-reset" href="#">
                  <i class="fa-regular fa-heart"></i>
                </a> 
              </div>
              <p class="card-text text-muted">${item.description.substring(0, 100)}...</p>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
                  <span class="ms-1">5.0 (18)</span>
                </div>
                <p class="fw-bold mb-0">₦${item.price}</p>
              </div>
              <p class="mb-2"><small>Stock: ${item.numberInStock}</small></p>
              <button class="btn btn-outline-success w-100 fw-bold" style="height: 50px; font-size: 16px;">Buy Now</button>
            </div>
          </div>
        </div>
      `;
      productRow.innerHTML += card;
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    productRow.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
  }
}
// Call on page load
// document.addEventListener("DOMContentLoaded", showProducts);

// function show 4 products

const productRow1 = document.getElementById("productsRow1");

    async function showProducts1(event) {
  if (event) event.preventDefault();

  const token = localStorage.getItem("key");
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/features", {
      method: "GET",
      headers
    });

    const result = await response.json();
    console.log(result);

    if (!result || result.length === 0) {
      productRow1.innerHTML = `<p class="text-center">No Records Found</p>`;
      return;
    }

    // Clear before adding
    productRow1.innerHTML = "";

    result.forEach(item => {
      const card = `
        <div class="col-md-4 mb-3">
        <div class="  " style="width: 360px;" >
            <img src="${item.image}"   class="card-img-top  " alt="${item.name}">
                <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title CustomP-14-400 my-3 my-lg-3">${item.name}</h5>
                    <a class="text-reset " href="#">
                    <i class="fa-regular fa-heart"></i>
                    </a> 
                </div>
                <p class="card-text cardtitle-Black">${item.description.substring(0, 100)}</p>

                <div class="d-flex justify-content-between align-items-center ">
                    <div class="div">
                    <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
                    <span>5.0 (18)</span>
                    </div>
                    <span class="fw-bold">₦${item.price}</span>
                </div>
                </div>
                <p class="mb-2"><small>Stock: ${item.numberInStock}</small></p>
                <button class="btn customBtn mt-4 hover-underline mb-5 mb-lg-0">Add to cart</button>
            </div>
            </div>
        </div>
      `;
      productRow1.innerHTML += card;
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    productRow1.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
  }
}
// Call on page load
document.addEventListener("DOMContentLoaded", showProducts1);








     


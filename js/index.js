
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

//     const productRow = document.getElementById("productpageRow");

//     async function showProducts(event) {
//   if (event) event.preventDefault();

//   const token = localStorage.getItem("key");
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/products", {
//       method: "GET",
//       headers
//     });

//     const result = await response.json();
//     console.log(result);

//     if (!result || result.length === 0) {
//       productRow.innerHTML = `<p class="text-center">No Records Found</p>`;
//       return;
//     }

    

//     productRow.innerHTML = "";

//     result.forEach(product => {
//       const productId = product._id || product.id;
//       const card = `
//         <div class="col-md-3 mb-3">
//           <div class="card h-100 shadow border-0">
//             <img src="${product.image[0]}" style="height: 200px;" class="card-img-top object-fit-cover" alt="${product.name}" onclick="goToProductDetails('${productId}')">
//             <div class="card-body mt-3">
//               <div class="d-flex align-items-center justify-content-between">
//                 <h5 class="card-title fs-5">${product.name}</h5>
//                 <a class="text-reset" href="#">
//                   <i class="fa-regular fa-heart"></i>
//                 </a> 
//               </div>
//               <p class="card-text text-muted">${product.description.substring(0, 100)}...</p>
//               <div class="d-flex align-items-center justify-content-between">
//                 <div class="d-flex align-items-center">
//                   <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
//                   <span class="ms-1">5.0 (18)</span>
//                 </div>
//                 <p class="fw-bold mb-0">₦${product.price}</p>
//               </div>
//               <p class="mb-2"><small>Stock: ${product.numberInStock}</small></p>
//               <button class="btn btn-outline-success w-100 fw-bold" style="height: 50px; font-size: 16px;">Buy Now</button>
//             </div>
//           </div>
//         </div>
//       `;
//       productRow.innerHTML += card;
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     productRow.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//   }
// }
// document.addEventListener("DOMContentLoaded", showProducts);

async function showProducts() {
  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    console.log("Products:", products);
    const productsRow = document.getElementById("productpageRow");
    if (!productsRow) return;
    productsRow.innerHTML = "";
    products.forEach(product => {
      // Prefer MongoDB _id, fallback to id
      const productId = product._id || product.id;
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-3 mb-4";
      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${Array.isArray(product.image) ? product.image[0] : product.image}"
               alt="${product.name}"
               class="card-img-top product-img"
               id= "imageReveal"
               onclick="goToProductDetails('${productId}')">
         <div class="card-body">
                <h5 class=""></h5>
                    <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
                    <div>
                    <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0F0B0B;"></i></a>
                    </div>
                </div>
                <p class = "card-title fs-5 fw-bold">${product.name}</p>
              <div class="d-flex justify-content-between">
                <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #F58634;"></i>5.0 (18)</p>
              <p class="fs-5">₦${product.price}</p>
            </div>
            <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
        </div>
      `;
      productsRow.appendChild(col);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    showProducts();
})





async function productDetails(id) {
  try {
    const res = await fetch(`http://localhost:3001/amazon/document/api/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    const product = await res.json();
    console.log("Product:", product);
    const nameEl = document.getElementById("productName");
    const priceEl = document.getElementById("productPrice");
    const descEl = document.getElementById("productDescription");
    const variety = document.getElementById("productVariety");
    const benefits = document.getElementById("productBenefits");
    const ingredientsEl = document.getElementById("productIngredients");
    if (nameEl) nameEl.textContent = product.name || "Unnamed Product";
    if (priceEl) priceEl.textContent = product.price ? `₦${product.price}` : "No price";
    if (descEl) descEl.textContent = product.description || "No description";
    if (benefits) benefits.textContent = product.benefits || "No benefits";
  const images = Array.isArray(product.image) ? product.image : [product.image];
  const mainImage = document.getElementById("mainImage");
  const carousel = document.getElementById("imageCarousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0; // track active image
  if (images.length > 0) {
    // Set first image as main
    mainImage.src = images[currentIndex];
    mainImage.alt = product.name || "Product Image";
    // Clear carousel
    carousel.innerHTML = "";
    // Add thumbnails
    images.forEach((src, index) => {
      if (!src) return;
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `${product.name} ${index + 1}`;
      if (index === currentIndex) thumb.classList.add("active");
      // Thumbnail click
      thumb.addEventListener("click", () => {
        currentIndex = index;
        updateMainImage();
      });
      carousel.appendChild(thumb);
    });
    // Update main image + highlight active thumbnail
    function updateMainImage() {
      mainImage.src = images[currentIndex];
      document.querySelectorAll(".carousel-thumbnails img").forEach((img, idx) => {
        img.classList.toggle("active", idx === currentIndex);
      });
      // Auto-scroll to keep active thumbnail in view
      const activeThumb = carousel.children[currentIndex];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
    // Prev button
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // loop back
      updateMainImage();
    });
    // Next button
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // loop forward
      updateMainImage();
    });
  }
      if (variety) {
        variety.innerHTML = ""; // clear old list
        if (Array.isArray(product.variety) && product.variety.length > 0) {
    product.variety.forEach(variets => {
      const li = document.createElement("li");
      li.textContent = variets;
      variety.appendChild(li);
    });
  } else {
    variety.innerHTML = "<li>No variety listed</li>";
  }
      }
      if (ingredientsEl) {
  ingredientsEl.innerHTML = ""; // clear old list
  if (Array.isArray(product.ingridients) && product.ingridients.length > 0) {
    product.ingridients.forEach(ingredient => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsEl.appendChild(li);
    });
  } else {
    ingredientsEl.innerHTML = "<li>No ingredients listed</li>";
  }
}
  } catch (error) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    console.error("Error loading product:", error);
  }
}
// ----------------------
// Redirect helper
// ----------------------
function goToProductDetails(id) {
  location.href = `product.html?id=${id}`;
}





















// function show 4 products

// const productRow1 = document.getElementById("productsRow1");
// const productRow2 = document.getElementById("productsRow2");


//     async function showProducts1(event) {
//   if (event) event.preventDefault();

//   const token = localStorage.getItem("key");
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/features", {
//       method: "GET",
//       headers
//     });

//     const result = await response.json();

//     console.log(result);

//     if (!result || result.length === 0) {
//       productRow1.innerHTML = `<p class="text-center">No Records Found</p>`;
//       return;
//     }

    
//     productRow1.innerHTML = "";
//     productRow2.innerHTML = "";
    

//     result.forEach(item => {
//       const card = `
//         <div class="col-md-4 mb-3">
//         <div class="  " style="width: 360px;" >
//             <img src="${item.image}"   class="card-img-top  " alt="${item.name}">
//                 <div class="card-body">
//                 <div class="d-flex justify-content-between align-items-center">
//                     <h5 class="card-title CustomP-14-400 my-3 my-lg-3">${item.name}</h5>
//                     <a class="text-reset " href="#">
//                     <i class="fa-regular fa-heart"></i>
//                     </a> 
//                 </div>
//                 <p class="card-text cardtitle-Black">${item.description.substring(0, 100)}</p>

//                 <div class="d-flex justify-content-between align-items-center ">
//                     <div class="div">
//                     <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
//                     <span>5.0 (18)</span>
//                     </div>
//                     <span class="fw-bold">₦${item.price}</span>
//                 </div>
//                 </div>
//                 <p class="mb-2"><small>Stock: ${item.numberInStock}</small></p>
//                 <button class="btn customBtn mt-4 hover-underline mb-5 mb-lg-0">Add to cart</button>
//             </div>
//             </div>
//         </div>
//       `;
//       productRow1.innerHTML += card;
//       productRow2.innerHTML += card;
      
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     productRow1.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//   }
// }

// document.addEventListener("DOMContentLoaded", showProducts1);




// const productRow1 = document.getElementById("productsRow1");
// const productRow2 = document.getElementById("productsRow2");

// async function showProducts1(event) {
//   if (event) event.preventDefault();

//   const token = localStorage.getItem("key");
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/features", {
//       method: "GET",
//       headers
//     });

//     const result = await response.json();
//     console.log(result);

//     if (!result || result.length === 0) {
//       if (productRow1) productRow1.innerHTML = `<p class="text-center">No Records Found</p>`;
//       if (productRow2) productRow2.innerHTML = `<p class="text-center">No Records Found</p>`;
//       return;
//     }

//     // Clear before adding
//     if (productRow1) productRow1.innerHTML = "";
//     if (productRow2) productRow2.innerHTML = "";

//     result.forEach(item => {
//       const card = `
//         <div class="col-md-4 mb-3">
//           <div class="" style="width: 360px;">
//             <img src="${item.image}" class="card-img-top" alt="${item.name}">
//             <div class="card-body">
//               <div class="d-flex justify-content-between align-items-center">
//                 <h5 class="card-title CustomP-14-400 my-3">${item.name}</h5>
//                 <a class="text-reset" href="#">
//                   <i class="fa-regular fa-heart"></i>
//                 </a>
//               </div>
//               <p class="card-text cardtitle-Black">${item.description.substring(0, 100)}</p>
//               <div class="d-flex justify-content-between align-items-center">
//                 <div>
//                   <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
//                   <span>5.0 (18)</span>
//                 </div>
//                 <span class="fw-bold">₦${item.price}</span>
//               </div>
//             </div>
//             <p class="mb-2"><small>Stock: ${item.numberInStock}</small></p>
//             <button class="btn customBtn mt-4 hover-underline mb-5">Add to cart</button>
//           </div>
//         </div>
//       `;

//       if (productRow1) productRow1.innerHTML += card;
//       if (productRow2) productRow2.innerHTML += card;
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     if (productRow1) productRow1.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//     if (productRow2) productRow2.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//   }
// }

// const rowIds = ["productsRow1", "productsRow2"];

// async function showProducts1(event) {
//   if (event) event.preventDefault();

//   const token = localStorage.getItem("key");
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/features", {
//       method: "GET",
//       headers
//     });

//     const result = await response.json();
//     console.log(result);

//     // Get all rows
//     const rows = rowIds.map(id => document.getElementById(id)).filter(Boolean);

//     if (!result || result.length === 0) {
//       rows.forEach(row => row.innerHTML = `<p class="text-center">No Records Found</p>`);
//       return;
//     }

//     rows.forEach(row => row.innerHTML = ""); // clear

//     result.forEach(item => {
//       const card = `
//         <div class="col-md-4 mb-3">
//           <div style="width: 360px;">
//             <img src="${item.image}" class="card-img-top" alt="${item.name}">
//             <div class="card-body">
//               <h5>${item.name}</h5>
//               <p>${item.description.substring(0, 100)}</p>
//               <span>₦${item.price}</span>
//             </div>
//           </div>
//         </div>
//       `;
//       rows.forEach(row => row.innerHTML += card);
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     rowIds.forEach(id => {
//       const row = document.getElementById(id);
//       if (row) row.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", showProducts1);




// const displayRow = document.getElementById("displayRow1");

//     async function showProducts1(event) {
//   if (event) event.preventDefault();

//   const token = localStorage.getItem("key");
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/features", {
//       method: "GET",
//       headers
//     });

//     const result = await response.json();

//     console.log(result);

//     if (!result || result.length === 0) {
//       displayRow.innerHTML = `<p class="text-center">No Records Found</p>`;
//       return;
//     }

   
//     displayRow.innerHTML = "";

//     result.forEach(item => {
//       const card = `
//         <div class="col-md-4 mb-3">
//         <div class="  " style="width: 360px;" >
//             <img src="${item.image}"   class="card-img-top  " alt="${item.name}">
//                 <div class="card-body">
//                 <div class="d-flex justify-content-between align-items-center">
//                     <h5 class="card-title CustomP-14-400 my-3 my-lg-3">${item.name}</h5>
//                     <a class="text-reset " href="#">
//                     <i class="fa-regular fa-heart"></i>
//                     </a> 
//                 </div>
//                 <p class="card-text cardtitle-Black">${item.description.substring(0, 100)}</p>

//                 <div class="d-flex justify-content-between align-items-center ">
//                     <div class="div">
//                     <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
//                     <span>5.0 (18)</span>
//                     </div>
//                     <span class="fw-bold">₦${item.price}</span>
//                 </div>
//                 </div>
//                 <p class="mb-2"><small>Stock: ${item.numberInStock}</small></p>
//                 <button class="btn customBtn mt-4 hover-underline mb-5 mb-lg-0">Add to cart</button>
//             </div>
//             </div>
//         </div>
//       `;
//       displayRow.innerHTML += card;
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//    displayRow.innerHTML = `<p class="text-danger text-center">Failed to load products</p>`;
//   }
// }

// document.addEventListener("DOMContentLoaded", showProducts1);








     


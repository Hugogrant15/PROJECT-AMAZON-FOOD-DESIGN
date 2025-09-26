
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
                  // ✅ Show badge immediately
                
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
            // const loginBadge = document.getElementById("loginBadge");
            //     if (loginBadge) loginBadge.style.display = "inline-block";
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

// function to show all products
// async function showProducts() {
//   try {
//     const response = await fetch("http://localhost:3001/amazon/document/api/products");
//     if (!response.ok) throw new Error("Failed to fetch products");
//     const products = await response.json();
//     console.log("Products:", products);
//     const productsRow = document.getElementById("productpageRow");
//     if (!productsRow) return;
//     productsRow.innerHTML = "";
//     products.forEach(product => {
//       // Prefer MongoDB _id, fallback to id
//       const productId = product._id || product.id;
//       const col = document.createElement("div");
//       col.className = "col-md-6 col-lg-3 mb-4";
//       col.innerHTML = `
//         <div class="card h-100 shadow-sm Image6Card1">
//           <img style = "object-fit: cover; width: 100%; height: 250px;" src="${Array.isArray(product.image) ? product.image[0] : product.image}"
//                alt="${product.name}"
//                class="card-img-top product-img"
//                id= "imageReveal Image6Card1"
//                onclick="goToProductDetails('${productId}')">
//                 <div class="card-body">
//                 <h5 class=""></h5>
//                     <div class="d-flex justify-content-between mt-3"><p class="">Coconut Flakes</p>
//                     <div>
//                     <a href="#"><i class="fa-regular fa-heart fa-2x" style="color: #0F0B0B;"></i></a>
//                     </div>
//                 </div>
//                 <p class = "card-title fs-5 fw-bold">${product.name}</p>
//               <div class="d-flex justify-content-between">
//                 <p class="fs-5"><i class="fa-solid fa-star me-2" style="color: #F58634;"></i>5.0 (18)</p>
//               <p class="fs-5">₦${product.price}</p>
//             </div>
//             <button type="button" class="btn btn-outline-success w-100 py-3 fs-5">Add To Cart</button>
//         </div>
//       `;
//       productsRow.appendChild(col);
//     });
//   } catch (error) {
//     console.error("Error loading products:", error);
//   }
// }
// document.addEventListener('DOMContentLoaded', function() {
//     showProducts();
// })

const CART_KEY = "site_cart_v1";
let cart = [];

// -------------------- Toast Setup --------------------
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
let toastOffset = 0;
function showStackedToast(icon, title) {
  Toast.fire({
    icon,
    title,
    didOpen: (toast) => {
      toast.style.marginTop = `${toastOffset}px`;
      toastOffset += 60;
      toast.addEventListener("animationend", () => {
        toastOffset = 0;
      });
    }
  });
}
// -------------------- Cart helpers --------------------
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    cart = [];
  }
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // update same-page UI immediately
  updateCartCount();
  syncCartButtons();
  renderCartPage();
  renderOrderSummary();
  // notify any same-page listeners
  document.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
  // other tabs will receive storage event automatically
}
function findItem(id) {
  return cart.find(i => String(i.id) === String(id));
}
function isInCart(id) {
  return !!findItem(id);
}
function addToCart(product) {
  const existing = findItem(product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      id: String(product.id),
      name: product.name,
      price: Number(product.price || 0),
      image: product.image || "",
      quantity: 1
    });
  }
  saveCart();
  showStackedToast("success", `${product.name} added to cart`);
}
function removeFromCart(id) {
  const item = findItem(id);
  cart = cart.filter(i => String(i.id) !== String(id));
  saveCart();
  if (item) {
    showStackedToast("error", `${item.name} removed from cart`);
  }
}
function setQty(id, qty) {
  const item = findItem(id);
  if (!item) return;
  item.quantity = Number(qty);
  if (item.quantity <= 0) removeFromCart(id);
  else saveCart();
}
function toggleCart(product) {
  if (isInCart(product.id)) removeFromCart(product.id);
  else addToCart(product);
}

function updateCartCount() {
  if (typeof cart === 'undefined') return; // make sure `cart` exists
  const totalProducts = cart.length; // unique products only
  // select any counters you use (IDs or class)
  const counters = document.querySelectorAll('#cartCount, #cartCount1, .cart-count');
  counters.forEach(el => {
    el.textContent = totalProducts;
  });
}
// Update all Add/Remove buttons on page
function syncCartButtons() {
  document.querySelectorAll(".cart-btn[data-product-id]").forEach(btn => {
    const pid = btn.dataset.productId;
    if (isInCart(pid)) {
      btn.textContent = "Remove From Cart";
      btn.classList.remove("btn-outline-success");
      btn.classList.add("btn-danger");
      btn.setAttribute("aria-pressed", "true");
    } else {
      btn.textContent = "Add To Cart";
      btn.classList.remove("btn-danger");
      btn.classList.add("btn-outline-success");
      btn.setAttribute("aria-pressed", "false");
    }
  });
}
// -------------------- Product rendering --------------------
function renderProducts(products, containerId = "productsRow") {
  const container = document.getElementById(containerId) || document.getElementById("productContainer");
  if (!container) return;
  container.innerHTML = "";
  products.forEach(product => {
    const productId = String(product._id || product.id || product.name.replace(/\s+/g, "-"));
    // create bootstrap column wrapper if you want grid layout
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-3 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img style = "object-fit: cover; width: 100%; height: 250px;"
          src="${Array.isArray(product.image) ? product.image[0] : (product.image || '')}"
          alt="${escapeHtml(product.name)}"
          class="card-img-top product-img product-link"
          data-product-id="${productId}"
          id= "imageReveal"
          >
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between mt-1 mb-2">
            <small class="text-muted">Category</small>
            <a href="#" class="text-dark"><i class="fa-regular fa-heart fa-lg"></i></a>
          </div>
          <p class="card-title fs-5 fw-bold mb-2">${escapeHtml(product.name)}</p>
          <div class="d-flex justify-content-between align-items-center mb-3 ">
            <div class="small text-muted"><i class="fa-solid fa-star me-1" style="color:#f58634"></i>5.0 (18)</div>
            <div class="fs-5">₦${Number(product.price || 0).toLocaleString()}</div>
          </div>
          <button
            type="button"
            class="cart-btn btn btn-outline-success mt-4 w-100 py-3 fs-5 "
            data-product-id="${productId}"
            data-product-name="${escapeHtml(product.name)}"
            data-product-price="${product.price}"
            data-product-image="${Array.isArray(product.image) ? product.image[0] : (product.image || '')}">
            Add To Cart
          </button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
  // Ensure buttons reflect cart state after render
  syncCartButtons();
}
// -------------------- Cart page rendering --------------------
function renderCartPage() {
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!container) return; // not on cart page
  container.innerHTML = "";
  if (!cart.length) {
    container.innerHTML = "<p>Your cart is empty</p>";
    if (totalEl) totalEl.textContent = "₦0";
    return;
  }
  const title = document.createElement("p");
  title.className = "bill fw-bold fs-4 text-dark";
  title.textContent = `Shopping Cart (${cart.length} items)`;
  container.appendChild(title);

  cart.forEach(item => {
    const lineTotal = Number(item.price || 0) * Number(item.quantity || 1);
    const row = document.createElement("div");
    row.className = "  ";
    row.style.gap = "";
    row.innerHTML = `
            
          <div class="d-flex justify-content-between align-items-center diSplay">
              <div class="div d-flex align-items-center">
                <p><a class="link-offset-2 CustomP-16-400 me-3 me-lg-3" href="#">save for later</a></p>
                <button class=" CustomP-16-400 remove-btn mb-3" data-id="${item.id}" style = "border: none; background: transparent; " >
                <i class="fa-solid fa-trash"></i> Remove
              </button>
              </div>

            <div class="d-flex align-items-center justify-content-between" style="gap:10px;">
              <div class="input-group input-group-sm" style="width:110px;">
                  <button class="btn btn-outline-secondary qty-btn" data-id="${item.id}" data-change="-1">−</button>
                  <input type="text" readonly class="form-control text-center" value="${item.quantity}">
                  <button class="btn btn-outline-secondary qty-btn" data-id="${item.id}" data-change="1">+</button>
              </div>
            </div>
          </div>
          
          <div class="d-flex align-items-center" style="gap:12px;">
            <img src="${item.image || "https://via.placeholder.com/80"}" alt="${escapeHtml(item.name)}" width="120" height="120" style="object-fit:cover;">
              <div class="">
                <strong class="cartPTAG">${escapeHtml(item.name)}</strong><br>
                <p class=" CustomP-16-400 ">Product ID: ${escapeHtml(item.id)}</p>
                ₦${lineTotal.toLocaleString()}
                <small class="text-muted d-block mb-2 fw-bold text-dark">(₦${Number(item.price || 0).toLocaleString()} each)</small>
              </div>
          </div>

    `;
    container.appendChild(row);
  });
  const total = cart.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0);
  if (totalEl) totalEl.textContent = `₦${total.toLocaleString()}`;
}

// order summary function 
function renderOrderSummary() {
  const summaryEl = document.getElementById("orderSummary");
  if (!summaryEl) return;

  if (!cart.length) {
    summaryEl.innerHTML = `
      <p>Your cart is empty</p>
      <h4>Total: ₦0</h4>
    `;
    return;
  }

  // 1. Calculate values
  const originalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
    0
  );
  const savings = originalPrice * 0.05; // 5% savings
  const subtotal = originalPrice - savings;
  const estimatedTax = subtotal * 0.05; // 5% tax
  const total = subtotal + estimatedTax;

  // 2. Render summary
  summaryEl.innerHTML = `
    <div class="border-top pt-4 ">
      <p>Original Price: <span class="float-end">₦${originalPrice.toLocaleString()}</span></p>
      <p>Savings (5%): <span class="float-end text-success">-₦${savings.toLocaleString()}</span></p>
      <p>Shipping: <span class="float-end">FREE</span></p>
      <p>Estimated Sales Tax (5%): <span class="float-end">₦${estimatedTax.toLocaleString()}</span></p>
      <hr>
      <h5>Total: <span class="float-end fw-bold">₦${total.toLocaleString()}</span></h5>
    </div>
    
  `;
}








// -------------------- Fetching --------------------
async function loadProductsFromApi() {
  // try both container ids, so function runs only if product page exists
  const containerExists = document.getElementById("productsRow") || document.getElementById("productContainer");
  if (!containerExists) return;
  try {
    const res = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!res.ok) throw new Error("Failed to fetch products: " + res.status);
    const products = await res.json();
    // normalize if your API returns an object with data: []
    const list = Array.isArray(products) ? products : (products.data || []);
    renderProducts(list, "productsRow");
  } catch (err) {
    console.error("Error loading products:", err);
    const container = document.getElementById("productsRow") || document.getElementById("productContainer");
    if (container) container.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
  }
}
// -------------------- Utilities --------------------
function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
// -------------------- Event delegation --------------------
document.addEventListener("click", (e) => {
  // Add / Remove product buttons
  const cartBtn = e.target.closest(".cart-btn[data-product-id]");
  if (cartBtn) {
    const product = {
      id: cartBtn.dataset.productId,
      name: cartBtn.dataset.productName,
      price: parseFloat(cartBtn.dataset.productPrice) || 0,
      image: cartBtn.dataset.productImage || ""
    };
    toggleCart(product);
    return;
  }
  // Click on product image -> goToProductDetails(productId) if available, else go to product.html?id=...
  const productLink = e.target.closest(".product-link[data-product-id]");
  if (productLink) {
    const pid = productLink.dataset.productId;
    if (typeof window.goToProductDetails === "function") {
      window.goToProductDetails(pid);
    } else {
      // fallback navigation
      window.location.href = `./product.html?id=${encodeURIComponent(pid)}`;
    }
    return;
  }
  // Remove button on cart page
  const removeBtn = e.target.closest(".remove-btn[data-id]");
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    removeFromCart(id);
    return;
  }
  // Qty buttons on cart page
  const qtyBtn = e.target.closest(".qty-btn[data-id][data-change]");
  if (qtyBtn) {
    const id = qtyBtn.dataset.id;
    const change = Number(qtyBtn.dataset.change || 0);
    const item = findItem(id);
    if (item) {
      setQty(id, (Number(item.quantity || 1) + change));
    }
    return;
  }
});
// Also listen for custom cartUpdated (internal) so components can react if needed
document.addEventListener("cartUpdated", () => {
  // currently handled in saveCart() via direct calls; left here for extensions
});
// storage event from other tabs
window.addEventListener("storage", (e) => {
  if (e.key === CART_KEY) {
    loadCart();
    updateCartCount();
    syncCartButtons();
    renderCartPage();
    

  }
});
// -------------------- Init on page load --------------------
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
  // sync any pre-existing buttons (if product HTML was server-rendered)
  syncCartButtons();
  renderCartPage();
  // fetch products and render if on product page
  loadProductsFromApi();
  renderOrderSummary();
});
// function to show all products ends here

// function to show 5 products
async function fiveProducts() {
  try {
    const response = await fetch("http://localhost:3001/amazon/document/api/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    console.log("Products:", products);
    const carousels = ["carousel1", "carousel2"]; // both IDs
    const toShow = Array.isArray(products) ? products.slice(0, 5) : [];
    carousels.forEach(id => {
      const productsRow = document.getElementById(id);
      if (!productsRow) return;
      productsRow.innerHTML = "";
      toShow.forEach(product => {
        const productId = product._id || product.id;
        const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;
        const col = document.createElement("div");
        col.className = "  ";
        col.innerHTML = `
          <div class=" ">
              <div class="card h-100 shadow border-0">
                  <img  style = "object-fit: cover; width: 360px; height: 300px;" src="${imageSrc}" alt="${product.name}"
                      class="card-img-top product-img px-lg-0 px-2"
                      id="imageReveal"
                      onclick="goToProductDetails('${productId}')"
                    >
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mt-3">
                        <p class="CustomP-14-400">${product.name}</p>
                        <div>
                          <a href="#"><i class="fa-regular fa-heart " style="color: #0F0B0B;"></i></a>
                        </div>
                      </div>
                      <p class="card-title fs-5 fw-bold ">${product.name}</p>
                      <div class="d-flex justify-content-between align-items-center ">
                        <div class="div d-flex justify-content-between align-items-center mt-3">
                          <span><i class="fa-solid fa-star" style="color: #f27907;"></i></span>
                          <span>5.0 (18)</span>
                        </div>
                        <span class="fw-bold mt-3">₦${product.price}</span>
                     </div>
                     <div class="mt-5">
                     <button
                      type="button"
                      class="cart-btn btn btn-outline-success mt-auto w-100 py-3 fs-5 mt-5"
                      data-product-id="${productId}"
                      data-product-name="${escapeHtml(product.name)}"
                      data-product-price="${product.price}"
                      data-product-image="${Array.isArray(product.image) ? product.image[0] : (product.image || '')}">
                      Add To Cart
                    </button>
                    </div>
                  </div>
              </div>
          </div>
        `;
        productsRow.appendChild(col);
      });
        syncCartButtons();
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}
document.addEventListener('DOMContentLoaded', function() {
    fiveProducts();
})
// function to show 5 products ends here



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
  
   












// -------------------
// LOGIN FUNCTION
// -------------------
// function loginButton(event) {
//   event.preventDefault();
//   const spinItem = document.querySelector(".spin");
//   spinItem.style.display = "inline-block";

//   const getEmail = document.getElementById("email").value;
//   const getPassword = document.getElementById("password").value;

//   if (getEmail === "" || getPassword === "") {
//     Swal.fire({
//       icon: 'info',
//       text: 'All fields are required!',
//       confirmButtonColor: "#00A859"
//     });
//     spinItem.style.display = "none";
//     return;
//   }

//   const signData = { email: getEmail, password: getPassword };
//   const signMethod = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(signData)
//   };

//   fetch('http://localhost:3001/amazon/document/api/login', signMethod)
//     .then(response => response.json())
//     .then(result => {
//       console.log(result);

//       if (result.success || result.token) {
//         // Save token and ids
//         localStorage.setItem("key", result.token);
//         localStorage.setItem("customerloginid", result._id);
//         localStorage.setItem("customerid", result._id);

//         Swal.fire({
//           icon: 'success',
//           text: `Login Successful`,
//           confirmButtonColor: "#2D85DE",
//           timer: 1500,
//           showConfirmButton: false
//         });

//         // ✅ Show badge immediately
//         const loginBadge = document.getElementById("loginBadge");
//         if (loginBadge) loginBadge.style.display = "inline-block";

//         // Redirect
//         setTimeout(() => {
//           location.href = "index.html";
//         }, 2000);
//       } else {
//         Swal.fire({
//           icon: 'info',
//           text: result.message || 'Login Failed',
//           confirmButtonColor: "#2D85DE"
//         });
//         spinItem.style.display = "none";
//       }
//     })
//     .catch(error => {
//       console.error('error', error);
//       Swal.fire({
//         icon: 'info',
//         text: `Something went wrong, Try Again`,
//         confirmButtonColor: "#2D85DE"
//       });
//       spinItem.style.display = "none";
//     });
// }






     


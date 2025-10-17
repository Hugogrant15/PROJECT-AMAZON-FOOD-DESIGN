
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
                localStorage.setItem("customername", result.name)
                localStorage.setItem("customeremail", result.email)
                localStorage.setItem("customerphone", result.phoneNumber)

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
                    location.href = "product-page.html";
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
// -------------------- Cart logic --------------------
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
    const category = product.category?.name || product.category || "Uncategorized";
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
            <small class="text-muted">${escapeHtml(category)}</small>
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
                <button class=" CustomP-16-400 remove-btn mb-3 mb-lg-3" data-id="${item.id}" style = "border: none; background: transparent; " >
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
                <p class=" CustomP-16-400CT ">Product ID: ${escapeHtml(item.id)}</p>
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
    <div class="border-top pt-4 pt-lg-4 ">
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
     renderOrderSummary();
    

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
  
   
//     document.getElementById("placeOrderBtn").addEventListener("click", async function () {
//   const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked').value;

//   // Collect cart + customer info
//   const cart = JSON.parse(localStorage.getItem("CART_KEY")) || [];
//   const customerId = localStorage.getItem("customerloginid");

//   const orderPayload = {
//     customerId,
//     customerSnapshot: {
//       firstName: document.getElementById("firstName").value,
//       lastName: document.getElementById("lastName").value,
//       email: document.getElementById("email").value,
//       phone: document.getElementById("phone").value,
//       state: document.getElementById("state").value,
//       city: document.getElementById("city").value,
//       address: document.getElementById("address").value
//     },
//     items: cart.map(item => ({
//       productId: item.id,
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       quantity: item.quantity,
//       subTotal: item.price * item.quantity
//     })),
//     totalAmount: cart.reduce((acc, i) => acc + i.price * i.quantity, 0),
//     paymentGateway: selectedPayment
//   };

//   try {
//     const res = await fetch("http://localhost:3001/amazon/document/api/orders/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderPayload)
//     });

//     const data = await res.json();
//     if (data.authorizationUrl) {
//       window.location.href = data.authorizationUrl; // redirect to Paystack
//     } else {
//       alert("Failed to initialize payment");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Error creating order");
//   }
// });



// logout function logic
  //  document.addEventListener('DOMContentLoaded', () => {
  //   const logoutBtn = document.getElementById('logoutBtn');
  //   const loginBadge = document.getElementById('loginBadge');

  //   // Safe initialization of badge on load
  //   if (loginBadge) {
  //     const token = localStorage.getItem('key');
  //     const email = localStorage.getItem('customerEmail') || '';
  //     if (token) {
  //       loginBadge.style.display = 'inline-block';
  //       if (email) loginBadge.textContent = email.charAt(0).toUpperCase();
  //     } else {
  //       loginBadge.style.display = 'none';
  //     }
  //   }

  //   // If no button found, bail out (prevents null errors)
  //   if (!logoutBtn) {
  //     console.warn('logoutBtn not found in DOM.');
  //     return;
  //   }

  //   // Optional: debug log so you can confirm handler is attached
  //   console.log('logout button initialized');

  //   // Attach click listener
  //   logoutBtn.addEventListener('click', (e) => {
  //     // quick debug log
  //     console.log('logoutBtn clicked', e);

  //     // Show confirmation
  //     Swal.fire({
  //       title: 'Are you sure you want to log out?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, Logout',
  //       cancelButtonText: 'No',
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "#3085d6"
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Clear localStorage keys
  //         localStorage.removeItem("key");
  //         localStorage.removeItem("customerloginid");
  //         localStorage.removeItem("customerid");
  //         localStorage.removeItem("cart");
  //         localStorage.removeItem("site_cart_v1");
  //         localStorage.removeItem("customername")
  //         localStorage.removeItem("customeremail");
  //         localStorage.removeItem("customerphone");

  //         // hide badge if present
  //         if (loginBadge) loginBadge.style.display = 'none';

  //         // show success and redirect
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Logged Out',
  //           text: 'You have been successfully logged out.',
  //           timer: 1200,
  //           showConfirmButton: false
  //         });

  //         setTimeout(() => { window.location.href = 'login.html'; }, 1200);
  //       }
  //     });
  //   }, { passive: true });
  // });

  // prefil checkout form if user is logged in
// document.addEventListener("DOMContentLoaded", function() {
//   // Get stored user data from localStorage
//   const userEmail = localStorage.getItem("customeremail");
//   const userPhone = localStorage.getItem("customerphone");
//   // Prefill email input
//   const emailInput = document.getElementById("email");
//   if (emailInput && userEmail) {
//     emailInput.value = userEmail;
//     emailInput.readOnly = true; // Prevent editing but still submits
//   }
//   // Prefill phone input
//   const phoneInput = document.getElementById("phone");
//   if (phoneInput && userPhone) {
//     phoneInput.value = userPhone;
//     phoneInput.readOnly = true; // Prevent editing but still submits
//   }
// });
//   const fullName = localStorage.getItem("customername");
//   // Split full name into first and last name
//   let firstName = "";
//   let lastName = "";
//   if (fullName) {
//     const nameParts = fullName.trim().split(" ");
//     firstName = nameParts[0] || "";
//     lastName = nameParts.slice(1).join(" ") || "";
//   }
//   // Prefill First Name
//   const firstInput = document.getElementById("firstName");
//   if (firstInput && firstName) {
//     firstInput.value = firstName;
//     firstInput.readOnly = true; // user can’t change it
//   }
//   // Prefill Last Name
//   const lastInput = document.getElementById("lastName");
//   if (lastInput && lastName) {
//     lastInput.value = lastName;
//     lastInput.readOnly = true;
//   }
 

  
// -------------------- Place Order + Paystack --------------------
//   function parseJwt(token) {
//     try {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       return JSON.parse(window.atob(base64));
//     } catch (err) {
//       console.error(":x: Invalid token", err);
//       return null;
//     }
//   }

//   document.addEventListener("DOMContentLoaded", () => {
//   const btn = document.getElementById("placeOrderBtn");
//   if (!btn) return console.error(":x: placeOrderBtn not found in DOM");

//   btn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log(":large_green_circle: Place Order clicked");

//     // Collect form values
//     const firstName = document.getElementById("firstName")?.value.trim();
//     const lastName = document.getElementById("lastName")?.value.trim();
//     const email = document.getElementById("email")?.value.trim();
//     const phone = document.getElementById("phone")?.value.trim();
//     const address = document.getElementById("address")?.value.trim();
//     const country = document.getElementById("country")?.value.trim();
//     const state = document.getElementById("state")?.value.trim();
//     const city = document.getElementById("city")?.value.trim();

//     if (!firstName || !lastName || !email || !phone || !state || !city || !address || !country) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Please fill in all required fields.",
//         confirmButtonColor: "#F58634"
//       });
//     }

//     // Decode token
//     const token = localStorage.getItem("key");
//     const decoded = parseJwt(token);
//     const customerId = decoded?.id || decoded?._id || decoded?.userId;
//     if (!customerId) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "You must be logged in to place an order.",
//         confirmButtonColor: "#F58634"
//       }).then(() => window.location.href = "./login.html");
//     }

//     // Load cart
//     const cart = JSON.parse(localStorage.getItem("site_cart_v1")) || [];
//     if (!cart.length) {
//       return Swal.fire({
//         icon: "warning",
//         title: "Empty Cart",
//         text: "Your cart is empty. Please add items before placing an order.",
//         confirmButtonColor: "#F58634"
//       });
//     }

//     // Format items & totals
//     const items = cart.map(item => ({
//       productId: item.id,
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       quantity: item.quantity,
//       subTotal: item.price * item.quantity
//     }));
//     const originalPrice = items.reduce((acc, item) => acc + item.subTotal, 0);
//     const savings = Math.round(originalPrice * 0.05);
//     const estimatedTax = Math.round((originalPrice - savings) * 0.05);
//     const total = originalPrice - savings + estimatedTax;

//     // Step 1: Create order in backend (which also initializes Paystack)
//     const orderPayload = {
//       customerId,
//       customerSnapshot: { firstName, lastName, email, phone, state, city, address, country },
//       items,
//       totalAmount: total,
//       // quantity: items.reduce((acc, item) => acc + item.quantity, 0)
//     };

//     console.log(":rocket: Sending order payload:", orderPayload);

//     try {
//       const response = await fetch("http://localhost:3001/amazon/document/api/orders/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderPayload),
//       });

//       if (!response.ok) {
//         const text = await response.text();
//         throw new Error(`Backend returned HTTP ${response.status}: ${text}`);
//       }

//       const orderData = await response.json();
//       console.log(":large_blue_circle: Backend response:", orderData);

//       if (!orderData.success || !orderData.authorizationUrl) {
//         throw new Error(orderData.message || "Order creation failed");
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Order Created!",
//         text: "Redirecting to Paystack for secure payment...",
//         showConfirmButton: false,
//         timer: 2000
//       }).then(() => window.location.href = orderData.authorizationUrl);

//     } catch (err) {
//       console.error(":x: Order/Payment error:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Order Failed",
//         text: err.message,
//         confirmButtonColor: "#F58634"
//       });
//     }
//   });
// });
                

// -------------------- Nigeria States + LGAs --------------------
 // ✅ Local dataset for Nigeria (States + LGAs)
  // const nigeriaStatesAndLGAs = {
  //   "Abia": ["Aba North","Aba South","Arochukwu","Bende","Ikwuano","Isiala Ngwa North","Isiala Ngwa South","Isuikwuato","Obi Ngwa","Ohafia","Osisioma","Ugwunagbo","Ukwa East","Ukwa West","Umuahia North","Umuahia South","Umu Nneochi"],
  //   "Adamawa": ["Demsa","Fufure","Ganye","Girei","Gombi","Guyuk","Hong","Jada","Lamurde","Madagali","Maiha","Mayo-Belwa","Michika","Mubi North","Mubi South","Numan","Shelleng","Song","Toungo","Yola North","Yola South"],
  //   "Akwa Ibom": ["Abak","Eastern Obolo","Eket","Esit Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat Enin","Nsit Atai","Nsit Ibom","Nsit Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung Uko","Ukanafun","Uruan","Urue-Offong/Oruko","Uyo"],
  //   "Anambra": ["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"],
  //   "Bauchi": ["Alkaleri","Bauchi","Bogoro","Damban","Darazo","Dass","Gamawa","Ganjuwa","Giade","Itas/Gadau","Jama’are","Katagum","Kirfi","Misau","Ningi","Shira","Tafawa Balewa","Toro","Warji","Zaki"],
  //   "Bayelsa": ["Brass","Ekeremor","Kolokuma/Opokuma","Nembe","Ogbia","Sagbama","Southern Ijaw","Yenagoa"],
  //   "Benue": ["Ado","Agatu","Apa","Buruku","Gboko","Guma","Gwer East","Gwer West","Katsina-Ala","Konshisha","Kwande","Logo","Makurdi","Obi","Ogbadibo","Ohimini","Oju","Okpokwu","Otukpo","Tarka","Ukum","Ushongo","Vandeikya"],
  //   "Borno": ["Abadam","Askira/Uba","Bama","Bayo","Biu","Chibok","Damboa","Dikwa","Gubio","Guzamala","Gwoza","Hawul","Jere","Kaga","Kala/Balge","Konduga","Kukawa","Kwaya Kusar","Mafa","Magumeri","Maiduguri","Marte","Mobbar","Monguno","Ngala","Nganzai","Shani"],
  //   "Cross River": ["Abi","Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South","Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yakuur","Yala"],
  //   "Delta": ["Aniocha North","Aniocha South","Bomadi","Burutu","Ethiope East","Ethiope West","Ika North East","Ika South","Isoko North","Isoko South","Ndokwa East","Ndokwa West","Okpe","Oshimili North","Oshimili South","Patani","Sapele","Udu","Ughelli North","Ughelli South","Ukwuani","Uvwie","Warri North","Warri South","Warri South West"],
  //   "Ebonyi": ["Abakaliki","Afikpo North","Afikpo South","Ebonyi","Ezza North","Ezza South","Ikwo","Ishielu","Ivo","Izzi","Ohaozara","Ohaukwu","Onicha"],
  //   "Edo": ["Akoko-Edo","Egor","Esan Central","Esan North-East","Esan South-East","Esan West","Etsako Central","Etsako East","Etsako West","Igueben","Ikpoba-Okha","Orhionmwon","Oredo","Ovia North-East","Ovia South-West","Owan East","Owan West","Uhunmwonde"],
  //   "Ekiti": ["Ado Ekiti","Efon","Ekiti East","Ekiti South-West","Ekiti West","Emure","Gbonyin","Ido Osi","Ijero","Ikere","Ikole","Ilejemeje","Irepodun/Ifelodun","Ise/Orun","Moba","Oye"],
  //   "Enugu": ["Aninri","Awgu","Enugu East","Enugu North","Enugu South","Ezeagu","Igbo Etiti","Igbo Eze North","Igbo Eze South","Isi Uzo","Nkanu East","Nkanu West","Nsukka","Oji River","Udenu","Udi","Uzo-Uwani"],
  //   "Gombe": ["Akko","Balanga","Billiri","Dukku","Funakaye","Gombe","Kaltungo","Kwami","Nafada","Shongom","Yamaltu/Deba"],
  //   "Imo": ["Aboh Mbaise","Ahiazu Mbaise","Ehime Mbano","Ezinihitte","Ideato North","Ideato South","Ihitte/Uboma","Ikeduru","Isiala Mbano","Isu","Mbaitoli","Ngor Okpala","Njaba","Nkwerre","Nwangele","Obowo","Oguta","Ohaji/Egbema","Okigwe","Onuimo","Orlu","Orsu","Oru East","Oru West","Owerri Municipal","Owerri North","Owerri West"],
  //   "Jigawa": ["Auyo","Babura","Biriniwa","Birnin Kudu","Buji","Dutse","Gagarawa","Garki","Gumel","Guri","Gwaram","Gwiwa","Hadejia","Jahun","Kafin Hausa","Kaugama","Kazaure","Kiri Kasama","Kiyawa","Maigatari","Malam Madori","Miga","Ringim","Roni","Sule Tankarkar","Taura","Yankwashi"],
  //   "Kaduna": ["Birnin Gwari","Chikun","Giwa","Igabi","Ikara","Jaba","Jema'a","Kachia","Kaduna North","Kaduna South","Kagarko","Kajuru","Kaura","Kauru","Kubau","Kudan","Lere","Makarfi","Sabon Gari","Sanga","Soba","Zangon Kataf","Zaria"],
  //   "Kano": ["Ajingi","Albasu","Bagwai","Bebeji","Bichi","Bunkure","Dala","Dambatta","Dawakin Kudu","Dawakin Tofa","Doguwa","Fagge","Gabasawa","Garko","Garun Mallam","Gaya","Gezawa","Gwale","Gwarzo","Kabo","Kano Municipal","Karaye","Kibiya","Kiru","Kumbotso","Kunchi","Kura","Madobi","Makoda","Minjibir","Nasarawa","Rano","Rimin Gado","Rogo","Shanono","Sumaila","Takai","Tarauni","Tofa","Tsanyawa","Tudun Wada","Ungogo","Warawa","Wudil"],
  //   "Katsina": ["Bakori","Batagarawa","Batsari","Baure","Bindawa","Charanchi","Dan Musa","Dandume","Danja","Daura","Dutsi","Dutsin-Ma","Faskari","Funtua","Ingawa","Jibia","Kafur","Kaita","Kankara","Kankia","Katsina","Kurfi","Kusada","Mai'Adua","Malumfashi","Mani","Mashi","Matazu","Musawa","Rimi","Sabuwa","Safana","Sandamu","Zango"],
  //   "Kebbi": ["Aleiro","Arewa Dandi","Argungu","Augie","Bagudo","Birnin Kebbi","Bunza","Dandi","Fakai","Gwandu","Jega","Kalgo","Koko/Besse","Maiyama","Ngaski","Sakaba","Shanga","Suru","Wasagu/Danko","Yauri","Zuru"],
  //   "Kogi": ["Adavi","Ajaokuta","Ankpa","Bassa","Dekina","Ibaji","Idah","Igalamela Odolu","Ijumu","Kabba/Bunu","Kogi","Lokoja","Mopa-Muro","Ofu","Ogori/Magongo","Okehi","Okene","Olamaboro","Omala","Yagba East","Yagba West"],
  //   "Kwara": ["Asa","Baruten","Edu","Ekiti","Ifelodun","Ilorin East","Ilorin South","Ilorin West","Irepodun","Isin","Kaiama","Moro","Offa","Oke Ero","Oyun","Pategi"],
  //   "Lagos": ["Agege","Ajeromi-Ifelodun","Alimosho","Amuwo-Odofin","Apapa","Badagry","Epe","Eti-Osa","Ibeju-Lekki","Ifako-Ijaiye","Ikeja","Ikorodu","Kosofe","Lagos Island","Lagos Mainland","Mushin","Ojo","Oshodi-Isolo","Shomolu","Surulere"],
  //   "Nasarawa": ["Akwanga","Awe","Doma","Karu","Keana","Keffi","Kokona","Lafia","Nasarawa","Nasarawa Egon","Obi","Toto","Wamba"],
  //   "Niger": ["Agaie","Agwara","Bida","Borgu","Bosso","Chanchaga","Edati","Gbako","Gurara","Katcha","Kontagora","Lapai","Lavun","Magama","Mariga","Mashegu","Mokwa","Muya","Paikoro","Rafi","Rijau","Shiroro","Suleja","Tafa","Wushishi"],
  //   "Ogun": ["Abeokuta North","Abeokuta South","Ado-Odo/Ota","Egbado North","Egbado South","Ewekoro","Ifo","Ijebu East","Ijebu North","Ijebu North East","Ijebu Ode","Ikenne","Imeko Afon","Ipokia","Obafemi Owode","Odeda","Odogbolu","Ogun Waterside","Remo North","Shagamu"],
  //   "Ondo": ["Akoko North-East","Akoko North-West","Akoko South-West","Akoko South-East","Akure North","Akure South","Ese Odo","Idanre","Ifedore","Ilaje","Ile Oluji/Okeigbo","Irele","Odigbo","Okitipupa","Ondo East","Ondo West","Ose","Owo"],
  //   "Osun": ["Atakunmosa East","Atakunmosa West","Aiyedaade","Aiyedire","Boluwaduro","Boripe","Ede North","Ede South","Ife Central","Ife East","Ife North","Ife South","Egbedore","Ejigbo","Ifedayo","Ifelodun","Ila","Ilesa East","Ilesa West","Irepodun","Irewole","Isokan","Iwo","Obokun","Odo Otin","Ola Oluwa","Olorunda","Oriade","Orolu","Osogbo"],
  //   "Oyo": ["Afijio","Akinyele","Atiba","Atisbo","Egbeda","Ibadan North","Ibadan North-East","Ibadan North-West","Ibadan South-East","Ibadan South-West","Ibarapa Central","Ibarapa East","Ibarapa North","Ido","Ifedayo","Ifelodun","Irepo","Iseyin","Itesiwaju","Iwajowa","Kajola","Lagelu","Ogbomosho North","Ogbomosho South","Ogo Oluwa","Olorunsogo","Oluyole","Ona Ara","Orelope","Ori Ire","Oyo","Oyo East","Saki East","Saki West","Surulere"],
  //   "Plateau": ["Bokkos","Barkin Ladi","Bassa","Jos East","Jos North","Jos South","Kanam","Kanke","Langtang South","Langtang North","Mangu","Mikang","Pankshin","Qua’an Pan","Riyom","Shendam","Wase"],
  //   "Rivers": ["Abua/Odual","Ahoada East","Ahoada West","Akuku-Toru","Andoni","Asari-Toru","Bonny","Degema","Eleme","Emuoha","Etche","Gokana","Ikwerre","Khana","Obio/Akpor","Ogba/Egbema/Ndoni","Ogu/Bolo","Okrika","Omuma","Opobo/Nkoro","Oyigbo","Port Harcourt","Tai"],
  //   "Sokoto": ["Binji","Bodinga","Dange Shuni","Gada","Goronyo","Gudu","Gwadabawa","Illela","Isa","Kebbe","Kware","Rabah","Sabon Birni","Shagari","Silame","Sokoto North","Sokoto South","Tambuwal","Tangaza","Tureta","Wamako","Wurno","Yabo"],
  //   "Taraba": ["Ardo Kola","Bali","Donga","Gashaka","Gassol","Ibi","Jalingo","Karim Lamido","Kumi","Lau","Sardauna","Takum","Ussa","Wukari","Yorro","Zing"],
  //   "Yobe": ["Bade","Bursari","Damaturu","Fika","Fune","Geidam","Gujba","Gulani","Jakusko","Karasuwa","Machina","Nangere","Nguru","Potiskum","Tarmuwa","Yunusari","Yusufari"],
  //   "Zamfara": ["Anka","Bakura","Birnin Magaji/Kiyaw","Bukkuyum","Bungudu","Gummi","Gusau","Kaura Namoda","Maradun","Maru","Shinkafi","Talata Mafara","Chafe","Zurmi"],
  //   "Federal Capital Territory": ["Abaji","Bwari","Gwagwalada","Kuje","Kwali","Municipal Area Council"]
  // };

  // // ✅ Get dropdown elements
  // const countryDropdown = document.getElementById("country");
  // const stateDropdown = document.getElementById("state");
  // const cityDropdown = document.getElementById("city");

  // // ✅ Load countries (with ?fields=name fix)
  // async function loadCountries() {
  //   try {
  //     const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
  //     const data = await res.json();
  //     const countries = data.map(c => c.name.common).sort();

  //     countryDropdown.innerHTML = `<option value="">Select Country</option>`;
  //     countries.forEach(country => {
  //       countryDropdown.innerHTML += `<option value="${country}">${country}</option>`;
  //     });
  //     console.log("✅ Countries loaded:", countries.length);
  //   } catch (err) {
  //     console.error("Error loading countries:", err);
  //   }
  // }

  // // ✅ Load states
  // async function loadStates(country) {
  //   stateDropdown.innerHTML = `<option value="">Select State</option>`;
  //   cityDropdown.innerHTML = `<option value="">Select City</option>`;

  //   if (!country) return;

  //   if (country === "Nigeria") {
  //     // Use local dataset
  //     Object.keys(nigeriaStatesAndLGAs).forEach(state => {
  //       stateDropdown.innerHTML += `<option value="${state}">${state}</option>`;
  //     });
  //   } else {
  //     // API fallback for other countries
  //     try {
  //       const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ country })
  //       });
  //       const result = await res.json();

  //       if (result.data && result.data.states) {
  //         result.data.states.forEach(st => {
  //           stateDropdown.innerHTML += `<option value="${st.name}">${st.name}</option>`;
  //         });
  //       }
  //       console.log("✅ States loaded from local dataset:", Object.keys(nigeriaStatesAndLGAs).length);
  //     } catch (err) {
  //       console.error("Error loading states:", err);
  //     }
  //   }
  // }

  // // ✅ Load cities
  // async function loadCities(country, state) {
  //   cityDropdown.innerHTML = `<option value="">Select City</option>`;
  //   if (!state) return;

  //   if (country === "Nigeria") {
  //     nigeriaStatesAndLGAs[state]?.forEach(city => {
  //       cityDropdown.innerHTML += `<option value="${city}">${city}</option>`;
  //     });
  //     console.log("✅ Cities loaded from local dataset:", nigeriaStatesAndLGAs[state]?.length || 0);
  //   } else {
  //     try {
  //       const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ country, state })
  //       });
  //       const result = await res.json();

  //       if (result.data) {
  //         result.data.forEach(city => {
  //           cityDropdown.innerHTML += `<option value="${city}">${city}</option>`;
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Error loading cities:", err);
  //     }
  //   }
  // }

  // // ✅ Event listeners
  // countryDropdown.addEventListener("change", e => loadStates(e.target.value));
  // stateDropdown.addEventListener("change", e => loadCities(countryDropdown.value, e.target.value));

  // // ✅ Init
  // loadCountries();
             
    



     


// // order summary function 
// function renderOrderSummary2() {
//   const summaryEl = document.getElementById("Summary1");
//   if (!summaryEl) return;

//   if (!cart.length) {
//     summaryEl.innerHTML = `
//       <p>Your cart is empty</p>
//       <h4>Total: ₦0</h4>
//     `;
//     return;
//   }

//   // 1. Calculate values
//   const originalPrice = cart.reduce(
//     (sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
//     0
//   );
//   const savings = originalPrice * 0.05; // 5% savings
//   const subtotal = originalPrice - savings;
//   const estimatedTax = subtotal * 0.05; // 5% tax
//   const total = subtotal + estimatedTax;

//   // 2. Render summary
//   summaryEl.innerHTML = `
//     <div class="border-top pt-4 pt-lg-4 ">
//       <p>Original Price: <span class="float-end">₦${originalPrice.toLocaleString()}</span></p>
//       <p>Savings (5%): <span class="float-end text-success">-₦${savings.toLocaleString()}</span></p>
//       <p>Shipping: <span class="float-end">FREE</span></p>
//       <p>Estimated Sales Tax (5%): <span class="float-end">₦${estimatedTax.toLocaleString()}</span></p>
//       <hr>
//       <h5>Total: <span class="float-end fw-bold">₦${total.toLocaleString()}</span></h5>
//     </div>
//     <button id="placeOrderBtn" class="btn placeOrderBtn  fs-5 px-5" type="button" >Place Order</button>
    
//   `;
// }

// document.addEventListener("click", function (e) {
//   if (e.target && e.target.id === "placeOrderBtn") {
//     placeOrder(e);
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   loadCart();
//   updateCartCount();
//   // sync any pre-existing buttons (if product HTML was server-rendered)
//   syncCartButtons();
//   renderCartPage();
//   // fetch products and render if on product page
//   loadProductsFromApi();
//   renderOrderSummary2();
// });


// order summary function 
function renderOrderSummary2() {
  const summaryEl = document.getElementById("Summary1");
  if (!summaryEl) return;

  if (!cart.length) {
    summaryEl.innerHTML = `
      <p>Your cart is empty</p>
      <h4>Total: ₦0</h4>
    `;
    return;
  }

  const originalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 1)),
    0
  );
  const savings = originalPrice * 0.05;
  const subtotal = originalPrice - savings;
  const estimatedTax = subtotal * 0.05;
  const total = subtotal + estimatedTax;

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

  // ✅ reattach click listener
  const btn = document.getElementById("placeOrderBtn");
  if (btn) {
    btn.addEventListener("click", placeOrder);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
  // sync any pre-existing buttons (if product HTML was server-rendered)
  syncCartButtons();
  renderOrderSummary2();
});

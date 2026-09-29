import{i as e,n as t}from"./main-Bzb-fitW.js";/* empty css               */new class{constructor(){this.selectedPayment=`cod`,this.init()}init(){let e=document.getElementById(`checkout-page-container`);if(e){if(t.cart.length===0){this.renderEmptyCheckout(e);return}this.renderCheckoutLayout(e),this.setupDateConstraints(),this.bindEvents(),this.updateOrderSummary()}}renderEmptyCheckout(e){e.innerHTML=`
      <div class="max-w-xl mx-auto py-20 px-6 text-center">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-soft flex items-center justify-center text-caramel">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <h2 class="font-serif text-3xl font-bold text-cocoa mb-2">Your box is empty</h2>
        <p class="text-sm text-cocoa-muted mb-8 leading-relaxed">Please add your favorite fresh-baked brownies before checking out.</p>
        <a href="shop.html" class="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-cocoa text-warm-white font-semibold text-sm hover:bg-brown shadow-xl transition-all">
          <span>Browse Fresh Treats</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>
    `}renderCheckoutLayout(t){t.innerHTML=`
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        <!-- Left Column: Delivery & Payment Details Form (7 cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- Step 1: Customer & Delivery Address -->
          <div class="bg-warm-white rounded-3xl p-6 sm:p-8 border border-caramel/15 shadow-sm space-y-6">
            <div class="flex items-center space-x-3 pb-4 border-b border-caramel/10">
              <span class="w-7 h-7 rounded-full bg-cocoa text-warm-white flex items-center justify-center font-bold text-xs">1</span>
              <h2 class="font-serif text-xl sm:text-2xl font-bold text-cocoa">Delivery Details</h2>
            </div>

            <form id="checkout-form" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Full Name *</label>
                  <input type="text" id="cust-name" required placeholder="Gopika / Priya Sharma" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Phone / WhatsApp *</label>
                  <input type="tel" id="cust-phone" required placeholder="9876543210" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Email Address</label>
                <input type="email" id="cust-email" placeholder="yourname@gmail.com (for order receipt)" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Street Address & Landmark *</label>
                <textarea id="cust-address" required rows="2" placeholder="Flat No., Building Name, Street, Landmark..." class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa"></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">City *</label>
                  <input type="text" id="cust-city" required value="Chennai" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Pincode *</label>
                  <input type="text" id="cust-pincode" required placeholder="600001" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
                </div>
              </div>

              <!-- Delivery Slot -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Preferred Delivery Date *</label>
                  <input type="date" id="cust-date" required class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa" />
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa mb-1.5">Delivery Time Window</label>
                  <select id="cust-slot" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa">
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)" selected>Evening (5:00 PM - 8:00 PM - Warmest Batch)</option>
                  </select>
                </div>
              </div>

              <!-- Gift Message Note -->
              <div class="pt-2">
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-bold uppercase tracking-wider text-cocoa">Personalized Gift Message (Optional)</label>
                  <span class="text-2xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Complimentary Card</span>
                </div>
                <textarea id="cust-gift-note" rows="2" placeholder="e.g. 'Happy Birthday Priya! Wishing you a sweet and healthy year ahead. With love, Rahul'" class="w-full px-4 py-3 rounded-xl border border-caramel/25 bg-cream/30 focus:bg-white focus:outline-none focus:border-caramel text-sm text-cocoa"></textarea>
              </div>
            </form>
          </div>

          <!-- Step 2: Payment Method Selection -->
          <div class="bg-warm-white rounded-3xl p-6 sm:p-8 border border-caramel/15 shadow-sm space-y-6">
            <div class="flex items-center space-x-3 pb-4 border-b border-caramel/10">
              <span class="w-7 h-7 rounded-full bg-cocoa text-warm-white flex items-center justify-center font-bold text-xs">2</span>
              <h2 class="font-serif text-xl sm:text-2xl font-bold text-cocoa">Payment Method</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <!-- COD -->
              <label class="payment-method-card flex flex-col justify-between p-4 rounded-2xl border-2 border-cocoa bg-cream-soft cursor-pointer transition-all">
                <input type="radio" name="paymentMethod" value="cod" checked class="hidden" />
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-cocoa">Cash on Delivery</span>
                  <div class="w-4 h-4 rounded-full border-2 border-cocoa flex items-center justify-center p-0.5">
                    <div class="w-full h-full bg-cocoa rounded-full"></div>
                  </div>
                </div>
                <span class="text-2xs text-cocoa-muted">Pay in cash or UPI scan when your warm box arrives.</span>
              </label>

              <!-- UPI QR -->
              <label class="payment-method-card flex flex-col justify-between p-4 rounded-2xl border-2 border-caramel/25 bg-warm-white cursor-pointer transition-all hover:border-caramel">
                <input type="radio" name="paymentMethod" value="upi" class="hidden" />
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-cocoa">Instant UPI QR</span>
                  <div class="w-4 h-4 rounded-full border-2 border-caramel/40"></div>
                </div>
                <span class="text-2xs text-cocoa-muted">GPay, PhonePe, Paytm QR code with instant confirmation.</span>
              </label>

              <!-- Card / Netbanking -->
              <label class="payment-method-card flex flex-col justify-between p-4 rounded-2xl border-2 border-caramel/25 bg-warm-white cursor-pointer transition-all hover:border-caramel">
                <input type="radio" name="paymentMethod" value="card" class="hidden" />
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-bold text-cocoa">Cards / Netbanking</span>
                  <div class="w-4 h-4 rounded-full border-2 border-caramel/40"></div>
                </div>
                <span class="text-2xs text-cocoa-muted">Secure Credit/Debit card simulation.</span>
              </label>

            </div>

            <!-- Dynamic UPI QR Display Box -->
            <div id="upi-qr-display-box" class="hidden p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4">
              <div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5">
                <div class="w-36 h-36 bg-white p-2 rounded-2xl shadow-md border border-caramel/20 flex-shrink-0 flex items-center justify-center">
                  <img id="dynamic-upi-qr" src="" alt="Scan UPI QR" class="w-full h-full object-contain" />
                </div>
                <div class="space-y-1 text-center sm:text-left">
                  <h4 class="font-bold text-cocoa text-sm">Scan with any UPI App</h4>
                  <p class="text-xs text-cocoa-muted">Google Pay, PhonePe, Paytm, or BHIM</p>
                  <p class="text-xs font-mono font-bold text-caramel-dark pt-1">UPI ID: ${e.rawPhone}@upi</p>
                  <p class="text-2xs text-cocoa-muted">Amount will be pre-filled automatically.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- Right Column: Order Summary (5 cols) -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div class="bg-warm-white rounded-3xl p-6 sm:p-8 border border-caramel/15 shadow-sm space-y-6">
            <h2 class="font-serif text-xl sm:text-2xl font-bold text-cocoa pb-4 border-b border-caramel/10">Order Summary</h2>

            <!-- Items mini list -->
            <div id="checkout-items-list" class="space-y-3.5 max-h-60 overflow-y-auto pr-1 divide-y divide-caramel/10">
              <!-- Rendered dynamically -->
            </div>

            <!-- Promo Code Field -->
            <div class="pt-2">
              <div class="flex space-x-2">
                <input type="text" id="checkout-promo-input" placeholder="Coupon (e.g. LOVE10)" class="flex-1 px-3.5 py-2.5 rounded-xl border border-caramel/25 bg-cream/20 text-xs uppercase font-mono tracking-wider text-cocoa focus:outline-none focus:border-caramel" />
                <button id="checkout-promo-btn" class="px-4 py-2.5 rounded-xl bg-cocoa text-warm-white text-xs font-semibold hover:bg-brown transition-colors">Apply</button>
              </div>
              <div id="checkout-promo-feedback" class="text-xs mt-1.5 font-medium"></div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2 pt-2 border-t border-caramel/10 text-xs text-cocoa">
              <div class="flex justify-between">
                <span class="text-cocoa-muted">Subtotal</span>
                <span id="co-subtotal" class="font-medium">₹0</span>
              </div>
              <div id="co-discount-row" class="hidden flex justify-between text-emerald-700">
                <span>Coupon Savings</span>
                <span id="co-discount">-₹0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cocoa-muted">Fresh Batch Delivery</span>
                <span id="co-shipping" class="font-medium">₹0</span>
              </div>
              <div class="flex justify-between pt-3 border-t border-caramel/15 text-base font-bold text-cocoa">
                <span>Final Total Payable</span>
                <span id="co-total" class="font-serif text-xl text-cocoa font-bold">₹0</span>
              </div>
            </div>

            <!-- Submit CTA Buttons -->
            <div class="space-y-3 pt-2">
              <button 
                id="place-order-btn" 
                class="w-full py-4 px-6 rounded-2xl bg-cocoa hover:bg-brown text-warm-white font-semibold text-sm shadow-xl flex items-center justify-center space-x-2 transform active:scale-[0.98] transition-all"
              >
                <span>Confirm & Place Order</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>

              <button 
                id="co-whatsapp-order-btn" 
                class="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Instant Checkout via WhatsApp</span>
              </button>
            </div>

            <!-- Guarantee badge -->
            <div class="pt-2 flex items-center justify-center space-x-2 text-2xs text-cocoa-muted">
              <svg class="w-3.5 h-3.5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd"></path></svg>
              <span>100% Fresh Batch Guarantee • No Preservatives</span>
            </div>

          </div>

        </div>

      </div>
    `}setupDateConstraints(){let e=document.getElementById(`cust-date`);if(!e)return;let t=new Date;t.setDate(t.getDate()+1);let n=t.toISOString().split(`T`)[0];e.min=n,e.value=n}updateOrderSummary(){let n=t.getTotals(),r=document.getElementById(`checkout-items-list`),i=document.getElementById(`co-subtotal`),a=document.getElementById(`co-discount-row`),o=document.getElementById(`co-discount`),s=document.getElementById(`co-shipping`),c=document.getElementById(`co-total`);r&&(r.innerHTML=t.cart.map(t=>`
        <div class="pt-3 first:pt-0 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img src="${t.image}" alt="${t.name}" class="w-11 h-11 rounded-xl object-cover bg-cream-soft border border-caramel/15" />
            <div>
              <h4 class="font-serif font-bold text-xs text-cocoa">${t.name}</h4>
              <p class="text-2xs text-cocoa-muted">${t.packSize} • Qty: ${t.quantity}</p>
            </div>
          </div>
          <span class="text-xs font-bold text-cocoa">${e.currency}${t.unitPrice*t.quantity}</span>
        </div>
      `).join(``)),i&&(i.textContent=`${e.currency}${n.subtotal}`),n.discount>0?(a&&a.classList.remove(`hidden`),o&&(o.textContent=`-${e.currency}${n.discount}`)):a&&a.classList.add(`hidden`),s&&(s.textContent=n.shipping===0?`FREE`:`${e.currency}${n.shipping}`),c&&(c.textContent=`${e.currency}${n.total}`);let l=document.getElementById(`dynamic-upi-qr`);if(l){let t=`upi://pay?pa=${e.rawPhone}@upi&pn=Crumbs+of+Love&am=${n.total}&cu=INR&tn=BrownieOrder`;l.src=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t)}`}}getCustomerDetails(){return{name:document.getElementById(`cust-name`)?.value.trim()||``,phone:document.getElementById(`cust-phone`)?.value.trim()||``,email:document.getElementById(`cust-email`)?.value.trim()||``,address:document.getElementById(`cust-address`)?.value.trim()||``,city:document.getElementById(`cust-city`)?.value.trim()||``,pincode:document.getElementById(`cust-pincode`)?.value.trim()||``,deliveryDate:document.getElementById(`cust-date`)?.value||``,timeSlot:document.getElementById(`cust-slot`)?.value||``,giftMessage:document.getElementById(`cust-gift-note`)?.value.trim()||``,paymentMethod:this.selectedPayment}}bindEvents(){let e=document.querySelectorAll(`.payment-method-card`),n=document.getElementById(`upi-qr-display-box`);e.forEach(t=>{t.addEventListener(`click`,()=>{e.forEach(e=>{e.classList.remove(`border-cocoa`,`bg-cream-soft`),e.classList.add(`border-caramel/25`,`bg-warm-white`);let t=e.querySelector(`.w-4`);t&&(t.innerHTML=``)}),t.classList.remove(`border-caramel/25`,`bg-warm-white`),t.classList.add(`border-cocoa`,`bg-cream-soft`);let r=t.querySelector(`input[type="radio"]`);r&&(r.checked=!0,this.selectedPayment=r.value);let i=t.querySelector(`.w-4`);i&&(i.innerHTML=`<div class="w-full h-full bg-cocoa rounded-full"></div>`),this.selectedPayment===`upi`?n&&n.classList.remove(`hidden`):n&&n.classList.add(`hidden`)})});let r=document.getElementById(`checkout-promo-btn`),i=document.getElementById(`checkout-promo-input`),a=document.getElementById(`checkout-promo-feedback`);r&&i&&r.addEventListener(`click`,()=>{let e=t.applyPromoCode(i.value);a&&(a.textContent=e.message,a.className=e.success?`text-xs mt-1.5 font-bold text-emerald-700`:`text-xs mt-1.5 font-bold text-red-600`),this.updateOrderSummary()});let o=document.getElementById(`co-whatsapp-order-btn`);o&&o.addEventListener(`click`,()=>{let e=this.getCustomerDetails();t.openWhatsAppOrder(e)});let s=document.getElementById(`place-order-btn`);s&&s.addEventListener(`click`,()=>{let e=this.getCustomerDetails();if(!e.name||!e.phone||!e.address||!e.deliveryDate){t.showToast(`Please fill in your name, phone, address and date.`);let n=e.name?e.phone?`cust-address`:`cust-phone`:`cust-name`;document.getElementById(n)?.focus();return}let n=`COL-${Math.floor(1e5+Math.random()*9e5)}`,r=t.getTotals(),i={orderId:n,createdAt:new Date().toISOString(),customer:e,items:[...t.cart],totals:r,status:`Confirmed & Baking Scheduled`};localStorage.setItem(`crumbs_last_order`,JSON.stringify(i)),t.clearCart(),window.location.href=`success.html?orderId=${n}`})}};
import{i as e}from"./main-Bzb-fitW.js";/* empty css               */try{typeof window<`u`&&window.confetti&&window.confetti({particleCount:100,spread:70,origin:{y:.6},colors:[`#C08552`,`#C9A66B`,`#3B2314`,`#FAF5EE`]})}catch{}var t=localStorage.getItem(`crumbs_last_order`),n=null;if(t)try{n=JSON.parse(t)}catch{}var r=document.getElementById(`display-order-id`),i=document.getElementById(`success-items-list`),a=document.getElementById(`success-customer-details`),o=document.getElementById(`whatsapp-order-confirm-btn`),s=new URLSearchParams(window.location.search).get(`orderId`)||(n?n.orderId:`COL-849201`);r&&(r.textContent=s),n&&n.items&&n.items.length>0?(i&&(i.innerHTML=n.items.map(t=>`
          <div class="pt-3 first:pt-0 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <img src="${t.image}" alt="${t.name}" class="w-12 h-12 rounded-xl object-cover bg-cream-soft border border-caramel/15" />
              <div>
                <h4 class="font-serif font-bold text-sm text-cocoa">${t.name}</h4>
                <p class="text-xs text-caramel-dark font-medium">${t.packSize} • Qty: ${t.quantity}</p>
              </div>
            </div>
            <span class="text-sm font-bold text-cocoa">${e.currency}${t.unitPrice*t.quantity}</span>
          </div>
        `).join(``)+`
          <div class="pt-4 border-t border-caramel/15 space-y-1.5 text-xs">
            <div class="flex justify-between text-cocoa-muted">
              <span>Subtotal:</span>
              <span class="font-medium text-cocoa">${e.currency}${n.totals.subtotal}</span>
            </div>
            ${n.totals.discount>0?`
              <div class="flex justify-between text-emerald-700">
                <span>Discount Applied:</span>
                <span class="font-bold">-${e.currency}${n.totals.discount}</span>
              </div>
            `:``}
            <div class="flex justify-between text-cocoa-muted">
              <span>Delivery Fee:</span>
              <span class="font-medium text-cocoa">${n.totals.shipping===0?`FREE`:`${e.currency}${n.totals.shipping}`}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-caramel/15 text-sm font-bold text-cocoa">
              <span>Total Paid / Payable:</span>
              <span class="text-base text-cocoa font-serif">${e.currency}${n.totals.total}</span>
            </div>
          </div>
        `),a&&n.customer&&(a.innerHTML=`
          <div class="p-3.5 rounded-2xl bg-cream-soft/50 space-y-1">
            <span class="text-cocoa-muted block">Delivering To:</span>
            <strong class="font-bold text-cocoa block">${n.customer.name}</strong>
            <p class="text-cocoa-muted">${n.customer.address}, ${n.customer.city} - ${n.customer.pincode}</p>
            <p class="text-cocoa-muted">Phone: ${n.customer.phone}</p>
          </div>
          <div class="p-3.5 rounded-2xl bg-cream-soft/50 space-y-1">
            <span class="text-cocoa-muted block">Baking Schedule & Slot:</span>
            <strong class="font-bold text-cocoa block">Date: ${n.customer.deliveryDate}</strong>
            <p class="text-cocoa-muted">Window: ${n.customer.timeSlot}</p>
            <p class="text-cocoa-muted">Payment: ${n.customer.paymentMethod.toUpperCase()}</p>
            ${n.customer.giftMessage?`<p class="italic text-emerald-800 font-medium">Card Note: "${n.customer.giftMessage}"</p>`:``}
          </div>
        `)):i&&(i.innerHTML=`
          <div class="py-4 text-center text-xs text-cocoa-muted">
            Order confirmed. Your fresh batch has been noted in our baking schedule.
          </div>
        `),o&&o.addEventListener(`click`,()=>{let t=encodeURIComponent(`Hi Gopika! I just placed order *${s}* on your Crumbs of Love website. Please let me know once the batch is in the oven!`);window.open(`https://wa.me/${e.rawPhone}?text=${t}`,`_blank`)});
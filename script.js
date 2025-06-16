      document.addEventListener("DOMContentLoaded", function () {
        const cartIcon = document.getElementById("cartIcon");
        const cartDropdown = document.getElementById("cartDropdown");
        const cartItems = document.getElementById("cartItems");
        const emptyCart = document.getElementById("emptyCart");

        let isCartOpen = false;

        cartIcon.addEventListener("click", function (e) {
          e.stopPropagation();
          isCartOpen = !isCartOpen;
          cartDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", function (e) {
          if (!cartIcon.contains(e.target) && isCartOpen) {
            cartDropdown.classList.add("hidden");
            isCartOpen = false;
          }
        });

        function addToCart(product) {
          emptyCart.classList.add("hidden");
          cartItems.classList.remove("hidden");
          const cartItemsContainer = cartItems.querySelector(".space-y-4");

          const cartItem = document.createElement("div");
          cartItem.className = "flex items-center gap-3";
          cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1">
      <h4 class="text-sm font-medium">${product.name}</h4>
      <div class="flex items-center gap-2 mt-1">
      <div class="flex items-center border rounded">
      <button class="px-2 py-1 text-sm" onclick="updateQuantity(this, -1)">-</button>
      <span class="px-2 py-1 text-sm">${product.quantity}</span>
      <button class="px-2 py-1 text-sm" onclick="updateQuantity(this, 1)">+</button>
      </div>
      <span class="text-sm text-gray-500">$${product.price}</span>
      </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600" onclick="removeItem(this)">
      <i class="ri-close-line"></i>
      </button>
      `;

          cartItemsContainer.appendChild(cartItem);
          updateSubtotal();
        }

        window.updateQuantity = function (btn, change) {
          const quantitySpan = btn.parentElement.querySelector("span");
          let quantity = parseInt(quantitySpan.textContent) + change;
          if (quantity > 0) {
            quantitySpan.textContent = quantity;
            updateSubtotal();
          }
        };

        window.removeItem = function (btn) {
          const item = btn.closest(".flex");
          item.remove();
          if (cartItems.querySelector(".space-y-4").children.length === 0) {
            emptyCart.classList.remove("hidden");
            cartItems.classList.add("hidden");
          }
          updateSubtotal();
        };

        function updateSubtotal() {
          const subtotalElement = document.getElementById("cartSubtotal");
          let total = 0;
          const items = cartItems.querySelectorAll(".flex");
          items.forEach((item) => {
            const price = parseFloat(
              item.querySelector(".text-gray-500").textContent.replace("$", ""),
            );
            const quantity = parseInt(
              item.querySelector(".flex.items-center span").textContent,
            );
            total += price * quantity;
          });
          subtotalElement.textContent = `$${total.toFixed(2)}`;
        }

        const wishlistIcons = document.querySelectorAll(".wishlist-icon");
        wishlistIcons.forEach((icon) => {
          icon.addEventListener("click", function (e) {
            e.preventDefault();
            const heartIcon = this.querySelector("i");
            if (heartIcon.classList.contains("ri-heart-line")) {
              heartIcon.classList.remove("ri-heart-line");
              heartIcon.classList.add("ri-heart-fill");
              heartIcon.classList.add("text-red-500");
            } else {
              heartIcon.classList.remove("ri-heart-fill");
              heartIcon.classList.remove("text-red-500");
              heartIcon.classList.add("ri-heart-line");
            }
          });
        });
      });
     
     
     
     
     tailwind.config = {
        theme: {
          extend: {
            colors: { primary: "#000000", secondary: "#ffffff" },
            borderRadius: {
              none: "0px",
              sm: "4px",
              DEFAULT: "8px",
              md: "12px",
              lg: "16px",
              xl: "20px",
              "2xl": "24px",
              "3xl": "32px",
              full: "9999px",
              button: "8px",
            },
          },
        },
      };
   

    
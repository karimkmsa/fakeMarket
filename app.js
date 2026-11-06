const grid = document.getElementById("productsGrid");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");
const searchInput = document.getElementById("searchInput");

let allProducts = []; 

async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  allProducts = await response.json(); 

  loading.classList.add("hidden");
  showProducts(allProducts);
}

function showProducts(products) {
  if (products.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }

  grid.innerHTML = products.map(function (product) {
    return `
      <article class="flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
        <div class="flex h-48 items-center justify-center bg-white p-4">
          <img src="${product.image}" alt="${product.title}" class="max-h-full object-contain" />
        </div>
        <div class="flex flex-1 flex-col gap-2 border-t p-4">
          <span class="text-xs uppercase tracking-wide text-indigo-500">${product.category}</span>
          <h3 class="line-clamp-2 text-sm font-semibold">${product.title}</h3>
          <p class="text-xs text-yellow-500">★ ${product.rating.rate} (${product.rating.count})</p>
          <div class="mt-auto flex items-center justify-between pt-2">
            <span class="text-lg font-bold">$${product.price}</span>
            <button class="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700">Add</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

searchInput.addEventListener("input", function () {
  const text = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(function (product) {
    return product.title.toLowerCase().includes(text);
  });

  showProducts(filtered);
});

getProducts();
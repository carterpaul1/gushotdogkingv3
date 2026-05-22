const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const tagFilter = document.getElementById("tagFilter");

let menuItems = [];

// FETCH JSON
async function loadMenu() {
  try {
    const response = await fetch("menu.json");
    menuItems = await response.json();

    populateFilters();
    displayMenu(menuItems);
  } catch (error) {
    console.error("Error loading menu:", error);
  }
}

// DISPLAY MENU
function displayMenu(items) {
  menuContainer.innerHTML = "";

  if (items.length === 0) {
    menuContainer.innerHTML = `
      <div class="col-span-full text-center text-gray-500 text-xl py-10">
        No menu items found.
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");

    card.className =
      "bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-200";

    card.innerHTML = `
      <div class="p-6">
        <div class="flex justify-between items-start mb-3">
          <h2 class="text-2xl font-bold text-gray-800">
            ${item.name}
          </h2>

          <span class="text-xl font-bold text-red-600">
            $${item.price.toFixed(2)}
          </span>
        </div>

        <p class="text-gray-600 mb-4">
          ${item.category}
        </p>

        <div class="flex flex-wrap gap-2">
          ${item.tags
            .map(
              (tag) => `
            <span class="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
              ${tag}
            </span>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

// POPULATE FILTERS
function populateFilters() {
  const categories = [...new Set(menuItems.map((item) => item.category))];
  const tags = [...new Set(menuItems.flatMap((item) => item.tags))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

// FILTER LOGIC
function filterMenu() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;
  const tagValue = tagFilter.value;

  const filtered = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" ||
      item.category === categoryValue;

    const matchesTag =
      tagValue === "all" ||
      item.tags.includes(tagValue);

    return matchesSearch && matchesCategory && matchesTag;
  });

  displayMenu(filtered);
}

// EVENT LISTENERS
searchInput.addEventListener("input", filterMenu);
categoryFilter.addEventListener("change", filterMenu);
tagFilter.addEventListener("change", filterMenu);

loadMenu();
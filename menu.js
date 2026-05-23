const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const tagFilter = document.getElementById("tagFilter");

let menuItems = [];

// FETCH JSON
async function loadMenu() {
  try {
    const response = await fetch("menu.json");

    if (!response.ok) {
      throw new Error("Could not load menu.json");
    }

    menuItems = await response.json();

    populateFilters();
    displayMenu(menuItems);
  } catch (error) {
    console.error("Error loading menu:", error);

    menuContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger text-center">
          Menu could not be loaded. Please check that menu.json is in the same folder as menu.html.
        </div>
      </div>
    `;
  }
}

// DISPLAY MENU
function displayMenu(items) {
  menuContainer.innerHTML = "";

  if (items.length === 0) {
    menuContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center">
          No menu items found.
        </div>
      </div>
    `;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-lg-4";

    const tags = Array.isArray(item.tags) ? item.tags : [];

    card.innerHTML = `
      <article class="menu-item-card">
        <div class="menu-item-header">
          <h2>${item.name}</h2>

          <span class="menu-price">
            $${Number(item.price).toFixed(2)}
          </span>
        </div>

        <p class="menu-category">
          ${item.category}
        </p>

        <div class="menu-tags">
          ${tags
            .map(
              (tag) => `
                <span class="menu-tag">
                  ${tag}
                </span>
              `
            )
            .join("")}
        </div>
      </article>
    `;

    menuContainer.appendChild(card);
  });
}

// POPULATE FILTERS
function populateFilters() {
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  tagFilter.innerHTML = `<option value="all">All Tags</option>`;

  const categories = [
    ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
  ];

  const tags = [
    ...new Set(
      menuItems
        .flatMap((item) => (Array.isArray(item.tags) ? item.tags : []))
        .filter(Boolean)
    ),
  ];

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
  const searchValue = searchInput.value.toLowerCase().trim();
  const categoryValue = categoryFilter.value;
  const tagValue = tagFilter.value;

  const filtered = menuItems.filter((item) => {
    const tags = Array.isArray(item.tags) ? item.tags : [];

    const matchesSearch =
      item.name.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue) ||
      tags.join(" ").toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" || item.category === categoryValue;

    const matchesTag =
      tagValue === "all" || tags.includes(tagValue);

    return matchesSearch && matchesCategory && matchesTag;
  });

  displayMenu(filtered);
}

// EVENT LISTENERS
searchInput.addEventListener("input", filterMenu);
categoryFilter.addEventListener("change", filterMenu);
tagFilter.addEventListener("change", filterMenu);

loadMenu();
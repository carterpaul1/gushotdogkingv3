const menuContainer = document.getElementById("menuContainer");
const menuStatus = document.getElementById("menuStatus");
const menuFilters = document.getElementById("menuFilters");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const tagFilter = document.getElementById("tagFilter");

let menuItems = [];

function setMenuStatus(message) {
  if (menuStatus) {
    menuStatus.textContent = message;
  }
}

function createAlert(message, variant = "warning") {
  const wrapper = document.createElement("div");
  wrapper.className = "col-12";

  const alert = document.createElement("div");
  alert.className = `alert alert-${variant} text-center`;
  alert.role = "status";
  alert.textContent = message;

  wrapper.appendChild(alert);
  return wrapper;
}

function createMenuCard(item) {
  const column = document.createElement("div");
  column.className = "col-sm-6 col-lg-4";

  const article = document.createElement("article");
  article.className = "menu-item-card";

  const header = document.createElement("div");
  header.className = "menu-item-header";

  const title = document.createElement("h3");
  title.textContent = item.name || "Menu item";

  const price = document.createElement("span");
  price.className = "menu-price";
  price.textContent = `$${Number(item.price || 0).toFixed(2)}`;

  const category = document.createElement("p");
  category.className = "menu-category";
  category.textContent = item.category || "Menu";

  const tags = document.createElement("div");
  tags.className = "menu-tags";

  const itemTags = Array.isArray(item.tags) ? item.tags : [];
  itemTags.forEach((tag) => {
    const badge = document.createElement("span");
    badge.className = "menu-tag";
    badge.textContent = tag;
    tags.appendChild(badge);
  });

  header.append(title, price);
  article.append(header, category, tags);
  column.appendChild(article);

  return column;
}

async function loadMenu() {
  menuContainer.setAttribute("aria-busy", "true");
  setMenuStatus("Loading menu items.");

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
    menuContainer.replaceChildren(
      createAlert(
        "Menu could not be loaded. Please check that menu.json is in the same folder as menu.html.",
        "danger"
      )
    );
    menuContainer.setAttribute("aria-busy", "false");
    setMenuStatus("Menu could not be loaded.");
  }
}

function displayMenu(items) {
  menuContainer.replaceChildren();
  menuContainer.setAttribute("aria-busy", "false");

  if (items.length === 0) {
    menuContainer.appendChild(createAlert("No menu items found."));
    setMenuStatus("No menu items found.");
    return;
  }

  items.forEach((item) => {
    menuContainer.appendChild(createMenuCard(item));
  });

  setMenuStatus(`${items.length} menu item${items.length === 1 ? "" : "s"} shown.`);
}

function populateFilters() {
  categoryFilter.replaceChildren(new Option("All Categories", "all"));
  tagFilter.replaceChildren(new Option("All Tags", "all"));

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
    categoryFilter.appendChild(new Option(category, category));
  });

  tags.forEach((tag) => {
    tagFilter.appendChild(new Option(tag, tag));
  });
}

function filterMenu() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const categoryValue = categoryFilter.value;
  const tagValue = tagFilter.value;

  const filtered = menuItems.filter((item) => {
    const tags = Array.isArray(item.tags) ? item.tags : [];
    const name = item.name || "";
    const category = item.category || "";

    const matchesSearch =
      name.toLowerCase().includes(searchValue) ||
      category.toLowerCase().includes(searchValue) ||
      tags.join(" ").toLowerCase().includes(searchValue);

    const matchesCategory =
      categoryValue === "all" || category === categoryValue;

    const matchesTag = tagValue === "all" || tags.includes(tagValue);

    return matchesSearch && matchesCategory && matchesTag;
  });

  displayMenu(filtered);
}

menuFilters?.addEventListener("submit", (event) => {
  event.preventDefault();
  filterMenu();
});

searchInput.addEventListener("input", filterMenu);
categoryFilter.addEventListener("change", filterMenu);
tagFilter.addEventListener("change", filterMenu);

loadMenu();

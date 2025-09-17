import { menuData } from './menuData.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("menu-container");

  menuData.forEach(section => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "bg-white rounded-lg shadow p-6";

    const header = document.createElement("h2");
    header.className = "text-xl font-bold mb-4 text-indigo-700 border-b pb-2";
    header.textContent = section.header;
    sectionDiv.appendChild(header);

    const list = document.createElement("ul");
    list.className = "space-y-2";

    section.items.forEach(item => {
      const itemEl = document.createElement("li");
      itemEl.className = "flex justify-between text-gray-800";

      const name = document.createElement("span");
      name.textContent = item.name;

      const price = document.createElement("span");
      price.className = "font-semibold text-indigo-600";
      price.textContent = item.price;

      itemEl.appendChild(name);
      itemEl.appendChild(price);
      list.appendChild(itemEl);
    });

    sectionDiv.appendChild(list);
    container.appendChild(sectionDiv);
  });
});

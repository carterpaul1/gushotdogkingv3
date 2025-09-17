// Shared Navigation Script for Gus's Hot Dog King
// This file handles loading the navigation sidebar on all pages

document.addEventListener('DOMContentLoaded', () => {
  // Load nav sidebar
  fetch('nav-sidebar.html')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text();
    })
    .then(html => {
      const navSidebar = document.getElementById('navSidebar');
      if (navSidebar) {
        navSidebar.innerHTML = html;

        const toggleButton = document.getElementById("toggleSidebar");
        const sidebar = document.getElementById("sidebar");

        toggleButton?.addEventListener("click", (e) => {
          e.stopPropagation();
          sidebar.classList.toggle("-translate-x-full");
        });

        document.addEventListener("click", (e) => {
          const clickedInsideSidebar = sidebar?.contains(e.target);
          const clickedToggle = toggleButton?.contains(e.target);
          const sidebarVisible = !sidebar?.classList.contains("-translate-x-full");

          if (!clickedInsideSidebar && !clickedToggle && sidebarVisible) {
            sidebar?.classList.add("-translate-x-full");
          }
        });
      }
    })
    .catch(err => {
      console.error('Error loading nav-sidebar:', err);
      // Fallback navigation if fetch fails
      const navSidebar = document.getElementById('navSidebar');
      if (navSidebar) {
        navSidebar.innerHTML = `
          <div class="flex items-center gap-4">
            <img src="public/images/HDK_LOGO.webp" alt="Hot Dog King Logo" class="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
            <h1 class="text-2xl sm:text-4xl font-bold text-purple-900">Gus's Hot Dog King</h1>
          </div>

          <nav class="hidden sm:flex ml-auto space-x-8 text-lg text-purple-900 font-semibold">
            <a href="index.html" class="hover:underline">Home</a>
            <a href="about.html" class="hover:underline">About Us</a>
            <a href="menu.html" class="hover:underline">Menu Page</a>
            <a href="contact.html" class="hover:underline">Contact Us</a>
          </nav>

          <button id="toggleSidebar" aria-label="Toggle Menu"
                  class="p-2 bg-purple-900 text-white rounded focus:outline-none sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <aside id="sidebar"
                 class="fixed top-0 left-0 w-64 h-full bg-purple-900 text-white transform -translate-x-full transition-transform duration-300 z-50 shadow-lg sm:hidden">
            <div class="p-6 space-y-4">
              <a href="index.html" class="block text-lg hover:underline">Home</a>
              <a href="about.html" class="block text-lg hover:underline">About Us</a>
              <a href="menu.html" class="block text-lg hover:underline">Menu Page</a>
              <a href="contact.html" class="block text-lg hover:underline">Contact Us</a>
              <img src="public/images/stavroula.webp" alt="picture of momma" class="rounded-full w-36 h-36 mx-auto border-4 border-yellow-400 object-cover" loading="lazy" />
            </div>
          </aside>
        `;
        
        // Add event listeners for the fallback navigation
        const toggleButton = document.getElementById("toggleSidebar");
        const sidebar = document.getElementById("sidebar");

        toggleButton?.addEventListener("click", (e) => {
          e.stopPropagation();
          sidebar.classList.toggle("-translate-x-full");
        });

        document.addEventListener("click", (e) => {
          const clickedInsideSidebar = sidebar?.contains(e.target);
          const clickedToggle = toggleButton?.contains(e.target);
          const sidebarVisible = !sidebar?.classList.contains("-translate-x-full");

          if (!clickedInsideSidebar && !clickedToggle && sidebarVisible) {
            sidebar?.classList.add("-translate-x-full");
          }
        });
      }
    });
});

// Shared Navigation Script for Gus's Hot Dog King
document.addEventListener('DOMContentLoaded', () => {
  const navSidebarContainer = document.getElementById('navSidebar');
  if (!navSidebarContainer) return;

  // Load nav-sidebar.html
  fetch('nav-sidebar.html')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.text();
    })
    .then(html => {
      navSidebarContainer.innerHTML = html;

      const toggleButton = document.getElementById('toggleSidebar');
      const sidebar = document.getElementById('sidebar');
      const closeButton = document.getElementById('closeSidebar');

      if (!toggleButton || !sidebar) return;

      const getFocusableElements = () =>
        sidebar.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');

      const firstFocusable = () => getFocusableElements()[0];
      const lastFocusable = () => getFocusableElements()[getFocusableElements().length - 1];

      const openSidebar = () => {
        sidebar.classList.remove('-translate-x-full');
        toggleButton.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        setTimeout(() => firstFocusable()?.focus(), 100);
      };

      const closeSidebar = () => {
        sidebar.classList.add('-translate-x-full');
        toggleButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggleButton.focus();
      };

      // Toggle button
      toggleButton.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
        if (isOpen) closeSidebar();
        else openSidebar();
      });

      // Close button
      closeButton?.addEventListener('click', closeSidebar);

      // Focus trap + Escape
      sidebar.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          const focusables = getFocusableElements();
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }

        if (e.key === 'Escape') {
          closeSidebar();
        }
      });

      // Click outside to close
      document.addEventListener('click', e => {
        const clickedInside = sidebar.contains(e.target);
        const clickedToggle = toggleButton.contains(e.target);
        const sidebarVisible = !sidebar.classList.contains('-translate-x-full');

        if (!clickedInside && !clickedToggle && sidebarVisible) {
          closeSidebar();
        }
      });
    })
    .catch(err => {
      console.error('Error loading nav-sidebar:', err);
    });
});


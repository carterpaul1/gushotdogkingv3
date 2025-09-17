// Facebook Reviews - Simplified for static data (no API key required)

(function () {
  function byId(id) { return document.getElementById(id); }

  function setLoading(isLoading) {
    var loadingEl = byId('facebook-reviews-loading');
    var containerEl = byId('facebook-reviews-container');
    if (loadingEl) loadingEl.style.display = isLoading ? 'block' : 'none';
    if (containerEl) containerEl.style.display = isLoading ? 'none' : 'block';
  }

  function showError(message) {
    var errorEl = byId('facebook-reviews-error');
    var containerEl = byId('facebook-reviews-container');
    var loadingEl = byId('facebook-reviews-loading');
    if (loadingEl) loadingEl.style.display = 'none';
    if (containerEl) containerEl.style.display = 'none';
    if (errorEl) {
      errorEl.textContent = message || 'Unable to load Facebook reviews at this time.';
      errorEl.style.display = 'block';
    }
  }

  function generateStars(rating) {
    var full = Math.round(rating || 0);
    var html = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= full) {
        html += '<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        html += '<svg class="w-6 h-6 fill-gray-300" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }
    return html;
  }

  function renderReviews(reviews) {
    var container = byId('facebook-reviews-container');
    if (!container) return;
    setLoading(false);
    var html = '';
    (reviews || []).slice(0, 3).forEach(function (r) {
      var rating = r.rating || 5;
      var stars = generateStars(rating);
      var message = r.message || '';
      var name = (r.from && r.from.name) || 'Facebook User';
      var date = r.created_time ? new Date(r.created_time).toLocaleDateString() : '';
      html += '\n        <div class="text-center py-4 border-b border-gray-200 last:border-b-0">\n          <div class="flex justify-center items-center mb-3">\n            <div class="flex text-yellow-400">' + stars + '</div>\n            <span class="ml-2 text-lg font-semibold text-gray-700">' + rating + '/5</span>\n          </div>\n          <p class="text-gray-600 mb-2">"' + message.replace(/"/g, '&quot;') + '"</p>\n          <p class="text-sm text-gray-500">- ' + name + '</p>\n          ' + (date ? '<p class="text-xs text-gray-400">' + date + '</p>' : '') + '\n        </div>\n      ';
    });
    container.innerHTML = html || '<p class="text-gray-600">No recent reviews found.</p>';
  }

  async function fetchWithFallback(paths) {
    for (var i = 0; i < paths.length; i++) {
      try {
        var res = await fetch(paths[i], { headers: { 'Accept': 'application/json' } });
        if (res.ok) return await res.json();
      } catch (e) {
        // continue
      }
    }
    throw new Error('All Facebook endpoints failed');
  }

  async function init() {
    var container = byId('facebook-reviews-container');
    if (!container) return;
    setLoading(true);
    try {
      var data = await fetchWithFallback(['/facebook-reviews.php', '/api/facebook-reviews', '/.netlify/functions/facebook-reviews']);
      var reviews = (data && data.reviews) || data || [];
      renderReviews(reviews);
    } catch (err) {
      showError('Unable to load Facebook reviews at this time.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Yelp Reviews - client-side renderer that pulls from a serverless endpoint
// Tries Vercel-style /api first, then Netlify /.netlify/functions fallback

(function () {
  function byId(id) { return document.getElementById(id); }

  function setLoading(isLoading) {
    var loadingEl = byId('yelp-reviews-loading');
    var containerEl = byId('yelp-reviews-container');
    if (loadingEl) loadingEl.style.display = isLoading ? 'block' : 'none';
    if (containerEl) containerEl.style.display = isLoading ? 'none' : 'block';
  }

  function showError(message) {
    var errorEl = byId('yelp-reviews-error');
    var containerEl = byId('yelp-reviews-container');
    var loadingEl = byId('yelp-reviews-loading');
    if (loadingEl) loadingEl.style.display = 'none';
    if (containerEl) containerEl.style.display = 'none';
    if (errorEl) {
      errorEl.textContent = message || 'Unable to load Yelp reviews at this time.';
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
    var container = byId('yelp-reviews-container');
    if (!container) return;
    setLoading(false);
    var html = '';
    (reviews || []).slice(0, 3).forEach(function (r) {
      var rating = r.rating || 5;
      var stars = generateStars(rating);
      var text = r.text || '';
      var name = (r.user && r.user.name) || 'Yelp User';
      var date = r.time_created ? new Date(r.time_created).toLocaleDateString() : '';
      html += '\n        <div class="text-center py-4 border-b border-gray-200 last:border-b-0">\n          <div class="flex justify-center items-center mb-3">\n            <div class="flex text-yellow-400">' + stars + '</div>\n            <span class="ml-2 text-lg font-semibold text-gray-700">' + rating + '/5</span>\n          </div>\n          <p class="text-gray-600 mb-2">"' + text.replace(/"/g, '&quot;') + '"</p>\n          <p class="text-sm text-gray-500">- ' + name + '</p>\n          ' + (date ? '<p class="text-xs text-gray-400">' + date + '</p>' : '') + '\n        </div>\n      ';
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
    throw new Error('All Yelp endpoints failed');
  }

  async function init() {
    var container = byId('yelp-reviews-container');
    if (!container) return;
    setLoading(true);
    try {
      var data = await fetchWithFallback(['/yelp-reviews.php', '/api/yelp-reviews', '/.netlify/functions/yelp-reviews']);
      var reviews = (data && data.reviews) || data || [];
      renderReviews(reviews);
    } catch (err) {
      showError('Unable to load Yelp reviews at this time.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



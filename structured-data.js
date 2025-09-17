// public/js/structured-data.js

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Gus's Hot Dog King",
  "image": "https://www.gushotdogking.com/public/images/HDK_LOGO.webp",
  "@id": "https://www.gushotdogking.com/",
  "url": "https://www.gushotdogking.com/",
  "telephone": "+1-757-595-1630",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10725 Jefferson Ave",
    "addressLocality": "Newport News",
    "addressRegion": "VA",
    "postalCode": "23601",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.063776,
    "longitude": -76.462717
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday"
      ],
      "opens": "10:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:30",
      "closes": "20:00"
    }
  ],
  "servesCuisine": ["Hot Dogs", "Bratwurst", "Fast Food", "American Food"],
  "priceRange": "$",
  "hasMenu": "https://www.gushotdogking.com/menu.html",
  "menu": "https://www.gushotdogking.com/menu.html",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Local Customer"
      },
      "reviewBody": "Best hot dogs in Newport News! The service is always friendly and the food is consistently delicious."
    },
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Facebook Customer"
      },
      "reviewBody": "Amazing hot dogs! The service is always friendly and the food is consistently delicious. A Newport News favorite!"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/Gusshotdogking",
    "https://www.yelp.com/biz/guss-hot-dog-king-newport-news-2"
  ],
  "description": "Gus's Hot Dog King has been serving the best hot dogs in Newport News since 1972. We offer gourmet hot dogs, beer bratwursts, burgers, fries, and family-friendly dining.",
  "foundingDate": "1972",
  "areaServed": {
    "@type": "City",
    "name": "Newport News"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Menu Items",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "FoodEstablishment",
          "name": "Hot Dogs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "FoodEstablishment",
          "name": "Beer Bratwurst"
        }
      }
    ]
  }
});
document.head.appendChild(script);

// Add LocalBusiness schema for better local SEO
const localBusinessScript = document.createElement('script');
localBusinessScript.type = 'application/ld+json';
localBusinessScript.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Gus's Hot Dog King",
  "image": "https://www.gushotdogking.com/public/images/HDK_LOGO.webp",
  "url": "https://www.gushotdogking.com/",
  "telephone": "+1-757-595-1630",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10725 Jefferson Ave",
    "addressLocality": "Newport News",
    "addressRegion": "VA",
    "postalCode": "23601",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.063776,
    "longitude": -76.462717
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday"],
      "opens": "10:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:30",
      "closes": "20:00"
    }
  ],
  "priceRange": "$",
  "description": "Best hot dogs in Newport News since 1972. Family-friendly restaurant serving gourmet hot dogs, beer bratwursts, and fast food.",
  "areaServed": {
    "@type": "City",
    "name": "Newport News"
  },
  "hasMap": "https://maps.google.com/?q=Gus's+Hot+Dog+King,+Newport+News,+VA"
});
document.head.appendChild(localBusinessScript);

// Add Breadcrumb schema for better navigation
const breadcrumbScript = document.createElement('script');
breadcrumbScript.type = 'application/ld+json';
breadcrumbScript.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.gushotdogking.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Restaurant",
      "item": "https://www.gushotdogking.com/"
    }
  ]
});
document.head.appendChild(breadcrumbScript);

// Add FAQ schema for better search results and voice search
const faqScript = document.createElement('script');
faqScript.type = 'application/ld+json';
faqScript.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are Gus's Hot Dog King's hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gus's Hot Dog King is open Monday 10:30 AM - 6:00 PM, Tuesday-Saturday 10:30 AM - 8:00 PM, and closed on Sundays."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Gus's Hot Dog King located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gus's Hot Dog King is located at 10725 Jefferson Ave, Newport News, VA 23601, conveniently near Jefferson Avenue and Harpersville."
      }
    },
    {
      "@type": "Question",
      "name": "Does Gus's Hot Dog King offer delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Gus's Hot Dog King offers delivery through DoorDash. You can order online for delivery straight to your door."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Gus's Hot Dog King special?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gus's Hot Dog King has been serving the best hot dogs in Newport News since 1972. We offer gourmet hot dogs, beer bratwursts, fresh-made chili, and family-friendly dining with fast, friendly service."
      }
    }
  ]
});
document.head.appendChild(faqScript);

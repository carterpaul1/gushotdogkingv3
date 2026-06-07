# Gus's Hot Dog King Website

A responsive, production-ready restaurant website for **Gus's Hot Dog King**, a Newport News institution serving hot dogs, bratwursts, burgers, fries, and family favorites since 1972.

This project presents the restaurant with a polished local-business web presence, a data-driven menu experience, search-friendly metadata, customer review integrations, and clear conversion paths for takeout and delivery.

## Overview

The site is built as a fast static web experience with focused pages for the restaurant's homepage, story, menu, and location details. It combines custom HTML, CSS, and JavaScript with Bootstrap layout utilities to deliver a responsive experience that works well for customers browsing on mobile, tablet, or desktop.

The menu is powered by structured JSON data and rendered dynamically in the browser, making menu updates easier to maintain without rewriting page markup.

## Key Features

- Responsive multi-page restaurant website
- Home, About, Menu, and Location pages
- Data-driven menu rendered from `menu.json`
- Menu search by item name, category, and tag
- Category and tag filtering for faster browsing
- DoorDash delivery calls to action
- Click-to-call takeout links
- Google Maps location embed
- Local SEO metadata and structured data
- Open Graph and Twitter preview metadata
- Sitemap and robots configuration
- Facebook and Yelp review integration scripts
- Optimized local image assets in `public/images`

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Google Fonts
- JSON menu data
- Schema.org structured data
- Netlify Functions


## Project Structure

```text
.
|-- index.html                 # Homepage
|-- about.html                 # Restaurant story page
|-- menu.html                  # Dynamic menu page
|-- contact.html               # Location and contact page
|-- index.css                  # Homepage styles
|-- about.css                  # About page styles
|-- menu.css                   # Menu page styles
|-- contact.css                # Contact page styles
|-- menu.js                    # Menu rendering, search, and filters
|-- menu.json                  # Structured menu data
|-- navigation.js              # Navigation behavior
|-- structured-data.js         # Local SEO schema markup
|-- facebook-reviews.js        # Facebook review UI integration
|-- yelp-reviews.js            # Yelp review UI integration
|-- api/                       # Vercel-style serverless functions
|-- netlify/functions/         # Netlify serverless functions
|-- public/images/             # Site images and food photography
|-- robots.txt                 # Search crawler instructions
`-- sitemap.xml                # Search engine sitemap
```

## Menu System

The menu page loads items from `menu.json` and renders them through `menu.js`. Each menu item includes:

- Item name
- Price
- Category
- Tags

Customers can search across item names, categories, and tags. The page also generates category and tag filter options from the data itself, so new menu entries automatically become available in the UI.

## SEO and Local Search

The project includes several layers of search optimization for a local restaurant website:

- Canonical URL metadata
- Meta descriptions
- Open Graph tags
- Twitter card metadata
- Restaurant schema
- LocalBusiness schema
- Breadcrumb schema
- FAQ schema
- Sitemap
- Robots configuration

These details help search engines understand the business, location, menu, hours, and delivery options.

## Review Integrations

The repository includes client scripts and serverless functions for pulling review content from third-party platforms:

- Facebook ratings and recommendations through the Facebook Graph API
- Yelp reviews through the Yelp Fusion API
- API fallbacks and graceful error handling


Environment variables are used for private API credentials so secrets are not exposed in the client code.

### Environment Variables

For review integrations, configure the following variables in your hosting provider:

```bash
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_PAGE_ID=Gusshotdogking
FACEBOOK_API_VERSION=v19.0
YELP_API_KEY=
YELP_BUSINESS_ID=guss-hot-dog-king-newport-news-2
```

## Getting Started

Because this is a static site, it can be opened directly in a browser. For the best local development experience, run it through a simple local server so `fetch("menu.json")` works consistently.

Using Node:

```bash
npx serve .
```

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

The project is suitable for deployment on static-friendly hosts such as:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

For Facebook and Yelp review integrations, use Netlify or Vercel environment variables and deploy the matching serverless function directory.

## Portfolio Highlights

This project demonstrates:

- Real-world small business website development
- Responsive page design and mobile-first layout thinking
- Structured, maintainable menu data
- DOM-driven filtering and search interactions
- Local SEO implementation
- Third-party API integration planning
- Serverless deployment patterns
- Conversion-focused restaurant UX

## Business Details

**Gus's Hot Dog King**  
10725 Jefferson Ave  
Newport News, VA 23601  

Phone: [(757) 595-1630](tel:7575951630)  
Website: [gushotdogking.com](https://www.gushotdogking.com)

## Status

Active website project with completed static pages, menu data, SEO assets, and review integration support.

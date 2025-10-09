/**
 * Structured Data (JSON-LD) generators for SEO
 * Helps search engines understand content better and enables rich snippets
 */

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "ACM Venezuela C.A.",
  "description": "Distribuidor especializado en equipos oftalmológicos, láseres e insumos médicos. Más de 26 años de experiencia en el cuidado ocular, otorrinolaringología, cirugía, veterinaria y odontología.",
  "url": "https://www.acm-venezuela.com",
  "logo": "https://www.acm-venezuela.com/acm-logo.png",
  "image": "https://www.acm-venezuela.com/acmteam.jpg",
  "telephone": "+58-212-976-3608",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Terrazas de Club Hípico",
    "addressLocality": "Caracas",
    "addressCountry": "VE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+58-424-263-9614",
    "contactType": "Ventas",
    "email": "info@acm-venezuela.com",
    "availableLanguage": ["es"]
  },
  "sameAs": [
    // Add social media profiles if available
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Venezuela"
  }
});

export const generateProductSchema = (product, brandTitle, categoryName) => ({
  "@context": "https://schema.org",
  "@type": "MedicalDevice",
  "name": product.title,
  "description": product.description || `Equipo médico ${product.title} - ${categoryName}`,
  "brand": {
    "@type": "Brand",
    "name": brandTitle || "ACM Venezuela"
  },
  "image": product.images?.[0] || "/imagenotfound.png",
  "category": categoryName,
  "manufacturer": {
    "@type": "Organization",
    "name": brandTitle || "ACM Venezuela"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "seller": {
      "@type": "Organization",
      "name": "ACM Venezuela C.A."
    }
  }
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateWebPageSchema = (title, description, url) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": url,
  "inLanguage": "es-VE",
  "publisher": {
    "@type": "Organization",
    "name": "ACM Venezuela C.A."
  }
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ACM Venezuela C.A.",
  "description": "Equipos médicos oftalmológicos y láseres de última tecnología",
  "telephone": "+58-212-976-3608",
  "email": "info@acm-venezuela.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Terrazas de Club Hípico",
    "addressLocality": "Caracas",
    "addressCountry": "VE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.4806",
    "longitude": "-66.9036"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "priceRange": "$$$$",
  "areaServed": {
    "@type": "Country",
    "name": "Venezuela"
  }
});

export const generateMedicalEquipmentListSchema = (products, categoryName) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `Equipos médicos de ${categoryName}`,
  "description": `Catálogo de equipos médicos especializados en ${categoryName}`,
  "numberOfItems": products.length,
  "itemListElement": products.slice(0, 10).map((product, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": product.title,
      "image": product.portrait || "/imagenotfound.png"
    }
  }))
});

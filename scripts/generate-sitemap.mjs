import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate sitemap.xml for ACM Venezuela
 * This script should be run after build or as part of the build process
 */

const DOMAIN = "https://www.acm-venezuela.com";

// Static pages
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/nosotros", priority: "0.8", changefreq: "monthly" },
  { url: "/contacto", priority: "0.9", changefreq: "monthly" },
  { url: "/productos", priority: "0.9", changefreq: "weekly" },
];

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || "",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const pagesRef = doc(db, "info", "pages");

export async function handlePagesData() {
  try {
    const docSnap = await getDoc(pagesRef);
    const categoriesData = Object.values(docSnap.data());

    return categoriesData;
  } catch (e) {
    throw new Error(e);
  }
}

async function handleProductsData(catalog) {
  const productRef = collection(db, catalog);

  const q = query(productRef, where("id", "!=", "categories"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => {
    return doc.data();
  });

  return products;
}

async function generateSitemap() {
  try {
    // Get all pages/catalogs
    const pages = await handlePagesData();

    // Generate URLs for catalog pages
    const catalogUrls = pages.map((page) => ({
      url: `/productos/${page.id}`,
      priority: "0.8",
      changefreq: "weekly",
    }));

    // Get all products for each catalog
    const productUrls = [];
    for (const page of pages) {
      try {
        const products = await handleProductsData(page.id);
        if (products && products.length > 0) {
          products.forEach((product) => {
            productUrls.push({
              url: `/productos/${page.id}/${product.id}`,
              priority: "0.7",
              changefreq: "monthly",
            });
          });
        }
      } catch (error) {
        console.error(`Error getting products for ${page.id}:`, error);
      }
    }

    // Combine all URLs
    const allUrls = [...staticPages, ...catalogUrls, ...productUrls];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Write to public folder
    const publicDir = path.join(__dirname, "..", "public");
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

    console.log(
      `✅ Sitemap generated successfully with ${allUrls.length} URLs`
    );
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Catalog pages: ${catalogUrls.length}`);
    console.log(`   - Product pages: ${productUrls.length}`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

generateSitemap();

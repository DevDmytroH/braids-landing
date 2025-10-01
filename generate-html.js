const fs = require('fs');
const path = require('path');

// Read products.json
const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
const products = productsData.products;

// Read the original index.html template
const indexTemplate = fs.readFileSync('./index.html', 'utf8');

// Generate structured data JSON-LD for products
function generateStructuredData() {
    return products.map((product, index) => {
        const enTranslation = product.translations.en;
        // Get image URL from optimized images or fallback to first media item
        let imageUrl = '';
        if (Array.isArray(product.media) && product.media[0]) {
            if (typeof product.media[0] === 'object' && product.media[0].src) {
                imageUrl = product.media[0].src;
            } else if (typeof product.media[0] === 'string') {
                imageUrl = product.media[0];
            }
        }

        return {
            "@type": "Product",
            "position": index + 1,
            "name": enTranslation.name,
            "description": enTranslation.description,
            ...(imageUrl && { "image": imageUrl }),
            "offers": {
                "@type": "Offer",
                "price": product.price.toString(),
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "url": `https://braids-landing.onrender.com/#${product.id}`
            },
            "brand": {
                "@type": "Brand",
                "name": "Ta Sho Plete"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating.value,
                "reviewCount": product.rating.reviewCount
            }
        };
    });
}

// Generate translations object for JavaScript
function generateTranslations() {
    const translations = {
        en: { products: {} },
        uk: { products: {} },
        es: { products: {} }
    };

    products.forEach(product => {
        ['en', 'uk', 'es'].forEach(lang => {
            translations[lang].products[product.id] = {
                name: product.translations[lang].name,
                description: product.translations[lang].description,
                specs: product.translations[lang].specs
            };
        });
    });

    return translations;
}

// Generate products array for JavaScript
function generateProductsArray() {
    return products.map(product => {
        return {
            id: product.id,
            price: product.price,
            badge: product.badge,
            media: product.media,
            emojis: product.emojis
        };
    });
}

// Generate navigation dots HTML
function generateNavDots() {
    return products.map((_, index) => 
        `        <div class="nav-dot${index === 0 ? ' active' : ''}" data-index="${index}"></div>`
    ).join('\n');
}

// Generate meta keywords from products
function generateMetaKeywords() {
    const keywords = [
        'african braids valencia',
        'box braids valencia spain',
        'hair extensions valencia',
        'braids with curls',
        'dreadlocks valencia',
        'bohemian braids',
        'afro hair valencia',
        'premium hair extensions spain',
        'african hairstyles valencia',
        'protective hairstyles',
        'natural hair extensions'
    ];
    products.forEach(product => {
        const name = product.translations.en.name.toLowerCase();
        keywords.push(name);
    });
    return keywords.join(', ');
}

// Generate meta description from products
function generateMetaDescription() {
    const productNames = products.map(p => p.translations.en.name).join(', ');
    return `Premium African braids and hair extensions in Valencia, Spain. ${productNames}, dreadlocks, and bohemian braids. Professional installation for Afro-American and Ukrainian communities. Transform your look today!`;
}

// Generate page title from products
function generatePageTitle() {
    return `African Braids Valencia | Premium Hair Extensions & Box Braids | Ta Sho Plete`;
}

// Main function to update index.html
function updateIndexHTML() {
    let html = indexTemplate;

    // 1. Update page title
    const pageTitle = generatePageTitle();
    html = html.replace(
        /<title>[^<]*<\/title>/,
        `<title>${pageTitle}</title>`
    );

    // 2. Update or add meta tags
    const metaKeywords = generateMetaKeywords();
    const metaDescription = generateMetaDescription();
    
    // Check if meta tags exist, if not add them after title
    if (!html.includes('<meta name="keywords"')) {
        html = html.replace(
            /(<title>[^<]*<\/title>)/,
            `$1\n    \n    <!-- Primary Meta Tags -->\n    <meta name="title" content="${pageTitle}">\n    <meta name="description" content="${metaDescription}">\n    <meta name="keywords" content="${metaKeywords}">\n    <meta name="author" content="Ta Sho Plete">\n    <meta name="robots" content="index, follow">\n    <meta name="language" content="English, Ukrainian, Spanish">\n    <meta name="geo.region" content="ES-V">\n    <meta name="geo.placename" content="Valencia, Spain">\n    <meta name="geo.position" content="39.4699;-0.3763">\n    <link rel="canonical" href="https://braids-landing.onrender.com/">\n    \n    <!-- Open Graph / Facebook Meta Tags -->\n    <meta property="og:type" content="website">\n    <meta property="og:url" content="https://braids-landing.onrender.com/">\n    <meta property="og:title" content="${pageTitle}">\n    <meta property="og:description" content="${metaDescription}">\n    <meta property="og:image" content="https://braids-landing.onrender.com/assets/seo/og-image.jpg">\n    <meta property="og:site_name" content="Ta Sho Plete">\n    <meta property="og:locale" content="en_US">\n    <meta property="og:locale:alternate" content="uk_UA">\n    <meta property="og:locale:alternate" content="es_ES">\n    \n    <!-- Twitter Card Meta Tags -->\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:url" content="https://braids-landing.onrender.com/">\n    <meta name="twitter:title" content="${pageTitle}">\n    <meta name="twitter:description" content="${metaDescription}">\n    <meta name="twitter:image" content="https://braids-landing.onrender.com/assets/seo/twitter-image.jpg">\n    \n    <!-- Additional SEO Meta Tags -->\n    <meta name="theme-color" content="#F5F1E8">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="default">\n    <meta name="format-detection" content="telephone=no">`
        );
    } else {
        // Update existing meta tags
        html = html.replace(
            /<meta name="title" content="[^"]*">/,
            `<meta name="title" content="${pageTitle}">`
        );
        html = html.replace(
            /<meta name="description" content="[^"]*">/,
            `<meta name="description" content="${metaDescription}">`
        );
        html = html.replace(
            /<meta name="keywords" content="[^"]*">/,
            `<meta name="keywords" content="${metaKeywords}">`
        );
        html = html.replace(
            /<meta property="og:title" content="[^"]*">/,
            `<meta property="og:title" content="${pageTitle}">`
        );
        html = html.replace(
            /<meta property="og:description" content="[^"]*">/,
            `<meta property="og:description" content="${metaDescription}">`
        );
        html = html.replace(
            /<meta name="twitter:title" content="[^"]*">/,
            `<meta name="twitter:title" content="African Braids Valencia | Premium Hair Extensions & Box Braids">`
        );
        html = html.replace(
            /<meta name="twitter:description" content="[^"]*">/,
            `<meta name="twitter:description" content="Premium African braids and hair extensions in Valencia, Spain. Box braids, braids with curls, dreadlocks. Professional installation for Afro-American and Ukrainian communities.">`
        );
    }

    // 3. Update or add structured data (WebSite, Organization, ItemList)
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ta Sho Plete",
        "url": "https://braids-landing.onrender.com/",
        "description": "Premium hair extensions - handcrafted braids and extensions",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://braids-landing.onrender.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ta Sho Plete",
        "url": "https://braids-landing.onrender.com/",
        "logo": "https://braids-landing.onrender.com/assets/seo/logo.png",
        "description": "Premium hair extensions retailer specializing in handcrafted braids and extensions",
        "sameAs": [
            "https://www.instagram.com/ta_sho_plete/"
        ]
    };

    // Check if structured data exists
    if (!html.includes('"@type": "WebSite"')) {
        // Add all structured data after Google Analytics
        const gaScript = html.match(/<script>[\s\S]*?gtag\('config'[\s\S]*?<\/script>/)[0];
        html = html.replace(
            gaScript,
            `${gaScript}\n    \n    <!-- Structured Data / JSON-LD for SEO -->\n    <script type="application/ld+json">\n    ${JSON.stringify(websiteSchema, null, 4)}\n    </script>\n    \n    <script type="application/ld+json">\n    ${JSON.stringify(organizationSchema, null, 4)}\n    </script>\n    \n    <script type="application/ld+json">\n    ITEMLIST_PLACEHOLDER\n    </script>`
        );
    }

    // 4. Update structured data (ItemList)
    const structuredData = generateStructuredData();
    const structuredDataJSON = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": structuredData
    }, null, 6);

    // Find and replace the ItemList structured data
    const itemListRegex = /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"ItemList"[\s\S]*?\}\s*<\/script>/;
    if (html.includes('"@type": "ItemList"')) {
        html = html.replace(itemListRegex, `<script type="application/ld+json">\n    ${structuredDataJSON}\n    </script>`);
    } else {
        // Replace placeholder if it exists
        html = html.replace('ITEMLIST_PLACEHOLDER', structuredDataJSON);
    }

    // 5. Update translations in JavaScript
    const translations = generateTranslations();
    
    // Find the translations object and replace products section
    const translationsRegex = /(const translations = \{[\s\S]*?)(en: \{[\s\S]*?products: \{[\s\S]*?\}[\s\S]*?\}[\s\S]*?},[\s\S]*?uk: \{[\s\S]*?products: \{[\s\S]*?\}[\s\S]*?\}[\s\S]*?},[\s\S]*?es: \{[\s\S]*?products: \{[\s\S]*?\}[\s\S]*?\}[\s\S]*?})([\s\S]*?\};)/;
    
    // Build the full translations object with static content
    const fullTranslations = `const translations = {
            en: {
                swipeToExplore: 'Swipe to explore',
                modalTitle: 'Complete Your Order',
                modalSubtitle: 'Enter your Instagram to proceed',
                instagramPlaceholder: '@your_instagram',
                submitButton: 'Confirm Order',
                toastMessage: "Order sent! We'll contact you soon.",
                errorMessage: 'Failed to send order. Please try again.',
                buyButton: 'Buy',
                bestSeller: 'Best Seller',
                premium: 'Premium',
                trending: 'Trending',
                luxury: 'Luxury',
                new: 'New',
                featured: 'Featured',
                products: ${JSON.stringify(translations.en.products, null, 20).replace(/\n/g, '\n                    ')}
            },
            uk: {
                swipeToExplore: 'Гортайте для перегляду',
                modalTitle: 'Завершіть замовлення',
                modalSubtitle: 'Введіть ваш Instagram для продовження',
                instagramPlaceholder: '@ваш_instagram',
                submitButton: 'Підтвердити замовлення',
                toastMessage: 'Замовлення відправлено! Ми зв\\'яжемося з вами найближчим часом.',
                errorMessage: 'Не вдалося відправити замовлення. Спробуйте ще раз.',
                buyButton: 'Купити',
                bestSeller: 'Бестселер',
                premium: 'Преміум',
                trending: 'Тренд',
                luxury: 'Люкс',
                new: 'Новинка',
                featured: 'Рекомендовано',
                products: ${JSON.stringify(translations.uk.products, null, 20).replace(/\n/g, '\n                    ')}
            },
            es: {
                swipeToExplore: 'Desliza para explorar',
                modalTitle: 'Completa tu pedido',
                modalSubtitle: 'Ingresa tu Instagram para continuar',
                instagramPlaceholder: '@tu_instagram',
                submitButton: 'Confirmar pedido',
                toastMessage: '¡Pedido enviado! Te contactaremos pronto.',
                errorMessage: 'Error al enviar el pedido. Inténtalo de nuevo.',
                buyButton: 'Comprar',
                bestSeller: 'Más vendido',
                premium: 'Premium',
                trending: 'Tendencia',
                luxury: 'Lujo',
                new: 'Nuevo',
                featured: 'Destacado',
                products: ${JSON.stringify(translations.es.products, null, 20).replace(/\n/g, '\n                    ')}
            }
        };`;

    html = html.replace(translationsRegex, fullTranslations);

    // 6. Update products array in JavaScript
    const productsArray = generateProductsArray();
    const productsArrayString = JSON.stringify(productsArray, null, 12).replace(/\n/g, '\n        ');
    
    const productsRegex = /(const products = )\[[\s\S]*?\];/;
    html = html.replace(productsRegex, `$1${productsArrayString};`);

    // 7. Update navigation dots
    const navDots = generateNavDots();
    // Match from the comment to the closing div, ensuring we capture the entire side-nav section
    const navDotsRegex = /<!-- Side Navigation Dots -->\s*<div class="side-nav" id="sideNav">\s*(?:<div class="nav-dot"[^>]*>.*?<\/div>\s*)*<\/div>/s;
    html = html.replace(navDotsRegex, `<!-- Side Navigation Dots -->\n    <div class="side-nav" id="sideNav">\n${navDots}\n    </div>`);

    // Write the updated HTML
    fs.writeFileSync('./index.html', html, 'utf8');
    console.log('✅ index.html has been successfully updated!');
    console.log(`📦 Generated ${products.length} products`);
    console.log(`🌐 Updated translations for EN, UK, ES`);
    console.log(`🔍 Updated SEO structured data`);
    console.log(`🎯 Updated navigation dots`);
}

// Run the update
try {
    updateIndexHTML();
} catch (error) {
    console.error('❌ Error updating index.html:', error.message);
    process.exit(1);
}

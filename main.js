// Configuration
const TELEGRAM_BOT_TOKEN = '8459093280:AAGWfIASAQ4u6Dqlz7hbDSJxCl8dl9uFNxY';
const TELEGRAM_CHAT_ID = '470332661';

// Google Analytics Helper Functions
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

function trackPageView(pagePath) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: pagePath
        });
    }
}

// Translations
const translations = {
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
        instagramCtaTitle: 'See More on Instagram',
        instagramCtaDescription: 'Discover our full collection, styling tips, and customer transformations',
        instagramCtaButton: 'Visit Instagram',
        products: {
                      "braidsWithCurls01": {
                                "name": "Braids with Curls",
                                "description": "A set of braids with added curls and integrated weaving",
                                "specs": [
                                          "55 cm",
                                          "Requires maintenance",
                                          "Reusable",
                                          "Multicolor options"
                                ]
                      }
            }
    },
    uk: {
        swipeToExplore: 'Гортайте для перегляду',
        modalTitle: 'Завершіть замовлення',
        modalSubtitle: 'Введіть ваш Instagram для продовження',
        instagramPlaceholder: '@ваш_instagram',
        submitButton: 'Підтвердити замовлення',
        toastMessage: 'Замовлення відправлено! Ми зв\'яжемося з вами найближчим часом.',
        errorMessage: 'Не вдалося відправити замовлення. Спробуйте ще раз.',
        buyButton: 'Купити',
        bestSeller: 'Бестселер',
        premium: 'Преміум',
        trending: 'Тренд',
        luxury: 'Люкс',
        new: 'Новинка',
        featured: 'Рекомендовано',
        instagramCtaTitle: 'Дивіться більше в Instagram',
        instagramCtaDescription: 'Відкрийте нашу повну колекцію, поради зі стилю та перетворення клієнтів',
        instagramCtaButton: 'Відвідати Instagram',
        products: {
                      "braidsWithCurls01": {
                                "name": "Коси з кучерями",
                                "description": "Комплект косичок з додаванням кучерів + вплетення",
                                "specs": [
                                          "55 см",
                                          "Потребує догляду",
                                          "Багаторазовий",
                                          "Різні кольори"
                                ]
                      }
            }
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
        instagramCtaTitle: 'Ver más en Instagram',
        instagramCtaDescription: 'Descubre nuestra colección completa, consejos de estilo y transformaciones de clientes',
        instagramCtaButton: 'Visitar Instagram',
        products: {
                      "braidsWithCurls01": {
                                "name": "Trenzas con rizos",
                                "description": "Conjunto de trenzas con rizos añadidos y entretejido integrado",
                                "specs": [
                                          "55 cm",
                                          "Requiere mantenimiento",
                                          "Reutilizable",
                                          "Opciones multicolor"
                                ]
                      }
            }
    }
};

// Product data with image and video support
const products = [
    {
        "id": "braidsWithCurls01",
        "price": 279,
        "badge": "bestSeller",
        "media": [
            {
                "type": "image",
                "src": "./assets/products/braidsWithCurls01/optimized/01-640w.webp",
                "srcset": "./assets/products/braidsWithCurls01/optimized/01-320w.webp 320w, ./assets/products/braidsWithCurls01/optimized/01-640w.webp 640w, ./assets/products/braidsWithCurls01/optimized/01-1024w.webp 1024w",
                "sizes": "(max-width: 320px) 320px, (max-width: 640px) 640px, 1024px"
            },
            {
                "type": "image",
                "src": "./assets/products/braidsWithCurls01/optimized/03-640w.webp",
                "srcset": "./assets/products/braidsWithCurls01/optimized/03-320w.webp 320w, ./assets/products/braidsWithCurls01/optimized/03-640w.webp 640w, ./assets/products/braidsWithCurls01/optimized/03-1024w.webp 1024w",
                "sizes": "(max-width: 320px) 320px, (max-width: 640px) 640px, 1024px"
            },
            {
                "type": "image",
                "src": "./assets/products/braidsWithCurls01/optimized/04-640w.webp",
                "srcset": "./assets/products/braidsWithCurls01/optimized/04-320w.webp 320w, ./assets/products/braidsWithCurls01/optimized/04-640w.webp 640w, ./assets/products/braidsWithCurls01/optimized/04-1024w.webp 1024w",
                "sizes": "(max-width: 320px) 320px, (max-width: 640px) 640px, 1024px"
            }
        ],
        "emojis": [
            "🌺",
            "🎨",
            "✨",
            "💫"
        ]
    }
];

let currentLanguage = 'en';
let selectedProduct = null;

// Initialize
function init() {
    renderProducts();
    setupNavigationDots();
    setupEventListeners();
    updateLanguage('en');
}

// Setup side navigation dots
function setupNavigationDots() {
    const sideNav = document.getElementById('sideNav');
    sideNav.innerHTML = '';
    const totalSlides = products.length + 1; // products + Instagram CTA
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        sideNav.appendChild(dot);
    }
}

// Helper function to determine media type
function getMediaType(mediaItem) {
    if (!mediaItem) return null;
    if (typeof mediaItem === 'object' && mediaItem.type) {
        return mediaItem;
    }
    // Auto-detect video extensions
    if (typeof mediaItem === 'string') {
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
        const isVideo = videoExtensions.some(ext => mediaItem.toLowerCase().includes(ext));
        return {
            type: isVideo ? 'video' : 'image',
            src: mediaItem
        };
    }
    return null;
}

// Render products
function renderProducts() {
    const container = document.getElementById('scrollContainer');
    const productSlides = products.map((product, index) => `
        <div class="product-slide" data-slide-index="${index}">
            <div class="product-content">
                <div class="gallery-container" data-product-index="${index}">
                    <div class="gallery-wrapper">
                        <div class="gallery-track">
                            ${product.media.map((mediaItem, mediaIndex) => {
                                const media = getMediaType(mediaItem);
                                const hasMedia = media && media.src;
                                const isFirstImage = mediaIndex === 0;
                                const loadingAttr = isFirstImage ? 'eager' : 'lazy';

                                return `
                                <div class="gallery-item" data-media='${JSON.stringify(media)}' data-emoji="${product.emojis[mediaIndex]}" data-media-index="${mediaIndex}">
                                    ${hasMedia && media.type === 'image' ?
                                        `<img
                                            src="${media.src}"
                                            ${media.srcset ? `srcset="${media.srcset}"` : ''}
                                            ${media.sizes ? `sizes="${media.sizes}"` : ''}
                                            alt="Product image ${mediaIndex + 1}"
                                            class="gallery-item-image"
                                            loading="${loadingAttr}"
                                            ${isFirstImage && index === 0 ? 'fetchpriority="high"' : ''}
                                            decoding="async"
                                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` :
                                    hasMedia && media.type === 'video' ?
                                        `<video src="${media.src}" class="gallery-item-video" muted playsinline loop preload="none" loading="lazy"></video>` : ''}
                                    <div class="gallery-item-emoji" style="${hasMedia ? 'display:none' : ''}">${product.emojis[mediaIndex]}</div>
                                    ${mediaIndex === 0 ? `<div class="product-badge" data-translate="${product.badge}"></div>` : ''}
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="gallery-indicators"></div>
                </div>
                <div class="product-info">
                    <h2 class="product-name" data-product="${product.id}"></h2>
                    <p class="product-description" data-product="${product.id}"></p>
                    <div class="product-specs" data-product="${product.id}"></div>
                    <div class="product-footer">
                        <div class="product-price">€${product.price}</div>
                        <button class="buy-btn" data-product-id="${product.id}" data-product-price="${product.price}" data-translate="buyButton">Buy</button>
                    </div>
                    ${index === 0 ? `
                        <div class="scroll-hint">
                            <span data-translate="swipeToExplore">Swipe to explore</span>
                            <div class="scroll-hint-arrow">↓</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Add Instagram CTA slide
    const instagramCtaSlide = `
        <div class="product-slide" data-slide-index="${products.length}">
            <div class="product-content">
                <div class="instagram-cta-card">
                    <div class="instagram-cta-icon">📸</div>
                    <h2 class="instagram-cta-title" data-translate="instagramCtaTitle">See More on Instagram</h2>
                    <p class="instagram-cta-description" data-translate="instagramCtaDescription">Discover our full collection, styling tips, and customer transformations</p>
                    <button class="instagram-cta-button" id="instagramCtaButton" data-translate="instagramCtaButton">Visit Instagram</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = productSlides + instagramCtaSlide;

    setupGalleries();
}

// Setup galleries with clickable dots and video autoplay
function setupGalleries() {
    document.querySelectorAll('.gallery-container').forEach(container => {
        const wrapper = container.querySelector('.gallery-wrapper');
        const items = container.querySelectorAll('.gallery-item');
        const indicators = container.querySelector('.gallery-indicators');

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll('.gallery-dot');

        // Function to check if an item is in view and play/pause videos
        function updateVisibleMedia() {
            const scrollLeft = wrapper.scrollLeft;
            const itemWidth = items[0].offsetWidth + 24; // item width + gap
            const currentIndex = Math.round(scrollLeft / itemWidth);

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Play/pause videos based on visibility
            items.forEach((item, index) => {
                const video = item.querySelector('.gallery-item-video');
                if (video) {
                    if (index === currentIndex) {
                        // Autoplay video when it becomes visible
                        video.play().catch(() => {
                            // Autoplay might be blocked, silently ignore
                        });
                    } else {
                        // Pause video when not visible
                        video.pause();
                        video.currentTime = 0; // Reset to beginning
                    }
                }
            });
        }

        // Update active dot and video playback on scroll (with passive listener)
        wrapper.addEventListener('scroll', updateVisibleMedia, { passive: true });

        // Initial check for first item
        updateVisibleMedia();

        // Click dot to scroll to image/video
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const itemWidth = items[0].offsetWidth + 24;
                wrapper.scrollTo({
                    left: itemWidth * index,
                    behavior: 'smooth'
                });
            });
        });

        // Click image/video to open lightbox
        items.forEach(item => {
            item.addEventListener('click', () => {
                const mediaData = item.getAttribute('data-media');
                const emoji = item.getAttribute('data-emoji');
                const mediaIndex = item.getAttribute('data-media-index');
                const lightboxContent = document.getElementById('lightboxContent');
                
                // Track media view
                trackEvent('view_media', {
                    media_type: mediaData && mediaData !== 'null' ? 'image_video' : 'emoji',
                    media_index: parseInt(mediaIndex)
                });

                if (mediaData && mediaData !== 'null') {
                    try {
                        const media = JSON.parse(mediaData);
                        if (media && media.src) {
                            if (media.type === 'video') {
                                lightboxContent.innerHTML = `<video src="${media.src}" class="lightbox-image" controls muted autoplay loop playsinline></video>`;
                            } else {
                                lightboxContent.innerHTML = `<img
                                    src="${media.src}"
                                    ${media.srcset ? `srcset="${media.srcset}"` : ''}
                                    ${media.sizes ? `sizes="${media.sizes}"` : ''}
                                    alt="Product image"
                                    class="lightbox-image"
                                    loading="eager"
                                    decoding="async">`;
                            }
                        } else {
                            lightboxContent.innerHTML = `<div class="lightbox-emoji">${emoji}</div>`;
                        }
                    } catch (e) {
                        lightboxContent.innerHTML = `<div class="lightbox-emoji">${emoji}</div>`;
                    }
                } else {
                    lightboxContent.innerHTML = `<div class="lightbox-emoji">${emoji}</div>`;
                }

                document.getElementById('lightbox').classList.add('active');
            });
        });
    });
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Update language
function updateLanguage(lang) {
    currentLanguage = lang;
    
    // Track language change
    trackEvent('language_change', {
        language: lang,
        previous_language: currentLanguage
    });
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    products.forEach(product => {
        const productData = translations[lang].products[product.id];
        
        document.querySelectorAll(`[data-product="${product.id}"]`).forEach(el => {
            if (el.classList.contains('product-name')) {
                el.textContent = productData.name;
            } else if (el.classList.contains('product-description')) {
                el.textContent = productData.description;
            } else if (el.classList.contains('product-specs')) {
                el.innerHTML = productData.specs.map(spec => 
                    `<span class="spec-tag">${spec}</span>`
                ).join('');
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Logo Instagram link tracking
    const logoInstagramLink = document.getElementById('logoInstagramLink');
    if (logoInstagramLink) {
        logoInstagramLink.addEventListener('click', () => {
            trackEvent('click', {
                event_category: 'engagement',
                event_label: 'logo_instagram_link',
                value: 1
            });
        });
    }

    // Instagram CTA button tracking
    const instagramCtaButton = document.getElementById('instagramCtaButton');
    if (instagramCtaButton) {
        instagramCtaButton.addEventListener('click', () => {
            trackEvent('click', {
                event_category: 'engagement',
                event_label: 'instagram_cta_button',
                value: 1
            });
            window.open('https://www.instagram.com/ta_sho_plete/', '_blank', 'noopener,noreferrer');
        });
    }

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Buy buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) {
            const productId = e.target.getAttribute('data-product-id');
            const productPrice = e.target.getAttribute('data-product-price');
            const productData = translations[currentLanguage].products[productId];
            
            selectedProduct = {
                id: productId,
                name: productData.name,
                price: productPrice
            };
            
            // Track product view/interest
            trackEvent('view_item', {
                currency: 'EUR',
                value: parseFloat(productPrice),
                items: [{
                    item_id: productId,
                    item_name: productData.name,
                    price: parseFloat(productPrice)
                }]
            });
            
            document.getElementById('instagramModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('instagramModal').addEventListener('click', (e) => {
        if (e.target.id === 'instagramModal') closeModal();
    });

    // Submit Instagram
    document.getElementById('submitBtn').addEventListener('click', submitOrder);

    // Enter key to submit
    document.getElementById('instagramInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitOrder();
    });

    // Lightbox
    document.getElementById('lightboxClose').addEventListener('click', () => {
        document.getElementById('lightbox').classList.remove('active');
    });

    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') {
            document.getElementById('lightbox').classList.remove('active');
        }
    });

    // Vertical navigation
    const scrollContainer = document.getElementById('scrollContainer');
    const navDots = document.querySelectorAll('.nav-dot');
    const productSlides = document.querySelectorAll('.product-slide');
    let currentSlide = 0;

    function updateActiveDot() {
        const scrollTop = scrollContainer.scrollTop;
        const slideHeight = window.innerHeight;
        const newSlide = Math.round(scrollTop / slideHeight);
        
        if (newSlide !== currentSlide) {
            productSlides[currentSlide].classList.remove('active');
            currentSlide = newSlide;
            productSlides[currentSlide].classList.add('active');
            
            // Track product scroll/view
            const productId = products[currentSlide]?.id;
            if (productId) {
                trackEvent('product_scroll', {
                    product_id: productId,
                    product_position: currentSlide
                });
            }
            
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            productSlides[index].scrollIntoView({ behavior: 'smooth' });
        });
    });

    scrollContainer.addEventListener('scroll', () => {
        updateActiveDot();
        scrollContainer.classList.add('scrolled');
    }, { passive: true });

    // Hide scroll hint on any touch/scroll interaction
    let scrollHintHidden = false;
    const hideScrollHint = () => {
        if (!scrollHintHidden) {
            scrollContainer.classList.add('scrolled');
            scrollHintHidden = true;
        }
    };

    scrollContainer.addEventListener('touchstart', hideScrollHint, { once: true, passive: true });
    scrollContainer.addEventListener('wheel', hideScrollHint, { once: true, passive: true });
    
    // Also hide on gallery interaction
    document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
        wrapper.addEventListener('touchstart', hideScrollHint, { once: true, passive: true });
        wrapper.addEventListener('mousedown', hideScrollHint, { once: true });
    });

    // Set first slide as active
    productSlides[0].classList.add('active');

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.getElementById('lightbox').classList.remove('active');
        }
    });
}

// Close modal
function closeModal() {
    document.getElementById('instagramModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('instagramInput').value = '';
    document.getElementById('errorMessage').style.display = 'none';
}

// Submit order to Telegram
async function submitOrder() {
    const instagram = document.getElementById('instagramInput').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMessage');

    if (!instagram) {
        errorMsg.textContent = translations[currentLanguage].errorMessage;
        errorMsg.style.display = 'block';
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '...';

    const message = `🛍️ New Order!\n\n📦 Product: ${selectedProduct.name}\n💰 Price: €${selectedProduct.price}\n📱 Instagram: ${instagram}\n🌐 Language: ${currentLanguage.toUpperCase()}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (response.ok) {
            // Track successful purchase
            trackEvent('purchase', {
                currency: 'EUR',
                value: parseFloat(selectedProduct.price),
                transaction_id: Date.now().toString(),
                items: [{
                    item_id: selectedProduct.id,
                    item_name: selectedProduct.name,
                    price: parseFloat(selectedProduct.price),
                    quantity: 1
                }]
            });
            
            closeModal();
            showToast();
            errorMsg.style.display = 'none';
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMsg.style.display = 'block';
        
        // Track failed purchase attempt
        trackEvent('purchase_failed', {
            product_id: selectedProduct.id,
            product_name: selectedProduct.name,
            error: 'telegram_api_error'
        });
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = translations[currentLanguage].submitButton;
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

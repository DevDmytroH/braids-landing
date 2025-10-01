/**
 * Image Optimization Guide
 * 
 * This script provides instructions for optimizing images for Web Vitals.
 * 
 * AUTOMATED OPTIMIZATION (Recommended):
 * 1. Install sharp: npm install sharp
 * 2. Run: node optimize-images.js
 * 
 * MANUAL OPTIMIZATION:
 * Use online tools like:
 * - https://squoosh.app (Google's image optimizer)
 * - https://tinypng.com (PNG/JPEG compression)
 * - https://imagecompressor.com
 * 
 * TARGET SIZES:
 * - Product images: 200-300KB (currently 1-1.6MB)
 * - Social images (OG/Twitter): 100-150KB (currently 500KB+)
 * - Quality: 75-85%
 * - Format: WebP (already using ✓)
 * 
 * RESPONSIVE IMAGES:
 * Create multiple sizes for each image:
 * - 320w (mobile small)
 * - 640w (mobile/tablet)
 * - 1024w (desktop)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
    sharp = require('sharp');
    console.log('✓ Sharp is installed. Starting optimization...\n');
} catch (error) {
    console.log('⚠ Sharp is not installed.');
    console.log('\nTo install sharp, run:');
    console.log('  npm install sharp\n');
    console.log('Then run this script again: node optimize-images.js\n');
    console.log('Alternatively, use manual optimization tools mentioned above.');
    process.exit(1);
}

const ASSETS_DIR = path.join(__dirname, 'assets');
const PRODUCTS_DIR = path.join(ASSETS_DIR, 'products');
const SEO_DIR = path.join(ASSETS_DIR, 'seo');

// Image sizes for responsive images
const RESPONSIVE_SIZES = [
    { width: 320, suffix: '-320w' },
    { width: 640, suffix: '-640w' },
    { width: 1024, suffix: '-1024w' }
];

// Quality settings
const QUALITY = {
    product: 80,  // Product images
    seo: 85,      // Social media images
    thumbnail: 75 // Thumbnails
};

async function optimizeImage(inputPath, outputPath, quality = 80, width = null) {
    try {
        let pipeline = sharp(inputPath);
        
        if (width) {
            pipeline = pipeline.resize(width, null, {
                fit: 'inside',
                withoutEnlargement: true
            });
        }
        
        const ext = path.extname(inputPath).toLowerCase();
        
        if (ext === '.webp') {
            pipeline = pipeline.webp({ quality });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality, progressive: true });
        } else if (ext === '.png') {
            pipeline = pipeline.png({ quality, compressionLevel: 9 });
        }
        
        await pipeline.toFile(outputPath);
        
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
        
        console.log(`  ${path.basename(inputPath)}`);
        console.log(`    ${(inputStats.size / 1024).toFixed(0)}KB → ${(outputStats.size / 1024).toFixed(0)}KB (${reduction}% reduction)`);
        
        return outputStats.size;
    } catch (error) {
        console.error(`  Error optimizing ${inputPath}:`, error.message);
        return null;
    }
}

async function createResponsiveImages(inputPath, outputDir, quality = 80) {
    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);
    
    console.log(`\n  Creating responsive versions of ${basename}${ext}:`);
    
    for (const size of RESPONSIVE_SIZES) {
        const outputPath = path.join(outputDir, `${basename}${size.suffix}${ext}`);
        await optimizeImage(inputPath, outputPath, quality, size.width);
    }
}

async function optimizeProductImages() {
    console.log('📦 Optimizing Product Images\n');
    
    const productDirs = fs.readdirSync(PRODUCTS_DIR);
    
    for (const productDir of productDirs) {
        const productPath = path.join(PRODUCTS_DIR, productDir);
        
        if (!fs.statSync(productPath).isDirectory()) continue;
        
        console.log(`\nProduct: ${productDir}`);
        
        const files = fs.readdirSync(productPath);
        const imageFiles = files.filter(f => 
            /\.(webp|jpg|jpeg|png)$/i.test(f) && 
            !/-\d+w\.(webp|jpg|jpeg|png)$/i.test(f) // Skip already optimized versions
        );
        
        for (const file of imageFiles) {
            const inputPath = path.join(productPath, file);
            
            // Create optimized directory if it doesn't exist
            const optimizedDir = path.join(productPath, 'optimized');
            if (!fs.existsSync(optimizedDir)) {
                fs.mkdirSync(optimizedDir);
            }
            
            // Create responsive images
            await createResponsiveImages(inputPath, optimizedDir, QUALITY.product);
        }
    }
}

async function optimizeSEOImages() {
    console.log('\n\n🎨 Optimizing SEO/Social Images\n');
    
    const files = fs.readdirSync(SEO_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    
    const optimizedDir = path.join(SEO_DIR, 'optimized');
    if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir);
    }
    
    for (const file of imageFiles) {
        const inputPath = path.join(SEO_DIR, file);
        const outputPath = path.join(optimizedDir, file);
        
        console.log(`\nOptimizing ${file}:`);
        await optimizeImage(inputPath, outputPath, QUALITY.seo);
    }
}

async function createVideoThumbnails() {
    console.log('\n\n🎬 Creating Video Thumbnails\n');
    console.log('Note: Video thumbnail creation requires ffmpeg.');
    console.log('Please create thumbnails manually or install ffmpeg.\n');
    console.log('For the video file: assets/products/braidsWithCurls01/02.mp4');
    console.log('Create a poster image: 02-poster.webp\n');
}

async function main() {
    console.log('🚀 Image Optimization Tool\n');
    console.log('This will create optimized versions of your images.\n');
    console.log('Original files will NOT be modified.\n');
    console.log('Optimized files will be saved in "optimized" subdirectories.\n');
    console.log('═'.repeat(60) + '\n');
    
    try {
        await optimizeProductImages();
        await optimizeSEOImages();
        await createVideoThumbnails();
        
        console.log('\n' + '═'.repeat(60));
        console.log('\n✅ Optimization Complete!\n');
        console.log('Next steps:');
        console.log('1. Review optimized images in the "optimized" folders');
        console.log('2. Replace original images with optimized versions if satisfied');
        console.log('3. Update image paths in your code to use responsive images');
        console.log('4. Test the website to ensure images load correctly\n');
        
    } catch (error) {
        console.error('\n❌ Error during optimization:', error);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { optimizeImage, createResponsiveImages };

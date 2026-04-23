// export-gif.js - Professional GIF Export using Puppeteer

const puppeteer = require('puppeteer');
const GIFEncoder = require('gifencoder');
const { createWriteStream } = require('fs');
const { PNG } = require('pngjs');

async function exportMapAsGIF() {
  console.log('🚀 Starting GIF export...');
  console.log('📸 This will capture 30 frames over 3 seconds\n');

  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport size (optimal for Facebook)
  await page.setViewport({ width: 1200, height: 800 });

  console.log('🌍 Loading map...');

  // Load your map page
  await page.goto('http://localhost:8000/index.html', {
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // Wait for map to fully load and animate
  await page.waitForTimeout(3000);

  console.log('✅ Map loaded, starting capture...\n');

  // Create GIF encoder
  const encoder = new GIFEncoder(1200, 800);
  const outputStream = createWriteStream('strait-of-hormuz-oil-flows.gif');

  encoder.createReadStream().pipe(outputStream);
  encoder.start();
  encoder.setRepeat(0);   // 0 = loop forever
  encoder.setDelay(100);  // 100ms between frames (10fps)
  encoder.setQuality(10); // Quality: 1-20 (lower = better)

  // Capture 30 frames over 3 seconds
  const totalFrames = 30;

  for (let i = 0; i < totalFrames; i++) {
    const progress = Math.round((i + 1) / totalFrames * 100);
    process.stdout.write(`\r📸 Capturing frame ${i + 1}/${totalFrames} (${progress}%)`);

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });

    // Convert to PNG and add to GIF
    const png = PNG.sync.read(screenshot);
    encoder.addFrame(png.data);

    // Wait for animation to progress
    await page.waitForTimeout(100);
  }

  encoder.finish();

  console.log('\n\n✅ GIF created successfully!');
  console.log('📁 File saved as: strait-of-hormuz-oil-flows.gif');
  console.log('📏 Size: 1200x800 pixels (optimized for Facebook)');
  console.log('🎬 Duration: 3 seconds, looping');

  await browser.close();

  console.log('\n✨ You can now post the GIF to Facebook!');
}

// Run the export
exportMapAsGIF().catch(console.error);
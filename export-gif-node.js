const puppeteer = require('puppeteer');
const GIFEncoder = require('gifencoder');
const { createWriteStream } = require('fs');
const { PNG } = require('pngjs');

async function exportMapAsGIF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 800, height: 500 });

  // Load your map page
  await page.goto('http://localhost:8000/index.html', {
    waitUntil: 'networkidle0'
  });

  // Wait for map to load
  await page.waitForTimeout(2000);

  // Create GIF encoder
  const encoder = new GIFEncoder(800, 500);
  encoder.createReadStream().pipe(createWriteStream('strait-hormuz.gif'));
  encoder.start();
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setDelay(100);  // 100ms delay
  encoder.setQuality(10);

  // Capture 30 frames
  for (let i = 0; i < 30; i++) {
    console.log(`Capturing frame ${i + 1}/30`);

    // Screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 800, height: 500 }
    });

    // Add to GIF
    const png = PNG.sync.read(screenshot);
    encoder.addFrame(png.data);

    // Wait a bit for animation to progress
    await page.waitForTimeout(100);
  }

  encoder.finish();
  await browser.close();
  console.log('✅ GIF created: strait-hormuz.gif');
}

exportMapAsGIF();
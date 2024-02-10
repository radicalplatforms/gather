import puppeteer from 'puppeteer';

async function crawlWebsite(url: string): Promise<any[]> {
  const browser = await puppeteer.launch({'headless': 'new'});
  const page = await browser.newPage();

  try {
    // Navigate to the specified URL
    await page.goto(url);

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Your specific crawling logic for each website goes here

    // For example, let's extract event information
    const events = await page.$$eval('[data-event]', (eventElements) =>
      eventElements.map((eventElement) => {
        const name = eventElement.querySelector('[data-event-name]')?.textContent?.trim() || '';
        const description = eventElement.querySelector('[data-event-description]')?.textContent?.trim() || '';
        const startDate = eventElement.querySelector('[data-event-start-date]')?.textContent?.trim() || '';
        const endDate = eventElement.querySelector('[data-event-end-date]')?.textContent?.trim() || '';
        const location = eventElement.querySelector('[data-event-location]')?.textContent?.trim() || '';

        return {
          name,
          description,
          startDate,
          endDate,
          location,
        };
      })
    );

    return events;
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

// List of URLs to crawl
const urlsToCrawl: string[] = [
  'https://www.meetup.com/',
  'https://www.choosechicago.com/events/',
  'https://yourchicagoguide.com/chicago-events-calendar/',
  'https://www.eventbrite.com/d/il--chicago/events/',
  'https://www.timeout.com/chicago/events-calendar',
];

// Crawl each URL in the list
async function crawlAllWebsites(): Promise<void> {
  for (const url of urlsToCrawl) {
    const events = await crawlWebsite(url);
    console.log(`Events from ${url}:`, events);
  }
}

// Call the function to start crawling
crawlAllWebsites();

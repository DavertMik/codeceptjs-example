Feature('Bold Product Search on Google');

Before(async ({I}) => {
    I.amOnPage('http://www.google.ca');
});

let productSearch = new DataTable(['search','result']);
productSearch.add(['Bold Product Upsell','Shopify Upsell App | Bold Commerce']);
productSearch.add(['Bold Product Options','Shopify Product Options App | Bold Commerce']);
productSearch.add(['Bold Sales Motivator','Free Shipping and Promotion Bar for Shopify - Motivator']);

Data(productSearch).Scenario('Search Bold Products on Google', ({I,current}) => {
    I.fillField('q', current.search);
    I.click('Google Search');
    I.see(current.result);
}).tag('product-search').tag('classic-test');

Scenario('asdsad @TA-ignore', ({ I }) => {
    I.dontSee('assadsadjhsajkdhksa sajhd saksa');
})

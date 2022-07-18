Feature('Bold Product Search on Google @S6f4acb8a');

Before(async ({I}) => {
    I.amOnPage('http://www.google.ca');
});

let productSearch = new DataTable(['search','result']);
productSearch.add(['Bold Product Upsell','Shopify Upsell App | Bold Commerce']);
productSearch.add(['Bold Product Options','Shopify Product Options App | Bold Commerce']);
productSearch.add(['Bold Sales Motivator','Free Shipping and Promotion Bar for Shopify - Motivator']);

Data(productSearch).Scenario('Search Bold Products on Google @T0611e476', ({I,current}) => {
    I.fillField('q', current.search);
    I.click('Google Search');
    I.see(current.result);
}).tag('product-search').tag('classic-test');

Scenario('asdsad @TA-ignore @Tc8b03beb', ({ I }) => {
    I.dontSee('assadsadjhsajkdhksa sajhd saksa');
})

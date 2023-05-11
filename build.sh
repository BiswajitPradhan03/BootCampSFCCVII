cd storefront-reference-architecture/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
node bin/Makefile compileFonts
npm run compile:fonts
cd ../

cd plugin_instorepickup/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
cd ../

cd plugin_productcompare/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
cd ../

cd plugin_reviews/
npm install
npx sgmf-scripts --compile css
cd ../

cd plugin_wishlists/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
cd ../

cd plugin_ordermanagement/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
cd ../

cd plugin_commercepayments/
npm install
npx sgmf-scripts --compile css
npx sgmf-scripts --compile js
npm run resolve:isml
cd ../

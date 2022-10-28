## [2.1.1](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v2.1.1) (2022-10-28)


### TitleCard

* **Features:** Changed date format (79e3f4d)

# [2.1.0](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v2.1.0) (2022-10-28)


* **Code Formatting:** Fixed linting (016dea5)
* **Project Maintenance:** Fixed development environment Firefox relative paths loading (0a0911e)
* **Project Maintenance:** Fixed development environment PDFJS path (4ba224a)


### All

* **Features:** Ability to display helpful search notices besides results (02a4caa)


### Cart

* **Features:** Ability to show notices for cart items (283fd40)
* **Features:** Add ability for isCartOpen state to be shared (764d280)


### constants

* **Features:** Touch last updated date (796db08)


### Dropdown

* **Bug Fixes:** Sort in numerical descending order for results in Firefox (85507cf)


### test

* **Bug Fixes:** Resolve test failures (99b8e8d)


### translations

* **Bug Fixes:** Remove sentence from methods page (9a4062f)
* **Bug Fixes:** Update browser support messages (4f7ecdd)

## [2.0.1](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v2.0.1) (2022-09-29)


### package.json

* **Documentation:** Add me to contributors (ed37a86)


### pages/Methods

* **Bug Fixes:** Add additional link to methods page + resolution warning tweak (73260ca)

# [2.0.0](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v2.0.0) (2022-09-27)


### .storybook/middleware; Cart

* **Features:** added zip route to middleware; fixed id passing bug in Cart (94539eb)


### accreditations

* **Features:** fixes typos and other small fixes (6566488)
* **Features:** adds storybook story and test to accreditations component (0870fae)


### Accreditations/spec

* **Tests:** added new test (4599d1f)
* **Tests:** fixed Accreditations to use new test infrastructure (e63bb90)


### accuracy alert

* **Features:** cleans up withWETTemplate hook (d8eaaf3)
* **Features:** adds a space at the end of a README (01510a8)
* **Features:** removes spec file that breaks pipeline (2b9be21)
* **Features:** adds decorator to add in WET template styles (ce52ebc)
* **Features:** adds story for accuracy alert and add decorator for WET (BROKEN) (3c74a0b)


### AddContentIdsButton

* **Features:** Changed from button base component to a button component for keyboard accessibility (960df68)
* **Features:** returns nothing if counts are less than 1 (6c11981)
* **Features:** cleans up code (8d8f097)


### All

* **Features:** updated aria text for images and added ignore for casing (5156d4f)
* **Features:** updated remaining aria text (15e5e84)
* **Features:** updated all aria text and alt text (cc2fa29)
* **Features:** updating all aria labels and alt text (1ecf125)
* **Bug Fixes:** Update various images alt text with english/french translations (0280505)
* **Bug Fixes:** added missing aria labels (2ace8a7)
* **Bug Fixes:** fixed linting (067dfa0)
* **Bug Fixes:** fixed some aria labels and alt text (9dda701)


### analytics

* **Features:** Add additional tracking workflows (b85ac44)


### app

* **Tests:** adds code to bypass legal disclaimer (4bea1be)


### App

* **Bug Fixes:** fixed linting (cf312fd)
* **Bug Fixes:** fixed tests (949cf4b)
* **Bug Fixes:** adds target blank to all A tags (e12bfa7)
* **Tests:** Updated tests for refactoring and debouncing changes (bd4fd33)
* **Tests:** Fixed failing tests from immediate setTimeout triggers (0814ca1)
* **Tests:** Fixed expected history URL due to change in keeping the selected enum order (fd693a6)


### app spec

* **Bug Fixes:** tries to fix failing localhost tests (64f7e36)


### App/spec

* **Bug Fixes:** fixed test (fd558fd)
* **Tests:** adds temporary lint workarounds for disabled test (207cb17)
* **Tests:** comments out test relating to old treemap functionality, TODO (3ac7405)
* **Tests:** removes expect targeting old Applications component (66453a6)


### App/spec; FilterPanel; SearchBar

* **Bug Fixes:** added aria-labels and fixed tests (828d445)


### App/spec; SearchBar

* **Bug Fixes:** fixes test; adds id to TextField (ff96833)


### App/spec.jsx

* **Bug Fixes:** fixed test (cc7dce3)


### App/theme

* **Code Refactoring:** Moved disabled extension class in theme to mixins (c614cdf)


### applicationDialog

* **Features:** updates project type text in application dialog (fdeb3a5)
* **Features:** updates query to pull in new data fields from API (7df6025)


### ApplicationDialog

* **Bug Fixes:** removes outline on button that appears when clicked (7864fe9)
* **Bug Fixes:** moves anchor info into button; fixes click (d6a3134)
* **Code Formatting:** fixes button visited / hovered styles (4556c65)


### Applications

* **Features:** removes Applications component (d6973dc)


### Architecture/pdfViewer

* **Documentation:** Noted PDF.js module in the application (be14f1a)
* **Documentation:** Noted PDFjs built code replacement (d692773)


### BackButton

* **Features:** updated back button text (7857d60)
* **Features:** updated BackButton with icon and unified it across pages (ee08afc)
* **Features:** Removed hover shadow change (ddc51b7)
* **Features:** Changed from button base component to a button component for keyboard accessibility (8973ba1)


### cart

* **Features:** changes close button icon to an arrow (7427571)


### Cart

* **Features:** Added keyboard accessibility styles for remove all and limitations button (d030e47)
* **Features:** Added interval timer to check whether the current items need to be loaded (6872bf2)
* **Features:** removed overscanCount prop (default = 1) (df1937f)
* **Features:** added lang to cart download form (f565c40)
* **Features:** updating expandList for items in the cart properly (0ae6b13)
* **Features:** styled remove buttons; other small adjustments (5cd132b)
* **Features:** refactored header button styling to not use scale (d3a21f2)
* **Features:** disabling share button and closing sharecard when nothing in cart (23070e0)
* **Features:** unreadCartIds are removed on Cart close (9b63765)
* **Features:** snackbar position adjustment (0a73110)
* **Features:** small adjustments; hid View Full List link (9945b87)
* **Features:** cart url no longer wraps on the copy button (c15e48f)
* **Features:** hooked up cart url copy logic; added check icon for confirmation (WIP) (f356a02)
* **Features:** replaced copyCartURL util with function in Cart (61f8bb5)
* **Features:** added share popout; WIP (2d43225)
* **Features:** spacing header buttons properly (23bbe78)
* **Features:** added share icon (29698b3)
* **Features:** extracted styles from Cart into its own styles file; removed justifyContent prop (b61c9da)
* **Features:** cart quantity label now localized (1a636f2)
* **Features:** wIP cart quantity formatting (908e491)
* **Features:** styled svg circle; simplifications (11c6bb0)
* **Features:** cart button new dot WIP (453f050)
* **Features:** footer now unclickable and transparent when nothing in cart (1e8d395)
* **Features:** small final additions (fcc6b5a)
* **Features:** cart summon button now appears overtop of other elements on the page (b590b41)
* **Features:** fixed Cart so items on the page can still be clicked while it is open (bc7942a)
* **Features:** now using actual ids from cart (c04e1a6)
* **Features:** fixed cart animation (098c1c5)
* **Features:** can now scroll while cart is open; adjusted width (1adb7e1)
* **Features:** removed justifyContent props; added WIP download click function (003964f)
* **Features:** finished download button style; removed unrequired styling (f99b1dd)
* **Features:** added shelf.svg; styled button that shows shelf (7240da9)
* **Features:** creating Cart footer; adding disclaimer and download button, WIP (ea22384)
* **Features:** achieved good starting point for layout (051969d)
* **Features:** styling WIP (dee6feb)
* **Features:** wIP styling (b5db4f1)
* **Features:** wIP Cart component (976da2c)
* **Bug Fixes:** Improve user flow when cart is empty to show empty messages (9ebeb6d)
* **Bug Fixes:** aligns cart close button (a121857)
* **Bug Fixes:** bolded download size text on download button (b2eaebf)
* **Bug Fixes:** fixed overflow issue on cart footer (5fec35b)
* **Bug Fixes:** fixed modifying cartIds array on compress (f7b8aac)
* **Bug Fixes:** adjusted useEffect to fix test; fixed url edge case upon opening cart (b324bd0)
* **Bug Fixes:** fixed font and border styling (37ac687)
* **Bug Fixes:** extracted some styles; other small fixes (75435ba)
* **Code Formatting:** Updated cart to be on top of footer (cfa2ca7)
* **Code Refactoring:** removed justifyContent prop (fbc3269)
* **Code Refactoring:** removed redundant styling; simplified some logic (6a3d05e)
* **Code Refactoring:** removed unused grid props (401b72a)
* **Code Refactoring:** removes unneeded styles (8c19cc3)


### Cart; Cart/ShareCard

* **Code Refactoring:** extracted ShareCard into its own subcomponent with separate styles (2ce9fa0)


### Cart; CartButton/styles; App/theme

* **Code Refactoring:** extracted out some colors into theme file (13eaf96)


### Cart; CartItem

* **Features:** adds ApplicationDialog to cart; project name in cart item can be clicked to vi (97a296a)
* **Features:** removed unneeded prop from CartItem (61c4d34)
* **Features:** implemented dynamic resizing of cart items (c93bebd)
* **Features:** further styling work; new cart items animation (8abbe20)
* **Features:** implemented expandable + autoresizing cart items (33068f6)
* **Features:** fixed scrolling bug by passing in style required by list (6edbf37)
* **Features:** wIP CartItem styling; added data prop; cart using hook for data (e71c4f7)
* **Bug Fixes:** moved ResultDialog up to Cart; managing state in Cart (d9b272d)
* **Code Refactoring:** improved cart item height tracking; removed redundant style (384f849)
* **Code Refactoring:** mild cleanup / changed height function prop name (c6ef642)
* **Code Refactoring:** simplified CartItem rendering and structure (2d8027d)


### Cart; english

* **Features:** added snackbar and icon logic (ade61be)
* **Features:** adding labels to header; added english entries (54bcae9)


### Cart; fileSizeFormatter

* **Code Refactoring:** moved some constants; made locale a prop in fileSizeFormatter (8581a87)


### Cart; fileSizeFormatter; english; french

* **Features:** added kilo/megabyte abbreviations to language files; (f278225)


### Cart; ListPanel; TitleSection

* **Code Refactoring:** simplified list filtering across some components (391d3dd)


### Cart; pages/Search

* **Features:** added Cart to Search page; added button to show Cart; other progress (0522f2f)


### Cart; queries; hooks

* **Features:** added new hook and query for download size; implemented in Cart (1874784)


### Cart; ShareCard

* **Features:** url updates when cart contents change; resetting copy success on url change (a40d890)
* **Code Refactoring:** removed useEffect from Cart; moved compress logic into ShareCard; small s (31bedc4)


### Cart; shelf.svg

* **Code Refactoring:** changed location of shelf.svg to match component folder hierarchy (7c9522f)


### Cart; utilities/fileSizeFormatter

* **Features:** added new utility; implemented in Cart (d800fe5)


### Cart/CartItem

* **Features:** Added loading indicator (498fe70)
* **Bug Fixes:** changed and removed variables. (594d0c1)


### Cart/ShareCard

* **Features:** Changed copy link from button base component to a button component for keyboard accessibility (97af191)
* **Bug Fixes:** fixed sharecard appearing under body (cde0517)
* **Code Refactoring:** small cleanup (1819ce4)


### Cart/spec

* **Features:** added test file for Cart (a5d61c3)


### Cart/stories

* **Bug Fixes:** fixed stories file, which fixes storybook spec (5797e1d)


### CartButton

* **Features:** Added prop types for components (8bedea3)
* **Features:** Added tooltip for unavailable state (4a2e3f1)
* **Features:** Added remove and unavailable states and connected to the config state (4898398)
* **Tests:** Added tests for the cart button (ce0f82a)
* **Code Refactoring:** Moved button styles into theme (c5ecb8b)
* **Code Refactoring:** Moved shelf button to be a public component (cf675bc)
* **Documentation:** Added story for the cart button component (b66d898)


### CartButton/DataNotice

* **Code Refactoring:** Moved result dialog's data notice sub-component to cart button (6de1189)


### CartItem

* **Features:** truncating title of cart items when not expanded (4aa38f2)
* **Features:** styling preview image (0839303)
* **Features:** removing unreadCartIds on animation end (03caab7)
* **Bug Fixes:** fixed cartitem useEffect dependency (e9c1c13)
* **Code Refactoring:** improved / condensed cart item styling code (1947e4b)


### CartItem; english; french

* **Features:** updated language files and implemented language in CartItem (e6fc13d)


### CartItem; queries

* **Features:** adds shortName to cartitem query; shows shortName instead of name on cartIt (3a15e52)
* **Features:** added more fields to query; added pdf viewer to CartItem (74f9811)


### CERDialog

* **Code Refactoring:** Moved limitations and search help dialog code into a shared component (5aef284)


### Components/DateSlider

* **Bug Fixes:** removed Icon (7d7ab03)


### Components/Dropdown/DataTooltip

* **Features:** updated tooltip text (07ea0e4)
* **Bug Fixes:** fixed linting (2a49793)


### config

* **Features:** adds resultCount variable to config state (5b5fee3)


### constants; PaginationBar

* **Bug Fixes:** removed result_count cnst; fixed pagination with new result count (7dc8cb3)


### Containers/App

* **Tests:** Added tests for useConfig (2a2ae54)


### ContentButton

* **Features:** refreshed project/data/methods buttons to reflect new design (949fdcb)
* **Code Refactoring:** removed ContentButton as it is no longer used (770028b)


### data page

* **Features:** merges in changes from project page pr (68dcf8e)
* **Features:** updates text and design of data page (8808a55)


### DataTooltip

* **Bug Fixes:** tooltip links now open in new tab (d3b9abd)


### datePicker

* **Bug Fixes:** adds a level of responsiveness to the datepicker (8217a70)


### DateSlider

* **Features:** Added keyboard accessibility and a timer to reduce the number of onChange callbacks (e3114ce)


### Disclaimer

* **Features:** added scroll reset to learn more onclick (6b58ee2)


### discoveryCards

* **Bug Fixes:** updates IDs for discovery cards (c1ae8d4)


### documentation/Architecture/highLevel

* **Documentation:** Noted GraphQL mocked results for storybook with config and GraphQL decorator (1690723)


### Documentation/Standards

* **Bug Fixes:** changed Commitizen spelling (e17e93f)


### documentation/Testing

* **Documentation:** Noted additional test rendering options (34ad649)


### DotsRating

* **Code Refactoring:** Added a base class name to the dots rating component (1773dca)


### dropdown

* **Features:** modifies dropdown to work for result count list (98b4792)


### Dropdown

* **Features:** sorted project types by small, large and abandonment (13f9e3c)
* **Features:** Added keyboard accessibility style and fixed focus for resultCount type (46e86bc)
* **Bug Fixes:** Use numeric sorting for resultCount type (80b66e7)
* **Bug Fixes:** fixed linting (84d9d67)
* **Bug Fixes:** updated sorting alphabetically (71a626c)
* **Bug Fixes:** removed unneeded code (c5ad700)
* **Bug Fixes:** restores filter dropdown behavior (4008516)
* **Bug Fixes:** fixes issue with dropdown not closing (e2cfd65)


### DropDown

* **Bug Fixes:** sorted all dropdowns alphabetically (385b89d)
* **Bug Fixes:** sorted filters from dropdown instead of useAPI (16dd804)


### Dropdown/DataTooltip

* **Features:** Changed project type help components to add keyboard accessibility (3ad84e6)
* **Bug Fixes:** fixed trailing comma (23db834)
* **Bug Fixes:** fixed color of tooltip (7db4763)


### DropDown/DataTooltip

* **Bug Fixes:** removed margin from ul (a696af8)


### ellipse

* **Features:** adds a small bit of padding on the right to match design (b991b9a)


### Ellipse

* **Features:** creates a popup menu for the ellipse button (ae5bf5e)


### ellipses

* **Features:** provides most of the structure for the dialog (c6031a7)


### ellipsis

* **Features:** re aranges structure of ellipsis files (08b1f16)


### ellipsisButton

* **Features:** fixes and cleans up code (2d49590)
* **Features:** disables auto focus item (032db28)
* **Code Refactoring:** moves reportData component into ellipsis (15439b0)


### EllipsisButton

* **Features:** added space to top of menu; closed now by clicking away (4091840)
* **Features:** changed to click interaction (ab60622)
* **Code Refactoring:** made menu spacing code more robust as per pr (5b31844)


### ellipsisMenu

* **Features:** hooks up mutations to report and rate forms (c4f00b9)


### english

* **Features:** removed rogue colon (f9d89ca)
* **Features:** adds search help text (c770c22)
* **Features:** updated discovery tile titles (67cf32f)
* **Features:** updated landing tagline (14eafce)
* **Bug Fixes:** fixes grammar issue (3e1765c)


### english; french

* **Bug Fixes:** restored language files (87139af)


### english.json

* **Features:** added new message for final decision url rendering (edea8a5)
* **Features:** updated pdf load failure message (523d173)


### english.json; french.json

* **Features:** removed now unused strings from language files (resultDialog) (090ff9e)


### env.example

* **Documentation:** Changed example proxy to be the local machine (bac0011)


### ErrorBoundary

* **Documentation:** Fixed console error override missing reference and suppressed inner problem child error (3936272)


### fileSizeFormatter

* **Features:** download size label now localized (2148075)
* **Bug Fixes:** fixed hook issue (b561d51)
* **Bug Fixes:** fixed hook issue (601ee5a)
* **Bug Fixes:** readded undefined and null check (c1b7c12)
* **Bug Fixes:** removed line so 0 is used (cd83bf4)
* **Code Refactoring:** condensed logic (3961d22)


### FilterChipsPanel

* **Features:** updated styling on clear all button (fcfb790)
* **Features:** updated text decoration to show Clear All Filters is interactable (ce9b207)
* **Features:** added Clear All Filters button in FilterChipsPanel (4ed6871)
* **Features:** added filter chips panel heading (b98f6cf)
* **Features:** styles chip labels with maxWidth (f915463)
* **Features:** removed chip outline & changed bg color (596d4fd)
* **Features:** Added topic chips (a26c910)
* **Features:** updated stories (WIP) and storybook readme (47ad447)
* **Bug Fixes:** fixed organization of components in FilterChipsPanel (c1ad354)
* **Bug Fixes:** changed tag for json (47bfc94)
* **Bug Fixes:** changed font weight (7f9a9d8)
* **Bug Fixes:** fixed formatting because visual studios code did something weird (54cd4a8)
* **Bug Fixes:** fixed linting (72563fa)
* **Code Refactoring:** simplifies css (415e2bc)
* **Documentation:** Added config options to show more chips (8f7e4e7)


### FilterChipsPanel/index

* **Features:** moved getFormattedDate function out of const FilterChipsPanel (4ea76fd)
* **Features:** chip click successfully removes chip and filter now (aa78745)
* **Features:** wIP - removal of clicked chip and filter (bf5d15b)
* **Features:** placed date range chip at the end of the chips list; minor lint fix (8bc4b8c)
* **Features:** finished adding + formatting chips for other filters (eb2fa7d)
* **Features:** wIP; preparing filter chip labels and displaying them upon adding filt (7d527f7)
* **Bug Fixes:** fixed date range filter not being in an array (breaking map) (302751d)
* **Bug Fixes:** removed initialData prop (aa81289)
* **Bug Fixes:** small changes to improve readability and functionality (34b1178)
* **Bug Fixes:** fixed date range chip label to show min/maxDate when a start/endDate is (b9fb37c)
* **Bug Fixes:** fixed import lint issue (189137d)
* **Code Refactoring:** changed formatMessage calls to use api instead of common for new c (6e1acf8)
* **Code Refactoring:** condensed chip onClick function code (6c7b0e0)
* **Code Refactoring:** extracted chip label assembly function; cleaned up comments (e3ad5b0)
* **Code Refactoring:** further condensed chip onClick function (2d75113)
* **Code Refactoring:** removed stub element in component return statement (cf5ab09)
* **Code Refactoring:** simplified assembly of date range chip (f6ac73a)


### FilterChipsPanel/spec

* **Bug Fixes:** fixed chip deletion test (e8eaf60)
* **Tests:** added tests for FilterChipsPanel (5b04e51)


### FilterChipsPanel/stories

* **Features:** now rendering application id chip and date range chip in story (a101f47)
* **Code Refactoring:** removed irrelevant line in story (67566d6)


### FilterChipsPanel/stories and README

* **Bug Fixes:** commented out the storybook component for FilterChipsPanel (5e5a098)


### filterPanel

* **Features:** updates the color for the filter panel border (8b9e0a7)


### FilterToggle

* **Bug Fixes:** moved text within code (fd2d121)


### french

* **Features:** added osdp + topic header translations (8784c8f)
* **Features:** adds new frech translation for project/data/methods pages (219601c)
* **Features:** adds missing translation to ellipsisButton (dc0353f)
* **Features:** added french subject (3e082d9)
* **Features:** updated french landing page tagline (544ea78)
* **Features:** updated relatedTopics; updated view keys (6a808fc)
* **Features:** alignment sheet count translation (7610e75)
* **Features:** added new cart translations (a487c5b)
* **Features:** fills in missing french translations for legal disclaimer (b3c13e0)
* **Features:** updates french translations for report data dialog (7eda3b2)
* **Features:** updates french translations for ellipsis menu (8e7266a)
* **Features:** added completed translations for pdf viewer (6c3b616)
* **Bug Fixes:** removes unneeded neb act text (cb17b46)
* **Bug Fixes:** removes unusual change (4f24a17)
* **Bug Fixes:** fixed listPanel json structure (d2ff12a)


### French

* **Code Refactoring:** renames and moves around french disclaimer (f82847d)


### french.json

* **Features:** added translations for new ResultDialog labels (1610016)
* **Bug Fixes:** fixed singular for 0 in french (6a14f53)
* **Code Refactoring:** removed placeholder items for now (90b2c31)


### French.json

* **Bug Fixes:** removed space (4ccc6db)


### GraphQL

* **Features:** Updated query to use single search term (68d269c)


### hooks/queries

* **Features:** Added result dialog required fields to discovery query items (b27937c)


### hooks/reducer

* **Features:** Removed resetting of topics on filter toggle change (b3a9f8f)
* **Features:** Fixed topics order being lost when loaded in from URL (0b783c2)
* **Features:** Created cart states and actions (da04695)
* **Features:** added option to remove both date filters simultaneously without having to make (698e63d)


### hooks/useAPI

* **Bug Fixes:** removed unneeded code (c311ec3)
* **Bug Fixes:** fixed order of all filters (eae1610)


### hooks/useCartData

* **Features:** added skip when there are no cart ids (b24d90e)


### hooks/useConfig

* **Features:** Fixed loading cart from URL crashing from certain decoded characters (ba0f57f)
* **Features:** Added filter to config (aee6492)
* **Features:** Added topics to the config (6f9da5a)
* **Features:** Updated config to load the cart IDs from the URL (12d89ca)
* **Features:** Saved cart state to URL and local storage (7e55383)
* **Tests:** Added pending test for loading the cart URL (a6a1127)
* **Tests:** Added localStorage tests for cart ids (2334f64)
* **Code Refactoring:** Moved update state flag into React hook state (d3c0f80)
* **Code Refactoring:** Replace state hook with ref since we don't need to rerender (b8b1823)


### hooks/useESAData

* **Features:** Zeroed type counts for application data if the content type is filtered out (5f5c55e)
* **Features:** Added value component filters and counts to the search query (1ee0e7a)


### hooks/useLazyCartData

* **Features:** Updated useCartData hook to cache and lazy load the data (f5b4689)


### IKNotification

* **Features:** Created indigenous knowledge notification link button (ad6c6b5)


### IKNotification/IKDialog

* **Features:** Created indigenous knowledge dialog (4f786d4)


### ImageButton

* **Features:** Updated table icon image (c9c924c)
* **Features:** Updated image button component to work for alignment sheet content (27d2193)
* **Features:** fixed border color (f29678a)


### ImageButton; Disclaimer

* **Bug Fixes:** fixed p descendant of p in Disclaimer; removed redundant prop (f24e809)


### ImageButton; Discoveries

* **Features:** updated shadow on ImageButtons and other aesthetic changes (0c9ed39)
* **Features:** first pass refresh on discovery buttons (db2d6bd)


### ImageButton; useAPI; Discoveries

* **Code Refactoring:** decoupled ImageButton rotation logic into useAPI (63bc94d)


### Landing

* **Bug Fixes:** changed image and updated styling slightly (9ddcadb)


### Landing/Data

* **Bug Fixes:** Adds environment protection video (d56ef91)


### Landing/Disclaimer

* **Features:** Changed from typography component to a button component for keyboard accessibility (2d3da13)


### Landing/Discoveries

* **Features:** removed cool discoveries (bd03a3f)


### language

* **Features:** removes language from old Applications component (e53c638)


### language; Disclaimer

* **Features:** improved disclaimer (5500c28)


### languages

* **Features:** added subject to english; added eof newline to french (32debbd)
* **Features:** Added translations for cart button and topic filter (4798389)
* **Features:** Moved environmental topic messages (ced2d54)
* **Bug Fixes:** updated two missing french translations (10a3a79)
* **Bug Fixes:** Updates to tagline + small correction in external links title (d9a0f24)
* **Code Formatting:** Removed extra ending whitespace (b183d9e)


### languages/english

* **Features:** Updated topic titles and descriptions (b73c5ab)


### languages/french

* **Features:** Add missing translations (0089130)
* **Features:** added missing French translations (5061bf8)
* **Features:** Added French link message for general limitations to methodology page (319b172)
* **Bug Fixes:** revise some French translations (7a257fd)


### legalDisclaimer

* **Features:** improves timeout logic (551a3d7)
* **Features:** adjusts indentation of list items (574fe3f)
* **Features:** fixes a bunch of small issues (6afd15a)
* **Features:** creates the visuals for the legal disclaimer (b7303aa)
* **Bug Fixes:** fixes issue where checkbox isnt reset (77525f2)
* **Bug Fixes:** adds changes that were left out of previous commit (57dbcfc)


### LegalDisclaimer

* **Features:** adds a timeout to the legal disclaimer (8faee0c)
* **Bug Fixes:** fixes padding and checkbox color (ec1a9ce)


### legalDisclaimerTimeout

* **Code Refactoring:** removes lint workaround and useeffect now returns undefined (7646760)


### LimitationsDialog

* **Features:** Changed methodology link to a button component for keyboard accessibility (fce578a)
* **Features:** moves around french data disclaimer (fd028f0)
* **Features:** refactors out scroll events to one location (badf07d)
* **Features:** methods link in dialog now changes page to methods (c52862b)
* **Features:** updates limitations dialog (9af3441)
* **Bug Fixes:** Add DOI link to citation text (4df2853)
* **Bug Fixes:** fixed line height (c151d2d)


### LimitationsDialog; english; french

* **Code Refactoring:** added language piece to common; adjusted component to (736563c)
* **Code Refactoring:** moved limitations url into common; adjusted component (2bda570)


### LimitationsDialog; theme

* **Features:** extracts blue color into theme (3b4506e)


### listPanel

* **Features:** tweaks size of expand buttons (d43f8a6)
* **Features:** changes the look of the expand all buttons (a3c1c19)
* **Features:** updates tests (2e291a6)
* **Features:** fixes broken tests by deleting spec file (6a9e81d)


### ListPanel

* **Features:** fixed test (b134c06)
* **Features:** Updated expand button to expand every result in search (0d95a94)
* **Features:** moves the download button to its most current design location (410f932)
* **Features:** renames contentIds to downloadTableIds (81c564b)
* **Features:** rearranges structure of list panel to accomadate dl button (680d171)
* **Features:** adds a button to add all tables to shelf (77b947a)
* **Bug Fixes:** removed unused import (52866ed)
* **Tests:** Fixed test due to update of the shelf/cart button (258ee76)


### ListPanel/EllipsisButton

* **Features:** Added keyboard accessibility to the button and menu items (0a96c1e)


### ListPanel/PageItem

* **Bug Fixes:** fixed aria-label for pages (a9adb46)
* **Bug Fixes:** fixed alt and aria label (6ca52c5)


### ListPanel/PaginationBar

* **Features:** Fixed pagination bar showing multiple page 1s (0d215c8)


### ListPanel/RateDataDialog

* **Features:** Added mutation for creating the rate feedback (9e11b23)


### ListPanel/RelatedTopics

* **Features:** Changed from typography component to a button component for keyboard accessibility (51ac1f9)
* **Features:** Added gender prop for no topic French message (99ed83d)


### ListPanel/SearchList

* **Features:** adds province to search list and cart item (9e82bf0)
* **Bug Fixes:** Pointed final decision URL to correct location (12e8238)


### ListPanel/spec

* **Tests:** replaces name with shortName (0213f45)


### Methods

* **Features:** updated scrolling functinality (da706b2)
* **Features:** Added back methodology update section (ad31a17)


### methodsPage

* **Features:** fixes top section with back button (a15a660)
* **Features:** updates text on methods page (453b50c)


### mock data

* **Bug Fixes:** fixes issue with mock data not lining up with query (c2a6696)


### mockData

* **Features:** updates mock data to work with new queries (00135c0)


### mocks

* **Features:** updates mocks (b41d1ff)
* **Bug Fixes:** updates mocks to add downloadTableIds (4528cd2)
* **Bug Fixes:** updates mocks to have newest api names (c9341f8)


### mocks/configuration

* **Features:** added alignment sheet content type (5d3c022)


### mocks/data

* **Features:** updated mocks to have alignment sheet counts (d3cadda)
* **Tests:** fixes missing mock data (dd3375b)


### navButtons

* **Bug Fixes:** removed spec.js (ff9d240)


### NavButtons

* **Features:** fix storybook issues (24b4a2a)
* **Features:** reorganizes NavButton Stories (810beba)
* **Features:** adds better documentation for sub components (1c2536f)
* **Features:** stubbed storybook setup (684fd96)
* **Bug Fixes:** imported NavBlock (c97248c)


### NavButtons/NavBlock

* **Features:** updated styling so it now falls in line with the rest of the paragraph (64d3772)
* **Features:** removed FullButtons and replaced with NavBLock (48465ed)
* **Code Formatting:** linting (b30aa6a)
* **Code Formatting:** removed quotes around lineHeight (99d281c)


### Notification

* **Features:** Created notification component (aa138ed)


### OSDPFooter

* **Code Formatting:** adjusted spacing on button and grid items (210cf73)
* **Code Formatting:** removed redundant css (61368ed)
* **Code Refactoring:** removed redundant label positioning (94f99ff)


### OSDPFooter; Landing; english

* **Features:** adds osdp footer component; conditionally adds to landing page (5f3356f)


### OSDPFooter; language

* **Features:** hooks up button to osdp page; adds osdp url (752af55)


### package

* **Features:** Added integer compression library (611fae7)


### package.json

* **Code Refactoring:** removes react markdown (9a7b4c8)


### package.json;package-lock.json;Cart;english;CartItem

* **Features:** virtualized body list WIP; cart id remov (1f14f04)


### pages/Data

* **Bug Fixes:** Adjust youtube video controls to match existing videos (e269726)
* **Bug Fixes:** Translation tweak on preface text youtube video (a5b8294)
* **Bug Fixes:** Update ESA diagram image (4222764)


### Pages/Landing

* **Features:** updated styling for page links (dfca051)
* **Bug Fixes:** changed variable name (f3084cf)


### pages/Methods

* **Bug Fixes:** Add VEC paragraph to methods page (477c795)
* **Bug Fixes:** Move IK knowledge blurb to methods page (5303397)


### pages/Project

* **Features:** updated open gov link for french (568da9d)
* **Features:** added sentence to Why we created BERDI (b0eecba)


### Pages/Search

* **Features:** fixed small details for search renovation. (9f3ea55)
* **Features:** moved search filters (cb1828a)
* **Features:** move filters into search panel (a774033)
* **Features:** general restyling of search page (89b7c37)
* **Bug Fixes:** fixed small issues with scrolling, reducer and button. (3d4b5a2)
* **Bug Fixes:** fixed styling issues and restructured. (c6fb211)
* **Bug Fixes:** removed unused code. (8cf69d1)


### pdf.js

* **Project Maintenance:** Removed the PDF.js submodule from the linter (7340245)


### PDFPreviewer

* **Features:** fixed pdf page and alignment params (4057b4d)
* **Bug Fixes:** lint fix (multiple material-ui/core imports) (5314a59)


### Project

* **Features:** added subject to anchor tag's href (8e3924c)
* **Code Formatting:** removed unused class (489e9ea)


### project page

* **Code Refactoring:** moves files around and cleans up code (cb5a4a1)


### projectPage

* **Features:** fixes tests, adds hr to project page, adds translations (54c57b7)
* **Features:** updates projectPage to better reflect design (e872cb7)
* **Code Refactoring:** swaps some colors for theme colors (9fd6f29)


### queries

* **Features:** adds fields to cart items query for viewing project info (d75953c)
* **Features:** adds tableCount and figureCount (c3e7b8c)
* **Features:** adds application shortName to SEARCH (8147e29)
* **Features:** added alignment sheet count to search query (2e16ddf)
* **Features:** removed pdfPageCount from queries (294abbb)
* **Features:** updates some field names (2aefde0)
* **Code Formatting:** fixed tabbing (4d134da)


### queries; hooks/useCartData

* **Features:** new query to get cart items; new hook to use query (58ef2a7)


### queries; hooks/useDownloadSize

* **Code Refactoring:** renamed query to make more sense (7432753)


### rateData

* **Features:** provides most of the rate the data dialog (a56734a)


### rateDataDialog

* **Features:** fixes some padding issues (45c674d)
* **Features:** updates logic and simplifies (21721e8)
* **Bug Fixes:** combines two svgs into one and fixes padding (03d413d)
* **Code Formatting:** cleans up some messy parts (a23b5f8)


### RateDataDialog

* **Features:** cleans up code and makes small improvements (f931bcc)


### readme

* **Documentation:** Added project information (01843ae)
* **Documentation:** Fixed numbering (ec4d877)


### reducer

* **Bug Fixes:** resetting current page when the result count changes (fb7a323)


### reducer; TreeMap

* **Features:** makes tiles single color; adds added/removed cases for appIds in reducer; ho (eb47599)


### relatedTopics

* **Features:** gives table data better key names (bd55864)
* **Features:** changes layout of related topics to a table (3f6ee93)
* **Features:** updates column layout for related topics (4312f57)
* **Features:** fixes some padding issues; improves logic (8d2a089)
* **Features:** implements dot rating system (b39b72f)
* **Features:** restructure private relatedtopicsdialog comp (d25ab3d)
* **Features:** adds filter functionality (cd4882f)
* **Features:** cleans up code and improves popup styles (2b344e8)
* **Features:** sets up scaffolding for related topics popup (1f520d9)
* **Bug Fixes:** fixes cosmetic issues (5c1fd01)
* **Bug Fixes:** addresses small bugs as mentioned in PR (80377ec)
* **Bug Fixes:** fixes issue with keys in map (8727b60)


### reportDataDialog

* **Features:** removes ability to report the same data twice in one session (54f82b1)
* **Features:** adds in a thank you page on the dialog (a79a049)
* **Features:** styles the component the rest of the way (61833f0)
* **Bug Fixes:** fixes numerous minor issues (dce77ef)
* **Code Refactoring:** refactors component to be more DRY (a5219bb)


### resultDialog

* **Features:** updates story to have application name (68dfc83)


### ResultDialog

* **Features:** added external links to the bottom of the dialog (022114a)
* **Features:** renamed title for ResultDialog (8101818)
* **Features:** Added cart button (d378306)
* **Features:** slightly increased animation time (> default time) (ed895f9)
* **Features:** new rendering logic for final decision urls (not applicable, pending, and url) (28b2f4a)
* **Features:** using function to condense table code (e9c356b)
* **Features:** added slide transition when ResultDialog is opened/closed (ade9aa6)
* **Features:** adjusted download button width to better reflect design (e057a22)
* **Features:** revamped data labels and component props (1b3f118)
* **Features:** using useArgs hook to open component in story; removed other stories (4e3e5f6)
* **Features:** added stories for ResultDialog (8c609d4)
* **Features:** removed onClose functionality on handleViewClick (1a9324b)
* **Features:** added pageMode=thumbs to viewer (a53af57)
* **Features:** refactored structure of dialog to reflect design and also be reactive (3f0a2e4)
* **Features:** adjusted footer spacing and format; adjusted placeholder text (8092856)
* **Features:** added more props and fixed pdf link display text (a1e5802)
* **Features:** fixed download button to be spaced + formatted properly (faf65a2)
* **Features:** removed more unused jsx and css; styling download button (b58b829)
* **Features:** small fixes; fixed content links to be properly formatted (5240b85)
* **Features:** cleaned up spacing; closer to design target (ab32e4d)
* **Features:** removed disclaimer css class in styles (6562d45)
* **Features:** added background color to pdf area (392ec15)
* **Features:** removed disclaimer message in header; adjusted spacing (87f14bc)
* **Bug Fixes:** fixed styling changes and removed unused variables (3128232)
* **Bug Fixes:** fixed tests (52c18ed)
* **Tests:** Added test for cart button and fixed existing tests (d915d68)
* **Tests:** now testing for correct pdf url and page (c0f6678)
* **Tests:** added loading indicator test (fcb6021)
* **Tests:** compressed some tests; finished finalDecisionURL test (484dddc)
* **Tests:** wIP finalDecisionURL test (992fc17)
* **Tests:** added component visibility test when not opened (88ccb27)
* **Tests:** removed data-testid on download button; revamped test (21fb672)
* **Tests:** made data test more sophisticated; checking for href attributes (ccf89c8)
* **Tests:** fixed test to use getByRole; removed data-testid from ResultDialog (a92e0a5)
* **Code Formatting:** formatting (6f68c45)
* **Code Refactoring:** removed alt on anchor element function (8a68c1a)
* **Code Refactoring:** removed function + put final decision rendering code in return (4e61c05)
* **Code Refactoring:** removed now unused sections of ResultDialog (8fc26fa)
* **Code Refactoring:** removed redundant styling (32d1bdd)
* **Code Refactoring:** removed setting direction on grid that was already default (c861fe4)
* **Code Refactoring:** removed use of forwardRef for animation (d94e367)
* **Code Refactoring:** simplified storybook update code (080144c)
* **Code Refactoring:** small cleanup (2b395f7)
* **Code Refactoring:** small cleanup (9bd8b51)


### ResultDialog; english; french

* **Features:** introducing Typography tags; more style restructuring (e8c0ee4)
* **Features:** removed more unneeded text (e5bde2c)


### ResultDialog; english.json

* **Features:** added rendering logic for final decision url states; small fixes (2c3a9a3)


### ResultDialog; english.json; french.json

* **Features:** added LoadingIndicator to preview; added load failure (57e8327)


### ResultDialog; english/french.json; queries

* **Code Refactoring:** implemented fixes + changes as per PR suggesti (41ce12c)


### ResultDialog; LoadingIndicator

* **Tests:** removed LoadingIndicator data-testid; fixed test to use getByR (f941ef9)
* **Tests:** added tests for ResultDialog; small changes (73ad82d)


### ResultDialog; queries

* **Features:** added application and finalDecision URLs to queries; updated ResultDial (ae6f96f)


### ResultDialog/index; ResultDialog/PDFPreviewer

* **Features:** wIP previewer component; setting style (ca874c0)
* **Features:** adds WIP PDFPreviewer subcomponent of ResultDia (fd80e9d)


### ResultDialog/PDFPreviewer

* **Features:** Updated the PDF viewer to use the PDF.js viewer (bc139e4)
* **Features:** Prevented reload of PDF in viewer on Chrome (f02ffae)
* **Features:** completed styling of failed to load (9d6fb3b)
* **Features:** rendering pdf load failure image (850535a)
* **Features:** added default vertical fit to pdf view (ab9df67)
* **Bug Fixes:** now using useRef and useEffect hooks; passing ref to <object> to fix (f143b67)
* **Code Refactoring:** changed failed to load alt text (e108c00)
* **Code Refactoring:** improved alt on failed to load icon (af37b38)
* **Code Refactoring:** removed unused parameter on <object> (210e51b)


### ResultDialog/PDFPreviewer; ResultDialog/spec

* **Tests:** fixed ResultDialog tests (563c337)


### ResultDialog/spec; ResultDialog/stories

* **Bug Fixes:** fixes tests and storybook for ResultDialog (17d84a8)


### resultsDialog

* **Features:** fine tunes some sizing issues and data issues (28a9065)


### search

* **Features:** moves and updates download all data button (923f041)


### Search

* **Features:** added "About BERDI" button (cab94c4)
* **Features:** removes Applications component from Search; spacing fixes (23519a5)
* **Features:** adds osdp footer to search with temp conditional (a9e171a)
* **Bug Fixes:** fixed some smaller issues related to comments on the PR (1495620)


### SearchActionResults

* **Features:** updated line spacing (fbe07e0)
* **Features:** fixed nesting and styling of SearchActionResult elements (bce6114)
* **Features:** updated styling for SearchActionResults (77da6f8)
* **Features:** removed Rate this Data (1dce043)
* **Features:** broke out search action result controls to a separate component. (86f89a5)
* **Bug Fixes:** fixed small code changes and updated styling (eaf71b3)
* **Bug Fixes:** fixed linting (2bbd49f)
* **Bug Fixes:** fixed linting (be1222d)
* **Bug Fixes:** updated SearchActionResults (62e6b02)
* **Code Formatting:** removed unused fontSize change (8395505)


### SearchBar

* **Features:** fixes cursor point location (f5f788a)
* **Features:** completes style of search help text (756a78b)
* **Features:** rounded SearchBar corners (b62031f)
* **Bug Fixes:** fixes search bar and button spacing on different browsers (40fd6ae)


### SearchBar; english

* **Features:** WIP search help (d4f8a0f)


### SearchBar; SearchHelpDialog

* **Features:** adds searchHelpDialog subcomponent (61cdf1b)
* **Code Refactoring:** cleans up styling code (713c01c)


### searchDetails

* **Features:** adds a check for loading before showing counts (590027e)
* **Features:** moves counts from treemap to searchDetails (3ce0159)
* **Bug Fixes:** fixes incorrect translation format (465af0f)
* **Tests:** fixes broken test by removing check for loading (c13c54c)
* **Code Refactoring:** refactors searchDetails to improve code quality (43f02d5)


### SearchDetails

* **Features:** moved search details and changed explore results (c38d01d)
* **Features:** counting sum of selected applications from tree map (5788513)
* **Features:** Created filter toggle (1f71d60)


### SearchDetails; english

* **Features:** added alignment sheets count to english label (038084a)


### SearchHelpDialog; french

* **Features:** added SearchHelpDialog fr translations; added special french disclai (24b6f68)


### searchlist

* **Features:** implements many of the new design changes for searchlist (1263651)


### searchList

* **Features:** removes unneeded string cast (9166582)
* **Features:** fixes issue with date and translations (57c50e9)
* **Features:** checks the filing date and determines act name (0186716)
* **Features:** attempts to separate this branch from another (e2bf386)
* **Features:** sets the anchor tags to open in new tab (6bb662d)
* **Features:** mocks thumbnail image url for cart and searchresults (24e4c17)
* **Features:** fixes style of relatedTopics (9819ba4)
* **Features:** breaks out items into their own components (fc89fbc)
* **Features:** breaks out title into its own component (610eaec)
* **Features:** applys suggestions from code reviews (b5de306)
* **Features:** updates french translations (91aba12)
* **Features:** converts details grid to table (888b005)
* **Features:** removes unused code (f76d086)
* **Features:** updates expand all buttons styles (502b9b5)
* **Features:** adds in project links (64db47f)
* **Features:** fixes alignment and translation issues (0517985)
* **Features:** applies code review suggestions (403dc6b)
* **Features:** cleans up code and adds visual tweaks (da12d12)
* **Features:** adds expand all collapse all (2e333ce)
* **Features:** attempts to make test suites work (c2394e8)
* **Features:** updates the sizing of the search list (8832f4b)
* **Bug Fixes:** updates project types labels and logic around it (939eeeb)
* **Bug Fixes:** fixes test suite (8679405)
* **Tests:** adds tests (2218387)
* **Code Refactoring:** removed unused image (4f543bf)


### SearchList

* **Features:** added provinces to details (c863681)
* **Features:** reintroduces reportProject on project click (bf8aa90)
* **Features:** implements ApplicationDialog component and project button (ba9b28f)
* **Features:** changed project name to use short name (afced6f)
* **Features:** sets up new design items (ba44335)
* **Code Formatting:** fixes button contents spacing (04d5551)
* **Code Formatting:** reintroduces className for button to fully fix spacing (89b57dc)
* **Code Refactoring:** fully removes Grid surrounding project button (648a265)
* **Code Refactoring:** removes key from button (b1d40c3)


### SearchList/styles; theme

* **Features:** extracted grey color to themes file (19f4e25)


### SearchPanel

* **Features:** moved first row of filters and search button into view more toggle. (b70c31c)
* **Features:** scrolls to search results (d6076bb)
* **Features:** Updated search panel styles (fced293)
* **Features:** removes unused style for background (ebf75b6)
* **Features:** updates color of gradient (42a8b0d)
* **Features:** removes owl background and adds gradient (5a85f10)
* **Features:** Added GTM event for search help (d6ec710)
* **Bug Fixes:** fixed linting (4938811)
* **Bug Fixes:** removed unused styles (911a82e)
* **Bug Fixes:** readded height css (is needed for vertical divider) (76c190a)
* **Code Formatting:** removed redundant css (5768a94)
* **Code Refactoring:** changed height css to minHeight (c96ecdf)


### SearchPanel; language

* **Features:** removed searchLabel language (35d138d)


### SearchPanel; SearchBar; InlineLogo

* **Features:** new subcomponent InlineLogo; revamped search bar when filt (83bf7e4)


### SearchPanel; TitleCard; Landing

* **Features:** conditionally rendering SearchPanel with TitleCard (45efb3c)


### SearchPanel/FilterPanel

* **Bug Fixes:** renamed hasTagline prop (6e8181e)
* **Bug Fixes:** fixed linting (de085f6)
* **Bug Fixes:** added back in reporting for filter (8d9a87a)


### SearchPanel/SearchBar

* **Features:** Move search input and button into a bar container so they'll line up (cfe43d6)
* **Features:** moved search help (2df9efe)
* **Features:** Changed from typography component to a button component for keyboard accessibility (a6bcae2)
* **Features:** Remove preventing of bubbling of enter key from being inside a form element in the ASP.NET template (6eeaac5)


### SearchPanel/SearchHelpDialog

* **Features:** removed extra lines in search help dialog (7bb1d81)


### searchResultsCounts

* **Code Refactoring:** cleans up logic and improves code quality (8012283)


### SelectHelpText

* **Bug Fixes:** added SelectHelpText for components in TreeMapPanel and TopicsFilter (99c2f92)


### serachList

* **Features:** adds expanded view (b94a2ba)


### ShareCard

* **Bug Fixes:** fixed snackbar staying open after sharecard is closed and reopened (44fca75)
* **Bug Fixes:** fixed Cart copy success state (d7fd8be)
* **Code Formatting:** small cleanup (c2f7933)
* **Code Refactoring:** changed ShareCard to conditionally render instead of using css (a05bf30)
* **Code Refactoring:** small fixes + adjustments (c6a77e8)


### src/images/pdfFailLoad.svg

* **Features:** added pdf load failure svg (b613dc6)


### Standards/code

* **Documentation:** Noted lint ignore priority (fff0e56)


### storybook

* **Features:** Added mocked API translations to the Storybook Intl add on (66cfccc)
* **Features:** addresses comments in PR (d804ea5)
* **Features:** improves code consistancy (ef17352)
* **Features:** updates testing docs and fixes linting bug (c5dd5a1)
* **Features:** updates docs and utils fns (e7e94c6)
* **Features:** updates stories to use new util fn (a5d56d7)
* **Features:** changes storybook utils to compensate for new storybook syntax (a3e9f8c)
* **Features:** enables docs addon (f6c5c9a)
* **Features:** draft of deprecation update (d03d4bc)
* **Features:** updates storybook addons (a8ae1a3)
* **Features:** updates version of storybook (d6a878a)
* **Features:** updates storybook version (7947c5b)
* **Bug Fixes:** fixes snapshot tests (b21d7ec)
* **Bug Fixes:** fixes package lock (6cd08bd)
* **Tests:** Removed unneeded reference to override and mock GraphQL for snapshots (695750e)


### storybook docs

* **Features:** updates storybook docs (628a76e)


### storybook/addon-config-and-gql

* **Project Maintenance:** Updated config and GraphQL decorator to use the mocked GraphQL results (7b05b71)


### styles

* **Features:** Move disabled opacity to shared theme variable (0e7db43)
* **Features:** Set root font size since the app has been moved outside of a form element (3e47618)


### SvgButton

* **Features:** removed info icon and updated notification text (b39557e)
* **Features:** Added notification option to SVG buttons (bf9b5ec)
* **Features:** Added keyboard accessibility style (ff264b7)
* **Features:** Changed pulse property to be a single initial pulse animation on render (e2bd60e)
* **Features:** Updated topic button labels to use webkit line clamp to handle text overflow (8e85a75)
* **Features:** Added tooltip delays for topic buttons (76555d8)
* **Features:** Added additional score scale (94ab41a)
* **Features:** Added pulse animation and blob required refs and events (fc7ef09)
* **Features:** Removed keywords from application (330218b)


### SvgButton/Label

* **Bug Fixes:** Increased width to fit names (1519729)
* **Bug Fixes:** Resolves an issue where words were being chopped with no ellipses if they are too long (6fff504)


### Test

* **Bug Fixes:** fixed test for search (5230101)


### Testing

* **Documentation:** updated testing to include information about testing with nested components (bec5b8c)


### Testing/Process

* **Documentation:** Fixed grammar (662f159)


### tests

* **Features:** Testing setup and configuration for rendering entire app (05821cd)


### theme

* **Bug Fixes:** updates names of greys (b3cd307)
* **Code Formatting:** renamed imperialBlue to tealBlue (b022237)


### theme; Disclaimer; Discoveries

* **Features:** restyled disclaimer button; added color to theme (ba45d08)


### ThumbnailButton

* **Bug Fixes:** Changed aria prop type to string from function (98abc70)


### thumbnailUrl

* **Features:** centers thumbnail images (c2f880c)


### TitleCard

* **Features:** updated french text for tagline (c33171b)
* **Features:** Add information page link to tagline (131f3ae)


### Tooltip; TreeMap

* **Features:** added alignment sheet count to tree map tooltip (365deb7)


### TopicFilter

* **Features:** added IK notification to wetlands, water, fish and plant (f10dad6)


### topicsFilter

* **Features:** updates topics filter icons (4499860)
* **Bug Fixes:** updates image for wetlands (d580996)


### TopicsFilter

* **Features:** moved text styling to theme (03b9946)
* **Features:** Added IK notification for "Indigenous land use" and "Treaty and Indigenous Rights" (48272b9)
* **Features:** Updated GTM events to be differentiated between on and off states (092ef1a)
* **Features:** Shortened pulse wait time (e6b08f8)
* **Features:** Added random interval to trigger pulse animations one by one (941d3de)
* **Features:** Rearranged topic grid items (6ef4c8c)
* **Features:** Hooked topic filter button scores to data (6ef223e)
* **Features:** Scrolled the topics filter into view when entering from the landing page (911f8ea)
* **Features:** Created filter with grid of topic buttons (7c2b628)
* **Features:** Created blob subcomponents (836f97c)


### translations

* **Features:** adds missing french translations for search details (397c375)
* **Features:** adds french translations for add all content button (a5f97a2)
* **Features:** makes some small improvements to the translation documentation (45906ad)
* **Features:** groups all api translations under new api group (72282f4)
* **Bug Fixes:** Correct incorrect urls to www.cer-rec.gc.ca (32b2d47)
* **Bug Fixes:** Change BERDI to CIBER acronym on methods page (0fd73f3)
* **Bug Fixes:** Update IK notice heading (7960ca5)
* **Bug Fixes:** Adjust topics environmental string for french (bbc02aa)
* **Bug Fixes:** changes ESA to BERDI/CIBER (25cb0c5)
* **Code Formatting:** fixed a indentation issue (71ae418)
* **Code Formatting:** fixes whitespace issue (42d93d8)


### treeMap

* **Features:** makes the treemap nodes round (fbc9f96)
* **Features:** updates treemap so that when a node is clicked, it changes color (0fbdd73)


### TreeMap

* **Features:** rounds treemap nodes (72ea139)
* **Code Refactoring:** changes treemap node selector from *= to ^= (993c2d1)


### TreeMap; TreeNode; english; french

* **Features:** added alignment sheet count to tree nodes (726c3bc)


### treeMapPanel

* **Code Refactoring:** improves logic for getColor function (90fa0bd)


### TreeMapPanel

* **Features:** Added keyboard accessibility and a timer to reduce the number of onClick callbacks (828a835)


### TreeMapPanel/TreeMap

* **Bug Fixes:** Added alignment sheets counts into the node size calculations (96404c2)


### useAPI

* **Code Refactoring:** simplified bg angle retrieval (d6ff372)


### useConfig

* **Features:** added resultCount to parameters (34ebb9e)


### useESAData

* **Features:** removes stub and pulls in real thumbnails (8b400d1)


### utilities/analytics

* **Features:** Added analytic event functions for new features (8a9cd86)


### ViewMoreDetailsButton

* **Features:** Changed from button base component to a button component for keyboard accessibility (34ad11b)
* **Features:** Removed GTM event call when collapsing (887887f)
* **Bug Fixes:** Add alt text to up/down caret buttons + centeralize translations under common (803298c)
* **Code Refactoring:** extracted ViewMoreDetailsButton into its own component (43d9cf2)


* **Features:** Add search button back to search bar (2203145)
* **Features:** Removed application ID encoding in URL state as it will be a string from now on (d3a02d8)
* **Features:** Add indigenous knowledge notification to search results (6b24b30)
* **Features:** Updated methods page messages (32d7b0c)
* **Features:** Added updated date to tagline (feadc73)
* **Features:** Updated keyboard accessibility styles for the base Material UI components and turned off elevation by default for buttons (7426ba8)
* **Features:** Added keyboard accessibility styles for IconCheckbox, ImageButton, and LegalDisclaimer's enter button (c848068)
* **Features:** Updated the translations messagse in the project page (11e8b38)
* **Features:** Set the discovery cards to use the new image button type prop (171612e)
* **Features:** Updated French search result count plurals and general limitations usage messages (7bd46e1)
* **Features:** Added and fixed translations (ab2bbb8)
* **Features:** Capitalized berdi and ciber interface references (b0ea4ae)
* **Features:** Removed treemap application ID config state (32c94c5)
* **Features:** Updated search query to take new IDs field and removed total count (d7668c4)
* **Features:** Updated components to execute new analytic events (57f49f1)
* **Features:** removed Accreditations component (4519a64)
* **Features:** renamed / extracted ToolLogo component (03b2551)
* **Features:** added ExploreHeader; finishing touches (7e424e0)
* **Features:** implemented owlBanner image; small adjustments (3f643e2)
* **Features:** removed ExploreButton (dfb2edc)
* **Features:** replaced berdi and ciber logos (0387ba5)
* **Features:** search bar restyling WIP (856d1ae)
* **Features:** removed BetaAlert component and all instances of it (63b8d9a)
* **Features:** Update gas topic icon (4a112b3)
* **Features:** Added topic filter and filter toggle to the search page (c88bd19)
* **Features:** Added topic filter to the landing page (c2dc5b8)
* **Features:** Added topic message and refactored project message (d73e96c)
* **Features:** Added topic icons (d387a4b)
* **Features:** Added global def for SVG gradient (35e9dac)
* **Features:** Removed keywords from application (751b106)
* **Features:** Added React testing libraries (9b8b402)
* **Features:** Removed mocking functionality from the config context provider (fe2bd5c)
* **Tests:** Updated tests and mock data for application ID change to an integer (7bfa54c)
* **Tests:** Updated the application tests to account for the new filter position (9654596)
* **Tests:** Updated app tests to reflect removal of treemap application IDs state (e0ec1ad)
* **Tests:** Updated mocked result to remove total count and included IDs (4ee188a)
* **Tests:** Added mocks for updated discovery query items (ba796a1)
* **Tests:** Added mocks for value component for query update (966b763)
* **Tests:** Fixed tests and added legal disclaimer state tests (74c321d)
* **Tests:** Mocked history so there's a single instance available to be manipulated in tests (2a47fcc)
* **Tests:** Increase jest timeout for tests (0e71df1)
* **Tests:** Fixed tests since filter toggle hides the tree map by default (50bdb5c)
* **Tests:** Remapped image files to a data URL image for Jest tests (146f424)
* **Tests:** Mocked configuration query data (38c65c0)
* **Tests:** Added a test for NavButtons (afb6229)
* **Tests:** Removed error boundary's mocked child error from test console (4ae53b1)
* **Tests:** Updated Enzyme tests to React Testing Library format (6afba4c)
* **Tests:** Updated test setup for React Testing Library (69ef349)
* **Tests:** Added application provider wrappers to the React Testing Library renderer (eee29b8)
* **Code Formatting:** Added jQuery to the linter environment since the application is deployed within WET (8a00bc8)
* **Code Formatting:** Fixed linting (644f506)
* **Code Formatting:** Updated filter panel border to flow into the search panel (2fd77a0)
* **Code Formatting:** Updated local development WET template styles (73de1f6)
* **Code Refactoring:** Cleaned up code from PR suggestions (bc71ff8)
* **Code Refactoring:** Fixed spelling error (a0f517f)
* **Code Refactoring:** implemented fixes from PR (e37f801)
* **Code Refactoring:** Moved notification colors into theme (5e5fa5a)
* **Code Refactoring:** Moved out a page item component from PaginationBar (e1d7780)
* **Code Refactoring:** Moved out a thumbnail component from CartItem and SearchList, also moved TitleSection to a private component (3454ed7)
* **Code Refactoring:** Moved out mock config component for use in testing (fabe6c2)
* **Code Refactoring:** Removed temporary file (647320b)
* **Code Refactoring:** Updated components and React Intl messages to reference the change to the single search term in config (9a5ab74)
* **Code Refactoring:** Updated male and female variable names for gendered languages (43bc809)
* **Code Refactoring:** Updated SVG button styling for dots rating to avoid external component references (66ceb77)
* **Documentation:** Added note regarding the config and GraphQL decorator for stories (f342954)
* **Documentation:** Updated docs with recently mentioned conventions (78acd87)
* **Documentation:** Updated documentation for new testing library setup (c089281)
* **Project Maintenance:** Added double CSS reference to simulate WET template (c6116ac)
* **Project Maintenance:** Added mocking of the config state to the config and GraphQL decorator (411b9ba)
* **Project Maintenance:** Added project codename (b3bcf95)
* **Project Maintenance:** Added translation for topics filter notification (d656a11)
* **Project Maintenance:** Exposed the built PDF.js files in the development mock server (04812d1)
* **Project Maintenance:** Move WET template style sheets to the beginning for smoother loads and removed redundant style sheet reference (fe58cff)
* **Project Maintenance:** Skips over rendering of dialogs for snapshots (c2376dc)
* **Project Maintenance:** Updated jest library (112ed32)
* **Project Maintenance:** Updated storybook setup functions (bc556e7)
* **Project Maintenance:** Updated WET Toolkit scripts and added files for the WET video component (62c82ed)


### webpack

* **Bug Fixes:** removes unneeded code (1bd0ec0)


### YouTube

* **Bug Fixes:** Adapt to use jQuery global for video initialization + WEP toolkit (7a626e5)

## [1.0.1](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v1.0.1) (2021-06-18)


### date slider

* **Features:** adds in dates above slider (0fb0b28)


### datepicker

* **Features:** changes the logic of the date slider to calculate difference in months (d46bcff)


### Dropdown/index

* **Features:** updated Dropdown logic to display text on no selection (3ab52b1)


### english

* **Code Formatting:** removes unused translation (d8f1214)


### FilterChipsPanel

* **Features:** completed styling of chips; further fleshed out component (6d94549)
* **Features:** added FilterChipsPanel stories.jsx and readme file for storybook (3b5d2bd)


### FilterChipsPanel/index

* **Features:** removed unused variable and console log in onClick stub (4d08dad)
* **Code Formatting:** changed 0em -> 0 in FilterChipsPanel style as per style guide (bac40ca)


### FilterChipsPanel/README

* **Features:** updated interaction requirements in storybook readme (167f64d)


### french.json

* **Features:** updated french translations for no search results statements (25f1867)
* **Features:** added new no search results messages for date filters and fixed typo (6525d1c)
* **Features:** added 2/4 of the new search statements (54f6227)
* **Features:** adds new search result feedback entries to french.json, some of which have placeh (3bc3428)
* **Bug Fixes:** fixed french translation for no results for keyword message (404a050)
* **Bug Fixes:** updated hyperlink (f956270)
* **Bug Fixes:** updated hyperlink (32d2d0e)


### LimitationDialog

* **Features:** replaces hard coded values with values from backend (76acdf5)


### limitationsDialog

* **Features:** changes units from KB to MB depending on file size (f4c65dd)


* **Documentation:** Updated architecture and GraphQL docs (4fb6822)
* **Documentation:** Updated language used to remove redundancy (59707c5)
* **Project Maintenance:** Added application URL to preview load messages (168fded)
* **Project Maintenance:** Made examples in Commitizen generic (c43e2e6)
* **Project Maintenance:** Updated project documentation to account for React hook usage and removed Conditions project references (3edb55a)


### applicationDialog

* **Features:** applies consistant style to buttons on the dialogs (b4e98fd)


### datePicker

* **Code Formatting:** removes commeny (911a089)


### dateSlider

* **Features:** applies improvement suggestions (d801e46)
* **Features:** sets dates to be on the first of the month (76add27)
* **Bug Fixes:** checks for null instead of falsey when sending the date to the reducer (1565415)


### english.json

* **Features:** adds new search result feedback entries to english.json (1122319)
* **Bug Fixes:** added commas to english no search results messages (fe7b492)
* **Bug Fixes:** updated hyperlink (118a853)


### english.json, frech.json, Dropdown/index

* **Bug Fixes:** updated language key: none -> select; updated code (d16d9c9)


### english.json, french.json

* **Features:** added new "none" entry to dropdown language object (7c1a3fa)


### ImageButton/index

* **Bug Fixes:** changed blur value on boxShadow back, so shadow is soft again (143b26e)


### NoResultsStatusMessages/index

* **Features:** added new component to handle displaying no-results status mess (4c45b7d)


### pages/Search

* **Features:** moved FilterChipsPanel down below the Applications component (e787a3b)


### pages/Search; components/FilterChipsPanel

* **Features:** added rudimentary FilterChipsPanel component and up (70777c1)


### readme

* **Documentation:** Added a .env example and note (a32addf)


### reducer

* **Features:** renames searched cleared to removed (53c5571)


### resultDialog

* **Bug Fixes:** fixes alignment of button section (75a69a0)


### smallButtons

* **Features:** adds code to clear filters when back button is clicked (3959bb2)
* **Bug Fixes:** fixes an issue where the button was calling the wrong reducer fn (5366da6)


### TreeMapPanel

* **Features:** fixed indentation (bf5ad0e)


### TreeMapPanel/index

* **Features:** slimmed down TreeMapPanel component code now that it is using NoResultsSta (88c4e8b)
* **Features:** refactored rendering logic to show different search messages (440c2bb)

# [1.0.0](http://neb-esa-devdoc.s3-website.us-west-2.amazonaws.com/v1.0.0) (2021-04-30)


* **Features:** Updated logos (85ff8e3)
* **Features:** Lower cased applciation name (e63ba83)
* **Features:** Updated application name (c28222a)
* **Features:** Updated slider styles (6747964)
* **Features:** Reset search page on treemap filter change (e1ad36d)
* **Features:** Updated old url paths to new brand (35dd2ce)
* **Features:** Added new translations for treemap filter and reorganized exisiting treemap translations (5e92da2)
* **Features:** Fixed clearing of treemap filters on load (856db22)
* **Features:** Updated treemap node click GTM event (dbf483b)
* **Features:** Removed the treemap filters with no data on search update (6569f8a)
* **Features:** Added the view project details block (eba961a)
* **Features:** Updated query for search results to also include the tree map filter (9981ff5)
* **Features:** Connected the tree map component to the new tree map application filter IDs (8b2599e)
* **Features:** Added treemap filter IDs to the reducer (6cc3f11)
* **Features:** Removed hover and visited color style overrides for external links (0285c01)
* **Features:** Connected discovery cards to query content data (6f319fd)
* **Features:** Updated discovery content and images (144ee3f)
* **Features:** Added queries for discovery content (7c73c1a)
* **Features:** Added data notice for tables missing downloads (a43d3d0)
* **Features:** Moved accuracy component translation to common section (aab1f25)
* **Features:** Updated project view GTM event (1b2d04a)
* **Features:** Updated filters to use the application ID and label from the API hook (aea5998)
* **Features:** Updated configuration with application ID references (23b513f)
* **Features:** Updated queries with application ID references (d97a869)
* **Features:** Updated discovery card shadow and tag style (99c8486)
* **Features:** Added scrolling of learning block into view if the fragment is set (2f66947)
* **Features:** Parsed and added fragment to the application URL (e563d44)
* **Features:** Added URL fragment state to configuration (ee278ca)
* **Features:** Added content type filter drop down (9983bc1)
* **Features:** Updated search query with content type filter (55adf02)
* **Features:** Added content type filter state to the config (d115009)
* **Features:** Removed sort of content types (012f36e)
* **Features:** Removed auto focus for dropdown menus to keep the default scroll position at the top (9db443f)
* **Features:** Updated search, treemap, and result analytic event parameters (4959d85)
* **Features:** Added new view and download analytic events for popups (26f78a0)
* **Features:** Updated analytic event for filters (dd2dd81)
* **Features:** Added new analytic events for disclaimer popup and discovery cards (a2c4002)
* **Features:** Updated and added new analytic events (967a417)
* **Features:** Added rendering of unsupported warning and restoration from errors as fallbacks (5f24ade)
* **Features:** Added error boundary component to catch errors (99a3934)
* **Features:** Added all option for drop downs (208a2fc)
* **Features:** Added GTM events to navigation buttons (c4987fb)
* **Features:** Added search result dialog popup for discovery cards (e0fec92)
* **Features:** Fixed up some styling for components on the search page (d1f3a08)
* **Features:** Added accuracy alert component for search page alert (f161c02)
* **Features:** Fixed up limitations dialog styling (1fef540)
* **Features:** Added GTM events (39ae290)
* **Features:** Updated link in beta component and added the GTM event (57978a1)
* **Features:** Created helper functions for sending GTM events (d2ff937)
* **Features:** Added tooltip for project type (7d517a2)
* **Features:** Updated drop down sort order and added translations for dropdowns (4b172f3)
* **Features:** Styled date picker to be similar to drop down menus (d762638)
* **Features:** Styled drop down selects (eea9ae1)
* **Features:** Created checkbox component (7402bb3)
* **Features:** Added project filter and reset filters button (e3c4cba)
* **Features:** Updated translations for filters (fb34fcf)
* **Features:** Added toggle events for search panel to show and hide the filter panel (88645da)
* **Features:** Removed unneeded attribute (92e179b)
* **Features:** Updated styling for buttons (b081dbc)
* **Features:** Added the limitations dialog to the disclaimer on the landing page (d073a1b)
* **Features:** Created the limitations dialog component (e74bfc2)
* **Features:** Corrected line height override (54c62ea)
* **Features:** Added loading for back navigation (c128ed4)
* **Features:** Moved text button styles into disclaimer (93404c8)
* **Features:** Fixed search index state and moved outlined button styles into content button (f6df0f9)
* **Features:** Added discoveries to landing page (ff99fd8)
* **Features:** Added image button component (48d814e)
* **Features:** Added disclaimer block to landing page (957dd43)
* **Features:** Added landing page (c18e989)
* **Features:** Added content button component (5af44bf)
* **Features:** Added beta alert component (17665fd)
* **Features:** Added counts to keyword buttons (3a969b0)
* **Features:** Updated keyword translations with ones from the API (6bd1c4c)
* **Features:** Added keywords configuration query (04c795d)
* **Features:** Updated search page to show the search panel filter (9d1987c)
* **Features:** Added filter and landing page modes to search panel (875bc5a)
* **Features:** Created search keyword buttons (497a5c9)
* **Features:** Created SVG button component (91009a9)
* **Features:** Styled search panel to design (1812385)
* **Features:** Extracted search panel out into it's own component (bce4f5a)
* **Features:** Updating translations for search (a82fb05)
* **Features:** Removed old fonts, styles and added WET template style overrides (ee9b065)
* **Features:** Fixed date picker not popping up (0514a99)
* **Features:** Added language parameter for GraphQL queries (167b56f)
* **Features:** Fixed linting issues (ccc481e)
* **Features:** Updated search results table to display content data and connected it to the query (fe6eb42)
* **Features:** Added search button and connected search to config and dispatch the required actions and payloads to update the config (6b65382)
* **Features:** Fixed drop down prop warnings (00d43a7)
* **Features:** Connected filters to config and dispatch the required actions and payloads to update the config (0c8607d)
* **Features:** Added onChange and value props to drop down (1c4480a)
* **Features:** Updated date picker to be a month range picker and added onChange prop (213452b)
* **Features:** Implemented reducer logic for actions and added validation of enum lists (86ada28)
* **Features:** Added config variables to query parameters and formatted them accordingly (40e5f12)
* **Features:** Added query variables to data hook (0636275)
* **Features:** Update search query with variables (84e22ad)
* **Features:** Added search result count constant and remove left over Energy Future constants (12a3f07)
* **Features:** Added compression library for encoded URL parameters (3557a80)
* **Bug Fixes:** Stop the propagation of the key event for searches (5c02222)
* **Bug Fixes:** Stopped duplicate URLs from populating the history (012614d)
* **Bug Fixes:** Corrected see more message ID (98135bd)
* **Tests:** Removed test mocks and Storybook GraphQL translation request (b4e2146)
* **Code Formatting:** Added blank lines to space out code (cffbd4a)
* **Code Formatting:** Added comment for the page number config state (a59b92a)
* **Code Formatting:** Removed unneeded css selector for hover of cursors (eaad97f)
* **Code Refactoring:** Condensed dialog footer color reference (170431e)
* **Code Refactoring:** Condensed text button link styles into theme for inherited color text buttons (033c91a)
* **Code Refactoring:** Consolidated blue color references (34b828f)
* **Code Refactoring:** Extracted common alert component from beta and accuracy alerts (b410044)
* **Code Refactoring:** Merged config variable declarations (71389f5)
* **Code Refactoring:** Moved date time resets into utility functions (c2d6e89)
* **Code Refactoring:** Moved disclaimer into component (219ea1f)
* **Code Refactoring:** Moved drop down creation into a component (4f259a8)
* **Code Refactoring:** Moved explore button into it's own component (66589fa)
* **Code Refactoring:** Moved input base component into a sub-component (b26ec11)
* **Code Refactoring:** Moved list dialog into own component for use in discoveries block (521a0a6)
* **Code Refactoring:** Moved search bar into it's own component (3a5a92c)
* **Code Refactoring:** Moved tooltip for dropdown component into a sub-component (816730b)
* **Code Refactoring:** Pulled out the dialog from the tree map panel component (4becac7)
* **Code Refactoring:** Renamed filter block class (4813416)
* **Code Refactoring:** Renamed node component (3414391)
* **Code Refactoring:** Split up the tree map components (a275268)
* **Code Refactoring:** Updated color references to use the values from the Material UI theme (a72a13c)
* **Code Refactoring:** Updated page names (d2e1f5a)


### accuracy alert

* **Features:** updates warning text (1c5ce38)


### ALL

* **Features:** removes bulk of old project (3bfad98)
* **Features:** init commit (f2a3718)


### app

* **Features:** adds setup for translations (5cb61a7)


### App

* **Bug Fixes:** fixes useAPI errors bu commenting out loader code (68fe08b)


### config

* **Features:** updated config with new query data (1434c34)


### constants

* **Bug Fixes:** update mock counts (1efedf4)


### data and methods page

* **Features:** updates translations and designs (ed7f104)


### data notice

* **Features:** adds code to make sure link will always appear on second line (b0232b3)
* **Features:** updates style of data notice (0b9d5b6)


### data page

* **Features:** updates data images (bc09fc0)
* **Features:** updates images (1c8cbab)
* **Features:** styles data page (96e7683)
* **Features:** small styling change to images (a750deb)
* **Features:** puts basic structure in place (f583de9)
* **Bug Fixes:** fixes image with words (9660ac9)
* **Bug Fixes:** changes header to h6 in data page (876d520)


### date slider

* **Code Formatting:** renamed datepicker to dateslider (99411c5)


### datepicker

* **Features:** adds functionality to slider; further styles slider (4f874f4)
* **Features:** further styles datepicker (e37c484)
* **Features:** creates basic datepicker slider (582f928)
* **Features:** adds locale to datepicker (9de5365)


### datePicker

* **Features:** updates label of datepicker (66ab4b6)
* **Features:** fixes styling issues with datepicker (9316a69)
* **Features:** datePicker now has min and max dates (b811920)
* **Features:** added in base datepicker (2e3b595)
* **Features:** adds new range date picker (a918fba)
* **Features:** bROKEN. Adds datepicker (78efa04)
* **Features:** adds datePicker comp (02e7222)


### discoveries

* **Features:** adds a disclaimer for french users about language of cards (3d1a694)


### dropdown

* **Features:** modify behaviour of dropdowns (89285b2)
* **Features:** changes behaviour on dropdown so that if all boxes are unchecked, all boxes will be (20e75f4)
* **Bug Fixes:** removes if block that was used for the all button (1d9dedf)


### english

* **Features:** renamed project name in translations (f4287f4)
* **Code Formatting:** removes redundant translation (ddbec70)
* **Code Refactoring:** replaces pluralize function for built in intl function (5c9efa6)


### english.json

* **Bug Fixes:** updated filter labels to be in sentence case (fb60e31)
* **Bug Fixes:** updated label (aa0b610)
* **Bug Fixes:** updated english labels (98f7c1e)


### english.json, Data\index.jsx

* **Bug Fixes:** added new caption to Data page (5dda900)


### esa

* **Code Formatting:** fixes linting issues and upgrades linting rules (bb52a71)


### filter panel

* **Features:** enables multi select and changed label to typography (8cdf910)
* **Code Formatting:** fixes a linting error (f27dfee)
* **Code Formatting:** removes small warnings and useless code (a138431)


### FilterPanel

* **Features:** adds gql config data to FilterPanel (172ebd8)
* **Code Formatting:** removes unused import (98bffd1)


### fixes some small issues with code consistancy

* **Bug Fixes:** 1343 (be2b977)


### french

* **Features:** adds translations for cards; removes duplicate text in data notice (7598288)
* **Features:** updates french text and images (6361759)
* **Features:** adds back in accidentally removed translations (f63cb2f)
* **Features:** further updates french translations (1f2870b)
* **Bug Fixes:** removes bad translations (548cb84)
* **Bug Fixes:** added french translation and corrected english one (6cb6baf)
* **Bug Fixes:** fixes issue where french translations require spacing around colons (d075aa0)
* **Bug Fixes:** updates french translation (ebca749)


### french translations

* **Features:** adds some french translations (b14117f)


### french.json

* **Bug Fixes:** readded text and introduced french caption text (de5cea0)
* **Bug Fixes:** updated french labels (b0ff178)


### FullButtons

* **Code Formatting:** removes unused import (c4d0dd7)


### images

* **Features:** organizes image paths (5bbe903)


### info pages

* **Bug Fixes:** some small code cleanups (186d1bd)


### keywords

* **Bug Fixes:** applys an even spacing around all keyword buttons (a6ef625)


### landing

* **Features:** rearranges landing page components (24c297e)


### limitations dialog

* **Features:** fixes repeated color issue (ffa05b4)
* **Bug Fixes:** applies some code cleanup (c30cab2)


### Limitations Dialog

* **Features:** adds download data section to limitations dialog (2692678)


### lint

* **Bug Fixes:** fixes linting issues (9666344)
* **Bug Fixes:** fix linting issues (4270f68)


### list

* **Features:** sets up basic groundwork for list styles (3b84d99)
* **Code Formatting:** removes useless translation data (27c0b77)


### list dialog

* **Features:** creates and styles list dialog popup (d6db44e)


### List Dialog

* **Features:** applies some minor tweaks and code quality improvements (973e116)


### methods page

* **Features:** fixes link to regdocs (8666256)
* **Features:** adds content to methods page (a42efdf)


### nav buttons

* **Features:** refactors nav buttons and adds nav buttons to search page (976b2e2)
* **Bug Fixes:** resets scroll when nav buttons are clicked (e7ab74e)


### nodeModules

* **Bug Fixes:** broken (f812de0)


### package json

* **Code Formatting:** removes useless dependancies (ddbe278)


### project page

* **Features:** updates content and design (21c8d25)
* **Features:** creates project info page (fba817b)
* **Bug Fixes:** changes style of info panel to wet template version (3e484ec)
* **Code Formatting:** changes href to reference translation directly (a44b571)


### result dialog

* **Features:** fixes padding on esa sections' (4f1cd6e)
* **Features:** adds disclaimer text to result dialog (163bb08)


### resultDialog

* **Features:** adds in a stub for the preview data section (1d4969c)


### results dialog

* **Features:** fixes issue where expanding sections used the same variable as expanding title (49f2272)


### results list

* **Bug Fixes:** fixs excess colon issue (40cb5c7)


### search

* **Features:** moves config data into useAPI hook (915bb33)
* **Features:** moves treemap to own comp. Various improvements (1ad3641)
* **Features:** added table stub (1fd6b7a)


### search list

* **Features:** adds a see less button (61713bd)
* **Features:** applies some code cleanup (b4621b4)
* **Bug Fixes:** truncates long titles in list and dialog (362fba2)
* **Bug Fixes:** update styles on list items (354ff12)


### search page

* **Features:** removes some useless files and adds small cosmetic changes (2d6d9fd)


### searchList

* **Features:** styles the search list (abcad8c)
* **Features:** styles pagination and tables (728fc33)
* **Features:** adds basic styling (20ec7fb)
* **Bug Fixes:** removes duplicate code (30040c5)


### searchPage

* **Features:** added new sections to search page scaffolding (4179b4f)


### sort dropdown

* **Bug Fixes:** fixes lag and error in sort dropdown (8bbdec5)


### svg button

* **Bug Fixes:** adds on hover background color change (94f734f)


### table.svg

* **Bug Fixes:** replaces table icon with updated version (9c8eb66)


### theme

* **Features:** updates theme for button colors (1c133b8)
* **Features:** updates app color scheme (74130bb)
* **Features:** updates theme to use Noto Sans (f53b7af)
* **Bug Fixes:** updates styles to better reflect design (43f28de)
* **Bug Fixes:** moves button color into theme (07d452d)
* **Code Formatting:** removed unused colors (7a2ea54)


### title card

* **Features:** updates logo and tagline (ccbfb62)


### titleContent

* **Features:** adds some basic layout setup (d2f0b5c)


### translations

* **Features:** updates translations for project page (d206a04)
* **Features:** update results type text (5c5cb4c)
* **Features:** update tagline text (e20057f)
* **Features:** updates text for accuracy alert (ec236da)
* **Features:** pluralizes the treemap title (cc8ca00)
* **Features:** introduces pluralizin function and sentence cases buttons (665f519)
* **Features:** changes wording on the the intro text for treemap (a46a692)
* **Features:** updates french translation data (af66d26)
* **Features:** updates text in app to use translation hook (da860ae)
* **Bug Fixes:** updates translations to improve consistancy (3fcd3dc)
* **Bug Fixes:** adds space to the end of a translation (9c57f31)
* **Bug Fixes:** updates text in dialog box to be more consistant (0d6a2c1)
* **Bug Fixes:** changes download tables text to download esa tables (7165b15)
* **Bug Fixes:** updates accreditations (c569202)


### treemap

* **Features:** formats numbers in tooltip and label (ffd2bef)
* **Features:** runs table and figure numbers through intl (d6c1022)
* **Features:** adds dialog popup and converts treemap to html (3ccaac1)


### treeMap

* **Features:** adds a no results message when there is no data (b6fb353)
* **Features:** adds in extra text for table and figure counts (c514125)
* **Features:** fixes some small issues with treemap sort and labels (6cfec72)
* **Features:** adds custom tooltip to treemap hover (cc87f15)
* **Features:** styles the treeMap popup dialog (ac80d41)
* **Features:** impoved label placement logic for treeMap (a6af256)
* **Features:** styles inner text on treeMap leaves (bfaab45)
* **Features:** fixes some small issues with naming (ab312dd)
* **Features:** connects data and adds some styles (ce62ee0)
* **Code Formatting:** makes some small code quality improvements (a164033)


### treemap counts

* **Bug Fixes:** removes bolding on counts text (3e4aced)


### treemap dialog

* **Bug Fixes:** formats footer numbers and fixes close button hover (6628485)
* **Bug Fixes:** vertically aligns figure and table counts (ce9a9b6)
* **Bug Fixes:** fixes some inconsistancies from the design (2c761b7)
* **Bug Fixes:** updated dialog text for consultant to be esa consultants (4d146e3)


### treeMap dialog

* **Features:** cleans code and fixes some bugs (54f0e2f)
* **Bug Fixes:** removes the year header and refactors (d218f4e)


### treeMap Dialog

* **Bug Fixes:** fixes issue where title was table in dialog (f84bd1d)
* **Bug Fixes:** fixes a bug where the dl button is too big (cf132df)


### treemap panel

* **Bug Fixes:** adds code to wait on data before rendering (b23121a)


### treemap tooltip

* **Features:** lowercases figure and table count (ce992c0)
* **Bug Fixes:** reduces padding on treemap tooltip (181ab6b)


### treeMap tooltip

* **Features:** adds bold to numbers (1d8ebd9)


### useAPI

* **Bug Fixes:** comment out useAPI and fix lint errors (5dcf5b5)


### useESAData

* **Features:** adds option to add variables to hook (ab7dacf)
* **Features:** polished data hook (c50f77d)
* **Features:** adds base logic for data hook (fa844bf)


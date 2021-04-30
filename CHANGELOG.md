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


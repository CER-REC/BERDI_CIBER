# PDF Viewer

The application uses Mozilla's [PDF.js](https://github.com/mozilla/pdf.js/).

This is to avoid the browser's built-in PDF viewer not being functional,
when the default setting for PDF's are set to automatically download.

The issue is only present in Chrome and Edge, in Firefox the built-in PDF viewer will always render.

## Development Environment

The development environment will continue to use the browser's built-in PDF viewer.
The CER's PDF URLs are block by CORs for local development.

## PDF.js

PDF.js is brought in as a submodule.
The PDF.js **npm** module doesn't include Mozilla's default PDF viewer.
The PDF.js viewer can be built for local development using `npm run pdfjs:build`.
The built viewer will be placed in `./public/pdfjs`.
The built viewer will have an hosting check exception removed by the build.
The PDF.js viewer by default is limited to be only hosted on Mozilla's github pages (`web/app.js`):
```
  const HOSTED_VIEWER_ORIGINS = [
    "null",
    "http://mozilla.github.io",
    "https://mozilla.github.io",
  ];
  validateFileURL = function (file) {
    if (!file) {
      return;
    }
    try {
      const viewerOrigin = new URL(window.location.href).origin || "null";
      if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
        // Hosted or local viewer, allow for any file locations
        return;
      }
      const fileOrigin = new URL(file, window.location.href).origin;
      // Removing of the following line will not guarantee that the viewer will
      // start accepting URLs from foreign origin -- CORS headers on the remote
      // server must be properly configured.
      if (fileOrigin !== viewerOrigin) {
        throw new Error("file origin does not match viewer's");
      }
```
The PDF.js viewer can be used in local development by changing the follow line (or setting the node environment to something other than **development**):
```
const pdfViewerURL = process.env.NODE_ENV === 'development' ? '' : pdfjsURL;
```

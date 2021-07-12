# Result Dialog

The ResultDialog component renders an entire PDF in a modal. The LoadingIndicator component is shown while the given PDF is loading; the PDF is then shown in the PDFPreviewer subcomponent once it is fully loaded.

Underneath the PDF, the ResultDialog component shows data pertaining to the figure or table that was selected. This data is passed in via the `data` object prop.

The PDF is shown on the page that the selected figure or table resides at (also passed in via `data`). The page is also fitted such that all of it is visible.

## Requirements

* [X] The LoadingIndicator component appears while the ResultDialog's data is loading
* [ ] Data is passed into the ResultDialog component and is shown under the PDF
* [X] PDFs load in on the page the given Table or Figure is on, and this page is fitted so that all of it is seen at once
* [X] The Download button does not appear for Figures

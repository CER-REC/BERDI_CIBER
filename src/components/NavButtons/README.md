# Navigation Buttons

The NavButtons component will render one of three button collections depending on the page the user is on.

The NavButtons component looks at the value of `page` in `config` and renders the appropriate component.

## Requirements

* [X] When on the landing page, the FullButtons component will render
* [X] When on any of the information pages, the SmallButtons component will render with the BackButton component positioned above
* [X] When on the search page, just the BackButton component will render
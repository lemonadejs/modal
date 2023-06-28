# Javascript Color Picker

## Features

-   Lightweight: Lemonade color picker is only about 4 Kbytes in size, making it fast and easy to load.
-   Customizable: You can define the toggle element and the pallete of the colorpicker.
-   Reactive: Any changes to the pallete are automatically applied to the HTML.
-   Integration: ColorPickerLM can be used as a standalone library or integrated with LemonadeJS or React.

## Getting Started

Utilizing the ColorPickerLM component is straightforward. Just include the JavaScript file in your project and instantiate a new Color Picker using the provided API.

## Installation

### with NPM

To install it in your project using npm, run the following command:

```bash
$ npm install @lemonadejs/colorpicker
```

### with CDN

To use Colorpicker via a CDN, include the following script tags in your HTML file:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lemonadejs/dist/lemonade.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@lemonadejs/colorpicker/dist/index.min.js"></script>
```
### Usage

There is two ways to instantiate a Colorpicker, Programatically or Dinamically

#### Programatically

Create an instance of the Colorpicker by providing the DOM element and the **_options_** object.

```html
<div id="root"></div>
<script>
    const root = document.getElementById('root')
    Colorpicker(root, {
      oncolorchange: function(color) {
        // You can manipulate the color here
        console.log(color)
      },
      type: 'color',
    })
</script>
```

#### Dynamically with LemonadeJS

The Colorpicker is invoked within the template, with the options being passed as properties.

```javascript
import Colorpicker from '@lemonadejs/colorpicker'
import lemonade from 'lemonadejs'

lemonade.setComponents({ Colorpicker })

export default function Component() {
    let self = this

    return `<Colorpicker />`
}
```

### Properties

- closed: boolean -> if false colorpicker starts open. default is true
- pallete: matrix -> provide the colors that will be rendered in the grid
- type: string -> chooses the element that will toggle the colorpicker. options are: 'button', 'input', 'icon', 'custom'

### Events

- oncolorchange: callback function(color) -> triggered when color is selected.
- onopen: callbackfunction(color) -> triggered when colorpicker modal opens
- onclose: callbackfunction(color) -> triggered when colorpicker modal closes


#### Custom Input Configuration

When **type** is set to 'custom', the custom element should be passed like that. This feature allows you to have more control to personalize the element that will toggle the Colorpicker

```html
<Colorpicker>
  <Element>
</Colorpicker>
```

By Default Colorpicker will bind value and add ref to this element.
# ColorPicker

## Installation

## Properties

- closed: boolean -> if false colorpicker starts open. default is true
- pallete: matrix -> provide the colors that will be rendered in the grid

## Events

- oncolorchange: callback function -> triggered when color is selected.
- onopen: callbackfunction -> triggered when colorpicker modal opens
- onclose: callbackfunction -> triggered when colorpicker modal closes


### Input Configuration

This feature allows you to personalize the element that will toggle the Colorpicker

```html
<Colorpicker>
  <Input>
</Colorpicker>
```

By Default ColorPicker will bind value and add ref to this element.
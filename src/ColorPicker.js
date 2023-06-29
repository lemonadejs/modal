if (!lemonade && typeof (require) === 'function') {
    var lemonade = require('lemonadejs');
}

if (!Modal && typeof (require) === 'function') {
    var Modal = require('./Modal');
}

if (!Tabs && typeof (require) === 'function') {
    var Tabs = require('./Tabs');
}

; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.ColorPicker = factory();
}(this, (function () {

    const defaultPallete =  [
        ["#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1"],
        ["#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc"],
        ["#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5"],
        ["#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae"],
        ["#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c"],
        ["#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"],
        ["#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a"],
        ["#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64"],
        ["#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f"],
        ["#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238"],
    ]

    function Grid() {
        const self = this
        window.grid = self

        self.onchange = function (property) {
            if (property === 'pallete') {
                self.constructRows()
            }
        }

        self.onload = function () {
            self.tableRef.addEventListener("click", self.select)
        }

        self.select = function (event) {
            if (event.target.tagName == 'TD') {
                // Get the color value from the attribute
                let color = event.target.getAttribute('data-value')

                // Remove current selected mark
                let selected = document.querySelector('.lm-color-selected');
                if (selected) {
                    selected.classList.remove('lm-color-selected');
                }
                
                // Mark cell as selected
                if (color) {
                    event.target.classList.add('lm-color-selected');
                    self.onpick(color)
                }
            }
        }

        // build HTML inside the table based on the pallete
        self.constructRows = function () {
            let tbody = ''
            for (let j = 0; j < self.pallete.length; j++) {
                tbody += '<tr>'
                for (let i = 0; i < self.pallete[j].length; i++) {
                    let color = self.pallete[j][i]
                    tbody += `<td data-value="${color}" style="background-color: ${color}" />`
                }
                tbody += '</tr>'
            }

            self.tableRef.innerHTML = tbody
        }
        
        return `<div class="lm-color-grid" pallete="{{self.pallete}}" title="Grid">
        <table cellpadding="7" cellspacing="0" :ref="self.tableRef" :ready="self.constructRows()"></table>
        </div>`
    }

    function Spectrum() {
        const self = this;
        let context = null;

        let decToHex = function(num) {
            let hex = num.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }

        let rgbToHex = function(r, g, b) {
            return "#" + decToHex(r) + decToHex(g) + decToHex(b);
        }

        // Draw the gradient in the canvas
        let draw = function() {
            let g = context.createLinearGradient(0, 0, self.canvas.width, 0);
            // Create color gradient
            g.addColorStop(0,    "rgb(255,0,0)");
            g.addColorStop(0.15, "rgb(255,0,255)");
            g.addColorStop(0.33, "rgb(0,0,255)");
            g.addColorStop(0.49, "rgb(0,255,255)");
            g.addColorStop(0.67, "rgb(0,255,0)");
            g.addColorStop(0.84, "rgb(255,255,0)");
            g.addColorStop(1,    "rgb(255,0,0)");
            context.fillStyle = g;
            context.fillRect(0, 0, self.canvas.width, self.canvas.height);
            g = context.createLinearGradient(0, 0, 0, self.canvas.height);
            g.addColorStop(0,   "rgba(255,255,255,1)");
            g.addColorStop(0.5, "rgba(255,255,255,0)");
            g.addColorStop(0.5, "rgba(0,0,0,0)");
            g.addColorStop(1,   "rgba(0,0,0,1)");
            context.fillStyle = g;
            context.fillRect(0, 0, self.canvas.width, self.canvas.height);
        }
     
        self.onload = function() {
            context = self.canvas.getContext("2d", { willReadFrequently: true });
            draw();
        }

        // Moves the marquee point to the specified position
        self.update = function(e) {
            let x;
            let y;
            let buttons = 1;
            if (e.type == 'touchmove') {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            } else {
                buttons = e.buttons;
                x = e.clientX;
                y = e.clientY;
            }
            
            if (buttons === 1) {
                let rect = self.el.getBoundingClientRect();
                let left = x - rect.left;
                let top = y - rect.top;

                // Get the color in this pixel
                let pixel = context.getImageData(left, top, 1, 1).data;

                // Position pointer
                self.point.style.left = left + 'px'
                self.point.style.top = top + 'px'
                
                // Return color
                self.onpick(rgbToHex(pixel[0], pixel[1], pixel[2]))
            }
        }
          
        return `<div class="lm-color-hsl" title="Spectrum">
            <canvas :ref="self.canvas"
                onmousedown="self.update(e)"
                onmousemove="self.update(e)"
                ontouchmove="self.update(e)"></canvas>
            <div class="lm-color-point" :ref="self.point"></div>
        </div>`;
    }

    const ColorPicker = function (html) {
        let self = this
        window.colorPicker = self;

        if (typeof self.closed === 'undefined') {
            self.closed = true
        }

        self.onload = function () {
            if (self.inputRef) {
                self.inputRef.addEventListener('click',  (event) => {
                    event.preventDefault()
                    self.closed = !self.closed
                })
            }
        }

        self.updateColor = function (newColor) {
            self.color = newColor
            if (typeof self.oncolorchange === 'function') {
                self.oncolorchange(newColor)
            }
        }

        if (!self.pallete) {
            self.pallete = defaultPallete
        }
        
        let input = ''

        if (self.dom) {
            html = self.dom
        }

        if (self.type === 'custom') {
            if (html && html[html.indexOf('>') - 1] !== '/') {
                input = html.slice(0, html.indexOf('>')) + ` :ref="self.inputRef" :bind="self.color"` + html.slice(html.indexOf('>')) 
            } else if (html) {
                input = html.slice(0, html.indexOf('>') - 1) + ` :ref="self.inputRef" :bind="self.color"` + html.slice(html.indexOf('>') - 1) 
            }
        } else {
            input = '<input type="color" :ref="self.inputRef" :bind="self.color"/>'
        }

        let template = `<div class="lm-color-picker">
        ${input}
        <Modal :closed="self.closed" width="300" height="280" :onopen="self.onopen" :onclose="self.onclose">
        <div class="lm-color-picker-options">
            <button onclick="self.parent.color='#FFFFFF';self.parent.closed='true'">Reset</button>
            <button onclick="self.parent.closed='true'">Done</button>
        </div>
        <Tabs selected="0">
            <Grid :onpick="self.parent.parent.updateColor" pallete={{self.parent.parent.pallete}}/>
            <Spectrum :onpick="self.parent.parent.updateColor"/>
        </Tabs>
        </Modal>
        </div>`

        return lemonade.element(template, self, { Modal, Tabs, Spectrum, Grid })
    }

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(ColorPicker, root, options)
            return options;
        } else {
            return ColorPicker.call(this, root)
        }
    }
})));
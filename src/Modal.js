if (! lemonade && typeof(require) === 'function') {
    var lemonade = require('lemonadejs');
}

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Modal = factory();
}(this, (function () {

    /*
       var defaults = {
            url: null,
            onopen: null,
            onclose: null,
            onload: null,
            closed: false,
            width: null,
            height: null,
            title: null,
            icon: null,
            resizable
            draggable
        };
     */

    let state = {};
    let editorAction;
    // Width of the border
    let cornerSize = 15;

    // Events
    const mouseDown = function(e) {
        let item = e.target;
        if (item.classList.contains('lm-modal')) {
            // Keep the tracking information
            let rect = e.target.getBoundingClientRect();
            editorAction = {
                e: e.target,
                x: e.clientX,
                y: e.clientY,
                w: rect.width,
                h: rect.height,
                d: e.target.style.cursor,
                resizing: e.target.style.cursor ? true : false,
                actioned: false,
                s: this,
            }

            // Make sure width and height styling is OK
            if (! e.target.style.width) {
                e.target.style.width = rect.width + 'px';
            }

            if (! e.target.style.height) {
                e.target.style.height = rect.height + 'px';
            }

            // Remove any selection from the page
            let s = window.getSelection();
            if (s.rangeCount) {
                for (let i = 0; i < s.rangeCount; i++) {
                    s.removeRange(s.getRangeAt(i));
                }
            }

            e.preventDefault();
            e.stopPropagation();
        }
    }

    const mouseUp = function(e) {
        if (editorAction && editorAction.e) {
            // Element
            if (editorAction.resizing) {
                let w = parseInt(editorAction.e.style.width);
                let h = parseInt(editorAction.e.style.height)
                editorAction.s.width = w;
                editorAction.s.height = h;
            } else {
                let t = parseInt(editorAction.e.style.top);
                let l = parseInt(editorAction.e.style.left)
                editorAction.s.top = t;
                editorAction.s.left = l;
            }
            // if (typeof(editorAction.e.refresh) == 'function' && state.actioned) {
            //     editorAction.e.refresh();
            // }
            editorAction.e.style.cursor = '';
        }

        // Reset
        state = {
            x: null,
            y: null,
        }

        editorAction = false;
    }

    const mouseMove = function(e) {
        if (editorAction) {
            let x = e.clientX || e.pageX;
            let y = e.clientY || e.pageY;

            // Action on going
            if (! editorAction.resizing) {
                if (!state || (state && state.x == null && state.y == null)) {
                    state.x = x;
                    state.y = y;
                }

                let dx = x - state.x;
                let dy = y - state.y;
                let top = editorAction.e.offsetTop + dy;
                let left = editorAction.e.offsetLeft + dx;

                // Update position
                editorAction.top = top
                editorAction.left = left
                editorAction.e.style.top = top + 'px';
                editorAction.e.style.left = left + 'px';
                editorAction.e.style.cursor = "move";

                
                state.x = x;
                state.y = y;
                state.top = top
                state.left = left

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('position', top, left);
                }
            } else {
                let width = null;
                let height = null;

                if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' || editorAction.d == 'se-resize') {
                    // Update width
                    width = editorAction.w + (x - editorAction.x);
                    editorAction.e.style.width = width + 'px';

                    // Update Height
                    if (e.shiftKey) {
                        var newHeight = (x - editorAction.x) * (editorAction.h / editorAction.w);
                        height = editorAction.h + newHeight;
                        editorAction.e.style.height = height + 'px';
                    } else {
                        var newHeight = false;
                    }
                }

                if (! newHeight) {
                    if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                        height = editorAction.h + (y - editorAction.y);
                        editorAction.e.style.height = height + 'px';
                    }
                }

                // Update element
                if (typeof(editorAction.e.refresh) == 'function') {
                    state.actioned = true;
                    editorAction.e.refresh('dimensions', width, height);
                }
            }
        } else {
            let item = e.target;
            if (item.classList.contains('lm-modal')) {
                let rect = item.getBoundingClientRect();
                if (e.clientY - rect.top < cornerSize) {
                    if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'ne-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'nw-resize';
                    } else {
                        item.style.cursor = 'n-resize';
                    }
                } else if (rect.height - (e.clientY - rect.top) < cornerSize) {
                    if (rect.width - (e.clientX - rect.left) < cornerSize) {
                        item.style.cursor = 'se-resize';
                    } else if (e.clientX - rect.left < cornerSize) {
                        item.style.cursor = 'sw-resize';
                    } else {
                        item.style.cursor = 's-resize';
                    }
                } else if (rect.width - (e.clientX - rect.left) < cornerSize) {
                    item.style.cursor = 'e-resize';
                } else if (e.clientX - rect.left < cornerSize) {
                    item.style.cursor = 'w-resize';
                } else {
                    item.style.cursor = '';
                }
            }
        }
    }

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousedown', mouseDown);
    document.addEventListener('mousemove', mouseMove);

    const Modal = function () {
        let self = this

        self.onload = function() {
            if (self.url) {
                // Load remote content
            }
        }

        self.mousedown = mouseDown.bind(self);

        window.modal = self;

        return `<div class="lm-modal" title="{{self.title}}" closed="{{self.closed}}"
            style="width: {{self.width}}px; height: {{self.height}}px; top: {{self.top}}; left: {{self.left}};" onmousedown="self.mousedown(e)" tabindex="-1">
                <div>123</div>
            </div>`
    }

    return function (root, options) {
        if (typeof(root) === 'object') {
            lemonade.render(Modal, root, options)
            return options;
        } else {
            return Modal.call(this, root)
        }
    }
})));
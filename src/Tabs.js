if (!lemonade && typeof (require) === 'function') {
    var lemonade = require('lemonadejs');
}

; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Tabs = factory();
}(this, (function () {

    const Tabs = function (html) {
        let self = this

        let content = html;

        if (self.data) {
            for (let i = 0; i < self.data.length; i++) {
                content += `<div title="${self.data[i].title}">${self.data[i].content}</div>`;
            }
        }

        self.tabs = [];

        self.onload = function () {
            for (let i = 0; i < self.content.children.length; i++) {
                self.tabs.push({ title: self.content.children[i].title });
            }
            self.refresh('tabs');

            if (! isNaN(parseInt(self.selected))) {
                select(self.selected);
            }
        }

        const select = function (index) {
            index = parseInt(index);

            for (let i = 0; i < self.content.children.length; i++) {
                self.headers.children[i].classList.remove('selected');
                self.content.children[i].classList.remove('selected');
            }
            self.headers.children[index].classList.add('selected');
            self.content.children[index].classList.add('selected');
        }

        self.onchange = function (property) {
            if (property === 'selected') {
                select(self.selected);
            }
        }

        self.click = function (ev, el) {
            if (ev.target.tagName === 'LI') {
                self.selected = Array.prototype.indexOf.call(el.children, ev.target);
            }
        }

        return `<div class="lm-tabs" position="{{self.position||''}}">
            <ul :ref="self.headers" :loop="self.tabs" onclick="self.click(e, this)" :selected="self.selected"><li class="lm-tab-list-item">{{self.title}}</li></ul>
            <div :ref="self.content" class="lm-tabs-content">${content}</div>
        </div>`
    }

    return function (root, options) {
        if (typeof (root) === 'object') {
            lemonade.render(Tabs, root, options)
            return options;
        } else {
            return Tabs.call(this, root)
        }
    }
})));
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

        window.tabs = self;

        let content = html;

        if (self.data) {
            for (let i = 0; i < self.data.length; i++) {
                content += `<div title="${self.data[i].title}">${self.data[i].content}</div>`;
            }
        }

        self.tabs = [];

        self.onload = function () {
            let divs = self.el.children;
            for (let i = 1; i < divs.length; i++) {
                self.tabs.push({ title: divs[i].title });
            }
            self.refresh('tabs');

            if (!isNaN(parseInt(self.selected))) {
                select(self.selected);
            }
        }

        const select = function (index) {
            let headers = self.el.children[0].children;
            let content = self.el.children;
            index = parseInt(index);

            for (let i = 0; i < headers.length; i++) {
                headers[i].classList.remove('selected');
                content[i + 1].classList.remove('selected');
            }

            headers[index].classList.add('selected');
            content[index + 1].classList.add('selected');
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

        return `<div class="lm-tabs">
            <ul :loop="self.tabs" onclick="self.click(e, this)" selected="{{self.selected}}"><li class="lm-tab-list-item">{{self.title}}</li></ul>
            ${content}
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
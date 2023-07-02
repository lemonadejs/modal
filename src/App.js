import lemonade from 'lemonadejs'
import ColorPicker from './ColorPicker.js';
import '@lemonadejs/tabs/dist/style.css';
import '@lemonadejs/modal/dist/style.css';

import '../css/colorpicker.css'

function App() {
    let self = this;

    self.onclose = function (something) {
        console.log('closing modal', something.parent.color)
    }

    self.onopen = function(something) {
        console.log('opening modal', something.parent.color)
    }

    self.palette = [
        ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3' ],
        ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca' ],
        ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6' ],
        ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a' ],
    ]

    window.test = self;

    return `<div>
            <ColorPicker type="input" :onopen="self.onopen" :onclose="self.onclose" :palette="self.palette" />
        </div>`;
}

export default App;

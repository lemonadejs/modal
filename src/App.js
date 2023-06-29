import lemonade from 'lemonadejs';
import Modal from './Modal.js';
import Tabs from './Tabs.js';
import ColorPicker from './ColorPicker.js';
import '../css/tabs.css'
import '../css/modal.css'
import '../css/colorpicker.css'

function App() {
    let self = this;

    self.onclose = function () {
        console.log('closing modal')
    }

    self.onopen = function() {
        console.log('opening modal')
    }

    self.toggle = function () {
        self.closed = !self.closed
    }

    self.closed = false

    self.data = [{ title: 'Tab1', content: "<div>Hello</div>" },
                 { title: 'Tab2', content: "Tab 2 CONTENT!!" },
                 { title: 'Tab3', content: "<ul><li>Item 1</li><li>Item 2</li></ul>" }]

    self.color = '#228822'

    self.othercolor = '#0099AA'

    self.handleChange = function (color) {
        self.color = color
    }

    self.newPallete = [
        ['#001969', '#233178', '#394a87', '#4d6396', '#607ea4', '#7599b3' ],
        ['#00429d', '#2b57a7', '#426cb0', '#5681b9', '#6997c2', '#7daeca' ],
        ['#3659b8', '#486cbf', '#597fc5', '#6893cb', '#78a6d1', '#89bad6' ],
        ['#003790', '#315278', '#48687a', '#5e7d81', '#76938c', '#8fa89a' ],
    ]

    // self.dom = `<input type='text'></input>`

    return `<>
        <ColorPicker type="input" value="{{self.othercolor}}" :onopen="self.onopen" :onclose="self.onclose" />
    </>`;

    // return `<>
    // <Modal @ref="self.component" :resizable="true" :draggable="true" :onclose="self.onclose" :onopen="self.onopen" :closed="self.closed" top="50">
    // <Tabs data="{{self.parent.data}}" selected="2">
    //     <p title="oi">ola</p>
    // </Tabs>
    // </Modal>
    // <button :onclick="self.toggle">toggle</button>
    // </>`;
}

lemonade.setComponents({ ColorPicker });

export default App;
import lemonade from 'lemonadejs';
import Modal from './Modal.js';
import '../css/style.css'

function App() {
    let self = this;

    return `<Modal @ref="self.component"/>`;
}

lemonade.setComponents({ Modal });

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';

import './styles/index.css';

const App = (
    <main className="main__wrapper">
        <div className="comn__container">
            <Calendar />
        </div>
    </main>
);

ReactDOM.render(App, document.getElementById('root'));

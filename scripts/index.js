import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar';
import Header from './components/Header';

import AppProvider from './store/Store';

import './styles/index.css';

const App = (
    <AppProvider>
        <main className="main__wrapper">
            <div className="comn__container">
                <Header />
                <Calendar />
            </div>
        </main>
    </AppProvider>
);

ReactDOM.render(App, document.getElementById('root'));

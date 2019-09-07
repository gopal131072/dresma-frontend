// Base react set up
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Locale set up from AntD
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

// Persist and thunk middleware setup
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Routes from './components/Routes';

// Service worker. Currently not used.
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={configureStore.store}>
            <PersistGate loading={null} persistor={configureStore.persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    </LocaleProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';







global.renderWithReduxProvider = renderWithReduxProvider
global.React = React;
import  { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import LoginPage from '../public/components/login.js';
import renderer from 'react-test-renderer';

describe('Creating a booking renders correctly', () => {
	it('Renders correctly', () => {
		const rendered = renderer.create(<Router><LoginPage /></Router>);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});

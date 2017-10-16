import  { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React from 'react';
import LoginPage from '../public/components/login.js';
import RegisterPage from '../public/components/register.js';
import renderer from 'react-test-renderer';

describe('Login Page renders correctly', () => {
	it('Renders correctly', () => {
		const rendered = renderer.create(<Router><LoginPage /></Router>);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});

describe('Register Page renders correctly', () => {
	it('Renders correctly', () => {
		const rendered = renderer.create(<Router><RegisterPage /></Router>);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});

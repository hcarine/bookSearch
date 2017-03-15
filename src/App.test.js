import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App,{Header} from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders welcome message', () => {
	const text = "Ola vc esta no app"
	const wrapper = shallow(<Header title={text}/>);
	const welcome = <h2>{text}</h2>;
	expect(wrapper.contains(welcome)).toEqual(true);
});
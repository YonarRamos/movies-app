import React from 'react'
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store';
import state from '../utils/testState'
import { fireEvent, render } from '@testing-library/react'
import PurchaseDialog from './PurchaseDialog'

const mockStore = configureStore();
const store = mockStore(state);
console.log(state.movies[0])
test('renders content',() => {
    const component = render(
        <Provider store={store}>
            <PurchaseDialog movie={state.movies[0]} user={state.user}/>
        </Provider>
    )
    const button = component.getByText('Buy')
    fireEvent.click(button)
    //validating if dialog purchase show up
    component.getByText('Nightmare before christmas')
    component.getByText('$600')
    component.getByText('Buy')
})

import React from 'react'
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store';
import state from '../utils/testState'
import { render } from '@testing-library/react'
import Market from './Market'
import { moviesReducer } from '../store/movies/reducers'
import { MoviesByNameAction } from '../store/movies/actions'
import { MoviesByStudioAction } from '../store/movies/actions'

const mockStore = configureStore();
const store = mockStore(state);
test('renders content',() => {
    const component = render(
        <Provider store={store}>
            <Market user={state.user}/>
        </Provider>
    )
    component.getAllByText('Slender man')
    component.getAllByText('The conjuring')
    const studio = component.container.querySelector('p')
    expect(studio).toHaveTextContent('Warner Bros.')
})

 test('returns fitered items by name', () => {
    const newFilteredState = moviesReducer(state.movies, MoviesByNameAction('Slender man'))
    expect(newFilteredState).toHaveLength(1)
})

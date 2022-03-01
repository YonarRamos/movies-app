import React from 'react'
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect'
import configureStore from 'redux-mock-store';
import state from '../utils/testState'
import { render } from '@testing-library/react'
import MovieCard from './MovieCard'
import { moviesReducer } from '../store/movies/reducers'
import { AllMoviesAction } from '../store/movies/actions'
import { MoviesByNameAction } from '../store/movies/actions'
import { MoviesByStudioAction } from '../store/movies/actions'

const mockStore = configureStore();
const store = mockStore(state);
test('renders content',() => {
    const component = render(
        <Provider store={store}>
            <MovieCard user={state.user}/>
        </Provider>
    )
    component.getByText('Aladdin')
    component.getByText('Nightmare before christmas')
    const studio = component.container.querySelector('p')
    expect(studio).toHaveTextContent('Disney studios')
})

test('returns all items', () => {
    const newStateaAll = moviesReducer(state.movies, AllMoviesAction)
    expect(newStateaAll).toHaveLength(6)
})

 test('returns fitered items by name', () => {
    const newFilteredState = moviesReducer(state.movies, MoviesByNameAction('Aladdin'))
    expect(newFilteredState).toHaveLength(1)
})

test('returns fitered items by studio', () => {
    const newFilteredState = moviesReducer(state.movies, MoviesByStudioAction('1'))
    expect(newFilteredState).toHaveLength(2)
})
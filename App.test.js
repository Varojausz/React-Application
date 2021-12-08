import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import React from 'react'
import {storiesReducer} from './reusableComponents/Form'
import SearchForm from './reusableComponents/SearchForm'
import InputWithLabel from './reusableComponents/InputWithLabel'
import Item from './reusableComponents/Item'
import axios from 'axios'

/* describe('something truthy and falsy', () => {
  test('true to be true', () => {
    expect(true).toBeTruthy();
  });

  test('false to be false', () => {
    expect(false).toBeFalsy();
  });

}); */



const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
}
const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
}

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
    test('removes a story from all stories', () => {

        const action = {type: 'REMOVE_STORY', payload: storyOne};
        const state = { data: stories, isLoading: false, isError: false };

        const newState = storiesReducer(state, action);
        const expectedState = {
            data: [storyTwo],
            isLoading: false,
            isError: false
        };

        expect(newState).toStrictEqual(expectedState);
    });
});
describe('storiesReducer', () => {
    test('to initialize fetching', () => {

        const action = {type: 'STORIES_FETCH_INIT'};
        const state = { data: [], isLoading: false, isError: false };

        const newState = storiesReducer(state, action);
        const expectedState = {
            data: [],
            isLoading: true,
            isError: false
        };

        expect(newState).toStrictEqual(expectedState);
    });
});
describe('storiesReducer', () => {
    test('to initialize fetching', () => {

        const action = {type: 'STORIES_FETCH_FAILURE'};
        const state = { data: stories, isLoading: false, isError: false };

        const newState = storiesReducer(state, action);
        const expectedState = {
            data: stories,
            isLoading: false,
            isError: true
        };

        expect(newState).toStrictEqual(expectedState);
    });
});

describe('storiesReducer', () => {
  test('removes a story from all stories', () => {

      const action = {type: 'STORIES_FETCH_SUCCESS', payload: stories};
      const state = { data: [], isLoading: false, isError: false };

      const newState = storiesReducer(state, action);
      const expectedState = {
          data: stories,
          isLoading: false,
          isError: false
      };

      expect(newState).toStrictEqual(expectedState);
  });
});

describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne}/>);

    /* screen.debug(); */

    expect(screen.getByText('Author(s): Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
  });

  test('renders a clickable dismiss button', () => {
    render(<Item item={storyOne}/>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('clicking the dismiss button calls the callback handler', () => {
    const handleRemoveItem = jest.fn();

    render (<Item item={storyOne} onRemoveItem={handleRemoveItem}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn()
  }

  test('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps}/>);

    /* screen.debug(); */

    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });

/*   test('renders the correct strong', () => {
    render(<SearchForm {...searchFormProps}/>);

    expect(screen.getByRole("label")).toBeInTheDocument();
  }); */

  test('calls onSearchInput on input field change', () => {
    render(<SearchForm {...searchFormProps}/>);

    fireEvent.change(screen.getByDisplayValue('React'), {
      target: {value: 'Redux'}
    })

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  test('renders the label with its value', () => {
    render(<SearchForm {...searchFormProps}/>);

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  test('calls on searchSubmit on button submit click', () => {
    render(<SearchForm {...searchFormProps}/>);

    fireEvent.submit(screen.getByRole('button'));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  })
});


describe('InputWithLabel', () => {
  const InputWithLabelProps = {
    value: 'React',
    id: 'search',
    onInputChange: jest.fn(),
    isFocused: true,
    type: 'text'
  }

  test('renders the label with its value', () => {
    render(<InputWithLabel {...InputWithLabelProps}/>);

    expect(screen.getByDisplayValue('React')).toHaveAttribute("id", "search");
    expect(screen.getByRole('label')).toBeInTheDocument();

  });

});

//---------------------------------------------------------------------------------------------------

jest.mock('axios');

describe('App', () => {
  test('succeeds fetching data',async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories
      }
    });
    
    axios.get.mockImplementationOnce(() => promise);

    render (<App/>);

    screen.debug();

    await act(() => promise);

    screen.debug();
  });
});
import flask from '../apis/flask';
import Cookies from 'universal-cookie';

export const selectedMenu = (menu) => {
  return {
    type: menu
  };
};

// Based on boxoffice item fetch record from database
export const selectedItem = (item) => {
  return async (dispatch) => {
    const response = await flask.get(`/boxoffice/${item}`);
    dispatch({ type: item, payload: response.data });
  };
};

// This will return user current inpu movie name
export const searchBar = (content) => {
  return {
    type: 'SEARCH',
    payload: content
  };
};

// This will call api on search user input movie name
export const submitSearchTerm = (content) => {
  return async (dispatch) => {
    const response = await flask.post('/search', { movie_name: `${content}`});
    dispatch({ type: 'SUBMIT_SEARCH', payload: response.data });
  }
}

// This will call api request to show a move detail information
export const movieDetailRequest = (movieId) => {
  return async (dispatch) => {
    const response = await flask.get(`/movie/${movieId}`);
    dispatch({ type: 'MOVIE_DETAIL', payload: response.data });
  }
}

// This will load comments for input movie id
export const movieCommentsRequest = (movieId) => {
  return async (dispatch) => {
    const response = await flask.get(`/comment/${movieId}`);
    dispatch({ type: 'MOVIE_COMMENT', payload: response.data});
  }
}

// Submit a comment
export const submitComment = (comment) => {
  return async (dispatch, getState) => {
    const movieId = getState().movieDetail.data[0][1];
    const cookies = new Cookies();

    var user = "Anonymous";
    if(cookies.get('username')) {
      user = cookies.get('username');
    }

    const response = await flask.post(`/comment/${movieId}`, {
      comment: `${comment}`,
      user: `${user}`
    });

    dispatch({ type: 'POST_COMMENT', payload: response.data });
    window.location.reload();
  }
}

// Create new username and password and save to database
export const createAccount = (username, password) => {
  return async (dispatch) => {
    const response = await flask.post('/signup', {
      username: username,
      password: password
    });

    if(response.data.status === 400) {
      dispatch({ type: 'ERROR', payload: response.data.message })
    }
    else {
      dispatch({ type: 'SIGN_UP', payload: response.data });
      const cookies = new Cookies();
      cookies.set('username', `${username}`, { path: '/' });
      cookies.set('password', `${password}`, { path: '/' });
    }
  }
}

// Check username and password
export const loginUser = (username, password) => {
  return async (dispatch) => {
    const response = await flask.post('/login', {
      username: username,
      password: password
    });
    if(response.data.status === 400) {
      dispatch({ type: 'ERROR', payload: response.data.message })
    }
    else {
      dispatch({ type: 'LOG_IN', payload: response.data });
      const cookies = new Cookies();
      // Use cookies to hold current logged in user
      cookies.set('username', `${username}`, { path: '/' });
      cookies.set('password', `${password}`, { path: '/' });
    }
  }
}

// Fetch watched movie list
export const fetchWatchedList = (username) => {
  return async (dispath) => {
    //const cookies = new Cookies();
    //const username = cookies.get('username');
    const response = await flask.get(`/list/${username}`);

    dispath({ type: 'MOVIE_LIST', payload: response.data });
  }
}

// Logout current user
export const logOut = () => {
  // Remove all cookies
  const cookies = new Cookies();
  cookies.remove('username', {path: '/'});
  cookies.remove('password', {path: '/'});

  return {
    type: 'LOG_OUT'
  };
}

// Check is username and movieId have record in database
export const checkMovieStatus = (movieId) => {
  const cookies = new Cookies();
  const username = cookies.get('username');

  return async (dispath) => {
    const response = await flask.post('/gallery', {
      username: username,
      movieId: movieId
    });

    dispath({ type: 'CHECK_STATUS', payload: response.data });
  }
}

// Add new username and movieId record into database
export const updateGallery = (movieId) => {
  const cookies = new Cookies();
  const username = cookies.get('username');

  return async (dispath) => {
    const response = await flask.post(`/list/${username}`, {
      movieId: movieId
    });

    dispath({ type: 'ADD_MOVIE', payload: response.data });
  }
}

import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialStateAuth = {
  rememberMe: false,
  token: '',
  user: ''
}

const initialStateSearch = {
  searchTerm: '',
  searchHistory: []
}

const initialStateMeals = {
  meals: [],
  likes: [],
  stars: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState: initialStateSearch,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSearchHistory: (state, action) => {
      state.searchHistory = action.payload
    }
  }
})

const mealsSlice = createSlice({
  name: 'meals',
  initialState: initialStateMeals,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload
    },
    setLikes: (state, action) => {
      state.likes = action.payload
    },
    setStarts: (state, action) => {
      state.stars = action.payload
    }
  }
})

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  search: searchSlice.reducer,
  meals: mealsSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persist = persistStore(store)

export const { setRememberMe, setToken, setUser } = authSlice.actions
export const { setSearchTerm, setSearchHistory } = searchSlice.actions
export const { setMeals, setLikes, setStarts } = mealsSlice.actions

export default store

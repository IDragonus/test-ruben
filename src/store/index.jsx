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

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  search: searchSlice.reducer
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

export default store

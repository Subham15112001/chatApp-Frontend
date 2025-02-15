import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Routing from "./Routing.tsx";
import { BrowserRouter } from 'react-router'

import store from './store/store.js'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"



let persistor = persistStore(store)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>      
      </PersistGate>
    </Provider>
  </StrictMode>,
)

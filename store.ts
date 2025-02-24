import { ListenerEffectAPI, TypedStartListening, configureStore, createListenerMiddleware } from "@reduxjs/toolkit"
import { appReducer } from "./redux/currentApp/slice"
import configReducer from "@/redux/config/configSlice"
import resourceReducer from "@/redux/resource/resourceSlice"
const listenerMiddleware = createListenerMiddleware()
console.log(
  "Reducers >>",
  {
    // config: configReducer,
    currentApp: appReducer,
    // resource: resourceReducer,
  }
)
const store = configureStore({
  reducer: {
    config: configReducer,
    currentApp: appReducer,
    resource: resourceReducer,



  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(listenerMiddleware.middleware)
})

export default store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

  
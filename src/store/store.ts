import {configureStore} from '@reduxjs/toolkit'
import reducer from './slices/reducer'
const store= configureStore({
    reducer:{
        red:reducer
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [],
            ignoredActionPaths: ['meta.arg', 'payload'],
            ignoredPaths: [`red.dayOfPrevMonth`,`red.dayInMonth`,`red.lastDayOfMonths`,'red.currentDate',`red.firstDayOfMonth`],
          },
        }),
    
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
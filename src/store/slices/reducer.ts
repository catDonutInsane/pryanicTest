import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IS{
  isLoading:boolean,
  data:IData[]
}
export interface IData {
  id: string
  documentStatus: string
  employeeNumber: string
  documentType: string
  documentName: string
  companySignatureName: string
  employeeSignatureName: string
  employeeSigDate: Date
  companySigDate: Date,

}
const initialState: IS = {
  isLoading :false,
  data:[]
}
const reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    setData(state, action:PayloadAction<IData[]>){
      state.data =action.payload
    },
    SetIsLoading(state, action:PayloadAction<boolean>){
      state.isLoading = action.payload
    }
  }
});
export const {
  setData,
  SetIsLoading,
} = reducer.actions;
export default reducer.reducer;

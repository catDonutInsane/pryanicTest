import axios from "axios";
import { GridRowId } from "@mui/x-data-grid";

const instance = axios.create({  
    headers: {
        "x-auth": `${sessionStorage.getItem("token")}`,
      },
  baseURL: `${process.env.REACT_APP_HOST}`,

})

export const userAPI={
    async loadData(){
        const response = await instance.get(`/ru/data/v3/testmethods/docs/userdocs/get`);
        const data = response.data.data;
        return data
    
    },
    async deleteData(id:GridRowId){
        const response = await instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);        
        return response

    },
    
    async login(login:string, pass:string ){
        const response = await instance.post(`/ru/data/v3/testmethods/docs/login`,
            {
                username: `${login}`,
                password: `${pass}`,
              },              
        );        
        return response
    
    },
}
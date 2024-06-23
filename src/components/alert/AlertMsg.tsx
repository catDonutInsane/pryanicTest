import { FC } from "react"
import { Spinner } from "../spinner/Spinner"
import { AxiosError } from "axios"

type AlertType ={
    isLoading:boolean,
    err:AxiosError | undefined
}

export const AlertMsg:FC<AlertType> =({isLoading,err})=>{
    return isLoading
                    ?<Spinner/>
                    :err?.code ==="ERR_NETWORK"
                    ? <div id="wrong" style={{ color: "red" }}>
                    Сервер не доступен
                  </div>
                  :  <div id="wrong" style={{ color: "red", display: "none" }}>
                  Неверный логин или пароль
                </div>
                    
                  
        
            
    
}
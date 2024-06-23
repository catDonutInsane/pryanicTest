import { FC } from "react"
import { Spinner } from "../spinner/Spinner"

type AlertType ={
    isLoading:boolean
}

export const AlertMsg:FC<AlertType> =({isLoading})=>{
    return isLoading
                    ?<Spinner/>
                    :<div id="wrong" style={{ color: "red", display: "none" }}>
                    Неверный логин или пароль
                  </div>
        
            
    
}
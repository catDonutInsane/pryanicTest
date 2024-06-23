import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AlertMsg } from "../alert/AlertMsg";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { userAPI } from "../../api/api";
import { SetIsLoading, setData } from "../../store/slices/reducer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const LoginForm = () => {

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState<AxiosError<unknown, any>>()
  const [visible , setVisible] = useState("none")
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isLoading} = useAppSelector(state => state.red)

  const LoginHandler = () => {  
    
    dispatch(SetIsLoading(true));  

    userAPI.login(login, pass)
      .then((res) => {
        console.log(res)
        
        if (res.data.error_code !== 0) { 
          dispatch(SetIsLoading(false));
         setVisible("block")
        } else {
          sessionStorage.setItem("token", res.data.data.token);
          userAPI.loadData()
            .then((res) => {
              dispatch(setData(res));              
              dispatch(SetIsLoading(false));
              navigate("/table");
            });
          
        }
      })
      .catch((error:AxiosError) =>{
        console.log(error)
        dispatch(SetIsLoading(false))
        setErr(error)
      })
  };

  const loginHandler: React.ComponentProps<"input">["onChange"] = (e) => {
    setLogin(e.currentTarget.value);
  };
  const passHandler: React.ComponentProps<"input">["onChange"] = (e) => {
    setPass(e.currentTarget.value);
  };
  return  <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "500px",
                  height: "700px",
                  margin: "50px auto",
                }}
              >
                <div style={{marginBottom: 10}}>
                  <span>Вы не авторизованы</span>
                </div>
                <TextField
                  onChange={loginHandler}
                  sx={{
                    marginBottom: "10px",
                  }}
                  required
                  id="outlined-login-input"
                  label="Логин"
                  type="text"
                  value={login}
                ></TextField>
                <TextField
                  onChange={passHandler}
                  sx={{
                    marginBottom: "10px",
                  }}
                  required
                  id="outlined-password-input"
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                ></TextField>
                <Button onClick={LoginHandler} variant="contained">
                  Войти
                </Button>
                <AlertMsg isLoading={isLoading} err={err} visible={visible}
                />
              </Box>
  
};


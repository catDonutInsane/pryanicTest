import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Spinner } from "../spinner/Spinner";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { userAPI } from "../../api/api";
import { SetIsLoading, setData } from "../../store/slices/reducer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {isLoading} = useAppSelector(state => state.red)

  const LoginHandler = () => {    
    userAPI.login(login, pass)
      .then((res) => {
        console.log(res)
        if (res.data.error_code !== 0) {
          
          let alertMessage = document.getElementById("wrong");
          if (alertMessage) {
            alertMessage.style.display = "block";
          }
        } else {
          dispatch(SetIsLoading(true));
          sessionStorage.setItem("token", res.data.data.token);

      
          userAPI.loadData()
            .then((res) => {
              dispatch(setData(res));              
              dispatch(SetIsLoading(false));
              navigate("/table");
            });
          
        }
      })
      .catch((error) => console.error(error));
  };

  const loginHandler: React.ComponentProps<"input">["onChange"] = (e) => {
    setLogin(e.currentTarget.value);
  };
  const passHandler: React.ComponentProps<"input">["onChange"] = (e) => {
    setPass(e.currentTarget.value);
  };
  return  isLoading
            ?<Spinner/>
            :<Box
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
                <div id="wrong" style={{ color: "red", display: "none" }}>
                  Неверный логин или пароль
                </div>
              </Box>
  
};


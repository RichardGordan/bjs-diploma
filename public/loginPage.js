'use srtict'

const { response } = require("express");

const userForm = new UserForm();
userForm.loginFormCallback = (data) =>{
  ApiConnector.login(data,(response) => {
if(response.success){
  location.reload();

}else{
  userForm.setLoginErrorMessage(`Ошибка ввода : ${response.error}`);
}
  })
};
userForm.registerFormCallback = (data) =>{
  ApiConnector.register(data,(response) =>{
    if(response.success){
      location.reload();
    }else{
      userForm.setRegisterErrorMessage(`Ошибка регистрации ${data.login} ${response.error}`);
    }
  })
};
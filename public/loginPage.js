'use srtict'
const userForm = new UserForm();
userForm.loginFormCallback = (data) =>{
  ApiConnector.login(data,(serverResponse) => {
if(serverResponse.success){
  location.reload();

}else{
  userForm.setLoginErrorMessage(`Ошибка ввода : ${serverResponse.error}`);
}
  })
};
userForm.registerFormCallback = (data) =>{
  ApiConnector.register(data,(serverResponse) =>{
    if(serverResponse.success){
      location.reload();
    }else{
      userForm.setRegisterErrorMessage(`Ошибка регистрации ${data.login} ${serverResponse.error}`);
    }
  })
};
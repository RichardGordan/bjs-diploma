'user srtict'
const userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, callback => {
 if(!callback.success){
   return alert(userForm.loginErrorMessageBox(callback.error))
 }
 userForm.loginFormAction(callback);
 location.reload();
 return
});
userForm.registerFormCallback = data => ApiConnector.register(data,callback => {
  if()

})
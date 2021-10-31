'use strict'

const { response } = require("express");



const logoutButton = new LogoutButton();
logoutButton.action = () =>{
    ApiConnector.logout((response) =>{
if(response.success){
    location.reload();
}else{
    console.error(`${response.error}`);
}
    })
};
let current = ApiConnector.current((response) =>{
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }else{
        console.error(`Ошибка вывода пользователя`);
    }

});
const rateBoard = new RatesBoard;
const timer = setInterval( function getExchangeRate(){
    ApiConnector.getStocks((response) => {
        if(response.success){
          rateBoard.clearTable(response.data);
          rateBoard.fillTable(response.data);
        }
        return getExchangeRate
    });
},60000);
    

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
const rateBoard = new RatesBoard();
function getExchangeRate(){
    ApiConnector.getStocks((response) => {
        if(response.success){
          rateBoard.clearTable();
          rateBoard.fillTable(response.data);
        }
        else{
            console.error('Ошибка вывода курсов валют');
        }
    });
}
getExchangeRate();
setInterval(getExchangeRate(),60000);
const moneyManger = new MoneyManger();
moneyManger.addMoneyCallback() = (data) =>{
    ApiConnector.addMoney(data,(response) =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManger.setMessage(true, 'Пополнения балланса успешно');
        }else{
            moneyManger.setMessage(false, 'Произошла ошибка при пополнение баланка');
         }

});
}
moneyManger.conversionMoneyCallback() = (data) =>{
    ApiConnector.convertMoney(data,(response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManger.setMessage(true,'Конвертация прошла успешно');
       
        }else{
            moneyManger.setMessage(false, 'Конверт ация не произошла');
        }
    })
}
moneyManger.sendMoneyCallback() = (data) =>{
    ApiConnector.transferMoney(data,(response) =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManger.setMessage(true,'Трансфер прошел успешно');
        }else{
            moneyManger.setMessage(false,'Трансфер не прошел');
        }
    })
}

       
 



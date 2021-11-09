'use strict'
const logoutButton = new LogoutButton();
logoutButton.action = () =>{
    ApiConnector.logout((serverResponse) =>{
location.reload();

    })
};
let current = ApiConnector.current((serverResponse) =>{
    
        ProfileWidget.showProfile(serverResponse.data);
    

});
const rateBoard = new RatesBoard();
function getExchangeRate(){
    ApiConnector.getStocks((serverResponse) => {
        if(serverResponse.success){
          rateBoard.clearTable();
          rateBoard.fillTable(serverResponse.data);
        }
        else{
            console.error('Ошибка вывода курсов валют');
        }
    });
}
getExchangeRate();
setInterval(getExchangeRate,60000);

const moneyManger = new MoneyManger();
moneyManger.addMoneyCallback() = (data) =>{
    ApiConnector.addMoney(data,(serverResponse) =>{
        if(serverResponse.success){
            ProfileWidget.showProfile(serverResponse.data);
            moneyManger.setMessage(true, 'Пополнения балланса успешно');
        }else{
            moneyManger.setMessage(false, `Произошла ошибка при пополнение баланка ${serverResponse.error}`);
         }

});
}
moneyManger.conversionMoneyCallback() = (data) =>{
    ApiConnector.convertMoney(data,(serverResponse) => {
        if(serverResponse.success){
            ProfileWidget.showProfile(serverResponse.data);
            moneyManger.setMessage(true,'Конвертация прошла успешно');
       
        }else{
            moneyManger.setMessage(false, `Конвертация не произошла ${serverResponse.error}`);
        }
    })
}
moneyManger.sendMoneyCallback() = (data) =>{
    ApiConnector.transferMoney(data,(serverResponse) =>{
        if(serverResponse.success){
            ProfileWidget.showProfile(serverResponse.data);
            moneyManger.setMessage(true,'Трансфер прошел успешно');
        }else{
            moneyManger.setMessage(false,`Трансфер не прошел ${serverResponse.error}`);
        }
    });
}
 const favoritesWidget = FavoritesWidget();
 ApiConnector.getFavorites(data,(serverResponse) =>{
    if(serverResponse.success){    
        favoritesWidget.clearTable();
         favoritesWidget.fillTable(serverResponse.data);
         favoritesWidget.updateUsersList(serverResponse.data);
    }
     
 });
 favoritesWidget.addUserCallback() = (data) =>{
     ApiConnector.addUserToFavorites(data ,(serverResponse) =>{
       if(serverResponse.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(serverResponse.data);
        favoritesWidget.updateUsersList(serverResponse.data);
       }else{
           favoritesWidget.setMessage(`Не получилось добавить в Избранные ${serverResponse.error}`);
       }
     });
 }
 favoritesWidget.removeUserCallback() = (data) =>{
     ApiConnector.removeUserFromFavorites(data,(serverResponse) =>{
         if(serverResponse.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(serverResponse.data);
            favoritesWidget.updateUsersList(serverResponse.data);
           }else{
               favoritesWidget.setMessage(`Не получилось удалить из Избраного ${serverResponse.error}`);
         }
     })
 }



       
 



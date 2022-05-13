const AmoCRM = require( 'amocrm-js' );

const crm = new AmoCRM({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'ramnast2018.amocrm.ru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    /* 
      Информация об интеграции (подробности подключения 
      описаны на https://www.amocrm.ru/developers/content/oauth/step-by-step)
    */
    auth: {
      client_id: '9bd9bf1d-8289-4495-bf99-21f8b9ae6d45', // ID интеграции
      client_secret: 'dLsKMZSmYKO8ucSIw9A9ZRiOgRMMehWnlXmhlINx5Amp85ygD0H6CxNc5xfKoLrV', // Секретный ключ
      redirect_uri: 'https://16fa-92-255-128-129.ngrok.io', // Ссылка для перенаправления
      server:{//Сервер авторизации
          port:8080
      }  
    },
});

//Основной код
async function myFunction(){

    const url = crm.connection.getAuthUrl();
    console.log({url});
    //Контакты
    let contactsResponse = await crm.request('GET','/api/v4/contacts',{
                                                              with: 'leads'
                                                          });
    let contactsAll = contactsResponse.data._embedded.contacts;//массив контактов, где каждый контакт объект

      console.log('Контакты');            
      for(let item of contactsAll){

        if (item._embedded.leads.length) console.log(item._embedded.leads);//если есть сделка
        else {//если сделки нет
          console.log('У этого контакта c данным ID сделок нет');
          console.log(item.id);
          const tasksResponse =  await crm.request('POST','/api/v4/tasks',[{
                "complete_till":1852263709,
                "text":'У данного контакта нет сделок',
                "entity_type":'contacts',
                "entity_id":item.id
           }]);                       
          }
      }       
          
}
myFunction();

import users from '../users.json'

let initialState = {
  ...users,
  currentUser: null,
  error: null
}

const PeopleReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    
	switch (action.type) {
        case "addUser":{ //Добавление участника
            stateCopy.users.push(action.data)
            return stateCopy;
        }case "authUser":{ //Авторизация участника
          //поиск учатника
          let user = state.users.find(el => el.password == action.data.password)
          //Если если нету, то ошибка
          if(!!user){
            stateCopy.currentUser = {...user}
            stateCopy.error = null
          }else{
            stateCopy.error = "Ошибка. Введены неверные данные"
          }
          return stateCopy
        }case "changeUser":{ //Редактирование данных авторизованого участника
          stateCopy.currentUser = null
          stateCopy.users = stateCopy.users.map(el => {
            if(el.id == state.currentUser.id){
              return {...(action.data), id: state.currentUser.id}
            }else{
              return el
            }
          });
          return stateCopy;
        }
		default:{
			return state;
		}
	}
}

export const ActionCreator = {
    setData: (data) => {
        return {
            type: "",
            data: data
        }
    }
}

export default PeopleReducer;

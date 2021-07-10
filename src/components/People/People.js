import React, {useState} from 'react';
import {connect} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Table from './Table';

const Participants = (props) => {
    let [path, setPath] = useState(0)
    let [sort, setSort] = useState({key: "date", type: false})
    let [people, setPeople] = useState(props.people)
    const sizePath = 5 //Размер одной страницы
    let maxPath = props.people.length / sizePath //Максимальная страница

    //Котроль за номером страницы, чтоб не было отрицательной страницы
    let changePath = (newPath) => {
        if(newPath >= 0 && newPath < maxPath){
            setPath(newPath)
        }
    }
    //Изменение сортировки по направлению или по столбцу
    let changeSort = (newSort) => {
        let temp = {}
        if(newSort == sort.key){
            temp = {key: newSort, type: !(sort.type)}
        }else{
            temp = {key: newSort, type: false}
        }
        setPath(0)
        setSort(temp)
        setPeople(people.sort((a, b) => {
            if(temp.type){
                return (a[temp.key] < b[temp.key])? -1: 1
            }else{
                return (a[temp.key] > b[temp.key])? -1: 1
            }
        }))
    }
    return (
        <div>
            <Table 
                changeSort={changeSort}
                sort={sort}
                head={[
                    {title: "ФИО", key: "name"}, 
                    {title: "Дата регистрации", key: "date"}, 
                    {title: "Email", key: "email"},
                    {title: "Дистанция", key: "distance"},
                    {title: "Сумма взноса", key: "payment"}]} 
                data={people.slice(path*sizePath, (path+1)*sizePath)}/>
            
            <div>
                <button className="btn btn-primary" onClick={() => changePath(path - 1)}>Назад</button>
                <span style={{fontSize: "18px"}} className="mr-2 ml-2">{path}</span>
                <button className="btn btn-primary" onClick={() => changePath(path + 1)}>Далее</button>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        people: state.people.users
    }
}; 
//Написать диспач для добавления участника
let mapDispatchToProps = (dispatch) => {
    return {}
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Participants);
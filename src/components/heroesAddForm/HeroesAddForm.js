// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {heroAdd} from "../../actions";
import {useState} from "react";

const HeroesAddForm = () => {

    const [hero, setHero] = useState({
        id:uuidv4(),
        name: '',
        description: '',
        element: '',
    });
    const dispatch = useDispatch();
    const {request} = useHttp()

    const {filters} = useSelector(state => state);

    const clearForm = () => {
        setHero({
            id:uuidv4(),
            name: '',
            description: '',
            element: '',
        });
    }

    const onValueChange = (e) => {
        setHero((hero) => ({...hero, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('1111', hero)

        if(hero.name !== ''&&
            hero.description !== ''&&
            hero.element !== ''){

            // const id = uuidv4();
            // console.log('id', id)
            // setHero((hero) => ({...hero, id}));
            console.log('hero', hero);
            request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
                .then(res => console.log(res, 'Success'))
                .then(dispatch(heroAdd(hero)))
                .catch(err => console.log(err));

            clearForm();
        }
    }


    const content = filters.map(filter => {
        return <option value={filter.name}>{filter.value}</option>
    });



    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={onValueChange}
                    value={hero.name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={onValueChange}
                    value={hero.description}
                    required
                    name="description"
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={onValueChange}
                    value={hero.element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option>Я владею элементом...</option>
                    {content}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
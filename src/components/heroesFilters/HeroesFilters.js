
import {useHttp} from "../../hooks/http.hook";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError} from "../../actions";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus, currentFilter} = useSelector(state => state);

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFiltersList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({value, className, name}) => {
            const btnClass = classNames('btn',className, {
                'active': name === currentFilter
            });
            return <button
                key={name}
                id={name}
                className={btnClass}
                onClick={() => {console.log('test');dispatch(activeFilterChanged(name))}}
            >{value}</button>
        })
    }
    const elements = renderFiltersList(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
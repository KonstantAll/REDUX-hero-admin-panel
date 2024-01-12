const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus:'idle',
    currentFilter:'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.currentFilter === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.currentFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            const newHeroList = state.heroes.filter((hero) => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.currentFilter === 'all' ?
                    newHeroList:
                    newHeroList.filter(hero => hero.element === state.currentFilter)
            }
        case 'HERO_ADD':
            const newCreatedHeroesList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroesList,
                filteredHeroes: state.currentFilter === 'all' ?
                    newCreatedHeroesList:
                    newCreatedHeroesList.filter(hero => hero.element === state.currentFilter)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            console.log('change filter', action.payload)
            return {
                ...state,
                currentFilter: action.payload,
                filteredHeroes: state.currentFilter === 'all' ?
                    state.heroes:
                    state.heroes.filter(hero => {
                        console.log('state.currentFilter',state.currentFilter)
                        return hero.element === state.currentFilter
                    })
            }
        default: return state
    }
}

export default reducer;
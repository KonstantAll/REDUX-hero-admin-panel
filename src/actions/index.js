export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}

export const heroAdd = (hero) => {
    return {
        type: 'HERO_ADD',
        payload: hero
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (heroes) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: heroes
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (name) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: name,
    }
}
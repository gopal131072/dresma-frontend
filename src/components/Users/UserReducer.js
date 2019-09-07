const initialState = {
    loading: false,
    data: [],
    total: 0,
    page: 1,
    page_size: 10,
    active_item: null
}

export const USERREDUCER = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USERS':
            return {
                ...state,
                data: action.data
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.data
            }
        case 'SET_TOTAL':
            return {
                ...state,
                total: action.data
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.data
            }
        case 'SET_PAGE_SIZE':
            return {
                ...state,
                page_size: action.data
            }
        case 'SET_ACTIVE_ITEM':
            return {
                ...state,
                active_item: action.data
            }
        case 'RESET_USER_REDUCER':
            return initialState;
        default:
            return state;
    }
}
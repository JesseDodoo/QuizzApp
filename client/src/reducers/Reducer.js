const initState = { players: [], quiz:[], loading: false, error: false };



const Reducer = (state=initState, action) => {
    switch(action.type){
        case 'LOADING_PLAYERS':
            return { ...state, players: action.payload, loading: true };
        case 'LOADING_QUIZ':
            return { ...state, quiz: action.payload, loading: true };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false }

        default: return state
    };
};


export default Reducer;
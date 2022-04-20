const initState = { players: [], quiz: [], loading: false, error: false };



const Reducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_PLAYERS':
            return { ...state, players: action.payload, loading: true };
        case 'LOADING_QUIZ':
            return { ...state, quiz: action.payload, loading: true };
        case 'EMPTY_QUIZ':
            return initState;
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_SCORE':
            const updateScore = state.players.find(player => player.playerName === action.payload.playerName);
            const index = state.players.indexOf(updateScore);
            // Using slice is very common for this logic, it's worth getting comfy with slice!
            const updatedPlayers = [...state.players.slice(0, index), action.payload, ...state.players.slice(index + 1)]
            return { ...state, players: updatedPlayers }

        default: return state
    };
};


export default Reducer;
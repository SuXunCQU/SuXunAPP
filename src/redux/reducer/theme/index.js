import Types from '../../action/types'
import GlobalStyle from '../../../res/style/GlobalStyle';

const defaultState = {
    color: "#00e0c7"
};

export default function onAction(state=defaultState, action){
    switch(action.type){
        case Types.THEME_CHANGE:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
    }
}

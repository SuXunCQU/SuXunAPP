import Types from '../types';

export function onAddNewCoordinate(coordinate){
    return {type: Types.ADD_NEW_COORDINATE, coordinate};
}

import Types from '../types';

export function onThemeChange(color){
    return {type: Types.THEME_CHANGE, color};
}
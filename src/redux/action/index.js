import {onThemeChange} from './theme';
import {onAddJoinListItem, onLoadJoinedListData} from './joinedList';
import {onLoadRecruitListData, onSetRecruitListData} from "./recruitList";
import {onMainTaskChange, onMainTaskDetailChange} from './taskitem';
import {setUsername, setPassword, setToken, setMemberId, setMemberPhoto} from "./user";
import {onAddNewCoordinate} from "./map";

export default {
    onThemeChange,
    onLoadJoinedListData,
    loadRecruitListData: onLoadRecruitListData,
    onSetRecruitListData,
    onMainTaskChange,
    onMainTaskDetailChange,
    setUsername,
    setPassword,
    setToken,
    setMemberId,
    setMemberPhoto,
    onAddNewCoordinate,
    onAddJoinListItem,
};

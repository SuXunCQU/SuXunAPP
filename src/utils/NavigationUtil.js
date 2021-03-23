export default class NavigationUtil {
    /**
     * 返回上一页
     * @param navigation
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 跳转到指定页面
     * @param {*} params 要传递的参数
     * @param {string} page 要跳转的页面名（页面路由名）
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        console.log(`page: ${page}`);
        console.log(navigation);
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null');
        }
        navigation.navigate(page, {...params,});
    }

    /**
     * 重置到首页
     * @param {*} params 
     */
    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate("Main");
    }
}
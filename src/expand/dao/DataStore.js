import { AsyncStorage } from 'react-native';

export default class DataStore {

    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param {*} url
     */
    fetchData(url){
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then((wrapData) => {
                    if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)){
                        resolve(wrapData);
                    }
                    else{
                        this.fetchNetData(url)
                            .then((data) => {
                                resolve(this._wrapData(data));
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    this.fetchNetData(url)
                        .then((data) => {
                            resolve(this._wrapData(data))
                        })
                        .catch((error) => {
                            reject(error);
                        })
                })
        })
    }

    /**
     * 保存数据
     * @param {string} url
     * @param {*} data
     * @param {function} callback
     */
    saveData(url, data, callback) {
        if(!data || !url)
            return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 获取本地数据
     * @param {*} url
     * @returns {Promise}
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if(!error){
                    try{
                        console.log("已获取本地数据");
                        resolve(JSON.parse(result));
                    } catch(e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param {string} url
     * @returns {Promise}
     */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Network response was NOT ok");
                })
                .then((responseData) => {
                    this.saveData(url, responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if(currentDate.getMonth() !== targetDate.getMonth()) return false;
        if(currentDate.getDate() !== targetDate.getDate()) return false;
        if(currentDate.getHours() - targetDate.getHours() > 4) return false; // 有效期为4个小时
        return true;
    }
}

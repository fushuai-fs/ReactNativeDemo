import {Component} from 'react';
import { AsyncStorage } from 'react-native'
import JsonUtil from './JsonUtility'

// 学习
export default class StorageUtility extends Component  {
    /*
         * 保存
         * */
    static save(key, value, callback) {
          // alert(JsonUtil.jsonToStr(value)+'\r\n storage');
        return AsyncStorage.setItem(key, JsonUtil.jsonToStr(value), callback);
    }
    /*
     * 获取
     * */
    static get(key,callback) {

           return AsyncStorage.getItem(key,callback);
        //JsonUtil.strToJson(json);
        // alert(key+'--'+json1.msg+"\r\n storage");//  alert(json.msg)
        // return json1;
    }
    /*
     * 更新
     * */
    static update(key, value, callback) {
        StorageUtil.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JsonUtil.jsonToStr(value), callback);
        })
    }
    /*
     * 删除
     * */
    static delete(key, callback) {
        AsyncStorage.removeItem(key, callback);
    }
    /*
   * 删除多个
   * */
    static multiDelete(keys, callback) {
        AsyncStorage.multiRemove(keys, callback);
    }
    static getAllKeys(callback){

    }
}
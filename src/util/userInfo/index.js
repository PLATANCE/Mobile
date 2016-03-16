'use strict';
import realm from '../realm';

let userInfos = realm.objects('UserInfo');

if (userInfos.length == 0) {

    realm.write(() => {

        realm.create('UserInfo', {});

    });

}
let userInfo = userInfos[0];

module.exports = userInfo;

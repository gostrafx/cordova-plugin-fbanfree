// import exec from 'cordova/exec'
// import { exec, getAdUnitId } from './driver'
var exec = require('cordova/exec')

/**
 * @ignore
 */
function execute(method, args) {
    return new Promise((resolve, reject) => {
        exec(resolve, reject, 'FBANFree', method, [args])
    });
}

var nextId = 100
var adUnits = {}

function getAdUnitId(adUnitId) {
    if (adUnits[adUnitId]) {
      return adUnits[adUnitId]
    }
    adUnits[adUnitId] = nextId
    nextId += 1
    return adUnits[adUnitId]
}

function bannerConfig(placementID) {
    return {
        placementID: placementID,
        adSize: 1,
        position: 'bottom',
        id: getAdUnitId(placementID)
    }
}

function adConfig(placementID) {
    return {
        placementID: placementID,
        id: getAdUnitId(placementID)
    }
}

exports.ready = function() {
    return execute('ready', {});
}

exports.showBanner = function(placementID) {
    return execute('banner_show', bannerConfig(placementID));
    // return execute('banner_show', bannerConfig('1345786662228899_1352655241542041'));
}

exports.hideBanner = function(placementID) {
    return execute('banner_hide', {id: getAdUnitId(placementID)})
    // return execute('banner_hide', {id: getAdUnitId('1345786662228899_1352655241542041')})
}

exports.showInterstitial = function(placementID) {
    return execute('interstitial_show', adConfig(placementID));
    // return execute('interstitial_show', adConfig('1345786662228899_1352651671542398'));
}

exports.showRewardedVideo = function(placementID) {
    return execute('reward_video_show', adConfig(placementID));
}

exports.showNative = function(placementID) {
    return execute('native_show', adConfig(placementID));
    // return execute('native_show', adConfig('1345786662228899_1352641741543391'));
}

exports.hideNative = function(placementID) {
    return execute('native_hide', {id: getAdUnitId(placementID)})
    // return execute('native_hide', {id: getAdUnitId('1345786662228899_1352641741543391')})
}

exports.showNativeBanner = function(placementID) {
    return execute('native_banner_show', adConfig(placementID));
    // return execute('native_banner_show', adConfig('1345786662228899_1352651668209065'));
}

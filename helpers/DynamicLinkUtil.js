const BASE_URL = 'https://lifology.page.link/'
const ANDROID_APPLICATION_PACKAGE = 'com.app.lifology'
const IOS_BUNDLE_ID = 'com.septa.app.lifology'
const ACCESS_TOKEN = 'AIzaSyBW_VPuXSDsjSjmOr2XPWbsBF_AqoDdgoI'
// const BASE_WEB_URL = 'http://localhost:3000'
const BASE_WEB_URL = 'https://demo.lifology.com'

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

async function createDynamicLink(url) {
    const params = {
        'link': BASE_WEB_URL + url,
        'apn': ANDROID_APPLICATION_PACKAGE,
        'ibi': IOS_BUNDLE_ID
    }
    const dynanicLink = BASE_URL + '?' + encodeQueryData(params)
    const data = {
        "longDynamicLink": dynanicLink,
        "suffix": {
            "option": "SHORT"
        }
    }
    const shortLink = await fetch('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + ACCESS_TOKEN, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => data.shortLink)
    return shortLink
}

export default createDynamicLink
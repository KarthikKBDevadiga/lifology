import Constants from "./Constants"

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

async function createDynamicLink(url) {
    const params = {
        'link': Constants.WEB_URL + url,
        'apn': Constants.ANDROID_APPLICATION_PACKAGE,
        'afl': Constants.WEB_URL + url,
        'ibi': Constants.IOS_BUNDLE_ID,
        'ifl': Constants.WEB_URL + url,
    }
    const dynanicLink = Constants.FIREBASE_DYNAMIC_LINK_PREFIX + '?' + encodeQueryData(params)
    const data = {
        "longDynamicLink": dynanicLink,
        "suffix": {
            "option": "SHORT"
        }
    }
    const shortLink = await fetch('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' + Constants.FIREBASE_ACCESS_TOKEN, {
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
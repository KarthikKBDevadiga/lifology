import Constants from "../../helpers/Constants"

export default function countries(req, res) {
    var data = [
        {
            "name": "Afghanistan",
            "callingCodes": "93",
            "flag": "/img/countries/af.svg",
            "code": "AF"
        },
        {
            "name": "Åland Islands",
            "callingCodes": "358",
            "flag": "/img/countries/ax.svg",
            "code": "AX"
        },
        {
            "name": "Albania",
            "callingCodes": "355",
            "flag": "/img/countries/al.svg",
            "code": "AL"
        },
        {
            "name": "Algeria",
            "callingCodes": "213",
            "flag": "/img/countries/dz.svg",
            "code": "DZ"
        },
        {
            "name": "American Samoa",
            "callingCodes": "1",
            "flag": "/img/countries/as.svg",
            "code": "AS"
        },
        {
            "name": "Andorra",
            "callingCodes": "376",
            "flag": "/img/countries/ad.svg",
            "code": "AD"
        },
        {
            "name": "Angola",
            "callingCodes": "244",
            "flag": "/img/countries/ao.svg",
            "code": "AO"
        },
        {
            "name": "Anguilla",
            "callingCodes": "1",
            "flag": "/img/countries/ai.svg",
            "code": "AI"
        },
        {
            "name": "Antarctica",
            "callingCodes": "672",
            "flag": "/img/countries/aq.svg",
            "code": "AQ"
        },
        {
            "name": "Antigua and Barbuda",
            "callingCodes": "1",
            "flag": "/img/countries/ag.svg",
            "code": "AG"
        },
        {
            "name": "Argentina",
            "callingCodes": "54",
            "flag": "/img/countries/ar.svg",
            "code": "AR"
        },
        {
            "name": "Armenia",
            "callingCodes": "374",
            "flag": "/img/countries/am.svg",
            "code": "AM"
        },
        {
            "name": "Aruba",
            "callingCodes": "297",
            "flag": "/img/countries/aw.svg",
            "code": "AW"
        },
        {
            "name": "Australia",
            "callingCodes": "61",
            "flag": "/img/countries/au.svg",
            "code": "AU"
        },
        {
            "name": "Austria",
            "callingCodes": "43",
            "flag": "/img/countries/at.svg",
            "code": "AT"
        },
        {
            "name": "Azerbaijan",
            "callingCodes": "994",
            "flag": "/img/countries/az.svg",
            "code": "AZ"
        },
        {
            "name": "Bahamas",
            "callingCodes": "1",
            "flag": "/img/countries/bs.svg",
            "code": "BS"
        },
        {
            "name": "Bahrain",
            "callingCodes": "973",
            "flag": "/img/countries/bh.svg",
            "code": "BH"
        },
        {
            "name": "Bangladesh",
            "callingCodes": "880",
            "flag": "/img/countries/bd.svg",
            "code": "BD"
        },
        {
            "name": "Barbados",
            "callingCodes": "1",
            "flag": "/img/countries/bb.svg",
            "code": "BB"
        },
        {
            "name": "Belarus",
            "callingCodes": "375",
            "flag": "/img/countries/by.svg",
            "code": "BY"
        },
        {
            "name": "Belgium",
            "callingCodes": "32",
            "flag": "/img/countries/be.svg",
            "code": "BE"
        },
        {
            "name": "Belize",
            "callingCodes": "501",
            "flag": "/img/countries/bz.svg",
            "code": "BZ"
        },
        {
            "name": "Benin",
            "callingCodes": "229",
            "flag": "/img/countries/bj.svg",
            "code": "BJ"
        },
        {
            "name": "Bermuda",
            "callingCodes": "1",
            "flag": "/img/countries/bm.svg",
            "code": "BM"
        },
        {
            "name": "Bhutan",
            "callingCodes": "975",
            "flag": "/img/countries/bt.svg",
            "code": "BT"
        },
        {
            "name": "Bolivia (Plurinational State of)",
            "callingCodes": "591",
            "flag": "/img/countries/bo.svg",
            "code": "BO"
        },
        {
            "name": "Bonaire, Sint Eustatius and Saba",
            "callingCodes": "599",
            "flag": "/img/countries/bq.svg",
            "code": "BQ"
        },
        {
            "name": "Bosnia and Herzegovina",
            "callingCodes": "387",
            "flag": "/img/countries/ba.svg",
            "code": "BA"
        },
        {
            "name": "Botswana",
            "callingCodes": "267",
            "flag": "/img/countries/bw.svg",
            "code": "BW"
        },
        {
            "name": "Bouvet Island",
            "callingCodes": "47",
            "flag": "/img/countries/bv.svg",
            "code": "BV"
        },
        {
            "name": "Brazil",
            "callingCodes": "55",
            "flag": "/img/countries/br.svg",
            "code": "BR"
        },
        {
            "name": "British Indian Ocean Territory",
            "callingCodes": "246",
            "flag": "/img/countries/io.svg",
            "code": "IO"
        },
        {
            "name": "United States Minor Outlying Islands",
            "callingCodes": "1",
            "flag": "/img/countries/um.svg",
            "code": "UM"
        },
        {
            "name": "Virgin Islands (British)",
            "callingCodes": "1",
            "flag": "/img/countries/vg.svg",
            "code": "VG"
        },
        {
            "name": "Virgin Islands (U.S.)",
            "callingCodes": "1 340",
            "flag": "/img/countries/vi.svg",
            "code": "VI"
        },
        {
            "name": "Brunei Darussalam",
            "callingCodes": "673",
            "flag": "/img/countries/bn.svg",
            "code": "BN"
        },
        {
            "name": "Bulgaria",
            "callingCodes": "359",
            "flag": "/img/countries/bg.svg",
            "code": "BG"
        },
        {
            "name": "Burkina Faso",
            "callingCodes": "226",
            "flag": "/img/countries/bf.svg",
            "code": "BF"
        },
        {
            "name": "Burundi",
            "callingCodes": "257",
            "flag": "/img/countries/bi.svg",
            "code": "BI"
        },
        {
            "name": "Cambodia",
            "callingCodes": "855",
            "flag": "/img/countries/kh.svg",
            "code": "KH"
        },
        {
            "name": "Cameroon",
            "callingCodes": "237",
            "flag": "/img/countries/cm.svg",
            "code": "CM"
        },
        {
            "name": "Canada",
            "callingCodes": "1",
            "flag": "/img/countries/ca.svg",
            "code": "CA"
        },
        {
            "name": "Cabo Verde",
            "callingCodes": "238",
            "flag": "/img/countries/cv.svg",
            "code": "CV"
        },
        {
            "name": "Cayman Islands",
            "callingCodes": "1",
            "flag": "/img/countries/ky.svg",
            "code": "KY"
        },
        {
            "name": "Central African Republic",
            "callingCodes": "236",
            "flag": "/img/countries/cf.svg",
            "code": "CF"
        },
        {
            "name": "Chad",
            "callingCodes": "235",
            "flag": "/img/countries/td.svg",
            "code": "TD"
        },
        {
            "name": "Chile",
            "callingCodes": "56",
            "flag": "/img/countries/cl.svg",
            "code": "CL"
        },
        {
            "name": "China",
            "callingCodes": "86",
            "flag": "/img/countries/cn.svg",
            "code": "CN"
        },
        {
            "name": "Christmas Island",
            "callingCodes": "61",
            "flag": "/img/countries/cx.svg",
            "code": "CX"
        },
        {
            "name": "Cocos (Keeling) Islands",
            "callingCodes": "61",
            "flag": "/img/countries/cc.svg",
            "code": "CC"
        },
        {
            "name": "Colombia",
            "callingCodes": "57",
            "flag": "/img/countries/co.svg",
            "code": "CO"
        },
        {
            "name": "Comoros",
            "callingCodes": "269",
            "flag": "/img/countries/km.svg",
            "code": "KM"
        },
        {
            "name": "Congo",
            "callingCodes": "242",
            "flag": "/img/countries/cg.svg",
            "code": "CG"
        },
        {
            "name": "Congo (Democratic Republic of the)",
            "callingCodes": "243",
            "flag": "/img/countries/cd.svg",
            "code": "CD"
        },
        {
            "name": "Cook Islands",
            "callingCodes": "682",
            "flag": "/img/countries/ck.svg",
            "code": "CK"
        },
        {
            "name": "Costa Rica",
            "callingCodes": "506",
            "flag": "/img/countries/cr.svg",
            "code": "CR"
        },
        {
            "name": "Croatia",
            "callingCodes": "385",
            "flag": "/img/countries/hr.svg",
            "code": "HR"
        },
        {
            "name": "Cuba",
            "callingCodes": "53",
            "flag": "/img/countries/cu.svg",
            "code": "CU"
        },
        {
            "name": "Curaçao",
            "callingCodes": "599",
            "flag": "/img/countries/cw.svg",
            "code": "CW"
        },
        {
            "name": "Cyprus",
            "callingCodes": "357",
            "flag": "/img/countries/cy.svg",
            "code": "CY"
        },
        {
            "name": "Czech Republic",
            "callingCodes": "420",
            "flag": "/img/countries/cz.svg",
            "code": "CZ"
        },
        {
            "name": "Denmark",
            "callingCodes": "45",
            "flag": "/img/countries/dk.svg",
            "code": "DK"
        },
        {
            "name": "Djibouti",
            "callingCodes": "253",
            "flag": "/img/countries/dj.svg",
            "code": "DJ"
        },
        {
            "name": "Dominica",
            "callingCodes": "1",
            "flag": "/img/countries/dm.svg",
            "code": "DM"
        },
        {
            "name": "Dominican Republic",
            "callingCodes": "1",
            "flag": "/img/countries/do.svg",
            "code": "DO"
        },
        {
            "name": "Ecuador",
            "callingCodes": "593",
            "flag": "/img/countries/ec.svg",
            "code": "EC"
        },
        {
            "name": "Egypt",
            "callingCodes": "20",
            "flag": "/img/countries/eg.svg",
            "code": "EG"
        },
        {
            "name": "El Salvador",
            "callingCodes": "503",
            "flag": "/img/countries/sv.svg",
            "code": "SV"
        },
        {
            "name": "Equatorial Guinea",
            "callingCodes": "240",
            "flag": "/img/countries/gq.svg",
            "code": "GQ"
        },
        {
            "name": "Eritrea",
            "callingCodes": "291",
            "flag": "/img/countries/er.svg",
            "code": "ER"
        },
        {
            "name": "Estonia",
            "callingCodes": "372",
            "flag": "/img/countries/ee.svg",
            "code": "EE"
        },
        {
            "name": "Ethiopia",
            "callingCodes": "251",
            "flag": "/img/countries/et.svg",
            "code": "ET"
        },
        {
            "name": "Falkland Islands (Malvinas)",
            "callingCodes": "500",
            "flag": "/img/countries/fk.svg",
            "code": "FK"
        },
        {
            "name": "Faroe Islands",
            "callingCodes": "298",
            "flag": "/img/countries/fo.svg",
            "code": "FO"
        },
        {
            "name": "Fiji",
            "callingCodes": "679",
            "flag": "/img/countries/fj.svg",
            "code": "FJ"
        },
        {
            "name": "Finland",
            "callingCodes": "358",
            "flag": "/img/countries/fi.svg",
            "code": "FI"
        },
        {
            "name": "France",
            "callingCodes": "33",
            "flag": "/img/countries/fr.svg",
            "code": "FR"
        },
        {
            "name": "French Guiana",
            "callingCodes": "594",
            "flag": "/img/countries/gf.svg",
            "code": "GF"
        },
        {
            "name": "French Polynesia",
            "callingCodes": "689",
            "flag": "/img/countries/pf.svg",
            "code": "PF"
        },
        {
            "name": "French Southern Territories",
            "callingCodes": "262",
            "flag": "/img/countries/tf.svg",
            "code": "TF"
        },
        {
            "name": "Gabon",
            "callingCodes": "241",
            "flag": "/img/countries/ga.svg",
            "code": "GA"
        },
        {
            "name": "Gambia",
            "callingCodes": "220",
            "flag": "/img/countries/gm.svg",
            "code": "GM"
        },
        {
            "name": "Georgia",
            "callingCodes": "995",
            "flag": "/img/countries/ge.svg",
            "code": "GE"
        },
        {
            "name": "Germany",
            "callingCodes": "49",
            "flag": "/img/countries/de.svg",
            "code": "DE"
        },
        {
            "name": "Ghana",
            "callingCodes": "233",
            "flag": "/img/countries/gh.svg",
            "code": "GH"
        },
        {
            "name": "Gibraltar",
            "callingCodes": "350",
            "flag": "/img/countries/gi.svg",
            "code": "GI"
        },
        {
            "name": "Greece",
            "callingCodes": "30",
            "flag": "/img/countries/gr.svg",
            "code": "GR"
        },
        {
            "name": "Greenland",
            "callingCodes": "299",
            "flag": "/img/countries/gl.svg",
            "code": "GL"
        },
        {
            "name": "Grenada",
            "callingCodes": "1",
            "flag": "/img/countries/gd.svg",
            "code": "GD"
        },
        {
            "name": "Guadeloupe",
            "callingCodes": "590",
            "flag": "/img/countries/gp.svg",
            "code": "GP"
        },
        {
            "name": "Guam",
            "callingCodes": "1",
            "flag": "/img/countries/gu.svg",
            "code": "GU"
        },
        {
            "name": "Guatemala",
            "callingCodes": "502",
            "flag": "/img/countries/gt.svg",
            "code": "GT"
        },
        {
            "name": "Guernsey",
            "callingCodes": "44",
            "flag": "/img/countries/gg.svg",
            "code": "GG"
        },
        {
            "name": "Guinea",
            "callingCodes": "224",
            "flag": "/img/countries/gn.svg",
            "code": "GN"
        },
        {
            "name": "Guinea-Bissau",
            "callingCodes": "245",
            "flag": "/img/countries/gw.svg",
            "code": "GW"
        },
        {
            "name": "Guyana",
            "callingCodes": "592",
            "flag": "/img/countries/gy.svg",
            "code": "GY"
        },
        {
            "name": "Haiti",
            "callingCodes": "509",
            "flag": "/img/countries/ht.svg",
            "code": "HT"
        },
        {
            "name": "Heard Island and McDonald Islands",
            "callingCodes": "672",
            "flag": "/img/countries/hm.svg",
            "code": "HM"
        },
        {
            "name": "Holy See",
            "callingCodes": "379",
            "flag": "/img/countries/va.svg",
            "code": "VA"
        },
        {
            "name": "Honduras",
            "callingCodes": "504",
            "flag": "/img/countries/hn.svg",
            "code": "HN"
        },
        {
            "name": "Hong Kong",
            "callingCodes": "852",
            "flag": "/img/countries/hk.svg",
            "code": "HK"
        },
        {
            "name": "Hungary",
            "callingCodes": "36",
            "flag": "/img/countries/hu.svg",
            "code": "HU"
        },
        {
            "name": "Iceland",
            "callingCodes": "354",
            "flag": "/img/countries/is.svg",
            "code": "IS"
        },
        {
            "name": "India",
            "callingCodes": "91",
            "flag": "/img/countries/in.svg",
            "code": "IN"
        },
        {
            "name": "Indonesia",
            "callingCodes": "62",
            "flag": "/img/countries/id.svg",
            "code": "ID"
        },
        {
            "name": "Côte d'Ivoire",
            "callingCodes": "225",
            "flag": "/img/countries/ci.svg",
            "code": "CI"
        },
        {
            "name": "Iran (Islamic Republic of)",
            "callingCodes": "98",
            "flag": "/img/countries/ir.svg",
            "code": "IR"
        },
        {
            "name": "Iraq",
            "callingCodes": "964",
            "flag": "/img/countries/iq.svg",
            "code": "IQ"
        },
        {
            "name": "Ireland",
            "callingCodes": "353",
            "flag": "/img/countries/ie.svg",
            "code": "IE"
        },
        {
            "name": "Isle of Man",
            "callingCodes": "44",
            "flag": "/img/countries/im.svg",
            "code": "IM"
        },
        {
            "name": "Israel",
            "callingCodes": "972",
            "flag": "/img/countries/il.svg",
            "code": "IL"
        },
        {
            "name": "Italy",
            "callingCodes": "39",
            "flag": "/img/countries/it.svg",
            "code": "IT"
        },
        {
            "name": "Jamaica",
            "callingCodes": "1",
            "flag": "/img/countries/jm.svg",
            "code": "JM"
        },
        {
            "name": "Japan",
            "callingCodes": "81",
            "flag": "/img/countries/jp.svg",
            "code": "JP"
        },
        {
            "name": "Jersey",
            "callingCodes": "44",
            "flag": "/img/countries/je.svg",
            "code": "JE"
        },
        {
            "name": "Jordan",
            "callingCodes": "962",
            "flag": "/img/countries/jo.svg",
            "code": "JO"
        },
        {
            "name": "Kazakhstan",
            "callingCodes": "76",
            "flag": "/img/countries/kz.svg",
            "code": "KZ"
        },
        {
            "name": "Kenya",
            "callingCodes": "254",
            "flag": "/img/countries/ke.svg",
            "code": "KE"
        },
        {
            "name": "Kiribati",
            "callingCodes": "686",
            "flag": "/img/countries/ki.svg",
            "code": "KI"
        },
        {
            "name": "Kuwait",
            "callingCodes": "965",
            "flag": "/img/countries/kw.svg",
            "code": "KW"
        },
        {
            "name": "Kyrgyzstan",
            "callingCodes": "996",
            "flag": "/img/countries/kg.svg",
            "code": "KG"
        },
        {
            "name": "Lao People's Democratic Republic",
            "callingCodes": "856",
            "flag": "/img/countries/la.svg",
            "code": "LA"
        },
        {
            "name": "Latvia",
            "callingCodes": "371",
            "flag": "/img/countries/lv.svg",
            "code": "LV"
        },
        {
            "name": "Lebanon",
            "callingCodes": "961",
            "flag": "/img/countries/lb.svg",
            "code": "LB"
        },
        {
            "name": "Lesotho",
            "callingCodes": "266",
            "flag": "/img/countries/ls.svg",
            "code": "LS"
        },
        {
            "name": "Liberia",
            "callingCodes": "231",
            "flag": "/img/countries/lr.svg",
            "code": "LR"
        },
        {
            "name": "Libya",
            "callingCodes": "218",
            "flag": "/img/countries/ly.svg",
            "code": "LY"
        },
        {
            "name": "Liechtenstein",
            "callingCodes": "423",
            "flag": "/img/countries/li.svg",
            "code": "LI"
        },
        {
            "name": "Lithuania",
            "callingCodes": "370",
            "flag": "/img/countries/lt.svg",
            "code": "LT"
        },
        {
            "name": "Luxembourg",
            "callingCodes": "352",
            "flag": "/img/countries/lu.svg",
            "code": "LU"
        },
        {
            "name": "Macao",
            "callingCodes": "853",
            "flag": "/img/countries/mo.svg",
            "code": "MO"
        },
        {
            "name": "Macedonia (the former Yugoslav Republic of)",
            "callingCodes": "389",
            "flag": "/img/countries/mk.svg",
            "code": "MK"
        },
        {
            "name": "Madagascar",
            "callingCodes": "261",
            "flag": "/img/countries/mg.svg",
            "code": "MG"
        },
        {
            "name": "Malawi",
            "callingCodes": "265",
            "flag": "/img/countries/mw.svg",
            "code": "MW"
        },
        {
            "name": "Malaysia",
            "callingCodes": "60",
            "flag": "/img/countries/my.svg",
            "code": "MY"
        },
        {
            "name": "Maldives",
            "callingCodes": "960",
            "flag": "/img/countries/mv.svg",
            "code": "MV"
        },
        {
            "name": "Mali",
            "callingCodes": "223",
            "flag": "/img/countries/ml.svg",
            "code": "ML"
        },
        {
            "name": "Malta",
            "callingCodes": "356",
            "flag": "/img/countries/mt.svg",
            "code": "MT"
        },
        {
            "name": "Marshall Islands",
            "callingCodes": "692",
            "flag": "/img/countries/mh.svg",
            "code": "MH"
        },
        {
            "name": "Martinique",
            "callingCodes": "596",
            "flag": "/img/countries/mq.svg",
            "code": "MQ"
        },
        {
            "name": "Mauritania",
            "callingCodes": "222",
            "flag": "/img/countries/mr.svg",
            "code": "MR"
        },
        {
            "name": "Mauritius",
            "callingCodes": "230",
            "flag": "/img/countries/mu.svg",
            "code": "MU"
        },
        {
            "name": "Mayotte",
            "callingCodes": "262",
            "flag": "/img/countries/yt.svg",
            "code": "YT"
        },
        {
            "name": "Mexico",
            "callingCodes": "52",
            "flag": "/img/countries/mx.svg",
            "code": "MX"
        },
        {
            "name": "Micronesia (Federated States of)",
            "callingCodes": "691",
            "flag": "/img/countries/fm.svg",
            "code": "FM"
        },
        {
            "name": "Moldova (Republic of)",
            "callingCodes": "373",
            "flag": "/img/countries/md.svg",
            "code": "MD"
        },
        {
            "name": "Monaco",
            "callingCodes": "377",
            "flag": "/img/countries/mc.svg",
            "code": "MC"
        },
        {
            "name": "Mongolia",
            "callingCodes": "976",
            "flag": "/img/countries/mn.svg",
            "code": "MN"
        },
        {
            "name": "Montenegro",
            "callingCodes": "382",
            "flag": "/img/countries/me.svg",
            "code": "ME"
        },
        {
            "name": "Montserrat",
            "callingCodes": "1",
            "flag": "/img/countries/ms.svg",
            "code": "MS"
        },
        {
            "name": "Morocco",
            "callingCodes": "212",
            "flag": "/img/countries/ma.svg",
            "code": "MA"
        },
        {
            "name": "Mozambique",
            "callingCodes": "258",
            "flag": "/img/countries/mz.svg",
            "code": "MZ"
        },
        {
            "name": "Myanmar",
            "callingCodes": "95",
            "flag": "/img/countries/mm.svg",
            "code": "MM"
        },
        {
            "name": "Namibia",
            "callingCodes": "264",
            "flag": "/img/countries/na.svg",
            "code": "NA"
        },
        {
            "name": "Nauru",
            "callingCodes": "674",
            "flag": "/img/countries/nr.svg",
            "code": "NR"
        },
        {
            "name": "Nepal",
            "callingCodes": "977",
            "flag": "/img/countries/np.svg",
            "code": "NP"
        },
        {
            "name": "Netherlands",
            "callingCodes": "31",
            "flag": "/img/countries/nl.svg",
            "code": "NL"
        },
        {
            "name": "New Caledonia",
            "callingCodes": "687",
            "flag": "/img/countries/nc.svg",
            "code": "NC"
        },
        {
            "name": "New Zealand",
            "callingCodes": "64",
            "flag": "/img/countries/nz.svg",
            "code": "NZ"
        },
        {
            "name": "Nicaragua",
            "callingCodes": "505",
            "flag": "/img/countries/ni.svg",
            "code": "NI"
        },
        {
            "name": "Niger",
            "callingCodes": "227",
            "flag": "/img/countries/ne.svg",
            "code": "NE"
        },
        {
            "name": "Nigeria",
            "callingCodes": "234",
            "flag": "/img/countries/ng.svg",
            "code": "NG"
        },
        {
            "name": "Niue",
            "callingCodes": "683",
            "flag": "/img/countries/nu.svg",
            "code": "NU"
        },
        {
            "name": "Norfolk Island",
            "callingCodes": "672",
            "flag": "/img/countries/nf.svg",
            "code": "NF"
        },
        {
            "name": "Korea (Democratic People's Republic of)",
            "callingCodes": "850",
            "flag": "/img/countries/kp.svg",
            "code": "KP"
        },
        {
            "name": "Northern Mariana Islands",
            "callingCodes": "1",
            "flag": "/img/countries/mp.svg",
            "code": "MP"
        },
        {
            "name": "Norway",
            "callingCodes": "47",
            "flag": "/img/countries/no.svg",
            "code": "NO"
        },
        {
            "name": "Oman",
            "callingCodes": "968",
            "flag": "/img/countries/om.svg",
            "code": "OM"
        },
        {
            "name": "Pakistan",
            "callingCodes": "92",
            "flag": "/img/countries/pk.svg",
            "code": "PK"
        },
        {
            "name": "Palau",
            "callingCodes": "680",
            "flag": "/img/countries/pw.svg",
            "code": "PW"
        },
        {
            "name": "Palestine, State of",
            "callingCodes": "970",
            "flag": "/img/countries/ps.svg",
            "code": "PS"
        },
        {
            "name": "Panama",
            "callingCodes": "507",
            "flag": "/img/countries/pa.svg",
            "code": "PA"
        },
        {
            "name": "Papua New Guinea",
            "callingCodes": "675",
            "flag": "/img/countries/pg.svg",
            "code": "PG"
        },
        {
            "name": "Paraguay",
            "callingCodes": "595",
            "flag": "/img/countries/py.svg",
            "code": "PY"
        },
        {
            "name": "Peru",
            "callingCodes": "51",
            "flag": "/img/countries/pe.svg",
            "code": "PE"
        },
        {
            "name": "Philippines",
            "callingCodes": "63",
            "flag": "/img/countries/ph.svg",
            "code": "PH"
        },
        {
            "name": "Pitcairn",
            "callingCodes": "64",
            "flag": "/img/countries/pn.svg",
            "code": "PN"
        },
        {
            "name": "Poland",
            "callingCodes": "48",
            "flag": "/img/countries/pl.svg",
            "code": "PL"
        },
        {
            "name": "Portugal",
            "callingCodes": "351",
            "flag": "/img/countries/pt.svg",
            "code": "PT"
        },
        {
            "name": "Puerto Rico",
            "callingCodes": "1",
            "flag": "/img/countries/pr.svg",
            "code": "PR"
        },
        {
            "name": "Qatar",
            "callingCodes": "974",
            "flag": "/img/countries/qa.svg",
            "code": "QA"
        },
        {
            "name": "Republic of Kosovo",
            "callingCodes": "383",
            "flag": "/img/countries/xk.svg",
            "code": "XK"
        },
        {
            "name": "Réunion",
            "callingCodes": "262",
            "flag": "/img/countries/re.svg",
            "code": "RE"
        },
        {
            "name": "Romania",
            "callingCodes": "40",
            "flag": "/img/countries/ro.svg",
            "code": "RO"
        },
        {
            "name": "Russian Federation",
            "callingCodes": "7",
            "flag": "/img/countries/ru.svg",
            "code": "RU"
        },
        {
            "name": "Rwanda",
            "callingCodes": "250",
            "flag": "/img/countries/rw.svg",
            "code": "RW"
        },
        {
            "name": "Saint Barthélemy",
            "callingCodes": "590",
            "flag": "/img/countries/bl.svg",
            "code": "BL"
        },
        {
            "name": "Saint Helena, Ascension and Tristan da Cunha",
            "callingCodes": "290",
            "flag": "/img/countries/sh.svg",
            "code": "SH"
        },
        {
            "name": "Saint Kitts and Nevis",
            "callingCodes": "1",
            "flag": "/img/countries/kn.svg",
            "code": "KN"
        },
        {
            "name": "Saint Lucia",
            "callingCodes": "1",
            "flag": "/img/countries/lc.svg",
            "code": "LC"
        },
        {
            "name": "Saint Martin (French part)",
            "callingCodes": "590",
            "flag": "/img/countries/mf.svg",
            "code": "MF"
        },
        {
            "name": "Saint Pierre and Miquelon",
            "callingCodes": "508",
            "flag": "/img/countries/pm.svg",
            "code": "PM"
        },
        {
            "name": "Saint Vincent and the Grenadines",
            "callingCodes": "1",
            "flag": "/img/countries/vc.svg",
            "code": "VC"
        },
        {
            "name": "Samoa",
            "callingCodes": "685",
            "flag": "/img/countries/ws.svg",
            "code": "WS"
        },
        {
            "name": "San Marino",
            "callingCodes": "378",
            "flag": "/img/countries/sm.svg",
            "code": "SM"
        },
        {
            "name": "Sao Tome and Principe",
            "callingCodes": "239",
            "flag": "/img/countries/st.svg",
            "code": "ST"
        },
        {
            "name": "Saudi Arabia",
            "callingCodes": "966",
            "flag": "/img/countries/sa.svg",
            "code": "SA"
        },
        {
            "name": "Senegal",
            "callingCodes": "221",
            "flag": "/img/countries/sn.svg",
            "code": "SN"
        },
        {
            "name": "Serbia",
            "callingCodes": "381",
            "flag": "/img/countries/rs.svg",
            "code": "RS"
        },
        {
            "name": "Seychelles",
            "callingCodes": "248",
            "flag": "/img/countries/sc.svg",
            "code": "SC"
        },
        {
            "name": "Sierra Leone",
            "callingCodes": "232",
            "flag": "/img/countries/sl.svg",
            "code": "SL"
        },
        {
            "name": "Singapore",
            "callingCodes": "65",
            "flag": "/img/countries/sg.svg",
            "code": "SG"
        },
        {
            "name": "Sint Maarten (Dutch part)",
            "callingCodes": "1",
            "flag": "/img/countries/sx.svg",
            "code": "SX"
        },
        {
            "name": "Slovakia",
            "callingCodes": "421",
            "flag": "/img/countries/sk.svg",
            "code": "SK"
        },
        {
            "name": "Slovenia",
            "callingCodes": "386",
            "flag": "/img/countries/si.svg",
            "code": "SI"
        },
        {
            "name": "Solomon Islands",
            "callingCodes": "677",
            "flag": "/img/countries/sb.svg",
            "code": "SB"
        },
        {
            "name": "Somalia",
            "callingCodes": "252",
            "flag": "/img/countries/so.svg",
            "code": "SO"
        },
        {
            "name": "South Africa",
            "callingCodes": "27",
            "flag": "/img/countries/za.svg",
            "code": "ZA"
        },
        {
            "name": "South Georgia and the South Sandwich Islands",
            "callingCodes": "500",
            "flag": "/img/countries/gs.svg",
            "code": "GS"
        },
        {
            "name": "Korea (Republic of)",
            "callingCodes": "82",
            "flag": "/img/countries/kr.svg",
            "code": "KR"
        },
        {
            "name": "South Sudan",
            "callingCodes": "211",
            "flag": "/img/countries/ss.svg",
            "code": "SS"
        },
        {
            "name": "Spain",
            "callingCodes": "34",
            "flag": "/img/countries/es.svg",
            "code": "ES"
        },
        {
            "name": "Sri Lanka",
            "callingCodes": "94",
            "flag": "/img/countries/lk.svg",
            "code": "LK"
        },
        {
            "name": "Sudan",
            "callingCodes": "249",
            "flag": "/img/countries/sd.svg",
            "code": "SD"
        },
        {
            "name": "Suriname",
            "callingCodes": "597",
            "flag": "/img/countries/sr.svg",
            "code": "SR"
        },
        {
            "name": "Svalbard and Jan Mayen",
            "callingCodes": "47",
            "flag": "/img/countries/sj.svg",
            "code": "SJ"
        },
        {
            "name": "Swaziland",
            "callingCodes": "268",
            "flag": "/img/countries/sz.svg",
            "code": "SZ"
        },
        {
            "name": "Sweden",
            "callingCodes": "46",
            "flag": "/img/countries/se.svg",
            "code": "SE"
        },
        {
            "name": "Switzerland",
            "callingCodes": "41",
            "flag": "/img/countries/ch.svg",
            "code": "CH"
        },
        {
            "name": "Syrian Arab Republic",
            "callingCodes": "963",
            "flag": "/img/countries/sy.svg",
            "code": "SY"
        },
        {
            "name": "Taiwan",
            "callingCodes": "886",
            "flag": "/img/countries/tw.svg",
            "code": "TW"
        },
        {
            "name": "Tajikistan",
            "callingCodes": "992",
            "flag": "/img/countries/tj.svg",
            "code": "TJ"
        },
        {
            "name": "Tanzania, United Republic of",
            "callingCodes": "255",
            "flag": "/img/countries/tz.svg",
            "code": "TZ"
        },
        {
            "name": "Thailand",
            "callingCodes": "66",
            "flag": "/img/countries/th.svg",
            "code": "TH"
        },
        {
            "name": "Timor-Leste",
            "callingCodes": "670",
            "flag": "/img/countries/tl.svg",
            "code": "TL"
        },
        {
            "name": "Togo",
            "callingCodes": "228",
            "flag": "/img/countries/tg.svg",
            "code": "TG"
        },
        {
            "name": "Tokelau",
            "callingCodes": "690",
            "flag": "/img/countries/tk.svg",
            "code": "TK"
        },
        {
            "name": "Tonga",
            "callingCodes": "676",
            "flag": "/img/countries/to.svg",
            "code": "TO"
        },
        {
            "name": "Trinidad and Tobago",
            "callingCodes": "1",
            "flag": "/img/countries/tt.svg",
            "code": "TT"
        },
        {
            "name": "Tunisia",
            "callingCodes": "216",
            "flag": "/img/countries/tn.svg",
            "code": "TN"
        },
        {
            "name": "Turkey",
            "callingCodes": "90",
            "flag": "/img/countries/tr.svg",
            "code": "TR"
        },
        {
            "name": "Turkmenistan",
            "callingCodes": "993",
            "flag": "/img/countries/tm.svg",
            "code": "TM"
        },
        {
            "name": "Turks and Caicos Islands",
            "callingCodes": "1",
            "flag": "/img/countries/tc.svg",
            "code": "TC"
        },
        {
            "name": "Tuvalu",
            "callingCodes": "688",
            "flag": "/img/countries/tv.svg",
            "code": "TV"
        },
        {
            "name": "Uganda",
            "callingCodes": "256",
            "flag": "/img/countries/ug.svg",
            "code": "UG"
        },
        {
            "name": "Ukraine",
            "callingCodes": "380",
            "flag": "/img/countries/ua.svg",
            "code": "UA"
        },
        {
            "name": "United Arab Emirates",
            "callingCodes": "971",
            "flag": "/img/countries/ae.svg",
            "code": "AE"
        },
        {
            "name": "United Kingdom of Great Britain and Northern Ireland",
            "callingCodes": "44",
            "flag": "/img/countries/gb.svg",
            "code": "GB"
        },
        {
            "name": "United States of America",
            "callingCodes": "1",
            "flag": "/img/countries/us.svg",
            "code": "US"
        },
        {
            "name": "Uruguay",
            "callingCodes": "598",
            "flag": "/img/countries/uy.svg",
            "code": "UY"
        },
        {
            "name": "Uzbekistan",
            "callingCodes": "998",
            "flag": "/img/countries/uz.svg",
            "code": "UZ"
        },
        {
            "name": "Vanuatu",
            "callingCodes": "678",
            "flag": "/img/countries/vu.svg",
            "code": "VU"
        },
        {
            "name": "Venezuela (Bolivarian Republic of)",
            "callingCodes": "58",
            "flag": "/img/countries/ve.svg",
            "code": "VE"
        },
        {
            "name": "Viet Nam",
            "callingCodes": "84",
            "flag": "/img/countries/vn.svg",
            "code": "VN"
        },
        {
            "name": "Wallis and Futuna",
            "callingCodes": "681",
            "flag": "/img/countries/wf.svg",
            "code": "WF"
        },
        {
            "name": "Western Sahara",
            "callingCodes": "212",
            "flag": "/img/countries/eh.svg",
            "code": "EH"
        },
        {
            "name": "Yemen",
            "callingCodes": "967",
            "flag": "/img/countries/ye.svg",
            "code": "YE"
        },
        {
            "name": "Zambia",
            "callingCodes": "260",
            "flag": "/img/countries/zm.svg",
            "code": "ZM"
        },
        {
            "name": "Zimbabwe",
            "callingCodes": "263",
            "flag": "/img/countries/zw.svg",
            "code": "ZW"
        }
    ]
    data.map((d, i) => {
        d.index = i + 1
    })
    res.status(200).json(
        data
    )
}
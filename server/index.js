import fs from 'fs';

// const arr = [
//   {
//     id: 1761,
//     description: null,
//     alerts: [
//       {
//         time: 1702052226,
//         cities: ['הילה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702052230,
//         cities: ['עין יעקב'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702052236,
//         cities: ['מעונה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702052241,
//         cities: ['גורן'],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
//   {
//     id: 1760,
//     description: null,
//     alerts: [
//       {
//         time: 1702052069,
//         cities: ['מעיליא', 'מעלות תרשיחא'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702052082,
//         cities: ['אבירים', 'כפר ורדים', "ינוח-ג'ת"],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
//   {
//     id: 1759,
//     description: null,
//     alerts: [
//       {
//         time: 1702051085,
//         cities: ['ראשון לציון - מזרח', 'באר יעקב', 'נס ציונה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051087,
//         cities: [
//           'גבעת שמואל',
//           'גת רימון',
//           'פתח תקווה',
//           'קריית אונו',
//           'רמת גן - מזרח',
//           'גני תקווה',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051089,
//         cities: ['אור יהודה', 'מעש', 'סביון'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051092,
//         cities: ['בני ברק', 'גבעתיים', 'רמת גן - מערב'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051095,
//         cities: ['תל אביב - מרכז העיר', 'תל אביב - עבר הירקון'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051100,
//         cities: ['בית עובד'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051111,
//         cities: ['אירוס'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051119,
//         cities: ['חמד'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051131,
//         cities: ['רחובות'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051156,
//         cities: ['גאליה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051165,
//         cities: [
//           'יבנה',
//           'כפר הנגיד',
//           'בית גמליאל',
//           'בן זכאי',
//           'בניה',
//           'מעון צופיה',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051171,
//         cities: ['תל אביב - מזרח'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051174,
//         cities: [
//           'אזור',
//           'חולון',
//           'בית דגן',
//           "כפר חב''ד",
//           'משמר השבעה',
//           'צפריה',
//           'גנות',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051175,
//         cities: ['מקווה ישראל'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051179,
//         cities: ['תל אביב - דרום העיר ויפו', 'יהוד-מונוסון', 'בת-ים'],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
//   {
//     id: 1758,
//     description: null,
//     alerts: [
//       {
//         time: 1702045224,
//         cities: ['נחל עוז'],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
// ];
// const brr = [
//   {
//     id: 1760,
//     description: null,
//     alerts: [
//       {
//         time: 1702052069,
//         cities: ['מעיליא', 'מעלות תרשיחא'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702052082,
//         cities: ['אבירים', 'כפר ורדים', "ינוח-ג'ת"],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
//   {
//     id: 1759,
//     description: null,
//     alerts: [
//       {
//         time: 1702051085,
//         cities: ['ראשון לציון - מזרח', 'באר יעקב', 'נס ציונה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051087,
//         cities: [
//           'גבעת שמואל',
//           'גת רימון',
//           'פתח תקווה',
//           'קריית אונו',
//           'רמת גן - מזרח',
//           'גני תקווה',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051089,
//         cities: ['אור יהודה', 'מעש', 'סביון'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051092,
//         cities: ['בני ברק', 'גבעתיים', 'רמת גן - מערב'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051095,
//         cities: ['תל אביב - מרכז העיר', 'תל אביב - עבר הירקון'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051100,
//         cities: ['בית עובד'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051111,
//         cities: ['אירוס'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051119,
//         cities: ['חמד'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051131,
//         cities: ['רחובות'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051156,
//         cities: ['גאליה'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051165,
//         cities: [
//           'יבנה',
//           'כפר הנגיד',
//           'בית גמליאל',
//           'בן זכאי',
//           'בניה',
//           'מעון צופיה',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051171,
//         cities: ['תל אביב - מזרח'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051174,
//         cities: [
//           'אזור',
//           'חולון',
//           'בית דגן',
//           "כפר חב''ד",
//           'משמר השבעה',
//           'צפריה',
//           'גנות',
//         ],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051175,
//         cities: ['מקווה ישראל'],
//         threat: 0,
//         isDrill: false,
//       },
//       {
//         time: 1702051179,
//         cities: ['תל אביב - דרום העיר ויפו', 'יהוד-מונוסון', 'בת-ים'],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
//   {
//     id: 1758,
//     description: null,
//     alerts: [
//       {
//         time: 1702045224,
//         cities: ['נחל עוז'],
//         threat: 0,
//         isDrill: false,
//       },
//     ],
//   },
// ];

// const ids = brr.map((item) => item.id);
// const crr = arr.filter((item) => {
//   return !ids.includes(item.id);
// });

// // console.log(crr);

// fetch('https://glzxml.blob.core.windows.net/dalet/glglz-onair/onair.xml')
//   .then((res) => res.text())
//   .then((data) => {
//     console.log(data);
//     const XmlNode = new DOMParser().parseFromString(data, 'text/xml');
//     console.log(
//       XmlNode.getElementsByTagName('titleName')[0]?.childNodes[0]?.textContent
//     );
//   });

const shownAlerts = [];
const getRedAlert = async () => {
  // _audio.pause();
  const res = await fetch('https://api.tzevaadom.co.il/notifications');
  let data = await res.json();

  //   console.log(data.length);
  if (data.length !== 0) {
    console.log('Data Received!');
    console.log(data);
    fs.appendFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');
  }
};

getRedAlert();
setInterval(getRedAlert, 1000);

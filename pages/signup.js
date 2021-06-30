// import styles from '../styles/Signup.module.css'
// import DownloadLayout from '../components/DownloadLayout'
// import SignUpTab1 from '../components/signup/SignUpTab1'
// import SignUpTab2 from '../components/signup/SignUpTab2'
// import SignUpTab3 from '../components/signup/SignUpTab3'
// import { useState } from 'react'

// export default function SignUpStep1() {
//     const login = event => {
//         event.preventDefault() // don't redirect the page
//         // where we'll add our form logic
//         console.log('Login' + event.target.phone.value);
//         phoneNumber = event.target.phone.value;
//     }
//     const [tab, setTab] = useState(1)

//     return (
//         <div className="min-h-screen bg-white flex font-roboto" >
//             <div className="hidden lg:block relative w-0 flex-1 leftloginbg" style={{ background: '#21AAED', overflow: 'hidden' }}>

//                 <div className="mx-auto w-full" style={{ height: "25%" }}>
//                     <div className="mt-1" style={{ width: 'fit-content', marginTop: 32, marginLeft: 'auto', marginRight: 'auto', display: 'flex' }}>
//                         <img src="img/logoWhite.png" alt="Lifology" width="48px" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
//                         <span style={{
//                             alignSelf: 'center', color: 'white',
//                             fontWeight: 'bold',
//                             letterSpacing: '4px',
//                             fontSize: '20px',
//                             paddingLeft: '16px'
//                         }}>LIFOLOGY</span>
//                     </div>
//                     <p className="text-center text-white text-xl" style={{ marginTop: 32 }}>Building the world's best Super Parent Community</p>
//                 </div>
//                 <div className="text-center flex-1 flex flex-col " style={{ marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', height: '75%', alignItems: 'center' }}>
//                     <img className="absolute glsignimg" src="img/signup-left-view.png" alt="" style={{ height: "70%" }} />
//                 </div>

//             </div>

//             <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
//                 {
//                     tab == 1 ?
//                         <SignUpStep1 /> : <></>
//                 }
//                 {
//                     tab == 2 ?
//                         <SignUpTab2 next={() => { setTab(3) }} back={() => { setTab(1) }} /> :
//                         <></>
//                 }{
//                     tab == 3 ? <SignUpTab3 /> : <></>
//                 }
//                 {/* <SignUpTab2 next={() => { setTab(3) }} back={() => { setTab(1) }} /> */}

//                 <DownloadLayout />

//             </div>
//         </div>
//     )
// }
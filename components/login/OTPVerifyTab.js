import React from 'react'
import styles from '../../styles/Login.module.css'
import { useRef } from 'react'

const OTPVerifyTab = ({ verifyOTP, resendOTP, timeLeft, selectTab }) => {
    const oneRef = useRef()
    const twoRef = useRef()
    const threeRef = useRef()
    const fourRef = useRef()
    const fiveRef = useRef()
    const sixRef = useRef()
    return (
        <div className="mt-6">
            <form onSubmit={verifyOTP} className="space-y-6">
                <div>
                    <div className="mt-1">
                        <div className="mt-1 grid grid-cols-6 gap-2" style={{ marginTop: 16, marginLeft: 'auto', marginRight: 'auto' }}>

                            <input
                                ref={oneRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {

                                    } else {
                                        twoRef.current.focus()
                                    }
                                }}
                                id="one"
                                name="one"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                            <input
                                ref={twoRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        oneRef.current.focus()
                                    } else {
                                        threeRef.current.focus()
                                    }
                                }}
                                id="two"
                                name="two"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                            <input
                                ref={threeRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        twoRef.current.focus()
                                    } else {
                                        fourRef.current.focus()
                                    }
                                }}
                                id="three"
                                name="three"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                            <input
                                ref={fourRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        threeRef.current.focus()
                                    } else {
                                        fiveRef.current.focus()
                                    }
                                }}
                                id="four"
                                name="four"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                            <input
                                ref={fiveRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fourRef.current.focus()
                                    } else {
                                        sixRef.current.focus()
                                    }
                                }}
                                id="five"
                                name="five"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                            <input
                                ref={sixRef}
                                onKeyUp={(event) => {
                                    if (event.keyCode == 8) {
                                        fiveRef.current.focus()
                                    } else {
                                        // sixRef.current.focus()
                                    }
                                }}
                                id="six"
                                name="six"
                                type="phone"
                                required
                                className={styles.inputField}
                                maxLength="1"
                                style={{
                                    marginTop: 0,
                                    borderRadius: 60,
                                    height: 40,
                                    width: 40,
                                    textAlign: 'center'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 16 }}>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                        <div>
                            00:{timeLeft.toString().length == 1 ? '0' + timeLeft : timeLeft} seconds
                        </div>

                        <div style={{ textAlign: 'end' }}>
                            {
                                timeLeft == 0 ?
                                    <a
                                        onClick={resendOTP}
                                        className="font-medium text-indigo-600 hover:text-indigo-500" style={{ verticalAlign: 'middle', cursor: 'pointer' }}>
                                        Resend Code
                                    </a> : <></>
                            }

                        </div>

                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{
                            borderRadius: 60
                        }}
                    >
                        Verify OTP
                    </button>
                </div>

                <div>
                    <a
                        onClick={selectTab}
                        className=""
                        style={{
                            borderRadius: 60,
                            borderWidth: '1px',
                            borderColor: '#085CA4',
                            background: 'white',
                            color: '#085CA4',
                            paddingTop: '0.5rem',
                            paddingBottom: '0.5rem',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        Back To Login
                    </a>
                </div>
            </form>
        </div>

    )
}

export default OTPVerifyTab

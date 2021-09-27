import React, { Component, useRef } from 'react'
import { Link as ScrollLink } from 'react-scroll'

export default function Test() {
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' })

    return (
        <div >
            <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-around' }}>
                <li><ScrollLink activeClass="active" to="home" spy={true} smooth={true}>Home</ScrollLink></li>
                <li><ScrollLink to="about" spy={true} smooth={true}>About</ScrollLink></li>
                <li><ScrollLink to="contact" spy={true} smooth={true}>Contact</ScrollLink></li>
                <li><ScrollLink to="service" spy={true} smooth={true}>Service</ScrollLink></li>

                <button onClick={executeScroll}> Click to scroll </button>
            </ul>
            <>
                <div id="home" style={{ height: 500 }}>
                    <h1>This is Home section</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                </div>
                <div id="about" style={{ height: 500 }}>
                    <h1>This is About section</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                </div>
                <div id="contact" style={{ height: 500 }}>
                    <h1>This is Contact section</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                </div>
                <div id="service" style={{ height: 500 }}>
                    <h1>This is Service section</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                </div>
                <div ref={myRef} style={{ height: 500 }}>
                    <h1>This is Service section</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, repellendus. Totam nihil similique a repellat minus dolor amet quasi. Corporis nulla quaerat iste, sed quasi ab dolorem maxime minima animi.
                </div>
            </>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const example = await fetch(Constants.WEB_URL + '/api/countries')
//         .then(response => response.json())
//         .then(data => (data))
//     return {
//         props: { example }
//     }
// }



import { Fragment, useState, useEffect } from 'react'
import {
    SelectorIcon
} from '@heroicons/react/solid'
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetAssessment, SchemeGetMIOReport } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import useLocalStorage from '/helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '/components/MetaLayout'

import classNames from '/helpers/classNames'

import { Listbox, Transition, Dialog } from '@headlessui/react'

import styles from '/styles/Report.module.css'
import Expand from 'react-expand-animated';

import "react-multi-carousel/lib/styles.css";

import { Bar, Line, Pie } from 'react-chartjs-2';
import Breadcrumbs from '/components/Breadcrumbs'
import { SchemeGetMIOSCReport } from '/helpers/GraphQLSchemes'
import cookies from 'next-cookies'

import Draggable from 'react-draggable';

import SortableContainer from 'react-drag-sort'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import TestNa from '../components/TestNa'


export default function MIOReport({ example }) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const index = 4;


    return (
        <>
            {example}


        </>
    )
}

export async function getServerSideProps(context) {
    const example = await fetch(Constants.WEB_URL + '/api/countries')
        .then(response => response.json())
        .then(data => (data))
    return {
        props: { example }
    }
}



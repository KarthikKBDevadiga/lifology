import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Dialog } from '@headlessui/react';
import Constants from '../helpers/Constants';
import { queryGraph, mutateGraph } from '../helpers/GraphQLCaller'
import { SchemeGetPref } from '../helpers/GraphQLSchemes';
import styles from '../styles/Signup.module.css'
import { Fragment, useState } from 'react'

const prefClient = new ApolloClient({
  uri: Constants.baseUrl + '/api/category',
  cache: new InMemoryCache(),
})

export default function Preference({ prefs }) {
  const [prefsList, setPrefsList] = useState([])
  const signup = event => {
    event.preventDefault()
    // console.log(selectedGrade.grade)
    // console.log(selectedStream.stream)
    // setPrefDialog(true)
  }
  const onChangePref = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var list = prefsList;
    console.log(value);
    if (list.includes(target.id) && !value) {

      var index = list.indexOf(target.id);
      if (index > -1) {
        list.splice(index, 1)
      }
    } else if (!list.includes(target.id) && value) {
      list.push(target.id)
    }
    setPrefsList(list)

    console.log(list.includes(1))
  }
  return (
    <div className="text-center">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" style={{ width: '80%', maxWidth: '100%', paddingLeft: '3rem', paddingRight: '3rem' }}>

        <form onSubmit={signup} >

          <div className="sm:flex sm:items-start">
            {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    </div> */}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Select Prefrences
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Select at least 3 Functional areas of growth you want to focus on. we'll customize the app to suit your needs.
                </p>
              </div>
              <div className="mt-2" style={{ marginTop: '16px', fontSize: '16px' }}>
                <p className="text-sm font-medium text-gray-900 " style={{ fontSize: '16px' }}>
                  Choose Prefrences
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 m-4">
            {/* Card */}
            {prefs.map((card) => (
              <div className={styles.checkvalue}>

                <div class="flex-1">
                  <input type="checkbox" id={card.id} name="prefs" onChange={onChangePref} />
                  <label for={card.id}>
                    <img className={styles.checkimg} src={card.image} alt="" />
                    <div className={styles.labelwr}>
                      {card.title} <span>{card.description}</span>
                    </div>
                    <div className={styles.chooseprefrence}>
                      <img src="../img/choose_prefrence.svg" alt="Choosse" />
                    </div>
                  </label>
                </div>
              </div>
            ))}
            {/* <SelectPrefrences /> */}
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            // onClick={() => setPrefDialog(false)}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setPrefDialog(false)}
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const prefs = await queryGraph(prefClient, {}, SchemeGetPref)
    .then((res) => {
      return res.preferences;
    }).catch((networkErr) => {
      return [];
    });
  console.log(prefs)
  return {
    props: {
      prefs
    }
  };
}
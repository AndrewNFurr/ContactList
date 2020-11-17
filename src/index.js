import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { fetchAPI } from './api'

const App = () => {
    const [contactList, setContactList] = useState([])

    useEffect(async () => {
        fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
            .then((response) => {
                 console.log(response)
                 setContactList(response)
            })
            .catch(console.error);
    }, [contactList])


    return <>
        <h1>Hello</h1>
    </>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
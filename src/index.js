import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import fetchAPI  from './api'

import {
    ContactForm,
    ContactView,
    CommentForm
} from './components'

const App = () => {
    const [contactList, setContactList] = useState([])
    const [editableContact, setEditableContact] = useState({})

    function addNewContact(newContact) {
        setContactList([...contactList, newContact])
    }


    function updateContact(updatedContact) {
        let index = contactList.findIndex((contact) => {
            return contact.id === updatedContact.id
        })
        if (index > -1) {
      let contactListCopy = [...contactList];
      contactListCopy[index] = updatedContact;
      setContactList(contactListCopy);
      }
    }
    

    useEffect(async () => {
        fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
            .then((response) => {
                 setContactList(response.contacts)
            })
            .catch(console.error);
    }, [])


    return <Router>
        <Switch>
            <Route path='/form'>
                <ContactForm setContactList={setContactList}
                            addNewContact={addNewContact}
                            contactList={contactList}
                            {...editableContact}
                            setEditableContact={setEditableContact}
                            updateContact={updateContact} />
            </Route>
            <Route path='/'>
                <Link to='/form'>Create Contact</Link>
                <ContactView contactList={contactList}
                            setContactList={setContactList}
                            editableContact={editableContact}
                            setEditableContact={setEditableContact}
                            contactList={contactList}/>
             </Route>
        </Switch>
    </Router>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
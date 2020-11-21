import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
} from './components'

const App = () => {
    const [contactList, setContactList] = useState([])
    const [editableContact, setEditableContact] = useState({});
    const [search, setSearch] = useState('');
    const [type, setType] = useState('')

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

     function filteredContacts() {
        return contactList.filter((contact) => {
          return contact.name.toLowerCase().includes(search.toLowerCase());
        });
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
                <div className='header'>Contact Form</div>
                <ContactForm setContactList={setContactList}
                            addNewContact={addNewContact}
                            contactList={contactList}
                            {...editableContact}
                            setEditableContact={setEditableContact}
                            updateContact={updateContact} />
            </Route>
            <Route path='/'>
                <div className='header'>Contact List</div>
                <div id='interaction'>
                    <span>Create Contact<Link to='/form'><button id="create">+</button></Link></span>
                    <div id="search">
                        <label htmlFor="keywords">Search by Name</label>
                        <input 
                            id="keywords" 
                            type="text" 
                            placeholder="Enter Contact Name" 
                            value={ search } 
                            onChange={(event) => {
                            setSearch(event.target.value);
                            }} /></div>
                </div>
                <div id='split-list'>
                <ContactView contactList={filteredContacts()}
                            setContactList={setContactList}
                            editableContact={editableContact}
                            setEditableContact={setEditableContact}
                            type={'work'}/>
               <ContactView contactList={filteredContacts()}
                            setContactList={setContactList}
                            editableContact={editableContact}
                            setEditableContact={setEditableContact}
                            type={'personal'}/>
               <ContactView contactList={filteredContacts()}
                            setContactList={setContactList}
                            editableContact={editableContact}
                            setEditableContact={setEditableContact}
                            type={'other'}/>
                </div>
             </Route>
        </Switch>
    </Router>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
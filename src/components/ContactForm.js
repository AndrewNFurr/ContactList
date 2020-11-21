import React, { useState, useEffect } from 'react';
import fetchAPI from '../api'
import './ContactForm.css'
import { Link } from 'react-router-dom'

const ContactForm = (props) => {
    const {
        setContactList,
        contactList,
        addNewContact,
        id,
        updateContact,
        setEditableContact
    } = props

    const CONTACT_OPTIONS = ['choose type', 'work', 'personal', 'other']

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [contactType, setContactType] = useState(CONTACT_OPTIONS[0]);
    const [madeChanges, setMadeChanges] = useState(false);

    useEffect(() => {
        setAddress(props.address || '')
        setName(props.name || '')
        setPhoneNumber(props.phoneNumber || '')
        setEmail(props.email || '')
        setContactType(props.contactType || '')
    }, [id])

    function clearForm() {
        setAddress('');
        setName('')
        setPhoneNumber('')
        setEmail('');
        setContactType('')
    }

    return <form
              className="contact-form"
              onSubmit={async (event) => {
                  event.preventDefault();
                  
                  const contactInfo = {
                        name,
                        address,
                        phoneNumber,
                        email,
                        contactType
                    }
                  if (id) {
                      try {
                      const editContact = await fetchAPI(`https://univ-contact-book.herokuapp.com/api/contacts/${id}`,
                                                         "PATCH",
                                                         contactInfo)
                      updateContact(editContact.contact);
                      setMadeChanges(true)
                      setEditableContact({})
                      } catch(error) {
                          console.log(error);
                      }
                  } else {
                  try {
                      await fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts", 
                                                  "POST", 
                                                  contactInfo).then(newContact => {
                                                      setMadeChanges(true)
                                                      addNewContact(newContact.contact)
                                                    }).catch(error => {
                                                        console.log(error)
                                                    })
                  } catch (error) {
                    console.log(error)
                  }
                }

                  clearForm();
              }}>
            <label>Name</label>
            <input
                type="text"
                value={name}
                placeholder="Contact Name"
                onChange={(event) => setName(event.target.value)}
                />
                <label>Address</label>
                <input
                type="text"
                value={address}
                placeholder="Contact Address"
                onChange={(event) => setAddress(event.target.value)}
                />
                <label>Phone Number</label>
                <input
                type="text"
                value={phoneNumber}
                placeholder="Contact Phone Number"
                onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <label>Email</label>
                <input
                type="text"
                value={email}
                placeholder="Contact email address"
                onChange={(event) => setEmail(event.target.value)}
                />
                <label>Content Type</label>
                <select
                value={contactType}
                onChange={(event) => setContactType(event.target.value)}
                >
                    {
                        CONTACT_OPTIONS.map((type, idx) => {
                        return <option key={idx} value={type}>{type}</option>
                        })
                    }
                </select>
                <button id='submit'>{id ? "Edit Contact" : "Create Contact"}</button>
                <Link to='/'><div id='return'>Return</div></Link>
                { madeChanges ? 
                    <div>
                        <h1>You've made a change to your Contact list!</h1>
                        <p>Continue to make changes or click above to return to your contacts</p>
                    </div> : null
                }
    </form>
}

export default ContactForm;
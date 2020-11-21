import React, { useState } from 'react'
import fetchAPI  from '../api';
import './ContactView.css'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'

const ContactView = ({
    contactList,
    setEditableContact,
    setContactList,
}) => {

    return <div className="list"
                >
        {contactList.map(contact => {
            return <div key={contact.id}
                        className='contact'>
                <div className="info">
                    <h2>{contact.name} ({contact.contactType})</h2>
                    <p>Address: {contact.address}</p>
                    <p>Number: {contact.phoneNumber}</p>
                    <p>Email: {contact.email}</p>
                </div>
                <div className='options'>
                    <button onClick={async () => {
                        try {
                            const url = `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`;
                            const data = await fetchAPI(url, "DELETE")
                            setContactList(contactList.filter(deleted => {
                                return contact !== deleted
                            }))
                        } catch (error) {
                            console.log(error)
                        }
                    }}>Delete</button>
                    <Link to='/form'><button onClick={() => {
                        setEditableContact(contact);
                    }}>Edit</button></Link>
                    <CommentForm handleClick={async (content) => {
                        const payload = {
                            content: content,
                        }

                        try {
                            await fetchAPI(`https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}/comments`, 
                                        "POST", 
                                        payload)
                                .then((resp) => {
                                    const newList = [...contactList];
                                    let idx = newList.indexOf(contact);
                                    newList[idx].comments.push(resp.comment)
                                    setContactList(newList);
                                    }).catch(console.error)
                        } catch(error) {console.log(error)}
                    }} />
                </div>
                { contact.comments ? 
                    contact.comments.map((comment, idx) => {
                    return <div key={idx}
                                className='comment'>
                            <p>{comment.content}</p>
                            <button onClick={async () => {
                                try {
                                    await fetchAPI(`https://univ-contact-book.herokuapp.com/api/comments/${comment.id}`, "DELETE");
                                    const newList = [...contactList];
                                    let idx = newList.indexOf(contact);
                                    let commentIdx = newList[idx].comments.indexOf(comment)
                                    newList[idx].comments.splice(commentIdx, 1);
                                    setContactList(newList);
                                } catch(error) {
                                    console.log(error)
                                }
                            }}>DELETE</button>
                        </div>
                    }) : null
                }
            </div>
        })}
    </div>
}

export default ContactView;
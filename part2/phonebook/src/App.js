import React, { useState, useEffect } from 'react'
import ContactSearch from './components/ContactSearch'
import ContactNew from './components/ContactNew'
import ContactList from './components/ContactList'
import contactServices from './services/contact'
import Notification from './components/Notification'

const App = () => {
  // #region state definitions
  const [persons, setPersons] = useState([])
  const [contactData, setContactData] = useState({
    name: '',
    number: '',
  })
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [notification, setNotification] = useState(null)

  //#endregion

  // #region local variables
  let existingContact
  //#endregion

  // #region other functions
  const isDuplicateContact = (obj1, obj2) => {
    if (obj1.name.toLowerCase() === obj2.name.toLowerCase()) {
      existingContact = obj1
      return true
    }

    return false
  }

  //#endregion

  // #region event handlers
  const handleSearchInput = (event) => {
    setSearchText(event.target.value)
  }

  const handleContactInput = (event) => {
    setContactData({ ...contactData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const contact = {
      name: contactData.name,
      number: contactData.number,
    }

    const alreadyExists = persons.some((person) =>
      isDuplicateContact(person, contact)
    )

    if (alreadyExists) {
      if (
        window.confirm(
          `${existingContact.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedContact = {
          ...contact,
          number: contactData.number,
        }
        contactServices
          .update(existingContact.id, updatedContact)
          .then((contact) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingContact.id ? person : contact
              )
            )
            return contact
          })
          .then((contact) =>
            setNotification({
              message: `Updated number for ${contact.name}`,
              type: 'success',
            })
          )
      }
    } else {
      contactServices
        .create(contact)
        .then((newContact) => {
          setPersons(persons.concat(newContact))
        })
        .then(() =>
          setNotification({
            message: `Added ${contact.name}`,
            type: 'success',
          })
        )
    }

    Object.getOwnPropertyNames(contactData).forEach(
      (prop) => (contactData[prop] = '')
    )
  }

  const deleteContact = (id) => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}`))
      contactServices
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setNotification({
            message: `Removed ${person.name}`,
            type: 'alert',
          })
        })
        .catch(() =>
          setNotification({
            message: `Information of ${person.name} has already been removed from the server.`,
            type: 'error',
          })
        )
  }

  //#endregion

  // #region side effects

  useEffect(() => {
    contactServices.getAll().then((allContacts) => setPersons(allContacts))
  }, [])

  // updating the search results
  useEffect(() => {
    const regex = new RegExp(searchText, 'i')
    setSearchResults(
      searchText ? persons.filter((person) => regex.test(person.name)) : persons
    )
  }, [searchText, persons])

  //clearing out displayed notification
  useEffect(() => {
    setTimeout(() => setNotification(null), 5000)
  }, [notification])

  //#endregion

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <ContactSearch handleInput={handleSearchInput} />
      <h3>add a new</h3>
      <ContactNew
        handleSubmit={handleSubmit}
        handleContactInput={handleContactInput}
        contactData={contactData}
      />
      <ContactList list={searchResults} delete={deleteContact} />
    </div>
  )
}
export default App

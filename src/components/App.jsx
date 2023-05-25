import { useState, useEffect } from 'react';
import { ContactForm } from './contact-form/ContactForm.jsx';
import { Filter } from './filter/Filter.jsx';
import { ContactList } from './contact-list/ContactList.jsx';
import { Sort } from './sort/Sort.jsx';
import css from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownAZ,
  faArrowDownZA,
} from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from 'react-loader-spinner';

export const App = () => {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
    sort: { nameOption: false, methodOption: false },
    onMount: true,
  });

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      onMount: false,
    }));

    const storedSort = localStorage.getItem('sort');
    const parsedSort = JSON.parse(storedSort);

    if (parsedSort) {
      setState(prevState => ({
        ...prevState,
        sort: parsedSort,
        onMount: true,
      }));
    }

    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      setState(prevState => ({
        ...prevState,
        contacts: parsedContacts,
      }));
    }
  }, []);

  const addContact = newContact => {
    const { name, number } = newContact;
    const contacts = state.contacts;

    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (existingContact) {
      alert(`${name} or ${number} is already in contacts`);
      return;
    }

    setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));

    localStorage.setItem(
      'contacts',
      JSON.stringify([...state.contacts, newContact])
    );
  };

  const deleteContact = id => {
    const updatedContacts = state.contacts.filter(contact => contact.id !== id);
    setState(prevState => ({
      ...prevState,
      contacts: updatedContacts,
    }));
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const contactsFilter = e => {
    if (e) {
      const input = e.target.value;
      setState(prevState => ({
        ...prevState,
        filter: input,
      }));
    } else {
      const { filter, contacts } = state;
      const normalizedFilter = filter.toLowerCase();

      return contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(normalizedFilter) ||
          contact.number.includes(normalizedFilter)
      );
    }
  };

  const handleSortChange = (value, checked) => {
    setState(prevState => ({
      ...prevState,
      sort: {
        ...prevState.sort,
        [value]: checked,
      },
    }));

    localStorage.setItem(
      'sort',
      JSON.stringify({
        ...state.sort,
        [value]: checked,
      })
    );

    sortContacts();
  };

  const sortContacts = () => {
    const sortInfo = JSON.parse(localStorage.getItem('sort'));
    const { nameOption, methodOption } = sortInfo;
    let sortBy;
    let sortOrder;

    nameOption ? (sortBy = 'lastName') : (sortBy = 'firstName');
    methodOption ? (sortOrder = 'desc') : (sortOrder = 'asc');

    const contacts = [...state.contacts];

    const sortedContacts = contacts.sort((a, b) => {
      let nameA;
      let nameB;

      if (sortBy === 'firstName') {
        nameA = a.name.split(' ')[0];
        nameB = b.name.split(' ')[0];
      } else if (sortBy === 'lastName') {
        nameA = a.name.split(' ')[1];
        nameB = b.name.split(' ')[1];
      }

      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

    setState(prevState => ({
      ...prevState,
      contacts: sortedContacts,
    }));

    localStorage.setItem('contacts', JSON.stringify(sortedContacts));
  };

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      {state.contacts.length > 0 ? (
        <>
          <Filter
            filter={state.filter}
            contactsFilter={contactsFilter}
            contacts={state.contacts}
          />
          <Sort
            title="Sort contacts by name"
            value="nameOption"
            isChecked={state.sort.nameOption}
            optionOne="First Name"
            optionTwo="Last Name"
            handleSortChange={handleSortChange}
            contacts={state.contacts}
          />
          <Sort
            value="methodOption"
            isChecked={state.sort.methodOption}
            margin="45px"
            optionOne={
              <FontAwesomeIcon
                icon={faArrowDownAZ}
                size="lg"
                style={{ color: '#000000' }}
              />
            }
            optionTwo={
              <FontAwesomeIcon
                icon={faArrowDownZA}
                size="lg"
                style={{ color: '#000000' }}
              />
            }
            handleSortChange={handleSortChange}
            contacts={state.contacts}
          />
          <ContactList
            contacts={contactsFilter()}
            deleteContact={deleteContact}
          />
        </>
      ) : state.onMount ? (
        <>
          <h5>Locating Contacts</h5>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </>
      ) : (
        <h5>
          No contacts found. Complete the above form to begin adding contacts.
        </h5>
      )}
    </div>
  );
};

export default App;

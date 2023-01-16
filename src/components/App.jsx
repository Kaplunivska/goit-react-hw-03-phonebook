import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Box } from './Box';
import ContactForm from './ContactForm';
import { nanoid } from 'nanoid';
import { MainHeader, SubHeader } from './Typography';
import ContactList from './ContactList';
import Filter from './Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = contacts.find(contact => contact.name === name);

    // Show warrning if contact is already in contacts
    if (contact) {
      toast.warn(`${name} is already in contacts.`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
      });

      return;
    }

    const newContact = { id: nanoid(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  updateFilter = value => {
    this.setState({ filter: value });
  };

  filteredContacts = () => {
    const { filter } = this.state;
    const normalizeFilter = filter.trim().toLowerCase();

    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <Box p={3}>
        <MainHeader mb={3}>Phonebook</MainHeader>
        <ContactForm onSubmit={this.addContact} />

        <SubHeader mt={3} mb={2}>
          Contacts
        </SubHeader>
        <Filter filter={filter} onChange={this.updateFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          onDelete={this.deleteContact}
        />

        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover={false}
          theme="light"
        />
      </Box>
    );
  }
}


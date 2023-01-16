import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { Box } from './Box';
import ContactForm from './ContactForm';
import { nanoid } from 'nanoid';
import { MainHeader, SubHeader } from './Typography';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  getFromLocalStorage,
  LS_CONTACTS,
  setToLocalStorage,
} from 'services/localStorage';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const data = getFromLocalStorage(LS_CONTACTS);

    if (!data || data?.length === 0) return;

    this.setState({ contacts: data });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      setToLocalStorage(LS_CONTACTS, this.state.contacts);
    }
  }

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


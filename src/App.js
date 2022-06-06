import { nanoid } from 'nanoid';
import Section from 'components/Section/Section';
import Form from 'components/Form/Form';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Component } from 'react';
import initialContacts from './initialContacts.json';

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  contactHandler = contact => {
    if (this.uniqueContactValidator(contact) === true) {
      return;
    }
    contact.id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  uniqueContactValidator = newContact => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`'${newContact.name}' is already in contacts`);
      return true;
    }
  };

  filterHandler = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  deleteHandler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(this.state.filter.toLowerCase())
    );

    return (
      <>
        <Section title="Phonebook">
          <Form onAddContact={this.contactHandler} />
        </Section>
        <Section title="Contacts">
          <Filter
            queryValue={this.state.filter}
            onFilter={this.filterHandler}
          />
          <ContactList
            contacts={filteredContacts}
            filterValue={this.state.filter}
            onDelete={this.deleteHandler}
          />
        </Section>
      </>
    );
  }
}

import { Component } from "react";
import { nanoid } from "nanoid";
import Phonebook from "../Phonebook/Phonebook";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  getAddContacts = (value) => {
    return this.setState((prevState) => {
      return { contacts: [...prevState.contacts, value] };
    });
  };

  inputValue = (e) => {
    e.preventDefault();
    const contact = {
      id: nanoid(),
      name: e.target[0].value,
      number: e.target[1].value,
    };

    e.target[0].value = "";
    e.target[1].value = "";

    if (
      this.state.contacts.find(
        (item) => item.name.toLowerCase() === contact.name.toLowerCase()
      )
    )
      return alert("NO!");
    return this.getAddContacts(contact);
  };

  deleteContact = (id) => {
    return this.setState((prevState) => {
      const newArr = prevState.contacts.filter((contact) => contact.id !== id);
      return { contacts: newArr };
    });
  };

  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(normalizeFilter);
    });
  };

  render() {
    return (
      <div>
        <Phonebook
          contacts={this.getFilteredContact()}
          addContact={this.inputValue}
          delContact={this.deleteContact}
          onFilterChange={this.handleFilterChange}
        />
      </div>
    );
  }
}

import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            masterTicketList: [],
            selectedTicket: null,
            editing: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleAddingNewTicketToList = (newTicket) => {
        const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
        this.setState({
            masterTicketList: newMasterTicketList,
            formVisibleOnPage: false
        });
    }

    handleClick = () => {
        if (this.state.selectedTicket != null) {
            this.setState({
                formVisibleOnPage: false,
                selectedTicket: null
            });
        } else {
            this.setState(prevState => ({
                formVisibleOnPage: !prevState.formVisibleOnPage
            }));
        }
    }

    handleEditClick = () => {
        console.log("handleEditClick reached!");
        this.setState({ editing: true });
    }

    handleEditingTicketInList = (ticketToEdit) => {
        const editedMasterTicketList = this.state.masterTicketList
            .filter(ticket => ticket.id !== this.state.selectedTicket.id)
            .concat(ticketToEdit);
        this.setState({
            masterTicketList: editedMasterTicketList,
            editing: false,
            selectedTicket: null
        });
    }

    handleChangingSelectedTicket = (id) => {
        const selectedTicket = this.state.masterTicketList.filter(ticket => ticket.id === id)[0];
        this.setState({ selectedTicket: selectedTicket });
    }

    handleDeletingTicket = (id) => {
        const newMasterTicketList = this.state.masterTicketList.filter(ticket => ticket.id !== id);
        this.setState({
            masterTicketList: newMasterTicketList,
            selectedTicket: null
        });
    }

    render() {
        let currentlyVisibleState = null;
        let buttonText = null;

        if (this.state.editing) {
            currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket} onEditTicket={this.handleEditingTicketInList} />
            buttonText = "Return to Ticket List";
        } else if (this.state.selectedTicket != null) {
            currentlyVisibleState = <TicketDetail
                ticket={this.state.selectedTicket}
                onClickingDelete={this.handleDeletingTicket}
                onClickingEdit={this.handleEditClick} />
            buttonText = "Return to Ticket List";

        } else if (this.state.formVisibleOnPage) {
            // This conditional needs to be updated to "else if."
            currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
            buttonText = "Return to Ticket List";
        } else {
            currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
            // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
            buttonText = "Add Ticket";
        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                {/* {addTicketButton} */}
            </ React.Fragment>
        );
    }

}

export default TicketControl;
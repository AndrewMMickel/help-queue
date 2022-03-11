import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formVisibleOnPage: false,
            masterTicketList: [],
            selectedTicket: null
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
        this.setState(prevState => ({
            formVisibleOnPage: !prevState.formVisibleOnPage
        }));
    }

    render() {
        let currentlyVisibleState = null;
        let addTicketButton = null;
        if (this.state.formVisibleOnPage) {
            currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
        } else {
            currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList} />;
            addTicketButton = <button onClick={this.handleClick}>Add ticket</button>;

        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                {addTicketButton}
            </ React.Fragment>
        );
    }

}

export default TicketControl;
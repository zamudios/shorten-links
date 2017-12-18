import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);   
        
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    onSubmit(e) {
        const { url } = this.state;

        e.preventDefault();

        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }

    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    handleModalClose() {
        this.setState({ isOpen: false, url: '', error: '' });
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true }) }>+ Add Link</button>
                <Modal 
                    isOpen={ this.state.isOpen } 
                    contentLabel="Add Link"
                    onAfterOpen={ () => this.refs.url.focus() }
                    onRequestClose={ this.handleModalClose }
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add Link</h1>
                    { this.state.error ? <p>{ this.state.error }</p> : undefined }
                    <form onSubmit={ this.onSubmit } className="boxed-view__form">
                        <input 
                            type="text" 
                            placeholder="URL" 
                            ref="url"
                            value={ this.state.url } 
                            onChange={ this.onChange }
                        />
                        <button className="button">Add Link</button>
                        <button className="button button--secondary" type="button" onClick={ this.handleModalClose }>Cancel</button>
                    </form>
                </Modal> 
            </div>
        );
    }
}
import React from 'react';

var submitCallback = function () { };

class Form extends React.Component {

    constructor(props) {
        super(props);
        submitCallback = props.callback;
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        submitCallback(this.state.value);
    }

    render() {
        return (
            <div className="input-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </form>
            </div>
        );
    }
}
export default Form;
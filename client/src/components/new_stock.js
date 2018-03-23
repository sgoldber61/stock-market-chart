import React, {Component} from 'react';

export default class NewStock extends Component {
  constructor(props) {
    // props contains addStock function
    super(props);
    
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.addStock(this.state.value);
    this.setState({value: ''});
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Enter Stock Abbreviation:
        <div className="input-group">
          <input className='' type="text" value={this.state.value} placeholder='Stock' onChange={this.handleChange} />
          <button className='btn btn-primary btn-md' type='submit'>Submit</button>
        </div>
      </form>
    );
  }
}


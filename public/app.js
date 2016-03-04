{/* 
  HIERARCHY

  -PeopleApp (will get data from /api/people and set the state of people)
    -PeopleList
      -Person

*/}

var PeopleApp = React.createClass({

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      people: []
    }
  },
  loadPeopleFromServer: function() {
    var self = this;
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){
      self.setState({ people: data });
    })
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
  },
  render: function() {
    return (
      <div>
        <PeopleList people={ this.state.people } />
      </div>
      )
  }
});

var PeopleList = React.createClass({
  render: function() {
  var person = this.props.people.map(function(item){
    return (
            <Person name={item.name} img={item.img} username={item.username} dob={item.dob}/>
            );
  })
    return (
      <div>
        { person }
      </div>
      )
  }
});


{/*
  Have this component render actual data.
  BONUS: Create a function which will take a persons birth_date
  and calculate their age. Use this function to render the persons age.
*/}
var Person = React.createClass({
  getAge: function(age) {
    return new Date().getYear() - new Date(age).getYear()
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div classname="panel-body">
          {this.props.username}
          <img src={this.props.img}/>
          <p> { this.getAge(this.props.dob) } </p>
        </div>
      </div>
      )
  }
});




React.render(<PeopleApp hello="hello" url="/api/people" />, document.getElementById('react-container'));

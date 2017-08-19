class MovieDetail extends React.Component {
  constructor() {
	super();
	this.state = {
	  editing: false
	};
  }

  render() {
	if (this.state.editing) {
	  return (
		<input
		  autoFocus
		  onKeyPress={this.enter.bind(this)}
		  onBlur={this.focusOut.bind(this)}
		  type="text"
		  value={this.state.title} />
	  );
	} else {
	  return (
		<div onClick={this.edit.bind(this)}>
		  {this.props.title} - {this.props.date}
		</div>
	  );
	}
  }

  enter(e) {
	if (e.key === 'Enter') {
	  axios({
		method: 'post',
		url: '/movie',
		data: {
		  title: e.target.value
		}
	  }).then(() => {
		console.log('success');
	  }).catch((error) => {
		console.log(error);
	  });

	  this.focusOut();
	}
  }

  edit() {
	this.setState({ editing: true });
  }

  focusOut() {
	this.setState({ editing: false });
  }
}

class MovieBox extends React.Component {
  constructor() {
	super();
	this.state = {
	  movieDetails: {}
	};
  }

  getDetails(details) {
	return this.state.movieDetails.map((detail) => {
	  return <MovieDetail key={detail.id} title={detail.title} date={detail.date} />
	});
  }

  componentDidMount() {
	axios.get('/init')
	  .then((response) => {
		this.setState({ movieDetails: response.data });
	  })
	  .catch((error) => {
		console.log(error);
	  });
  }

  render() {
    return (
	  <div>
		<MovieDetail title={this.state.movieDetails.title} date={this.state.movieDetails.date} />
	  </div>
    );
  }
}

ReactDOM.render(
  <MovieBox />,
  document.getElementById('root')
);

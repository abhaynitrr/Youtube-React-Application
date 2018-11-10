import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchtext: '' };

		this.onInputChange = this.onInputChange.bind(this);
	}

	render() {
		return (
			<div className="search-bar">
				<div class="form-group has-feedback search-input-box">
					<input
						type="text"
						class="form-control"
						placeholder="Search Videos"
						name="search"
						value={this.state.searchtext}
						onChange={this.onInputChange}
					/>
					<span class="glyphicon glyphicon-search form-control-feedback" />
				</div>
			</div>
		);
	}

	onInputChange(event) {
		this.setState({ searchtext: event.target.value });
		this.props.onSearchTermChange(event.target.value);
	}
}

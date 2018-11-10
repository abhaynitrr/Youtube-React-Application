import './../css/main.css';
import YTIcon from '../images/yticon.png';

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import YoutubeApi from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCk6gydETEiwE5WhUBeK4D2ElTcYdk3I4Q';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [], selectedVideo: null };

		this.onVideoSelect = this.onVideoSelect.bind(this);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);

		//* settingup some default videos *//
		this.onSearchTermChange('dude prefect latest');
	}

	//* Call back to search for new videos *//
	onSearchTermChange(searchtext) {
		searchtext = searchtext || 'dude prefect latest';
		console.log(searchtext);
		YoutubeApi({ key: API_KEY, term: searchtext }, videos => {
			this.setState({ videos: videos, selectedVideo: videos[0] });
		});
	}

	//* Call back to select video list item *//
	onVideoSelect(video) {
		this.setState({ selectedVideo: video });
	}

	render() {
		const _onSearchTermChange = _.debounce(term => {
			this.onSearchTermChange(term);
		}, 300);

		return (
			<div className="App-Container">
				<div class="top-head">
					<div class="col-md-4 col-FH">
						<div class="site-title-main">
							<span class="YouTube-Icon">
								<img src={YTIcon} />
							</span>
							<span class="site-title">
								YouTube React Application
							</span>
						</div>
					</div>
					<div class="col-md-8 col-FH">
						<SearchBar onSearchTermChange={_onSearchTermChange} />
					</div>
				</div>
				<div id="Body-Content">
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList
						onVideoSelect={this.onVideoSelect}
						videos={this.state.videos}
					/>
				</div>
			</div>
		);
	}
}

ReactDom.render(<App />, document.querySelector('#App-Content'));

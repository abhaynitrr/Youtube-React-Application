import React, { Component } from 'react';
import VideoListItem from './video_list_item';

export default class VideoList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { videos } = this.props;
		let videoListItem = videos.map(video => (
			<VideoListItem
				onVideoSelect={this.props.onVideoSelect}
				key={video.etag}
				video={video}
			/>
		));

		return (
			<div className="col-md-4">
				<div className="list-group video-list-container">
					{videoListItem}
				</div>
			</div>
		);
	}
}

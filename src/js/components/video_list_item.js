import React, { Component } from 'react';

export default class VideoListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { video, onVideoSelect } = this.props;
		let videoThumbnail = video.snippet.thumbnails.default.url;
		let videoTitle = video.snippet.title;
		let description = video.snippet.description;

		return (
			<div
				className="list-group-item video-list-item"
				onClick={() => onVideoSelect(video)}
			>
				<div className="video-list media">
					<div className="media-left">
						<img className="media-object" src={videoThumbnail} />
					</div>
					<div className="media-body">
						<div className="media-heading">{videoTitle}</div>
						<div className="media-description">{description}</div>
					</div>
				</div>
			</div>
		);
	}
}

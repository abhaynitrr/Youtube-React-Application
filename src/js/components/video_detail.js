import React, { Component } from 'react';

export default class VideoDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { video } = this.props;

		if (!video) {
			return <div>Loding...</div>;
		}

		let videoUrl = `https://www.youtube.com/embed/${video.id.videoId}`;
		let videoTitle = video.snippet.title;
		let description = video.snippet.description;

		return (
			<div className="video-player-container col-md-8">
				<div className="embed-responsive embed-responsive-16by9">
					<iframe className="embed-responsive-item" src={videoUrl} />
				</div>
				<div className="video-detail-container">
					<div className="video-details">
						<div className="video-detail-heading">{videoTitle}</div>
						<div className="video-detail-description">{description}</div>
					</div>
				</div>
			</div>
		);
	}
}

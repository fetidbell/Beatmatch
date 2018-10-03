import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import './index.css';

class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Sequencer />
			</div>
  		);
	}
}

class Sequencer extends React.Component {

	render() {
		return (
			<div className="sequencer">
				<div className="sequencer-header">
					<Status />
					<Task />
				</div>

				<div className="sequencer-tracks">
					<TrackNames />
					<TrackNotes />
				</div>
				<SequencerButtons />
			</div>
		);
	}
}

class Status extends React.Component {
	render() {
		return (
			<div className="sequencer-header-status">
				<h2>Status/messages etc. block</h2>
			</div>
		);
	}
}

class Task extends React.Component {

	render() {
		return (
			<div className="sequencer-task">
				<button>Task button</button>
			</div>
		);
	}
}

class TrackNames extends React.Component {

	render() {
		return (
			<div className="sequencer-tracknames">
				<h2>Kick</h2>
				<h2>Snare</h2>
				<h2>Hi-hat</h2>
				<h2>Crash</h2>
			</div>
		);
	}
}

class TrackNotes extends React.Component {

	render() {
		return (
			<div className="sequencer-tracknotes">
				<Playhead />
				<Track />
				<Track />
				<Track />
				<Track />
			</div>
		);
	}
}

class Playhead extends React.Component {
	render() {
		return (
			<div className="sequencer-tracknotes-playhead"></div>
		);
	}
}

class Track extends React.Component {
	render() {
		return (
			<div className="track">
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
				<Note />
			</div>
		);
	}
}

class Note extends React.Component {

	render() {
		return (
			<div className="note"></div>
		);
	}
}

class SequencerButtons extends React.Component {
	render() {
		return (
			<div className="sequencer-buttons">
				<button>Play/stop</button>
				<button>Confirm</button>
			</div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

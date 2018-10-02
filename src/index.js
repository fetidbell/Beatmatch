import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import './index.css';

var synth = new Tone.Synth().toMaster();

// Tone.Transport.bpm.value = 60;
// Tone.Transport.scheduleRepeat(function(time){
// 	synth.triggerAttackRelease('C2', '16n');
// }, "4n");
// Tone.Transport.start();

class Note extends React.Component {

	render() {
		return (
			<div className="note"></div>
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
			</div>
		);
	}
}

class TrackNotes extends React.Component {

	render() {
		return (
			<div className="sequencer-tracknotes">
				<Track />
				<Track />
				<Track />
				<Track />
			</div>
		);
	}
}

class TrackNames extends React.Component {
	render() {
		return (
			<div className="sequencer-tracknames">
				<h2>TrackName</h2>
				<h2>TrackName</h2>
				<h2>TrackName</h2>
				<h2>TrackName</h2>
			</div>
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

class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Sequencer />
			</div>
  		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

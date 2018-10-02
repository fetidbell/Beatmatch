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
				<h2>Track name</h2>
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

class Sequencer extends React.Component {

	render() {
		return (
			<div className="sequencer">
				<h1>Sequencer component</h1>
				<Task />
				<div className="sequencer-tracks">
					<Track />
					<Track />
					<Track />
					<Track />
				</div>
				<div className="sequencer-buttons">
					<button className="playstop-button">Play/stop</button>
					<button className="confirm-button">Confirm</button>
				</div>
			</div>
		);
	}
}

class Task extends React.Component {

	render() {
		return (
			<div className="task">
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

import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import './index.css';

//Kick		http://d.zaix.ru/8UoS.mp3
//Snare		http://d.zaix.ru/8UoT.mp3
//Hi-hat		http://d.zaix.ru/8UoU.mp3
//Crash		http://d.zaix.ru/8UoV.mp3

Tone.Transport.bpm.value = 160;

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

	constructor() {
		super();
		var kickNotes = new Array(16).fill(false);
		var snareNotes = new Array(16).fill(false);
		var hihatNotes = new Array(16).fill(false);
		this.notesToPlayArr = [kickNotes, snareNotes, hihatNotes];

		this.drums = new Tone.Players({
		 	"0": "http://d.zaix.ru/8UoS.mp3",	//kick
		 	"1": "http://d.zaix.ru/8UoT.mp3",	//snare
		 	"2": "http://d.zaix.ru/8UoU.mp3"		//hihat
		}).toMaster();

		this.loop = new Tone.Sequence(function(time, note) {
			this.movePlayhead(note);
			for(var i=0; i<3; i++) {
				if(this.notesToPlayArr[i][note]) {
					this.drums.get(i).start(time, 0, "8n", 0);
				}
			}

		}.bind(this), [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], "8n");

	}

	componentDidMount() {
		var playhead = document.getElementById('sequencer-tracknotes-playhead');
		playhead.style.left = "6px";
		this.playhead = playhead;
	}

	playStop(playing) {
	 	if(playing) {
			Tone.Transport.stop();
			this.loop.stop();
			this.movePlayhead(0);
	 	} else {
			Tone.Transport.start();
			this.loop.start();
	 	}
	}

	movePlayhead(note) {
		var positionLeft = parseInt(this.playhead.style.left);
		positionLeft += 70;
		if (note == 0) {
			this.playhead.style.left = "6px";
		} else {
			this.playhead.style.left = positionLeft + "px";
		}
	}

	render() {
		return (
			<div className="sequencer">
				<div className="sequencer-header">
					<Status />
					<Task />
				</div>

				<div className="sequencer-tracks">
					<TrackNames />
					<TrackNotes
						notesToPlay = {this.notesToPlayArr}
					/>
				</div>
				<SequencerButtons
					playStopSequencer = {this.playStop.bind(this)}
				/>
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

	playTask() {
		var task = new Tone.Player({
			url: "http://d.zaix.ru/8TRz.mp3",
			loop: false,
			onload: function(){task.start()}
		}).toMaster();
	}

	render() {
		return (
			<div className="sequencer-task">
				<button onClick={this.playTask}>Task button</button>
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
			</div>
		);
	}
}

class TrackNotes extends React.Component {

	constructor(props) {
		super(props);
		this.notesToPlayArr = this.props.notesToPlay;
	}

	//+++ Убрал setState, т.к. пока в нем нет нужды - мы модифицируем массив нот непосредственно
	//		по ссылке на массив notesToPlay компонента Sequencer

	// componentDidMount() {
	// 	this.setState({
	// 		notesToPlay: this.notesToPlayArr
	// 	})
	// }

	changeNotesToPlay(instrumentId, noteId, value) {
		this.notesToPlayArr[instrumentId][noteId] = value;
		// this.setState({
		// 	notesToPlay: this.notesToPlayArr
		// });
	}

	// ---

	render() {
		return (
			<div className="sequencer-tracknotes">
				<Playhead />
				<Track
					instrumentId = {0}
					instrumentURL="http://d.zaix.ru/8UoS.mp3"
					sendChanges={this.changeNotesToPlay.bind(this)}
				/>
				<Track
					instrumentId = {1}
					instrumentURL = "http://d.zaix.ru/8UoT.mp3"
					sendChanges={this.changeNotesToPlay.bind(this)}
			 	/>
				<Track
					instrumentId = {2}
					instrumentURL = "http://d.zaix.ru/8UoU.mp3"
					sendChanges={this.changeNotesToPlay.bind(this)}
				/>
			</div>
		);
	}
}

class Playhead extends React.Component {
	render() {
		return (
			<div id="sequencer-tracknotes-playhead"></div>
		);
	}
}

class Track extends React.Component {

	constructor(props) {
		super(props);
		this.player = new Tone.Player(this.props.instrumentURL).toMaster();
		this.sendChanges = props.sendChanges;
	}

	playNote() {
		Tone.Transport.start();
		this.player.start();
		Tone.Transport.stop();
	}

	switchNote(noteId, value) {
		this.sendChanges(this.props.instrumentId, noteId, value);
	}

	render() {
		var noteArray = [];
		for(var i = 0; i < 16; i++) {
			noteArray.push(i);
		}

		return (
			<div className="track">
				{noteArray.map((x, i) => {
					return (
						<Note
						 		switchNote = {this.switchNote.bind(this)}
								id = {i}
								key = {i}
						/>);
					})
				}
			</div>
		);
	}
}

class Note extends React.Component {

	constructor(props) {
		super(props);
		this.className = "note";
	}

	componentDidMount() {
		this.setState({pushed: false});
	}

	push() {
		var isPushed = this.state.pushed;
		this.className = (!isPushed) ? "note-pushed" : "note";
		this.setState({pushed: !isPushed});
		this.props.switchNote(this.props.id, !this.state.pushed);
		// !this.state.pushed потому что в момент вызова switchNote this.state.pushed еще не изменен
	}

	render() {
		return (
			<div className={this.className} onClick={this.push.bind(this)}></div>
		);
	}
}

class SequencerButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {playing: false};
	}

	onPushPlaystop() {
		var playing = this.state.playing;
		if(playing) {
			this.props.playStopSequencer(true);
			this.setState({playing: false})
		} else {
			this.props.playStopSequencer(false);
			this.setState({playing: true})
		}
	}

	render() {
		return (
			<div className="sequencer-buttons">
				<button onClick={this.onPushPlaystop.bind(this)}>{ (this.state.playing) ? "Stop" : "Play"}</button>
				<button>Confirm</button>
			</div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';
import './index.css';

//Kick		http://d.zaix.ru/8UoS.mp3
//Snare		http://d.zaix.ru/8UoT.mp3
//Hi-hat		http://d.zaix.ru/8UoU.mp3
//Crash		http://d.zaix.ru/8UoV.mp3

// var drums = new Tone.Players({
// 	"Kick": "http://d.zaix.ru/8UoS.mp3",
// 	"Snare": "http://d.zaix.ru/8UoT.mp3",
// 	"HiHat": "http://d.zaix.ru/8UoU.mp3"
// }).toMaster();
//
// var loop = new Tone.Sequence(function(time, drum) {
// 	drums.get(drum).start(time, 0, "8n", 0);
// }, [["Kick", "Kick"], "Snare"], "4n");
//
// var hiHatloop = new Tone.Sequence(function(time, drum) {
// 	drums.get(drum).start(time, 0, "4n", 0);
// }, ["HiHat"], "8n");
//
// function play() {
// 	console.log('play');
// 	loop.start();
// 	hiHatloop.start();
// }
//
// function stop() {
// 	console.log('stop');
// 	loop.stop();
// 	hiHatloop.stop();
// }
//
// Tone.Transport.bpm.value = 68;
// Tone.Transport.start();
//
// var buttPlay = document.getElementById('play');
// buttPlay.onclick = play;
//
// var buttStop = document.getElementById('stop');
// buttStop.onclick = stop;

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

	play() {
		console.log('playin music');
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
					<TrackNotes />
				</div>
				<SequencerButtons
				play = {this.play}/>
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

	constructor() {
		super();
		this.kickPlayer = new Tone.Player(
			"http://d.zaix.ru/8UoS.mp3",
			function() {this.start}
		).toMaster();
		this.notesToPlayArr = [];
		for (var i = 0; i < 16; i ++) {
			this.notesToPlayArr.push(false);
		}
	}

	playTrack() {
		Tone.Transport.start();
		var loop = new Tone.Sequence(function(time, note) {
			if(note) {
				this.kickPlayer.start(time, 0, "4n", 0);
			}
		}.bind(this), this.state.notesToPlay, "8n");
		loop.start();
	}

	switchNote(index, value) {
		this.notesToPlayArr[index] = value;
		this.setState({notesToPlay: this.notesToPlayArr});
	}

	componentDidMount() {
		this.setState({notesToPlay: this.notesToPlayArr});
	}

	render() {
		var noteArray = [];
		for(var i = 0; i < 16; i++) {
			noteArray.push(i);
		}

		return (
			<div className="track">
				<button onClick={this.playTrack.bind(this)}>PLAYTRACK</button>
				{noteArray.map((x, i) => {
					return <Note
						 		switchNote = {this.switchNote.bind(this)}
								id = {i}
								key = {i}
							 />;
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
		this.pushButton = this.props.play;
	}

	render() {
		return (
			<div className="sequencer-buttons">
				<button onClick={this.pushButton}>Play/stop</button>
				<button>Confirm</button>
			</div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

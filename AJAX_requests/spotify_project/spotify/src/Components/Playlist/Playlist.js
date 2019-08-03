import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import { BaseComponent } from '../BaseComponent/BaseComponent';

class Playlist extends BaseComponent {
    constructor(props){
        super(props);
        this._bind('handleNameChange')
    }

    compondedDidUpdate(){
        console.log('update!!!!')
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render(){
        return(
            <div className="Playlist">
                <input value={this.props.name} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;

import React from 'react';
import './App.css';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'My Playlist',
            playlistTracks: []
        };
        this._bind('addTrack','removeTrack','updatePlaylistName','savePlaylist','search');
    }

    search(term){
        Spotify.search(term)
        .then(searchResults => this.setState({
            searchResults: searchResults
        }))
    }

    savePlaylist(){
        var trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                searchResults: [],
                playlistTracks: [],
                playlistName: "My Playlist"
            });
        });
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        });
    }

    removeTrack(track){
        var updatedPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
        this.setState({
            playlistTracks: updatedPlaylist
        });
    }

    addTrack(track){
        if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
            return;
        }
        const newPlaylistTracks = this.state.playlistTracks;
        newPlaylistTracks.push(track);
        this.setState({
            playlistTracks: newPlaylistTracks
        });
        //OR
        // this.setState(prevState => ({
        //     playlistTracks: [...prevState.playlistTracks, track]
        // }));
    }

    render(){
        return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                    <Playlist name={this.state.playlistName} playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
                </div>
            </div>
        </div>
        );
    }
}

export default App;

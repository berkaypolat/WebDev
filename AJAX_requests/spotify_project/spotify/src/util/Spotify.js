const client_id = '65505e3c2df8498ba4155420df81a92d';
const queryRedirect = '&redirect_uri=http://localhost:3000/';

var userAccessToken;

const Spotify = {
    getAccessToken(){
        if (userAccessToken){
            return userAccessToken;
        }
        var tokenArray = window.location.href.match(/access_token=([^&]*)/);
        var expiresArray = window.location.href.match(/expires_in=([^&]*)/);
        if (tokenArray && expiresArray) {
            console.log(tokenArray)
            userAccessToken = tokenArray[1];
            var expiresIn = Number(expiresArray[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Acess Token', null, '/');
            return userAccessToken;
        } else {
            const urlToLogin = 'https://accounts.spotify.com/authorize?';
            const queryResponseType = '&response_type=token';
            const scopes = '&scope=playlist-modify-public';
            const authEndpoint = `${urlToLogin}client_id=${client_id}${queryRedirect}${scopes}${queryResponseType}`;
            window.location = authEndpoint;
        }
    },

    search(term){
        //Spotify.getAccessToken();
        const baseUrl = 'https://api.spotify.com/v1';
        const searchParams = '/search?type=track&q=';
        var searchEndpoint = `${baseUrl}${searchParams}${term}`;
        console.log(`The search endpoint is ${searchEndpoint}`);
        return fetch(searchEndpoint, {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        }).then((response) => {
            if (!response.ok) { throw new Error("Request Failed.");}
            return response.json();
        }, (networkError) => {
            console.log(networkError.message);
        }).then((jsonResponse) => {
            if (!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(song =>({
                id: song.id,
                name: song.name,
                artist: song.artists[0].name,
                album: song.album.name,
                uri: song.uri
            }))
        });
    },

    savePlaylist(playlistName, trackUriArray){
        if (!playlistName || !trackUriArray.length){
            return;
        }
        //Spotify.getAccessToken();
        const userUrl = 'https://api.spotify.com/v1/me';
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        };
        var userId;
        var playlistId;
        return fetch(userUrl, {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
            const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
            fetch(createPlaylistUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ name: playlistName})
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
                const addPlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                fetch(addPlaylistTracksUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({ uris: trackUriArray})
                });
            })
        })
    }
};


export default Spotify;

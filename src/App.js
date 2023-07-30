import Navbar from "./components/Navbar";
import RecentlyPlayed from "./components/RecentlyPlayed";
import UserProfile from "./components/UserProfile";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import TopTracks from "./components/TopTracks";
import TopArtists from "./components/TopArtists";

const clientId = "028a74e2de804c7ea5bf28a9195bbfd4";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const numLim = 40;
let profile = null;
let topArtists = null;
let topTracks = null;
let recentlyPlayed = null;
// aws link: https://main.d3alb154qr6hrl.amplifyapp.com/ localhost: http://localhost:3000/callback
const redirect_uri = "https://main.d3alb154qr6hrl.amplifyapp.com/";

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  profile = await fetchContent('https://api.spotify.com/v1/me', accessToken);
  topArtists = await fetchContent(`https://api.spotify.com/v1/me/top/artists?limit=${numLim}`, accessToken);
  topTracks = await fetchContent(`https://api.spotify.com/v1/me/top/tracks?limit=${numLim}`, accessToken);
  recentlyPlayed = await fetchContent(`https://api.spotify.com/v1/me/player/recently-played?limit=${numLim}`, accessToken);
}

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirect_uri);
  params.append("scope", "user-read-private user-read-email user-top-read user-read-recently-played");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchContent(link, token) {
  const result = await fetch(link, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  return await result.json();
}

function App() {
  console.log(profile);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/callback">
              <Home />
            </Route>
            <Route path="/recents">
              <RecentlyPlayed recents={recentlyPlayed} />
            </Route>
            <Route path="/toptracks">
              <TopTracks tracks={topTracks} />
            </Route>
            <Route path="/topartists">
              <TopArtists artists={topArtists}/>
            </Route>
            <Route path="/info">
              <UserProfile profile={profile} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;

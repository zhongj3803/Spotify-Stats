import { callAPI } from '../heart.js';

const Home = () => {
    document.querySelector("body").style.overflowY = 'hidden';

    return (
        <div>
            <h1 className="description">This is Spotify Stats! Learn more about your own listening choices!</h1>
            <h5 className="description">*To fetch your Spotify data, I need to manually whitelist your email (feel free to reach out to me!)*</h5>
            <button type = "button" onClick={callAPI}>Switch background color!</button>
        </div>
    );
  }
  
  export default Home;
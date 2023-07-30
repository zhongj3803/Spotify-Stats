const UserProfile = ({ profile }) => {
    document.querySelector("body").style.overflowY = 'hidden';
    
    return (
        <div>
            <h3 className="description">Your information</h3>
            <ul>
                <li>User: <a href={profile.external_urls.spotify}>{profile.id}</a></li>
                <li>Display name: {profile.display_name}</li>
                <li>Number of followers: {profile.followers.total}</li>
                <li>Email: {profile.email}</li>
                <li>Country: {profile.country}</li>
                <li>Product: {profile.product}</li>
            </ul>
        </div>
        
    );
  }
   
  export default UserProfile;
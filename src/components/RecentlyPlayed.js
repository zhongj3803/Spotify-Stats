import moment from "moment";

const RecentlyPlayed = ( {recents} ) => {
    document.querySelector("body").style.overflowY = 'visible';
    
    return (
        <div>
            <h3 className="description">Here are your recently played tracks!</h3>    
            <table id="enclosing">
                <tbody>
                    <tr>
                        <th>Track</th>
                        <th>Artist(s)</th>
                        <th>Time Played (UTC)</th>
                    </tr>
                </tbody>
                
                {recents.items.map(item => {
                    let artistNames = item.track.artists.map(x => x.name);
                    let text = '';
                    artistNames.forEach(x => text = text + x + ', ')
                    text = text.substring(0, text.length - 2);
                    return (<tbody key={item.played_at}>
                                <tr className="tableElements">
                                    <td>{item.track.name}</td>
                                    <td>{text}</td>
                                    <td>{moment(item.played_at).utc().format('MMMM Do YYYY, h:mm:ss a')}</td>
                                </tr>
                            </tbody>)
                        })}
            </table>
        </div>
    );
  }
   
  export default RecentlyPlayed;
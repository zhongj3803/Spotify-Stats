const TopTracks = ({ tracks }) => {
    document.querySelector("body").style.overflowY = 'visible';
    
    return (
        <div>
            <h3 className="description">Here are your top tracks</h3>
            <table id="enclosing">
                {tracks.items.map((item, index) => {
                    let artistNames = item.artists.map(x => x.name);
                    let text = '';
                    artistNames.forEach(x => text = text + x + ', ')
                    text = text.substring(0, text.length - 2);
                    return (<tbody key={item.href} className="topTable">
                        <tr className="tableElements">
                            <td className="topElements">{index + 1}</td>
                            <td className="topElements"><img src={item.album.images[2].url} alt="track pic"/></td>
                            <td className="topElements">{item.name}</td>
                            <td className="topElements">{text}</td>
                        </tr>
                    </tbody>)
                })}
            </table>
        </div>
    );
}

export default TopTracks;
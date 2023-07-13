const TopArtists = ({ artists }) => {
    return (
        <div>
            <h3 className="description">Here are your top artists</h3>
            <table id="enclosing">
                {artists.items.map((item, index) => {
                    return (<tbody key={item.href} className="topTable">
                        <tr className="tableElements">
                            <td className="topElements">{index + 1}</td>
                            <td className="topElements"><img src={item.images[2].url} className="artistPics" /></td>
                            <td className="topElements">{item.name}</td>
                        </tr>
                    </tbody>)
                })}
            </table>
        </div>
    );
}

export default TopArtists;
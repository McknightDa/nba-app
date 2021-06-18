import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'




const Favorites = (props) => {
    const  data  = props.favTeams;
    console.log(data)
    //console.log(teamInfo.teamData.team.city)
    const styles = {
        cardHolder: { display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-around" ,paddingTop: 10},
        cardStyle: {marginBottom: 10, width: '18rem'}
    }
    
    return (
        <div className="teamName">
            <div style={styles.cardHolder}>

                {data.map((team, i) => (
                    <Card style={styles.cardStyle} key={team.id}>
                        <Card.Img variant="top" src={team.img} />
                        <Card.Body>
                            <Card.Title>{team.city}</Card.Title>
                            <Card.Text>
                                <span>{team.full_name}</span>
                                <br/>
                                <span> {team.conference}</span>
                                <br/>
                                <span> {team.division}</span>
                            </Card.Text>
                            <Button onClick={()=> props.deleteOption(team.id,data, i)} variant="primary">Delete Option</Button>
                        </Card.Body>
                    </Card>
                )
                )}
            </div>

        </div>
    )
}

export default Favorites
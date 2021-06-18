import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../actions'

const AllTeams = (props) => {
    React.useEffect(() => {
        props.setBasicAction()
    },[])

    const  data  = props.teamInfo;
    //console.log(props.teamInfo)
    //console.log(teamInfo.teamData.team.city)
    const styles = {
        cardHolder: { display: "flex", width: "100%", flexWrap: "wrap", justifyContent: "space-around" ,paddingTop: 10},
        cardStyle: {marginBottom: 10, width: '18rem'}
    }
    // const cardHolder = { display: "flex", width: "750px", flexWrap: "wrap" }
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
                                <span>{team.conference}</span>
                                <br/>
                                <span>{team.division}</span>
 
                            </Card.Text>
                            <Button variant="primary"  onClick={()=> props.addOption(i,data)}>Add Favorite</Button>
                        </Card.Body>
                    </Card>
                )
                )}
            </div>

        </div>
    )
}

const mapStateToProps = state =>({ basic: state.basicReducer.hello})

const mapActionsToProps = (dispatch) => {
return {
    ...bindActionCreators(actions, dispatch)
}
}

export default connect(mapStateToProps, mapActionsToProps)(AllTeams)

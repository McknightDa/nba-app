import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class Form extends Component {
    constructor(props) {
        super(props)
        const { username, email } = props
        this.state = {
            username, email
        }}

        handleChange = (e) => {
            console.log(e, ">>>Before SetState Runs")
            let target = e.target.value
            this.setState({
                [e.target.name]: target
            })
            //console.log(this.state, ">>>>>After SetState Runs")
            setTimeout(() => console.log(this.state, ">>>After SetState"), 1000)
        }
        handleSubmit = ({username , email}) => (e) => {
            e.preventDefault()
            axios.patch("https://nba-app-cfa32-default-rtdb.firebaseio.com/user.json", { username, email })
            .then(response => {
                this.props.updatingState()
                console.log(response)
            })
    
        }

        render() {
            let userInfo = JSON.parse(JSON.stringify(this.state));
            return (
                <>
                    <p>Manage Your Account</p>
                    <center>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Hello {userInfo.username}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{userInfo.email}</Card.Subtitle>
                                <p>Edit Your Information:</p>
                                <form onSubmit={this.handleSubmit(userInfo)}>
                                    <label>
                                        Username
                                    </label>
                                    <input type="text" name="username" onChange={(e) => this.handleChange(e)} placeholder={userInfo.username} />
                                    <br />
                                    <label>
                                        Email
                                    </label>
                                    <br />
                                    <input type="text" name="email" onChange={(e) => this.handleChange(e)} placeholder={userInfo.email} />
                                    <br />
                                    <br />
                                    <Button variant="primary" type="submit" >Submit</Button>
                                </form>
                                
    
                            </Card.Body>
                        </Card>
                    </center>
                </>
            )
        }
    }
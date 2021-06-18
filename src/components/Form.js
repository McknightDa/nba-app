import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class Form extends Component{
    constructor(props) {
        super(props)
        const { username, email } = props
        this.state = {
            username, email
        }

    }
}
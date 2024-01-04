import React, { Component } from 'react'

export class Loading extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src='loading.gif' alt="loading" />
            </div>
        )
    }
}

export default Loading

import React, { Component } from 'react'
import { View, Image } from 'react-native'

export default class LogoTitle extends Component{
    render() {
        return (
            <View style={{height: 50}}>
                <Image source={require('./Images/max.png')}
                style={{ width: 40, height: 40, marginTop: 10, marginLeft: 30 }} />
            </View>
        )
    }
}
import React, {Component} from 'react'
import {View} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ChatScreen from './Chat/ChatScreen/Component';
import LoginScreen from './Login/LoginScreen/Component';

const Stack = createStackNavigator({
        login: { screen: LoginScreen },
        chat: { screen: ChatScreen },
    },
    {
        initialRouteName: 'login'
    }
)

const Navigation = createAppContainer(Stack);

class Root extends Component{
    constructor(props) {
        super(props)
        this.state = {
            theme: props.theme
        }
    }
    


    render() {
        return (
                <Navigation />
        )
    }
}

export default Root;
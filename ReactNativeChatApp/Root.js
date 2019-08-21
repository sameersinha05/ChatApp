import React, {Component} from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ChatScreen from './Chat/ChatScreen/Component';
import LoginScreen from './Login/LoginScreen/Component';
import ThemeContext from './Themes/ThemeContext'

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
            theme: 'light'
        }
    }
    


    render() {
        return (
            <ThemeContext.Provider value={{ theme: this.state.theme }}>
                <Navigation />
            </ThemeContext.Provider>
        )
    }
}

export default Root;
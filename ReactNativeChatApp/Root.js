import React, {Component} from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ChatScreen from './Chat/ChatScreen/Component';
import LoginScreen from './Login/LoginScreen/Component';
import ThemeContext from './Themes/ThemeContext'
import LogoTitle from './LogoTitle';
import { connect } from 'react-redux'
import SettingContextMenu from './ContextMenu/SettingContextMenu'

const Stack = createStackNavigator({
        login: { screen: LoginScreen },
        chat: { screen: ChatScreen },
    },
    {
        initialRouteName: 'login',
        defaultNavigationOptions: {
            headerTitle: <LogoTitle />,
            headerRight: <SettingContextMenu />
        }
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
            <ThemeContext.Provider value={{ theme: this.props.theme }}>
                <Navigation screenProps = {{ theme: this.props.theme }} />
            </ThemeContext.Provider>
        )
    }
}

function mapStateToProps(state) {
    return {
        theme: state.themeReducer.theme
    }
}

export default connect(mapStateToProps)(Root);
import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import styles from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ThemeContext from './../../Themes/ThemeContext'
import LoginThemeConstants from './../../Themes/LoginThemeConstants'
import SettingContextMenu from './../../ContextMenu/SettingContextMenu'

class LoginScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            password: ''
        }
    }

    static navigationOptions = ({ screenProps }) => {
        return {
            headerStyle: { backgroundColor: LoginThemeConstants[screenProps.theme].header.backgroundColor}
        }
    }

    render(){
        const {navigate} = this.props.navigation

        return(
            <ThemeContext.Consumer>
                {({ theme }) => (
                        <View style={[styles.MainContainer, {backgroundColor: LoginThemeConstants[theme].page.backgroundColor }]}>
                            <View style={styles.MainContainerContent}>
                                <Text style={[styles.Title, {color: LoginThemeConstants[theme].page.color }]}>Sign In</Text>
                                <TextInput
                                    placeholder = "Your EmailId:"
                                    onChangeText = {data => this.setState({ emailId: data }) }
                                    style = {[styles.inputLayoutStyle, 
                                        { borderColor: LoginThemeConstants[theme].page.borderColor },
                                        { color: LoginThemeConstants[theme].page.color },
                                    ]} underlineColorAndroid = 'transparent'
                                /> 
                                <TextInput
                                    secureTextEntry = {true}
                                    placeholder = "password:"
                                    onChangeText = {data => this.setState({ password: data }) }
                                    style = {[styles.inputLayoutStyle, 
                                        { borderColor: LoginThemeConstants[theme].page.borderColor },
                                        { color: LoginThemeConstants[theme].page.color },
                                    ]} underlineColorAndroid = 'transparent'
                                />

                                <TouchableOpacity style = {[styles.SubmitButtonStyle, 
                                                    { backgroundColor: LoginThemeConstants[theme].button.backgroundColor },
                                                    { borderColor: LoginThemeConstants[theme].page.borderColor }]}
                                    onPress = {() => navigate("chat", {screen: "ChatScreen"})}
                                    >
                                    <View style = {styles.SubmitButtonContentStyle}>
                                        <Text style = {{paddingTop: 5, alignSelf: 'flex-start', color: '#fff'}}>CONFIRM</Text>
                                        <View style = {[styles.ArrowContainerStyle, {backgroundColor: LoginThemeConstants[theme].page.backgroundColor}]}>
                                            <FontAwesomeIcon style = {{marginLeft: 5, color: LoginThemeConstants[theme].button.color}} icon= {faArrowRight}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default LoginScreen;
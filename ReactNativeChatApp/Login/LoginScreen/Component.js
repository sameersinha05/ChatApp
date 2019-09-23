import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import styles from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import ThemeContext from './../../Themes/ThemeContext'
import LoginThemeConstants from './../../Themes/LoginThemeConstants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../store/apiEnvironment/action'

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

    onPress = (navigate) => {
        navigate("chat", {screen: "ChatScreen"})
        var env = { baseUrl: this.state.emailId, context: this.state.password }
        this.props.setApiEnvironments(env)
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
                                    placeholder = "BaseUrl:"
                                    // placeholder = "Your EmailId:"
                                    onChangeText = {data => this.setState({ emailId: data }) }
                                    style = {[styles.inputLayoutStyle, 
                                        { borderColor: LoginThemeConstants[theme].page.borderColor },
                                        { color: LoginThemeConstants[theme].page.color },
                                    ]} underlineColorAndroid = 'transparent'
                                /> 
                                <TextInput
                                    // secureTextEntry = {true}
                                    // placeholder = "password:"
                                    placeholder = "ApiContext:"
                                    onChangeText = {data => this.setState({ password: data }) }
                                    style = {[styles.inputLayoutStyle, 
                                        { borderColor: LoginThemeConstants[theme].page.borderColor },
                                        { color: LoginThemeConstants[theme].page.color },
                                    ]} underlineColorAndroid = 'transparent'
                                />

                                <TouchableOpacity style = {[styles.SubmitButtonStyle, 
                                                    { backgroundColor: LoginThemeConstants[theme].button.backgroundColor },
                                                    { borderColor: LoginThemeConstants[theme].page.borderColor }]}
                                                    onPress = {() => this.onPress(navigate)}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators (Actions, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginScreen);

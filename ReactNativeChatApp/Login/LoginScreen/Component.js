import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import styles from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class LoginScreen extends Component{
    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            password: ''
        }
    }

    render(){
        const {navigate} = this.props.navigation

        return(
            <View style={[styles.MainContainer, {backgroundColor: "#303030"}]}>
                <View style={styles.MainContainerContent}>
                    <Text style={styles.Title}>Sign In</Text>
                    <TextInput
                        placeholder = "Your EmailId:"
                        onChangeText = {data => this.setState({ emailId: data }) }
                        style = {[styles.inputLayoutStyle, 
                            {borderColor: "#fff"},
                            {color: "#fff"},
                        ]} underlineColorAndroid = 'transparent'
                    /> 
                    <TextInput
                        secureTextEntry = {true}
                        placeholder = "password:"
                        onChangeText = {data => this.setState({ password: data }) }
                        style = {[styles.inputLayoutStyle, 
                            {borderColor: "#fff"},
                            {color: "#fff"},
                        ]} underlineColorAndroid = 'transparent'
                    />

                    <TouchableOpacity style = {[styles.SubmitButtonStyle, 
                                        { backgroundColor: "#35C3CF" },
                                        { borderColor: "#fff" }]}
                        onPress = {() => navigate("chat", {screen: "ChatScreen"})}
                        >
                        <View style = {styles.SubmitButtonContentStyle}>
                            <Text style = {{paddingTop: 5, alignSelf: 'flex-start', color: '#fff'}}>CONFIRM</Text>
                            <View style = {[styles.ArrowContainerStyle, {backgroundColor: "#303030"}]}>
                                <FontAwesomeIcon style = {{marginLeft: 5, color: "#fff"}} icon= {faArrowRight}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default LoginScreen;
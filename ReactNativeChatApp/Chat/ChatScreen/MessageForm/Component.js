import React, {Component} from 'react'
import {View, TextInput, TouchableOpacity} from 'react-native'
import styles from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons'

class MessageFormComponent extends Component {

    constructor() {
        super()
        this.state = {
            userMessageText: ''
        }
    }

    render(){
        return(
            <View style={styles.messageRequesterStyle}>
                <TextInput
                        ref={input => {this.textInput = input}}
                        placeholder="Type a message here"
                        onChangeText={data => this.setState({userMessageText:data})} 
                        style={styles.textInputStyle}
                        underlineColorAndroid='transparent'
                        />
                <TouchableOpacity onPress={this.OnInputSubmit} activeOpacity={0.7}>
                    {this.renderImage()}
                </TouchableOpacity>
            </View>
        )
    }

    OnInputSubmit = () => {
        if (this.textInput != undefined)
            this.textInput.clear()
        this.props.OnInputSubmit(this.state.userMessageText)
        this.setState({userMessageText: ''})
        this.renderImage
    }

    renderImage=() => {
        if(this.state.message != '')
        {
            return(
                <View style={styles.ImageIconStyle}>
                    <FontAwesomeIcon color='#35C3CF' icon={faPaperPlane} />
                </View>
            )
        }else{
            return(
                <View style={styles.ImageIconStyle}>
                    <FontAwesomeIcon color='#35C3CF' icon={faMicrophone} />
                </View>
            )
        }
    }
}

export default MessageFormComponent;
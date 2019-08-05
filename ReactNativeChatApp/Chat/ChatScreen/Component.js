import React, {Component} from 'react'
import {View, Text} from 'react-native'
import styles from './Styles'
import MessageListComponent from './MessageList/Component'
import MessageFormComponent from './MessageForm/Component'
import chatService from "./../../services/chatservice"

class ChatScreenComponent extends Component { 

    constructor() {
        super ();

        this.toBeCheckedBeforeSend = false
        this.currentMessageId = 0
        this.userInputMessage = ''
        this.selectedOption = null
        this.messages = []
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        var messages = chatService.getInitialDefaultMaxMessages()
        messages.forEach((message) => {
            this.currentMessageId++
            message.messageId = this.currentMessageId
            this.messages.push(message)
        })

        this.setState({messages: [...this.messages]})
    }


    sendMessage()
    {
        var responseJson = chatService.mockSendMessage(this.userInputMessage)
        var maxMessages = chatService.getMaxMessages(responseJson)
        maxMessages.forEach((message) => {
            this.currentMessageId++
            message.messageId = this.currentMessageId
            this.messages.push(message)
        })
        
        this.setState({messages: [...this.messages]})
        this.toBeCheckedBeforeSend = chatService.getToBeCheckedBeforeSendingValue()
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <MessageListComponent onOptionSelection={this.onOptionSelection}
                                        renderItemActionHandler={this.renderItemActionHandler}
                                        messages= {this.state.messages}/>
                <MessageFormComponent OnInputSubmit={this.OnInputSubmit}/>
            </View>
        )
    }

    OnInputSubmit = (userMessage) => {
        if (this.toBeCheckedBeforeSend === false)
        {
            if (userMessage != "")
            {
                if (this.selectedOption != "Yes")
                {
                    this.userInputMessage = userMessage
                    this.currentMessageId++
                    var messageId = this.currentMessageId
                    this.messages.push({text: userMessage, from: "User", type: "", options: [], messageId: messageId})
                    this.sendMessage()
                    this.setState({messages: [...this.messages]})
                }
                else
                {
                    this.userInputMessage = "FeedbackYes"
                    this.sendMessage()
                    this.selectedOption = ""
                }
            }
            else
            {
                alert("Please select one of the options first.")
            }
        }

        onOptionSelection = (option) => {
            this.toBeCheckedBeforeSend = false
            if (option != "No" && option != "Yes")
            {
                this.userInputMessage = option
                this.sendMessage()
            }

            this.selectedOption = option
        }

        renderItemActionHandler = (eventMessage) => {
            this.toBeCheckedBeforeSend = false
            this.userInputMessage = eventMessage
            this.sendMessage()
        }
    }
}

export default ChatScreenComponent;
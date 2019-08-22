import React, {Component} from 'react'
import {View, Text} from 'react-native'
import styles from './Styles'
import MessageListComponent from './MessageList/Component'
import MessageFormComponent from './MessageForm/Component'
import chatService from "./../../services/chatservice"
import ThemeContext from './../../Themes/ThemeContext'
import ChatThemeConstants from './../../Themes/ChatThemeConstants'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

class ChatScreen extends Component { 

    constructor() {
        super ();

        this.toBeCheckedBeforeSend = false
        this.currentMessageId = 0
        this.userInputMessage = ''
        this.selectedOption = null
        this.messages = []
        this.state = {
            modalVisible: false,
            messages: []
        }
    }

    static navigationOptions = ({ screenProps }) => {
        return {
            headerStyle: { backgroundColor: ChatThemeConstants[screenProps.theme].header.backgroundColor}
        }
    }

    componentWillMount() {
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
            <ThemeContext.Consumer>
                {({ theme }) => (
                        <View style={[styles.MainContainer, {backgroundColor: ChatThemeConstants[theme].page.backgroundColor}]}>
                            <Dialog height = {100} width = {380}
                                visible={this.state.modalVisible}
                                footer={
                                <DialogFooter>
                                    <DialogButton
                                    text="No"
                                    onPress={() => { this.setState({modalVisible: false})}}
                                    />
                                    <DialogButton
                                    text="Yes"
                                    onPress={() => {
                                                        this.onPreviousContextConfirmationIgnore()
                                                        this.setState({modalVisible: false})}
                                                    }
                                    />
                                </DialogFooter>
                                }
                            >
                                <DialogContent>
                                    <View>
                                        <Text>You have an option to be selected in previous context. Are you sure you do not want to select.</Text>
                                    </View>
                                </DialogContent>
                            </Dialog>
                            <MessageListComponent 
                                                    renderItemActionHandler={this.renderItemActionHandler}
                                                    onOptionSelection={this.onOptionSelection}
                                                    onDateSelection={this.onDateSelection}
                                                    messages= {this.state.messages}/>
                            <MessageFormComponent OnInputSubmit={this.OnInputSubmit}
                                                    TakePicture={this.TakePicture}/>
                        </View>
                
                )}
            </ThemeContext.Consumer>
        )
    }

    
    TakePicture = (picture) => {
        chatService.setPicture(picture)
        var messages = chatService.getMaxMessageForPicture();
        messages.forEach((message) => {
            this.currentMessageId++
            message.messageId = this.currentMessageId
            this.messages.push(message)
        });
        this.setState({messages: [...this.messages]})
    }

    onDateSelection = (date) => {
        chatService.setDate(date)
        var messages = chatService.getMaxMessageForDate();
        messages.forEach((message) => {
            this.currentMessageId++
            message.messageId = this.currentMessageId
            this.messages.push(message)
        });
        this.setState({messages: [...this.messages]})
    }

    OnInputSubmit = (userMessage) => {
        
        this.userInputMessage = userMessage
        if (this.toBeCheckedBeforeSend === false)
        {
            if (userMessage != "")
            {
                if (this.selectedOption != "Yes")
                {
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
        } 
        else
        {
            this.setState({ modalVisible: true })
        }
    }

    onPreviousContextConfirmationIgnore = () => {
        var lastMessage = this.messages.slice(-1).pop()
        lastMessage.messageId = 0
        this.toBeCheckedBeforeSend = false
        this.currentMessageId++
        var messageId = this.currentMessageId
        this.messages.push({text: this.userInputMessage, from: "user", type: '', options: [], messageId: messageId})
        this.setState({ messages: [...this.messages] })
        this.sendMessage()
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

export default ChatScreen;

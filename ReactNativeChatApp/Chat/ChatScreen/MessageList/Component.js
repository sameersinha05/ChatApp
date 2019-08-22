import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles'
import MessageRowComponent from './MessageRow/Component'
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const messageListHeight = height - 150

class MessageListComponent extends Component { 

    render(){
        return(
            <View style={styles.messageCompleteStyle}>
                <FlatList style={[styles.messageDisplayStyle, {height: messageListHeight}]} 
                    ref = {(ref) => {this.flatList = ref; }}
                    data={this.props.messages} 
                    extraData= {this.props.messages}
                    ref={(ref) => {this.flatList = ref;}}
                    renderItem={this.renderItem}
                    onContentSizeChange={this.OnMessageListChange}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={(item, index) => String(index)}
                />
            </View>
        )
    }

    onOptionSelection = (option) => {
        this.props.onOptionSelection(option)
    }

    renderItemActionHandler = (eventMessage) => {
        this.props.renderItemActionHandler(eventMessage)
    }

    renderItem = ({item}) => {
            return <MessageRowComponent  onOptionSelectionChanged={this.onOptionSelection}
                                            action={this.renderItemActionHandler}
                                            onDateSelection={this.onDateSelection}
                                            type={item.type} from={item.from} text={item.text}
                                            messageId={item.messageId} options={item.options}/>
    }

    onDateSelection = (date) => {
        this.props.onDateSelection(date);
    }

    OnMessageListChange =() => {
            this.flatList.scrollToOffset({
                    offset: this.props.messages.length,
                    animated: false
            });

            this.flatList.scrollToEnd({ animated: false })
    }

    FlatListItemSeparator =() => {
        return(
            <View 
            style={{
                height:10,
                width:"100%",
            }}
            />
        );
    }
}

MessageListComponent.protoTypes = {
    messages: PropTypes.array.isRequired
}
export default MessageListComponent;



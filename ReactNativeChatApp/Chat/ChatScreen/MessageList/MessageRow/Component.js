import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import ViewMoreText from 'react-native-view-more-text';
import renderIf from './renderif';
import Emoji from './Emoji';
import { AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import styles from './Styles';
import DatePicker from 'react-native-datepicker';
import MessageRowThemeConstants from './../../../../Themes/MessageRowThemeConstants'
import ThemeContext from './../../../../Themes/ThemeContext'
// import { Image } from 'expo';

class MessageRowComponent extends Component {
    static currentTheme = "dark"
    constructor(props) {
        super(props)

        this.currentMessageId = 0
        this.state = {
            selectedOption: null,
            selectedFeedback: null,
            datePickerDisable:false,
        }
    }

    componentWillMount() {
        this.currentMessageId = this.props.messageId
    }

    onStarRatingPress(rating){
        this.props.action("UserRatings:" + rating);
        this.currentMessageId = 0
    }
    onOptionSelection(option){
        this.props.onOptionSelectionChanged(option);
        this.currentMessageId = 0
        this.setState({selectedOption: option});
    }
    userFeedBackOnPress(feedback){
        this.props.action(feedback);
        this.currentMessageId = 0
        this.setState({selectedFeedback:feedback});
    }

    onDateSelection(selectedDate) {
        this.setState({datePickerDisable:true, date: selectedDate})
        this.props.onDateSelection(selectedDate);
    }

    getOptionControlList = (theme) => {
        var optionControlList = []
        if (this.props.options != undefined)
        {
            this.props.options.forEach((item) => {
                optionControlList.push(
                    <TouchableOpacity style={this.state.selectedOption === item? 
                        [
                            styles.PressedButtonStyle,
                            {backgroundColor: MessageRowThemeConstants[theme].pressed.backgroundColor},
                            {borderColor: MessageRowThemeConstants[theme].pressed.borderColor},
                        ]
                        :[
                            styles.ButtonStyle,
                            {backgroundColor: MessageRowThemeConstants[theme].unpressed.backgroundColor},
                            {borderColor: MessageRowThemeConstants[theme].unpressed.borderColor},
                        ]} 
                                        disabled = {this.currentMessageId === this.props.messageId ? false : true}
                                        onPress={()=>this.onOptionSelection(item)} activeOpacity={0.5}>
                            <Text style={this.state.selectedOption === item?
                                 [
                                     styles.OptionTextStyleOnPress,
                                     {color: MessageRowThemeConstants[theme].pressed.color}
                                 ]
                                 : 
                                 [
                                    styles.OptionTextStyle,
                                    {color: MessageRowThemeConstants[theme].unpressed.color}
                                 ]
                                 }>
                                 {item}
                            </Text>
                    </TouchableOpacity>
                )
            })
        }

        return optionControlList
    }

    getFeedbackOptionsControls = (theme) => {
        var feedbackOptions = [{id:"1",image:"😃",text:"Nice"},{id:"2",image:"😐",text:"Normal"},{id:"3",image:"😟",text:"Bad"}]
        var feedbackOptionsControls = []
        feedbackOptions.forEach((item)=>{
            feedbackOptionsControls.push(
                <TouchableOpacity style={styles.UserFeedBackButtonStyle} underlayColor={'#35C3CF'} 
                 onPress={()=>this.userFeedBackOnPress(item.text)} key={item.id} activeOpacity={0.5}
                 disabled = {this.currentMessageId === this.props.messageId ? false : true}>
                     <View style={this.state.selectedFeedback === item.text? 
                        [styles.InRowStyle, {backgroundColor: MessageRowThemeConstants[theme].pressed.backgroundColor}] 
                        : styles.InRowStyle}>
                         <Emoji symbol={item.image} label={item.text} />
                        <Text style={this.state.selectedFeedback === item.text? 
                            [styles.UserFeedbackOptionPressedTextStyle, {color: MessageRowThemeConstants[theme].pressed.color}]
                            : 
                            [styles.UserFeedbackOptionTextStyle, {color: MessageRowThemeConstants[theme].unpressed.color}]}>
                            {item.text}
                        </Text>
                     </View>
                </TouchableOpacity>
            )
        })

        return feedbackOptionsControls;
    }

    render() {
        
        return(
            <ThemeContext.Consumer>
                {({ theme }) => (

                        <View style={this.conversationStyle(this.props.from, this.props.type, theme)}>
                        {
                            renderIf(this.props.type == "")(
                            <ViewMoreText
                                numberOfLines={3} 
                                renderViewMore={this.renderViewMore} 
                                renderViewLess={this.renderViewLess}
                                textStyle={{textAlign: 'center'}}
                            >
                                <Text style={this.messageStyle(this.props.from, theme)}>
                                    {this.props.text}
                                </Text>
                            </ViewMoreText>
                            )}
                            {
                                renderIf(this.props.type == "radio")(
                                    <View style={styles.InRowStyle}>
                                        { this.getOptionControlList(theme) }
                                    </View>
                                )
                            }
                            {
                                renderIf(this.props.type == "userFeedback")(
                                    <View style={styles.UserFeedbackStyle}>
                                        <Text style={{color: MessageRowThemeConstants[theme].conversation.max.color, 
                                        fontSize:16, marginBottom:20}}>How was your experience?</Text>
                                        { this.getFeedbackOptionsControls(theme)}
                                    </View>
                                )
                            }
                            {
                                renderIf(this.props.type == "rating")(
                                    <View>
                                        <Text style={{color: MessageRowThemeConstants[theme].conversation.max.color, fontSize:16}}>
                                            Please rate your experience
                                        </Text>
                                        <AirbnbRating 
                                            reviews={[]} 
                                            size={25}
                                            ratingCount={5} 
                                            defaultRating={3}
                                            isDisabled = {this.currentMessageId === this.props.messageId ? false : true}
                                            onFinishRating={(rating) => this.onStarRatingPress(rating)}
                                        />
                                    </View>
                                )
                            }
                            {
                                renderIf(this.props.type === "image")(
                                    <View>
                                        {/* <Text>{this.props.text}</Text> */}
                                        <Image source={{ isStatic: true, uri: this.props.text }} style={{ width: 150, height: 150 }} />
                                    </View>
                                )
                            }{
                            renderIf(this.props.type === "Date")(
                                <DatePicker
                                style={{width: 200}}
                                date={this.state.date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                disabled={this.state.datePickerDisable}
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                        color: '#fff',
                                    marginLeft: 36 
                                    }
                                }}
                                onDateChange={(date) => this.onDateSelection(date)}
                                />
                            )}
                        </View>
                )}
            </ThemeContext.Consumer>
        )
    }

    renderViewMore(onPress){
        return(
            <Text style={[styles.textMoreOrLessStyle, {color: MessageRowThemeConstants[MessageRowComponent.currentTheme].conversation.user.backgroundColor}]} 
                    onPress={onPress}>See more</Text>
        )
    }

    renderViewLess(onPress){
        return(
            <Text style={[styles.textMoreOrLessStyle, {color: MessageRowThemeConstants[MessageRowComponent.currentTheme].conversation.user.backgroundColor}]} 
                    onPress={onPress}>See less</Text>
        )
    }

    conversationStyle=function(from, type, theme){
        MessageRowComponent.currentTheme = theme
        if (type == 'radio')
        {
            return {
                flexDirection: 'row'
            }
        }
        else
        {
            if(from == 'MAX'){
                return{
                    padding:10,
                    borderRadius:20,
                    backgroundColor: MessageRowThemeConstants[theme].conversation.max.backgroundColor,
                    borderTopLeftRadius:5,
                    alignSelf:'flex-start'
                }
            }else{
                return{
                    padding:10,
                    borderRadius:20,
                    marginLeft:40,
                    backgroundColor: MessageRowThemeConstants[theme].conversation.user.backgroundColor,
                    borderTopLeftRadius:5,
                    alignSelf:'flex-end',
                    marginRight:20
                }
            }
        }
    }

    messageStyle = function(from, theme) {
        if (from == "MAX")
        {
            return {
                padding: 10,
                fontSize: 15,
                color: MessageRowThemeConstants[theme].conversation.max.color
            }
        }
        else
        {
            return {
                padding: 10,
                fontSize: 15,
                color: MessageRowThemeConstants[theme].conversation.user.color
            }
        }
    }
}

MessageRowComponent.propTypes = {
    text: PropTypes.string,
    from: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.array,
    messageId: PropTypes.number,
}

export default MessageRowComponent;

import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import ViewMoreText from 'react-native-view-more-text';
import renderIf from './renderif';
import Emoji from './Emoji';
import { AirbnbRating} from 'react-native-ratings';
import PropTypes from 'prop-types';
import styles from './Styles';
import DatePicker from 'react-native-datepicker';
// import { Image } from 'expo';

class MessageRowComponent extends Component {
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

    render() {
        var optionControlList = []
        if (this.props.options != undefined)
        {
            this.props.options.forEach((item) => {
                optionControlList.push(
                    <TouchableOpacity style={this.state.selectedOption === item? styles.PressedButtonStyle: styles.ButtonStyle} underlayColor={'#35C3CF'}
                                        disabled = {this.currentMessageId === this.props.messageId ? false : true}
                                        onPress={()=>this.onOptionSelection(item)} activeOpacity={0.5}>
                            <Text style={this.state.selectedOption === item? styles.OptionTextStyleOnPress: styles.OptionTextStyle}>{item}</Text>
                    </TouchableOpacity>
                )
            })
        }

        var feedbackOptions = [{id:"1",image:"😃",text:"Nice"},{id:"2",image:"😐",text:"Normal"},{id:"3",image:"😟",text:"Bad"}]
        var feedbackOptionsControls = []
        feedbackOptions.forEach((item)=>{
            feedbackOptionsControls.push(
                <TouchableOpacity style={styles.UserFeedBackButtonStyle} underlayColor={'#35C3CF'} 
                 onPress={()=>this.userFeedBackOnPress(item.text)} key={item.id} activeOpacity={0.5}
                 disabled = {this.currentMessageId === this.props.messageId ? false : true}>
                     <View style={this.state.selectedFeedback === item.text? styles.UserFeedbackPressedContentStyle : styles.UserFeedbackContentStyle}>
                         <Emoji symbol={item.image} label={item.text} />
                        <Text style={this.state.selectedFeedback === item.text? styles.UserFeedbackOptionPressedTextStyle : styles.UserFeedbackOptionTextStyle}>{item.text}</Text>
                     </View>
                </TouchableOpacity>
            )
        })

        return(
            <View style={this.conversationStyle(this.props.from, this.props.type)}>
               {
                renderIf(this.props.type == "")(
                <ViewMoreText
                    numberOfLines={3} 
                    renderViewMore={this.renderViewMore} 
                    renderViewLess={this.renderViewLess}
                    textStyle={{textAlign: 'center'}}
                >
                    <Text style={styles.message}>
                        {this.props.text}
                    </Text>
                </ViewMoreText>
                )}
                {
                    renderIf(this.props.type == "radio")(
                        <View style={styles.InRowStyle}>
                            { optionControlList}
                        </View>
                    )
                }
                {
                    renderIf(this.props.type == "userFeedback")(
                        <View style={styles.UserFeedbackStyle}>
                            <Text style={{color:'#fff', fontSize:16, marginBottom:20}}>How was your experience?</Text>
                            { feedbackOptionsControls}
                        </View>
                    )
                }
                {
                     renderIf(this.props.type == "rating")(
                        <View>
                            <Text style={{color:'#fff', fontSize:16}}>Please rate your experience</Text>
                            <AirbnbRating 
                                type='custom' 
                                ratingColor='#fff'
                                ratingBackgroundColor='#fff' 
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
                {/* {
                renderIf(this.props.type == "Date" && this.props.from == "MAX")(
                <ViewMoreText
                    numberOfLines={3} 
                    renderViewMore={this.renderViewMore} 
                    renderViewLess={this.renderViewLess} 
                    textStyle={{textAlign: 'center'}}
                >
                    <Text style={styles.item} >
                        {item.text}
                    </Text>
                </ViewMoreText>
                )} */}
            </View>
        )
    }

    renderViewMore(onPress){
        return(
            <Text style={styles.textMoreOrLessStyle} onPress={onPress}>See more</Text>
        )
    }

    renderViewLess(onPress){
        return(
            <Text style={styles.textMoreOrLessStyle} onPress={onPress}>See less</Text>
        )
    }

    conversationStyle=function(from, type){
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
                    backgroundColor:'#424242',
                    borderTopLeftRadius:5,
                    alignSelf:'flex-start'
                }
            }else{
                return{
                    padding:10,
                    borderRadius:20,
                    marginLeft:40,
                    backgroundColor:'#35C3CF',
                    borderTopLeftRadius:5,
                    alignSelf:'flex-end',
                    marginRight:20
                }
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

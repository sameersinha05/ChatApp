import React, {Component} from 'react'
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons'
import ViewMoreText from 'react-native-view-more-text';
import renderIf from './renderif';
import Emoji from './Emoji';
import {Rating, AirbnbRating} from 'react-native-ratings';
import DatePicker from 'react-native-datepicker';

const windowheight = 520
class Chat extends Component {
    static navigationOptions = {
        title: 'Chat',
    };
    constructor(props){
        super(props);
        this.messages = [{text: 'Hi, I am MAX! Welcome.', from:'MAX', type:'', options:[]}]
        this.messages.push({text: "I am your personal assistant, I will help you place small and bulk orders of vehicle at any time.", from: "MAX", type:'', options:[]});
        this.messages.push({text: "Here a few things you can do with me: \n Type \" Restart\" to start the conversaton. \n Type \" Find Cheaper\" to find a cheaper car offer. \nType \"Help\" to see contextual help and help menu.", from: "MAX", from: "MAX", type:'', options:[]});
        this.state = {
            messagesHolder: [],
            optionList:[],
            message : '',
            outputMessage: '',
            selectedOption: null,
            selectedUserFeedback: null,
            isHideText:true,
            isHideDate:false,
            date:"15-05-2018"  

        }
    }

    componentDidMount(){
        this.setState({messagesHolder: [...this.messages]})
    }

    getResponse(text){
            fetch('http://192.168.43.176:8443/api/Bots?userMessage='+text, {
                method: 'POST',
                Origin: "http://localhost:19006",
                headers: {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.type == "feedback")
                        {
                            this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"userFeedback", options: []});
                        }
                        else if(responseJson.type == "radio")
                        {
                            this.setState({ optionList: responseJson.options})
                            if(responseJson.outputMessage != "" && responseJson.outputMessage != undefined){
                                this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"", options: []});
                            }
                            this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"radio", options: responseJson.options});
                        }
                        else if(responseJson.type == "rating")
                        {
                            this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"rating", options: []});
                        }
                        else if(responseJson.type == "Date")
                        {
                            this.setState({isHideDate:true,isHideText:false});
                            this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"Date", options: []});
                        }
                        else{
                            this.messages.push({text:responseJson.outputMessage, from:"MAX", type:"", options: []});
                        }
                        this.setState({ outputMessage: responseJson.outputMessage})
                        this.setState({messagesHolder: [...this.messages]})
                        console.log(responseJson)
                        this.flatList.scrollToEnd({animated:false});
                    })
                    .catch((error)=>{
                        alert(error)
                        console.error(error);
                     });
    }

    joinData = () => {
        //console.error('pressed');
        this.setState({isHideDate:false,isHideText:true });
        if(this.state.message != ''){

            if(this.state.selectedOption != "Yes")
            {
        
            this.getResponse(this.state.message)
            this.messages.push({text:this.state.message, from:"User", type:"", options: []});
            this.setState({messagesHolder: [...this.messages]})
            }else{
                this.getResponse("FeedBackYes");
                this.setState({selectedOption:""})
            }
            
        } 
        if(this.state.isHideText == true)
            this.textInput.clear() 
    }

    OnSpeechRecognized = () => {
        this.getResponse("Speech Recognized");
    }

    onStarRatingPress(rating){
        this.getResponse("UserRatings:" + rating);
    }
    selectionOnPress(option){
        if(option != "No" && option !="Yes"){
            this.getResponse(option)
        }
        this.setState({selectedOption:option});
    }
    userFeedBackOnPress(feedback){
        this.getResponse(feedback);
        this.setState({selectedUserFeedback:feedback});
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
    OnMessageListChange = () => {
        this.flatList.scrollToEnd({animated:false});
    }

    OnDatePicker = () => {
        //this.setState({isHideDate:true,isHideText:false});
    }

    renderItem = ({item, index}) => {
        var optionControlList = []
        console.log(item)
        item.options.forEach((item) => {
            optionControlList.push(
                <TouchableHighlight style={this.state.selectedOption === item? styles.PressedButtonStyle: styles.ButtonStyle} underlayColor={'#35C3CF'}
                  onPress={()=>this.selectionOnPress(item)} activeOpacity={0.5}>
                      
                        <Text style={this.state.selectedOption === item? styles.OptionTextStyleOnPress: styles.OptionTextStyle}>{item}</Text>
                      
                </TouchableHighlight>
            )
        })

        var feedbackOptions = [{id:"1",image:"😃",text:"Nice"},{id:"2",image:"😐",text:"Normal"},{id:"3",image:"😟",text:"Bad"}]
        var feedbackOptionsControls = []
        feedbackOptions.forEach((item)=>{
            feedbackOptionsControls.push(
                <TouchableHighlight style={styles.UserFeedBackButtonStyle} underlayColor={'#35C3CF'} 
                 onPress={()=>this.userFeedBackOnPress(item.text)} key={item.id} activeOpacity={0.5}>
                     <View style={styles.UserFeedbackContentStyle}>
                         <Emoji symbol={item.image} label={item.text} />
                         <Text>
                            <Text style={styles.UserFeedbackOptionStyle}>{item.text}</Text>
                         </Text>
                     </View>
                </TouchableHighlight>
            )
        })
        //this.setState({message:''})
        return(
            <View style={this.conversationStyle(item)}>
               {
                renderIf(item.type == "" && item.from == "MAX")(
                <ViewMoreText
                    numberOfLines={3} 
                    renderViewMore={this.renderViewMore} 
                    renderViewLess={this.renderViewLess}
                    textStyle={{textAlign: 'center'}}
                >
                    <Text style={styles.item}>
                        {item.text}
                    </Text>
                </ViewMoreText>
                )}
                 {
                renderIf(item.type == "" && item.from != "MAX")(
                <View style={styles.InRowStyle}>
                    <TouchableOpacity onPress={this.OnSpeechRecognized} activeOpacity={0.7}>
                        <FontAwesomeIcon style={{paddingTop:5, marginRight: 5}} color='#fff' icon={faMicrophone}/>
                    </TouchableOpacity>
                    <ViewMoreText
                    numberOfLines={3} 
                    renderViewMore={this.renderViewMore} 
                    renderViewLess={this.renderViewLess}
                    textStyle={{textAlign: 'center'}}
                >
                    <Text style={styles.item}>
                        {item.text}
                    </Text>
                </ViewMoreText>
                </View>
                )}
                {
                    renderIf(item.type == "radio")(
                        <View style={styles.InRowStyle}>
                            { optionControlList}
                        </View>
                    )
                }
                {
                    renderIf(item.type == "userFeedback")(
                        <View style={styles.UserFeedbackStyle}>
                            <Text style={{color:'#fff', fontSize:16, marginBottom:20}}>How was your experience?</Text>
                            { feedbackOptionsControls}
                        </View>
                    )
                }
                {
                     renderIf(item.type == "rating")(
                        <View>
                            <Text style={{color:'#fff', fontSize:16}}>Please rate your experience</Text>
                            <AirbnbRating 
                                type='custom' 
                                ratingColor='#fff'
                                ratingBackgroundColor='#fff' 
                                reviews={[]} 
                                ratingCount={5} 
                                onFinishRating={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    )
                }
                 {
                renderIf(item.type == "Date" && item.from == "MAX")(
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
                )}
            </View>
        )
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

    render(){
        return(
            <View style={styles.MainContainer}>
                <FlatList style={styles.messageStyle} 
                data={this.state.messagesHolder} 
                extraData= {this.state.messagesHolder}
                renderItem={this.renderItem.bind(this)}
                ref={(ref) => {this.flatList = ref;}}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={(item, index) => String(index)}
                />
                <View style={styles.messageRequesterStyle}>
                {this.state.isHideText ? (
                    <TextInput
                    ref={input => {this.textInput = input}}
                    placeholder="Type a message here"
                    onChangeText={data => this.setState({message:data})} 
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    />
                    ) : null}                  
                {this.state.isHideDate ? (
                         <DatePicker
                            style={{width: 200}}
                            date={this.state.date} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
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
                            onDateChange={(date) => {this.setState({message: date, date: date})}}
                            />
                            ) : null}
                              <TouchableOpacity onPress={this.joinData} activeOpacity={0.7}>
                        {this.renderImage()}
                    </TouchableOpacity>
                        </View>
            </View>
        );
    }

    conversationStyle=function(item){
        if(item.from == 'MAX'){
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

const styles = StyleSheet.create({
MainContainer:{
    flex:4,
    backgroundColor:'#303030'
},

messageStyle:{
    height:520,
    marginTop:25
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16
 },

messageCompleteStyle:{
    margin:10,
    flexDirection:'column'
},
messageDisplayStyle:{
    height:windowheight
},
messageRequesterStyle:{
    flex:2,
    flexDirection:'row',
    height:60
},

item:{
    color:'#fff',
    padding:10,
    fontSize:15
},

textMoreOrLessStyle:{
    paddingLeft:100,
    color:'#0000EE',
    textDecorationLine:'underline'
},

textInputStyle:{
    textAlign:'center',
    height:40,
    width:'90%',
    borderWidth:1,
    backgroundColor:'#fff',
    borderRadius:20,
    marginTop:20
},

button:{
    width:'10%',
    height:40,
    padding:10,
    backgroundColor:'#35C3CF',
    borderWidth:1,
    borderRadius:20,
    marginTop:20,
    marginLeft:20
},

buttonText:{
    color:'#fff',
    backgroundColor:'red'
},

SendImageIconStyle:{
    marginLeft:10,
    marginTop:30,
    height:20,
    width:20,
    alignSelf:'flex-end',
},
ImageIconStyle:{
    paddingLeft:10,
    marginTop:30,
    height:35,
    width:35,
    alignSelf:'flex-end',
},

icon:{
    color:'#fff',
    backgroundColor:'red'
},

OptionsStyle:{
    flexDirection:'row'
},

MaxStyle:{
    padding:10,
    borderRadius:20,
    backgroundColor:'#424242',
    borderTopLeftRadius:5,
    alignSelf:'flex-start'
},

UserStyle:{
    padding:10,
    borderRadius:20,
    backgroundColor:'#35C3CF',
    borderTopLeftRadius:5,
    alignSelf:'flex-end',
    marginLeft:550,
    marginRight:20   
},
InRowStyle:{
    flexDirection :'row'
},

OptionTextStyle:{
    color:'#35C3CF',
    textAlign:'center'
},
OptionTextStyleOnPress:{
    color:'#fff',
    textAlign:'center'
},

ButtonStyle:{
    width:120,
    height:40,
    marginTop:10,
    paddingTop:10,
    marginLeft:5,
    marginRight:5,
    borderRadius:30,
    borderWidth:1,
    borderColor:'#35C3CF'
},
PressedButtonStyle:{
    width:120,
    height:40,
    marginTop:10,
    paddingTop:10,
    marginLeft:5,
    marginRight:5,
    borderRadius:30,
    borderWidth:1,
    borderColor:'#35C3CF',
    backgroundColor:'#35C3CF'
},

UserFeedbackStyle:{
    flexDirection:'column'
},

UserFeedbackContentStyle:{
    flexDirection:'row'
},

UserFeedbackOptionTextStyle:{
    paddingLeft:30,
    paddingRight:30,
    color:'#35C3CF'
},

UserFeedBackButtonStyle:{
    height:40,
},
DatePickerContainerStyle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:50,
    padding:16
}

});

export default Chat

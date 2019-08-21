import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    
    message:{
        color:'#fff',
        padding:10,
        fontSize:15
    },

    textMoreOrLessStyle:{
        paddingLeft: 50,
        color:'#35C3CF',
        textDecorationLine:'underline'
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
    InRowStyle:{
        flexDirection: 'row'
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
    UserFeedbackOptionTextStyle:{
        paddingLeft:30,
        paddingRight:30,
        color:'#35C3CF'
    },
    UserFeedbackOptionPressedTextStyle:{
        paddingLeft:30,
        paddingRight:30,
        color:'#fff'
    },
    UserFeedBackButtonStyle:{
        height:40,
    },

})
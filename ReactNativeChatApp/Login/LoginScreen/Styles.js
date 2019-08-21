import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    
    MainContainer:{
        flex:2,
    },
    MainContainerContent:{
        alignSelf: 'center',
    },
    Title:{
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputLayoutStyle: {
        width: 240,
        height: 40,
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 20
    },

    SubmitButtonStyle: {
        width: 240,
        height: 40,
        paddingLeft: 20,
        borderWidth: 0.5,
        borderRadius: 20,
        marginTop: 50
    },

    SubmitButtonContentStyle: {
        flexDirection: 'row',
        paddingTop: 5
    },

    ArrowContainerStyle: {
        marginLeft: 120,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    
    MainContainer:{
        marginTop: 40,
        flex:2,
        backgroundColor:'#303030'
    },
    MainContainerContent:{
        alignSelf: 'center',
    },
    Title:{
        color: '#fff',
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputLayoutStyle: {
        color: '#fff',
        width: 240,
        height: 40,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#fff',
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
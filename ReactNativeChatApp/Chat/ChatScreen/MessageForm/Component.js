import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from './Styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane, faMicrophone, faCamera } from '@fortawesome/free-solid-svg-icons';
import {  ImagePicker, Permissions, FileSystem, MediaLibrary } from 'expo';
import ThemeContext from './../../../Themes/ThemeContext'
import MessageFormThemeConstants from './../../../Themes/MessageFormThemeConstants'

class MessageFormComponent extends Component {

    constructor() {
        super()
        this.state = {
            userMessageText: ''
        }
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                        <View style={styles.messageRequesterStyle}>
                            <TextInput
                                ref={input => { this.textInput = input }}
                                placeholder="Type a message here"
                                onChangeText={data => this.setState({ userMessageText: data })}
                                style={styles.textInputStyle}
                                underlineColorAndroid='transparent'
                            />
                            <TouchableOpacity onPress={this.OnInputSubmit} activeOpacity={0.7}>
                                {this.renderImage(theme)}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._takePhoto} activeOpacity={0.7}>
                                <View style={styles.ImageIconStyle}>
                                    <FontAwesomeIcon style={{color: MessageFormThemeConstants[theme].button.color}} 
                                     icon={faCamera} />
                                </View>
                            </TouchableOpacity>
                        </View>
                )}
            </ThemeContext.Consumer>
        )
    }

    OnInputSubmit = () => {
        if (this.textInput != undefined)
            this.textInput.clear()
        this.props.OnInputSubmit(this.state.userMessageText)
        this.setState({ userMessageText: '' })
    }

    TakePicture = (picture) => {
        this.props.TakePicture(picture.uri);
        this.setState({ userMessageText: '' })
    }


    renderImage = (theme) => {
        if (this.state.message != '') {
            return (
                <View style={styles.ImageIconStyle}>
                    <FontAwesomeIcon style={{color: MessageFormThemeConstants[theme].button.color}} 
                    icon={faPaperPlane} />
                </View>
            )
        } else {
            return (
                <View style={styles.ImageIconStyle}>
                    <FontAwesomeIcon style={{color: MessageFormThemeConstants[theme].button.color}} 
                     icon={faMicrophone} />
                </View>
            )
        }
    }

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });

            if (pickerResult.cancelled != true)
                this.TakePicture(pickerResult);
            return this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            this.setState({
                uploading: true
            });

            if (!pickerResult.cancelled) {

                await this.snap(pickerResult.uri);

                // uploadResponse = await this.uploadImageAsync(pickerResult.uri);
                // uploadResult = await uploadResponse.json();

                // alert("File is uploaded to " + Linking.openURL(uploadResult.location));

                // this.setState({
                //     userMessageText: uploadResult.location
                // });
            }
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({
                uploading: false
            });
        }
    };

    async uploadImageAsync(uri) {
        let apiUrl = 'http://192.168.43.124:8080/upload';

        // Note:
        // Uncomment this if you want to experiment with local server
        //
        // if (Constants.isDevice) {
        //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
        // } else {
        //   apiUrl = `http://localhost:3000/upload`
        // }

        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('uri', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        const response = fetch(apiUrl, options);
        console.log(response);
        return response;
    }

    snap = async (uri) => {
        console.log("Snapping!")
        console.log("Reading!")
        const fileString = await FileSystem.readAsStringAsync(uri)
        console.log(fileString.length)
        console.log('Writing!')
        await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}tmpimg.jpg`, fileString)
        console.log("Saving!")
        await MediaLibrary.createAssetAsync(`${FileSystem.documentDirectory}tmpimg.jpg`);
        await MediaLibrary.createAssetAsync(uri);

    };
}

export default MessageFormComponent;

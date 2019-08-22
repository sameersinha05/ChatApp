import React, {Component} from 'react'
import { Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import * as Actions from './../store/theme/action'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

class SettingContextMenu extends Component {

    constructor(props) {
        super(props)
    }

    lightThemeSelected = () => {
        this.props.updateTheme("light")
    }

    darkThemeSelected = () => {
        this.props.updateTheme("dark")
    }

    render() {
        return (
            <View style={{marginRight: 20}}>
                <Menu>
                    <MenuTrigger>
                        <FontAwesomeIcon style={{ color: "#fff"}} icon = { faEllipsisV } />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect = {this.lightThemeSelected}>
                            <Text style={{color: '#3D3D3D'}} >light </Text>
                        </MenuOption>
                        <MenuOption onSelect = {this.darkThemeSelected}>
                            <Text style={{color: '#3D3D3D'}} >dark </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators (Actions, dispatch)
}

export default connect(null, mapDispatchToProps)(SettingContextMenu);
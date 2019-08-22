import React, {Component} from 'react'
import Root from './Root';
import store from './store/store' // Import from store
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <MenuProvider>
            <Root />
          </MenuProvider>  
        </Provider>
    );
  }
}



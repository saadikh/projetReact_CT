import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './components/upload/upload';
import PluginList from './components/displayPlugins/pluginList';
import PluginDetail from './components/detail/plugin';
import PluginStore from './components/pluginStore/pluginStore';
import Login from './components/auth/login';
import { Provider } from 'react-redux';
import store from './store';
import SignUp from './components/auth/signUp';
import Error from './components/error';
import Navigation from './components/navigator/navigation';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginAction';
import jwtDecode from 'jwt-decode';
import requireLogin from './utils/requireLogin';
import myPlugins from './components/myAccount/myPlugins';
import modifyMyPlugin from './components/myAccount/modifyMyPlugin';

class App extends Component {
  render() {
    if(localStorage.jwtToken){
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken).user));
    }
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navigation />
            <Switch>
              <Route path="/" component={PluginList} exact />
              <Route path="/plugins/upload" component={requireLogin(Upload)} exact/>
              <Route path="/plugin/:id" component={PluginDetail} exact />
              {/* route设置key可以使其切换路由是启动unmount */}
              <Route path="/plugin-store" component={PluginStore} exact key={1}/>
              <Route path="/plugin-store/:tag" component={PluginStore} key={2}/>
              <Route path="/login" component={Login} />"
              <Route path="/sign-up" component={SignUp} />
              <Route path="/myPlugins" component={requireLogin(myPlugins)} exact/>
              <Route path="/myPlugins/:id" component={requireLogin(modifyMyPlugin)}/>
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;

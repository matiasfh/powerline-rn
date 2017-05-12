import React, { PropTypes, Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Switch,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Spinner from 'react-native-loading-spinner-overlay';
import PLColors from "PLColors";
import PLConstants from "PLConstants";
import FBLoginButton from "FBLoginButton";
import PLButton from "PLButton";
import { logInManually } from "PLActions";

const { connect } = require('react-redux');

export class Login extends Component {
  props: {
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };

  state: {
    isLoading: boolean;
    username: string;
    password: string;
  };

  _isMounted: boolean;

  constructor() {
    super();
    this.state = {
      isLoading: false,
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChangeUserName = username => {
    this.setState({ username: username });
  };

  onChangePassword = password => {
    this.setState({ password: password });
  };

  onForgotPassword = () => {
    alert("onForgotPassword");
  };

  onSignUp = () => {
    alert("onSignUp");
  };

  async logIn() {
    const { dispatch, onLoggedIn } = this.props;
    this.setState({ isLoading: true });
    try {
      await Promise.race([
        dispatch(logInManually(this.state.username, this.state.password)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({ isLoading: false });
    }

    onLoggedIn && onLoggedIn();
  }

  renderLoginForm = () => {
    const { username, password } = this.state;
    return (
      <View style={styles.loginFormContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            autoCorrect={false}
            value={username}
            onChangeText={this.onChangeUserName}
          />
        </View>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={this.onChangePassword}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Keep me logged in</Text>
          <Switch onTintColor="#030366" disabled={true} value={false} />
        </View>
        <PLButton
          caption={this.state.isLoading ? "Please wait..." : "Login"}
          style={styles.loginButton}
          onPress={() => this.logIn()}
        />
        <View style={styles.termsContainner}>
          <Text style={styles.termsText}>By logging in, you agree to our </Text>
          <TouchableOpacity>
            <Text style={styles.termsUnderlineText}>Terms of Service </Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>and </Text>
          <TouchableOpacity>
            <Text style={styles.termsUnderlineText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.onForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderFBLoginForm = () => {
    return (
      <View style={styles.fbLoginContainer}>
        <FBLoginButton source="First screen" />
        <Text style={styles.fbTermsText}>Powerline will not post to Facebook without your permission</Text>
      </View>
    )
  };
  renderSignUp = () => {
    return (
      <View style={styles.signUpContainer}>
        <PLButton
          type="bordered"
          caption="Sign Up With E-mail"
          onPress={this.onSignUp}
        />
      </View>
    );
  };

  render() {
    return (
      <LinearGradient colors={['#afcbe6', '#fff', '#afcbe6']} style={styles.container}>
        <Spinner visible={this.state.isLoading} />
        <Image source={require("img/logo.png")} style={styles.imgLogo} />
        {this.renderLoginForm()}
        {this.renderFBLoginForm()}
        {this.renderSignUp()}
      </LinearGradient>
    );
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgLogo: {
    marginTop: 30,
    resizeMode: "center"
  },
  loginFormContainer: {
    marginHorizontal: 40,
    marginTop: 10
  },
  nameContainer: {
    marginTop: 5,
    height: 44,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PLColors.loginInputBorder,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  textInput: {
    paddingVertical: 0,
    height: 44,
    fontSize: 14,
    color: PLColors.lightText
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10
  },
  switchText: {
    color: PLColors.lightText,
    fontSize: 12,
    backgroundColor: 'transparent',
    marginHorizontal: 5
  },
  loginButton: {
    marginTop: 15
  },
  loginText: {
    color: 'white',
    fontWeight: '100'
  },
  termsContainner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  termsText: {
    color: PLColors.lightText,
    fontSize: 9,
    backgroundColor: 'transparent'
  },
  termsUnderlineText: {
    color: PLColors.lightText,
    fontSize: 9,
    textDecorationLine: 'underline',
    backgroundColor: 'transparent'
  },
  forgotText: {
    marginTop: 15,
    color: PLColors.actionText,
    fontSize: 12,
    alignSelf: "flex-end",
    textDecorationLine: 'underline',
    backgroundColor: 'transparent'
  },
  fbLoginContainer: {
    marginTop: 30,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fbTermsText: {
    marginTop: 10,
    color: PLColors.lightText,
    fontSize: 9,
    backgroundColor: 'transparent'
  },
  signUpContainer: {
    width: 270,
    marginTop: 30,
    alignSelf: "center"
  }
});

module.exports = connect()(Login);

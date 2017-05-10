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
import PLColors from "PLColors";
import PLConstants from "PLConstants";
import FBLoginButton from "FBLoginButton";
import PLButton from "PLButton";

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

export class Login extends Component {
  static propTypes = {
    navigation: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  onChangeUserName = userName => {
    this.setState({ userName });
  };

  onChangePassword = password => {
    this.setState({ password });
  };

  onLogin = () => {
    alert("onLogin");
  };

  onForgotPassword = () => {
    const { navigate } = this.props.navigation;
    navigate("Reset");
  };

  onSignUp = () => {
    const { navigate } = this.props.navigation;
    navigate("SignupPersonalInfo");
  };

  renderLoginForm = () => {
    const { userName, password } = this.state;
    return (
      <View style={styles.loginFormContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            autoCorrect={false}
            value={userName}
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
          <Switch onTintColor="#030366" disabled={true} value={false}/>
        </View>
        <PLButton
          caption="Login"
          style={styles.loginButton}
          onPress={this.onLogin}
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
          <Image source={require("img/logo.png")} style={styles.imgLogo} />
          {this.renderLoginForm()}
          {this.renderFBLoginForm()}
          {this.renderSignUp()}
        </LinearGradient>
    );
  }
}

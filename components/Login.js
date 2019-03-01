import React from 'react'
import { View, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native'
import { Text } from 'react-native-elements'
import { robotoWeights } from 'react-native-typography'
import { Actions, ActionConst } from 'react-native-router-flux';

import { connect } from 'react-redux'

import { login, resetApp } from '../actions/appActions'


class Login extends React.Component {

    state = {
        exist: true,
        username: '',
        password: ''
    }

    updatePassword = text => this.setState({ password: text })

    updateUsername = text => this.setState({ username: text })

    checkIfUserExist = async () => {
        let exist = false
        for (let user of this.props.users) {
            if (user.username === this.state.username && user.password === this.state.password) {
                this.setState({ exist: true })
                exist = true
                await this.props.login(user)
                break;
            }
        }
        return exist
    }

    componentDidMount(){
        console.log(this.props.users)
    }

    resetComponent = () => {
        this.setState({
            exist: true,
            username: '',
            password: ''
        })
    }

    componentWillUnmount() {
        this.resetComponent()
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: -150
                }}>
                    <Image style={{ height: 150, width: 150, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                    <View style={{ alignContent: 'center', marginBottom: 30 }}>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 30, color: 'white' }}>
                            Aircraft Inspection{'\n'}Checklist App
                        </Text>
                    </View>
                    {!this.state.exist && <Text style={{ textAlign: 'center', zIndex: 100, height: 40, width: '100%', position: 'relative', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white' }}>User does not exist!</Text>}
                    <TextInput
                        placeholderTextColor="#FFF"
                        style={{
                            ...robotoWeights.light,
                            color: 'white',
                            backgroundColor: 'rgba(0,0,255,0.1)',
                            height: 40,
                            margin: 10,
                            width: '100%',
                            borderRadius: 5,
                            padding: 3,
                            textDecorationLine: 'underline',
                        }}
                        placeholder={'Username'}
                        returnKeyType='next'
                        onChangeText={this.updateUsername}
                        value={this.state.username}
                        underlineColorAndroid={'transparent'} />
                    <TextInput
                        placeholderTextColor="#FFF"
                        style={{
                            ...robotoWeights.light,
                            color: 'white',
                            backgroundColor: 'rgba(0,0,255,0.1)',
                            height: 40,
                            margin: 10,
                            width: '100%',
                            borderRadius: 5,
                            padding: 3,
                            textDecorationLine: 'underline',
                        }}
                        placeholder={'Password'}
                        returnKeyType='next'
                        secureTextEntry
                        onChangeText={this.updatePassword}
                        value={this.state.password}
                        underlineColorAndroid={'transparent'} />
                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => {
                            this.checkIfUserExist().then(exi => {
                                if (exi) {
                                    Actions.home({ type: ActionConst.RESET })
                                } else {
                                    this.setState({ exist: false })
                                    setTimeout(() => this.setState({ exist: true }), 3000)
                                }
                            })

                        }} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                            <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>LOGIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={Actions.register} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                            <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    users: state.app.users,
    currentUser: state.app.currentUser
})


const mapDispatchToProps = {
    login, resetApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)





import React from 'react'
import { View, TextInput, Alert, Image, ScrollView, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-elements'
import { robotoWeights } from 'react-native-typography'

import { addUser, editUser, logout } from '../actions/appActions'
import { connect } from 'react-redux'
import { Actions, ActionConst } from 'react-native-router-flux';
import Loading from './Loading'

class Register extends React.Component {

    state = {
        duplicatePassword: '',
        submitted: false,
        reload: true,
        clear: true,
        fullname: '',
        error: '',
        password: '',
        username: '',
        email: '',
        license: '',
    }

    componentDidMount() {
        if (this.props.edit) {
            let user = this.props.users[this.props.currentUser.index]
            this.setState({
                duplicatePassword: user.password,
                fullname: user.fullname,
                password: user.password,
                username: user.username,
                email: user.email,
                license: user.license,
            })
        }
    }

    updatePassword = text => this.setState({ password: text })
    updateEmail = text => this.setState({ email: text })
    updateLicense = text => this.setState({ license: text })
    updateUsername = text => this.setState({ username: text })

    updateFullname = text => this.setState({ fullname: text })

    updateDuplicatePassword = text => this.setState({ duplicatePassword: text })

    passwordMatch = async () => {
        if (this.state.password === this.state.duplicatePassword && this.state.password !== '') {
            return true
        }
        this.setState({ clear: false, error: 'Password not matched!' })
        return false
    }

    allFieldsCompleted = () => {
        let fields = [this.state.fullname, this.state.duplicatePassword, this.state.username, this.state.password, this.state.license, this.state.email]
        let clear = true
        for (let f of fields) {
            if (f === '') {
                clear = false
                this.setState({ clear: false, error: 'Fill up all fields!' })
                break
            }
        }
        return clear
    }

    componentDidUpdate() {
        console.log(this.props.users)
        console.log(this.props.currentUser)
    }

    submitUser = () => {
        let user = {
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            license: this.state.license,
        }

        if (this.props.edit) {
            user.index = this.props.currentUser.index
            this.props.editUser(user)
        } else {
            user.index = this.props.users.length ? this.props.users.length : 0
            user.schedules = []
            this.props.addUser(user)
        }
    }

    reloadComponent = () => this.setState({ reload: !this.state.reload })

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView>
                    <KeyboardAvoidingView style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                        marginRight: 20,
                    }} behavior="padding" enabled>
                        <Image style={{ height: 150, width: 150, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
                        <View style={{ alignContent: 'center', marginBottom: 30 }}>
                            <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 40, marginTop: 22, color: 'white' }}>
                                {this.props.edit ? 'Profile' : 'Register'}
                            </Text>
                        </View>
                        {!this.state.clear && <Text style={{ textAlign: 'center', zIndex: 100, height: 40, width: '100%', position: 'relative', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white' }}>{this.state.error}</Text>}
                        {this.state.clear && !this.props.edit && this.state.submitted && <Text style={{ textAlign: 'center', zIndex: 100, height: 40, width: '100%', position: 'relative', backgroundColor: 'rgba(0,255,0,0.5)', color: 'white' }}>Successfully Registered!</Text>}
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
                            placeholder={'Full Name'}
                            returnKeyType='next'
                            onChangeText={this.updateFullname}
                            value={this.state.fullname}
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
                            placeholder={'Re-enter Password'}
                            returnKeyType='next'
                            secureTextEntry
                            onChangeText={this.updateDuplicatePassword}
                            value={this.state.duplicatePassword}
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
                            placeholder={'Inspector License No.'}
                            returnKeyType='next'
                            onChangeText={this.updateLicense}
                            value={this.state.license}
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
                            placeholder={'Email'}
                            returnKeyType='next'
                            keyboardType={'email-address'}
                            onChangeText={this.updateEmail}
                            value={this.state.email}
                            underlineColorAndroid={'transparent'} />

                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                if(!this.state.submitted){
                                    this.setState({ submitted: true })
                                this.passwordMatch()
                                    .then(clear => {
                                        return this.allFieldsCompleted() && clear
                                    }).then(clear => {
                                        this.reloadComponent()
                                        if (clear) {
                                            this.submitUser()
                                            if (!this.props.edit) {
                                                Actions.login({ type: ActionConst.RESET })
                                            } else {
                                                Actions.home()
                                            }
                                        } else {
                                            setTimeout(() => this.setState({ clear: true }), 2000)
                                        }
                                        this.setState({submitted: false})
                                    }).catch(e => Alert.alert(e.message))
                                }
                            }} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                                <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>
                                    SUBMIT
                            </Text>
                            </TouchableOpacity>
                            {
                                this.props.edit &&
                                <TouchableOpacity onPress={() => {
                                    this.props.logout()
                                    Actions.login({ type: ActionConst.RESET })
                                }} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                                    <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>
                                        LOGOUT
                                </Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground >
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.app.currentUser,
    users: state.app.users
})

const mapDispatchToProps = {
    addUser, editUser, logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)




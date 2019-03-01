import React from 'react'
import { View, TextInput, ImageBackground, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Text, CheckBox, Card } from 'react-native-elements'
import RNDatePicker from 'react-native-datepicker'
import { robotoWeights } from 'react-native-typography'
import { addSchedule } from '../actions/appActions'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import Loading from './Loading'
import { checklist } from '../assets/checklist'
class AddSchedule extends React.Component {

    state = {
        loading: false,
        aircraftName: '',
        operator: '',
        date: new Date(),
        note: '',
        clicked: false
    }

    updateCheckBox = selection => {
        if (selection === 'inspection') {
            this.setState({ inspection: true, maintenance: false })
        } else if (selection === 'maintenance') {
            this.setState({ inspection: false, maintenance: true })
        }
    }

    updateAircraftName = text => this.setState({ aircraftName: text })
    updateOperator = text => this.setState({ operator: text })
    updateNote = text => this.setState({ note: text })


    resetInputs = () => {
        this.setState({
            aircraftName: '',
            operator: '',
            date: new Date(),
            note: ''
        })
    }

    componentWillUnmount() {
        this.resetInputs()
        this.setState({ loading: false })
    }

    getChecklist = async () => {
        let cl = []
        for (let item of checklist) {
            cl.push({
                subCategories: this.getSubCategories(item.subCategories),
                number: item.number,
                category: item.category
            })
        }
        return cl
    }


    getSubCategories = sub => {
        let subCategories = []
        for (let s = 1; s <= sub.length; s++) {
            subCategories.push({
                index: s,
                content: sub[s - 1],
                selected: 'Not Seen',
            })
        }
        return subCategories
    }

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }


    saveSchedule = async () => {
        this.setState({ clicked: true })
        let schedule = {
            id: this.generateUUID(),
            aircraftName: this.state.aircraftName,
            operator: this.state.operator,
            date: this.state.date,
            note: this.state.note,
            checklist: [],
            controlnumber: '',
            actionnumber: '',
            recordnumber: '',
            location: '',
            orgIdentifier: '',
            destination: '',
            projectnumber: '',
            actiontaken: '',
            aircraftmms: '',
            mainrep: '',
            aircraftregistrationnumber: '',
            mgmtrep: '',
            pelnumber: '',
            otherpelnumber: '',
            flightcrewlicense: 'Not Seen',
            medicallicense: 'Not Seen'
        }
        this.getChecklist().then(checklist => {
            schedule.checklist = checklist
            this.props.addSchedule(schedule, this.props.currentUser)
        })
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 20,
                            marginRight: 20,
                        }}>
                            <Image style={{ height: 150, width: 150, resizeMode: 'contain' }} source={require('../assets/logo.png')} />
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
                                placeholder={'Aircraft Name'}
                                returnKeyType='next'
                                onChangeText={this.updateAircraftName}
                                value={this.state.aircraftName}
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
                                placeholder={'Operator'}
                                returnKeyType='next'
                                onChangeText={this.updateOperator}
                                value={this.state.operator}
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
                                placeholder={'Note'}
                                returnKeyType='next'
                                onChangeText={this.updateNote}
                                value={this.state.note}
                                underlineColorAndroid={'transparent'} />
                            <RNDatePicker
                                style={{ margin: 10, width: 300 }}
                                date={this.state.date}
                                mode="datetime"
                                placeholder="Select date and time"
                                minDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ loading: true })
                                    if (!this.state.clicked) {
                                        this.saveSchedule().then(() => {
                                            Actions.home()
                                        })
                                    }
                                }} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                                    <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>SAVE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={Actions.home} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 100 }}>
                                    <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                {this.state.loading && <Loading />}
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.app.currentUser,
})

const mapDispatchToProps = {
    addSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSchedule)
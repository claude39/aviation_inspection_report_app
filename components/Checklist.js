import React from 'react'
import { View, TextInput, Alert, ImageBackground, Image, KeyboardAvoidingView, ScrollView, Picker, TouchableOpacity } from 'react-native'
import { Text, CheckBox, Card, ListItem } from 'react-native-elements'
import RNDatePicker from 'react-native-datepicker'
import { robotoWeights } from 'react-native-typography'
import { table, inspectionReportHead, additionalInfo } from '../assets/htmlTable'
import Loading from './Loading'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNPrint from 'react-native-print'
import { Actions } from 'react-native-router-flux';

import { deleteSchedule } from '../actions/appActions'
import { connect } from 'react-redux';

class CheckList extends React.Component {

    state = {
        checklist: [],
        dataFilled: false,
        reload: false,
        loading: false,
        date: new Date(),
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
        medicallicense: 'Not Seen',
        id: ''
    }

    reloadComponent = () => this.setState({ reload: !this.state.reload })

    generatePDF = async () => {
        let intro = inspectionReportHead({
            date: `${new Date(this.state.date).toDateString()}`,
            controlnumber: this.state.controlnumber,
            actionnumber: this.state.actionnumber,
            recordnumber: this.state.recordnumber,
            location: this.state.location,
            orgIdentifier: this.state.orgIdentifier,
            destination: this.state.destination,
            projectnumber: this.state.projectnumber,
            actiontaken: this.state.actionnumber,
            aircraftmms: this.state.aircraftmms,
            mainrep: this.state.mainrep,
            aircraftregistrationnumber: this.state.aircraftregistrationnumber,
            mgmtrep: this.state.mgmtrep,
            pelnumber: this.state.pelnumber,
            otherpelnumber: this.state.otherpelnumber
        })

        const cssStyleSheet = `
<style type="text/css" >
div.img {
    display: block;
    max-width:230px;
    max-height:230px;
    width: auto;
    height: auto;
    page-break-before: auto; 
    page-break-after: auto; 
    page-break-inside: avoid;     
}
img {
  page-break-before: auto; 
  page-break-after: auto; 
  page-break-inside: avoid; 
}
</style>`;
        const pageBreakWithPageNumberBefore = () => {
            return `<p style="page-break-before: always;" align=center>.</p>`;
        }




        let t = table(this.state.checklist)
        let additionalInformation = additionalInfo(this.state.flightcrewlicense, this.state.medicallicense)
        let html = `
            <html>
            <head>${cssStyleSheet}</head>
            ${intro}
            ${pageBreakWithPageNumberBefore()}
            ${t}
            ${pageBreakWithPageNumberBefore()}
            ${additionalInformation}
            </html>
        `
        let options = {
            html: html,
            fileName: 'inspectionReport',
            base64: true,
        };

        let results = await RNHTMLtoPDF.convert(options)

        await RNPrint.print({ filePath: results.filePath }).then(() => {
            this.props.deleteSchedule(this.props.currentUser, this.state.id)
            Actions.home()
        })
    }

    componentDidMount() {
        let sched = this.props.schedule
        this.setState({ id: sched.id, checklist: sched.checklist })
    }

    componentDidUpdate() {
        if (this.state.dataFilled && this.state.loading) {
            Alert.alert('Legends', 'S = Satisfactory\nU = Unsatisfactory\nNS = Not Seen\nNA = Not Applicable')
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView>
                    {
                        this.state.dataFilled && <View>
                            {this.state.checklist.map((item, index) =>
                                <Card key={'c' + index} title={`${item.number}. ${item.category}`} titleStyle={{ ...robotoWeights.light, fontWeight: 'bold' }} >
                                    {
                                        item.subCategories.map((sub, i) =>
                                            <ListItem rightElement={
                                                <Picker
                                                    selectedValue={this.state.checklist[index].subCategories[i].selected}
                                                    style={{ ...robotoWeights.light, height: 75, width: 110 }}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        let item = Object.assign({}, this.state.checklist[index].subCategories[i], { selected: itemValue })
                                                        this.state.checklist[index].subCategories[i] = item
                                                        this.setState({ checklist: this.state.checklist })
                                                    }
                                                    }>
                                                    <Picker.Item label="S" value="Satisfactory" style={{ fontSize: 10 }} />
                                                    <Picker.Item label="U" value="Unsatisfactory" style={{ fontSize: 10 }} />
                                                    <Picker.Item label="NS" value="Not Seen" style={{ fontSize: 10 }} />
                                                    <Picker.Item label="NA" value="Not Applicable" style={{ fontSize: 10 }} />
                                                </Picker>
                                            }
                                                subtitle={`Status: ${sub.selected}`} key={'s' + i} containerStyle={{ width: '100%', alignItems: 'flex-start', backgroundColor: 'rgba(1,89,166, 0.4)', margin: 10 }} title={`${item.number}.${sub.index}\n${sub.content}`} titleStyle={{ ...robotoWeights.light, fontSize: 15, fontWeight: 'bold' }} />
                                        )
                                    }
                                </Card>
                            )}

                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={this.generatePDF} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 200 }}>
                                    <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>
                                        GENERATE REPORT
                             </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {
                        !this.state.dataFilled && <View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...robotoWeights.light, fontSize: 30, color: 'white', textDecorationLine: 'underline' }}>Inspection Data</Text>
                            </View>
                            <RNDatePicker
                                style={{ margin: 10, width: 300, marginTop: 15 }}
                                date={this.state.date}
                                mode="date"
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
                                placeholder={'Control Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ controlnumber: t })}
                                value={this.state.controlnumber}
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
                                placeholder={'Action Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ actionnumber: t })}
                                value={this.state.actionnumber}
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
                                placeholder={'Record Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ recordnumber: t })}
                                value={this.state.recordnumber}
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
                                placeholder={'Location'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ location: t })}
                                value={this.state.location}
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
                                placeholder={'Org. Identifier'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ orgIdentifier: t })}
                                value={this.state.orgIdentifier}
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
                                placeholder={'Destination'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ destination: t })}
                                value={this.state.destination}
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
                                placeholder={'Project Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ projectnumber: t })}
                                value={this.state.projectnumber}
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
                                placeholder={'Action Taken'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ actiontaken: t })}
                                value={this.state.actiontaken}
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
                                placeholder={'Aircraft MMS'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ aircraftmms: t })}
                                value={this.state.aircraftmms}
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
                                placeholder={'Main Rep'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ mainrep: t })}
                                value={this.state.mainrep}
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
                                placeholder={'Aircraft Registration Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ aircraftregistrationnumber: t })}
                                value={this.state.aircraftregistrationnumber}
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
                                placeholder={'Mgmt. Rep'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ mgmtrep: t })}
                                value={this.state.mgmtrep}
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
                                placeholder={'PEL Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ pelnumber: t })}
                                value={this.state.pelnumber}
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
                                placeholder={'Other PEL Number'}
                                returnKeyType='next'
                                onChangeText={t => this.setState({ otherpelnumber: t })}
                                value={this.state.otherpelnumber}
                                underlineColorAndroid={'transparent'} />
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ loading: true })
                                    Alert.alert('Confirm Data', 'Are you sure to proceed with those data?', [
                                        { text: 'No', onPress: () => this.setState({ loading: false }) },
                                        {
                                            text: 'Yes', onPress: () => {
                                                this.reloadComponent()
                                                this.setState({ dataFilled: true })
                                                this.reloadComponent()
                                            }
                                        },
                                    ])
                                }} style={{ borderWidth: 1, borderColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5, width: 200 }}>
                                    <Text style={{ ...robotoWeights.light, margin: 5, color: 'white' }}>
                                        START INSPECTION
                             </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
                {this.state.loading && <Loading />}
            </ImageBackground >
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.app.currentUser
})

const mapDispatchToProps = {
    deleteSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList)
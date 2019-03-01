import React from 'react'
import { View, ImageBackground, Image } from 'react-native'
import { ListItem, Text, colors } from 'react-native-elements'
import { robotoWeights } from 'react-native-typography'
import { Actions } from 'react-native-router-flux'

export default class Home extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{ height: 150, width: 150, resizeMode: 'contain', marginTop: 50 }} source={require('../assets/logo.png')} />
                        <View style={{ alignContent: 'center', marginBottom: 30 }}>
                            <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 25, color: 'white' }}>
                                Aircraft Inspection{'\n'}Checklist App
                        </Text>
                        </View>
                    </View>
                    <ListItem onPress={Actions.schedules} title={'Schedules'} titleStyle={{ ...robotoWeights.light, color: 'white' }} containerStyle={{ width: '100%', backgroundColor: 'rgba(1,89,166, 0.4)' }} leftIcon={{ name: 'date-range', iconStyle: { color: 'white' } }} />
                    <ListItem onPress={Actions.addSchedule} title={'Add Schedule'} titleStyle={{ ...robotoWeights.light, color: 'white' }} containerStyle={{ width: '100%', backgroundColor: 'rgba(1,89,166, 0.2)' }} leftIcon={{ name: 'add-circle-outline', iconStyle: { color: 'white' } }} />
                    <ListItem onPress={() => Actions.register({ edit: true })} title={'Profile'} titleStyle={{ ...robotoWeights.light, color: 'white' }} containerStyle={{ width: '100%', backgroundColor: 'rgba(1,89,166, 0.6)' }} leftIcon={{ name: 'account-circle', iconStyle: { color: 'white' } }} />
                    <ListItem onPress={Actions.about} title={'About'} titleStyle={{ ...robotoWeights.light, color: 'white' }} containerStyle={{ width: '100%', backgroundColor: 'rgba(1,89,166, 0.8)' }} leftIcon={{ name: 'assistant', iconStyle: { color: 'white' } }} />
                </View>
            </ImageBackground>
        )
    }
}
import React from 'react'
import { View, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Text, Card, ListItem, Icon } from 'react-native-elements'
import { robotoWeights } from 'react-native-typography'

import { connect } from 'react-redux'
import { logout } from '../actions/appActions'
import { Actions } from 'react-native-router-flux';

class Schedules extends React.Component {

    componentDidMount() {
        console.log('Current User', this.props.users)
    }

    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView>
                    <View>
                        <Card titleStyle={{ ...robotoWeights.light, fontSize: 20 }} containerStyle={{ borderRadius: 5 }} title={this.props.users[this.props.currentUser.index].schedules.length > 0 ? "Schedule/s" : "No Schedule"}>
                            {this.props.users[this.props.currentUser.index].schedules.map((schedule, i) =>
                                <ListItem key={i + 'sc'} containerStyle={{ borderRadius: 5 }}
                                    onPress={() => Alert.alert('Action needed', '', [
                                        { text: 'Begin Inspection', onPress: () => Actions.checklist({ schedule }) },
                                        { text: 'Cancel', onPress: () => { console.log('nothing') } }
                                    ])}
                                    title={`Aircraft: ${schedule.aircraftName}`}
                                    titleStyle={robotoWeights.light}
                                    subtitleStyle={robotoWeights.light}
                                    subtitle={`Serial Number: ${schedule.operator}\nDate: ${new Date(schedule.date).toDateString()} ${new Date(schedule.date).toLocaleTimeString()}\n${schedule.note}`}
                                />)}
                        </Card>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.app.currentUser,
    users: state.app.users
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedules)
import React from 'react'
import { ScrollView, View, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native'
import { Text } from 'react-native-elements'
import { robotoWeights } from 'react-native-typography'

export default class About extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} style={{ height: '100%', width: '100%' }}>
                <ScrollView>
                    <View style={{ width: '100%', height: 100 }}>
                        <Image source={require('../assets/header.png')} style={{ width: '100%', height: 100 }} />
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text style={{ ...robotoWeights.light, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                            MISSION
                        </Text>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', textAlign: 'center', fontSize: 20 }}>
                            To ensure a safe, secure and green Philippine Sky.
                    </Text>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text style={{ ...robotoWeights.light, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                            VISION
                        </Text>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 20 }}>
                            To be a pre-eminent Civil Aviation Authority in the world  and a global brand of excellence in civil aviation.
                    </Text>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text style={{ ...robotoWeights.light, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                            CORE VALUES
                        </Text>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 20 }}>
                            Fairness, Integrity, Accountability and Transparency
                    </Text>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text style={{ ...robotoWeights.light, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                            PRINCIPLES
                        </Text>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 20 }}>
                            "Sovereignity indivisible with National Security"
                    </Text>
                        <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 20 }}>
                            "Reciprocity indivisible with Parity"
                    </Text>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <TouchableOpacity activeOpacity={1} onLongPress={() => Linking.openURL('https://www.facebook.com/jikubb')}>
                            <Text style={{ ...robotoWeights.light, fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>
                                DREAM
                            </Text>
                            <Text style={{ ...robotoWeights.light, textAlign: 'center', fontSize: 20 }}>
                                The Future is in the Skies
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
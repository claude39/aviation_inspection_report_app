import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const LoadingIndicator = () =>
    <View style={{
        display: 'flex',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.5,
    }}>
        <ActivityIndicator style={{
            flex: 1,
            alignItems: 'center',
        }} />
    </View>

export default LoadingIndicator

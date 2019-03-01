import React, { Component } from 'react';

import {
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
var utf8 = require('utf8');
var binaryToBase64 = require('binaryToBase64');


import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class Example extends Component {

    state = {
        file: null
    }

    componentDidMount() {
        var text = 'foo © bar 𝌆 baz';
        var bytes = utf8.encode(text);
        var encoded = binaryToBase64(bytes);
        console.log(encoded);
        // let options = {
        //     html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
        //     fileName: 'test',
        //     base64: true,
        // };

        // try {
        //     const results = await RNHTMLtoPDF.convert(options)
        //     window.open("data:application/pdf;base64," + Base64.encode(results.base64));

        // } catch (err) {
        //     console.error(err)
        // }
    }

    render() {
        return (
            <View>
                <Text>
                    Welcome to React Native!
            </Text>

            </View>
        );
    }
}
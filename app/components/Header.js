import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends React.Component{

    render(){
    
    return (
        <View style={styles.headercontainer}>
            <Text style={styles.headertext}>MyTodoApp</Text>
        </View>
    );
};
}

const styles = StyleSheet.create({
    headercontainer: {
        marginTop: 100,
        marginBottom:50,
    },
    headertext:{
        fontSize : 25,
        fontWeight:'bold',
        color: '#3f4e66',
    },
});
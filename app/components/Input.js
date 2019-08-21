import React from 'react';
import {View, TextInput,  StyleSheet ,TouchableOpacity,Dimensions} from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Input({value,changeText,addTodoItem,addtimer}) {
    return (
        <View style={styles.input_container}>
            <TextInput
                value={value}
                onChangeText={changeText}
                onEndEditing = {addtimer}


                style ={styles.input}
                placeholder={"할일을 입력해주세요"}
                maxLength={25}
                returnKeyType="done"/>
            <TouchableOpacity onPress={addtimer}>
                <MaterialCommunityIcons name="timer" size={20} />
            </TouchableOpacity>
        </View>
    );
};

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({

    input: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom:20,
    },
    input_container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width : width-60,
        padding: 5,
    },

});
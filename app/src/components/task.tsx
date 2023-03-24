import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Task } from '../db/model';




type Props = {
    todo: Task;
    onDelete: (t: Task) => void;
    onEdit: (t: Task) => void;
}

const TodoItem = ({ todo, onDelete, onEdit }: Props) => {

    return (
        <View style={styles.container}>

            <Text style={styles.description}>{todo.description}</Text>

            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={styles.button} onPress={() => onEdit(todo)}>
                    <Ionicons name='pencil' color='#fff' size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => onDelete(todo)}>
                    <Ionicons name='trash' color='#f00' size={20} />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        marginVertical: 10,
        padding: 16,

    },
    description: {
        flex: 1,
        fontSize: 18,
        marginRight: 16,
        color: '#fff'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TodoItem;

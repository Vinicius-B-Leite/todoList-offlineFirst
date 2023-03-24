import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity, Keyboard } from 'react-native';

import { Task } from '../db/model';
import TodoItem from './task';
import { useTask } from '../context';
import { mySync } from '../db/sync/sync';



const Home: React.FC = () => {
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingItem, setEditingItem] = useState<Task>();
    const inputRef = useRef<TextInput>(null)
    const { getTasksCache, createTask, updateTask, deletetask } = useTask()

    useEffect(() => {
        getTasksCache().then((tasksCache) => {
            setTasks(tasksCache)
            mySync()
        })
    }, [])


    function handleEdit() {
        if (editingItem) {
            updateTask(editingItem, description).then((tasksCache) => {
                setDescription('')
                setEditingItem(undefined)
                setTasks(tasksCache)
            })
        }
    }

    function handleCreateTask() {
        createTask(description).then((tasksCache) => {
            setDescription('')
            setTasks(tasksCache)
        })
    }

    function handleDelete(t: Task) {
        deletetask(t).then((tasksCache) => {
            setTasks(tasksCache)
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicionar tarefa"
                    value={description}
                    onChangeText={setDescription}
                    ref={inputRef}
                    onBlur={() => {
                        if (editingItem){
                            setEditingItem(undefined)
                            setDescription('')
                        }
                    }}
                />
                <TouchableOpacity onPress={editingItem ? handleEdit : handleCreateTask} style={styles.btn}>
                    <Text style={styles.btnText}>{editingItem ? 'Salvar' : 'Criar'}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onDelete={(t) => handleDelete(t)}
                        onEdit={() => {
                            setDescription(item.description)
                            setEditingItem(item)
                            inputRef.current?.focus()
                        }}
                    />
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        backgroundColor: '#282828'
    },
    row: {
        flexDirection: 'row',
        height: 50
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4C4CFF',
        width: 70,
        borderRadius: 30
    },
    btnText: {
        color: '#fff'
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        marginRight: 8,
        padding: 8,
        flex: 1,
        color: '#fff',
        borderBottomColor: '#d3d3d3',
        fontSize: 16
    },

    update: {
        color: '#fff'
    },
    delete: {
        color: '#f00'
    }
});


export default Home;
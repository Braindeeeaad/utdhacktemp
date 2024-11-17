import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';

const data = [];

function TabOneScreenComponent() {
  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    const options = ['Use Camera', 'Camera Roll', 'Browse Files', 'Cancel'];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            console.log('Camera');
            break;
          case 1:
            console.log('Camera Roll');
            break;
          case 2:
            console.log('Files');
            break;
          default:
            // Cancel action, no need to do anything
            break;
        }
      }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No notes saved yet.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={openActionSheet}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default function TabOneScreen() {
  return (
    <ActionSheetProvider>
      <TabOneScreenComponent />
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: 'black',
    borderRadius: 28,
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
});

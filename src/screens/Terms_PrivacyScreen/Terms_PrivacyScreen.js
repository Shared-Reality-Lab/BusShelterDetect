
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Terms_PrivacyScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color="black" size={30} />
          <Text style={styles.headerText}>Terms and Privacy</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Terms of Use</Text>
        <Text style={styles.body}>
          By using the Sight app, you agree to the following terms and conditions:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> You are solely responsible for your use of the app and for any consequences of such use.
          </Text>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> You agree not to use the app for any illegal or unauthorized purposes.
          </Text>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> You agree not to interfere with the operation of the app or the servers that host the app.
          </Text>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> You agree to indemnify and hold harmless the developers of the Sight app from any and all
            claims arising from your use of the app.
          </Text>
        </View>
        <View style={styles.separator} />
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.body}>
          The Sight app collects and stores certain data about your use of the app, such as your
          location, the time and date of your use, and the pages you visit.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> The Sight app uses this data to improve the app and to provide you with personalized content.
          </Text>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> You can opt-out of data collection by disabling location services on your device.
          </Text>
          <Text style={styles.listItem}>
            <Icon name="checkmark-circle-outline" size={12} color="gray" /> The Sight app does not share your data with any third parties.
          </Text>
        </View>
        <Text style={styles.agree}>
          By using the Sight app, you agree to the terms and conditions set forth above.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  list: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  agree: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});

export default Terms_PrivacyScreen;
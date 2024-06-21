import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Icon from 'react-native-vector-icons/Ionicons';

const SupportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="black" size={30} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.heading}>Support</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
        Empowering the visually impaired with smart, seamless navigation and environment awareness through innovative smartphone and camera integration.
        </Text>
        <Text style={styles.contacts}>For any technical support, contact:</Text>
        <Text style={styles.contacts}>SRL</Text>

        <View style={styles.emailContainer}>
          <Text style={styles.emailLabel}>Email :</Text>
          <Hyperlink linkDefault={true}>
            <Text style={styles.emailLink}>mohammad.adnaan@mail.mcgill.ca</Text>
          </Hyperlink>
        </View>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#C3EDC0',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
  header: {
    alignItems: 'center',
    paddingTop: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: '90%',
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify',
    paddingTop: 5,
  },
  contacts: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom:10,
    color: '#000',
    fontWeight: 'bold',
  },
  contactPerson: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  emailLabel: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  emailLink: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default SupportScreen;
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import aboutImage from '../../../assets/images/logoName.png';

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            color="black"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.heading}>About the Sight App</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image source={aboutImage} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Project Details for the SRL:
              This Project Amish to leverage the abenefits of smartphones, possible carries on a neck-worn lanyard, or connected to expternal devices such as s head worn panoramic camera systems, to provide the navigation assistance for the visually imaged community.
            </Text>
            <Text style={styles.descriptionText}>
              1. Safely guiding user during interaction crossing to avoid veering, which can be dangerous and stressful.
            </Text>
            <Text style={styles.descriptionText}>
              2. Helping them navigate the last few meters to doorways they wish to enter and directing them to important points in the environment such as stairways and bus shelters
            </Text>
            <Text style={styles.descriptionText}>
              3. Switching beteerrn different app services including navigation function such as those listed above nd other services including OCR, product Identification and Environment Description, based on contextual information and personalisation.

              Our Proposed approach combines a machine learning strategy and leveraging existing image dataset, possianley argument by crowdsourcing and iterative design of the feedback mechanisms. This is informed by our lab’s experience with sensor based intersection crossing assistance systems.
            </Text>
            <Hyperlink linkDefault={true} linkStyle={styles.link}>
              <Text style={styles.linkText}>For more information, visit: https://srl.mcgill.ca</Text>
            </Hyperlink>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3EDC0',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heading: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  linkText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AboutScreen;
import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import logo from '../../../assets/images/logoName.png'; 

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const handleGetStarted = () => {
        navigation.navigate('ParentScreen');
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#C3EDC0' barStyle="dark-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    color: '#05375a' 
                }]}>Sight</Text>
                <Text style={styles.text}>Empowering the visually impaired with smart, seamless navigation and environment awareness through innovative smartphone and camera integration.</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleGetStarted}>
                        <View style={styles.signIn}>
                            <Text style={styles.textSign}>Get Started</Text>
                            <Icon
                                name="chevron-forward-sharp"
                                color="#fff"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContent}>
                    <Image
                        source={require('../../../assets/images/ZkvsOayM_400x400.jpg')}
                        style={styles.footerImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerText}>Design and Developed by SRL</Text>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'//'#f5fcff'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: '5%',
        paddingBottom: '5%',
    },
    footerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    logo: {
        width: height_logo,
        height: height_logo,
        alignSelf: 'center',
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'justify'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: '5%'
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: '#77CC77' 
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footerImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    },
});

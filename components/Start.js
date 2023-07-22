import { useState } from "react";
import { Alert, ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require('/Users/valeriabalducci/projects/projectsCF_A5/the-chat-app/img/background-image.png');
const icon = require('/Users/valeriabalducci/projects/projectsCF_A5/the-chat-app/img/icon.png');

const backgroundColors = {
    a: '#090C08',
    b: '#474056',
    c: '#8A95A5',
    d: '#B9C6AE',
};

const Start = ({navigation}) => {
    // add signInUser function to login user anonymously
    const auth = getAuth();

    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors.d);

    const signInUser = () => {
        signInAnonymously(auth)
          .then(result => {
            navigation.navigate("Chat", { name: name, color: color, uid: result.user.uid });
            Alert.alert("You are signed in successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
      };

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                <View style={styles.titlebox}>
                    <Text style={styles.appTitle}>The Chat App</Text>
                </View>
                <View style={styles.box}>
                <View style={styles.inputContainer}>
                    <Image styles={styles.icon} source={icon}/>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Your Name'
                        placeholderTextColor='#757083'
                    />
                    <Text style={styles.colorSelector}>Choose background color:</Text>
                    <View style={styles.selectColorElement}>
                        <TouchableOpacity 
                            style={[styles.circle, {backgroundColor: backgroundColors.a}]}
                            onPress={() => setColor(backgroundColors.a)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.circle, {backgroundColor: backgroundColors.b}]}
                            onPress={() => setColor(backgroundColors.b)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.circle, {backgroundColor: backgroundColors.c}]}
                            onPress={() => setColor(backgroundColors.c)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.circle, {backgroundColor: backgroundColors.d}]}
                            onPress={() => setColor(backgroundColors.d)}
                        >
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={signInUser}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            {/*fix keyboard hiding message input field on Android*/}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            {/*fix keyboard hiding message input field on iOS*/}
            { Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titlebox: {
        flex: 60,
      },
    image:{
        flex: 1,
        justifyContent: 'space-between',
        padding: '6%'
    },
    appTitle: {
        // flex: 2,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 45,
        marginTop: 60
    },
    box: {
        flex: 44,
        backgroundColor:'#fff',
        padding: '6%'
      },
    inputContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '6%'
    },
    icon: {
        height: 20,
        width: 20
      },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
        opacity: 0.5
    },
     icon: {
    height: 20,
    width: 20
  },
    selectColorElement: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    colorSelector: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        alignContent: 'center',
        backgroundColor: '#757083',
        padding: 10,
        marginTop: 30
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        alignSelf: 'center'
    }
})
export default Start;
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const {name, color} = route.params;
     // initialize state
    const [messages, setMessages] = useState([]);

    // set state with static message
    useEffect(() => {
        navigation.setOptions({title: name});
    }, []);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: "Hello",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
          {
            _id: 2,
            text: name + ", you've entered the chat",
            createdAt: new Date(),
            system: true,
          },
        ]);
      }, []);
    
      // custom function onSend(), is called when user sends message
      const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
      }
    
      const renderBubble = (props) => {
        return <Bubble {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }} />
      }
    

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1
            }}
            />
            {/*fix keyboard hiding message input field on Android*/}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            {/*fix keyboard hiding message input field on iOS*/}
            { Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});
export default Chat;
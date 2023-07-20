// import
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

// import elements to fetch messages from database
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  const { name, color, uid } = route.params;
     // initialize state
    const [messages, setMessages] = useState([]);

    // set state with static message
    useEffect(() => {
        navigation.setOptions({title: name});
    }, []);

    useEffect(() => {
        // set state with static message
        navigation.setOptions({ title: name });
        
        addDoc(collection(db, "messages"), {
        _id: Date.now(),
        text: name + " entered the chat",
        createdAt: new Date(),
        system: true,
        });

        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
            newMessages.push(
            {
                id: doc.id,
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.toMillis())
            })
        });
        setMessages(newMessages);
        });

        return () => {
        if (unsubMessages) unsubMessages();
        }
      }, []);
    
      // custom function onSend(), is called when user sends message
      const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
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
                _id: uid,
                name: name,
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
// import
import { useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';

// import elements to fetch messages from database
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

// define chat component
const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { name, color, uid } = route.params;
     // initialize state
    const [messages, setMessages] = useState([]);

    let unsubMessages;
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

        if (isConnected === true) {
          // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is reexecuted
          if (unsubMessages) unsubMessages();
          unsubMessages = null;

          const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
          unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
              newMessages.push(
                {
                  id: doc.id,
                  ...doc.data(),
                  createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            cacheMessages(newMessages);
            setMessages(newMessages);
          });
        } else loadCachedMessages();

        return () => {
        if (unsubMessages) unsubMessages();
        }
    
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
      } catch (error) {
        console.log(error.message);
      }
    }
  
    // load and cache messages
    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem("messages") || [];
      setMessages(JSON.parse(cachedMessages));
    }

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
    
    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }

    const renderCustomActions = (props) => {
      return <CustomActions storage={storage} {...props} />;
    };
  
    const renderCustomView = (props) => {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      }
      return null;
    }
  
    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={messages => onSend(messages)}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function PushButton() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            
        });
        


        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            console.log(expoPushToken);
        };
    }, []);

    return (
        <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
        <Text>{expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>{notification && notification.request.content.title} </Text>
            <Text>{notification && notification.request.content.body}</Text>
            <Text>{notification && notification.request.content.data.data}</Text>
            {/* <Text>data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}
        </View>
        <Button
            title="알람 보내기"
            onPress={async () => {
            await schedulePushNotification();
            }}
        />
        </View>
    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
        title: "제목",
        body: "내용",
        data: { data: "조정훈" },
        }
        ,
        trigger: { seconds: 1 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }


    return token;
}
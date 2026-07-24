import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import AppButton from '../../components/AppButton';
import { getFCMToken, requestUserPermission } from '../../services/notificationService';
import axios from 'axios';
//@ts-ignore
// import { TwilioVideo, TwilioVideoLocalView } from 'react-native-twilio-video-webrtc';
// import notifee, {AndroidImportance} from '@notifee/react-native';


type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    console.log('HomeScreen rendered');
    const twilioRef = useRef(null);

    const handleGo = async () => {
        //         await notifee.displayNotification({
        //   title: 'Local Test',
        //   body: 'Notifee is working 🚀',
        //   android: {
        //     channelId: 'default',
        //   },
        // });
        console.log('HomeScreen rendered1111');

        // getFCMToken();


        navigation.navigate('Details', { id: 1, name: 'Vijay Pratap' });
    }
    const requestPermissions = async () => {
        const cameraGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        );

        const micGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );

        return (
            cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
            micGranted === PermissionsAndroid.RESULTS.GRANTED
        );
    };
    const handleVideo = async () => {
        // requestUserPermission();
        const granted = await requestPermissions();
        if (!granted) {
            Alert.alert("Camera and Microphone permission required");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/user/generate-twilio-token",
                {
                    identity: "vijay",
                    roomName: "room123",
                }
            );
            //@ts-ignore
            twilioRef?.current?.connect({
                accessToken: response.data.token,
                roomName: "room123",
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <AppButton title="Go To Details" onPress={handleGo} style={styles.button} />
            <AppButton title="START VIDE0" onPress={handleVideo} style={styles.button} />
            {/* <View style={{ flex: 1 }}>
                <TwilioVideo
                    ref={twilioRef}
                    onRoomDidConnect={() => console.log("Connected")}
                    onRoomDidDisconnect={() => console.log("Disconnected")}
                    // onParticipantAddedVideoTrack={(e) =>
                    //     console.log("Participant Joined", e)
                    // }
                />

                <TwilioVideoLocalView
                    enabled={true}
                    style={{
                        width: 150,
                        height: 220,
                        position: "absolute",
                        top: 50,
                        right: 10,
                    }}
                />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
    button: { marginTop: 8 },
});

export default HomeScreen;

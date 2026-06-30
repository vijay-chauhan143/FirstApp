import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import AppButton from '../../components/AppButton';
import { getFCMToken, requestUserPermission } from '../../services/notificationService';
// import notifee, {AndroidImportance} from '@notifee/react-native';


type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    console.log('HomeScreen rendered');
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
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <AppButton title="Go To Details" onPress={handleGo} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
    button: { marginTop: 8 },
});

export default HomeScreen;

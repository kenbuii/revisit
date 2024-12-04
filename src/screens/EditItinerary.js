/* This is the edit itinerary screen. 
Users can view and edit only itineraries they have created.
Changes are not saved until the itinerary is confirmed.
TODO: add anthropic prompt filling to suggestions 
*/
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../services/supabaseClient';
import Navbar from '../components/navbar';
import * as icons from '../assets/icons';

const EditItineraryScreen = () => {
  const navigation = useNavigation();
  const [userCard, setUserCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [activities, setActivities] = useState({});
  const [removedActivities, setRemovedActivities] = useState([]);

  const fetchUserCreatedCards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('UserCreated', true)
        .single();

      if (error) throw error;
      setUserCard(data);

      // Fetch activities for this card
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('user_selected_activities')
        .select('*')
        .eq('card_id', data.id)
        .order('activity_day', { ascending: true });

      if (activitiesError) throw activitiesError;

      // Group activities by day
      const groupedActivities = activitiesData.reduce((acc, activity) => {
        acc[activity.activity_day] = acc[activity.activity_day] || [];
        acc[activity.activity_day].push(activity);
        return acc;
      }, {});

      setActivities(groupedActivities);
    } catch (error) {
      console.error('Error fetching card:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCreatedCards();
  }, []);

  const handleActionButton = (type) => {
    if (type === 'confirm') {
      navigation.navigate('ConfirmedItinerary');
    } else {
      setModalText(
        `Oops! You need to confirm your itinerary first before ${
          type === 'download' ? 'downloading' : 'sharing'
        }`
      );
      setModalVisible(true);
    }
  };

  const removeActivity = (activityId) => {
    setActivities(prevActivities => {
      const newActivities = { ...prevActivities };
      Object.keys(newActivities).forEach(day => {
        newActivities[day] = newActivities[day].filter(
          activity => activity.id !== activityId
        );
      });
      return newActivities;
    });
    setRemovedActivities([...removedActivities, activityId]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={icons.leftArrow} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.header}>final itinerary</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E03616" />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {userCard && (
            <>
              <Image source={{ uri: userCard.imageUrl }} style={styles.mainImage} />
              
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleActionButton('confirm')}>
                  <Image source={icons.checkmark} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActionButton('download')}>
                  <Image source={icons.download} style={styles.actionIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActionButton('share')}>
                  <Image source={icons.share} style={styles.actionIcon} />
                </TouchableOpacity>
              </View>

              {Object.entries(activities).map(([day, dayActivities]) => (
                <View key={day} style={styles.daySection}>
                  <Text style={styles.dayText}>{day}/19/25</Text>
                  <View style={styles.activitiesList}>
                    {dayActivities.map((activity) => (
                      <View key={activity.id} style={styles.activityItem}>
                        <Text style={styles.activityText}>
                          {activity.activity_name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeActivity(activity.id)}
                        >
                          <Image source={icons.exit} style={styles.exitIcon} />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => navigation.navigate('AddActivities')}
                    >
                      <Image source={icons.add} style={styles.addIcon} />
                      <Text style={styles.addButtonText}>Add my own</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 24,
    fontFamily: 'RobotoMono-Bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    gap: 15,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  daySection: {
    padding: 15,
  },
  dayText: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    marginBottom: 10,
  },
  activitiesList: {
    backgroundColor: '#F7F3F3',
    borderRadius: 10,
    padding: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E03616',
    borderRadius: 20,
    padding: 10,
    marginBottom: 8,
  },
  activityText: {
    color: 'white',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
  },
  exitIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addButtonText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoMono-Regular',
  },
  modalButton: {
    backgroundColor: '#E03616',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditItineraryScreen;


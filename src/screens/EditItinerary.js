/* This is the edit itinerary screen. 
Users can view and edit only itineraries they have created.
Changes are not saved until the itinerary is confirmed.
FEATURES: 
- Exit modal to confirm if user wants to leave without saving
- Navbar items are active/inactive based on which screen is active

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
import { HeaderBackButton } from "@react-navigation/elements";

const EditItineraryScreen = () => {
  const navigation = useNavigation();
  const [userCard, setUserCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [activities, setActivities] = useState({});
  const [removedActivities, setRemovedActivities] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [removedItemsStack, setRemovedItemsStack] = useState([]);
  const [showUndoModal, setShowUndoModal] = useState(false);
  const [selectedItemsToRestore, setSelectedItemsToRestore] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: null,
      headerLeft: () => (
        <HeaderBackButton onPress={() => handleNavigation('goBack')} />
      ),
    });
  }, [navigation]);

  const fetchUserCreatedCards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*, location')
        .eq('userCreated', true)
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
      let removedItem = null;
      Object.keys(newActivities).forEach(day => {
        const found = newActivities[day].find(activity => activity.id === activityId);
        if (found) {
          removedItem = { ...found, day };
          newActivities[day] = newActivities[day].filter(
            activity => activity.id !== activityId
          );
        }
      });
      if (removedItem) {
        setRemovedItemsStack(prev => [...prev, removedItem]);
      }
      return newActivities;
    });
  };

  const handleNavigation = (destination) => {
    setActiveNavItem(destination);
    setPendingNavigation(destination);
    setShowExitModal(true);
  };

  const handleConfirmNavigation = () => {
    if (pendingNavigation === 'goBack') {
      navigation.goBack();
    } else if (pendingNavigation) {
      navigation.navigate(pendingNavigation);
    }
    setShowExitModal(false);
    setPendingNavigation(null);
    setActiveNavItem(null);
  };

  const handleStay = () => {
    setShowExitModal(false);
    setPendingNavigation(null);
    setActiveNavItem(null);
  };

  const handleRestore = () => {
    setActivities(prevActivities => {
      const newActivities = { ...prevActivities };
      selectedItemsToRestore.forEach(item => {
        if (!newActivities[item.day]) {
          newActivities[item.day] = [];
        }
        newActivities[item.day].push(item);
      });
      return newActivities;
    });
    
    setRemovedItemsStack(prev => 
      prev.filter(item => !selectedItemsToRestore.includes(item))
    );
    setSelectedItemsToRestore([]);
    setShowUndoModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>final itinerary: </Text>
          {userCard && userCard.location && (
            <Text style={styles.location}>{userCard.location}</Text> //mutable location to change if updated in supabase
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E03616" />
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          {userCard && (
            <>
              <View style={styles.imageContainer}>
                <Image source={{ uri: userCard.imageUrl }} style={styles.mainImage} />
              </View>
              <View style={styles.buttonsRow}>
                <View style={styles.undoButtonContainer}>
                  {removedItemsStack.length > 0 && (
                    <TouchableOpacity 
                      style={styles.undoButton}
                      onPress={() => setShowUndoModal(true)}
                    >
                      <Image source={icons.repeat} style={styles.undoIcon} />
                      <Text style={styles.undoText}>undo</Text>
                    </TouchableOpacity>
                  )}
                </View>
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
              </View>

              {Object.entries(activities).map(([day, dayActivities]) => (
                <View key={day} style={styles.daySection}>
                  <Text style={styles.dayText}>{day}/19/25</Text>
                  <View style={styles.activitiesList}>
                    {dayActivities.map((activity) => (
                      <View key={activity.id} style={styles.activityItem}>
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeActivity(activity.id)}
                        >
                          <Image source={icons.exit} style={styles.exitIcon} />
                          <Text style={styles.activityText}>
                            {activity.activity_name}
                          </Text>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showExitModal}
        onRequestClose={() => setShowExitModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to leave this page? You will lose any unconfirmed changes.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.stayButton]}
                onPress={handleStay}
              >
                <Text style={[styles.modalButtonText, styles.stayButtonText]}>Stay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmNavigation}
              >
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Leave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Undo modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUndoModal}
        onRequestClose={() => setShowUndoModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.undoModalContent}>
            <View style={styles.undoModalHeader}>
              <TouchableOpacity onPress={() => setShowUndoModal(false)}>
                <Image source={icons.exit} style={styles.modalExitIcon} />
              </TouchableOpacity>
              <Text style={styles.undoModalHeaderText}>Select one or many.</Text>
              <TouchableOpacity 
                style={styles.restoreButton}
                onPress={handleRestore}
                disabled={selectedItemsToRestore.length === 0}
              >
                <Text style={styles.restoreButtonText}>Restore</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {removedItemsStack.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.removedItem,
                    selectedItemsToRestore.includes(item) && styles.selectedItem
                  ]}
                  onPress={() => {
                    setSelectedItemsToRestore(prev => 
                      prev.includes(item) 
                        ? prev.filter(i => i !== item)
                        : [...prev, item]
                    );
                  }}
                >
                  <Image source={icons.add} style={styles.addIcon} />
                  <Text style={styles.removedItemText}>{item.activity_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Navbar
        onPlanetPress={() => handleNavigation('Search')}
        onAddPress={() => handleNavigation('CreateItinerary')}
        onStarPress={() => handleNavigation('Profile')}
        isPlanetActiveOnSearchScreen={activeNavItem === 'Search'}
        isAddActiveOnOtherScreens={activeNavItem === 'CreateItinerary'}
        isStarActiveOnProfileScreen={activeNavItem === 'Profile'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontFamily: 'RobotoMono-Bold',
  },
  location: {
    fontSize: 24,
    fontFamily: 'RobotoMono-Bold',
    color: '#E03616',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainImage: {
    width: 333,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  actionButtonsContainer: {
    width: 333,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  daySection: {
    width: 333,
    borderWidth: 1,
    borderColor: '#959191',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
  },
  dayText: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    marginBottom: 10,
  },
  activitiesList: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  activityItem: {
    marginBottom: 8,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E03616',
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
  exitIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginRight: 5,
  },
  activityText: {
    color: 'white',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  stayButton: {
    backgroundColor: '#E03616',
    flex: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    marginLeft: 10,
  },
  stayButtonText: {
    color: 'white',
  },
  confirmButtonText: {
    color: 'black',
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#959191',
  },
  undoIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  undoText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
  },
  undoModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  undoModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalExitIcon: {
    width: 24,
    height: 24,
    tintColor: '#959191',
  },
  restoreButton: {
    backgroundColor: '#E03616',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  restoreButtonText: {
    color: 'white',
    fontFamily: 'RobotoMono-Bold',
    fontSize: 14,
  },
  removedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#959191',
    marginBottom: 8,
  },
  selectedItem: {
    borderColor: '#E03616',
    backgroundColor: '#FFF3F3',
  },
  removedItemText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 14,
    marginLeft: 5,
  },
  imageContainer: {
    width: 333,
    marginBottom: 10,
  },
  buttonsRow: {
    width: 333,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  undoButtonContainer: {
    // No specific styling needed
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  undoModalHeaderText: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 11,
    color: '#959191',
  },
});

export default EditItineraryScreen;


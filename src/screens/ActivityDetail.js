import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const DetailsScreen = ({ route }) => {
  const { activity } = route.params || {};

  return (
    <View style={styles.container}>
            
      <ScrollView contentContainerStyle={styles.content}>
                {/* Dynamic Activity Card */}
                
        {activity && (
          <View style={styles.activityCard}>
                        
            <View style={styles.activityContent}>
                            
              <Image
                source={
                  activity.icon
                    ? activity.icon
                    : require("../assets/icons/location.png") // Fallback to location icon
                }
                style={styles.activityIcon}
              />
                            
              <Text style={styles.activityText}>{activity.name}</Text>
                          
            </View>
                      
          </View>
        )}
                {/* Main Post Section */}
                
        <View style={styles.postCard}>
                    <Text style={styles.postTitle}>super fun day!</Text>
                    
          <Text style={styles.postText}>
                        
            {activity?.description ||
              "highly recommend going to this amazing spot! the food was great, and the atmosphere was perfect for a memorable day."}
                      
          </Text>
                    
          <View style={styles.userInfo}>
                        
            <Image
              source={{ uri: "https://via.placeholder.com/50" }} // Replace with user avatar URL if available
              style={styles.userAvatar}
            />
                        <Text style={styles.userName}>emilyinsf</Text>
                      
          </View>
                  
        </View>
                {/* Comments Section */}
                
        <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>comments</Text>
                    
          <View style={styles.commentCard}>
                        <Text style={styles.commentUser}>greenbean:</Text>
                        
            <Text style={styles.commentText}>
                            followed this itinerary last week and had a blast!
                          
            </Text>
                      
          </View>
                    
          <View style={styles.commentCard}>
                        <Text style={styles.commentUser}>socalsunny:</Text>
                        
            <Text style={styles.commentText}>
                            loved the {activity?.name || "place"}!!! would
              recommend it.             
            </Text>
                      
          </View>
                  
        </View>
              
      </ScrollView>
          
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  activityCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
    marginBottom: 10,
    alignItems: "center",
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  activityIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    resizeMode: "contain",
  },
  activityText: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
  postCard: {
    backgroundColor: "#FDFDFD",
    borderRadius: 10,
    borderColor: "#FF0000",
    borderWidth: 2,
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  postTitle: {
    fontSize: 22,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    marginBottom: 10,
    textTransform: "lowercase",
  },
  postText: {
    fontSize: 16,
    fontFamily: "RobotoMono-Regular",
    color: "#333333",
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#666666",
  },
  commentsSection: {
    borderTopWidth: 2,
    borderTopColor: "#E5E5E5",
    paddingTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    marginBottom: 10,
    textTransform: "lowercase",
  },
  commentCard: {
    flexDirection: "row",
    marginBottom: 15,
  },
  commentUser: {
    fontSize: 14,
    fontFamily: "RobotoMono-Bold",
    color: "#000000",
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#333333",
    flex: 1,
  },
});

export default DetailsScreen;

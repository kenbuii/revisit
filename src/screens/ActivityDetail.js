import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { supabase } from "../services/supabaseClient";

const DetailsScreen = ({ route }) => {
  const { cardId, activityDay } = route.params;

  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const { data: reviewData, error: reviewError } = await supabase
        .from("activity_reviews")
        .select("*")
        .eq("card_id", cardId)
        .eq("activity_day", activityDay)
        .single();

      if (reviewError) throw reviewError;
      setReview(reviewData);

      const { data: commentsData, error: commentsError } = await supabase
        .from("activity_comments")
        .select("*")
        .eq("activity_review_id", reviewData.id)
        .order("created_at", { ascending: true });

      if (commentsError) throw commentsError;
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching activity details:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [cardId, activityDay]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#E03616" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Day Card */}
        <View style={styles.dayCard}>
          <Text style={styles.dayTitle}>day {activityDay}</Text>
          {review && (
            <View style={styles.dayActivities}>
              {/* Example activity buttons (can be dynamically loaded if available) */}
              <View style={styles.activityButton}>
                <Image
                  source={require("../assets/icons/location.png")}
                  style={styles.icon}
                />
                <Text style={styles.activityButtonText}>Fisherman’s Wharf</Text>
              </View>
              <View style={styles.activityButton}>
                <Image
                  source={require("../assets/icons/food.png")}
                  style={styles.icon}
                />
                <Text style={styles.activityButtonText}>Pier Market Seafood</Text>
              </View>
              <View style={styles.activityButton}>
                <Image
                  source={require("../assets/icons/shopping.png")}
                  style={styles.icon}
                />
                <Text style={styles.activityButtonText}>V Boutique</Text>
              </View>
            </View>
          )}
        </View>

        {/* Review Section */}
        {review && (
          <View style={styles.postCard}>
            <Text style={styles.postTitle}>super fun day!</Text>
            <Text style={styles.postText}>
              {review.overall_review ||
                "Highly recommend going to this amazing spot! The food was great, and the atmosphere was perfect for a memorable day."}
            </Text>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }} // Replace with user avatar if available
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>{review.username || "unknown_user"}</Text>
            </View>
          </View>
        )}

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>comments</Text>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <View key={comment.id} style={styles.commentCard}>
                <Text style={styles.commentUser}>{comment.username}:</Text>
                <Text style={styles.commentText}>{comment.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>No comments yet.</Text>
          )}
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
    paddingVertical: 20,
  },
  dayCard: {
    backgroundColor: "#F7F3F3",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  dayActivities: {
    marginTop: 10,
  },
  activityButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#959191",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  activityButtonText: {
    fontSize: 14,
    fontFamily: "RobotoMono-Regular",
    color: "#000000",
  },
  postCard: {
    backgroundColor: "#FFEBEB",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderColor: "#E03616",
    borderWidth: 1.5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E03616",
    marginBottom: 10,
  },
  postText: {
    fontSize: 14,
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
    fontWeight: "bold",
    color: "#666666",
  },
  commentsSection: {
    borderTopWidth: 2,
    borderTopColor: "#E5E5E5",
    paddingTop: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  commentCard: {
    backgroundColor: "#F7F3F3",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "column",
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#555555",
  },
  noComments: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#999999",
  },
});

export default DetailsScreen;


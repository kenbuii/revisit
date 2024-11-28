import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../services/supabaseClient";

const ActivityDetails = ({ route }) => {
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
    <ScrollView style={styles.container}>
      {review && (
        <View style={styles.reviewContainer}>
          <Text style={styles.username}>{review.username}</Text>
          <Text style={styles.overallReview}>{review.overall_review}</Text>
        </View>
      )}
      <View style={styles.commentsContainer}>
        <Text style={styles.commentsHeader}>Comments:</Text>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentUser}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
          ))
        ) : (
          <Text>No comments yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  reviewContainer: { marginBottom: 20 },
  username: { fontSize: 16, fontWeight: "bold" },
  overallReview: { fontSize: 14, marginTop: 10 },
  commentsContainer: { marginTop: 20 },
  commentsHeader: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  comment: { marginBottom: 15 },
  commentUser: { fontWeight: "bold", marginBottom: 5 },
  commentText: { fontSize: 14 },
});

export default ActivityDetails;

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Inicjalizacja Firebase Admin SDK
admin.initializeApp();

// Funkcja synchronizująca leaderboard
exports.syncLeaderboard = functions.firestore
    .document("users/{userId}")
    .onWrite(async (change, context) => {
        const after = change.after.data();
        const userId = context.params.userId;

        if (after) {
            const leaderboardRef = admin.firestore().collection("leaderboard").doc(userId);
            await leaderboardRef.set({
                userId,
                username: after.username || "Anonymous",
                totalPoints: after.totalPoints || 0,
            });
        }
    });

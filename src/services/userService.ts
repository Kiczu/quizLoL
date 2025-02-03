import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, deleteUser as firebaseDeleteUser, updatePassword, GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { db } from "../api/firebase/firebse";

const createUser = async ({ id, ...userData }: any) => {
    await setDoc(doc(db, "users", id), userData);
};

const getUserData = async (userId: string) => {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

const updateUserData = async (userId: string, data: Record<string, any>) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, data);
};
const updateUserAvatar = async (userId: string, avatarPath: string) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { avatar: avatarPath });
};
const uploadUserAvatar = async (userId: string, file: File): Promise<string> => {
    const storage = getStorage();
    const avatarRef = ref(storage, `avatars/${userId}_${file.name}`);

    await uploadBytes(avatarRef, file);

    const downloadURL = await getDownloadURL(avatarRef);
    return downloadURL;
};

const deleteUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const userDoc = doc(db, "users", user.uid);
        await deleteDoc(userDoc);
        await firebaseDeleteUser(user);
        return true;
    }
    return false;
};

const changeUserPassword = async (newPassword: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        await updatePassword(user, newPassword);
    } else {
        throw new Error("No user is logged in.");
    }
};

const handlePasswordChange = async ({
    newPassword,
    confirmPassword,
}: {
    newPassword: string;
    confirmPassword: string;
}): Promise<string> => {
    if (newPassword !== confirmPassword) {
        return "Passwords do not match!";
    }

    try {
        await changeUserPassword(newPassword);
        return "Password updated successfully!";
    } catch (error: any) {
        if (error.code === "auth/requires-recent-login") {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const provider = new GoogleAuthProvider();
                    await reauthenticateWithPopup(user, provider);
                    await changeUserPassword(newPassword);
                    return "Password updated successfully!";
                } else {
                    throw new Error("No user is logged in.");
                }
            } catch (reauthError) {
                console.error("Reauthentication failed:", reauthError);
                return "Reauthentication required. Please log in again.";
            }
        }
        console.error("Error updating password:", error);
        return "Failed to update password.";
    }
};

const handleUserProfileUpdate = async (
    userId: string,
    formData: Record<string, string>
) => {
    try {
        await updateUserData(userId, formData);
        return "User information updated successfully!";
    } catch (error) {
        console.error("Error updating user data:", error);
        return "Failed to update user information.";
    }
};


export const userService = {
    createUser,
    getUserData,
    changeUserPassword,
    updateUserData,
    deleteUser,
    handlePasswordChange,
    handleUserProfileUpdate,
    updateUserAvatar,
    uploadUserAvatar,
};

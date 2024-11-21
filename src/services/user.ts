import { updateEmail, deleteUser as deleteAuthUser } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase/firebse";
import { User } from "../api/types";

interface UpdatedUserData {
    email?: string;
    login?: string;
    firstName?: string;
    [key: string]: any;
}

const get = async (id: string) => {
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    return {
        id,
        ...userDoc.data(),
    } as User;
};
const add = async ({ id, ...userData }: User) => {
    await setDoc(doc(db, "users", id), userData);
};

const update = async (userId: string, updatedData: UpdatedUserData) => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", userId);

    try {
        if (updatedData.email && user) {
            await updateEmail(user, updatedData.email);
            delete updatedData.email;
        }

        await setDoc(userRef, updatedData, { merge: true });
        console.log("Dane użytkownika zaktualizowane w Firestore.");
        return true;
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych użytkownika:", error);
        throw error;
    }
};

const remove = async () => {
    const user = auth.currentUser;

    if (user) {
        try {
            await deleteDoc(doc(db, "users", user.uid));
            await deleteAuthUser(user);
            return true;
        } catch (error) {
            return false;
        }
    }
};

export const userService = {
    get,
    add,
    update,
    remove,
};
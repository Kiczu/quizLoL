import { useState, useEffect } from "react";
import { userService } from "../../../services/userService";
import { useAuth } from "../../../context/LoginContext/LoginContext";

export const useAvatar = () => {
    const { userData, refreshUserData } = useAuth();
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            if (userData?.uid) {
                const userDoc = await userService.getUserData(userData.uid);
                if (userDoc && userDoc.avatar) {
                    setSelectedAvatar(userDoc.avatar);
                }
            }
        };
        fetchAvatar();
    }, [userData]);

    const updateAvatar = async (avatarPath: string) => {
        if (userData?.uid) {
            await userService.updateUserAvatar(userData.uid, avatarPath);
            setSelectedAvatar(avatarPath);
            await refreshUserData();
        }
    };

    const uploadAvatar = async (file: File) => {
        if (userData?.uid) {
            const uploadedAvatarPath = await userService.uploadUserAvatar(
                userData.uid,
                file
            );
            await updateAvatar(uploadedAvatarPath);
        }
    };

    return { selectedAvatar, updateAvatar, uploadAvatar };
};

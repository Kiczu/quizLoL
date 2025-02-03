import { useState, useEffect } from "react";
import { userService } from "../../services/userService";

export const useUserProfile = (userId: string | undefined) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (userId) {

            const fetchUserData = async () => {
                const userData = await userService.getUserData(userId);
                if (userData) {
                    setFormData({
                        firstName: userData.firstName || "",
                        lastName: userData.lastName || "",
                        email: userData.email || "",
                    });
                }
            };
            fetchUserData();
        }
    }, [userId]);

    const updateUserProfile = async () => {
        if (userId) {
            return userService.handleUserProfileUpdate(userId, formData);
        }
    };

    return { formData, setFormData, updateUserProfile };
};

export default useUserProfile;
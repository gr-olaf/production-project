import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from './model/slice/profileSlice';
import type { Profile, ProfileSchema } from './model/types/profile';
import { ProfileCard } from './ui/ProfileCard/ProfileCard';

export {
	Profile,
	ProfileSchema,
	profileActions,
	profileReducer,
	fetchProfileData,
	ProfileCard,
};

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { Profile } from '../../model/types/profile';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
   className?: string;
   data?: Profile;
   isLoading?: boolean;
   error?: string;
   readOnly?: boolean;
   onChangeFirstname?: (value?: string) => void;
   onChangeLastname?: (value?: string) => void;
   onChangeAge?: (value?: string) => void;
   onChangeCity?: (value?: string) => void;
   onChangeUsername?: (value?: string) => void;
   onChangeAvatar?: (value?: string) => void;
   onChangeCurrency?: (value: Currency) => void;
   onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
   return (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={<ProfileCardRedesigned {...props} />}
         off={<ProfileCardDeprecated {...props} />}
      />
   );
};

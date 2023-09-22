import { getUserAuthData } from '@/entities/User';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
   Button as ButtonDeprecated,
   ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
   className?: string;
}

export const EditableProfileCardHeader = memo(
   (props: EditableProfileCardHeaderProps) => {
      const { className } = props;

      const { t } = useTranslation('profile');
      const readOnly = useSelector(getProfileReadOnly);
      const authData = useSelector(getUserAuthData);
      const profileData = useSelector(getProfileData);
      const dispatch = useAppDispatch();

      const canEdit = authData?.id === profileData?.id;

      const onEdit = useCallback(() => {
         dispatch(profileActions.setReadOnly(false));
      }, [dispatch]);

      const onCancelEdit = useCallback(() => {
         dispatch(profileActions.cancelEdit());
      }, [dispatch]);

      const onSave = useCallback(() => {
         dispatch(updateProfileData());
      }, [dispatch]);

      return (
         <ToggleFeatures
            feature="isAppRedesigned"
            on={
               <Card padding="16" border="partial" max>
                  <HStack
                     max
                     justify="between"
                     className={classNames('', {}, [className])}
                  >
                     <Text title={t('Профиль')} />
                     {canEdit && (
                        <>
                           {readOnly ? (
                              <Button
                                 variant="outlined"
                                 onClick={onEdit}
                                 data-testid={
                                    'EditableProfileCardHeader.EditButton'
                                 }
                              >
                                 {t('Редактировать')}
                              </Button>
                           ) : (
                              <HStack gap="8">
                                 <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={onCancelEdit}
                                    data-testid={
                                       'EditableProfileCardHeader.CancelButton'
                                    }
                                 >
                                    {t('Отменить')}
                                 </Button>
                                 <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={onSave}
                                    data-testid={
                                       'EditableProfileCardHeader.SaveButton'
                                    }
                                 >
                                    {t('Сохранить')}
                                 </Button>
                              </HStack>
                           )}
                        </>
                     )}
                  </HStack>
               </Card>
            }
            off={
               <HStack
                  max
                  justify="between"
                  className={classNames('', {}, [className])}
               >
                  <TextDeprecated title={t('Профиль')} />
                  {canEdit && (
                     <>
                        {readOnly ? (
                           <ButtonDeprecated
                              theme={ButtonTheme.OUTLINE}
                              onClick={onEdit}
                              data-testid={
                                 'EditableProfileCardHeader.EditButton'
                              }
                           >
                              {t('Редактировать')}
                           </ButtonDeprecated>
                        ) : (
                           <HStack gap="8">
                              <ButtonDeprecated
                                 theme={ButtonTheme.OUTLINE_RED}
                                 onClick={onCancelEdit}
                                 data-testid={
                                    'EditableProfileCardHeader.CancelButton'
                                 }
                              >
                                 {t('Отменить')}
                              </ButtonDeprecated>
                              <ButtonDeprecated
                                 theme={ButtonTheme.OUTLINE}
                                 onClick={onSave}
                                 data-testid={
                                    'EditableProfileCardHeader.SaveButton'
                                 }
                              >
                                 {t('Сохранить')}
                              </ButtonDeprecated>
                           </HStack>
                        )}
                     </>
                  )}
               </HStack>
            }
         />
      );
   },
);

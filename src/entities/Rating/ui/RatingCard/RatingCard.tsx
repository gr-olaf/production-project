import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import {
   Button as ButtonDeprecated,
   ButtonSize,
   ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RatingCardProps {
   className?: string;
   title?: string;
   feedbackTitle?: string;
   hasFeedback?: boolean;
   onCancel?: (starsCount: number) => void;
   onAccept?: (starsCount: number, feedback?: string) => void;
   rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
   const {
      className,
      title,
      feedbackTitle,
      hasFeedback,
      onAccept,
      onCancel,
      rate = 0,
   } = props;
   const { t } = useTranslation();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [starsCount, setStarsCount] = useState(rate);
   const [feedback, setFeedback] = useState('');
   const isMobile = useDevice();

   const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
         setStarsCount(selectedStarsCount);
         if (hasFeedback) {
            setIsModalOpen(true);
         } else {
            onAccept?.(selectedStarsCount);
         }
      },
      [hasFeedback, onAccept],
   );

   const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
   }, [feedback, onAccept, starsCount]);

   const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
   }, [onCancel, starsCount]);

   const modalContent = (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={
            <>
               <Text title={feedbackTitle} />
               <Input
                  placeholder={t('Ваш отзыв')}
                  value={feedback}
                  onChange={setFeedback}
                  data-testid="RatingCard.Input"
               />
            </>
         }
         off={
            <>
               <TextDeprecated title={feedbackTitle} />
               <InputDeprecated
                  placeholder={t('Ваш отзыв')}
                  value={feedback}
                  onChange={setFeedback}
                  data-testid="RatingCard.Input"
               />
            </>
         }
      />
   );

   const content = (
      <>
         <VStack align="center" gap="8" max>
            <ToggleFeatures
               feature="isAppRedesigned"
               on={
                  <Text title={starsCount ? t('Спасибо за оценку!') : title} />
               }
               off={
                  <TextDeprecated
                     title={starsCount ? t('Спасибо за оценку!') : title}
                  />
               }
            />
            <StarRating
               selectedStars={starsCount}
               size={40}
               onSelect={onSelectStars}
            />
         </VStack>

         {!isMobile ? (
            <Modal isOpen={isModalOpen} lazy>
               <VStack max gap="32">
                  {modalContent}
                  <ToggleFeatures
                     feature="isAppRedesigned"
                     on={
                        <HStack max gap="16" justify="end">
                           <Button
                              onClick={cancelHandle}
                              data-testid="RatingCard.Close"
                           >
                              {t('Закрыть')}
                           </Button>
                           <Button
                              onClick={acceptHandle}
                              data-testid="RatingCard.Send"
                           >
                              {t('Отправить')}
                           </Button>
                        </HStack>
                     }
                     off={
                        <HStack max gap="16" justify="end">
                           <ButtonDeprecated
                              onClick={cancelHandle}
                              theme={ButtonTheme.OUTLINE_RED}
                              data-testid="RatingCard.Close"
                           >
                              {t('Закрыть')}
                           </ButtonDeprecated>
                           <ButtonDeprecated
                              onClick={acceptHandle}
                              data-testid="RatingCard.Send"
                           >
                              {t('Отправить')}
                           </ButtonDeprecated>
                        </HStack>
                     }
                  />
               </VStack>
            </Modal>
         ) : (
            <Drawer isOpen={isModalOpen} onClose={cancelHandle} lazy>
               <VStack max gap="32">
                  {modalContent}
                  <ToggleFeatures
                     feature="isAppRedesigned"
                     on={
                        <Button onClick={acceptHandle} size="l" fullWidth>
                           {t('Отправить')}
                        </Button>
                     }
                     off={
                        <ButtonDeprecated
                           onClick={acceptHandle}
                           size={ButtonSize.L}
                           fullWidth
                        >
                           {t('Отправить')}
                        </ButtonDeprecated>
                     }
                  />
               </VStack>
            </Drawer>
         )}
      </>
   );

   return (
      <ToggleFeatures
         feature="isAppRedesigned"
         on={
            <Card
               className={classNames('', {}, [className])}
               padding="24"
               border="round"
               max
               data-testid="RatingCard"
            >
               {content}
            </Card>
         }
         off={
            <CardDeprecated
               className={classNames('', {}, [className])}
               max
               data-testid="RatingCard"
            >
               {content}
            </CardDeprecated>
         }
      />
   );
});

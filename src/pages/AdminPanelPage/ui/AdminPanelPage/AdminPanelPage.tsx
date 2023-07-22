import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelPage.module.scss';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';

interface AdminPanelPageProps {
	className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
	const { className } = props;
	const { t } = useTranslation('admin-panel');

	return (
		<Page className={classNames(cls.AdminPanelPage, {}, [className])}>
			{t('Админ панель')}
		</Page>
	);
});

export default AdminPanelPage;

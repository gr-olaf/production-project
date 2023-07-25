import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { ListBox } from 'shared/ui/Popups';

interface CountrySelectProps {
	className?: string;
	readOnly?: boolean;
	value?: Country;
	onChange?: (value: Country) => void;
}

const options = [
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
	const { className, value, onChange, readOnly } = props;

	const { t } = useTranslation();

	const onChangeHandler = useCallback(
		(value: string) => {
			onChange?.(value as Country);
		},
		[onChange]
	);

	return (
		<ListBox
			className={className}
			items={options}
			value={value}
			defaultValue={t('Укажите страну')}
			label={t('Укажите страну')}
			onChange={onChangeHandler}
			readonly={readOnly}
			direction="top right"
		/>
	);
});

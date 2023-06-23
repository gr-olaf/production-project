import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';

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
		<Select
			readOnly={readOnly}
			className={classNames('', {}, [className])}
			label={t('Укажите страну')}
			options={options}
			value={value}
			onChange={onChangeHandler}
		/>
	);
});

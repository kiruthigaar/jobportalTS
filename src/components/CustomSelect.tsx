import React from 'react';
import { useField } from 'formik';
import Select, { MultiValue } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    name: string;
    label: string;
    options: Option[];
}
interface Option {
    value: string;

}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, ...props }) => {
    const [field, , { setValue }] = useField<string[]>(props);


    const handleChange = (
        newValue: MultiValue<Option>,
     ) => {
          setValue(newValue ? (newValue as Option[]).map(option => option.value) : []);
    };

    return (
        <div>
            <label>{label}</label>
            <Select
                isMulti
                options={options}
                value={options.filter(option => field.value.includes(option.value))}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
};

export default CustomSelect;
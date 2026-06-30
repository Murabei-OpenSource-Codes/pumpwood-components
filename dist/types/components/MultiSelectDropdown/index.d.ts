export interface IMultiSelectOption {
    label: string;
    value: string;
}
interface IMultiSelectDropdownProps {
    options: IMultiSelectOption[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
    maxDisplay?: number;
}
export declare function MultiSelectDropdown({ options, selected, onChange, placeholder, className, maxDisplay, }: IMultiSelectDropdownProps): import("react/jsx-runtime").JSX.Element;
export {};

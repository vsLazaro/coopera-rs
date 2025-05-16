import { CSSProperties, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: CSSProperties; // Adiciona a prop styles
}

export function TextInput({ placeholder, type, value, onChange, styles, ...rest }: TextInputProps) {
    const defaultStyle: CSSProperties = {
        padding: '8px',
        fontFamily: "Istok Web",
        fontSize: '16px',
        border: '1px solid black',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box' // Inclui padding e border na largura total
    };

    const combinedStyle: CSSProperties = { ...defaultStyle, ...styles }; // Mescla os estilos

    return (
        <input
            className=".text-input"
            style={combinedStyle}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest} // Repassa todas as outras props, como onFocus e onBlur
        />
    );
}

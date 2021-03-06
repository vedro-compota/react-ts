
import React from "react";
import './text-input.css';
import { ChangeEventHandler } from "react";
import { ValidationFromContext } from '../../ValidationFrom';
import useInputErrorGetter from '@app-universal/hooks/useInputErrorGetter'; 

type TextInputPropsType = {
    value?: any,
    unfocusedValue?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
}

export default function TextInput(
    { value, onChange, name, placeholder, unfocusedValue }: TextInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const placeholderValue = placeholder ? placeholder : nameValue;
    const validationContext = React.useContext(ValidationFromContext);
    const [focused, setFocused] = React.useState(false);

    const realValueView = value ? value : '';
    
    const shownValue = focused ? realValueView
        : (unfocusedValue ? unfocusedValue : realValueView);

    const errors = React.useMemo(() => {
        return validationContext ? validationContext.errors : []
    },
        [validationContext]
    );

    const setRefCallback = React.useCallback((el: any, name: string) => {
        if (validationContext && validationContext.setRef) {
            validationContext.setRef(el, name);
        }
    }, [validationContext]);

    const markFocused = React.useCallback(() => {
        setFocused(true);
    }, [setFocused]);
    const markUnfocused = React.useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    const setSefRef = React.useCallback((el) => {
        setRefCallback(el, nameValue);
    }, [setRefCallback, nameValue]
    );

    const [isError, errorText] = useInputErrorGetter(nameValue, value, errors);
    const inputClassName = React.useMemo(() => {
        return isError ? 'error-input' : 'normal';
    }, [isError]);

    return (
        <div>
            <div>
                <input
                    className={inputClassName}
                    value={shownValue}
                    onChange={onChangeCallback}
                    name={nameValue}
                    placeholder={placeholderValue}
                    ref={setSefRef}
                    onBlur={markUnfocused}
                    onFocus={markFocused}
                />
            </div>
            <div className={isError ? 'error-text' : 'normal'}>
                {errorText}
            </div>
        </div>
    );
}
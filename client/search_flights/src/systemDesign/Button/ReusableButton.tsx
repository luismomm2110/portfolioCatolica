import React from "react";

import './ReusableButton.css'

type Props = {
    description: string
    label?: string
    callback?: any
    disabled?: boolean
    placeholder?: string
}

export const ReusableButton: React.FC<Props> = ({description, label, callback, disabled, placeholder}) =>
    <button
        type="submit"
        aria-label={label ?? description}
        onClick={callback}
        disabled={disabled ?? false}
    >
        {description}
    </button>
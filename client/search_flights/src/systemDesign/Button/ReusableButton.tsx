import React from "react";

import './ReusableButton.css'

type Props = {
    description: string
    label?: string
    callback?: () => void
}

export const ReusableButton: React.FC<Props> = ({description, label, callback}) =>
    <button type="submit" aria-label={label ?? description} onClick={callback}>{description}</button>
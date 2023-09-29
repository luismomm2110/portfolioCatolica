import React from "react";

import './ReusableButton.css'

type Props = {
    description: string
    label?: string
}

export const ReusableButton: React.FC<Props> = ({description, label}) =>
    <button type="submit" aria-label={label ?? description}>{description}</button>
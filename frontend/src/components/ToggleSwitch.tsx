
import React from 'react';
import type { ToggleSwitchProps } from '../types/settings.types';

/**
* A custom styled toggle switch built with Tailwind CSS for boolean state management.
* {boolean} checked - The current state of the switch (on/off).
* {() => void} onChange - The event handler that is triggered when the switch is clicked.
* {boolean} [disabled=false] - Optional flag to disable user interaction.
* {string} ariaLabel - Accessibility label for screen readers.
*/
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    disabled = false,
    ariaLabel
}) => {
    return (
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            // Main container for the toggle switch.
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                ${checked ? 'bg-teal-600' : 'bg-gray-300'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
        >
            {/* Horizontal transitions based on the checked condition */}
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${checked ? 'translate-x-6' : 'translate-x-1'}
                `}
            />
        </button>
    );
};

export default ToggleSwitch;
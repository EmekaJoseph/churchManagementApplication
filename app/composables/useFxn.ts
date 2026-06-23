import { createPopper, type VirtualElement } from '@popperjs/core'

type DebounceFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;



export default {
    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    passwordRegex: (password: string, min: number = 8) => {
        /*Minimum of '$min' characters, One special character,  A number*/
        if (!password || password.length < min) return false;
        if (!/\d/.test(password)) return false;
        if (!/[!@#$%^&*(),.?":{}|<>\-_]/.test(password)) return false;
        return true;
    },

    arraySum: (array: any[], prop?: string) => {
        if (!Array.isArray(array)) return 0;

        return array.reduce((acc, curr) => {
            const value = prop ? curr?.[prop] : curr;
            const num = Number(value);

            return !isNaN(num) ? acc + num : acc;
        }, 0);
    },

    digitDisplay: (numb: any, decimal = true) => {
        // 1. Safety check: ensure it is a valid number
        const value = Number(numb);
        if (isNaN(value)) return decimal ? "0.00" : "0";

        // 2. If decimal is true, format with 2 decimal places
        if (decimal) {
            // Convert to string with fixed 2 decimal places
            const parts: any[] = value.toFixed(2).split(".");
            // Add commas to the integer part
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        } else {
            // For non-decimal formatting, convert to string without decimals
            const integerPart = Math.trunc(value).toString();
            // Add commas to the integer part
            return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    vSelectAutoPosition: (dropdownList: HTMLElement, component: { $refs: { toggle: Element | VirtualElement; }; $el: { classList: { toggle: (arg0: string, arg1: boolean) => void; }; }; }, { width }: any) => {
        dropdownList.style.width = width

        const calculatePlacement = () => {
            const rect = component.$refs.toggle.getBoundingClientRect()
            const viewportHeight = window.innerHeight

            const spaceAbove = rect.top
            const spaceBelow = viewportHeight - rect.bottom

            return spaceBelow < spaceAbove ? 'top' : 'bottom'
        }

        const placement = calculatePlacement()

        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, -1],
                    },
                },
                {
                    name: 'toggleClass',
                    enabled: true,
                    phase: 'write',
                    fn({ state }) {
                        component.$el.classList.toggle(
                            'drop-up',
                            state.placement === 'top'
                        )
                    },
                },
            ],
        })

        return () => popper.destroy()
    },
}
"use client";

import { ActionIcon, Tooltip, Transition, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconSunHigh, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const tooltipDelay = 400;
const tooltipTransition = 'fade';

export default function ThemeButton() {
    const theme = useMantineTheme();
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme(undefined, { getInitialValueInEffect: true });
    const [mountedSun, setMountedSun] = useState(true);

    const toggleColorScheme = () => {
        setMountedSun(!mountedSun);
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
    }

    useEffect(() => {
        computedColorScheme === 'light' ? setMountedSun(false) : setMountedSun(true)
    }, [computedColorScheme]);

    return (
        <>
            <Transition
                mounted={mountedSun}
                transition="fade"
                duration={350}
                timingFunction="ease"
            >
                {(fadeStyle) => {
                    return <Tooltip label="Set Light Theme" color={theme.colors.dark[3]} lightHidden={true}
                        transitionProps={{ transition: tooltipTransition, duration: tooltipDelay }}
                    >
                        <ActionIcon style={fadeStyle} variant='subtle' color={theme.colors.dark[3]} lightHidden={true} radius={20} size={38} aria-label="Set Light Theme Icon"
                            onClick={toggleColorScheme}
                        >
                            <IconSunHigh
                            />
                        </ActionIcon>
                    </Tooltip>
                }
                }
            </Transition>

            <Transition
                mounted={!mountedSun}
                transition="fade"
                duration={350}
                timingFunction="ease"
            >
                {(fadeStyle) => {
                    return <Tooltip label="Set Dark Theme" color={theme.colors.dark[3]} darkHidden={true}
                        transitionProps={{ transition: tooltipTransition, duration: tooltipDelay }}
                    >
                        <ActionIcon style={fadeStyle} variant='subtle' color={theme.colors.dark[3]} darkHidden={true} radius={20} size={38} aria-label="Set Dark Theme Icon"
                            onClick={toggleColorScheme}
                        >
                            <IconMoon
                            />
                        </ActionIcon>
                    </Tooltip>
                }
                }
            </Transition>
        </>
    );
}

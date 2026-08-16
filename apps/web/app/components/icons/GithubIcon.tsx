import { useMantineColorScheme } from "@mantine/core";
import { CSSProperties, useEffect, useState } from "react";
import githubMark from '../../images/github-mark.svg';
import githubMarkWhite from '../../images/github-mark-white.svg';
import Image from "next/image";

export const GithubIcon = ({ height, width, style }: { height?: number, width?: number, style?: CSSProperties | undefined }) => {
    const { colorScheme } = useMantineColorScheme({ keepTransitions: true });
    const [githubMarkSrc, setGithubMarkSrc] = useState(githubMark);

    useEffect(() => {
        setGithubMarkSrc(colorScheme === 'light' ? githubMark : githubMarkWhite);
    }, [colorScheme]);

    return (
        <>
            <Image src={githubMarkSrc} alt={'Github Mark'} aria-label="Github Icon" height={height} width={width} style={style} priority={true}></Image>
        </>
    )
}
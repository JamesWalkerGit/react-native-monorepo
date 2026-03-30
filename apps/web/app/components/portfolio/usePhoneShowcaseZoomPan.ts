import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

type PanPoint = {
    x: number;
    y: number;
};

type DragState = {
    pointerId: number | null;
    startX: number;
    startY: number;
    startPanX: number;
    startPanY: number;
    didDrag: boolean;
};

export const usePhoneShowcaseZoomPan = (isCoarsePointerInput: boolean, baseImageStyle: CSSProperties) => {
    const [isPhoneZoomed, setIsPhoneZoomed] = useState(false);
    const [isPhoneDragging, setIsPhoneDragging] = useState(false);
    const [phonePan, setPhonePan] = useState<PanPoint>({ x: 0, y: 0 });
    const phoneShowcaseRef = useRef<HTMLButtonElement | null>(null);
    const phoneDragStateRef = useRef<DragState>({
        pointerId: null,
        startX: 0,
        startY: 0,
        startPanX: 0,
        startPanY: 0,
        didDrag: false,
    });
    const phoneZoomScale = isCoarsePointerInput ? 1.24 : 1.42;

    const getClampedPhonePan = (nextX: number, nextY: number): PanPoint => {
        if (!isPhoneZoomed || !phoneShowcaseRef.current) {
            return { x: 0, y: 0 };
        }

        const showcaseRect = phoneShowcaseRef.current.getBoundingClientRect();
        const maxPanX = Math.max((showcaseRect.width * (phoneZoomScale - 1)) / 2, 0);
        const maxPanY = Math.max((showcaseRect.height * (phoneZoomScale - 1)) / 2, 0);

        return {
            x: Math.min(maxPanX, Math.max(-maxPanX, nextX)),
            y: Math.min(maxPanY, Math.max(-maxPanY, nextY)),
        };
    };

    const resetPhoneDragState = () => {
        phoneDragStateRef.current.pointerId = null;
        phoneDragStateRef.current.didDrag = false;
        setIsPhoneDragging(false);
    };

    const handlePhoneShowcaseClick = () => {
        if (phoneDragStateRef.current.didDrag) {
            phoneDragStateRef.current.didDrag = false;
            return;
        }

        setIsPhoneZoomed((current) => {
            const nextZoomState = !current;

            if (!nextZoomState) {
                setPhonePan({ x: 0, y: 0 });
                resetPhoneDragState();
            }

            return nextZoomState;
        });
    };

    const handlePhonePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
        if (!isPhoneZoomed) {
            return;
        }

        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        phoneDragStateRef.current.pointerId = event.pointerId;
        phoneDragStateRef.current.startX = event.clientX;
        phoneDragStateRef.current.startY = event.clientY;
        phoneDragStateRef.current.startPanX = phonePan.x;
        phoneDragStateRef.current.startPanY = phonePan.y;
        phoneDragStateRef.current.didDrag = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        setIsPhoneDragging(true);
    };

    const handlePhonePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
        if (!isPhoneZoomed || phoneDragStateRef.current.pointerId !== event.pointerId) {
            return;
        }

        const deltaX = event.clientX - phoneDragStateRef.current.startX;
        const deltaY = event.clientY - phoneDragStateRef.current.startY;

        if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
            phoneDragStateRef.current.didDrag = true;
        }

        const clampedPan = getClampedPhonePan(
            phoneDragStateRef.current.startPanX + deltaX,
            phoneDragStateRef.current.startPanY + deltaY,
        );

        setPhonePan(clampedPan);
    };

    const handlePhonePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
        if (phoneDragStateRef.current.pointerId !== event.pointerId) {
            return;
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        phoneDragStateRef.current.pointerId = null;
        setIsPhoneDragging(false);
    };

    useEffect(() => {
        if (!isPhoneZoomed) {
            return;
        }

        const clampPanOnResize = () => {
            setPhonePan((current) => getClampedPhonePan(current.x, current.y));
        };

        window.addEventListener("resize", clampPanOnResize);

        return () => {
            window.removeEventListener("resize", clampPanOnResize);
        };
    }, [isPhoneZoomed, phoneZoomScale]);

    const phoneShowcaseImageStyle: CSSProperties = {
        ...baseImageStyle,
        transform: `translate3d(${phonePan.x}px, ${phonePan.y}px, 0) scale(${isPhoneZoomed ? phoneZoomScale : 1})`,
        transition: isPhoneDragging ? "none" : undefined,
    };

    return {
        isPhoneZoomed,
        isPhoneDragging,
        phoneShowcaseRef,
        phoneShowcaseImageStyle,
        handlePhoneShowcaseClick,
        handlePhonePointerDown,
        handlePhonePointerMove,
        handlePhonePointerEnd,
    };
};

import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "./utils/testUtils";
import Portfolio from "@/app/components/portfolio/Portfolio";

describe("Portfolio", () => {
    it("shows portfolio title, architecture highlight, and one showcase image", async () => {
        render(<Portfolio />);

        expect(await screen.findByText("How I Deliver Scalable Solutions")).toBeInTheDocument();

        expect(screen.getByText("Cross-Platform Integration")).toBeInTheDocument();

        expect(screen.getByLabelText("Portfolio showcase image")).toBeInTheDocument();

        expect(
            screen.getByText(
                "All trademarks, logos, and brand names are the property of their respective owners and do not imply any official affiliation or endorsement."
            )
        ).toBeInTheDocument();
    });

    it("shows app overlay on hover and hides when hover ends", () => {
        render(<Portfolio />);

        const fordTrigger = screen.getByTestId("The Ford App-overlay-trigger");
        const fordOverlay = screen.getByTestId("The Ford App-overlay");

        expect(fordOverlay).toHaveAttribute("data-visible", "false");

        fireEvent.mouseEnter(fordTrigger);
        expect(fordOverlay).toHaveAttribute("data-visible", "true");

        fireEvent.mouseLeave(fordTrigger);
        expect(fordOverlay).toHaveAttribute("data-visible", "false");
    });

    it("toggles app overlay on tap/click", () => {
        render(<Portfolio />);

        const canopyTrigger = screen.getByTestId("Canopy Security-overlay-trigger");
        const canopyOverlay = screen.getByTestId("Canopy Security-overlay");

        expect(canopyOverlay).toHaveAttribute("data-visible", "false");

        fireEvent.click(canopyTrigger);
        expect(canopyOverlay).toHaveAttribute("data-visible", "true");

        fireEvent.click(canopyTrigger);
        expect(canopyOverlay).toHaveAttribute("data-visible", "false");
    });

    it("closes active overlay when clicking outside the app cards", () => {
        render(<Portfolio />);

        const fordTrigger = screen.getByTestId("The Ford App-overlay-trigger");
        const fordOverlay = screen.getByTestId("The Ford App-overlay");
        const canopyTrigger = screen.getByTestId("Canopy Security-overlay-trigger");
        const canopyOverlay = screen.getByTestId("Canopy Security-overlay");

        fireEvent.click(fordTrigger);
        fireEvent.click(canopyTrigger);

        expect(fordOverlay).toHaveAttribute("data-visible", "true");
        expect(canopyOverlay).toHaveAttribute("data-visible", "true");

        fireEvent.mouseDown(document.body);

        expect(fordOverlay).toHaveAttribute("data-visible", "false");
        expect(canopyOverlay).toHaveAttribute("data-visible", "false");
    });

    it("keeps both overlays visible when each image is tapped", () => {
        render(<Portfolio />);

        const fordTrigger = screen.getByTestId("The Ford App-overlay-trigger");
        const fordOverlay = screen.getByTestId("The Ford App-overlay");
        const canopyTrigger = screen.getByTestId("Canopy Security-overlay-trigger");
        const canopyOverlay = screen.getByTestId("Canopy Security-overlay");

        fireEvent.click(fordTrigger);
        fireEvent.click(canopyTrigger);

        expect(fordOverlay).toHaveAttribute("data-visible", "true");
        expect(canopyOverlay).toHaveAttribute("data-visible", "true");
    });
});

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "./utils/testUtils";
import Portfolio from "@/app/components/portfolio/Portfolio";

describe("Portfolio", () => {
    it("shows portfolio title, architecture highlight, and one showcase image", async () => {
        render(<Portfolio />);

        expect(await screen.findByText("How I Deliver Scalable Solutions")).toBeInTheDocument();

        expect(screen.getByText("Cross-Platform Integration")).toBeInTheDocument();

        expect(screen.getByLabelText("Portfolio showcase image")).toBeInTheDocument();
    });
});

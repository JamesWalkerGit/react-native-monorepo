import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "./utils/testUtils";
import ResumePage from "@/app/resume/page";

describe("Resume page", () => {
    it("shows James Walker heading and quick links", async () => {
        render(<ResumePage />);

        expect(await screen.findByRole("heading", { name: "James Walker" })).toBeInTheDocument();

        const linkedInLink = screen.getByRole("link", { name: "Open LinkedIn profile" });
        expect(linkedInLink).toBeInTheDocument();
        expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/jameswalkerlinkedin");

        const jprojectsLink = screen.getByRole("link", { name: "Open jprojects.dev" });
        expect(jprojectsLink).toBeInTheDocument();
        expect(jprojectsLink).toHaveAttribute("href", "https://jprojects.dev");
    });
});

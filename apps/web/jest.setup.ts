// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import 'jest-canvas-mock';
import { authenticatedSessionMock } from "./tests/mocks/auth/consts";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

jest.mock("next-auth/react", () => ({
    useSession() {
        return authenticatedSessionMock;
    }
}));
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import 'jest-canvas-mock';
import { authenticatedSessionMock } from "./tests/mocks/auth/consts";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    },
    usePathname() {
        return {
        }
    }
}));

jest.mock("next-auth/react", () => ({
    useSession() {
        return authenticatedSessionMock;
    },
    signIn() {
        return jest.fn();
    }
}));

jest.mock("@lottiefiles/dotlottie-react", () => { })

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
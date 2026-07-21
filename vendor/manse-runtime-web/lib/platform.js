export function createBrowserPlatform() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("Manse runtime-web requires a browser environment or an injected RuntimePlatform.");
    }
    return {
        document,
        location: window.location,
        now: () => performance.now(),
        requestAnimationFrame: (callback) => window.requestAnimationFrame(callback),
        cancelAnimationFrame: (handle) => window.cancelAnimationFrame(handle),
        setTimeout: (callback, delayMs) => window.setTimeout(callback, delayMs),
        clearTimeout: (handle) => window.clearTimeout(handle),
        fetch: (input, init) => window.fetch(input, init),
        getUserMedia: async (constraints) => {
            if (!window.isSecureContext && window.location.hostname !== "localhost") {
                throw new Error("Camera play requires HTTPS or localhost.");
            }
            if (navigator.mediaDevices?.getUserMedia === undefined) {
                throw new Error("This browser does not expose camera access. Use the simulator instead.");
            }
            return navigator.mediaDevices.getUserMedia(constraints);
        },
    };
}
//# sourceMappingURL=platform.js.map
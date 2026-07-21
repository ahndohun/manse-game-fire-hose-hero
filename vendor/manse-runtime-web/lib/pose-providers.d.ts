import type { PoseFrameListener, PoseInputSource, PoseProviderMetrics, ProviderFactory, ProviderFactoryOptions, RuntimePoseFrame, RuntimePoseProvider } from "./types.js";
export declare const POSE_LANDMARK_NAMES: readonly ["nose", "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner", "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left", "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow", "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index", "right_index", "left_thumb", "right_thumb", "left_hip", "right_hip", "left_knee", "right_knee", "left_ankle", "right_ankle", "left_heel", "right_heel", "left_foot_index", "right_foot_index"];
interface ProviderTiming {
    now(): number;
    setTimeout(callback: () => void, delayMs: number): number;
    clearTimeout(handle: number): void;
}
declare abstract class ScheduledPoseProvider implements RuntimePoseProvider {
    abstract readonly id: string;
    abstract readonly kind: "mediapipe" | "simulated" | "replay";
    protected stateValue: RuntimePoseProvider["state"];
    protected latestFrame: RuntimePoseFrame | null;
    protected readonly listeners: Set<PoseFrameListener>;
    protected readonly targetHz: number;
    protected readonly timing: ProviderTiming;
    protected timer: number | null;
    protected framesProduced: number;
    protected inferenceErrors: number;
    protected inferenceDurationTotal: number;
    protected startedAtMs: number;
    constructor(targetHz: number, timing: ProviderTiming);
    abstract initialize(): Promise<void>;
    abstract start(source?: PoseInputSource): Promise<void>;
    get state(): RuntimePoseProvider["state"];
    subscribe(listener: PoseFrameListener): () => void;
    getLatestFrame(): RuntimePoseFrame | null;
    getMetrics(): PoseProviderMetrics;
    pause(): void;
    resume(): void;
    stop(): Promise<void>;
    destroy(): Promise<void>;
    protected emit(frame: RuntimePoseFrame): void;
    protected schedule(delayMs?: number): void;
    protected abstract tick(): Promise<void>;
    protected cancelTimer(): void;
    protected assertAlive(): void;
}
export declare class MediaPipePoseProvider extends ScheduledPoseProvider {
    readonly id = "mediapipe";
    readonly kind: "mediapipe";
    private readonly options;
    private landmarker;
    private source;
    private sequence;
    private initializing;
    constructor(options: ProviderFactoryOptions);
    initialize(): Promise<void>;
    start(source?: PoseInputSource): Promise<void>;
    stop(): Promise<void>;
    destroy(): Promise<void>;
    protected tick(): Promise<void>;
    private initializeLandmarker;
}
export declare class SimulatedPoseProvider extends ScheduledPoseProvider {
    readonly id = "simulated";
    readonly kind: "simulated";
    private sequence;
    private pose;
    constructor(options: ProviderFactoryOptions);
    initialize(): Promise<void>;
    start(): Promise<void>;
    setPointer(x: number, y: number, side?: "left" | "right"): void;
    protected tick(): Promise<void>;
}
export declare class ReplayPoseProvider extends ScheduledPoseProvider {
    readonly id = "replay";
    readonly kind: "replay";
    private readonly frames;
    private cursor;
    constructor(options: ProviderFactoryOptions);
    initialize(): Promise<void>;
    start(): Promise<void>;
    protected tick(): Promise<void>;
}
export declare const createDefaultPoseProvider: ProviderFactory;
export declare function isPointerControllable(provider: RuntimePoseProvider): provider is RuntimePoseProvider & {
    setPointer(x: number, y: number, side?: "left" | "right"): void;
};
export {};
//# sourceMappingURL=pose-providers.d.ts.map
export interface DoctorCheck {
    readonly id: string;
    readonly message: string;
    readonly ok: boolean;
}
export declare function runDoctor(cwd: string): Promise<DoctorCheck[]>;
//# sourceMappingURL=doctor.d.ts.map
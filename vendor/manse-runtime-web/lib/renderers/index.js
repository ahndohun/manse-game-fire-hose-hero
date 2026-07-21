import { TIER_PROFILES } from "../config.js";
/** Distinct skeleton colors per multiplayer lane, matching lane colorIndex. */
const PLAYER_COLORS = ["#8ee7ff", "#ffd166", "#80ed99", "#ff9ecb"];
const SKELETON_CONNECTIONS = [
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
    [11, 23], [12, 24], [23, 24], [23, 25], [25, 27],
    [24, 26], [26, 28], [27, 29], [29, 31], [28, 30], [30, 32],
];
export const createDefaultRenderer = (options) => {
    try {
        return new WebGlCanvasRenderer(options);
    }
    catch {
        try {
            return new Canvas2dRenderer(options);
        }
        catch {
            return new DomRenderer(options);
        }
    }
};
class BaseRenderer {
    element;
    options;
    constructor(options) {
        this.options = options;
        this.element = options.document.createElement("div");
        this.element.dataset.manseRenderer = "";
        this.element.setAttribute("role", "img");
        this.element.setAttribute("aria-label", "Motion game camera and play field");
        setStyles(this.element, {
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "240px",
            overflow: "hidden",
            background: "#10162b",
            borderRadius: "24px",
            touchAction: "none",
        });
    }
    mount() {
        this.options.container.append(this.element);
    }
    destroy() {
        this.element.remove();
    }
}
class WebGlCanvasRenderer extends BaseRenderer {
    kind = "webgl2";
    cameraCanvas;
    overlayCanvas;
    gl;
    overlay;
    program;
    texture;
    mirrorUniform;
    constructor(options) {
        super(options);
        this.cameraCanvas = options.document.createElement("canvas");
        this.overlayCanvas = options.document.createElement("canvas");
        setCanvasStyles(this.cameraCanvas);
        setCanvasStyles(this.overlayCanvas);
        this.element.append(this.cameraCanvas, this.overlayCanvas);
        const gl = this.cameraCanvas.getContext("webgl2", {
            alpha: false,
            antialias: options.tier === "S" || options.tier === "A",
            depth: false,
            stencil: false,
            powerPreference: options.tier === "C" ? "low-power" : "high-performance",
        });
        const overlay = this.overlayCanvas.getContext("2d", { alpha: true });
        if (gl === null || overlay === null)
            throw new Error("Canvas acceleration is unavailable.");
        this.gl = gl;
        this.overlay = overlay;
        this.program = createVideoProgram(gl);
        const texture = gl.createTexture();
        if (texture === null) {
            gl.deleteProgram(this.program);
            throw new Error("Unable to allocate the camera texture.");
        }
        this.texture = texture;
        this.mirrorUniform = gl.getUniformLocation(this.program, "uMirror");
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.mount();
    }
    render(frame) {
        resizeCanvases(this.element, [this.cameraCanvas, this.overlayCanvas], frame.tier);
        const { gl } = this;
        gl.viewport(0, 0, this.cameraCanvas.width, this.cameraCanvas.height);
        gl.clearColor(0.045, 0.067, 0.14, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (frame.video !== null && frame.video.readyState >= 2) {
            gl.useProgram(this.program);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            try {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame.video);
                gl.uniform1f(this.mirrorUniform, frame.mirror ? 1 : 0);
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            }
            catch {
                // A not-yet-ready video frame is expected during camera warm-up.
            }
        }
        drawOverlay(this.overlay, this.overlayCanvas, frame);
    }
    destroy() {
        this.gl.deleteTexture(this.texture);
        this.gl.deleteProgram(this.program);
        super.destroy();
    }
}
class Canvas2dRenderer extends BaseRenderer {
    kind = "canvas2d";
    canvas;
    context;
    constructor(options) {
        super(options);
        this.canvas = options.document.createElement("canvas");
        setCanvasStyles(this.canvas);
        this.element.append(this.canvas);
        const context = this.canvas.getContext("2d", { alpha: false });
        if (context === null)
            throw new Error("Canvas 2D is unavailable.");
        this.context = context;
        this.mount();
    }
    render(frame) {
        resizeCanvases(this.element, [this.canvas], frame.tier);
        const { context, canvas } = this;
        context.save();
        context.fillStyle = "#10162b";
        context.fillRect(0, 0, canvas.width, canvas.height);
        if (frame.video !== null && frame.video.readyState >= 2) {
            if (frame.mirror) {
                context.translate(canvas.width, 0);
                context.scale(-1, 1);
            }
            context.drawImage(frame.video, 0, 0, canvas.width, canvas.height);
        }
        context.restore();
        drawOverlay(context, canvas, frame);
    }
}
class DomRenderer extends BaseRenderer {
    kind = "dom";
    overlay;
    mountedVideo = null;
    caption;
    constructor(options) {
        super(options);
        this.overlay = options.document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.overlay.setAttribute("viewBox", "0 0 1000 1000");
        this.overlay.setAttribute("aria-hidden", "true");
        setStyles(this.overlay, { position: "absolute", inset: "0", width: "100%", height: "100%" });
        this.caption = options.document.createElement("div");
        setStyles(this.caption, {
            position: "absolute",
            left: "8%",
            right: "8%",
            bottom: "5%",
            padding: "10px 14px",
            color: "white",
            background: "rgba(0,0,0,.72)",
            borderRadius: "12px",
            textAlign: "center",
            font: "600 18px/1.35 system-ui, sans-serif",
        });
        this.element.append(this.overlay, this.caption);
        this.mount();
    }
    render(frame) {
        if (frame.video !== null && this.mountedVideo !== frame.video) {
            this.mountedVideo?.remove();
            this.mountedVideo = frame.video;
            setStyles(frame.video, {
                position: "absolute",
                inset: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: frame.mirror ? "scaleX(-1)" : "none",
            });
            this.element.prepend(frame.video);
        }
        this.overlay.replaceChildren();
        const landmarks = bestLandmarks(frame);
        for (const [startIndex, endIndex] of SKELETON_CONNECTIONS) {
            const start = landmarks[startIndex];
            const end = landmarks[endIndex];
            if (!visible(start) || !visible(end))
                continue;
            const line = this.options.document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", String(start.x * 1000));
            line.setAttribute("y1", String(start.y * 1000));
            line.setAttribute("x2", String(end.x * 1000));
            line.setAttribute("y2", String(end.y * 1000));
            line.setAttribute("stroke", "#8ee7ff");
            line.setAttribute("stroke-width", "8");
            this.overlay.append(line);
        }
        const guide = frame.challenge ?? null;
        if (guide !== null) {
            for (const zone of guide.zones) {
                const rect = this.options.document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", String(zone.box.x0 * 1000));
                rect.setAttribute("y", String(zone.box.y0 * 1000));
                rect.setAttribute("width", String((zone.box.x1 - zone.box.x0) * 1000));
                rect.setAttribute("height", String((zone.box.y1 - zone.box.y0) * 1000));
                rect.setAttribute("rx", "20");
                rect.setAttribute("fill", zone.state === "done" ? "rgba(128,237,153,.2)" : "rgba(142,231,255,.14)");
                rect.setAttribute("stroke", zone.state === "danger" ? "#ff6b6b" : "#8ee7ff");
                rect.setAttribute("stroke-width", "6");
                this.overlay.append(rect);
            }
            const progress = this.options.document.createElementNS("http://www.w3.org/2000/svg", "text");
            progress.setAttribute("x", "960");
            progress.setAttribute("y", "80");
            progress.setAttribute("text-anchor", "end");
            progress.setAttribute("font-size", "56");
            progress.setAttribute("font-family", "system-ui, sans-serif");
            progress.setAttribute("fill", "white");
            progress.textContent = `${guide.completedUnits}/${guide.totalUnits}`;
            this.overlay.append(progress);
        }
        for (const target of frame.targets)
            this.appendDomTarget(target);
        if (frame.celebrationProgress > 0) {
            const badge = this.options.document.createElementNS("http://www.w3.org/2000/svg", "text");
            badge.setAttribute("x", "500");
            badge.setAttribute("y", "500");
            badge.setAttribute("text-anchor", "middle");
            badge.setAttribute("font-size", "100");
            badge.textContent = "★";
            this.overlay.append(badge);
        }
        this.caption.textContent = frame.caption ?? "";
        this.caption.hidden = frame.caption === null;
    }
    appendDomTarget(target) {
        const circle = this.options.document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", String(target.x * 1000));
        circle.setAttribute("cy", String(target.y * 1000));
        circle.setAttribute("r", String(target.radius * 1000));
        circle.setAttribute("fill", rgbaCss(target.color, target.hit ? 0.25 : 0.85));
        circle.setAttribute("stroke", "white");
        circle.setAttribute("stroke-width", String(6 + target.dwellProgress * 14));
        this.overlay.append(circle);
    }
}
function createVideoProgram(gl) {
    const vertexSource = `#version 300 es
    precision mediump float;
    const vec2 positions[4] = vec2[4](vec2(-1.,-1.),vec2(1.,-1.),vec2(-1.,1.),vec2(1.,1.));
    out vec2 uv;
    void main(){ vec2 p=positions[gl_VertexID]; gl_Position=vec4(p,0.,1.); uv=vec2((p.x+1.)*.5,1.-(p.y+1.)*.5); }
  `;
    const fragmentSource = `#version 300 es
    precision mediump float;
    uniform sampler2D camera;
    uniform float uMirror;
    in vec2 uv;
    out vec4 outColor;
    void main(){ vec2 p=uv; if(uMirror>.5) p.x=1.-p.x; outColor=texture(camera,p); }
  `;
    const program = gl.createProgram();
    if (program === null)
        throw new Error("Unable to create WebGL program.");
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(program) ?? "unknown WebGL link error";
        gl.deleteProgram(program);
        throw new Error(message);
    }
    return program;
}
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (shader === null)
        throw new Error("Unable to allocate WebGL shader.");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader) ?? "unknown WebGL compile error";
        gl.deleteShader(shader);
        throw new Error(message);
    }
    return shader;
}
function drawOverlay(context, canvas, frame) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineCap = "round";
    context.lineJoin = "round";
    const players = frame.players ?? [];
    if (players.length > 0) {
        for (const player of players) {
            drawSkeleton(context, canvas, player.landmarks, PLAYER_COLORS[player.colorIndex] ?? "#8ee7ff");
        }
    }
    else {
        drawSkeleton(context, canvas, bestLandmarks(frame), "#8ee7ff");
    }
    const guide = frame.challenge ?? null;
    if (guide !== null) {
        drawZones(context, canvas, guide);
        drawSilhouette(context, canvas, guide, frame.reducedStimulation);
        drawJointFeedback(context, canvas, guide);
    }
    for (const target of frame.targets)
        drawTarget(context, canvas, target, frame.timestampMs, frame.reducedStimulation);
    if (guide !== null) {
        drawProgressRing(context, canvas, guide);
        drawRepetitionCounter(context, canvas, guide);
        drawArrow(context, canvas, guide, frame.timestampMs, frame.reducedStimulation);
        drawStepLabel(context, canvas, guide);
        drawFramingHint(context, canvas, guide);
    }
    if (players.length > 1)
        drawPlayerChips(context, canvas, players);
    if (frame.celebrationProgress > 0)
        drawCelebration(context, canvas, frame);
    if (frame.caption !== null)
        drawCaption(context, canvas, frame.caption);
}
function drawSkeleton(context, canvas, landmarks, color) {
    context.strokeStyle = color;
    context.globalAlpha = 0.86;
    context.lineWidth = Math.max(3, canvas.width * 0.006);
    for (const [startIndex, endIndex] of SKELETON_CONNECTIONS) {
        const start = landmarks[startIndex];
        const end = landmarks[endIndex];
        if (!visible(start) || !visible(end))
            continue;
        context.beginPath();
        context.moveTo(start.x * canvas.width, start.y * canvas.height);
        context.lineTo(end.x * canvas.width, end.y * canvas.height);
        context.stroke();
    }
    context.globalAlpha = 1;
}
function drawZones(context, canvas, guide) {
    for (const zone of guide.zones) {
        const x = zone.box.x0 * canvas.width;
        const y = zone.box.y0 * canvas.height;
        const width = (zone.box.x1 - zone.box.x0) * canvas.width;
        const height = (zone.box.y1 - zone.box.y0) * canvas.height;
        const palette = zone.state === "done"
            ? { fill: "rgba(128, 237, 153, .18)", stroke: "rgba(128, 237, 153, .9)" }
            : zone.state === "danger"
                ? { fill: "rgba(255, 107, 107, .24)", stroke: "rgba(255, 107, 107, .95)" }
                : zone.state === "active"
                    ? zone.mode === "avoid"
                        ? { fill: "rgba(255, 107, 107, .12)", stroke: "rgba(255, 154, 154, .8)" }
                        : { fill: "rgba(142, 231, 255, .16)", stroke: "rgba(142, 231, 255, .9)" }
                    : { fill: "rgba(255, 255, 255, .05)", stroke: "rgba(255, 255, 255, .3)" };
        context.fillStyle = palette.fill;
        context.strokeStyle = palette.stroke;
        context.lineWidth = Math.max(2, canvas.width * 0.004);
        roundedRect(context, x, y, width, height, Math.min(24, width * 0.1));
        context.fill();
        context.stroke();
        if (zone.state === "active" && guide.holdProgress > 0) {
            context.fillStyle = zone.mode === "avoid" ? "rgba(128, 237, 153, .5)" : "rgba(142, 231, 255, .5)";
            const barHeight = Math.max(4, canvas.height * 0.012);
            context.fillRect(x, y + height - barHeight, width * Math.min(1, guide.holdProgress), barHeight);
        }
    }
}
function drawSilhouette(context, canvas, guide, reduced) {
    if (guide.silhouette.length === 0)
        return;
    context.strokeStyle = reduced ? "rgba(255,255,255,.4)" : "rgba(255, 243, 163, .55)";
    context.lineWidth = Math.max(4, canvas.width * 0.009);
    context.setLineDash([canvas.width * 0.014, canvas.width * 0.012]);
    for (const segment of guide.silhouette) {
        context.beginPath();
        context.moveTo(segment.x0 * canvas.width, segment.y0 * canvas.height);
        context.lineTo(segment.x1 * canvas.width, segment.y1 * canvas.height);
        context.stroke();
    }
    context.setLineDash([]);
}
function drawJointFeedback(context, canvas, guide) {
    for (const feedback of guide.jointFeedback) {
        if (feedback.x === null || feedback.y === null)
            continue;
        context.beginPath();
        context.arc(feedback.x * canvas.width, feedback.y * canvas.height, Math.max(5, canvas.width * 0.011), 0, Math.PI * 2);
        context.fillStyle = feedback.ok ? "rgba(128, 237, 153, .9)" : "rgba(255, 209, 102, .9)";
        context.fill();
        context.strokeStyle = "rgba(0,0,0,.4)";
        context.lineWidth = 2;
        context.stroke();
    }
}
function drawProgressRing(context, canvas, guide) {
    const radius = Math.max(18, Math.min(canvas.width, canvas.height) * 0.045);
    const x = canvas.width - radius - canvas.width * 0.03;
    const y = radius + canvas.height * 0.045;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.strokeStyle = "rgba(255,255,255,.25)";
    context.lineWidth = Math.max(4, radius * 0.22);
    context.stroke();
    if (guide.progress > 0) {
        context.beginPath();
        context.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, guide.progress));
        context.strokeStyle = guide.phase === "done" ? "#80ed99" : "#8ee7ff";
        context.stroke();
    }
    if (guide.holdProgress > 0 && guide.phase === "holding") {
        context.beginPath();
        context.arc(x, y, radius * 0.62, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, guide.holdProgress));
        context.strokeStyle = "#fff3a3";
        context.lineWidth = Math.max(3, radius * 0.16);
        context.stroke();
    }
    context.fillStyle = "white";
    context.font = `700 ${Math.round(radius * 0.62)}px system-ui, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${guide.completedUnits}/${guide.totalUnits}`, x, y);
}
function drawRepetitionCounter(context, canvas, guide) {
    if (guide.repetitionCount === null)
        return;
    const fontSize = Math.max(40, canvas.height * 0.16);
    context.font = `800 ${fontSize}px system-ui, sans-serif`;
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = "rgba(255,255,255,.92)";
    context.strokeStyle = "rgba(0,0,0,.45)";
    context.lineWidth = fontSize * 0.06;
    const x = canvas.width * 0.04;
    const y = canvas.height * 0.18;
    context.strokeText(String(guide.repetitionCount), x, y);
    context.fillText(String(guide.repetitionCount), x, y);
}
function drawArrow(context, canvas, guide, timestampMs, reduced) {
    if (guide.arrow === null || guide.phase === "done")
        return;
    const size = Math.max(24, Math.min(canvas.width, canvas.height) * 0.07);
    const bounce = reduced ? 0 : Math.sin(timestampMs / 240) * size * 0.16;
    let x = canvas.width / 2;
    let y = canvas.height * 0.2;
    let angle = 0;
    switch (guide.arrow) {
        case "up":
            angle = -Math.PI / 2;
            y = canvas.height * 0.16 + bounce;
            break;
        case "down":
            angle = Math.PI / 2;
            y = canvas.height * 0.24 + bounce;
            break;
        case "left":
            angle = Math.PI;
            x = canvas.width * 0.2 + bounce;
            break;
        case "right":
            angle = 0;
            x = canvas.width * 0.8 + bounce;
            break;
    }
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.beginPath();
    context.moveTo(size * 0.7, 0);
    context.lineTo(-size * 0.4, -size * 0.55);
    context.lineTo(-size * 0.4, size * 0.55);
    context.closePath();
    context.fillStyle = "rgba(255, 243, 163, .9)";
    context.fill();
    context.strokeStyle = "rgba(0,0,0,.35)";
    context.lineWidth = Math.max(2, size * 0.08);
    context.stroke();
    context.restore();
}
function drawStepLabel(context, canvas, guide) {
    if (guide.stepLabel === null)
        return;
    const fontSize = Math.max(14, Math.min(26, canvas.width * 0.024));
    context.font = `700 ${fontSize}px system-ui, sans-serif`;
    context.textAlign = "left";
    context.textBaseline = "middle";
    const text = guide.stepLabel;
    const width = context.measureText(text).width + fontSize * 1.4;
    const height = fontSize * 1.9;
    const x = canvas.width * 0.03;
    const y = canvas.height * 0.045;
    context.fillStyle = "rgba(0,0,0,.6)";
    roundedRect(context, x, y, width, height, height / 2);
    context.fill();
    context.fillStyle = "white";
    context.fillText(text, x + fontSize * 0.7, y + height / 2);
}
function drawFramingHint(context, canvas, guide) {
    if (guide.framing === null)
        return;
    const text = guide.framing === "closer" ? "Step closer to the camera" : "Step back a little";
    const fontSize = Math.max(14, Math.min(24, canvas.width * 0.022));
    context.font = `600 ${fontSize}px system-ui, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    const width = context.measureText(text).width + fontSize * 2;
    const height = fontSize * 2;
    const x = (canvas.width - width) / 2;
    const y = canvas.height * 0.08;
    context.fillStyle = "rgba(255, 209, 102, .92)";
    roundedRect(context, x, y, width, height, height / 2);
    context.fill();
    context.fillStyle = "#221a00";
    context.fillText(text, canvas.width / 2, y + height / 2);
}
function drawPlayerChips(context, canvas, players) {
    const fontSize = Math.max(13, Math.min(22, canvas.width * 0.02));
    const chipHeight = fontSize * 1.9;
    let y = canvas.height - chipHeight * players.length - canvas.height * 0.12;
    for (const player of players) {
        const label = `P${player.playerId + 1}  ${player.guide?.completedUnits ?? 0}/${player.guide?.totalUnits ?? 0}`;
        context.font = `700 ${fontSize}px system-ui, sans-serif`;
        context.textAlign = "left";
        context.textBaseline = "middle";
        const width = context.measureText(label).width + fontSize * 2.4;
        const x = canvas.width * 0.03;
        context.fillStyle = "rgba(0,0,0,.55)";
        roundedRect(context, x, y, width, chipHeight, chipHeight / 2);
        context.fill();
        context.beginPath();
        context.arc(x + fontSize, y + chipHeight / 2, fontSize * 0.5, 0, Math.PI * 2);
        context.fillStyle = PLAYER_COLORS[player.colorIndex] ?? "#8ee7ff";
        context.fill();
        context.fillStyle = "white";
        context.fillText(label, x + fontSize * 1.8, y + chipHeight / 2);
        y += chipHeight + 6;
    }
}
function drawTarget(context, canvas, target, timestampMs, reduced) {
    const radius = target.radius * Math.min(canvas.width, canvas.height)
        * (reduced ? 1 : 1 + Math.sin(timestampMs / 260) * 0.035);
    const x = target.x * canvas.width;
    const y = target.y * canvas.height;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = rgbaCss(target.color, target.hit ? 0.25 : 0.86);
    context.fill();
    context.strokeStyle = "rgba(255,255,255,.95)";
    context.lineWidth = Math.max(3, radius * 0.12);
    context.stroke();
    if (!target.hit && target.dwellProgress > 0) {
        context.beginPath();
        context.arc(x, y, radius * 1.14, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * target.dwellProgress);
        context.strokeStyle = "#fff3a3";
        context.lineWidth = Math.max(5, radius * 0.16);
        context.stroke();
    }
}
function drawCelebration(context, canvas, frame) {
    const profile = TIER_PROFILES[frame.tier];
    const count = frame.reducedStimulation ? Math.min(6, profile.particleCount) : profile.particleCount;
    for (let index = 0; index < count; index += 1) {
        const angle = index * 2.399963 + frame.celebrationProgress * 0.4;
        const distance = frame.celebrationProgress * Math.min(canvas.width, canvas.height) * (0.12 + (index % 7) * 0.035);
        const x = canvas.width / 2 + Math.cos(angle) * distance;
        const y = canvas.height / 2 + Math.sin(angle) * distance;
        context.fillStyle = ["#ff6b6b", "#4cc9f0", "#ffd166", "#80ed99"][index % 4] ?? "white";
        context.beginPath();
        context.arc(x, y, Math.max(3, canvas.width * 0.007), 0, Math.PI * 2);
        context.fill();
    }
}
function drawCaption(context, canvas, caption) {
    const fontSize = Math.max(16, Math.min(32, canvas.width * 0.035));
    context.font = `600 ${fontSize}px system-ui, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    const width = Math.min(canvas.width * 0.84, context.measureText(caption).width + fontSize * 2);
    const height = fontSize * 2.1;
    const x = (canvas.width - width) / 2;
    const y = canvas.height - height - canvas.height * 0.04;
    context.fillStyle = "rgba(0,0,0,.72)";
    roundedRect(context, x, y, width, height, fontSize * 0.45);
    context.fill();
    context.fillStyle = "white";
    context.fillText(caption, canvas.width / 2, y + height / 2, width - fontSize);
}
function roundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.roundRect(x, y, width, height, radius);
}
function bestLandmarks(frame) {
    let best;
    for (const candidate of frame.poseFrame?.poses ?? []) {
        if (best === undefined || candidate.score > best.score)
            best = candidate;
    }
    return best?.landmarks ?? [];
}
function visible(landmark) {
    return landmark !== undefined && Math.min(landmark.visibility, landmark.presence) >= 0.35;
}
function resizeCanvases(element, canvases, tier) {
    const width = Math.max(1, element.clientWidth || 640);
    const height = Math.max(1, element.clientHeight || 480);
    const browserDpr = typeof devicePixelRatio === "number" ? devicePixelRatio : 1;
    const ratio = Math.min(browserDpr, TIER_PROFILES[tier].maxDevicePixelRatio);
    const pixelWidth = Math.max(1, Math.round(width * ratio));
    const pixelHeight = Math.max(1, Math.round(height * ratio));
    for (const canvas of canvases) {
        if (canvas.width !== pixelWidth)
            canvas.width = pixelWidth;
        if (canvas.height !== pixelHeight)
            canvas.height = pixelHeight;
    }
}
function setCanvasStyles(canvas) {
    setStyles(canvas, { position: "absolute", inset: "0", width: "100%", height: "100%" });
}
function setStyles(element, styles) {
    Object.assign(element.style, styles);
}
function rgbaCss(color, alpha = color[3]) {
    return `rgba(${Math.round(color[0] * 255)},${Math.round(color[1] * 255)},${Math.round(color[2] * 255)},${alpha})`;
}
//# sourceMappingURL=index.js.map
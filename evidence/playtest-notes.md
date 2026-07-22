# Fire Hose Hero release playtest

Automated production-build playtests were completed at 1280×900 and 390×844. Both runs started through the keyboard-focusable pointer control, waited through the intentional arming window, extinguished all 12 fires across the 3/4/5-fire alarm progression, reached the explicit all-clear state, and restarted at 0/12.

The run also verified the exposed narration caption, reduced-motion preference, horizontal overflow, and absence of console, page, and request errors. A deliberately invalid challenge fixture is rejected by the content validator. The camera and pointer modes use the same mission evaluator and renderer; camera frames stay on-device.

The captured gameplay frame shows an active hose impact, live fires, correct 28-second wave countdown, pressure feedback, score, and mission tally. The completion frame shows the final 12/12 all-clear resolution.

The shared Manse platform shell was then verified against the production build at 1440×1000 and 320×812. The desktop bar measured 68 pixels high and the mobile bar measured 64 pixels high. Both rendered as one unwrapped row. At 320 pixels, the document and body scroll widths both matched the viewport at 320 pixels, and both start actions remained fully inside the game stage. The Manse wordmark and Browse games action both resolved to `https://manse-showcase.ran584000.chatgpt.site`. The resulting full-page captures are `platform-shell-desktop.png` and `platform-shell-mobile.png`.

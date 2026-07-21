# Third-party runtime assets

Manse bundles the official MediaPipe Pose Landmarker lite and full task bundles so camera play does not depend on a runtime CDN. The files and their exact source URLs and SHA-256 digests are recorded in `asset-provenance.json`.

MediaPipe is Copyright The MediaPipe Authors and is distributed under the Apache License 2.0. The model downloads are the official bundles linked from the Google MediaPipe Pose Landmarker documentation.

The JavaScript package and WebAssembly files copied at build time come from the pinned `@mediapipe/tasks-vision` npm dependency and retain the same Apache-2.0 license.

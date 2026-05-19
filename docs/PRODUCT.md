# VioraXR Product Context

## Product
VioraXR is a medical XR visualization platform for reviewing clinical imaging studies with a modern, clear, and spatial interface. The current product is a working legacy React DICOM viewer with role-based demo portals for doctors and patients.

## Users
- Specialist doctors and radiologists reviewing patient studies.
- Medical students and educators learning anatomy and imaging workflows.
- Healthcare institutions evaluating advanced visualization tools.
- Patients checking available studies and opening the clinical viewer in a guided demo flow.

## Product Goals
- Make medical imaging feel clear, serious, and technically advanced.
- Preserve the stable DICOM viewer while improving the surrounding product experience.
- Help doctors reach patient studies and the viewer quickly.
- Help patients understand study status and access the viewer without confusion.
- Support future 2D, 3D, VR, and AR visualization without pretending those flows are complete today.

## Current Constraints
- The active app is the root Create React App project in `/Users/guruu/Documents/GitHub/vioraxr`.
- The app uses React 16, `react-scripts`, Material UI v4, Redux, Cornerstone, and DICOM-related libraries.
- Do not migrate frameworks, add backend features, or rewrite the viewer architecture.
- Do not change DICOM rendering, MPR, measurements, file loading, Redux store, actions, reducers, or geometry/image processing.
- Buttons and navigation must represent real existing actions. Do not add fake links such as Favorites, Profile, Documents, Activity, Settings, Appointments, or Health unless a real route/action exists.

## Brand Voice
Clinical, precise, calm, and technologically advanced. Copy should be short and direct. Avoid hype, generic startup language, and decorative medical claims that the product does not currently support.

## Success Criteria
- VioraXR no longer looks like a generic React demo.
- Doctors can identify patient studies and open the viewer immediately.
- Patients can identify their studies and open the viewer immediately.
- The viewer shell feels branded without risking the working DICOM viewport.
- The UI uses VioraXR assets and colors consistently.

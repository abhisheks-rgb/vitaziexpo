# 🧭 Navigation Architecture Guide

## Overview

This project follows a **Root Stack → App Stack → Tab Navigator → Feature Stack** architecture.

The goal is to:

- Keep navigation scalable
- Maintain type safety
- Avoid duplicate screen registration
- Control Bottom Tab Bar visibility consistently
- Support future feature expansion without refactoring

---

# Navigation Hierarchy

```text
RootStack
│
├── Splash
├── Onboarding
├── AuthStack
│   ├── Login
│   ├── Register
│   ├── QRScanner
│   ├── ConnectClinic
│   └── CompleteForm
│
├── GeneralHealthQuestions
│
└── AppStack
    │
    ├── Tabs
    │   │
    │   ├── Home
    │   │
    │   ├── VisitsStack
    │   │   ├── ClinicList
    │   │   └── ClinicVisits
    │   │
    │   ├── EducationStack
    │   │   └── EducationScreen
    │   │
    │   ├── AIAssistant
    │   └── More
    │
    ├── MaterialDetails
    ├── Appointments
    ├── ChatHistory
    ├── NotificationDetail
    └── ReportDetails
```

---

# Screen Placement Rules

## Rule 1 — Screens That Hide Bottom Tab Bar

Register these screens in **AppStack**.

These screens should appear above the tab navigator.

### Examples

- MaterialDetails
- AppointmentDetails
- ReportDetails
- NotificationDetail
- ChatHistory
- AI Conversation Details
- Education Quiz Details

### Example

```tsx
<AppStack.Screen name="MaterialDetails" component={MaterialDetailsScreen} />
```

### Result

✅ Bottom tab bar hidden

✅ Native push animation

✅ Native back gesture support

✅ Cleaner navigation history

---

## Rule 2 — Screens That Keep Bottom Tab Bar Visible

Register these screens inside their feature stack.

### Examples

Education Module

```text
EducationStack
└── EducationScreen
```

Visits Module

```text
VisitsStack
├── ClinicList
└── ClinicVisits
```

### Result

✅ Tab bar remains visible

✅ User stays within feature flow

---

## Rule 3 — Never Register a Screen Twice

❌ Incorrect

```tsx
<EducationStack.Screen
  name="MaterialDetails"
  component={MaterialDetailsScreen}
/>

<AppStack.Screen
  name="MaterialDetails"
  component={MaterialDetailsScreen}
/>
```

This can cause:

- Duplicate routes
- Navigation confusion
- Incorrect back behavior
- Inconsistent tab visibility

---

✅ Correct

```tsx
<AppStack.Screen name="MaterialDetails" component={MaterialDetailsScreen} />
```

Only register it once.

---

# Param List Structure

Each navigator should own its own route definitions.

## AppStackParamList

```ts
export type AppStackParamList = {
  Tabs: undefined;

  MaterialDetails: {
    material: EducationMaterial;
  };

  Appointments: undefined;
  ChatHistory: undefined;
};
```

---

## EducationStackParamList

```ts
export type EducationStackParamList = {
  EducationScreen: undefined;
};
```

---

## VisitsStackParamList

```ts
export type VisitsStackParamList = {
  ClinicList: undefined;

  ClinicVisits: {
    clinicId: string;
  };
};
```

---

# Navigation Between Stacks

Sometimes a screen inside a feature stack needs to navigate to a screen in AppStack.

Example:

```text
EducationScreen
      ↓
MaterialDetails
```

Since MaterialDetails belongs to AppStack:

```ts
navigation.getParent()?.navigate('MaterialDetails', {
  material,
});
```

Or if properly typed:

```ts
navigation.navigate('MaterialDetails', {
  material,
});
```

---

# Future Feature Checklist

When adding a new screen, ask:

## Question 1

Should the Bottom Tab Bar remain visible?

### YES

Place it inside the feature stack.

Example:

```text
EducationStack
└── EducationQuizScreen
```

---

### NO

Place it inside AppStack.

Example:

```text
AppStack
└── EducationQuizDetails
```

---

## Question 2

Does it belong to an existing feature?

### YES

Add it to that feature's stack param list.

Example:

```ts
EducationStackParamList;
```

---

### NO

Add it to AppStackParamList.

---

# Recommended Folder Structure

```text
navigation/
├── AppNavigator.tsx
├── RootNavigator.tsx
└── types.ts

features/
├── education/
│   ├── screens/
│   ├── components/
│   └── navigation/
│
├── visits/
│   ├── screens/
│   ├── components/
│   └── navigation/
│
└── ai_assistant/
```

---

# Golden Rule

> If a screen should cover the entire application and hide the Bottom Tab Bar, register it in AppStack.
>
> If the screen belongs to a tab flow and the Bottom Tab Bar should remain visible, register it inside that feature's stack.

Following this rule keeps navigation predictable, scalable, and easy to maintain.

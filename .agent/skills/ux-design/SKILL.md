---
name: UX Design
description: Helper for reviewing and improving UI/UX implementations
---

# UX Design Skill

This skill helps review and improve the design and user experience of frontend components.

## 1. Review Dimensions

### Visual Design

| Aspect             | What to Check                                     |
| ------------------ | ------------------------------------------------- |
| **Consistency**    | Colors, spacing, typography match design system?  |
| **Hierarchy**      | Clear visual priority? Primary actions stand out? |
| **Whitespace**     | Breathing room? Not cramped or sparse?            |
| **Contrast**       | Text readable? WCAG AA compliant?                 |
| **Responsiveness** | Works on mobile, tablet, desktop?                 |

### Interaction Design

| Aspect            | What to Check                                  |
| ----------------- | ---------------------------------------------- |
| **Feedback**      | Loading states? Success/error messages?        |
| **Affordance**    | Buttons look clickable? Links distinguishable? |
| **Transitions**   | Smooth animations? Not jarring?                |
| **Touch Targets** | Large enough for mobile (min 44px)?            |

### User Flow

| Aspect               | What to Check                                                        |
| -------------------- | -------------------------------------------------------------------- |
| **Clarity**          | Is the purpose immediately obvious?                                  |
| **Friction**         | Unnecessary steps? Confusing paths?                                  |
| **Error Prevention** | Validation before submission? Confirmations for destructive actions? |
| **Empty States**     | What shows when there's no data?                                     |

## 2. Improvement Patterns

### Loading States

```vue
<!-- ❌ Before: No feedback -->
<div v-if="data">{{ data }}</div>

<!-- ✅ After: Clear loading state -->
<div v-if="loading" class="animate-pulse">Loading...</div>
<div v-else-if="error" class="text-red-500">{{ error }}</div>
<div v-else-if="data">{{ data }}</div>
<div v-else class="text-gray-400">No data available</div>
```

### Micro-interactions

```css
/* Subtle hover feedback */
.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Empty States

```vue
<!-- Make empty states helpful, not just empty -->
<div v-if="!favorites.length" class="py-12 text-center">
  <Icon name="heart" class="text-4xl text-gray-300" />
  <p class="mt-4 text-gray-500">No favorites yet</p>
  <Button variant="secondary" @click="explore">
    Explore Motorcycles
  </Button>
</div>
```

### Skeleton Loaders

```vue
<!-- Better than spinners for content-heavy areas -->
<div v-if="loading" class="space-y-4">
  <div class="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
  <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
</div>
```

## 3. Audit Checklist

Use this when reviewing a component:

- [ ] **First Impression**: Does it look polished at first glance?
- [ ] **States**: Loading, empty, error, success all handled?
- [ ] **Responsive**: Checked on mobile viewport?
- [ ] **Accessibility**: Keyboard navigable? Proper ARIA?
- [ ] **Consistency**: Matches rest of the app visually?
- [ ] **Micro-interactions**: Hover/focus states defined?
- [ ] **Copy**: Is text clear and helpful?

## 4. Quick Wins

High-impact, low-effort improvements:

1. Add hover states to interactive elements
2. Add loading skeletons instead of spinners
3. Improve empty state messaging
4. Add subtle transitions (200-300ms)
5. Increase contrast for better readability

---

## 5. Wow Factor ✨

Techniques for making designs look **premium and impressive**.

### Glassmorphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Gradient Accents

```css
/* Vibrant gradient for CTAs */
.gradient-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
}

/* Subtle gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Smooth Entrance Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out;
}

/* Stagger children */
.card:nth-child(1) {
  animation-delay: 0.1s;
}
.card:nth-child(2) {
  animation-delay: 0.2s;
}
.card:nth-child(3) {
  animation-delay: 0.3s;
}
```

### Glow Effects

```css
/* Glowing border on focus */
.input:focus {
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  border-color: #667eea;
}

/* Glowing icon */
.icon-glow {
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.6));
}
```

### Premium Typography

```css
/* Large, bold headlines */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Subtle label styling */
.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.6);
}
```

### Depth & Shadows

```css
/* Layered shadow for depth */
.elevated-card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 16px 32px rgba(0, 0, 0, 0.1);
}

/* Colored shadow matching element */
.colored-shadow {
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}
```

### Interactive Delight

```css
/* Playful button press */
.btn:active {
  transform: scale(0.98);
}

/* Icon rotation on hover */
.icon-rotate:hover {
  transform: rotate(15deg);
}

/* Heartbeat animation */
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.favorite-icon.active {
  animation: heartbeat 0.5s ease-in-out;
  color: #ef4444;
}
```

### Wow Factor Checklist

- [ ] Hero section with large typography + gradient?
- [ ] Cards have depth (multi-layer shadows)?
- [ ] Interactive elements have satisfying feedback?
- [ ] Entrance animations for content?
- [ ] Accent colors are vibrant, not muted?
- [ ] Dark mode looks premium (not just inverted)?

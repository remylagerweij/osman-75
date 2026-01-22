---
description: Add micro-interactions and animations for delight
---

# Add Animations Workflow

This workflow uses **UX Design Skill** sections: Interaction Design + Wow Factor.

> [!TIP]
> Use `view_file` to read `.agent/skills/ux-design/SKILL.md` sections 1 (Interaction Design) and 5 (Wow Factor).

---

## Steps

1.  **Identify Opportunities**
    - What elements feel static or lifeless?
    - Where would motion add meaning?

2.  **Animation Types**
    | Type | Use Case |
    |------|----------|
    | Entrance | Content appearing (fade-in-up) |
    | Feedback | User action response (button press) |
    | State Change | Toggling, expanding, collapsing |
    | Delight | Playful touches (icon bounce, heartbeat) |

3.  **Apply Animations**
    - Use patterns from UX Design Skill section 5.
    - Keep durations short (200-500ms).
    - Use ease-out for entrances, ease-in-out for state changes.

4.  **Verify**
    - Animations feel smooth, not janky?
    - Not overused (less is more)?
    - Works in reduced motion mode?

---

## Quick Patterns

```css
/* Entrance */
animation: fadeInUp 0.5s ease-out;

/* Hover lift */
transition: transform 0.2s;
&:hover {
  transform: translateY(-2px);
}

/* Press feedback */
&:active {
  transform: scale(0.98);
}

/* Heartbeat on favorite */
animation: heartbeat 0.5s ease-in-out;
```

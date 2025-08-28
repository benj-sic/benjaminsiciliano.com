# 🚨 DEVELOPMENT GUIDE - READ FIRST!

## **Before Making ANY Changes:**

📖 **[STYLING_ARCHITECTURE.md](./STYLING_ARCHITECTURE.md)** - **COMPLETE MODIFICATION GUIDE**

## **Quick Reference - Which Files to Edit:**

| What to Change | Edit These Files | Don't Touch These |
|----------------|------------------|-------------------|
| **Main page styling** | `src/App.css` | `NetworkOnly.css` |
| **Main page functionality** | `src/App.js` | `NetworkOnly.js` |
| **NetworkOnly page styling** | `NetworkOnly.css` | `src/App.css` |
| **NetworkOnly page functionality** | `NetworkOnly.js` | `src/App.js` |
| **Both pages** | `NetworkVisualization.*` | Main page files |
| **Global elements** | `ThemeToggle.*` | Page-specific files |

## **Why This Matters:**

- **Main page (`/`)** and **NetworkOnly page (`/network`)** have **completely separate styling systems**
- **CSS conflicts can break functionality** on either page
- **Always scope NetworkOnly styles** with `.network-only` prefix
- **Test both pages** after any modification

## **Common Scenarios:**

### **"I want to change the share popup on the main page"**
✅ **DO:** Edit `src/App.css` and `src/App.js`
❌ **DON'T:** Touch `NetworkOnly.css` or `NetworkOnly.js`

### **"I want to change the share popup on the network page"**
✅ **DO:** Edit `NetworkOnly.css` and `NetworkOnly.js`
❌ **DON'T:** Touch `src/App.css` or `src/App.js`

### **"I want to change how the network visualization works"**
✅ **DO:** Edit `NetworkVisualization.css` and `NetworkVisualization.js`
⚠️ **WARNING:** This affects BOTH pages - test thoroughly

## **🚨 CRITICAL RULES:**

1. **NEVER use bare class names** in NetworkOnly - always scope with `.network-only`
2. **Test both routes** after any modification
3. **When in doubt, read the full [STYLING_ARCHITECTURE.md](./STYLING_ARCHITECTURE.md)**

---

**This project has two separate styling systems that must remain isolated. When in doubt, scope NetworkOnly styles with `.network-only` and test both pages!**

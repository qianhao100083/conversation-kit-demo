# Test Screenshots

This directory contains screenshots from the automated browser testing of Conversation Kit Demo.

## Basic Functionality Tests

### 01-initial-state.png
Initial page load showing the welcome screen with empty conversation state.

### 02-streaming-in-progress.png
Message streaming in progress - showing the typewriter effect of AI response.

### 03-message-complete.png
Complete message with full Markdown rendering including headings, lists, bold, italic, and code.

### 04-anchor-navigation.png
Anchor navigation working - sidebar shows message structure and clicking headings scrolls to position.

### 05-search-tab.png
Search tab interface displayed.

### 06-sidebar-left.png
Sidebar positioned on the left side after clicking the position toggle button.

## Multi-turn Conversation Tests

### 07-multi-turn-round1.png
First round of conversation: User asks about Vue3 Composition API.

### 08-multi-turn-round2.png
Second round: User asks about React Hooks comparison. Sidebar now shows Message 1 and Message 3.

### 09-multi-turn-round3.png
Third round: User asks about frontend framework trends. Sidebar shows complete tree with Message 1, 3, 5.

### 10-search-vue3.png
Search tab with "Vue3" entered. Shows search UI (search functionality is placeholder).

### 11-navigate-to-round3.png
Clicking on third message's "# Processing" heading navigates to that message location.

### 12-tree-expanded.png
Tree node expanded showing child headings: #1 Processing, #2 Steps, #2 Result.

## Test Summary

### Basic Features
- ✅ Page load
- ✅ Message sending
- ✅ Streaming output
- ✅ Markdown rendering
- ✅ Heading detection
- ✅ Anchor navigation
- ✅ Tab switching
- ✅ Sidebar position toggle
- ✅ Input interactions

### Multi-turn & Navigation Features
- ✅ Multi-turn conversation (3 rounds)
- ✅ Tree view shows all conversation turns
- ✅ Cross-message anchor navigation
- ✅ Tree expand/collapse functionality
- ✅ Hierarchical heading display

### Known Limitations
- ⚠️ Search functionality is UI only (placeholder)

# Test Screenshots / 测试截图

This directory contains screenshots from the automated browser testing of Conversation Kit Demo.
/ 本目录包含 Conversation Kit Demo 的自动化浏览器测试截图。

## Basic Functionality Tests / 基础功能测试

### 01-initial-state.png
Initial page load showing the welcome screen with empty conversation state.
/ 初始页面加载，显示空对话状态的欢迎界面。

### 02-streaming-in-progress.png
Message streaming in progress - showing the typewriter effect of AI response.
/ 消息流式输出中 - 显示 AI 回复的打字机效果。

### 03-message-complete.png
Complete message with full Markdown rendering including headings, lists, bold, italic, and code.
/ 完整消息，包含标题、列表、粗体、斜体和代码的完整 Markdown 渲染。

### 04-anchor-navigation.png
Anchor navigation working - sidebar shows message structure and clicking headings scrolls to position.
/ 锚点导航工作正常 - 侧边栏显示消息结构，点击标题滚动到对应位置。

### 05-search-tab.png
Search tab interface displayed.
/ 搜索标签页界面显示。

### 06-sidebar-left.png
Sidebar positioned on the left side after clicking the position toggle button.
/ 点击位置切换按钮后，侧边栏显示在左侧。

## Multi-turn Conversation Tests / 多轮对话测试

### 07-multi-turn-round1.png
First round of conversation: User asks about Vue3 Composition API.
/ 第一轮对话：用户询问 Vue3 组合式 API。

### 08-multi-turn-round2.png
Second round: User asks about React Hooks comparison. Sidebar now shows Message 1 and Message 3.
/ 第二轮：用户询问 React Hooks 对比。侧边栏现在显示 Message 1 和 Message 3。

### 09-multi-turn-round3.png
Third round: User asks about frontend framework trends. Sidebar shows complete tree with Message 1, 3, 5.
/ 第三轮：用户询问前端框架趋势。侧边栏显示完整的树形结构，包含 Message 1、3、5。

### 10-search-vue3.png
Search tab with "Vue3" entered. Shows search UI (search functionality is placeholder).
/ 搜索标签页输入 "Vue3"。显示搜索 UI（搜索功能为占位符）。

### 11-navigate-to-round3.png
Clicking on third message's "# Processing" heading navigates to that message location.
/ 点击第三轮消息的 "# Processing" 标题导航到该消息位置。

### 12-tree-expanded.png
Tree node expanded showing child headings: #1 Processing, #2 Steps, #2 Result.
/ 树节点展开显示子标题：#1 Processing、#2 Steps、#2 Result。

## Detailed Feature Tests / 详细功能测试

### 13-search-no-results.png
Search for "Processing" returns no results. Search functionality has issues.
/ 搜索 "Processing" 返回无结果。搜索功能存在问题。

### 14-search-chinese.png
Search for Chinese text "响应式" also returns no results.
/ 搜索中文文本 "响应式" 同样返回无结果。

### 15-tree-expanded-subheadings.png
Tree expanded showing detailed subheadings with level indicators.
/ 树展开显示详细的子标题，带级别指示器。

### 16-subheading-selected-no-scroll.png
Subheading "#2 Steps" selected but page does not scroll to that position.
/ 子标题 "#2 Steps" 被选中，但页面未滚动到该位置。

## Test Summary / 测试总结

### Basic Features / 基础功能
- ✅ Page load / 页面加载
- ✅ Message sending / 消息发送
- ✅ Streaming output / 流式输出
- ✅ Markdown rendering / Markdown 渲染
- ✅ Heading detection / 标题检测
- ✅ Anchor navigation / 锚点导航
- ✅ Tab switching / 标签切换
- ✅ Sidebar position toggle / 侧边栏位置切换
- ✅ Input interactions / 输入交互

### Multi-turn & Navigation Features / 多轮对话与导航功能
- ✅ Multi-turn conversation (3 rounds) / 多轮对话（3轮）
- ✅ Tree view shows all conversation turns / 树视图显示所有对话轮次
- ✅ Cross-message anchor navigation / 跨消息锚点导航
- ✅ Tree expand/collapse functionality / 树展开/折叠功能
- ✅ Hierarchical heading display / 层级标题显示

### Known Limitations / 已知限制
- ⚠️ Search functionality is UI only (placeholder) / 搜索功能仅 UI 实现（占位符）
- ⚠️ Search does not return results / 搜索不返回结果
- ⚠️ Subheading navigation does not scroll / 子标题导航不滚动

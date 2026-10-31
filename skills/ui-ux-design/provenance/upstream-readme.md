# ui-ux-design — AI Design Agent Skill

> 将资深产品设计师的经验炼成即装即用的 Agent Skill
> Distilling senior product designer craft into an install-and-run Agent Skill

[中文](#中文) · [English](#english)

---

## 中文

### 这是什么？

**ui-ux-design** 是一个即装即用的 AI 设计 Agent Skill，源自 [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign) 项目。它将资深产品设计师的经验——排版、色彩、布局、交互深度、反模板化指南——提炼为一组结构化的提示词文件和设计参考模块，可安装到任何支持 Skill 机制的 Agent 平台上。

**一句话：** 在聊天窗口输入设计需求 → 大模型读取此 Skill 的系统提示词 → 生成完整的 UI/UX 文件套件 → 打包为 ZIP → 保存到你指定的目录。

---

### 完整能力矩阵

#### 1. 8 种设计工件类型

每种工件类型有明确的区块数下限和结构性要求：

| 工件类型 | 最少区块 | 结构要求 |
|----------|----------|----------|
| **落地页** (landing) | 5 | Hero·价值主张(3+)·社交证明·功能深挖·CTA |
| **案例研究** (case_study) | 6 | Hero(含客户名+成果)·前后对比·挑战·方案·引述·CTA |
| **仪表盘** (dashboard) | 5 | 顶栏·KPI 卡片带(4+)·主图表·辅表格·动态面板 |
| **定价页** (pricing) | 4 | 标题·三级阶梯·FAQ·CTA |
| **幻灯片** (slide) | 1 | 一页矩形，一个想法，3+ 字级 |
| **邮件** (email) | 5 | 预览文本·标题·正文·CTA·页脚 |
| **单页简报** (one_pager) | 6 | Hero·3 个支撑区块·证据·CTA |
| **报告** (report) | 7 | 封面·摘要·3 个发现·方法论·结论 |

#### 2. 12 个设计参考模块

`design-skills/` 目录下的 JSX 模块提供了可复用的设计起点：

| 模块 | 适用场景 | 导出组件 |
|------|----------|----------|
| `slide-deck.jsx` | 融资路演、产品发布 | SlideTitle, SlideSection, SlideTwoCol, SlideStat |
| `dashboard.jsx` | 运维面板、数据分析、财务总览 | DashboardOpsDark, DashboardAnalyticsLight, DashboardFinanceLedger |
| `landing-page.jsx` | 营销网站、产品主页 | LandingEditorial, LandingProductTech, LandingMinimalStartup |
| `chart-svg.jsx` | 数据可视化 | LineChart, BarChart, DonutChart, Sparkline |
| `glassmorphism.jsx` | iOS 风格毛玻璃 UI | GlassCard, GlassNowPlaying, GlassSettings |
| `editorial-typography.jsx` | 杂志排版、文章长文 | EssayClassical, MagazineSpread, PoetryMinimal |
| `heroes.jsx` | 页面首屏 | HeroCenteredCTA, HeroSplitScreen, HeroMinimalTypography (5 种) |
| `pricing.jsx` | 定价方案展示 | Pricing3TierCards, PricingTableComparison, PricingFreemiumToggle (4 种) |
| `footers.jsx` | 网站页脚 | FooterMega, FooterMinimal, FooterLinkGrid, FooterBrandNewsletter |
| `chat-ui.jsx` | 聊天界面 | ChatBubble, ThinkingDots, StreamingBubble, ToolCallCard, ChatUI |
| `data-table.jsx` | 管理后台数据表 | DataTable（可排序、筛选、分页、多选） |
| `calendar.jsx` | 月视图日历 | Calendar（事件标注、前后导航、详情侧栏） |

#### 3. 10 层设计规则体系

Skill 的核心智能分布在 `prompts/` 目录的 10 个文件中：

```
prompts/
├── identity.v1.txt           # 身份定义："你是 ui-ux-design，一个自主的设计合作伙伴"
├── workflow.v1.txt           # 7 步工作流：理解→分类→探索→起草→实现→自检→交付
├── output-rules.v1.txt       # 文件结构约束、外部资源白名单、CSS 自定义属性规约
├── design-methodology.v1.txt # 三方向探索法：极简 / 大胆 / 企业中性
├── anti-slop.v1.txt          # 视觉品味防线：禁用字体、色彩规则、布局原则
├── artifact-types.v1.txt     # 8 种工件类型分类、触发词、密度底线
├── pre-flight.v1.txt         # 生成前 8 项静默检查清单
├── craft-directives.v1.txt   # 交互深度硬指标、微交互规格、14 种匠心细节
├── safety.v1.txt             # 安全边界：拒绝钓鱼/仇恨/色情内容
└── chart-rendering.v1.txt    # 图表渲染契约：选型策略、强制性元素、无障碍要求
```

#### 4. 反模板化（Anti-Slop）设计哲学

这是 ui-ux-design 最具区分度的能力——它明确告诉 AI **不该做什么**：

**排版防线**
- 拉黑字体：Inter、Roboto、Arial、Helvetica、Playfair Display
- 推荐替代：Fraunces、Syne、Geist、DM Serif Display、Instrument Serif、Space Grotesk
- 四级字号阶梯（强制）：display 48-96px → h1 28-40px → body 16-18px → caption 12-14px

**色彩防线**
- 强制使用 oklch 色彩空间（感知均匀，调色有逻辑）
- 禁止 Tailwind 默认蓝 `#3b82f6`
- 禁止纯黑文字（`#000`）
- 暗色主题硬指标：≥3 种表面色调 + 渐变/光晕 + ≥2 种强调色

**布局防线**
- 偏好不对称比例（7:5 分割优于 1:1）
- 区块高度必须变化（不能全是等高管状结构）
- 留白是设计元素，不是"没想好放什么"

**内容防线**
- 禁止 lorem ipsum、John Doe、Stock Photo
- 数字不能全是整百整千（`$10,000` → `$10,247`）
- 文案必须领域相关、有真实感

#### 5. 交互深度硬指标

ui-ux-design 对"交付物"的定义拒绝静态稿：

| 指标 | 最低要求 |
|------|----------|
| 功能性状态变化 | ≥3 个（标签切换、折叠面板、模态框等） |
| 动画视图切换 | ≥1 个（带命名的 CSS @keyframes） |
| 按钮响应 | 每个可点击元素必须有 hover + active/press 反馈 |
| 焦点状态 | 所有交互元素必须有 `:focus-visible` 样式 |
| 边界状态 | 空态、加载态、错误态至少覆盖一种 |

#### 6. 匠心细节（Craft Surplus）

从 14 种细节模式中**至少实现 3 种**：

徽章计数器 · 骨架屏 · 工具提示 · 键盘快捷键 · 内联编辑 · 一键复制 · 可关闭 Toast · 滚动联动效果 · 时间感知元素 · 分段控件 · 空状态插图 · 手风琴面板 · 视觉节奏中断 · 暗色/亮色主题切换

评判标准：**用户看到时能感受到"有人认真思考过这里"。**

#### 7. 图表渲染能力

当设计需求涉及数据可视化时，Skill 强制要求渲染**真实的 SVG/Canvas/React 图表**，而非占位文本：

- 渲染方式选择：≤30 个数据点优先手写 SVG，否则选 Chart.js 或 Recharts
- 图表类型匹配：趋势用折线、比较用柱状、2-4 部分用环形、相关性用散点、KPI 用迷你图
- 强制元素：≥6 个数据点、坐标轴标签、标题+副标题、图例
- 配色规则：分类色板、可访问对比度、悬停高亮

#### 8. 自检与交付机制

**生成前（pre-flight）**：8 项静默检查——工件类型、情感基调、密度目标、对比模式、核心数字、色板规划、字号阶梯、反模板把关。

**生成后（self-check）**：9 项验证——完整度、语义 HTML、CSS 变量定义、交互功能、无障碍、反模板、边界状态、文案真实性、文件完整性。

**交付格式**：ZIP 压缩包，内含标准化目录结构：

```
design-name/
├── index.html          # 主入口，自包含 HTML（≤1000 行）
├── styles/
│   └── main.css        # CSS 自定义属性、布局、动画
├── scripts/
│   └── main.js         # 交互行为（原生 JS 或 React CDN）
└── assets/             # 内联 SVG、Data URI（无外部图片）
```

---

### 与 Claude Design 的对比

"Claude Design"指 Claude 模型原生的设计生成能力——即不加载任何外部 Skill 时，Claude 根据训练数据直接产出 HTML/CSS 界面。以下从 8 个维度对比：

| 维度 | Claude Design（原生） | ui-ux-design（加载 Skill 后） |
|------|----------------------|-------------------------------|
| **设计一致性** | 随对话上下文波动，同一需求两次生成结果风格差异大 | 10 层规则约束确保每次产出在统一的设计哲学下 |
| **字体选择** | 高频使用 Inter/Roboto 等"模板感"字体 | 主动避开泛滥字体，使用 Fraunces/Syne/Geist 等有辨识度的替代 |
| **色彩系统** | 倾向 Tailwind 默认色板，hex 调色 | 强制 oklch 色彩空间，感知均匀，禁止默认蓝 |
| **文案质量** | 常见 lorem ipsum / "John Doe" / 整数数据 | 领域相关真实感文案，非整数数据，具体人名 |
| **交互深度** | 多为静态 HTML 稿，偶有基础 hover | 硬性要求 ≥3 状态切换 + 动画 + 边界状态 + 匠心细节 |
| **输出结构** | 代码块粘贴，需手动保存 | 标准化 ZIP 打包，目录结构规范，即下即用 |
| **平台兼容** | 仅限 Claude 系列模型 | 平台无关——任何支持 Skill 机制的 Agent 平台均可加载 |
| **可定制性** | 每次对话需重新描述偏好 | 一次性修改 prompt 文件，所有后续对话自动继承 |
| **工艺水准** | "能用"级别 | "产品级交付"——带骨架屏、Toast、键盘快捷键等 |

**核心差异一句话：** Claude Design 是"一个懂设计的聪明人"，ui-ux-design 是"一个懂设计且手持详细规范手册、每次交付前必自查清单的资深设计师"。

---

### 平台安装便利性

ui-ux-design 作为 Agent Skill 的最大优势在于**一次编写，到处运行**。

#### 为什么安装如此简单？

1. **文件即 Skill**：整个 Skill 就是一组 Markdown 和文本文件，不需要编译、不需要依赖安装、不需要数据库。
2. **平台无关架构**：Skill 定义遵循开放 Schema（YAML frontmatter），不绑定任何特定平台的 API。
3. **渐进式加载**：平台可以选择加载全部 10 个 prompt 文件，也可以按需加载部分文件。最小可用集仅需 `identity.v1.txt` + `workflow.v1.txt` + `output-rules.v1.txt`。
4. **零运行时依赖**：Skill 只是注入到 LLM 系统提示词中的文本，不引入任何运行时开销。
5. **版本化管理**：prompt 文件使用 `.v1` 后缀，支持 Skill 平滑升级而不破坏已有配置。
6. **人类可读可编辑**：所有提示词文件是纯文本，设计师、产品经理可以直接修改规则，无需工程师介入。

#### Skill 机制 vs 传统方案的对比

| 对比维度 | 传统定制 Prompt | Markdown 规则文档 | Agent Skill |
|----------|----------------|-------------------|-------------|
| 复用性 | 每次手动粘贴 | 需人工查找引用 | 自动注入系统上下文 |
| 版本管理 | 散落各处 | 无版本概念 | `.v1` 后缀，可并存多版本 |
| 团队共享 | 靠口口相传 | 靠文档链接 | 安装即同步 |
| 更新生效 | 下次对话手动更新 | 需通知团队 | 更新文件即全局生效 |
| 组合能力 | 无法组合 | 需手动合并 | 多 Skill 可并行加载 |

---

### 主流平台安装指南

#### 1. Claude Code（Anthropic 官方）

Claude Code 通过 `CLAUDE.md` 或 `.claude/skills/` 目录支持 Skill 机制。

**安装步骤：**

```bash
# 步骤 1：克隆 Skill 仓库
git clone https://github.com/sapsapshen/ui-ux-design.git

# 步骤 2：将 Skill 安装到 Claude Code 的 skills 目录
mkdir -p ~/.claude/skills
cp -r open-codesign ~/.claude/skills/ui-ux-design

# 步骤 3：在项目根目录的 CLAUDE.md 中引用
echo '@skill ui-ux-design' >> CLAUDE.md

# 完成。下次启动 Claude Code 时，Skill 自动加载。
```

或者使用项目级安装（仅当前项目生效）：

```bash
mkdir -p .claude/skills
cp -r open-codesign .claude/skills/ui-ux-design
```

**验证安装：** 在 Claude Code 中输入"设计一个 SaaS 产品落地页"，观察生成的 HTML 是否符合 Anti-Slop 规则（字体不是 Inter、颜色不是 Tailwind 默认蓝、数字不是整数）。

#### 2. Cursor

Cursor 通过 `.cursorrules` 文件或 Rules 功能支持自定义系统提示词。

**安装步骤：**

```bash
# 步骤 1：克隆仓库
git clone https://github.com/sapsapshen/ui-ux-design.git

# 步骤 2：在 Cursor 中创建全局 Rules
# 打开 Cursor → Settings → Rules → User Rules
# 将 open-codesign/prompts/ 下所有 .txt 文件的内容粘贴进去
# 或者使用项目级 .cursorrules：

# 步骤 3（项目级安装）：
cp ui-ux-design/prompts/*.txt your-project/.cursorrules-includes/
```

**推荐做法：** 将 `SKILL.md` 的内容作为 Cursor 的自定义指令（Custom Instructions），在每次设计类对话中引用：

```
// .cursorrules
你是一个设计 Agent。当用户提出设计需求时，遵循以下规则：
- 参考 ui-ux-design 的 anti-slop 指南选择字体和颜色
- 使用 oklch 色彩空间
- 确保交互深度达标（≥3 状态切换）
- 生成完整的 HTML+CSS+JS 文件套件
```

#### 3. WorkBuddy

WorkBuddy 原生支持 Agent Skill 机制，安装最为简便。

**安装步骤：**

```bash
# 步骤 1：克隆到 WorkBuddy 技能目录
git clone https://github.com/sapsapshen/ui-ux-design.git \
  ~/.workbuddy/skills/ui-ux-design

# 步骤 2：重启 WorkBuddy，Skill 自动发现并加载
# 无需额外配置——WorkBuddy 会自动解析 SKILL.md 的 YAML frontmatter
```

**验证安装：** 在 WorkBuddy 中输入 `/ui-ux-design` 或直接描述设计需求，观察 Agent 是否按照 Skill 规则生成设计输出。

#### 4. Windsurf / Cascade

Windsurf 通过 `.windsurfrules` 文件支持自定义 Rules。

**安装步骤：**

```bash
# 步骤 1：克隆仓库
git clone https://github.com/sapsapshen/ui-ux-design.git

# 步骤 2：将 prompt 文件内容合并到 .windsurfrules
cat ui-ux-design/prompts/*.txt > .windsurfrules
```

#### 5. 任意支持 System Prompt 的平台

只要平台允许自定义系统提示词，就可以加载 ui-ux-design：

**通用安装模式：**

1. 将所有 `prompts/*.txt` 的内容拼接为一段系统提示词
2. 在对话开始前注入该提示词
3. （可选）将 `design-skills/*.jsx` 作为参考示例一起注入

**一行命令生成拼接版（适用于 OpenAI Playground、API 调用等）：**

```bash
# 生成完整的系统提示词
echo "You are ui-ux-design, an autonomous design partner." > system-prompt.txt
cat prompts/*.txt >> system-prompt.txt

# 然后复制 system-prompt.txt 的内容，粘贴到平台的 System Prompt 字段
```

#### 6. LangChain / 自定义 Agent 框架

```python
# 在 LangChain 中加载 Skill
import os
from pathlib import Path

def load_codesign_skill(skill_path: str) -> str:
    """加载 ui-ux-design Skill 的所有 prompt 文件"""
    prompts_dir = Path(skill_path) / "prompts"
    system_prompt_parts = []
    
    for prompt_file in sorted(prompts_dir.glob("*.txt")):
        with open(prompt_file) as f:
            system_prompt_parts.append(f.read())
    
    return "\n\n---\n\n".join(system_prompt_parts)

# 使用
skill_prompt = load_codesign_skill("./ui-ux-design")

from langchain.agents import create_openai_tools_agent
agent = create_openai_tools_agent(llm, tools, system_message=skill_prompt)
```

---

### 使用示例

#### 基础用法

```
用户：设计一个 AI 客服 SaaS 的落地页
Agent：[生成完整的 index.html + styles/main.css + scripts/main.js，打包为 ZIP]
```

#### 指定风格

```
用户：做一个暗色主题的运维监控仪表盘，偏企业中性风格
Agent：[生成 DashboardOpsDark 风格仪表盘，含 KPI 卡片、折线图、活动日志]
```

#### 迭代修改

```
用户：把 Hero 区的字体换成 Syne，CTA 按钮改成珊瑚色
Agent：[修改对应 CSS 变量，更新 ZIP]
```

#### 多语言

```
用户：Create a pricing page for my AI startup, bold style
Agent：[生成英文定价页，3 级阶梯，含 FAQ 折叠面板]
```

---

### 定制你的专属设计 Skill

ui-ux-design 是开放框架，你可以直接修改 prompt 文件来适配团队规范：

- 修改 `anti-slop.v1.txt` → 加入团队禁用的字体和色彩
- 修改 `artifact-types.v1.txt` → 添加新的工件类型（如：移动端原型、Banner 广告）
- 修改 `craft-directives.v1.txt` → 调整交互深度要求、增加匠心细节模式
- 添加 `design-skills/` → 放入团队自己的设计参考组件

**定制后的 Skill 可以直接内部分发，所有团队成员安装后即刻拥有相同的设计标准。**

---

### 许可证

MIT — 可自由 fork、分发、商用。

### 来源

改编自 [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign)

---

## English

### What is this?

**ui-ux-design** is an install-and-run AI Design Agent Skill, distilled from the [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign) project. It extracts senior product designer craft — typography, color, layout, interactive depth, anti-slop guidelines — into a set of structured prompt files and design reference modules, ready to install on any Agent platform that supports the Skill mechanism.

**In one sentence:** Type a design request in chat → LLM reads this skill's system prompts → generates a complete UI/UX file suite → bundles as ZIP → saves to your specified directory.

---

### Full Capability Matrix

#### 1. 8 Artifact Types

Each artifact type has a minimum section count and required structural beats:

| Type | Min Sections | Required Beats |
|------|-------------|----------------|
| **landing** | 5 | hero · value props (3+) · social proof · feature deep-dive · CTA |
| **case_study** | 6 | hero + customer name + result · before/after · challenge · solution · pull quote · CTA |
| **dashboard** | 5 | top bar · KPI strip (4+) · primary chart · secondary table · activity panel |
| **pricing** | 4 | headline · tier grid (3 tiers) · FAQ · CTA |
| **slide** | 1 | one rectangle, one idea, 3+ type sizes |
| **email** | 5 | preheader · headline · body · CTA · footer |
| **one_pager** | 6 | hero · 3 supporting blocks · evidence · CTA |
| **report** | 7 | cover · TL;DR · 3 findings · methodology · conclusion |

#### 2. 12 Design Reference Modules

The `design-skills/` directory contains JSX modules providing reusable design starting points:

| Module | Use Case | Exported Components |
|--------|----------|---------------------|
| `slide-deck.jsx` | Pitch decks, product launches | SlideTitle, SlideSection, SlideTwoCol, SlideStat |
| `dashboard.jsx` | Ops consoles, analytics, finance | DashboardOpsDark, DashboardAnalyticsLight, DashboardFinanceLedger |
| `landing-page.jsx` | Marketing sites, product pages | LandingEditorial, LandingProductTech, LandingMinimalStartup |
| `chart-svg.jsx` | Data visualization | LineChart, BarChart, DonutChart, Sparkline |
| `glassmorphism.jsx` | iOS-style frosted glass UI | GlassCard, GlassNowPlaying, GlassSettings |
| `editorial-typography.jsx` | Magazine layouts, long-form | EssayClassical, MagazineSpread, PoetryMinimal |
| `heroes.jsx` | Page hero sections | HeroCenteredCTA, HeroSplitScreen, HeroMinimalTypography (5 total) |
| `pricing.jsx` | Pricing plan display | Pricing3TierCards, PricingTableComparison, PricingFreemiumToggle (4 total) |
| `footers.jsx` | Site footers | FooterMega, FooterMinimal, FooterLinkGrid, FooterBrandNewsletter |
| `chat-ui.jsx` | Chat interfaces | ChatBubble, ThinkingDots, StreamingBubble, ToolCallCard, ChatUI |
| `data-table.jsx` | Admin data tables | DataTable (sortable, filterable, paginated, multi-select) |
| `calendar.jsx` | Month-view calendar | Calendar (events, navigation, detail sidebar) |

#### 3. 10-Layer Design Rules System

The skill's intelligence is distributed across 10 files in `prompts/`:

```
prompts/
├── identity.v1.txt           # Agent identity: "You are ui-ux-design, an autonomous design partner"
├── workflow.v1.txt           # 7-step workflow: Understand → Classify → Explore → Draft → Implement → Self-check → Deliver
├── output-rules.v1.txt       # File structural constraints, external resource whitelist, CSS custom property spec
├── design-methodology.v1.txt # Three-direction exploration: Minimal / Bold / Corporate Neutral
├── anti-slop.v1.txt          # Visual taste defense: forbidden fonts, color rules, layout principles
├── artifact-types.v1.txt     # 8 types taxonomy, trigger words, density floors
├── pre-flight.v1.txt         # 8-point silent checklist before generation
├── craft-directives.v1.txt   # Interactive depth hard requirements, micro-interaction spec, 14 craft surplus patterns
├── safety.v1.txt             # Safety boundaries: decline phishing/hate/NSFW
└── chart-rendering.v1.txt    # Chart rendering contract: type selection, mandatory elements, accessibility
```

#### 4. Anti-Slop Design Philosophy

This is ui-ux-design's most differentiating capability — it explicitly tells AI **what NOT to do**:

**Typography Defense**
- Forbidden fonts: Inter, Roboto, Arial, Helvetica, Playfair Display
- Preferred alternatives: Fraunces, Syne, Geist, DM Serif Display, Instrument Serif, Space Grotesk
- Four-step type ladder (mandatory): display 48-96px → h1 28-40px → body 16-18px → caption 12-14px

**Color Defense**
- Mandatory oklch color space (perceptually uniform, logical color adjustments)
- Forbidden: Tailwind default blue `#3b82f6`
- Forbidden: pure black text (`#000`)
- Dark theme hard requirements: ≥3 surface tones + gradient/glow + ≥2 accent colors

**Layout Defense**
- Prefer asymmetric ratios (7:5 splits over 1:1)
- Section heights must vary (no uniform tubular structure)
- Negative space is a design element, not "empty room"

**Content Defense**
- Forbidden: lorem ipsum, John Doe, stock photos
- Numbers must not be suspiciously round ($10,000 → $10,247)
- Copy must be domain-specific and feel authentic

#### 5. Interactive Depth Hard Requirements

ui-ux-design rejects static mockups as deliverables:

| Metric | Minimum Requirement |
|--------|---------------------|
| Functional state changes | ≥3 (tabs, accordions, modals, toggles) |
| Animated view transitions | ≥1 (named CSS @keyframes) |
| Button feedback | Every clickable must have hover + active/press states |
| Focus states | All interactive elements must have `:focus-visible` styles |
| Edge cases | At least one of: empty, loading, or error state |

#### 6. Craft Surplus

At least 3 of these 14 detail patterns must be implemented:

Badge counters · Skeleton screens · Tooltips · Keyboard shortcuts · Inline editing · Copy-to-clipboard · Dismissible toasts · Scroll-linked effects · Time-aware elements · Segmented controls · Empty-state illustrations · Accordions · Visual rhythm breaks · Dark/light theme toggle

**The bar:** "A user looking at it should feel that someone thought about this."

#### 7. Chart Rendering

When data visualization is needed, the skill mandates real SVG/Canvas/React charts — never placeholder text:

- Rendering strategy: ≤30 data points → hand-coded SVG; otherwise → Chart.js or Recharts
- Chart type matching: trends → line, comparisons → bars, 2-4 parts → donut, correlation → scatter, KPIs → sparklines
- Mandatory elements: ≥6 data points, axis labels, title + subtitle, legend
- Color rules: categorical palette, accessible contrast, hover highlights

#### 8. Self-Check & Delivery

**Pre-flight** (before generation): 8 silent checks — artifact type, emotional posture, density target, comparison patterns, featured numbers, palette plan, type ladder, anti-slop guard.

**Post-generation self-check**: 9 verification items — completeness, semantic HTML, CSS variables, interactivity, accessibility, anti-slop compliance, edge cases, copy authenticity, file integrity.

**Delivery format**: ZIP archive with standardized directory structure:

```
design-name/
├── index.html          # Main entry, self-contained HTML (≤1000 lines)
├── styles/
│   └── main.css        # CSS custom properties, layout, animations
├── scripts/
│   └── main.js         # Interactive behaviors (vanilla JS or React CDN)
└── assets/             # Inline SVGs, data URIs (no external images)
```

---

### Comparison with Claude Design

"Claude Design" refers to Claude's native design generation capability — the HTML/CSS artifacts Claude produces from its training data, without any external Skill loaded. Here's the comparison across 8 dimensions:

| Dimension | Claude Design (Native) | ui-ux-design (Skill Loaded) |
|-----------|----------------------|------------------------------|
| **Design Consistency** | Varies with conversation context; same prompt → different styles | 10-layer rule system ensures unified design philosophy every time |
| **Font Selection** | Frequently uses Inter/Roboto — the "template look" | Actively avoids overused fonts; chooses Fraunces/Syne/Geist for distinctiveness |
| **Color System** | Defaults to Tailwind palette, hex-based | Mandates oklch color space, bans default blue |
| **Copy Quality** | Common lorem ipsum / "John Doe" / round numbers | Domain-specific authentic copy, non-integer data, specific names |
| **Interactive Depth** | Mostly static HTML, occasional basic hover | Hard requirements: ≥3 state changes + animation + edge cases + craft surplus |
| **Output Structure** | Code blocks for copy-paste | Standardized ZIP bundle with directory structure — ready to use |
| **Platform Compatibility** | Claude models only | Platform-agnostic — any Agent platform with Skill support |
| **Customizability** | Must re-describe preferences each session | Edit prompt files once, all future conversations inherit |
| **Craft Level** | "Functional" tier | "Production" tier — skeleton screens, toasts, keyboard shortcuts included |

**The core difference in one line:** Claude Design is "a smart person who knows design." ui-ux-design is "a smart person who knows design, has the brand guidelines memorized, and runs a checklist before every delivery."

---

### Platform Installation Convenience

The greatest advantage of ui-ux-design as an Agent Skill: **write once, run anywhere.**

#### Why is installation so simple?

1. **Files ARE the Skill**: The entire skill is a set of Markdown and text files — no compilation, no dependency installation, no database.
2. **Platform-agnostic architecture**: Skill definition follows an open schema (YAML frontmatter), not bound to any platform-specific API.
3. **Progressive loading**: Platforms can load all 10 prompt files or just a minimal subset. The minimum viable set: `identity.v1.txt` + `workflow.v1.txt` + `output-rules.v1.txt`.
4. **Zero runtime dependencies**: The skill is just text injected into the LLM's system prompt — no runtime overhead introduced.
5. **Versioned management**: Prompt files use `.v1` suffix, enabling smooth skill upgrades without breaking existing configurations.
6. **Human-readable, human-editable**: All prompt files are plain text. Designers and PMs can modify rules directly without engineering support.

#### Skill vs. Traditional Approaches

| Dimension | Custom Prompts | Markdown Docs | Agent Skill |
|-----------|---------------|---------------|-------------|
| Reusability | Copy-paste each time | Manual lookup and reference | Auto-injected into system context |
| Versioning | Scattered everywhere | No version concept | `.v1` suffix, multiple versions can coexist |
| Team sharing | Word of mouth | Document links | Install → synced |
| Update propagation | Manually update next session | Must notify team | Edit file → globally effective |
| Composability | Cannot combine | Manual merging required | Multiple skills can load in parallel |

---

### Installation Guides for Mainstream Platforms

#### 1. Claude Code (Anthropic Official)

Claude Code supports Skills via `CLAUDE.md` or `.claude/skills/` directory.

**Installation:**

```bash
# Step 1: Clone the skill repository
git clone https://github.com/sapsapshen/ui-ux-design.git

# Step 2: Install to Claude Code's skills directory
mkdir -p ~/.claude/skills
cp -r ui-ux-design ~/.claude/skills/ui-ux-design

# Step 3: Reference in project CLAUDE.md
echo '@skill ui-ux-design' >> CLAUDE.md

# Done. Skill auto-loads on next Claude Code session.
```

Or project-level installation (current project only):

```bash
mkdir -p .claude/skills
cp -r ui-ux-design .claude/skills/ui-ux-design
```

**Verify:** In Claude Code, type "Design a SaaS product landing page" and check if the output follows Anti-Slop rules (fonts not Inter, colors not Tailwind blue, numbers not suspiciously round).

#### 2. Cursor

Cursor supports custom system prompts via `.cursorrules` or the Rules feature.

**Installation:**

```bash
# Step 1: Clone
git clone https://github.com/sapsapshen/ui-ux-design.git

# Step 2: Create global rules in Cursor
# Open Cursor → Settings → Rules → User Rules
# Paste contents of open-codesign/prompts/*.txt

# Or project-level:
cp ui-ux-design/prompts/*.txt your-project/.cursorrules-includes/
```

**Recommended:** Use `SKILL.md` content as Cursor's Custom Instructions:

```
// .cursorrules
You are a design agent. When handling design requests:
- Follow ui-ux-design anti-slop guidelines for fonts and colors
- Use oklch color space
- Ensure interactive depth requirements (≥3 state changes)
- Generate complete HTML+CSS+JS file suites
```

#### 3. WorkBuddy

WorkBuddy has native Agent Skill support — the simplest installation.

**Installation:**

```bash
# Step 1: Clone to WorkBuddy skills directory
git clone https://github.com/sapsapshen/ui-ux-design.git\
  ~/.workbuddy/skills/ui-ux-design

# Step 2: Restart WorkBuddy — Skill auto-discovered and loaded
# No additional configuration needed — WorkBuddy parses SKILL.md YAML frontmatter automatically
```

**Verify:** In WorkBuddy, type `/ui-ux-design` or describe a design request directly. Observe whether the Agent follows the Skill rules.

#### 4. Windsurf / Cascade

Windsurf supports custom Rules via `.windsurfrules`.

**Installation:**

```bash
# Step 1: Clone
git clone https://github.com/sapsapshen/ui-ux-design.git

# Step 2: Merge prompt files into .windsurfrules
cat ui-ux-design/prompts/*.txt > .windsurfrules
```

#### 5. Any Platform with System Prompt Support

As long as the platform allows custom system prompts, ui-ux-design can be loaded:

**Generic installation pattern:**

1. Concatenate all `prompts/*.txt` into a single system prompt
2. Inject before conversation starts
3. (Optional) Include `design-skills/*.jsx` as reference examples

**One-liner to generate the concatenated prompt (for OpenAI Playground, API calls, etc.):**

```bash
# Generate complete system prompt
echo "You are ui-ux-design, an autonomous design partner." > system-prompt.txt
cat prompts/*.txt >> system-prompt.txt

# Then copy system-prompt.txt content to your platform's System Prompt field
```

#### 6. LangChain / Custom Agent Frameworks

```python
# Load the skill in LangChain
import os
from pathlib import Path

def load_codesign_skill(skill_path: str) -> str:
    """Load all ui-ux-design prompt files as a system prompt"""
    prompts_dir = Path(skill_path) / "prompts"
    system_prompt_parts = []
    
    for prompt_file in sorted(prompts_dir.glob("*.txt")):
        with open(prompt_file) as f:
            system_prompt_parts.append(f.read())
    
    return "\n\n---\n\n".join(system_prompt_parts)

# Usage
skill_prompt = load_codesign_skill("./ui-ux-design")

from langchain.agents import create_openai_tools_agent
agent = create_openai_tools_agent(llm, tools, system_message=skill_prompt)
```

---

### Usage Examples

#### Basic

```
User: Design a landing page for an AI customer support SaaS
Agent: [Generates full index.html + styles/main.css + scripts/main.js, bundles as ZIP]
```

#### Styled

```
User: Create a dark-themed ops monitoring dashboard, corporate neutral style
Agent: [Generates dashboard with KPI cards, line charts, activity log]
```

#### Iteration

```
User: Change the hero font to Syne and the CTA button to coral
Agent: [Updates corresponding CSS variables, refreshes ZIP]
```

#### Multilingual

```
User: 设计一个SaaS产品的定价页，大胆风格
Agent: [Generates Chinese pricing page, 3-tier grid, FAQ accordions]
```

---

### Customize Your Own Design Skill

ui-ux-design is an open framework. Modify prompt files to match your team's standards:

- Edit `anti-slop.v1.txt` → Add team-specific forbidden fonts and colors
- Edit `artifact-types.v1.txt` → Add new artifact types (e.g., mobile prototypes, banner ads)
- Edit `craft-directives.v1.txt` → Adjust interaction depth requirements, add craft surplus patterns
- Add to `design-skills/` → Include your team's own design reference components

**Distribute customized Skills internally — every team member gets the same design standards instantly.**

---

### License

MIT — Free to fork, ship, or sell.

### Source

Adapted from [OpenCoworkAI/open-codesign](https://github.com/OpenCoworkAI/open-codesign)

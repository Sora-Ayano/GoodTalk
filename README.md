## 基本信息

name：Good Good Talk Day Day UP
version：0.6.0
description：On the Internet, nobody knows you're a dog.

一个用于 [哔哩哔哩 (bilibili.com)](https://www.bilibili.com) 的 Tampermonkey / Violentmonkey 用户脚本，提供自定义表情包与可配置的评论净化功能。

> **免责声明**：本脚本为个人学习与交流用途的第三方工具，非任何官方产品。

## 功能

| 模块 | 说明 |
|------|------|
| **自定义表情包** | 内置48个鸣潮主题表情，支持额外 JSON 订阅源。表情作为原生分组追加到评论表情面板，点选即插入；评论/动态中的 `【中文名】` 或 `[code]` 自动渲染为图片。 |
| **评论净化** | 三层分层词库（L1 核心攻击 / L2 引战对立 / L3 低质干扰），支持自定义词、高级正则。命中后折叠为占位条，可随时展开原文。 |
| **用户黑名单** | 一键拉黑作者，后续评论自动折叠。徽章统一显示在用户名左侧，刷新后持久保留。 |
| **纯图片过滤** | 可过滤无文字内容的图片/笔记评论。 |
| **私信屏蔽** | 关键词 + 黑名单屏蔽，在数据到达页面前即拦截。 |
| **可视化设置面板** | 浮动按钮「👍」，点击展开完整配置面板，无需手动编辑 JSON。 |
| **词库导出/导入** | 可导出为 JSON 文件，方便备份和跨设备同步。 |

## 安装

### 前置要求

1. 安装用户脚本管理器：
   - [Tampermonkey](https://www.tampermonkey.net/)（推荐）
   - [Violentmonkey](https://violentmonkey.github.io/)
2. 手动复制 `WutheringWaves-BiliSkin.user.js` 到管理器中。

### 一键安装

> 将 `WutheringWaves-BiliSkin.user.js` 拖入油猴管理面板，或直接从 Greasy Fork 安装。

## 使用方法

1. 安装后访问 [bilibili.com](https://www.bilibili.com) 任意视频或动态页面。
2. 页面右侧会出现一个浮动按钮「**👍**」——点击它打开设置面板。
3. 在面板中：
   - 勾选 **表情包**：评论输入框的表情面板会出现「椿webp」「基础webp」两个分组。
   - 勾选 **评论屏蔽词**：选择屏蔽层级，添加自定义词/正则。
   - 点击「**保存并刷新**」使配置生效。
4. 在评论区，用户名左侧会出现「**拉黑**」徽章，点击即可将该用户加入黑名单。

### 表情包订阅

内置 48 个表情直链 B 站图床（i0.hdslb.com），任何安装了脚本的用户都能互相看到。

如需额外表情包，可在面板中填入订阅 JSON 的 URL（格式见 [表情包说明](#表情包格式)）。

## 词库层级

| 层级 | 说明 | 默认 |
|------|------|------|
| **L1** 核心攻击 | 人身攻击、侮辱性黑称等直接攻击性词语 | **开启** |
| **L2** 引战对立 | 串子、反串、捧杀、拉踩等引战行为 | 关闭 |
| **L3** 低质干扰 | 「前排」「急了」「破防」等低信息量复读 | 关闭 |

每层均可独立开关；自定义词和正则规则也可分别启用。

## 技术实现

- **响应拦截**：在 XHR / fetch / JSONP 三通道重写响应体，在 B 站拿到数据前注入自定义表情和私信屏蔽。
- **Shadow DOM 穿透**：B 站新版评论组件使用 Web Components（`bili-comment-renderer`、`bili-comment-thread-renderer`），脚本通过递归 `shadowRoot` 遍历实现屏蔽。
- **SPA 感知**：劫持 `pushState`/`replaceState`，结合 `MutationObserver` 和标题变化检测，在 B 站单页切换时自动重新扫描。
- **零外部依赖**：纯原生 JS，不依赖 jQuery、React、xhook 等任何第三方库或 CDN。

## 文件说明

```
├── WutheringWaves-BiliSkin.user.js   # 主脚本
├── .gitignore                         # Git 忽略规则
├── README.md                          # 本文件
├── LICENSE                            # MIT 许可证
└── wuwa-emotes.json                   # 表情包订阅范本


## 表情包格式

订阅 JSON 应符合 B 站 emote panel 格式，示例：

```json
{
  "data": {
    "packages": [
      {
        "id": 10001,
        "text": "分组名",
        "url": "//i0.hdslb.com/bfs/.../icon.webp",
        "type": 3,
        "emote": [
          {
            "id": 10001001,
            "package_id": 10001,
            "text": "[表情名]",
            "url": "//i0.hdslb.com/bfs/.../emote.webp",
            "type": 3,
            "attr": 0,
            "mtime": 1700000000,
            "meta": { "size": 2, "alias": "表情别名" }
          }
        ]
      }
    ]
  }
}
```

上传到此项目的 `wuwa-emotes.json` 即为一个完整的订阅范本。

## 常见问题

### Q: 表情包为什么不显示？
A: 确认设置面板中「表情包」开关已开启，并已点击「保存并刷新」。如果网络请求被拦截，检查浏览器扩展是否阻止了 `i0.hdslb.com`。

### Q: 屏蔽词太严格/太宽松？
A: 默认仅开启 L1（核心攻击），可在面板中单独开启 L2、L3，或添加自定义词。也可以只启用黑名单，关闭所有层级。

### Q: 黑名单有容量上限吗？
A: 脚本本身无硬编码上限，但约 5,000~10,000 条后可能因 localStorage 体积影响加载速度。

### Q: 刷新后「已拉黑」标记还在吗？
A: 持久化的——黑名单存储在 GM 配置中（`GM_setValue`），刷新/重启浏览器后依然生效。已拉黑用户的评论旁会显示灰色「已拉黑」徽章。

## 鸣谢

- [bilibili-bobo](https://github.com/Someone/bilibili-bobo) — 表情包设计参考
- [bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect) — B站API文档
- [bilibili-cleaner](https://github.com/festoney8/bilibili-cleaner) — B站页面净化设计思路
- 表情包素材版权归库洛游戏 (Kuro Games) / 鸣潮所有

## 许可证

MIT License

由 DeepSeek V4P 辅助开发

# OrderStatusMonitor 组件设置

## ✅ 已完成

### 1. 翻译文件
- ✓ `public/frondend/lang/OrderStatusMonitor.json` - 中文和英文翻译

### 2. Mock API 支持
- ✓ `src/services/orderStatusMockApi.js` - 提供 Mock 函数
- ✓ `vite.config.js` - 已配置 `/api/mercure/token` 中间件

### 3. 样式应用
- ✓ 应用了轻盈小巧的设计风格（宽度550px、紧凑间距）
- ✓ 完整的响应式设计
- ✓ 与网站风格保持一致

## 📋 组件使用方式

### 基础使用

```vue
<template>
  <OrderStatusMonitor
    :isVisible="showOrderStatus"
    :orderNo="currentOrderNo"
    @close="showOrderStatus = false"
    @view-order="handleViewOrder"
    @continue-shopping="handleContinueShopping"
    @retry="handleRetry"
  />
</template>

<script setup>
import OrderStatusMonitor from '@/components/PaymentMethodModal.vue'

const showOrderStatus = ref(false)
const currentOrderNo = ref('')

const handleViewOrder = (orderNo) => {
  console.log('查看订单:', orderNo)
}

const handleContinueShopping = () => {
  console.log('继续购物')
}

const handleRetry = () => {
  console.log('重新支付')
}
</script>
```

## 🔄 组件工作流程

### 开发环境（Mock 模式）
1. 组件显示时，触发 `subscribeMercure()` 方法
2. 向 `/api/mercure/token` 请求 JWT Token
3. 通过 Vite 中间件返回模拟 Token
4. 尝试建立 EventSource 连接

> **注意**：在开发环境，Mercure 连接会失败（因为没有真实的 Mercure 服务器），组件会显示连接失败的错误信息。这是正常的。

### 生产环境（真实后端）

需要后端实现以下 API：

```javascript
// GET /api/mercure/token
// 参数: orderNo (订单号)
// 返回:
{
  success: true,
  token: "JWT_TOKEN",
  topic: "orders/{orderNo}",
  message: "Message"
}
```

后端需要通过 Mercure 推送以下消息格式：

```javascript
{
  step: 'price_verified' | 'balance_checking' | 'stock_checking' | 'balance_deducting' | 'stock_deducting' | 'completed' | 'failed',
  message: '状态描述文本',
  debug: {
    // 可选：调试信息
    frontend_total: 'USD 78.20',
    backend_total: 'USD 78.20',
    difference: 'USD 0.00',
    backend_breakdown: { /* 价格明细 */ }
  }
}
```

## 🎨 样式特性

- **轻盈小巧**：宽度 550px，最大高度 75vh
- **紧凑间距**：padding 16px-24px，margin 12px
- **现代设计**：
  - 圆角 6px
  - 轻阴影 0 8px 24px
  - 清晰的颜色区分（绿=成功，红=失败，蓝=处理中）
- **完全响应式**：
  - 平板：520px
  - 手机：90vw（垂直栈式按钮）

## 📦 组件属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `isVisible` | Boolean | 组件是否可见 |
| `orderNo` | String | 订单号 |

## 📡 组件事件

| 事件 | 参数 | 说明 |
|------|------|------|
| `close` | - | 关闭组件 |
| `view-order` | orderNo | 查看订单详情 |
| `continue-shopping` | - | 继续购物 |
| `retry` | - | 重新支付 |

## 🔍 调试

组件会在浏览器控制台输出详细的日志：

```
=== Mercure 订阅流程开始 ===
1. 订单号: ORDER-123
2. 正在获取 Mercure Token...
3. Token Response Status: 200
4. Token Data: { success: true, token: '...', topic: 'orders/ORDER-123' }
✓ 成功获取 Token
7. 连接 URL: http://127.0.0.1:3000/.well-known/mercure?topic=orders/ORDER-123
8. 创建 EventSource 连接...
✓ Mercure 连接已建立
=== 等待接收消息 ===
```

如果看到 `❌ 连接已关闭` 或连接失败，这在开发环境是正常的。

## ✨ 总结

组件现在已经完全准备好：
- ✅ 翻译系统可用
- ✅ 样式符合网站设计规范
- ✅ API 基础设施已建立
- ✅ 可直接拷贝到其他项目使用

祝您使用愉快！

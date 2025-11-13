# 商品详情页支付方式选择功能

## 功能概述

为商品详情页（ItemDetailPage）添加了一个完整的支付方式选择流程。用户点击"立即购买"按钮后，会弹出一个支付方式选择对话框，支持多种支付方式选择。

## 架构设计

### 1. 新建组件：PaymentMethodModal.vue

位置：`src/components/PaymentMethodModal.vue`

#### 功能特性：
- **支付方式选择**：支持6种主要支付方式
  - 微信支付 (WeChat Pay)
  - 支付宝 (Alipay)
  - 信用卡 (Credit Card)
  - PayPal
  - 余额支付 (Account Balance)
  - Payoneer（国际收款）

- **UI交互**：
  - 订单信息摘要显示（商品名称、数量、总价）
  - 支付方式卡片点击选择，有明显的视觉反馈
  - 选中效果：边框颜色变化 + 背景色变化
  - "确认支付"按钮在选择支付方式前为禁用状态

- **组件Props**：
  ```javascript
  {
    isOpen: Boolean,          // 控制模态框显示/隐藏
    productTitle: String,     // 商品标题
    quantity: Number,         // 商品数量
    totalPrice: String        // 总价格（格式：USD 78.20）
  }
  ```

- **组件Events**：
  ```javascript
  emit('close')              // 关闭模态框
  emit('confirm', method)    // 确认支付，返回选择的支付方式
  ```

### 2. 修改文件：ItemDetailPage.vue

位置：`src/pages/ItemDetailPage.vue`

#### 修改内容：

**1) 导入新组件**
```javascript
import PaymentMethodModal from '@/components/PaymentMethodModal.vue'
```

**2) 添加状态管理**
```javascript
const basePrice = 78.20                    // 商品基础价格
const isPaymentModalOpen = ref(false)      // 支付模态框显示状态
const totalPrice = computed(() => {        // 动态计算总价
  const total = basePrice * quantity.value
  return `USD ${total.toFixed(2)}`
})
```

**3) 新增事件处理函数**
```javascript
// 打开支付方式选择对话框
function openPaymentModal() {
  if (!product.value) return
  isPaymentModalOpen.value = true
}

// 处理支付方式确认
function handlePaymentConfirm(paymentMethod) {
  // paymentMethod 可选值：'wechat', 'alipay', 'card', 'paypal'
  // 这里可以集成实际的支付API
}
```

**4) 修改"立即购买"按钮**
```html
<button type="button" class="btn-orange" @click="openPaymentModal">
  立即购买
</button>
```

**5) 添加组件到模板**
```html
<PaymentMethodModal
  :isOpen="isPaymentModalOpen"
  :productTitle="product?.title || ''"
  :quantity="quantity"
  :totalPrice="totalPrice"
  @close="isPaymentModalOpen = false"
  @confirm="handlePaymentConfirm"
/>
```

## 功能流程

```
用户点击"立即购买"按钮
    ↓
打开支付方式选择对话框
    ���
展示订单信息摘要（商品、数量、总价）
    ↓
用户选择支付方式（微信/支付宝/信用卡/PayPal）
    ↓
用户点击"确认支付"按钮
    ↓
调用 handlePaymentConfirm 函数
    ↓
集成实际支付API（待实现）
    ↓
显示支付结果/重定向到支付页面
```

## 支付方式配置

在 `PaymentMethodModal.vue` 中，��付方式定义如下：

| 支付方式 | 标识符 | 描述 | 图标 | 颜色主题 |
|---------|-------|------|------|---------|
| 微信支付 | wechat | 二维码支付 | WeChat Logo | 红色 |
| 支付宝 | alipay | 二维码支付 | Alipay Logo | 蓝色 |
| 信用卡 | card | Visa、Mastercard | 信用卡SVG图标 | 绿色 |
| PayPal | paypal | 国际支付 | PayPal Logo | 黄色 |
| 余额支付 | balance | 账户余额 | 钱币SVG图标 | 紫色 |
| Payoneer | payoneer | 国际收款 | Payoneer Logo | 青色 |

## 价格动态计算

总价会根据用户选择的数量动态计算：

```javascript
总价 = 基础价格 × 数量

示例：
基础价格：USD 78.20
用户选择数量：2
总价：USD 156.40（实时更新）
```

## 下一步集成步骤

### 1. 实现支付API集成

在 `handlePaymentConfirm` 函数中添加实际的支付逻辑：

```javascript
function handlePaymentConfirm(paymentMethod) {
  if (!product.value) return
  
  // 构建���单数据
  const orderData = {
    productId: product.value.sku,
    productTitle: product.value.title,
    quantity: quantity.value,
    totalPrice: basePrice * quantity.value,
    paymentMethod: paymentMethod,
    timestamp: new Date().toISOString()
  }
  
  // 调用支付API
  fetch('/api/payment/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  .then(res => res.json())
  .then(data => {
    // 根据支付方式处理响应
    if (paymentMethod === 'wechat') {
      // 显示微信支付二维码
    } else if (paymentMethod === 'alipay') {
      // 显示支付宝��付二维码
    } else if (paymentMethod === 'card') {
      // 重��向到信用卡支付表单
    } else if (paymentMethod === 'paypal') {
      // 重定向到PayPal支付页面
    } else if (paymentMethod === 'balance') {
      // 验证账户余额是否足够，执行余额扣款
    }
  })
}
```

### 2. 添加支付方式

若需要添加新的支付方式，在 `PaymentMethodModal.vue` 中：

```html
<!-- 在支付方式卡片区域中添加新的div -->
<div
  class="flex flex-col items-center justify-center w-full p-4 border-2 rounded cursor-pointer transition-all"
  :class="selectedMethod === 'newMethod' ? 'border-color bg-color' : 'border-gray-300 bg-white hover:border-gray-400'"
  @click="selectedMethod = 'newMethod'"
>
  <!-- 图标 -->
  <!-- 支付方式名称 -->
  <!-- 描述 -->
</div>
```

### 3. 集成支付宝/微信二维码

对于二维码支付，可以：

```javascript
// 示例：显示微信支付二维码
function handleWechatPayment(orderData) {
  // 从服务器获取二维码
  fetch('/api/payment/wechat-qrcode', {
    method: 'POST',
    body: JSON.stringify(orderData)
  })
  .then(res => res.json())
  .then(data => {
    // 在模态框中显示二维码
    // 定期轮询检查支付状态
  })
}
```

## 样式说明

- 使�� **Tailwind CSS** 进行样式设计
- 支付方式卡片采用 **3���网格布局**（`grid-cols-3`），每个卡片内的布局为"图标在上，文字在下"
- 选中状态有明显的视觉反馈（颜色和边框变化）
- 图标：固定大小 **12×12**（`w-12 h-12`），下间距 **3**（`mb-3`），不换行（`flex-shrink-0`）
- 文字：支付方式名称为 **14px 加粗**（`text-sm font-medium`），描述为 **12px 灰色**（`text-xs text-gray-500`），文字居中对齐（`text-center`）
- 卡片交互：悬停时有阴影效果（`hover:shadow-md`）
- 模态框宽度固定为 **700px**，响应式支持 **90vh** 最大高度
- 按钮采用 **disabled** 状态控制，未选择支付方式时为禁用

## 测试建议

1. 点击"立即购��"按钮，验证支付方式选择对话框是否打开
2. 修改商品数量，验证总价是否正确更新
3. 分别选择6种支付方式（微信、支付宝、信用卡、PayPal、余额支付、Payoneer），验证：
   - 卡片边框和背景颜色是否正确变化
   - 每个支付方式的图标是否正确显示
   - 每个支付方式的名称和描述文字是否正确显示
4. 验证悬停效果：在支付方式卡片上悬停鼠标，验证阴影效果是否显示
5. 点击"取消"按钮，验证对话框是否关闭，支付方式选择是否重置
6. 不选择支付方式直接点击"确认支付"，验证按钮是否为禁用状态
7. 选择支付方式后点击"确认支付"，验证 `handlePaymentConfirm` 函数是否被调用
8. 特别测试余额支付：验证"余额支付"选项是否显示钱币SVG图标和正确的文字

## 浏览器兼容性

- 使用 Vue 3.5+ 的 `Teleport` 特性
- 支持所有现代浏览器（Chrome、Firefox、Safari���Edge）
- 使用原生HTML和CSS特性，兼容性良好

## 余额支付实现指南

余额支付是平台自有的支付方式，实现时需要以下步骤：

### 1. 显示用户余额

在支付对话框中显示当前账户余额，便于用户判断是否有足够余额：

```javascript
<div class="bg-yellow-50 p-3 rounded mb-4">
  <p class="text-sm text-gray-700">当前账户余额：<span class="font-bold text-orange-600">{{ userBalance }}</span></p>
</div>
```

### 2. 验证账户余额

```javascript
function handlePaymentConfirm(paymentMethod) {
  if (paymentMethod === 'balance') {
    const requiredAmount = parseFloat(totalPrice.value.replace('USD ', ''))
    if (userBalance < requiredAmount) {
      alert(`账户余额不足，需充值 ${(requiredAmount - userBalance).toFixed(2)} 元`)
      // 可以跳转到充值页面
      return
    }
  }
  // 继续支付流程
}
```

### 3. 余额支付��理

```javascript
async function processBalancePayment(orderData) {
  const response = await fetch('/api/payment/balance/pay', {
    method: 'POST',
    body: JSON.stringify(orderData)
  })
  const result = await response.json()

  if (result.success) {
    // 余额已扣款，更新本地余额数据
    userBalance.value = result.newBalance
    // 显示支付成功，跳转到订单确认页面
    showPaymentSuccess(result.orderId)
  } else {
    alert(result.message || '支付失败，请稍后重试')
  }
}
```

## 后续优化建议

1. **支付状态跟踪**：添加支付结果页面，显示支付成功/失败状态
2. **订单历史**：保存用户的支付��史和订单记录
3. **支付超时处理**：实现支付超时重试机制
4. **错误处理**：添加更详细的错误提示和日志记录
5. **国际化**：支持多语言显示（中文/英文/其他语言）
6. **支付安全**：集成3D Secure认证等安全措施
7. **余额充值**：添加快速充值功能，支持多种充值方式

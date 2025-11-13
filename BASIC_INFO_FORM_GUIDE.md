# 基本信息表单 - 使用指南

## 概述

重构后的基本信息表单（BasicInfoPage.vue）按照规范分为两部分：
- **个人信息** - 用于个人账户
- **��业信息** - 用于企业账户

## 新增组件

### 1. ImageUpload 组件
位置：`src/components/ImageUpload.vue`

**功能**：
- 图片上传至七牛云
- 显示图片预览
- 点击预览图片可重新上传
- 上传进度显示
- 错误提示

**使用方式**：
```vue
<ImageUpload
  v-model="formData.personalInfo.individualIdFront"
  label="身份证正面照片"
/>
```

**Props**：
- `label` (String, 必填) - 标签文本
- `uploadUrl` (String, 可选) - 七牛云上传地址，默认为 'https://upload.qiniu.com/'

**Events**：
- `@update:modelValue` - 上传成功后返回图片URL

### 2. DatePicker 组件
位置：`src/components/DatePicker.vue`

**功能**：
- 日期选择器
- 禁用未来日期（可选）
- 禁用过去日期（可选）
- 日期范围限制

**使用方式**：
```vue
<DatePicker
  v-model="formData.personalInfo.birthday"
  placeholder="请选择生日"
  :disable-future="true"
/>
```

**Props**：
- `modelValue` (String) - 日期值，格式为 YYYY-MM-DD
- `placeholder` (String) - 占位符文本
- `disableFuture` (Boolean) - 是否禁用未来日期
- `disablePast` (Boolean) - 是否禁用过去日期
- `minDate` (Date) - 最小日期
- `maxDate` (Date) - 最大日期

## 七牛云上传配置

### 本地开发���Mock）

在本地开发时，使用vite配置的mock API：
- 请求地址：`/api/qiniu/upload-token`
- 返回格式：
```json
{
  "uploadToken": "mock_upload_token_...",
  "domain": "https://cdn-demo.example.com"
}
```

### 生产环境配置

需要在后端实现 `/api/qiniu/upload-token` 接口，返回：

```json
{
  "uploadToken": "实际的七牛云上传凭证",
  "domain": "你的七牛云域名"
}
```

#### 获取七牛云上传凭证的方式：

**Node.js/Express 示例**：
```javascript
const qiniu = require('qiniu');

// 配置七牛云
const accessKey = 'YOUR_ACCESS_KEY';
const secretKey = 'YOUR_SECRET_KEY';
const bucket = 'YOUR_BUCKET';
const domain = 'YOUR_DOMAIN';

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const putPolicy = new qiniu.rs.PutPolicy({
  scope: bucket,
  expires: 3600,
});
const uploadToken = putPolicy.uploadToken(mac);

// 返回给前端
res.json({
  uploadToken,
  domain
});
```

**Python/Django 示例**：
```python
import qiniu

# 配置七牛云
access_key = 'YOUR_ACCESS_KEY'
secret_key = 'YOUR_SECRET_KEY'
bucket = 'YOUR_BUCKET'
domain = 'YOUR_DOMAIN'

q = qiniu.Auth(access_key, secret_key)
token = q.upload_token(bucket, expires=3600)

# 返回给前端
return {'uploadToken': token, 'domain': domain}
```

## 表单字段说明

### 个人信息（Person Info）

| 字段 | 字段名 | 类型 | 必填 | 说明 |
|------|--------|------|------|------|
| realName | 姓名 | String | ✓ | 用户真实姓名 |
| gender | 性别 | String | ✓ | 0-未知, 1-男, 2-女 |
| birthday | 生日 | Date | ✓ | YYYY-MM-DD 格式 |
| individualIdCard | 身份证号 | String | ✓ | 个人身份证号码 |
| individualIdFront | 身份证正面 | String | ✓ | 身份证正面照片URL |
| individualIdBack | 身份证反面 | String | ✓ | 身份证反面照片URL |
| province | 省份 | String | ✗ | 可选 |
| city | 城市 | String | ✗ | 可选 |
| district | 区县 | String | ✗ | 可选 |
| address | 详细地址 | String | ✗ | 可选 |

### 企业信息（Enterprise Info）

| 字段 | 字段名 | 类型 | 必填 | 说明 |
|------|--------|------|------|------|
| companyName | 公司名称 | String | ✓ | 公司全名 |
| companyType | 公司类型 | String | ✓ | factory-工厂, trader-贸易商, factory_trader-工贸一体, brand-品牌商 |
| businessLicenseNumber | 营业执照号 | String | ✓ | 营业执照注册号 |
| businessLicenseImage | 营业执照 | String | ✓ | 营业执照照片URL |
| legalPersonName | 法人姓名 | String | ✓ | 法人代表名字 |
| legalPersonIdCard | 法人身份证号 | String | ✓ | 法人身份证号码 |
| legalPersonIdFront | 法人证正面 | String | ✓ | 法人身份证正面照片URL |
| legalPersonIdBack | 法人证反面 | String | ✓ | 法人身份证反面照片URL |
| registeredCapital | 注册资本 | Number | ✓ | 单位：万元 |
| establishmentDate | 成立日期 | Date | ✓ | YYYY-MM-DD 格式 |
| businessScope | 经营范围 | String | ✓ | 公司经营范围描述 |
| province | 省份 | String | ✓ | 必填 |
| city | 城市 | String | ✓ | 必填 |
| district | 区县 | String | ✓ | 必填 |
| address | 详细地址 | String | ✓ | 必填 |

## API 文档

### 获取七牛云上传凭证

**端点**：`GET /api/qiniu/upload-token`

**请求参数**：无

**响应格式**：
```json
{
  "uploadToken": "string",
  "domain": "string"
}
```

**示例**：
```javascript
const response = await fetch('/api/qiniu/upload-token');
const { uploadToken, domain } = await response.json();
```

## 文件上传流程

1. 用户选择图片文件
2. 前端校验文件类型和大小（最大10MB）
3. 本地显示图片预览
4. 向后端请求七牛云上传凭证
5. 使用XHR直接上传至七牛云
6. 上传成功后获取文件URL
7. 将URL保存到表单数据

## 故障排查

### 上传失败

1. **检查七牛云配置**
   - 确认访问密钥（Access Key）和秘密密钥（Secret Key）正确
   - 确认bucket名称正确
   - 确认域名正确配置

2. **检查CORS配置**
   - 七牛云需要配置跨域资源共享（CORS）
   - 允许来自前端域名的请求

3. **检查后端API**
   - 确认 `/api/qiniu/upload-token` 端点正确响应
   - 检查返回的uploadToken是否有效

### 图片不显示

- 检查七牛云域名是否正确
- 检查文件是否真的上传成功
- 确认图片URL可以在浏览器中访问

## 常见问题

**Q: 如何切换为真实的七牛云？**
A: 在后端实现 `/api/qiniu/upload-token` 接口，返回真实的七牛云凭证和域名即可。

**Q: 支持批量上传吗？**
A: 当前组件支持单个文件上传。如需批量上传，可创建多个ImageUpload组件实例。

**Q: 如何限制上传的文件类型？**
A: 在ImageUpload组件中修改`accept`属性，或在后端验证文件类型。

**Q: 上传的文件可以删除吗？**
A: 可以点击"删除"按钮删除本地预览，但七牛云上的文件需要单独删除。

## 测试提示

开发时可以在浏览器控制台测试：
```javascript
// 测试获取上传凭证
fetch('/api/qiniu/upload-token')
  .then(r => r.json())
  .then(data => console.log(data))
```

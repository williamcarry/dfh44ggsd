# 个人中心文件拷贝清单

## 文件夹结构
```
copyme/
├── pages/
│   ├── UserCenterPage.vue                    （主个人中心页面）
│   ├── BasicInfoPage.vue                     （基本信息）
│   ├── AddressBookPage.vue                   （地址簿）
│   ├── SecurityPage.vue                      （账户安全）
│   ├── MallAnnouncementPage.vue              （商城公告列表）
│   ├── MallAnnouncementDetailPage.vue        （商城公告详情）
│   ├── MarketingActivityPage.vue             （营销活动列表）
│   ├── MarketingActivityDetailPage.vue       （营销活动详情）
│   ├── OrderNotificationPage.vue             （订单通知列表）
│   ├── OrderNotificationDetailPage.vue       （订单通知详情）
│   ├── AfterSalesNotificationPage.vue        （售后通知列表）
│   ├── AfterSalesNotificationDetailPage.vue  （售后通知详情）
│   ├── PlatformMessagePage.vue               （平台消息列表）
│   ├── PlatformMessageDetailPage.vue         （平台消息详情）
│   ├── ProductManagementPage.vue             （商品管理）
│   ├── ListingPushPage.vue                   （刊登推送列表）
│   ├── ListingProductsPage.vue               （刊登商品列表）
│   ├── BrandAuthPage.vue                     （品牌授权）
│   ├── ProductNotificationPage.vue           （商品通知列表）
│   ├── ProductNotificationDetailPage.vue     （商品通知详情）
│   ├── CashbackActivityPage.vue              （返现活动）
│   ├── InquiryOrderPage.vue                  （咨价单）
│   ├── MyOrderPage.vue                       （我的订单）
│   ├── PlatformOrderPage.vue                 （平台载单）
│   ├── BatchOrderPage.vue                    （批量下单）
│   ├── ExceptionOrderPage.vue                （异常订单）
│   ├── AfterSalesManagementPage.vue          （售后管理）
│   ├── DownloadCenterPage.vue                （下载中心）
│   ├── PlatformAuthPage.vue                  （平台授权）
│   ├── OrderSettingsPage.vue                 （载单设置）
│   ├── SkuMappingPage.vue                    （SKU映射）
│   ├── LogisticsMappingPage.vue              （物流映射）
│   ├── InventoryUpdatePage.vue               （库存更新）
│   ├── UpdateLogPage.vue                     （更新记录）
│   ├── MyBalancePage.vue                     （我的余额）
│   ├── MyInvoicesPage.vue                    （我的账单）
│   ├── MyVouchersPage.vue                    （我的采购券）
│   └── PaymentAccountPage.vue                （支付账号管理）
│
├── components/
│   ├── SiteHeader.vue                        （顶部导航）
│   ├── SiteFooter.vue                        （页脚）
│   ├── SidebarItem.vue                       （侧边栏菜单项）
│   ├── ImageUpload.vue                       （图片上传组件）
│   └── DatePicker.vue                        （日期选择器组件）
│
└── COPY_LIST.md                              （本清单文件）
```

## 页面分类统计

### 1. 个人中心组 (5个)
- UserCenterPage.vue
- BasicInfoPage.vue
- AddressBookPage.vue
- SecurityPage.vue

### 2. 消息中心组 (10个)
- MallAnnouncementPage.vue
- MallAnnouncementDetailPage.vue
- MarketingActivityPage.vue
- MarketingActivityDetailPage.vue
- OrderNotificationPage.vue
- OrderNotificationDetailPage.vue
- AfterSalesNotificationPage.vue
- AfterSalesNotificationDetailPage.vue
- PlatformMessagePage.vue
- PlatformMessageDetailPage.vue

### 3. 商品管理组 (6个)
- ProductManagementPage.vue
- ListingPushPage.vue
- ListingProductsPage.vue
- BrandAuthPage.vue
- ProductNotificationPage.vue
- ProductNotificationDetailPage.vue

### 4. 营销活动组 (1个)
- CashbackActivityPage.vue

### 5. 订单管理组 (5个)
- InquiryOrderPage.vue
- MyOrderPage.vue
- PlatformOrderPage.vue
- BatchOrderPage.vue
- ExceptionOrderPage.vue

### 6. 客户服务组 (2个)
- AfterSalesManagementPage.vue
- DownloadCenterPage.vue

### 7. 第三方开店组 (6个)
- PlatformAuthPage.vue
- OrderSettingsPage.vue
- SkuMappingPage.vue
- LogisticsMappingPage.vue
- InventoryUpdatePage.vue
- UpdateLogPage.vue

### 8. 资产管理组 (4个)
- MyBalancePage.vue
- MyInvoicesPage.vue
- MyVouchersPage.vue
- PaymentAccountPage.vue

### 9. 公共组件 (5个)
- SiteHeader.vue
- SiteFooter.vue
- SidebarItem.vue
- ImageUpload.vue
- DatePicker.vue

## 文件总数

- **pages/**: 36个页面文件
- **components/**: 5个组件文件
- **总计**: 41个文件

## 使用说明

1. 将 `copyme` 文件夹整个复制到你的项目 `src` 目录下
2. 文件结构和路径保持不变，导入路径无需修改
3. 所有文件都按照原项目的结构组织，可直接覆盖使用

## 注意事项

- 所有文件已保持原有的目录结构
- 所有导入路径都使用 `@/pages` 和 `@/components` 的相对路径
- 建议直接将整个 `copyme` 文件夹拷贝到你项目的根目录，然后将其内容覆盖到 `src` 目录

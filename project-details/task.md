# Plan: Căn chỉnh giao diện với design/Home.png — ✅ HOÀN THÀNH

> Tất cả 8 vấn đề đã được xác định và fix.

---

## Tổng quan trạng thái

| # | Vấn đề | Trạng thái | Ghi chú |
|---|--------|-----------|---------|
| 1 | Impact Section — Layout sai | ✅ Fixed | Đơn giản hóa: gradient block + "Impact" centered + stat cards grid 2x2 bên dưới |
| 2 | "Latest insights" — 6 ô trống | ✅ Fixed | Thêm 6 mock report cards với cover images, tags, links |
| 3 | What ACT does — Card 1 image | ✅ Fixed | Dùng ảnh local + wave clip SVG + navy block bên dưới; Cards 2&3 dùng SVG icons |
| 4 | Focus areas — Education expanded | ✅ Fixed | Thêm class `expanded-default` + CSS rules |
| 5 | How ACT works — Diagram spacing | ✅ Fixed | `mb-24 overflow-visible` trên wrapper |
| 6 | Portfolio proof — Logo grid thưa | ✅ Fixed | Thêm 15 mock portfolio items, fallback khi CMS empty |
| 7 | Stories — Nút prev đè lên tag | ✅ Fixed | Arrows repositioned to `top-1/2`, tag ở `bottom-0` |
| 8 | Section headings — Gradient | ✅ Fixed | All 6 sections có gradient keyword span |

---

## Verification

```bash
npx tsc --noEmit  # ✅ 0 errors
```

Kiểm tra thủ công: reload http://localhost:3000 và scroll qua từng section.

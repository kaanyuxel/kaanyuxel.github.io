# Ders Notları Sitesi

## Yeni ders notu eklemek

1. GitHub'da bu depoda `_posts` klasörüne girin.
2. **Add file → Create new file** deyin.
3. Dosya adını şu biçimde yazın: `YYYY-AA-GG-kisa-baslik.md`
   Örnek: `2026-10-01-temel-kavramlar.md` (Türkçe karakter ve boşluk kullanmayın)
4. En üste şu bilgileri yazın, altına notunuzu ekleyin:

```
---
layout: ders
title: Temel Kavramlar
ders: Dersin Adı
hafta: 2
ozet: Bu haftanın kısa özeti.
---

Notlarınız buraya...
```

5. **Commit changes** deyin. 1–2 dakika içinde sitede görünür.

- Aynı `ders:` adını kullanan notlar ana sayfada tek başlık altında toplanır.
- Formül kullanacaksanız üst kısma `matematik: true` ekleyin.

## PDF / görsel eklemek

`dosyalar` adında bir klasöre yükleyin (Add file → Upload files) ve notta şöyle bağlayın:
`[Sunum](/dosyalar/hafta2.pdf)` veya görsel için `![Açıklama](/dosyalar/sekil.png)`

> Depo adı `kullaniciadi.github.io` değilse bağlantıların başına depo adını ekleyin: `/depo-adi/dosyalar/...`

## Site başlığını değiştirmek

`_config.yml` dosyasındaki `title`, `description`, `author` satırlarını düzenleyin.

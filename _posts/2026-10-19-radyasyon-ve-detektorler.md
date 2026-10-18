---
layout: ders
title: Radyasyon ve Detektörler
ders: Introduction
hafta: 3
ozet: Radyoaktif kaynaklar, radyasyonun maddeden geçişi ve detektörlerin genel özellikleri.
---

**Sunum:** [Türkçe (PDF)]({{ '/dosyalar/radyasyon-ve-detektorler-tr.pdf' | relative_url }}) · [English (PDF)]({{ '/dosyalar/radiation-and-detectors-en.pdf' | relative_url }})

**Uygulama kodu:** [G4DetectorDemo.rar]({{ '/dosyalar/G4DetectorDemo.rar' | relative_url }})

## Bu derste

- **Radyoaktif kaynaklar:** α, β, elektron yakalama, γ ve yok olma ışıması; bozunma şemaları
- **Radyasyonun maddeden geçişi:** Bethe–Bloch, Bragg tepesi, Çerenkov, ışınım uzunluğu, fotonların üç süreci
- **Detektör özellikleri:** tepki, çözünürlük, tepki fonksiyonu, verim, ölü zaman

Kaynak: W. R. Leo, *Techniques for Nuclear and Particle Physics Experiments*, Böl. 1, 2 ve 5.

## Uygulama: 2 cm alüminyumda hangi foton süreci baskın?

10 000 foton (1 keV – 100 MeV) levhaya gönderilir; her fotonun ilk etkileşmesi sayılır.

```bash
sudo apt install -y unrar
cd ~ && wget https://kaanyuxel.github.io/dosyalar/G4DetectorDemo.rar
unrar x G4DetectorDemo.rar
cd ~/G4DetectorDemo
mkdir build
cd build
cmake ../.
make -j4
./demo gamma_scan_Al.mac
root -l 'draw_gamma.C("gscan_Al.root")'
```

macOS'ta ilk satır yerine `brew install unar`, üçüncü satır yerine `unar G4DetectorDemo.rar` kullanın.

![Alüminyumda foton süreçleri]({{ '/dosyalar/gscan_Al.png' | relative_url }})

**Sonuç:** ~50 keV altında fotoelektrik, ~50 keV – 12 MeV arası Compton, üstünde çift oluşumu baskın.

**Ödev:** Makroda `G4_Al` yerine `G4_Pb` yazıp tekrar çalıştırın.

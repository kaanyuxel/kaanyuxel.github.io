---
layout: ders
title: "Geant4'e Giriş"
ders: Introduction
hafta: 2
ozet: Simülasyon, Monte Carlo yöntemi ve Geant4'ün temel kavramları.
---

**Sunum:** [Türkçe (PDF)]({{ '/dosyalar/geant4-giris-tr.pdf' | relative_url }}) · [English (PDF)]({{ '/dosyalar/geant4-intro-en.pdf' | relative_url }})

## Bu derste

- **Simülasyon:** Gerçek bir sistemi bir model üzerinden bilgisayarda deneriz.
- **Monte Carlo:** Rastgele örnekleme ile sayısal sonuç elde ederiz; hata 1/√N ile azalır.
- **Geant4:** Parçacıkların madde içinden geçişini Monte Carlo ile simüle eden açık kaynaklı C++ kütüphanesi.
- **Temel kavramlar:** Run → Event → Track → Step
- **Zorunlu sınıflar:** Geometri, fizik listesi, birincil kaynak

## Uygulama: B1 örneği

```bash
source ~/programFiles/geant4/install/bin/geant4.sh
cp -r ~/programFiles/geant4/geant4-v11.3.0/examples/basic/B1 ~/B1
mkdir -p ~/B1-build && cd ~/B1-build
cmake ~/B1 && make -j4
./exampleB1
```

Açılan pencerede `/run/beamOn 10` yazın.

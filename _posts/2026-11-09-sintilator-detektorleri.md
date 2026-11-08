---
layout: ders
title: Sintilatör Detektörleri
ders: Introduction
hafta: 5
ozet: Işık üreten malzemeler ve ışığı sayan fotodetektörler; Geant4'te BC-408 levha ve PMT.
---

**Sunum:** [Türkçe (PDF)]({{ '/dosyalar/sintilator-detektorleri-tr.pdf' | relative_url }}) · [English (PDF)]({{ '/dosyalar/scintillation-detectors-en.pdf' | relative_url }})

**Kodlar:** [G4Ders-sintilator.rar]({{ '/dosyalar/G4Ders-sintilator.rar' | relative_url }}) (derste açılacak) · [G4Ders-sintilator-cozum.rar]({{ '/dosyalar/G4Ders-sintilator-cozum.rar' | relative_url }}) (çözüm)

## Bu derste

- **Sintilasyon:** ışık verimi, foton sayısı, bozunma süresi
- **Organik ve inorganik sintilatörler:** plastik, NaI(Tl), BGO, LYSO
- **Işık toplama:** kritik açı, yansıtıcı sarım
- **Fotodetektörler:** PMT ve SiPM
- **Geant4:** BC-408 plastik levha + Hamamatsu H10722-110 PMT

## Uygulama

`G4Ders-sintilator` içinde yedi adım `//` ile kapalı; derste sırayla açılır. A–D sintilatör, E–G PMT.

```bash
cd ~ && wget https://kaanyuxel.github.io/dosyalar/G4Ders-sintilator.rar
unrar x G4Ders-sintilator.rar
cd ~/G4Ders-sintilator
mkdir build
cd build
cmake ../.
make -j4
./ders sint.mac
root -l draw_sint.C
root -l draw_pmt.C
```

**Beklenen (bütün adımlar açık):** olay başına ≈ 19 000 foton, PMT'ye ulaşan ≈ 940, çıkış tepesi ≈ −1,6 V.

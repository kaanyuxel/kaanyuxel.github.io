---
layout: ders
title: Geant4 ile Kodlama
date: 2026-10-19 00:01:00 +0300
ders: Introduction
hafta: 4
ozet: İlk Geant4 simülasyonunu adım adım yazıyoruz; Landau dağılımı, Bragg tepesi ve süreçlerin payı.
---

**Sunum:** [Türkçe (PDF)]({{ '/dosyalar/geant4-ile-kodlama-tr.pdf' | relative_url }})

**Örnek kodlar:** [G4Ders-ilk-kodlama.rar]({{ '/dosyalar/G4Ders-ilk-kodlama.rar' | relative_url }})

## Bu derste

Boş bir Geant4 iskeletini altı adımda dolduruyoruz:

1. **DetectorConstruction:** boşluk dolu dünya + 300 μm silisyum levha
2. **PhysicsList:** hangi fizik süreçleri simüle edilecek
3. **PrimaryGeneratorAction:** `G4ParticleGun` ile 1 GeV μ⁻
4. **SteppingAction:** adım levhada mı? Bırakılan enerjiyi olaya ekle
5. **EventAction:** olay başında sıfırla, sonunda histogramı doldur
6. **RunAction:** histogramı tanımla, ROOT dosyasını aç / yaz / kapat

## Örnek kodlar

| Klasör | İçerik |
|---|---|
| `G4Ders` | Derste doldurulacak boş iskelet |
| `G4Ders-cozum` | Çözüm: 300 μm Si'de 1 GeV μ⁻, Landau dağılımı |
| `G4Ders-bragg` | 20 cm suda 150 MeV proton, Bragg tepesi |
| `G4Ders-surec` | Enerji kaybında iyonlaşma / frenleme / çift oluşumu payları |

## Çalıştırma

```bash
cd ~ && wget https://kaanyuxel.github.io/dosyalar/G4Ders-ilk-kodlama.rar
unrar x G4Ders-ilk-kodlama.rar
source ~/programFiles/geant4/install/bin/geant4.sh
cd ~/G4Ders-cozum
mkdir build
cd build
cmake ../.
make -j4
./ders mip_si.mac
root -l ../draw_landau.C
```

Diğer örnekler için `G4Ders-cozum` yerine `G4Ders-bragg` (makro `bragg.mac`) ya da `G4Ders-surec` (makrolar `surec_e.mac`, `surec_mu.mac`, `surec_p.mac`) yazın.

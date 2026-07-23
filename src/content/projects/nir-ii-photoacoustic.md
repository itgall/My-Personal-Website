---
title: NIR-II Photoacoustic Imaging
number: '02'
date: 2025-03-01
tags:
  - photoacoustic imaging
  - nir-ii
  - stimulated Raman scattering
  - contrast agents
highlightTag: photoacoustic
institution: Wellman Center for Photomedicine, Harvard Medical School
contentMode: freeform
problem: ''
impact: ''
heroImage: /images/uploads/IMG_2458.jpeg
heroCaption: 'Custom all-fiber stimulated Raman scattering amplifier: 1064 nm seed, cascaded Raman shifting to discrete NIR-II excitation lines.'
videoUrl: ''
interactiveUrl: ''
interactiveHeight: 0
techStack:
  - Python
  - LabVIEW
linkUrl: ''
linkText: ''
githubUrl: ''
relatedPublications: []
published: true
description: 'A first-of-its-kind all-fiber laser amplifier at 1064nm for photoacoustic imaging. The point: use multiple wavelengths and inverse algorithms to identify molecules deep in tissue without any labels or dyes.'
featured: true
---

## Overview

Photoacoustic imaging in the second near-infrared window (NIR-II, 1000–1700 nm) offers a compelling combination: optical absorption contrast at depths and resolutions typically associated with ultrasound. By operating in the NIR-II window, we access a regime where tissue scattering is reduced and water absorption windows allow deeper penetration than conventional NIR-I systems.

## Technical Approach

**Wavelength selection.** We identified optimal excitation wavelengths within the NIR-II window by modeling the competition between reduced scattering (favoring longer wavelengths) and water absorption peaks (creating transmission windows around 1064 nm, 1300 nm, and 1550–1620 nm). The source is a custom all-fiber stimulated Raman scattering amplifier seeded at 1064 nm: cascaded Raman shifting yields a set of discrete excitation lines across the NIR-II window rather than a single fixed wavelength.

**Reconstruction algorithms.** Standard delay-and-sum beamforming is supplemented with a model-based iterative reconstruction that accounts for acoustic heterogeneity and frequency-dependent attenuation. We incorporate the optical fluence distribution as a spatially varying sensitivity map.

## Current Status

The benchtop imaging system is operational and has demonstrated photoacoustic imaging at depths exceeding 4 cm in tissue-mimicking phantoms. We are currently characterizing the system's spectroscopic capabilities using multi-wavelength excitation.

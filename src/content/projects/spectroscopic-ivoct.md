---
title: Spectroscopic OCT
number: '01'
date: 2026-05-30
tags:
  - optical coherence tomography
  - spectroscopy
  - inverse problems
highlightTag: spectroscopy
institution: Wellman Center for Photomedicine, Harvard Medical School
contentMode: freeform
problem: ''
impact: ''
heroCaption: ''
videoUrl: ''
interactiveUrl: ''
interactiveHeight: 0
techStack:
  - MATLAB
  - Python
  - Zemax
linkUrl: ''
linkText: ''
githubUrl: ''
relatedPublications: []
published: true
description: OCT gives you 3D structure, but not composition. This project adds molecular characterization to interferometric imaging — figuring out what a tissue is made of from how it scatters broadband light.
---

## Overview

Spectroscopic OCT (S-OCT) extends conventional OCT by extracting wavelength-dependent tissue optical properties from the broadband interference signal. This enables quantitative characterization of material composition, enabling distinguishing molecular species without the need for additional imaging modalities.

## Technical Approach

The system uses on a swept-source OCT VCSEL laser operating at 1310 nm center wavelength with 100 nm bandwidth. Key innovations include:

**Inverse algorithm design.** We developed a Tikhonov-regularized spectral fitting framework that extracts depth-resolved scattering and absorption coefficients from the OCT signal. The algorithm handles the ill-posed nature of the inverse problem through joint regularization across wavelengths, exploiting the spectral smoothness of biological chromophores as a physical prior.

**Polarization-sensitive extension.** By incorporating Jones matrix analysis of the polarization state evolution through the catheter and tissue, we add birefringence as a third contrast mechanism alongside scattering and absorption. This is particularly valuable for characterizing collagen organization in fibrous caps.

## Current Status

The inverse algorithm has been validated on tissue-mimicking phantoms with known optical properties, achieving relative reconstruction error below 5%.

## Impact

Reliable, quantitative material characterization during imaging could transform a range of fields including biomedical imaging. Current clinical OCT provides structural images but cannot quantify tissue composition meaning that clinicians must infer plaque vulnerability from morphological features alone. S-OCT would provide direct biochemical contrast, enabling more accurate identification of vulnerable plaques and better-informed treatment decisions.

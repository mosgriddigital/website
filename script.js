// /**
//  * MosGrid Technologies Platform Engine
//  * Headquartered in Visakhapatnam, Andhra Pradesh, India
//  * Native File Attachment Delivery & Inquiries Pipeline
//  */

// const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtRIItGsFs7ZLDYS7RgJvg0q-dytmBtl6k5ucHduJN2gia25HAz3HGwvaXSFIATqwM/exec';
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

// document.addEventListener('DOMContentLoaded', () => {
//   initAmbientCursorAura();
//   initCircuitCanvas();
//   initSilicon3DTilt();
//   initSpotlightHover();
//   initAnimatedCounters();
//   initJobFilters();
//   initResumeUpload();
//   initFormSubmissions();
// });

// /* ==========================================================================
//    1. Smooth Ambient Electron Aura
//    ========================================================================== */
// function initAmbientCursorAura() {
//   const aura = document.getElementById('cursorAura');
//   if (!aura) return;

//   if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
//     aura.style.display = 'none';
//     return;
//   }

//   let mouseX = -100, mouseY = -100;
//   let auraX = -100, auraY = -100;
//   let isVisible = false;

//   window.addEventListener('mousemove', (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;

//     if (!isVisible) {
//       aura.style.opacity = '1';
//       isVisible = true;
//     }
//   });

//   document.addEventListener('mouseleave', () => {
//     aura.style.opacity = '0';
//     isVisible = false;
//   });

//   document.addEventListener('mouseenter', () => {
//     aura.style.opacity = '1';
//     isVisible = true;
//   });

//   function renderAura() {
//     auraX += (mouseX - auraX) * 0.16;
//     auraY += (mouseY - auraY) * 0.16;

//     aura.style.left = `${auraX}px`;
//     aura.style.top = `${auraY}px`;

//     requestAnimationFrame(renderAura);
//   }
//   requestAnimationFrame(renderAura);

//   const interactiveSelector = 'a, button, select, input[type="checkbox"], .spotlight-card, .filter-btn, .file-remove-btn, .upload-dropzone, .btn, .social-chip, .silicon-stage';
  
//   function attachHoverListeners() {
//     const targets = document.querySelectorAll(interactiveSelector);
//     targets.forEach((el) => {
//       el.addEventListener('mouseenter', () => aura.classList.add('aura-hover'));
//       el.addEventListener('mouseleave', () => aura.classList.remove('aura-hover'));
//     });
//   }
//   attachHoverListeners();

//   window.addEventListener('click', (e) => {
//     const pulse = document.createElement('div');
//     pulse.className = 'cursor-pulse';
//     pulse.style.left = `${e.clientX}px`;
//     pulse.style.top = `${e.clientY}px`;
//     document.body.appendChild(pulse);

//     setTimeout(() => pulse.remove(), 550);
//   });
// }

// /* ==========================================================================
//    2. 3D Perspective Silicon Circuit Canvas (Multi-Layer Depth & Parallax)
//    ========================================================================== */
// function initCircuitCanvas() {
//   const canvas = document.getElementById('circuit-canvas');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d');

//   let width = canvas.width = window.innerWidth;
//   let height = canvas.height = window.innerHeight;

//   const fov = 450;
//   let targetRotX = 0;
//   let targetRotY = 0;
//   let rotX = 0;
//   let rotY = 0;

//   window.addEventListener('mousemove', (e) => {
//     const normX = (e.clientX / width) - 0.5;
//     const normY = (e.clientY / height) - 0.5;
//     targetRotY = normX * 0.45;
//     targetRotX = -normY * 0.35;
//   });

//   window.addEventListener('resize', () => {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
//     build3DCircuits();
//   });

//   let traces = [];
//   const GRID = 60;
//   const LAYERS = [-140, -40, 60, 160];

//   function build3DCircuits() {
//     traces = [];
//     const count = Math.floor((width * height) / 14000);

//     for (let i = 0; i < count; i++) {
//       const x1 = (Math.floor((Math.random() * width - width / 2) / GRID)) * GRID;
//       const y1 = (Math.floor((Math.random() * height - height / 2) / GRID)) * GRID;
//       const z1 = LAYERS[Math.floor(Math.random() * LAYERS.length)];

//       const length = (Math.floor(Math.random() * 4) + 2) * GRID;
//       const axis = Math.random();

//       let x2 = x1, y2 = y1, z2 = z1;

//       if (axis < 0.45) {
//         x2 = x1 + (Math.random() > 0.5 ? length : -length);
//       } else if (axis < 0.85) {
//         y2 = y1 + (Math.random() > 0.5 ? length : -length);
//       } else {
//         const nextLayerIdx = Math.floor(Math.random() * LAYERS.length);
//         z2 = LAYERS[nextLayerIdx];
//       }

//       traces.push({
//         x1, y1, z1,
//         x2, y2, z2,
//         isVia: z1 !== z2,
//         progress: Math.random(),
//         speed: 0.003 + Math.random() * 0.004,
//         color: Math.random() > 0.35 ? '#00f0ff' : '#00ff88'
//       });
//     }
//   }

//   build3DCircuits();

//   function project(x, y, z) {
//     const cosY = Math.cos(rotY);
//     const sinY = Math.sin(rotY);
//     const x1 = x * cosY - z * sinY;
//     const z1 = z * cosY + x * sinY;

//     const cosX = Math.cos(rotX);
//     const sinX = Math.sin(rotX);
//     const y1 = y * cosX - z1 * sinX;
//     const z2 = z1 * cosX + y * sinX;

//     const scale = fov / (fov + z2 + 250);
//     const px = x1 * scale + width / 2;
//     const py = y1 * scale + height / 2;

//     return { x: px, y: py, scale, z: z2 };
//   }

//   function render() {
//     ctx.clearRect(0, 0, width, height);

//     rotX += (targetRotX - rotX) * 0.05;
//     rotY += (targetRotY - rotY) * 0.05;

//     for (let i = 0; i < traces.length; i++) {
//       const t = traces[i];
//       const p1 = project(t.x1, t.y1, t.z1);
//       const p2 = project(t.x2, t.y2, t.z2);

//       if (p1.scale <= 0 || p2.scale <= 0) continue;

//       const avgScale = (p1.scale + p2.scale) / 2;
//       const alpha = Math.max(0.04, Math.min(0.25, avgScale * 0.22));

//       ctx.beginPath();
//       ctx.moveTo(p1.x, p1.y);
//       ctx.lineTo(p2.x, p2.y);
//       ctx.lineWidth = Math.max(0.6, avgScale * 1.6);

//       if (t.isVia) {
//         ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 1.3})`;
//         ctx.setLineDash([2, 4]);
//       } else {
//         ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
//         ctx.setLineDash([]);
//       }
//       ctx.stroke();
//       ctx.setLineDash([]);

//       ctx.beginPath();
//       ctx.arc(p1.x, p1.y, Math.max(1, avgScale * 1.8), 0, Math.PI * 2);
//       ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 1.5})`;
//       ctx.fill();

//       t.progress += t.speed;
//       if (t.progress > 1) t.progress = 0;

//       const curX = t.x1 + (t.x2 - t.x1) * t.progress;
//       const curY = t.y1 + (t.y2 - t.y1) * t.progress;
//       const curZ = t.z1 + (t.z2 - t.z1) * t.progress;

//       const pulseProj = project(curX, curY, curZ);
//       if (pulseProj.scale > 0) {
//         const pulseSize = Math.max(1.2, pulseProj.scale * 3.2);

//         ctx.beginPath();
//         ctx.arc(pulseProj.x, pulseProj.y, pulseSize, 0, Math.PI * 2);
//         ctx.fillStyle = t.color;
//         ctx.shadowColor = t.color;
//         ctx.shadowBlur = Math.max(4, pulseProj.scale * 12);
//         ctx.fill();
//         ctx.shadowBlur = 0;
//       }
//     }

//     requestAnimationFrame(render);
//   }

//   render();
// }

// /* ==========================================================================
//    3. 3D Gyroscopic Silicon Die Tilt Reaction
//    ========================================================================== */
// function initSilicon3DTilt() {
//   const stage = document.getElementById('siliconStage');
//   const die = document.getElementById('siliconDie');
//   if (!stage || !die) return;

//   stage.addEventListener('mousemove', (e) => {
//     const rect = stage.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;

//     const rotX = -(y / (rect.height / 2)) * 18;
//     const rotY = (x / (rect.width / 2)) * 18;

//     die.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
//   });

//   stage.addEventListener('mouseleave', () => {
//     die.style.transform = '';
//   });
// }

// /* ==========================================================================
//    4. Spotlight Card Hover
//    ========================================================================== */
// function initSpotlightHover() {
//   const cards = document.querySelectorAll('.spotlight-card');
//   cards.forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//       const rect = card.getBoundingClientRect();
//       card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
//       card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
//     });
//   });
// }

// /* ==========================================================================
//    5. High-Tech Animated Number Counters
//    ========================================================================== */
// function initAnimatedCounters() {
//   const metricNumbers = document.querySelectorAll('.metric-number');
//   if (!metricNumbers.length) return;
//   let animated = false;

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting && !animated) {
//         animated = true;
//         metricNumbers.forEach(num => {
//           const target = parseFloat(num.getAttribute('data-target'));
//           if (isNaN(target)) return;
//           const isDecimal = target % 1 !== 0;
//           let current = 0;
//           const step = target / 60;

//           const timer = setInterval(() => {
//             current += step;
//             if (current >= target) {
//               num.innerText = isDecimal ? target.toFixed(1) : Math.floor(target);
//               clearInterval(timer);
//             } else {
//               num.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
//             }
//           }, 25);
//         });
//       }
//     });
//   }, { threshold: 0.6 });

//   metricNumbers.forEach(n => observer.observe(n));
// }

// /* ==========================================================================
//    6. Job Hub Filters
//    ========================================================================== */
// function initJobFilters() {
//   const buttons = document.querySelectorAll('.filter-btn');
//   const jobs = document.querySelectorAll('.job-row');
//   if (!buttons.length || !jobs.length) return;

//   buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//       buttons.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');

//       const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase().trim();

//       jobs.forEach(job => {
//         const categoryAttr = (job.getAttribute('data-category') || '').toLowerCase();
//         job.style.display = (filter === 'all' || categoryAttr.includes(filter)) ? 'flex' : 'none';
//       });
//     });
//   });
// }

// /* ==========================================================================
//    7. Resume File Drag & Drop Validation
//    ========================================================================== */
// function initResumeUpload() {
//   const dropzone = document.getElementById('dropzone');
//   const fileInput = document.getElementById('resumeFile');
//   const dropContent = document.getElementById('dropzoneContent');
//   const filePreview = document.getElementById('filePreview');
//   const fileNameText = document.getElementById('fileNameText');
//   const fileSizeText = document.getElementById('fileSizeText');
//   const fileTypeIcon = document.getElementById('fileTypeIcon');
//   const removeBtn = document.getElementById('fileRemoveBtn');
//   const errorMsg = document.getElementById('fileErrorMsg');

//   if (!dropzone || !fileInput) return;

//   ['dragenter', 'dragover'].forEach(eventName => {
//     dropzone.addEventListener(eventName, (e) => {
//       e.preventDefault();
//       dropzone.classList.add('dragover');
//     });
//   });

//   ['dragleave', 'drop'].forEach(eventName => {
//     dropzone.addEventListener(eventName, (e) => {
//       e.preventDefault();
//       dropzone.classList.remove('dragover');
//     });
//   });

//   dropzone.addEventListener('drop', (e) => {
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       fileInput.files = e.dataTransfer.files;
//       validateAndDisplayFile(fileInput.files[0]);
//     }
//   });

//   fileInput.addEventListener('change', () => {
//     if (fileInput.files && fileInput.files.length > 0) {
//       validateAndDisplayFile(fileInput.files[0]);
//     }
//   });

//   removeBtn?.addEventListener('click', (e) => {
//     e.stopPropagation();
//     resetFileUpload();
//   });

//   function validateAndDisplayFile(file) {
//     if (!errorMsg) return;
//     errorMsg.innerText = '';
//     const allowedExtensions = ['pdf', 'doc', 'docx'];
//     const fileExt = file.name.split('.').pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExt)) {
//       errorMsg.innerText = '❌ Invalid format: Only PDF or Word documents (.pdf, .doc, .docx) are accepted.';
//       resetFileUpload();
//       return;
//     }

//     if (file.size > MAX_FILE_SIZE) {
//       const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       errorMsg.innerText = `❌ File size (${sizeMB} MB) exceeds 10 MB limit. Please compress your resume.`;
//       resetFileUpload();
//       return;
//     }

//     if (fileNameText) fileNameText.innerText = file.name;
//     if (fileSizeText) fileSizeText.innerText = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    
//     if (fileTypeIcon) {
//       fileTypeIcon.className = (fileExt === 'pdf') 
//         ? 'fa-solid fa-file-pdf file-type-icon text-cyan' 
//         : 'fa-solid fa-file-word file-type-icon text-green';
//     }

//     if (dropContent) dropContent.style.display = 'none';
//     if (filePreview) filePreview.style.display = 'flex';
//   }

//   window.resetResumeUploadUI = function() {
//     fileInput.value = '';
//     if (dropContent) dropContent.style.display = 'flex';
//     if (filePreview) filePreview.style.display = 'none';
//     if (errorMsg) errorMsg.innerText = '';
//   };

//   function resetFileUpload() {
//     window.resetResumeUploadUI();
//   }
// }

// /* ==========================================================================
//    8. Native API Integration (Google Apps Script Ingestion Pipeline)
//    ========================================================================== */
// function initFormSubmissions() {
//   const candidateForm = document.getElementById('mosgridForm');
//   const contactForm = document.getElementById('mosgridContactForm');

//   candidateForm?.addEventListener('submit', handleCandidateSubmit);
//   contactForm?.addEventListener('submit', handleContactSubmit);
// }

// function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const base64Clean = reader.result.split(',')[1];
//       resolve({
//         base64: base64Clean,
//         name: file.name,
//         mimeType: file.type || 'application/octet-stream',
//         size: file.size
//       });
//     };
//     reader.onerror = (error) => reject(error);
//   });
// }

// async function handleCandidateSubmit(e) {
//   e.preventDefault();

//   const fileInput = document.getElementById('resumeFile');
//   const errorMsg = document.getElementById('fileErrorMsg');
//   const btn = document.getElementById('submitBtn');
//   const status = document.getElementById('formStatus');
//   const form = document.getElementById('mosgridForm');

//   if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
//     if (errorMsg) errorMsg.innerText = '❌ Please upload your resume in PDF or Word format (max 10MB).';
//     fileInput?.focus();
//     return;
//   }

//   const file = fileInput.files[0];
//   if (file.size > MAX_FILE_SIZE) {
//     if (errorMsg) errorMsg.innerText = '❌ File size exceeds 10MB limit.';
//     return;
//   }

//   const selectedFocus = [];
//   document.querySelectorAll('input[name="focus_cb"]:checked').forEach(cb => selectedFocus.push(cb.value));

//   btn.disabled = true;
//   btn.style.opacity = '0.7';
//   btn.innerHTML = `<span>Encoding Resume & Dispatching Payload...</span>`;
//   status.innerHTML = '';

//   try {
//     const encodedFile = await fileToBase64(file);

//     const payload = {
//       action: 'candidate_application',
//       name: document.getElementById('candName').value.trim(),
//       email: document.getElementById('candEmail').value.trim(),
//       phone: document.getElementById('candPhone').value.trim(),
//       portfolio: document.getElementById('candLink').value.trim(),
//       preferredHub: document.getElementById('candDest').value,
//       status: document.getElementById('candStatus').value,
//       domains: selectedFocus.join(', '),
//       file: encodedFile
//     };

//     await fetch(APPS_SCRIPT_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'text/plain;charset=utf-8' },
//       body: JSON.stringify(payload)
//     });

//     status.style.color = '#00ff88';
//     status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Profile and resume successfully dispatched to MosGrid Talent Desk!`;
//     form.reset();
//     if (window.resetResumeUploadUI) window.resetResumeUploadUI();
//   } catch (err) {
//     status.style.color = '#ff3366';
//     status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Transmission failed: ${err.message}. Please retry.`;
//   } finally {
//     btn.disabled = false;
//     btn.style.opacity = '1';
//     btn.innerHTML = `<span class="btn-shine"></span><span>Submit Profile & Attached Resume</span><i class="fa-solid fa-paper-plane"></i>`;
//     setTimeout(() => { status.innerHTML = ''; }, 10000);
//   }
// }

// async function handleContactSubmit(e) {
//   e.preventDefault();

//   const btn = document.getElementById('contactSubmitBtn');
//   const status = document.getElementById('contactFormStatus');
//   const form = document.getElementById('mosgridContactForm');

//   btn.disabled = true;
//   btn.style.opacity = '0.7';
//   btn.innerHTML = `<span>Transmitting to Silicon Desk...</span>`;
//   status.innerHTML = '';

//   try {
//     const payload = {
//       action: 'contact_inquiry',
//       name: document.getElementById('contactName').value.trim(),
//       email: document.getElementById('contactEmail').value.trim(),
//       phone: document.getElementById('contactPhone').value.trim(),
//       inquiryType: document.getElementById('inquiryType').value,
//       message: document.getElementById('contactMessage').value.trim()
//     };

//     await fetch(APPS_SCRIPT_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'text/plain;charset=utf-8' },
//       body: JSON.stringify(payload)
//     });

//     status.style.color = '#00ff88';
//     status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message transmitted successfully. Our engineering desk will respond within 24 hours.`;
//     form.reset();
//   } catch (err) {
//     status.style.color = '#ff3366';
//     status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Transmission error: ${err.message}.`;
//   } finally {
//     btn.disabled = false;
//     btn.style.opacity = '1';
//     btn.innerHTML = `<span class="btn-shine"></span><span>Transmit Message</span><i class="fa-solid fa-paper-plane"></i>`;
//     setTimeout(() => { status.innerHTML = ''; }, 9000);
//   }
// }



/**
 * MosGrid Technologies Platform Engine
 * Headquartered in Visakhapatnam, Andhra Pradesh, India
 * Native File Attachment Delivery & Inquiries Pipeline
 */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtRIItGsFs7ZLDYS7RgJvg0q-dytmBtl6k5ucHduJN2gia25HAz3HGwvaXSFIATqwM/exec';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCursorAura();
  initCircuitCanvas();
  initSilicon3DTilt();
  initSpotlightHover();
  initAnimatedCounters();
  initJobFilters();
  initNavbarScroll();   /* <-- RESTORED */
  initMobileMenu();     /* <-- RESTORED */
  initResumeUpload();
  initFormSubmissions();
});

/* ==========================================================================
   1. Smooth Ambient Electron Aura
   ========================================================================== */
function initAmbientCursorAura() {
  const aura = document.getElementById('cursorAura');
  if (!aura) return;

  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    aura.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let auraX = -100, auraY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      aura.style.opacity = '1';
      isVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    aura.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    aura.style.opacity = '1';
    isVisible = true;
  });

  function renderAura() {
    auraX += (mouseX - auraX) * 0.16;
    auraY += (mouseY - auraY) * 0.16;

    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;

    requestAnimationFrame(renderAura);
  }
  requestAnimationFrame(renderAura);

  const interactiveSelector = 'a, button, select, input[type="checkbox"], .spotlight-card, .filter-btn, .file-remove-btn, .upload-dropzone, .btn, .social-chip, .silicon-stage';
  
  function attachHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    targets.forEach((el) => {
      el.addEventListener('mouseenter', () => aura.classList.add('aura-hover'));
      el.addEventListener('mouseleave', () => aura.classList.remove('aura-hover'));
    });
  }
  attachHoverListeners();

  window.addEventListener('click', (e) => {
    const pulse = document.createElement('div');
    pulse.className = 'cursor-pulse';
    pulse.style.left = `${e.clientX}px`;
    pulse.style.top = `${e.clientY}px`;
    document.body.appendChild(pulse);

    setTimeout(() => pulse.remove(), 550);
  });
}

/* ==========================================================================
   2. 3D Perspective Silicon Circuit Canvas (Multi-Layer Depth & Parallax)
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const fov = 450;
  let targetRotX = 0;
  let targetRotY = 0;
  let rotX = 0;
  let rotY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / width) - 0.5;
    const normY = (e.clientY / height) - 0.5;
    targetRotY = normX * 0.45;
    targetRotX = -normY * 0.35;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    build3DCircuits();
  });

  let traces = [];
  const GRID = 60;
  const LAYERS = [-140, -40, 60, 160];

  function build3DCircuits() {
    traces = [];
    const count = Math.floor((width * height) / 14000);

    for (let i = 0; i < count; i++) {
      const x1 = (Math.floor((Math.random() * width - width / 2) / GRID)) * GRID;
      const y1 = (Math.floor((Math.random() * height - height / 2) / GRID)) * GRID;
      const z1 = LAYERS[Math.floor(Math.random() * LAYERS.length)];

      const length = (Math.floor(Math.random() * 4) + 2) * GRID;
      const axis = Math.random();

      let x2 = x1, y2 = y1, z2 = z1;

      if (axis < 0.45) {
        x2 = x1 + (Math.random() > 0.5 ? length : -length);
      } else if (axis < 0.85) {
        y2 = y1 + (Math.random() > 0.5 ? length : -length);
      } else {
        const nextLayerIdx = Math.floor(Math.random() * LAYERS.length);
        z2 = LAYERS[nextLayerIdx];
      }

      traces.push({
        x1, y1, z1,
        x2, y2, z2,
        isVia: z1 !== z2,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: Math.random() > 0.35 ? '#00f0ff' : '#00ff88'
      });
    }
  }

  build3DCircuits();

  function project(x, y, z) {
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y1 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const scale = fov / (fov + z2 + 250);
    const px = x1 * scale + width / 2;
    const py = y1 * scale + height / 2;

    return { x: px, y: py, scale, z: z2 };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    rotX += (targetRotX - rotX) * 0.05;
    rotY += (targetRotY - rotY) * 0.05;

    for (let i = 0; i < traces.length; i++) {
      const t = traces[i];
      const p1 = project(t.x1, t.y1, t.z1);
      const p2 = project(t.x2, t.y2, t.z2);

      if (p1.scale <= 0 || p2.scale <= 0) continue;

      const avgScale = (p1.scale + p2.scale) / 2;
      const alpha = Math.max(0.04, Math.min(0.25, avgScale * 0.22));

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = Math.max(0.6, avgScale * 1.6);

      if (t.isVia) {
        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 1.3})`;
        ctx.setLineDash([2, 4]);
      } else {
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(p1.x, p1.y, Math.max(1, avgScale * 1.8), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 1.5})`;
      ctx.fill();

      t.progress += t.speed;
      if (t.progress > 1) t.progress = 0;

      const curX = t.x1 + (t.x2 - t.x1) * t.progress;
      const curY = t.y1 + (t.y2 - t.y1) * t.progress;
      const curZ = t.z1 + (t.z2 - t.z1) * t.progress;

      const pulseProj = project(curX, curY, curZ);
      if (pulseProj.scale > 0) {
        const pulseSize = Math.max(1.2, pulseProj.scale * 3.2);

        ctx.beginPath();
        ctx.arc(pulseProj.x, pulseProj.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.shadowColor = t.color;
        ctx.shadowBlur = Math.max(4, pulseProj.scale * 12);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. 3D Gyroscopic Silicon Die Tilt Reaction
   ========================================================================== */
function initSilicon3DTilt() {
  const stage = document.getElementById('siliconStage');
  const die = document.getElementById('siliconDie');
  if (!stage || !die) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 18;
    const rotY = (x / (rect.width / 2)) * 18;

    die.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
  });

  stage.addEventListener('mouseleave', () => {
    die.style.transform = '';
  });
}

/* ==========================================================================
   4. Spotlight Card Hover
   ========================================================================== */
function initSpotlightHover() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

/* ==========================================================================
   5. High-Tech Animated Number Counters
   ========================================================================== */
function initAnimatedCounters() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricNumbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target'));
          if (isNaN(target)) return;
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const step = target / 60;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              num.innerText = isDecimal ? target.toFixed(1) : Math.floor(target);
              clearInterval(timer);
            } else {
              num.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.6 });

  metricNumbers.forEach(n => observer.observe(n));
}

/* ==========================================================================
   6. Job Hub Filters
   ========================================================================== */
function initJobFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const jobs = document.querySelectorAll('.job-row');
  if (!buttons.length || !jobs.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase().trim();

      jobs.forEach(job => {
        const categoryAttr = (job.getAttribute('data-category') || '').toLowerCase();
        job.style.display = (filter === 'all' || categoryAttr.includes(filter)) ? 'flex' : 'none';
      });
    });
  });
}

/* ==========================================================================
   7. Navigation Scroll & Mobile Hamburger Drawer (RESTORED)
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  // Toggle drawer open and closed on hamburger tap
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('active');
  });

  // Close drawer when clicking any nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
    });
  });

  // Close drawer when tapping outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   8. Resume File Drag & Drop Validation
   ========================================================================== */
function initResumeUpload() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('resumeFile');
  const dropContent = document.getElementById('dropzoneContent');
  const filePreview = document.getElementById('filePreview');
  const fileNameText = document.getElementById('fileNameText');
  const fileSizeText = document.getElementById('fileSizeText');
  const fileTypeIcon = document.getElementById('fileTypeIcon');
  const removeBtn = document.getElementById('fileRemoveBtn');
  const errorMsg = document.getElementById('fileErrorMsg');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      validateAndDisplayFile(fileInput.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      validateAndDisplayFile(fileInput.files[0]);
    }
  });

  removeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    resetFileUpload();
  });

  function validateAndDisplayFile(file) {
    if (!errorMsg) return;
    errorMsg.innerText = '';
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      errorMsg.innerText = '❌ Invalid format: Only PDF or Word documents (.pdf, .doc, .docx) are accepted.';
      resetFileUpload();
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      errorMsg.innerText = `❌ File size (${sizeMB} MB) exceeds 10 MB limit. Please compress your resume.`;
      resetFileUpload();
      return;
    }

    if (fileNameText) fileNameText.innerText = file.name;
    if (fileSizeText) fileSizeText.innerText = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    
    if (fileTypeIcon) {
      fileTypeIcon.className = (fileExt === 'pdf') 
        ? 'fa-solid fa-file-pdf file-type-icon text-cyan' 
        : 'fa-solid fa-file-word file-type-icon text-green';
    }

    if (dropContent) dropContent.style.display = 'none';
    if (filePreview) filePreview.style.display = 'flex';
  }

  window.resetResumeUploadUI = function() {
    fileInput.value = '';
    if (dropContent) dropContent.style.display = 'flex';
    if (filePreview) filePreview.style.display = 'none';
    if (errorMsg) errorMsg.innerText = '';
  };

  function resetFileUpload() {
    window.resetResumeUploadUI();
  }
}

/* ==========================================================================
   9. Native API Integration (Google Apps Script Ingestion Pipeline)
   ========================================================================== */
function initFormSubmissions() {
  const candidateForm = document.getElementById('mosgridForm');
  const contactForm = document.getElementById('mosgridContactForm');

  candidateForm?.addEventListener('submit', handleCandidateSubmit);
  contactForm?.addEventListener('submit', handleContactSubmit);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Clean = reader.result.split(',')[1];
      resolve({
        base64: base64Clean,
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size
      });
    };
    reader.onerror = (error) => reject(error);
  });
}

async function handleCandidateSubmit(e) {
  e.preventDefault();

  const fileInput = document.getElementById('resumeFile');
  const errorMsg = document.getElementById('fileErrorMsg');
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const form = document.getElementById('mosgridForm');

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    if (errorMsg) errorMsg.innerText = '❌ Please upload your resume in PDF or Word format (max 10MB).';
    fileInput?.focus();
    return;
  }

  const file = fileInput.files[0];
  if (file.size > MAX_FILE_SIZE) {
    if (errorMsg) errorMsg.innerText = '❌ File size exceeds 10MB limit.';
    return;
  }

  const selectedFocus = [];
  document.querySelectorAll('input[name="focus_cb"]:checked').forEach(cb => selectedFocus.push(cb.value));

  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.innerHTML = `<span>Encoding Resume & Dispatching Payload...</span>`;
  status.innerHTML = '';

  try {
    const encodedFile = await fileToBase64(file);

    const payload = {
      action: 'candidate_application',
      name: document.getElementById('candName').value.trim(),
      email: document.getElementById('candEmail').value.trim(),
      phone: document.getElementById('candPhone').value.trim(),
      portfolio: document.getElementById('candLink').value.trim(),
      preferredHub: document.getElementById('candDest').value,
      status: document.getElementById('candStatus').value,
      domains: selectedFocus.join(', '),
      file: encodedFile
    };

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    status.style.color = '#00ff88';
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Profile and resume successfully dispatched to MosGrid Talent Desk!`;
    form.reset();
    if (window.resetResumeUploadUI) window.resetResumeUploadUI();
  } catch (err) {
    status.style.color = '#ff3366';
    status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Transmission failed: ${err.message}. Please retry.`;
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = `<span class="btn-shine"></span><span>Submit Profile & Attached Resume</span><i class="fa-solid fa-paper-plane"></i>`;
    setTimeout(() => { status.innerHTML = ''; }, 10000);
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('contactSubmitBtn');
  const status = document.getElementById('contactFormStatus');
  const form = document.getElementById('mosgridContactForm');

  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.innerHTML = `<span>Transmitting to Silicon Desk...</span>`;
  status.innerHTML = '';

  try {
    const payload = {
      action: 'contact_inquiry',
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      inquiryType: document.getElementById('inquiryType').value,
      message: document.getElementById('contactMessage').value.trim()
    };

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    status.style.color = '#00ff88';
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Message transmitted successfully. Our engineering desk will respond within 24 hours.`;
    form.reset();
  } catch (err) {
    status.style.color = '#ff3366';
    status.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Transmission error: ${err.message}.`;
  } finally {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = `<span class="btn-shine"></span><span>Transmit Message</span><i class="fa-solid fa-paper-plane"></i>`;
    setTimeout(() => { status.innerHTML = ''; }, 9000);
  }
}